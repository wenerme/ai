---
title: Radar API error codes
description: Reference table of Cloudflare Radar API error codes and their corresponding HTTP status codes.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Radar API error codes

| Error Code | HTTP Status Code | Description             |
| ---------- | ---------------- | ----------------------- |
| 2000       | 500              | Internal Error          |
| 2001       | 400              | Input Validation Error  |
| 2002       | 422              | Query is above max cost |
| 1015       | 429              | Too many requests       |
| 7003       | 404              | Not found               |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/get-started/error-codes/","name":"Radar API error codes"}}]}
```
