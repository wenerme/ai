---
description: Require sign-in before visitors can reach Cloudflare Workers, preview deployments, or all Workers in an account.
title: Cloudflare Access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Access

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/configuration/cloudflare-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare Access, you can restrict who is authorized to access your application. You decide who is approved, and every request is checked before your Worker runs. Approved visitors are let through, while everyone else is shown a login page or blocked.

You can protect:

* **A single application**: require sign-in on its preview URLs, production URLs, or both.
* **All Workers in your account**: protect every existing and newly created Worker by default.
* **Specific custom domains and hostnames**: restrict access at the hostname or route level.

## Before you start

To use Access with Workers, you need:

* Zero Trust enabled on your account. If Zero Trust is not turned on, complete [Zero Trust setup](https://developers.cloudflare.com/cloudflare-one/setup/) first, then return to the Workers dashboard.
* Permission to manage Workers and Access applications.

## Choose what to protect

| I want to protect...                                                 | Section                                                                                                   | API destination type           |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Preview deployments for **all Workers**                              | [Protect all Workers](#protect-all-workers)                                                               | all\_preview\_workers          |
| Production and preview deployments for **all Workers**               | [Protect all Workers](#protect-all-workers)                                                               | all\_workers                   |
| Preview deployments for **one Worker**                               | [Protect one Worker](#protect-one-worker)                                                                 | preview\_worker                |
| Production and preview deployments for **one Worker**                | [Protect one Worker](#protect-one-worker)                                                                 | worker                         |
| A specific hostname — can be workers.dev, a Custom Domain, or a path | [Protect a specific hostname, Custom Domain, or path](#protect-a-specific-hostname-custom-domain-or-path) | Self-hosted application domain |

## Protect all Workers

Require sign-in on every Worker in your account, including Workers you deploy in the future. You can require sign-in on only preview deployments, or on both production and preview deployments.

Dashboard path: **Workers & Pages** overview page > **Protect all Workers**.

![Workers & Pages overview showing the Protect all Workers card and the Workers application list.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2436,height=1432,format=webp/_astro/protect-all-workers._AWy-S-E.png)

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Find the **Protect all Workers** card.
3. If the card says **Not enabled**, select **Enable Access**.
4. Choose **Previews only** or **All traffic**.
5. Under **Authentication policy**, select an existing policy or configure one of the [policy options](#policy-options).
6. Select **Enable Access**.
7. (Optional) Review the session duration.
![Manage Access for all Workers dialog showing traffic scope and policy options.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1276,height=1220,format=webp/_astro/choose-who-can-sign-in.DKf3kWAK.png)
8. Select **Apply Access**.

To protect only preview deployments for every Worker, create a self-hosted Access application with an `all_preview_workers` destination:

```json
"destinations": [
  {
    "type": "all_preview_workers"
  }
]
```

To protect every Worker's production and preview deployments, use `all_workers` instead:

```json
"destinations": [
  {
    "type": "all_workers"
  }
]
```

Send these `destinations` in a `POST /accounts/{account_id}/access/apps` request. For the full request schema, including [policy options](#policy-options), session settings, and advanced Access options, refer to the [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/).

## Protect one Worker

Require sign-in on a single Worker. This automatically protects every domain associated with the Worker, including its routes, Custom Domains, `workers.dev` hostname, and previews. You can require sign-in on only preview deployments, or on both production and preview deployments.

WebSocket limitation

Worker-level Access policies do not currently support WebSocket connections. WebSocket upgrade requests to a Worker protected by a worker-level Access policy will fail with a `403` error.

If your Worker uses WebSockets (including Durable Objects, real-time applications, or RDP-over-WebSocket), protect it with a [hostname-based Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/) instead.

Dashboard path: **Workers & Pages** \> select your Worker > **Access**.

![Worker Access tab showing an unprotected Worker and the Protect this Worker behind Access button.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1476,height=689,format=webp/_astro/protect-one-worker.BSpeeOry.png)

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker from the application list.
3. Select the **Access** tab.
4. Select **Protect this Worker behind Access**.
5. Choose **Previews only** or **All traffic**.
6. Under **Authentication policy**, select an existing policy or configure one of the [policy options](#policy-options).
7. (Optional) Review the session duration.
![Enable Access on one Worker dialog showing traffic scope and policy options.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1234,height=1176,format=webp/_astro/enable-access-one-worker.DSDwcTbH.png)
8. Select **Apply Access**.

To protect only preview deployments for one Worker, create a self-hosted Access application with a `preview_worker` destination. Set `worker_id` to your Worker's ID:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "type": "self_hosted",
    "name": "Access for my-worker",
    "destinations": [
      {
        "type": "preview_worker",
        "worker_id": "c81a2d22c29840ed9d61681a3270dbff"
      }
    ],
    "policies": [
      {
        "decision": "allow",
        "include": [
          {
            "email_domain": {
              "domain": "example.com"
            }
          }
        ]
      }
    ]
  }'
```

To protect the Worker's production and preview deployments, use `worker` instead:

```json
"destinations": [
  {
    "type": "worker",
    "worker_id": "c81a2d22c29840ed9d61681a3270dbff"
  }
]
```

For the full request schema, including [policy options](#policy-options) and session settings, refer to the [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/).

## Protect a specific hostname, Custom Domain, or path

Use hostname-based Access when only a specific URL that routes to your Worker should require sign-in, such as a `workers.dev` hostname, a Custom Domain, a subdomain, or a path. Hostname-based Access protects only that exact URL, whereas [protecting a Worker](#protect-one-worker) protects the entire Worker regardless of how it is accessed. For example with hostname-based Access, you can protect `my-worker.example.workers.dev`, `admin.example.com`, or a single path such as `example.com/login` to make only part of your Worker private.

In both the dashboard and the API, you protect a hostname or path by creating a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) and using the hostname or path as the application domain.

Create the self-hosted application in **Zero Trust** \> **Access** \> **Applications**. To match subdomains, multiple paths, or wildcards, refer to [Application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/).

Create the self-hosted application with a `POST /accounts/{account_id}/access/apps` request, setting the application domain to the hostname or path. For the full request schema, refer to the [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/).

## Make a Worker public when all Workers are protected

If account-level Access protects all Workers, you can make a specific Worker public by adding a Worker-level bypass. A bypass means Access does not require sign-in for that Worker.

Note

This is only useful when account-level Access already protects the Worker. If there is no account-level Access policy, a public Worker does not need a bypass.

Dashboard path: **Workers & Pages** \> select your Worker > **Access**.

![Manage Worker access dialog showing a Make this Worker public bypass policy.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1228,height=756,format=webp/_astro/make-worker-public.D3yjPjtf.png)

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker from the application list.
3. Select the **Access** tab.
4. Select the option to make the Worker public or bypass account-level Access.
5. Confirm the change.

Create a Worker-level Access application with a bypass policy. Use the `worker` destination, set `worker_id` to your Worker's ID, and set the policy `decision` to `bypass` with an `include` rule that matches everyone:

```json
"policies": [
  {
    "decision": "bypass",
    "include": [
      {
        "everyone": {}
      }
    ]
  }
]
```

## Policy options

When you turn on Access, choose who can sign in. The same policy options are available whether you protect all Workers or one Worker.

| Policy option      | Result                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cloudflare account | Allows members of this Cloudflare account to sign in. Use this option when access should be limited to people who already belong to the account.                                                                                     |
| Email domain       | Allows anyone with a verified email address at the domain you enter, such as example.com. Use this option when access should be available to people from a company or organization, even if they are not Cloudflare account members. |

You can add one or more policies. Visitors who match any selected policy can sign in.

For advanced policy configuration, such as multiple identity providers, device posture rules, service tokens, complex policy ordering, or custom login or block pages, edit the Access application in Zero Trust after you create it. For the full set of options, refer to [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

## Read authenticated user identity with ctx.access

Every time Cloudflare Access authenticates a request, your Worker can read the signed-in user's identity — including email, groups, device posture, and [more identity fields](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#user-identity) — directly through `ctx.access`. No extra configuration or JWT parsing required.

Use this to personalize responses, enforce fine-grained permissions, or log activity per user.

`ctx.access` is `undefined` if Access did not authenticate the request.

```js
export default {
	async fetch(request, env, ctx) {
		if (!ctx.access) {
			return new Response("Access required", { status: 403 });
		}

		const identity = await ctx.access.getIdentity();
		const email = identity?.email ?? "unknown";

		return new Response(`Hello, ${email}`);
	},
};
```

```js
export default {
	async fetch(request, env, ctx) {
		if (!ctx.access) {
			return new Response("Access required", { status: 403 });
		}

		const identity = await ctx.access.getIdentity();
		const email = identity?.email ?? "unknown";

		return new Response(`Hello, ${email}`);
	},
};
```

## Test ctx.access locally

When developing locally with `wrangler dev` or the Cloudflare Vite Plugin, you can simulate authenticated Cloudflare Access identities without deploying or going through an Access login flow.

Add a `dev` block inside the `access` configuration in your `wrangler.jsonc`:

```jsonc
{
	"access": {
		"dev": {
			"aud": "my-app",
			"identity": { "email": "admin@example.com" }
		}
	}
}
```

```toml
[access.dev]
aud = "my-app"

  [access.dev.identity]
  email = "admin@example.com"
```

* `aud` (required) — your Access application's audience tag, available as `ctx.access.aud`. Wrangler will not start without it.
* `identity` (optional) — simulates the authenticated user's identity claims (email, name, groups, and so on) returned by `ctx.access.getIdentity()`. Include it if your Worker reads user identity. Omit it if your Worker only checks whether Access is enabled.

To test as a different user, change the identity fields and restart. To test unauthenticated requests, remove the `dev` block — `ctx.access` will be `undefined`, just as it would be for a request that did not go through Access in production.

### Example Worker

```js
export default {
	async fetch(request, env, ctx) {
		if (!ctx.access) {
			return new Response("Not authenticated", { status: 403 });
		}

		const identity = await ctx.access.getIdentity();
		const email = identity?.email ?? "unknown";

		return new Response(`Hello, ${email}`);
	},
};
```

```js
export default {
	async fetch(request, env, ctx) {
		if (!ctx.access) {
			return new Response("Not authenticated", { status: 403 });
		}

		const identity = await ctx.access.getIdentity();
		const email = identity?.email ?? "unknown";

		return new Response(`Hello, ${email}`);
	},
};
```

With this configuration, visiting `localhost:8787` would return `Hello, admin@example.com`.

### Identity fields

The identity object accepts any fields that match the production Access identity shape. For the full list, refer to [Application token — User identity](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/).

## Disable Access

To disable Worker-level or account-level Access, open the Worker's **Access** tab or the **Protect all Workers** card and disable the corresponding Access rule.

Delete the Access application that protects the Worker, all Workers, or the hostname or path that routes to the Worker.

## Understand Access hierarchy

A Worker can be protected by more than one Access rule. When multiple rules could apply to the same request, the most specific rule takes effect first:

1. **Hostname or path-based Access**: Applies first when the request matches that hostname or path, such as `admin.example.com` or `example.com/login`.
2. **Worker-level Access**: Applies next for the selected Worker across its routes, Custom Domains, `workers.dev` hostname, and previews.
3. **Account-level Worker Access**: Applies last as the fallback for all Workers or all Worker previews on the account.

For example, if a Worker has both account-level Access and a Worker-level rule, the Worker-level rule controls that Worker. If a matching hostname or path-based Access app also exists, that hostname or path rule controls the matching URL.

If you remove a more specific rule, a broader rule may still protect the Worker. For example, removing Worker-level Access can reveal account-level Access underneath.

## Related resources

* [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/)
* [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)
* [Self-hosted Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
* [Routes and domains](https://developers.cloudflare.com/workers/configuration/routing/)
* [Preview URLs](https://developers.cloudflare.com/workers/configuration/previews/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/cloudflare-access/#page","headline":"Cloudflare Access · Cloudflare Workers docs","description":"Require sign-in before visitors can reach Cloudflare Workers, preview deployments, or all Workers in an account.","url":"https://developers.cloudflare.com/workers/configuration/cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
