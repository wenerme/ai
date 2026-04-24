---
title: Gateway status
description: Web3 gateway status values and their meanings.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/reference/gateway-status.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Gateway status

Once you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), it can have one of several statuses.

| Status       | Definition                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Active**   | The DNS records for your gateway have been created and are functioning correctly.                                                                                                           |
| **Pending**  | Your Web3 gateway is in the process of becoming **Active**.                                                                                                                                 |
| **Deleting** | Your Web3 gateway is being deleted.                                                                                                                                                         |
| **Error**    | The DNS records for your gateway are misconfigured or do not exist. To fix, try [refreshing the gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#refresh-a-gateway). |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/reference/gateway-status/","name":"Gateway status"}}]}
```
