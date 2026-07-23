---
description: DNS records created for Web3 gateways.
title: Gateway DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# Gateway DNS records

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/reference/gateway-dns-records/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), Cloudflare automatically creates and adds records to your Cloudflare DNS so your gateway can receive and route traffic appropriately:

* **Ethereum gateways**: Creates a [proxied](https://developers.cloudflare.com/dns/proxy-status/) `CNAME` record pointing your hostname to `ethereum.cloudflare.com`.
* **IPFS gateways**: Creates a [proxied](https://developers.cloudflare.com/dns/proxy-status/) `CNAME` record pointing your hostname to `ipfs.cloudflare.com` and a `TXT` record with the value specified for its [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/#how-is-it-used-with-cloudflare).

These records cannot be edited within Cloudflare DNS. To make edits, you will have to [edit the gateway configuration](https://developers.cloudflare.com/web3/how-to/manage-gateways/#edit-a-gateway) itself.

## Existing DNS records

When you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) using a hostname with pre-existing DNS records, Cloudflare automatically overwrites your existing records to make them apply to your Web3 gateway.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/reference/gateway-dns-records/#page","headline":"Gateway DNS records · Cloudflare Web3 docs","description":"DNS records created for Web3 gateways.","url":"https://developers.cloudflare.com/web3/reference/gateway-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
