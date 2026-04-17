---
title: Ethereum Gateway
description: Access the Ethereum network through Cloudflare without running a node.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/ethereum-gateway/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Ethereum Gateway

Cloudflare's Ethereum Gateway gives you read and write access to the [Ethereum network](https://developers.cloudflare.com/web3/ethereum-gateway/concepts/ethereum/) without installing any software on your computer.

In particular, users can read all information that has been agreed upon by the consensus of existing nodes in the network. In addition, they can write their own transactions and smart contracts to be stored by these nodes in a distributed manner. Anyone else on the network will be able to view these transactions, and even run your smart contracts using their own supply of the Ethereum currency.

These interactions take place through the official [Ethereum JSON-RPC API ↗](https://github.com/ethereum/execution-apis) and use [Cloudflare-supported API methods](https://developers.cloudflare.com/web3/ethereum-gateway/reference/supported-api-methods/).

## Availability

| Free                                          | Pro                       | Business                  | Enterprise                |                           |
| --------------------------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| Availability                                  | Yes (Usage-based billing) | Yes (Usage-based billing) | Yes (Usage-based billing) | Yes (Usage-based billing) |
| Total gateways                                | 15                        | 15                        | 15                        | Unlimited                 |
| Included bandwidth  (without additional cost) | 500,000 HTTP requests     | 500,000 HTTP requests     | 500,000 HTTP requests     | 1,000,000 HTTP requests   |

Note

For more pricing details, refer to the [Web3 product page ↗](https://www.cloudflare.com/application-services/products/web3/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ethereum-gateway/","name":"Ethereum Gateway"}}]}
```
