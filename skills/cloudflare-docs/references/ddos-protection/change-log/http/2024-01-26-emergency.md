---
title: 2024-01-26 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2024-01-26-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# 2024-01-26 - Emergency

| Rule ID     | Description                                                          | Previous Action    | New Action         | Notes                                                              |
| ----------- | -------------------------------------------------------------------- | ------------------ | ------------------ | ------------------------------------------------------------------ |
| ...3ad719cd | HTTP requests from known botnet (signature #79).                     | N/A                | ddos\_dynamic      |                                                                    |
| ...61bc58d5 | HTTP requests with unusual HTTP headers or URI path (signature #55). | managed\_challenge | managed\_challenge | Expanded the scope of the rule to catch attacks more consistently. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2024-01-26-emergency/","name":"2024-01-26 - Emergency"}}]}
```
