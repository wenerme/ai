---
title: Universal Path gateway
description: Access any IPFS content through the Universal Path gateway.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/ipfs-gateway/concepts/universal-gateway.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Universal Path gateway

When you set up a Universal Path gateway — a gateway without a _DNSLink_ record — you are creating an unrestricted gateway that allows users to access any content hosted on the IPFS network.

This differs from a [restricted gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/), which restricts the gateway to a particular piece of content (either a specific Content Identifier (CID) or an Interplanetary Name Service (IPNS) hostname).

## How is it used with Cloudflare?

You can add a Universal Path gateway just as you would [create any gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/).

Likely, you will also want to add items to the [gateway blocklist](https://developers.cloudflare.com/web3/how-to/manage-gateways/#update-blocklist), which allows you to block content access through the Universal Path gateway for one or more:

* CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
* IPFS content (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
* IPNS content paths (`/ipns/example.com`)

Note

This feature is limited to specific plans. For more detail, refer to [Limits](https://developers.cloudflare.com/web3/reference/limits/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ipfs-gateway/","name":"IPFS Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ipfs-gateway/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ipfs-gateway/concepts/universal-gateway/","name":"Universal Path gateway"}}]}
```
