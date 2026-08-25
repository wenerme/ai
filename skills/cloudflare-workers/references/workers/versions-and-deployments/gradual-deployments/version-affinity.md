---
description: Consistently route users to the same Worker version during gradual deployments using version affinity.
title: Version affinity
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Version affinity

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

During a [gradual deployment](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/), each request has a random chance of routing to either version based on the specified percentages. This means the same user can be served content from a different version every time a request is made, which can cause **version skew** issues.

Version affinity solves this by deterministically assigning users to a version based on a stable identifier, so they consistently hit the same version across page loads and subrequests for the duration of the gradual deployment.

## How it works

Set the `Cloudflare-Workers-Version-Key` header on the incoming request to your Worker:

```sh
curl -s https://example.com -H 'Cloudflare-Workers-Version-Key: foo'
```

For a given [deployment](https://developers.cloudflare.com/workers/versions-and-deployments/#deployments), all requests with a version key set to `foo` will be handled by the same version of your Worker. The platform hashes the key and uses the result with the configured percentages to deterministically assign a version - you do not choose which version a key maps to.

As you progress a gradual deployment (for example, from 10% to 20% to 50%), users whose keys were already assigned to the new version will remain on it. Users on the old version will progressively move to the new version as the percentage increases, but will not flip back unless you roll back.

You can set the `Cloudflare-Workers-Version-Key` header both when making an external request from the Internet to your Worker, as well as when making a subrequest from one Worker to another Worker using a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

## Static assets

Version affinity is particularly important when your Worker serves [static assets](https://developers.cloudflare.com/workers/static-assets/) with content-hashed filenames (like `index-a1b2c3d4.js`), which is the default behavior of most modern build tools and frameworks.

During a gradual rollout, different versions of your application will have different asset filenames:

* Version A's HTML references `assets/index-a1b2c3d4.js`
* Version B's HTML references `assets/index-m3n4o5p6.js`

Without version affinity, a user can receive HTML from version A, but when their browser requests `index-a1b2c3d4.js`, that request may be routed to version B - which does not have that file - resulting in a 404 error and a broken page.

Configuring version affinity using any of the methods in [Choose a version key](#choose-a-version-key) prevents this entirely by ensuring all requests from the same user are routed to the same version.

## Choose a version key

The right version key depends on what stable identifiers your application has available. You can set the header using a [Transform Rule](https://developers.cloudflare.com/rules/transform/request-header-modification/) on your zone, which extracts values from the request without modifying your application code.

Note

Transform Rules require your Worker to be on a route on a zone you control. They are not available for Workers served on `*.workers.dev` domains. For `*.workers.dev`, you would need to set the header from the client or from an upstream Worker using a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

### Authenticated applications

If your application has a user identifier in a cookie or header, this is the best option. Each user is deterministically assigned to a version and stays there across sessions, devices, and reloads.

Text in **Expression Editor**:

```txt
http.cookie contains "user_id"
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `http.request.cookies["user_id"][0]`

### Applications with sessions

If your application sets a session cookie, use the session identifier. This gives consistent routing for the duration of the session. If the session expires and a new one is created, the user may be assigned to a different version.

Text in **Expression Editor**:

```txt
http.cookie contains "session_id"
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `http.request.cookies["session_id"][0]`

### Anonymous or cookieless applications

If your application does not have any stable identifier in the request, you have two options:

**Option 1: Use the client IP address.** This is the simplest approach and requires no application changes. Users behind the same NAT or VPN will be grouped together, and mobile users who switch networks may change version, but for most applications this significantly reduces version flip-flopping compared to random per-request routing.

Text in **Expression Editor**:

```txt
true
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `ip.src`

**Option 2: Set a long-lived cookie from your Worker.** On the first request (which will be randomly assigned), your Worker generates a stable identifier and sets it as a cookie. All subsequent requests use that cookie as the version key. This gives the best consistency for anonymous users, at the cost of a small amount of application code.

```js
export default {
	async fetch(request, env) {
		const response = await handleRequest(request, env);

		// Set a long-lived cookie to use as a version affinity key.
		const COOKIE_NAME = "version-key"; // can be any name
		const cookieHeader = request.headers.get("Cookie") ?? "";
		const hasAffinityCookie = new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=`).test(
			cookieHeader,
		);

		if (!hasAffinityCookie) {
			const id = crypto.randomUUID();
			response.headers.append(
				"Set-Cookie",
				`${COOKIE_NAME}=${id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
			);
		}

		return response;
	},
};
```

```ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await handleRequest(request, env);

    // Set a long-lived cookie to use as a version affinity key.
    const COOKIE_NAME = "version-key"; // can be any name
    const cookieHeader = request.headers.get("Cookie") ?? "";
    const hasAffinityCookie = new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=`).test(cookieHeader);

    if (!hasAffinityCookie) {
      const id = crypto.randomUUID();
      response.headers.append(
        "Set-Cookie",
        `${COOKIE_NAME}=${id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`,
      );
    }

    return response;
  },
};
```

Then create a Transform Rule to use this cookie as the version key:

Text in **Expression Editor**:

```txt
http.cookie contains "version-key"
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `http.request.cookies["version-key"][0]`

Note

On the very first request from a new user, no cookie exists yet, so the request will be randomly assigned to a version based on the configured percentages. The cookie is set on the response, so all subsequent requests will be consistently routed.

## Testing

You can verify that version affinity is working by sending multiple requests with the same version key and confirming they are handled by the same version:

```sh
# Both requests should return responses from the same version
curl -s https://example.com -H 'Cloudflare-Workers-Version-Key: test-user-123'
curl -s https://example.com -H 'Cloudflare-Workers-Version-Key: test-user-123'
```

Use the [version metadata binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) to include the version ID in your Worker's response during testing.

During gradual rollouts, monitor your Worker's analytics for increased 404 response rates, especially for asset files (`.js`, `.css`, `.png`). Use [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) to track these metrics and catch version skew issues early. If you notice problems, you can [roll back](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) to the previous version.

## Related resources

* [Gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/) \- How percentage-based traffic splitting works
* [Version overrides](https://developers.cloudflare.com/workers/versions-and-deployments/version-overrides/) \- Send a request to a specific version by ID (for smoke testing and debugging, not for end-user routing)
* [Version metadata binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) \- Access version ID and tag from within your Worker

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/#page","headline":"Version affinity · Cloudflare Workers docs","description":"Consistently route users to the same Worker version during gradual deployments using version affinity.","url":"https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/version-affinity/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
