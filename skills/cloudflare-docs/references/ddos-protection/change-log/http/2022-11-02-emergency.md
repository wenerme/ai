---
title: 2022-11-02 - Emergency
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2022-11-02-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# 2022-11-02 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action | Notes                                  |
| ----------- | -------------------------------------------------------------------- | --------------- | ---------- | -------------------------------------- |
| ...06a46ce3 | HTTP requests with unusual HTTP headers or URI path (signature #18). | N/A             | block      | N/A                                    |
| ...81b5405c | HTTP requests from known botnet (signature #3).                      | block           | block      | Extend the rule to catch more attacks. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2022-11-02-emergency/","name":"2022-11-02 - Emergency"}}]}
```
