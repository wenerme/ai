---
title: Product compatibility
description: Cloudflare products that are and are not compatible with Privacy Gateway, including API Shield, Cache, and WAF.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-gateway/reference/product-compatibility.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Product compatibility

When [using Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/get-started/), the majority of Cloudflare products will be compatible with your application.

However, the following products are not compatible:

* [API Shield](https://developers.cloudflare.com/api-shield/): [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) and [API discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/) are not possible since Cloudflare cannot see the request URLs.
* [Cache](https://developers.cloudflare.com/cache/): Caching of application content is no longer possible since each between client and gateway is end-to-end encrypted.
* [WAF](https://developers.cloudflare.com/waf/): Rules implemented based on request content are not supported since Cloudflare cannot see the request or response content.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-gateway/","name":"Privacy Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-gateway/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-gateway/reference/product-compatibility/","name":"Product compatibility"}}]}
```
