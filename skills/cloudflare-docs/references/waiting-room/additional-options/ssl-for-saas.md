---
title: Combine with Cloudflare for SaaS
description: Use Waiting Room with Cloudflare for SaaS custom hostnames.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/additional-options/ssl-for-saas.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Combine with Cloudflare for SaaS

If your application is using a custom hostname — meaning your SaaS provider is using [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) — your application can support a waiting room.

## Applications on Cloudflare

If your application is already using Cloudflare, create a waiting room using the [typical process](https://developers.cloudflare.com/waiting-room/how-to/create-waiting-room/).

## Applications not on Cloudflare

If your application is not using Cloudflare, you need to ask your SaaS provider to configure a waiting room on [your Cloudflare for SaaS zone](https://developers.cloudflare.com/waiting-room/how-to/place-waiting-room/#custom-hostnames).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}},{"@type":"ListItem","position":3,"item":{"@id":"/waiting-room/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":4,"item":{"@id":"/waiting-room/additional-options/ssl-for-saas/","name":"Combine with Cloudflare for SaaS"}}]}
```
