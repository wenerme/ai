---
description: Configure Sandbox SDK 0.x deployments with Wrangler, Dockerfiles, environment variables, and transport modes.
title: Configuration
image: https://developers.cloudflare.com/sandbox/sdk/configuration/og.png?v=e954ba36141524b7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/configuration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This page documents Sandbox SDK 0.x for existing applications. For new applications, refer to [Sandboxes](https://developers.cloudflare.com/sandbox/). To move an existing application to `@cloudflare/sandbox` 1.0, refer to [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

Configure your Sandbox SDK deployment with Wrangler, customize container images, and manage environment variables.

### [Wrangler configuration](https://developers.cloudflare.com/sandbox/sdk/configuration/wrangler/)

Configure Durable Objects bindings, container images, and Worker settings in wrangler.jsonc.

### [Dockerfile reference](https://developers.cloudflare.com/sandbox/sdk/configuration/dockerfile/)

Customize the sandbox container image with your own packages, tools, and configurations.

### [Environment variables](https://developers.cloudflare.com/sandbox/sdk/configuration/environment-variables/)

Pass configuration and secrets to your sandboxes using environment variables.

### [Transport modes](https://developers.cloudflare.com/sandbox/sdk/configuration/transport/)

Configure HTTP or RPC transport to optimize communication and avoid subrequest limits.

### [Sandbox options](https://developers.cloudflare.com/sandbox/sdk/configuration/sandbox-options/)

Configure sandbox behavior with options like `keepAlive` for long-running processes.

## Related resources

- [Get Started guide](https://developers.cloudflare.com/sandbox/sdk/get-started/) - Initial setup walkthrough
- [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/) - Complete Wrangler reference
- [Docker documentation ↗︎](https://docs.docker.com/engine/reference/builder/) - Dockerfile syntax
- [Security model](https://developers.cloudflare.com/sandbox/sdk/concepts/security/) - Understanding environment isolation

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/sdk/configuration/#page","headline":"Configuration","description":"Configure Sandbox SDK 0.x deployments with Wrangler, Dockerfiles, environment variables, and transport modes.","url":"https://developers.cloudflare.com/sandbox/sdk/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/configuration/og.png?v=e954ba36141524b7","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
