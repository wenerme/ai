---
title: Custom pages
description: Design your custom HTML page and host it online anywhere. Once published, Cloudflare will use the customized page instead of serving our standard page to your visitors.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/surge-readiness/concepts/custom-pages.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom pages

Design your custom HTML page and host it online anywhere. Once published, Cloudflare will use the customized page instead of serving our standard page to your visitors.

Note

We encourage you to customize every page to provide a consistent branding experience for your users. You can also [turn on Origin Error Pages](https://developers.cloudflare.com/rules/custom-errors/#error-pages) for 5XX errors (except errors `520`\-`527`).

Pages you can customize:

* WAF block
* IP/Country block
* IP/Country challenge
* 500 class errors
* 1000 class errors
* Managed challenge / I'm Under Attack Mode
* Rate limiting block

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/concepts/","name":"Prerequisites"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/concepts/custom-pages/","name":"Custom pages"}}]}
```
