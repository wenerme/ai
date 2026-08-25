---
description: Build multi-tenant SaaS platforms with Cloudflare SSL for SaaS, Workers for Platforms, and per-tenant storage.
title: SaaS platforms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# SaaS platforms

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/saas/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Build multi-tenant platforms with custom domains, isolated compute, and per-customer configuration. Cloudflare SSL for SaaS provisions and renews SSL certificates for every customer hostname. Workers for Platforms runs customer code in isolated V8 environments. D1, KV, and R2 provide per-tenant data storage. Workers Analytics Engine and Logpush track usage for billing and compliance.

* [Customer domains with SSL for SaaS](https://developers.cloudflare.com/use-cases/saas/custom-domains/)
* [Enable customer code deployment](https://developers.cloudflare.com/use-cases/saas/code-deployment/)
* [Store and isolate customer data](https://developers.cloudflare.com/use-cases/saas/data-isolation/)
* [Protect your platform](https://developers.cloudflare.com/use-cases/saas/protect-platform/)
* [Observe customer usage and billing](https://developers.cloudflare.com/use-cases/saas/usage-analytics/)

## Architecture patterns

### Custom domains with SSL

Allow customers to use their own domains with automatic certificate management:

* **SSL for SaaS** provisions and renews certificates for every custom hostname
* **Cloudflare for Platforms** routes customer domains to your platform with per-tenant configuration

### Multi-tenant compute

Let customers deploy their own code on your platform:

* **Workers for Platforms** runs customer code in isolated V8 environments
* **Dispatch namespaces** route requests to the correct tenant Worker based on hostname or path
* **SSL for SaaS** handles custom domains for each tenant

### Full multi-tenant platform

Combine custom domains, tenant compute, and isolated storage:

* **SSL for SaaS** manages customer hostnames and certificates
* **Workers for Platforms** runs per-tenant application logic
* **D1** or **KV** stores per-tenant data with database-level or key-prefix isolation
* **R2** stores per-tenant files and assets

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) for your platform (for example, `yourplatform.com`). SSL for SaaS uses this as the provider domain against which customer custom hostnames are issued. Refer to [Enable Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/enable/).
* A [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/) for Workers for Platforms. Dispatch namespaces, which route requests to customer-specific Workers, are not available on the free tier.
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) for your platform. This is your domain, not your customers' domains. SSL for SaaS issues customer custom hostnames against this provider domain. Refer to [Enable Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/enable/).
* [Node.js ↗](https://nodejs.org/) (version 16.17.0 or later) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) if you plan to add Workers for Platforms or manage bindings programmatically.

---

## Related resources

### [SSL for SaaS documentation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)

Complete documentation for managing custom hostnames and certificates.

### [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/)

Let customers deploy their own code on your platform.

### [SaaS case studies](https://www.cloudflare.com/case-studies/)

Explore how SaaS companies build on Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/saas/#page","headline":"SaaS platforms · Use cases · Cloudflare use cases","description":"Build multi-tenant SaaS platforms with Cloudflare SSL for SaaS, Workers for Platforms, and per-tenant storage.","url":"https://developers.cloudflare.com/use-cases/saas/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
