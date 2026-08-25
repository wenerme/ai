---
description: Migrate from legacy Web3 gateways to the current setup.
title: Legacy gateway migration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Legacy gateway migration

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/reference/migration-guide/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

As announced in [our blog post ↗](https://blog.cloudflare.com/ea-web3-gateways/), Cloudflare is deprecating legacy hostnames that point to our public gateway endpoints at `cloudflare-eth.com` and `cloudflare-ipfs.com`.

If you created a hostname pointing to these gateways during the [private beta ↗](https://blog.cloudflare.com/announcing-web3-gateways/), you should migrate to use our new Web3 gateways to avoid a disruption in service.

---

## Migration guide

The migration is a simple process.

First, create a [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).

Then create a new [Web3 custom gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) with your existing hostname.

Alternatively, you could also create a [Web3 custom gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) for a new hostname and then modify your application to use your newly created hostname ([IPFS](https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/) or [Ethereum](https://developers.cloudflare.com/web3/how-to/use-ethereum-gateway/)).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/reference/migration-guide/#page","headline":"Legacy gateway migration · Cloudflare Web3 docs","description":"Migrate from legacy Web3 gateways to the current setup.","url":"https://developers.cloudflare.com/web3/reference/migration-guide/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
```
