---
description: Transfer DNS zones between Cloudflare and other providers.
title: DNS Zone transfers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# DNS Zone transfers

Last updated Jul 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Zone transfers allow you to use multiple DNS providers for the same domain to increase availability and fault tolerance. If one provider has an outage, the other can still answer DNS queries, keeping your domain available.

With zone transfers, your providers synchronize DNS records between themselves using one of two protocols:

* **Authoritative zone transfer ([AXFR ↗](https://www.rfc-editor.org/rfc/rfc5936.html))**: Copies the entire zone from the primary to the secondary provider, even if only one record changes.
* **Incremental zone transfer ([IXFR ↗](https://www.rfc-editor.org/rfc/rfc1995.html))**: Transfers only the changes since the last transfer, rather than the entire zone.

Cloudflare supports both protocols.

You have two configuration options for zone transfers:

* [Cloudflare as Primary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/): Cloudflare is your primary DNS provider and performs outgoing zone transfers to your secondary DNS provider(s).
* [Cloudflare as Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/): Cloudflare is your secondary DNS provider and initiates incoming zone transfers from your primary DNS provider.

## Peer DNS server

A peer DNS server is the external DNS provider that participates in zone transfers with Cloudflare. The same peer can be linked to multiple primary and secondary zones. Each peer can be associated with only one Transaction Signature (TSIG) — an authentication mechanism that uses a shared secret to verify zone transfer messages between providers.

The maximum number of linked peers per zone is 30.

You can manage peers via the [API](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/peers/methods/list/) or the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.
[Go to **Configurations** ↗](https://dash.cloudflare.com/?to=/:account/configurations)
2. Refer to **DNS Settings** \> **DNS Zone Transfers**.

The fields below configure how Cloudflare communicates with the peer. When Cloudflare is primary, it sends NOTIFY messages to alert the peer that zone data has changed. When Cloudflare is secondary, it sends AXFR/IXFR requests to retrieve updated records from the peer.

| Field        | Cloudflare as Primary (Outgoing)                            | Cloudflare as Secondary (Incoming)                       |
| ------------ | ----------------------------------------------------------- | -------------------------------------------------------- |
| Name         | Human readable name of peer                                 | Human readable name of peer                              |
| IP           | If configured, where Cloudflare sends the NOTIFY to         | Where Cloudflare sends the AXFR/IXFR transfer request to |
| Port         | IP Port for NOTIFY IP                                       | IP Port for transfer IP                                  |
| TSIG ID      | Attached TSIG object                                        | Attached TSIG object                                     |
| IXFR enabled | Cloudflare always supports IXFR for outgoing zone transfers | Specifies if Cloudflare only sends AXFR or AXFR and IXFR |

## Availability

Zone transfers are only available to customers on an Enterprise plan.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/#page","headline":"DNS Zone transfers · Cloudflare DNS docs","description":"Transfer DNS zones between Cloudflare and other providers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
