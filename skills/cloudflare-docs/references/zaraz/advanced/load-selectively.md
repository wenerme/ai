---
title: Load Zaraz selectively
description: You can use Configuration Rules to load Zaraz selectively on specific URLs or subdomains. Configuration Rules can also be used to block Zaraz from loading based on cookies, IP addresses or anything else related to a request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/advanced/load-selectively.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Load Zaraz selectively

You can use [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) to load Zaraz selectively on specific URLs or subdomains. Configuration Rules can also be used to block Zaraz from loading based on cookies, IP addresses or anything else related to a request.

Refer to [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/) documentation to learn more about this feature and how you can use it with Zaraz.

Note

If you need to block one or more actions from firing in a tool, Cloudflare recommends you use [Blocking Triggers](https://developers.cloudflare.com/zaraz/advanced/blocking-triggers/) instead of Configuration Rules.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/advanced/","name":"Advanced options"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/advanced/load-selectively/","name":"Load Zaraz selectively"}}]}
```
