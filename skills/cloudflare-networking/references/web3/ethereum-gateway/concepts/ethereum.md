---
description: How the Ethereum blockchain and smart contracts work.
title: Ethereum network
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

#  Ethereum network

Last updated May 1, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web3/ethereum-gateway/concepts/ethereum/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Ethereum network is a decentralized platform for running programs called smart contracts. A smart contract is a program stored at a unique address on the network that executes automatically when triggered by a transaction. Because smart contracts run on Ethereum, they can handle any computation that a general-purpose programming language can express.

When a smart contract runs, every node in the network independently verifies the result. The network then reaches consensus — all nodes agree on the outcome — and the result becomes part of the permanent record.

## Smart contracts

Running a smart contract requires paying a fee in Ethereum's currency, ETH. This fee (called "gas") compensates the network's validators for the computational work of executing your transaction and adding it to the blockchain.

If the smart contract transfers ETH between accounts, those balance changes are also recorded in the blockchain. The blockchain therefore represents a complete, verifiable record of the network's current state — including every account balance and every smart contract's stored data.

## Addressing

Transactions are grouped into blocks, and blocks are chained together in sequence to form the blockchain — a complete history of every transaction since the network started.

Each block has a unique hash identifier (a long hexadecimal string like `0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3q`), and each transaction within a block has its own hash as well. You can use either hash to look up and inspect specific blocks or transactions.

When a new block is added, it is broadcast to every node in the network. Because all transactions are public and verifiable, the blockchain provides a transparent and accountable record of the network's state.

## Read and write content

To read data from Ethereum — such as checking account balances or querying smart contract state — you need access to an Ethereum node. You can run a node yourself (for example, using [go-ethereum ↗](https://github.com/ethereum/go-ethereum/)) or use a gateway like Cloudflare's. Reads are performed through the [JSON-RPC API ↗](https://github.com/ethereum/wiki/wiki/JSON-RPC), a standard interface for sending queries to the network.

To write data — such as sending a transaction or deploying a smart contract — you also use the JSON-RPC API, but you must additionally provide ETH to pay for the transaction fee and sign the transaction with the private key from your [Ethereum wallet ↗](https://www.ethereum.org/use/#%5F3-what-is-a-wallet-and-which-one-should-i-use). Once submitted, the transaction is broadcast to the network and included in the blockchain.

## Connect your website to the gateway

To access the Ethereum network from a custom domain name — without running your own node — you can [create an Ethereum Gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) through Cloudflare.

## Related resources

If you’re interested in learning more, you can read the official [RPC documentation ↗](https://github.com/ethereum/wiki/wiki/JSON-RPC), along with the official documentation [provided by Ethereum ↗](https://www.ethereum.org/use/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ethereum-gateway/concepts/ethereum/#page","headline":"Ethereum network · Cloudflare Web3 docs","description":"How the Ethereum blockchain and smart contracts work.","url":"https://developers.cloudflare.com/web3/ethereum-gateway/concepts/ethereum/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
