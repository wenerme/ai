---
description: Authenticate requests in a loader Worker and authorize data access outside customer app code with Dynamic Workers.
title: Authentication and authorization
image: https://developers.cloudflare.com/dynamic-workers/usage/authentication/og.png?v=39b7769909b8b5eb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication and authorization

Last updated Oct 31, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dynamic-workers/usage/authentication/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you build a platform that runs customer apps, you need to control who can use each app and which data they can access. An app may have both public and private endpoints.

Customers can add routes and change app code independently of your platform. Enforce permissions for routes and data operations in platform-owned code.

Enforce access at two points:

- **Before the app runs:** require a list of public and private routes when the app is published. Validate that list and enforce its rules before invoking app code.
- **When the app accesses data:** check permissions inside platform-owned operations. Signing in must not let Bob read Alice's private report.

With Dynamic Workers, check requests in the loader Worker and pass scoped data operations to the Worker it loads.

```
flowchart TB
  Request --> Gate[Loader Worker<br/>Authenticate and check route]
  Gate -->|Denied| Reject[Return 401, 403, or 404<br/>App does not run]
  Gate -->|Allowed| App[Dynamic Worker]
  App --> Capability[Platform capability<br/>Check access to this record]
  Capability --> Data[(Private data)]

```

Authentication establishes identity. Authorization determines which routes, actions, and records that identity can access.

## Choose where to enforce access

Choose checks according to what needs protection:

| Requirement | Enforcement point |
| --- | --- |
| The whole app requires sign-in | [Loader Worker, before invocation](https://developers.cloudflare.com/dynamic-workers/usage/authentication/#authenticate-before-invoking-the-app) |
| Routes mix public and private access | [Platform-owned method/path policy](https://developers.cloudflare.com/dynamic-workers/usage/authentication/#publish-code-and-route-policy-together) |
| Routes are unknown, but data permissions are known | [Platform-owned data operations](https://developers.cloudflare.com/dynamic-workers/usage/authentication/#protect-data-even-when-routes-change) |
| Routing and policy must stay together | [Registered handlers with access metadata](https://developers.cloudflare.com/dynamic-workers/usage/authentication/#adapt-the-pattern) |
| Public code needs fewer privileges | [Separate Workers with different capabilities](https://developers.cloudflare.com/dynamic-workers/usage/authentication/#adapt-the-pattern) |
| App libraries call HTTP APIs | [`globalOutbound` gateway](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/#intercept-outbound-requests) |

Combine route checks with data-operation checks for mixed-access apps.

## Publish code and route policy together

Your platform does not need to predict every future route. Require each app to declare its routes when it publishes:

*routes.jsonjson*

```json
[
	{ "method": "GET", "path": "/", "access": "public" },
	{ "method": "GET", "path": "/profile", "access": "member" },
	{ "method": "GET", "path": "/admin", "access": "reports:admin" }
]
```

This manifest is a policy format your platform implements. Workers does not infer intended access from app code.

```
flowchart LR
  Upload[Customer submits code + policy] --> Validate[Platform validates policy]
  Validate --> Release[Version code + policy together]
  Release --> Publish[Publish the matching release]

```

The platform owns these publication rules:

- Match the tenant to the authenticated app owner.
- Reject duplicate or ambiguous routes.
- Restrict which routes can become public.
- Prevent changes that weaken required permissions.
- Keep code and policy versions consistent during rollouts.

Store each app's code and route policy as one versioned deployment. Resolve both from that deployment before calling the loader.

### Deny undeclared routes

Match both method and path. A new route stays inaccessible until the platform accepts its policy.

*policy.jsjs*

```js
export function checkRoute(request, routes, tenant, identity) {
	const path = new URL(request.url).pathname;
	const route = routes.find(
		(route) => route.method === request.method && route.path === path,
	);
	if (!route) return new Response("Route not published", { status: 404 });
	if (route.access === "public") return null;
	if (!identity) return new Response("Sign in", { status: 401 });
	if (
		identity.tenant !== tenant ||
		(route.access !== "member" && !identity.permissions.includes(route.access))
	) {
		return new Response("Forbidden", { status: 403 });
	}
	return null;
}
```

*policy.tsts*

```ts
export type Identity = {
	userId: string;
	tenant: string;
	permissions: string[];
};

export type Route = {
	method: string;
	path: string;
	access: "public" | "member" | "reports:admin";
};

export function checkRoute(
	request: Request,
	routes: Route[],
	tenant: string,
	identity: Identity | null,
): Response | null {
	const path = new URL(request.url).pathname;
	const route = routes.find(
		(route) => route.method === request.method && route.path === path,
	);
	if (!route) return new Response("Route not published", { status: 404 });
	if (route.access === "public") return null;
	if (!identity) return new Response("Sign in", { status: 401 });
	if (
		identity.tenant !== tenant ||
		(route.access !== "member" && !identity.permissions.includes(route.access))
	) {
		return new Response("Forbidden", { status: 403 });
	}
	return null;
}
```

Here, `member` means membership in the app tenant. Add an app-membership check if only some tenant members may enter.

Use one path interpretation across the gate and app. This example matches exact URL paths; it grants no wildcard access.

## Authenticate before invoking the app

Implement `authenticate(request)` in `auth.ts` using your existing identity provider or session service. This integration must:

- Verify the session or token, including expiry and intended audience.
- Return a verified identity, or `null` when credentials are absent.
- Reject invalid credentials rather than trust caller-supplied identity headers.

Resolve `deployment` from your platform's app registry. Its tenant, routes, and code must not come from app code.

Place this gate in the loader Worker request handler:

*gateway.jsjs*

```js
import { checkRoute } from "./policy";
import { authenticate } from "./auth";

let identity;
try {
	identity = await authenticate(request);
} catch {
	return new Response("Invalid session", { status: 401 });
}

const denied = checkRoute(
	request,
	deployment.routes,
	deployment.tenant,
	identity,
);
if (denied) return denied;

// Forward only what this GET-only example needs. Keep session credentials out.
const appRequest = new Request(request.url, { method: "GET" });
```

*gateway.tsts*

```ts
import { checkRoute, type Identity } from "./policy";
import { authenticate } from "./auth";

let identity: Identity | null;
try {
	identity = await authenticate(request);
} catch {
	return new Response("Invalid session", { status: 401 });
}

const denied = checkRoute(
	request,
	deployment.routes,
	deployment.tenant,
	identity,
);
if (denied) return denied;

// Forward only what this GET-only example needs. Keep session credentials out.
const appRequest = new Request(request.url, { method: "GET" });
```

After the gate succeeds, load and invoke the app with the [Worker Loader](https://developers.cloudflare.com/dynamic-workers/api-reference/):

*gateway.jsjs*

```js
const app = env.LOADER.load({
	compatibilityDate: "2026-10-31",
	mainModule: "app.js",
	modules: { "app.js": deployment.code },
	globalOutbound: null,
});
return app.getEntrypoint(undefined, { props: { identity } }).fetch(appRequest);
```

*gateway.tsts*

```ts
const app = env.LOADER.load({
	compatibilityDate: "2026-10-31",
	mainModule: "app.js",
	modules: { "app.js": deployment.code },
	globalOutbound: null,
});
return app.getEntrypoint(undefined, { props: { identity } }).fetch(appRequest);
```

`load()` creates a fresh Worker. With `get()`, keep code and configuration identical for each cache ID. Do not cache one visitor's credentials or private data for other visitors.

A cached Worker can retain returned data between requests. Passing a new capability does not clear that app memory.

If isolation must hold independently of app code, use `load()` per request or separate cache IDs by user. Scope any exposed storage to the same user.

For a wholly private app, require membership on every request. For mixed-access apps, use the route policy to select public exceptions.

## Protect data even when routes change

A route check can require Bob to sign in, but it cannot prevent app code from requesting Alice's report. Keep permission checks inside the platform operations that read private data, so every new route uses the same checks.

An app can omit `checkAuth()` or ignore its result. Give it an operation that performs authorization and data access together.

```
sequenceDiagram
  participant Caller as Bob
  participant Platform as Loader Worker
  participant App as Dynamic Worker
  participant Reports as Platform Reports capability
  Caller->>Platform: Request with Bob's session
  Platform->>App: Capability scoped to Bob
  App->>Reports: read("alice")
  Reports-->>App: 404 — record does not belong to Bob
  App-->>Caller: 404

```

Keep the data and implementation in the loader Worker. This example uses synthetic records:

*gateway.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

const records = [
	{ id: "alice", tenant: "acme", owner: "alice", text: "Alice's report" },
	{ id: "bob", tenant: "acme", owner: "bob", text: "Bob's report" },
];

export class Reports extends WorkerEntrypoint {
	read(id) {
		const { identity, tenant } = this.ctx.props;
		if (!identity) return { status: 401, error: "Sign in" };
		if (
			identity.tenant !== tenant ||
			!identity.permissions.includes("reports:read")
		) {
			return { status: 403, error: "Forbidden" };
		}
		const report = records.find(
			(record) =>
				record.id === id &&
				record.tenant === tenant &&
				record.owner === identity.userId,
		);
		if (!report) return { status: 404, error: "Report not found" };
		return { status: 200, report: { text: report.text } };
	}
}
```

*gateway.tsts*

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

const records = [
	{ id: "alice", tenant: "acme", owner: "alice", text: "Alice's report" },
	{ id: "bob", tenant: "acme", owner: "bob", text: "Bob's report" },
];

type Scope = { identity: Identity | null; tenant: string };

export class Reports extends WorkerEntrypoint<Cloudflare.Env, Scope> {
	read(id: string) {
		const { identity, tenant } = this.ctx.props;
		if (!identity) return { status: 401, error: "Sign in" };
		if (
			identity.tenant !== tenant ||
			!identity.permissions.includes("reports:read")
		) {
			return { status: 403, error: "Forbidden" };
		}
		const report = records.find(
			(record) =>
				record.id === id &&
				record.tenant === tenant &&
				record.owner === identity.userId,
		);
		if (!report) return { status: 404, error: "Report not found" };
		return { status: 200, report: { text: report.text } };
	}
}
```

Create the capability using verified platform context. The app can choose a record ID, but cannot choose the capability's identity:

*gateway.jsjs*

```js
const reports = ctx.exports.Reports({
	props: { identity, tenant: deployment.tenant },
});
```

*gateway.tsts*

```ts
const reports = ctx.exports.Reports({
	props: { identity, tenant: deployment.tenant },
});
```

Pass the capability with the invocation:

*gateway.jsjs*

```js
return app.getEntrypoint(undefined, { props: { reports } }).fetch(appRequest);
```

*gateway.tsts*

```ts
return app.getEntrypoint(undefined, { props: { reports } }).fetch(appRequest);
```

The customer app calls the capability through [RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/):

*app.jsjs*

```js
const result = await this.ctx.props.reports.read(reportId);
return Response.json(result, { status: result.status });
```

*app.tsts*

```ts
const result = await this.ctx.props.reports.read(reportId);
return Response.json(result, { status: result.status });
```

Keep `globalOutbound: null` to block network access, or mediate requests through a [gateway](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/#intercept-outbound-requests). Otherwise, another data-access path could bypass the capability.

## Adapt the pattern

Use these variations when the app interface requires them:

| Pattern | Example | Why |
| --- | --- | --- |
| Registered handlers | `{ method: "GET", path: "/profile", access: "member", handler: "profile" }` | Select policy and handler from the same platform-owned entry. A handler name does not grant data access. |
| Public app shell | Public HTML; protected report reads through `reports.read(id)` | The platform can protect data without enumerating every frontend route. |
| Separate components | Public Dynamic Worker receives `{}`; private Dynamic Worker receives `{ reports }` | Public code has no private capability. Keep their storage separate too. |
| Outbound HTTP gateway | Allow `GET https://reports.internal/reports/:id`, then check record access | Existing HTTP clients can use the same authorization model. Ignore identity headers supplied by app code. |

If the outbound gateway injects credentials, authorize the destination and operation first. Hiding a token does not limit what that token can do.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/usage/authentication/#page","headline":"Authentication and authorization","description":"Authenticate requests in a loader Worker and authorize data access outside customer app code with Dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/usage/authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/dynamic-workers/usage/authentication/og.png?v=39b7769909b8b5eb","dateModified":"2026-10-31","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
