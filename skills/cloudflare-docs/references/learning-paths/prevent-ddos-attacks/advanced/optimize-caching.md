---
title: Optimize caching
description: Optimize caching to reduce origin load.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/prevent-ddos-attacks/advanced/optimize-caching.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Optimize caching

The more content is cached, the fewer requests go back to your origin server (whether due to legitimate or illegitimate traffic).

A few ways to optimize Cloudflare caching include:

* Creating [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) to customize the cache properties of specific HTTP requests.
* Enabling the [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) feature, which dramatically increases cache hit ratios.
* Reviewing our other various [configuration options](https://developers.cloudflare.com/cache/get-started/), which may vary based on your plan and application setup.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/optimize-caching/","name":"Optimize caching"}}]}
```
