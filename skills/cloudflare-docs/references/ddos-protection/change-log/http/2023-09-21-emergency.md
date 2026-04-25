---
title: 2023-09-21 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# 2023-09-21 - Emergency

| Rule ID     | Description                                                          | Previous Action | New Action    | Notes                                                                      |
| ----------- | -------------------------------------------------------------------- | --------------- | ------------- | -------------------------------------------------------------------------- |
| ...1d73128d | HTTP requests from known botnet (signature #56).                     | block           | block         | Make the rule customizable as it might cause false positive in rare cases. |
| ...4a95ba67 | HTTP requests with unusual HTTP headers or URI path (signature #32). | ddos\_dynamic   | ddos\_dynamic | Expand the scope of the rule to catch more attacks.                        |
| ...6fe7a312 | HTTP requests from known botnet (signature #70).                     | block           | block         | Update the rule to remove some rare false positives.                       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-09-21-emergency/","name":"2023-09-21 - Emergency"}}]}
```
