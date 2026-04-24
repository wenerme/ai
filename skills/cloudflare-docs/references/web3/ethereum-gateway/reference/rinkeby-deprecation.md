---
title: Rinkeby deprecation
description: Deprecation notice for the Rinkeby test network.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/ethereum-gateway/reference/rinkeby-deprecation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Rinkeby deprecation

Though Cloudflare's Ethereum Gateway launched with support for the Rinkeby testnet, Rinkeby did not run through [The Merge ↗](https://ethereum.org/en/upgrades/merge/) and - as a result - will no longer be a reliable staging environment for mainnet.

Cloudflare will be deprecating support for Rinkeby on January 30, 2023.

## Migration

To avoid any issues with your Web3 development or debugging, you should switch over to the [Sepolia testnet](https://developers.cloudflare.com/web3/ethereum-gateway/reference/supported-networks/), which is fully supported with your Ethereum Gateway.

To migrate, you should update the endpoints you use when [reading from or writing to](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway/) the Ethereum network.

For example, you might have been using the previous endpoints to interact with your Ethereum Gateway.

Previous curl

```

curl https://web3-trial.cloudflare-eth.com/v1/rinkeby \

--header 'Content-Type: application/json' \

--data '{

  "jsonrpc": "2.0",

  "method": "eth_getBlockByNumber",

  "params": ["0x2244", true],

  "id": 1

}'


```

Previous JS Fetch API

```

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

Explain Code

To migrate away from Rinkeby, change the end of your endpoint to use another testnet.

New curl

```

curl https://web3-trial.cloudflare-eth.com/v1/sepolia \

--header 'Content-Type: application/json' \

--data '{

  "jsonrpc": "2.0",

  "method": "eth_getBlockByNumber",

  "params": ["0x2244", true],

  "id": 1

}'


```

New JS Fetch API

```

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/ethereum-gateway/","name":"Ethereum Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/ethereum-gateway/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/web3/ethereum-gateway/reference/rinkeby-deprecation/","name":"Rinkeby deprecation"}}]}
```
