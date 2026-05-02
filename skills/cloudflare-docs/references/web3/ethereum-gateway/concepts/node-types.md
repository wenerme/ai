---
title: Node types
description: Full nodes, archive nodes, and their role in Ethereum queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Node types

Ethereum nodes are the computers that store blockchain data and process queries. There are three types, each with different trade-offs between storage requirements and query capabilities.

## Full nodes

Full nodes store the current state of the blockchain and validate new blocks as they are produced. Once fully synced with the network, a full node can answer queries about any current blockchain data. Full nodes do not retain every historical state — they can recalculate past states when needed, but this requires additional computation.

## Light nodes

Light nodes store only block headers (summaries of each block) rather than the full blockchain state. They can query the Ethereum network but rely on full nodes to provide and verify the underlying data. This makes them much smaller and faster to set up, but less self-sufficient.

## Archive nodes

Archive nodes are full nodes that also store every historical state of the blockchain. Because they keep this data readily available in local storage, they can answer queries about past states (such as "what was this account's balance at block 5,000,000?") much faster than a full node, which would need to recalculate that state.

## Nodes at Cloudflare

Cloudflare's Ethereum Gateway provides access to full and archive nodes.

The archive nodes serve requests for the following [RPC state methods ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#state%5Fmethods) when the block number parameter is before the most recent 128 blocks or the default block parameter is set to `earliest`:

* [eth\_getBalance ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetbalance)
* [eth\_getCode ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetcode)
* [eth\_getTransactionCount ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactioncount)
* [eth\_getStorageAt ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetstorageat)
* [eth\_call ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcall)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ethereum-gateway/","name":"Ethereum Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ethereum-gateway/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ethereum-gateway/concepts/node-types/","name":"Node types"}}]}
```
