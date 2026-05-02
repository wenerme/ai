---
title: About
description: How Cloudflare Web3 gateways connect HTTP clients to decentralized networks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# About

Cloudflare Web3 gateways let your application interact with decentralized networks (IPFS and Ethereum) using standard HTTP requests. Instead of running your own IPFS or Ethereum node, you point your domain at Cloudflare and the gateway handles network communication on your behalf.

When you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), Cloudflare automatically creates and adds specific [DNS records](https://developers.cloudflare.com/web3/reference/gateway-dns-records/) to your Cloudflare account. When the hostname associated with your gateway receives requests, its DNS records route these requests to a Cloudflare Workers script that communicates with the underlying network.

![Cloudflare's Web3 gateways provide HTTP-accessible interfaces to the IPFS and Ethereum networks. For more details, continue reading.](https://developers.cloudflare.com/_astro/web3-gateway-flow-diagram.C8S74hHM_261bFb.webp) 

## Read operations

When your application sends a read request (for example, fetching a file from IPFS or querying an Ethereum account balance), the gateway checks whether the response is already cached at a nearby Cloudflare data center.

* If cached, the gateway returns the content immediately over HTTP, without contacting the underlying network.
* If not cached, the gateway fetches the content from Cloudflare's own IPFS or Ethereum nodes, caches it for future requests, and returns it over HTTP.

## Write operations

Note

Only available for gateways to EVM-based chains, such as [Ethereum](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway).

Write operations submit new data to the network. For example, sending a transaction or deploying a smart contract. The gateway forwards your request to one of Cloudflare's Ethereum nodes, which places the transaction in its mempool (a queue of pending transactions waiting to be included in a block).

From there, the network's validators select transactions from the mempool, group them into a block, and reach consensus on the block's validity. Once the block is accepted, it becomes part of the permanent blockchain record. The gateway returns a transaction ID so your application can track the result.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/about/","name":"About"}}]}
```
