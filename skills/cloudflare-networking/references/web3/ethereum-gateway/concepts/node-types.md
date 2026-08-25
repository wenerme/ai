---
description: Full nodes, archive nodes, and their role in Ethereum queries.
title: Node types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Node types

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/ethereum-gateway/concepts/node-types/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ethereum-gateway/concepts/node-types/#page","headline":"Node types · Cloudflare Web3 docs","description":"Full nodes, archive nodes, and their role in Ethereum queries.","url":"https://developers.cloudflare.com/web3/ethereum-gateway/concepts/node-types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
