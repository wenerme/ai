---
title: Remove domain
description: Remove your domain from a SaaS provider O2O configuration.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/remove-domain.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Remove domain

If your SaaS domain is also a [domain using Cloudflare](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/), you can use your Cloudflare DNS to remove your domain from your SaaS provider.

This means that - if you [remove the DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) pointing to your SaaS provider - Cloudflare will stop routing domain traffic through your SaaS provider and the associated custom hostname will enter a **Moved** state.

This also means that you need to keep DNS records pointing to your SaaS provider for as long as you are a customer. Otherwise, you could accidentally remove your domain from their services.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/","name":"SaaS customers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/remove-domain/","name":"Remove domain"}}]}
```
