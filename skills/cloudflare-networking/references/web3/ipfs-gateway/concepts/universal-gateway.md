---
description: Access any IPFS content through the Universal Path gateway.
title: Universal Path gateway
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Universal Path gateway

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A Universal Path gateway is a gateway without a DNSLink record. It allows users to access any content hosted on the IPFS network by specifying a CID or IPNS path in the URL.

This differs from a [restricted gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/), which limits the gateway to a single piece of content (a specific CID or IPNS hostname).

## How is it used with Cloudflare?

You can set up a Universal Path gateway the same way you [create any gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/).

Because a Universal Path gateway is open by default, you may want to use the [gateway blocklist](https://developers.cloudflare.com/web3/how-to/manage-gateways/#update-blocklist) to prevent access to specific content. You can block one or more:

* CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
* IPFS content paths (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
* IPNS content paths (`/ipns/example.com`)

Note

This feature is limited to specific plans. For more detail, refer to [Limits](https://developers.cloudflare.com/web3/reference/limits/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/#page","headline":"Universal Path gateway · Cloudflare Web3 docs","description":"Access any IPFS content through the Universal Path gateway.","url":"https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
