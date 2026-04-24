---
title: Limits
description: Rate limits and data retention for Web Analytics.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web-analytics/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limits

Cloudflare limits the number of sites for which you can track web analytics, as well as the number of rules allowed for each plan type. Refer to the following tables for more information.

## Site limits

Cloudflare limits the number of sites for which you can track web analytics when they are not proxied by Cloudflare.

| Site type                      | Limit    |
| ------------------------------ | -------- |
| Not proxied through Cloudflare | 10       |
| Proxied through Cloudflare     | No limit |

## Rules limits

Cloudflare limits the number of Web Analytics rules you can have by plan type. For plans with a limit of zero, Web Analytics injects the JS snippet on all subdomains.

Rules are only available for sites proxied through Cloudflare.

| Plan type  | Rules limit |
| ---------- | ----------- |
| Free       | 0           |
| Pro        | 5           |
| Business   | 20          |
| Enterprise | 100         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/limits/","name":"Limits"}}]}
```
