---
title: Universal Path gateway
description: Access any IPFS content through the Universal Path gateway.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Universal Path gateway

A Universal Path gateway is a gateway without a DNSLink record. It allows users to access any content hosted on the IPFS network by specifying a CID or IPNS path in the URL.

This differs from a [restricted gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/), which limits the gateway to a single piece of content (a specific CID or IPNS hostname).

## How is it used with Cloudflare?

You can set up a Universal Path gateway the same way you [create any gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/).

Because a Universal Path gateway is open by default, you may want to use the [gateway blocklist](https://developers.cloudflare.com/web3/how-to/manage-gateways/#update-blocklist) to prevent access to specific content. You can block one or more:

* CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
* IPFS content paths (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
* IPNS content paths (`/ipns/example.com`)

Note

This feature is limited to specific plans. For more detail, refer to [Limits](https://developers.cloudflare.com/web3/reference/limits/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ipfs-gateway/","name":"IPFS Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ipfs-gateway/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ipfs-gateway/concepts/universal-gateway/","name":"Universal Path gateway"}}]}
```
