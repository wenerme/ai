---
title: 2023-08-11 - Emergency
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/http/2023-08-11-emergency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# 2023-08-11 - Emergency

| Rule ID     | Description                                                          | Previous Action    | New Action    | Notes |
| ----------- | -------------------------------------------------------------------- | ------------------ | ------------- | ----- |
| ...1de9523e | HTTP requests with unusual HTTP headers or URI path (signature #41). | N/A                | block         |       |
| ...22807318 | HTTP requests from known botnets.                                    | managed\_challenge | ddos\_dynamic |       |
| ...aa03a345 | HTTP requests from known botnet (signature #68).                     | N/A                | block         |       |
| ...efca86eb | HTTP requests from known botnet (signature #66).                     | N/A                | block         |       |
| ...f93fb5d6 | HTTP requests from known botnet (signature #67).                     | N/A                | block         |       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-08-11-emergency/","name":"2023-08-11 - Emergency"}}]}
```
