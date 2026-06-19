---
title: Restrict gateway access
description: Restrict access to your Web3 gateway with WAF custom rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Restrict gateway access

If you are using a [Web3 gateway](https://developers.cloudflare.com/web3/about/) for internal application calls, you may want to restrict gateway access to specific backend services.

You can achieve this goal by [creating general Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to block normal traffic and then [creating service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) to allow access by your backend service.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/how-to/restrict-gateway-access/#page","headline":"Restrict gateway access · Cloudflare Web3 docs","description":"Restrict access to your Web3 gateway with WAF custom rules.","url":"https://developers.cloudflare.com/web3/how-to/restrict-gateway-access/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/how-to/restrict-gateway-access/","name":"Restrict gateway access"}}]}
```
