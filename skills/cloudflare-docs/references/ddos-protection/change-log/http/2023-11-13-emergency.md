---
title: 2023-11-13 - Emergency
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2023-11-13-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# 2023-11-13 - Emergency

| Rule ID     | Description                                      | Previous Action | New Action    | Notes                                      |
| ----------- | ------------------------------------------------ | --------------- | ------------- | ------------------------------------------ |
| ...22807318 | HTTP requests from known botnets.                | ddos\_dynamic   | ddos\_dynamic | Improve this filter to catch more attacks. |
| ...6fe7a312 | HTTP requests from known botnet (signature #70). | block           | block         |                                            |
| ...7c7a2f25 | HTTP requests from known botnet (signature #74). | N/A             | block         |                                            |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.    | ddos\_dynamic   | ddos\_dynamic |                                            |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-11-13-emergency/","name":"2023-11-13 - Emergency"}}]}
```
