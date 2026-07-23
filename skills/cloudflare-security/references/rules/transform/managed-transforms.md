---
description: Pre-built Transform Rules managed by Cloudflare for common use cases.
title: Managed Transforms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed Transforms

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/managed-transforms/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Managed Transforms allow you to perform common adjustments to HTTP request and response headers with pre-built, one-step configurations. The available adjustments include:

* Add bot protection request headers.
* Remove or add headers related to the visitor's IP address.
* Add request header when Cloudflare detects [leaked credentials](https://developers.cloudflare.com/waf/detections/leaked-credentials/).
* Add security-related response headers.
* Remove `X-Powered-By` response headers.

For a complete list, refer to [Available Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/).

When you enable a Managed Transform, Cloudflare internally deploys one or more Transform Rules to handle the common configuration you selected. These generated rules will not count against the [maximum number of Transform Rules](https://developers.cloudflare.com/rules/transform/#availability) available in your Cloudflare plan.

Enabled Managed Transforms will apply to all inbound requests for the [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) (domain or subdomain added to Cloudflare).

Note

The generated internal Transform Rules will not appear in the Transform Rules list in the Cloudflare dashboard.

## Next steps

For dashboard, API, and Terraform instructions, refer to [Configure Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/managed-transforms/#page","headline":"Managed Transforms · Cloudflare Rules docs","description":"Pre-built Transform Rules managed by Cloudflare for common use cases.","url":"https://developers.cloudflare.com/rules/transform/managed-transforms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
