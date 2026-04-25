---
title: Node types
description: Full nodes, archive nodes, and their role in Ethereum queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Node types

There are three widely known Ethereum nodes that are used: Full nodes, Archive nodes, and Light nodes.

## Full nodes

Full nodes store all the blockchain’s data and participate in block validation. Validating the blockchain includes keeping track of new blocks and computing and maintaining state changes. Full nodes, once fully synced with the network, can query all Ethereum blockchain data.

## Light nodes

A light node is much smaller than a full node and does not participate in block validation in the same way. The node can query the Ethereum network but does not store the state of the chain. Because of this limitation, it relies on peering with full nodes to get accurate chain data.

## Archive nodes

An archive node is a full node that additionally maintains storage of historical blockchain states. While a full node can calculate a historical state, an archive node readily has the information in local storage and has better performance for these types of requests.

## Nodes at Cloudflare

Cloudflare's Ethereum Gateway provides access to full and archive nodes.

The archive nodes serve requests for the following [RPC state methods ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#state%5Fmethods) when the block number parameter is before the most recent 128 blocks or the default block parameter is set to “earliest”:

* [eth\_getBalance ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetbalance)
* [eth\_getCode ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetcode)
* [eth\_getTransactionCount ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgettransactioncount)
* [eth\_getStorageAt ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fgetstorageat)
* [eth\_call ↗](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth%5Fcall)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ethereum-gateway/","name":"Ethereum Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ethereum-gateway/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ethereum-gateway/concepts/node-types/","name":"Node types"}}]}
```
