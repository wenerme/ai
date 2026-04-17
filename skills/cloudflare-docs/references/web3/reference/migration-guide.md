---
title: Legacy gateway migration
description: Migrate from legacy Web3 gateways to the current setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/reference/migration-guide.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Legacy gateway migration

As announced in [our blog post ↗](https://blog.cloudflare.com/ea-web3-gateways/), Cloudflare is deprecating legacy hostnames that point to our public gateway endpoints at `cloudflare-eth.com` and `cloudflare-ipfs.com`.

If you created a hostname pointing to these gateways during the [private beta ↗](https://blog.cloudflare.com/announcing-web3-gateways/), you should migrate to use our new Web3 gateways to avoid a disruption in service.

---

## Migration guide

The migration is a simple process.

First, create a [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).

Then create a new [Web3 custom gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) with your existing hostname.

Alternatively, you could also create a [Web3 custom gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) for a new hostname and then modify your application to use your newly created hostname ([IPFS](https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/) or [Ethereum](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway/)).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/reference/migration-guide/","name":"Legacy gateway migration"}}]}
```
