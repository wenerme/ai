---
title: Limitations
description: Load Balancing limitations and quotas.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/reference/limitations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limitations

| Name              | Non-Enterprise           | Enterprise               |
| ----------------- | ------------------------ | ------------------------ |
| Load balancers    | 20                       | custom                   |
| Monitor intervals | 15s (min), 3600s (max)   | 10s (min), 3600s (max)   |
| Monitors          | 1.5x the number of pools | 1.5x the number of pools |
| Endpoints         | 20                       | custom                   |
| Pools             | 20                       | custom                   |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/reference/limitations/","name":"Limitations"}}]}
```
