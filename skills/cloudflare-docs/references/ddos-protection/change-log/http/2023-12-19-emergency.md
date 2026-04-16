---
title: 2023-12-19 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2023-12-19-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# 2023-12-19 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                             |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | ----------------------------------------------------------------- |
| ...1fc1e601 | HTTP requests with unusual HTTP headers or URI path (signature #31). | block           | block         | Add more characteristics to the unusual HTTP headers or URI path. |
| ...22807318 | HTTP requests from known botnets.                                    | log             | ddos\_dynamic | Extend the rule to catch more attacks.                            |
| ...d2f294d7 | HTTP requests trying to impersonate browsers.                        | ddos\_dynamic   | ddos\_dynamic | Change the rule to catch more attacks.                            |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-12-19-emergency/","name":"2023-12-19 - Emergency"}}]}
```
