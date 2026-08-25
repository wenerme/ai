---
description: Understand the architecture of Workers for Platforms, including dispatch namespaces, dynamic dispatch Workers, user Workers, and outbound Workers.
title: How Workers for Platforms works
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# How Workers for Platforms works

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Architecture

If you are familiar with [Workers](https://developers.cloudflare.com/workers/), Workers for Platforms introduces four key components: dispatch namespaces, dynamic dispatch Workers, user Workers, and optionally outbound Workers.

![Workers for Platforms architecture](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=466,format=svg/_astro/programmable-platforms-1.BCCEhzLr.svg)

### Dispatch namespace

A dispatch namespace is a container that holds all of your customers' Workers. Your platform takes the code your customers write, and then makes an API request to deploy that code as a user Worker to a namespace — for example `staging` or `production`. Compared to [Workers](https://developers.cloudflare.com/workers/), this provides:

* **Unlimited number of Workers** \- No per-account script limits apply to Workers in a namespace
* **Isolation by default** \- Each user Worker in a namespace runs in [untrusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/) — user Workers never share a cache even when running on the same Cloudflare zone, and cannot access the `request.cf` object
* **Dynamic invocation** \- Your dynamic dispatch Worker can call any Worker in the namespace using `env.DISPATCHER.get("worker-name")`

Best practice

All your customers' Workers should live in a single namespace (for example, `production`). Do not create a namespace per customer.

If you need to test changes safely, create a separate `staging` namespace.

### Dynamic dispatch Worker

A dynamic dispatch Worker is the entry point for all requests to your platform. Your dynamic dispatch Worker:

* **Routes requests** \- Determines which customer Worker should handle each request based on hostname, path, headers, or any other criteria
* **Runs platform logic** \- Executes authentication, rate limiting, or request validation before customer code runs
* **Sets per-customer limits** \- Enforces [custom limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/) on CPU time and subrequests based on plan type
* **Sanitizes responses** \- Modifies or filters responses from customer Workers

The dynamic dispatch Worker uses a [dispatch namespace binding](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/) to invoke user Workers:

```js
export default {
	async fetch(request, env) {
		// Determine which customer Worker to call
		const customerName = new URL(request.url).hostname.split(".")[0];

		// Get and invoke the customer's Worker
		const userWorker = env.DISPATCHER.get(customerName);
		return userWorker.fetch(request);
	},
};
```

### User Workers

User Workers contain code written by your customers. Your customer sends their code to your platform, and then you make an API request to deploy a user Worker on their behalf. User Workers are deployed to a dispatch namespace and invoked by your dynamic dispatch Worker. You can provide user Workers with [bindings](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) to access KV, D1, R2, and other Cloudflare resources.

![Deployment and management flow](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=466,format=svg/_astro/programmable-platforms-6.BfYznbr5.svg)

### Outbound Worker (optional)

An [outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) intercepts [fetch()](https://developers.cloudflare.com/workers/runtime-apis/fetch/) requests made by user Workers. Use it to:

* **Control egress** \- Block or allow external API calls from customer code
* **Log requests** \- Track what external services customers are calling
* **Modify requests** \- Add authentication headers or transform requests before they leave your platform
![Outbound Worker egress control pattern](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=594,format=svg/_astro/programmable-platforms-3.C-LkeZtS.svg)

### Request lifecycle

1. A request arrives at your dynamic dispatch Worker (for example, `customer-a.example.com/api`)
2. Your dynamic dispatch Worker determines which user Worker should handle the request
3. The dynamic dispatch Worker calls `env.DISPATCHER.get("customer-a")` to get the user Worker
4. The user Worker executes. If it makes external `fetch()` calls and an outbound Worker is configured, those requests pass through the outbound Worker first.
5. The user Worker returns a response
6. Your dynamic dispatch Worker can optionally modify the response before returning it

---

## Workers for Platforms versus Service bindings

Both Workers for Platforms and [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) enable Worker-to-Worker communication. Use Service bindings when you know exactly which Workers need to communicate. Use Workers for Platforms when user Workers are uploaded dynamically by your customers.

You can use both simultaneously - your dynamic dispatch Worker can use Service bindings to call internal services while also dispatching to user Workers in a namespace.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#page","headline":"How Workers for Platforms works · Cloudflare for Platforms docs","description":"Understand the architecture of Workers for Platforms, including dispatch namespaces, dynamic dispatch Workers, user Workers, and outbound Workers.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
