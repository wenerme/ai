---
description: Serve IPFS content through the Cloudflare IPFS Gateway.
title: Use IPFS gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Use IPFS gateway

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once you have an IPFS gateway — meaning that you [create a new gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) with a `target` of **IPFS** — you can get data from the IPFS network by using a URL.

## Read from the network

Every time you access a piece of content through Cloudflare's IPFS Gateway, you need a URL with two parts: the gateway hostname and the request path.

### Gateway hostname

Your gateway hostname will be the **Hostname** value you supplied when you [created the gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway).

### Request path

The request path will vary based on the type of content you are serving.

If a request path is `/ipfs/<CID_HASH>`, that tells the gateway that you want the content with the Content Identifier (CID) that immediately follows. Because the content is addressed by CID, the gateway's response is immutable and will never change. An example would be `https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/`, which is a mirror of Wikipedia and an immutable `/ipfs/` link.

If a request path is `/ipns/<DOMAIN>`, that tells the gateway that you want it to lookup the CID associated with a given domain in DNS and then serve whatever content corresponds to the CID it happens to find. Because DNS can change over time, so will the gateway's response. An example would be `https://cloudflare-ipfs.com/ipns/ipfs.tech/`, which is IPFS's marketing site and can be changed at any time by modifying the [DNSLink record](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/) associated with the `ipfs.tech` domain.

## Write to the network

Cloudflare's IPFS Gateway is currently limited to read-only access.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/#page","headline":"Use IPFS gateway · Cloudflare Web3 docs","description":"Serve IPFS content through the Cloudflare IPFS Gateway.","url":"https://developers.cloudflare.com/web3/how-to/use-ipfs-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
