---
title: Limits
description: Rate limits and size limits for Web3 gateways.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/reference/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Limits

The following limits apply to users of the Cloudflare Web3 Gateways.

Note

For more pricing details, refer to the [Web3 product page ↗](https://www.cloudflare.com/application-services/products/web3/).

## IPFS Gateway

The following limits apply to Cloudflare's [IPFS Gateway](https://developers.cloudflare.com/web3/ipfs-gateway/).

| Free                                         | Pro                                                                              | Business                                                                         | Enterprise                                                                       |                                                                                                                                                                                       |
| -------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Availability                                 | Yes (Usage-based billing)                                                        | Yes (Usage-based billing)                                                        | Yes (Usage-based billing)                                                        | Yes (Usage-based billing)                                                                                                                                                             |
| Total gateways                               | 15                                                                               | 15                                                                               | 15                                                                               | Unlimited                                                                                                                                                                             |
| Gateway types                                | [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/) | [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/) | [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/) | [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/),[Universal Gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/) |
| Included bandwidth (without additional cost) | 50 GB data transfer                                                              | 50 GB data transfer                                                              | 50 GB data transfer                                                              | 100 GB data transfer                                                                                                                                                                  |
| File size limit                              | None                                                                             | None                                                                             | None                                                                             | None                                                                                                                                                                                  |

## Ethereum Gateway

The following limits apply to Cloudflare's [Ethereum Gateway](https://developers.cloudflare.com/web3/ethereum-gateway/).

| Free                                          | Pro                       | Business                  | Enterprise                |                           |
| --------------------------------------------- | ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| Availability                                  | Yes (Usage-based billing) | Yes (Usage-based billing) | Yes (Usage-based billing) | Yes (Usage-based billing) |
| Total gateways                                | 15                        | 15                        | 15                        | Unlimited                 |
| Included bandwidth  (without additional cost) | 500,000 HTTP requests     | 500,000 HTTP requests     | 500,000 HTTP requests     | 1,000,000 HTTP requests   |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/reference/limits/","name":"Limits"}}]}
```
