---
title: Gateway status
description: Web3 gateway status values and their meanings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gateway status

Once you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), it can have one of several statuses.

| Status       | Definition                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active**   | The DNS records for your gateway have been created and are functioning correctly.                                                                                                           |
| **Pending**  | Your Web3 gateway is in the process of becoming **Active**.                                                                                                                                 |
| **Deleting** | Your Web3 gateway is being deleted.                                                                                                                                                         |
| **Error**    | The DNS records for your gateway are misconfigured or do not exist. To fix, try [refreshing the gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#refresh-a-gateway). |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/reference/gateway-status/#page","headline":"Gateway status · Cloudflare Web3 docs","description":"Web3 gateway status values and their meanings.","url":"https://developers.cloudflare.com/web3/reference/gateway-status/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/reference/gateway-status/","name":"Gateway status"}}]}
```
