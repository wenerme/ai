---
title: Cloudflare for Platforms
description: Build platforms on Cloudflare where your customers can deploy code with their own subdomains or custom domains.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare for Platforms

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

[ View demo ](https://worker-publisher-template.templates.workers.dev/) [ View on GitHub ](https://github.com/cloudflare/templates/tree/main/worker-publisher-template) 

### AI vibe coding platform

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/vibesdk)

Build an [AI vibe coding platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-vibe-coding-platform/) where users describe what they want and AI generates and deploys working applications. Best for: AI-powered app builders, code generation tools, or internal platforms that empower teams to build applications & prototypes.

[VibeSDK ↗](https://github.com/cloudflare/vibesdk) handles AI code generation, code execution in secure sandboxes, live previews, and deployment at scale.

[ View demo ](https://build.cloudflare.dev/) [ View on GitHub ](https://github.com/cloudflare/vibesdk) 

---

## Features

* **Isolation and multitenancy** — Each of your customers runs code in their own Worker, a [secure and isolated sandbox](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/).
* **Programmable routing, ingress, egress, and limits** — You write code that dispatches requests to your customers' code, and can control [ingress](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/), [egress](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/), and set [per-customer limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/).
* **Databases and storage** — You can provide [databases, object storage, and more](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) to your customers as APIs they can call directly, without API tokens, keys, or external dependencies.
* **Custom domains and subdomains** — You [call an API](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) to create custom subdomains or configure custom domains for each of your customers.

To learn how these components work together, refer to [How Workers for Platforms works](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}}]}
```
