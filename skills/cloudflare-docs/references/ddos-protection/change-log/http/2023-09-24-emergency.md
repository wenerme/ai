---
title: 2023-09-24 - Emergency
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2023-09-24-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# 2023-09-24 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action | Notes                              |
| ----------- | -------------------------------------------------------------------- | --------------- | ---------- | ---------------------------------- |
| ...0fb54442 | HTTP requests with unusual HTTP headers or URI path (signature #49). | N/A             | block      |                                    |
| ...3dd5f188 | HTTP requests from known botnet (signature #71).                     | N/A             | block      |                                    |
| ...97003a74 | HTTP requests with unusual HTTP headers or URI path (signature #17). | block           | block      | Expand rule to catch more attacks. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-09-24-emergency/","name":"2023-09-24 - Emergency"}}]}
```
