---
description: Let your customers deploy their own code on your platform with isolated execution environments.
title: Enable customer code deployment
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable customer code deployment

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/saas/code-deployment/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

SaaS platforms often need to let customers run their own code — custom logic, integrations, webhooks — without compromising tenant isolation or platform stability. Cloudflare Workers for Platforms runs each customer's code in a separate V8 isolate with dispatch routing based on hostname, path, or header.

## Solutions

### Workers for Platforms

Deploy isolated Workers execution environments for your customers. [Learn more about Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/).

* **Tenant isolation** \- Each customer's code runs in a separate V8 isolate with no shared memory between tenants
* **Custom logic** \- Customers can deploy their own Workers to extend or customize your platform's behavior
* **Dispatch routing** \- Route incoming requests to the correct customer Worker based on hostname, path, or header
* **Observability** \- Tail Workers capture logs and errors across all tenant code from a single integration

## Get started

1. [Workers for Platforms get started](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/get-started/)
2. [Configure Dispatch Namespaces](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/code-deployment/#page","headline":"Enable customer code deployment · Cloudflare use cases","description":"Let your customers deploy their own code on your platform with isolated execution environments.","url":"https://developers.cloudflare.com/use-cases/saas/code-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
