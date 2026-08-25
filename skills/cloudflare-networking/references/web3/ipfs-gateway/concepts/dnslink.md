---
description: Use DNSLink to map domain names to IPFS content.
title: DNSLink gateways
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web3/llms.txt
> Use this file to discover all available pages before exploring further.

# DNSLink gateways

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you set up a gateway with a DNSLink record, that gateway is restricted to a particular piece of content — either a specific Content Identifier (CID) or an Interplanetary Name Service (IPNS) hostname. This is called a restricted gateway.

A restricted gateway differs from a [universal gateway](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/universal-gateway/), which allows users to access any content hosted on the IPFS network.

## What is DNSLink?

Every file on [IPFS](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/ipfs/) is identified by a [CID ↗](https://docs.ipfs.io/concepts/glossary/#cid) — a long string like `bafybeiaysi4s6lnjev27ln5icwm6tueaw2vdykrtjkwiphwekaywqhcjze`. These CIDs are not practical for end users to type or remember, the same way IP addresses (`192.0.2.1`) are not practical compared to domain names (`example.com`).

DNSLink solves this by mapping a human-readable domain name to an IPFS CID through a DNS TXT record. You put your website files into an IPFS directory and create a DNSLink record pointing your domain to that directory's CID. Users then access your site through a readable URL like `https://cf-ipfs.com/ipns/en.wikipedia-on-ipfs.org/`, and the gateway resolves it to the correct CID.

DNSLink also simplifies content updates. When you publish a new version of your site, update the DNSLink record to point to the new CID and the gateway serves the new version automatically — no need to share a new URL.

Note

For additional details, refer to the official [IPFS documentation ↗](https://docs.ipfs.tech/concepts/dnslink/).

## How is it used with Cloudflare?

You have the option to specify the DNSLink when you [create an IPFS gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), which serves as a custom hostname that directs users to a website already hosted on IPFS.

By default, your DNSLink path is `/ipns/onboarding.ipfs.cloudflare.com`. If you choose to put your website in a different content folder hosted at your own IPFS node or with a pinning service, you will need to specify that value.

For example, the default DNSLink record for `www.example.com` would look like this:

| Record type | Name                      | Content                                      |
| ----------- | ------------------------- | -------------------------------------------- |
| TXT         | \_dnslink.www.example.com | dnslink=/ipns/onboarding.ipfs.cloudflare.com |

For more details about the DNS records created by the IPFS gateway, refer to [Gateway DNS records](https://developers.cloudflare.com/web3/reference/gateway-dns-records/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/#page","headline":"DNSLink gateways · Cloudflare Web3 docs","description":"Use DNSLink to map domain names to IPFS content.","url":"https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
