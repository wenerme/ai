---
description: Deprecation notice for the Rinkeby test network.
title: Rinkeby deprecation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Rinkeby deprecation

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/ethereum-gateway/reference/rinkeby-deprecation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Though Cloudflare's Ethereum Gateway launched with support for the Rinkeby testnet, Rinkeby did not run through [The Merge ↗](https://ethereum.org/en/upgrades/merge/) and - as a result - will no longer be a reliable staging environment for mainnet.

Cloudflare will be deprecating support for Rinkeby on January 30, 2023.

## Migration

To avoid any issues with your Web3 development or debugging, you should switch over to the [Sepolia testnet](https://developers.cloudflare.com/web3/ethereum-gateway/reference/supported-networks/), which is fully supported with your Ethereum Gateway.

To migrate, you should update the endpoints you use when [reading from or writing to](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway/) the Ethereum network.

For example, you might have been using the previous endpoints to interact with your Ethereum Gateway.

```bash
curl https://web3-trial.cloudflare-eth.com/v1/rinkeby \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "eth_getBlockByNumber",
  "params": ["0x2244", true],
  "id": 1
}'
```

```js
await fetch(
  new Request('https://web3-trial.cloudflare-eth.com/v1/rinkeby', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['0x2244', true],
      id: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).then(resp => {
  return resp.json();
});
```

To migrate away from Rinkeby, change the end of your endpoint to use another testnet.

```bash
curl https://web3-trial.cloudflare-eth.com/v1/sepolia \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "eth_getBlockByNumber",
  "params": ["0x2244", true],
  "id": 1
}'
```

```js
await fetch(
  new Request('https://web3-trial.cloudflare-eth.com/v1/sepolia', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['0x2244', true],
      id: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).then(resp => {
  return resp.json();
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ethereum-gateway/reference/rinkeby-deprecation/#page","headline":"Rinkeby deprecation · Cloudflare Web3 docs","description":"Deprecation notice for the Rinkeby test network.","url":"https://developers.cloudflare.com/web3/ethereum-gateway/reference/rinkeby-deprecation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
```
