---
description: Build platforms on Cloudflare where your customers can deploy code with their own subdomains or custom domains.
title: Cloudflare for Platforms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare for Platforms

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Build a platform where your customers can deploy code, each with their own subdomain or custom domain.

Cloudflare for Platforms is used by leading platforms big and small to:

* Build application development platforms tailored to specific domains, like ecommerce storefronts or mobile apps
* Power AI coding platforms that let anyone build and deploy software
* Customize product behavior by allowing any user to write a short code snippet
* Offer every customer their own isolated database
* Provide each customer with their own subdomain

---

## Deploy your own platform

Get a working platform running in minutes. Choose a template based on what you are building:

### Platform Starter Kit

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/worker-publisher-template)

An example of a platform where users can deploy code at scale. Each snippet becomes its own isolated Worker, served at `example.com/{app-name}`. Deploying this starter kit automatically configures Workers for Platforms with routing handled for you.

[View demo](https://worker-publisher-template.templates.workers.dev/) [View on GitHub](https://github.com/cloudflare/templates/tree/main/worker-publisher-template)

### AI vibe coding platform

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/vibesdk)

Build an [AI vibe coding platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-vibe-coding-platform/) where users describe what they want and AI generates and deploys working applications. Best for: AI-powered app builders, code generation tools, or internal platforms that empower teams to build applications & prototypes.

[VibeSDK ↗](https://github.com/cloudflare/vibesdk) handles AI code generation, code execution in secure sandboxes, live previews, and deployment at scale.

[View demo](https://build.cloudflare.dev/) [View on GitHub](https://github.com/cloudflare/vibesdk)

---

## Features

* **Isolation and multitenancy** — Each of your customers runs code in their own Worker, a [secure and isolated sandbox](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/).
* **Programmable routing, ingress, egress, and limits** — You write code that dispatches requests to your customers' code, and can control [ingress](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/), [egress](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/), and set [per-customer limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/).
* **Databases and storage** — You can provide [databases, object storage, and more](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) to your customers as APIs they can call directly, without API tokens, keys, or external dependencies.
* **Custom domains and subdomains** — You [call an API](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) to create custom subdomains or configure custom domains for each of your customers.

To learn how these components work together, refer to [How Workers for Platforms works](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/#page","headline":"Cloudflare for Platforms · Cloudflare for Platforms docs","description":"Build platforms on Cloudflare where your customers can deploy code with their own subdomains or custom domains.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
