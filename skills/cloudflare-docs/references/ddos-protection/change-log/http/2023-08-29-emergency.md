---
title: 2023-08-29 - Emergency
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2023-08-29 - Emergency

| Rule ID     | Description                                                          | Previous Action    | New Action    | Notes |
| ----------- | -------------------------------------------------------------------- | ------------------ | ------------- | ----- |
| ...22807318 | HTTP requests from known botnets.                                    | managed\_challenge | ddos\_dynamic |       |
| ...3fe55678 | HTTP requests with unusual HTTP headers or URI path (signature #44). | N/A                | block         |       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-08-29-emergency/","name":"2023-08-29 - Emergency"}}]}
```
