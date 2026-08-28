---
description: Resource limits for Sandbox SDK including vCPU, memory, disk, and container constraints.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/platform/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Since the Sandbox SDK is built on top of the [Containers](https://developers.cloudflare.com/containers/) platform, it shares the same underlying platform characteristics. Refer to these pages to understand how pricing and limits work for your sandbox deployments.

Sandbox also inherits current Containers lifecycle, placement, and routing behavior. For more detail, refer to [Lifecycle of a Container](https://developers.cloudflare.com/containers/concepts/architecture/) and [Scaling and Routing](https://developers.cloudflare.com/containers/configuration/scaling-and-routing/).

## Container limits

Refer to [Containers limits](https://developers.cloudflare.com/containers/platform/limits/) for complete details on:

* Memory, vCPU, and disk limits for concurrent container instances
* Instance types and their resource allocations
* Image size and storage limits

## Workers and Durable Objects limits

When using the Sandbox SDK from Workers or Durable Objects, you are subject to [Workers subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests). By default, the SDK uses HTTP transport where each operation (`exec()`, `readFile()`, `writeFile()`, etc.) counts as one subrequest.

### Subrequest limits

* **Workers Free**: 50 subrequests per request
* **Workers Paid**: 1,000 subrequests per request

### Avoid subrequest limits with RPC transport

Enable RPC transport to multiplex all SDK calls over a single persistent connection:

```jsonc
{
	"vars": {
		"SANDBOX_TRANSPORT": "rpc"
	},
}
```

```toml
[vars]
SANDBOX_TRANSPORT = "rpc"
```

With RPC transport enabled:

* The persistent connection counts as one subrequest
* All subsequent SDK operations use the existing connection (no additional subrequests)
* Ideal for workflows with many SDK operations per request

See [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) for a complete guide.

## Best practices

To work within these limits:

* **Right-size your instances** \- Choose the appropriate [instance type](https://developers.cloudflare.com/containers/platform/limits/#instance-types) based on your workload requirements
* **Clean up unused sandboxes** \- Terminate sandbox sessions when they are no longer needed to free up resources
* **Optimize images** \- Keep your [custom Dockerfiles](https://developers.cloudflare.com/sandbox/configuration/dockerfile/) lean to reduce image size
* **Use RPC transport for high-frequency operations** \- Enable `SANDBOX_TRANSPORT=rpc` to avoid subrequest limits when making many SDK calls per request

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/platform/limits/#page","headline":"Limits · Cloudflare Sandbox SDK docs","description":"Resource limits for Sandbox SDK including vCPU, memory, disk, and container constraints.","url":"https://developers.cloudflare.com/sandbox/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
