---
title: DNS Zone transfers
description: To increase availability and fault tolerance, you can use one or more DNS provider(s) alongside Cloudflare in case one provider becomes unavailable (known as a peer DNS server). Your providers will then transfer DNS records between themselves using authoritative (AXFR) or incremental (IXFR) zone transfers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/zone-setups/zone-transfers/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DNS Zone transfers

To increase availability and fault tolerance, you can use one or more DNS provider(s) alongside Cloudflare in case one provider becomes unavailable (known as a [peer DNS server](#peer-dns-server)). Your providers will then transfer DNS records between themselves using authoritative ([AXFR ↗](https://datatracker.ietf.org/doc/html/rfc5936)) or incremental ([IXFR ↗](https://datatracker.ietf.org/doc/html/rfc1995)) zone transfers.

With AXFR, the entire zone will be transferred from the primary to the secondary provider, even if only one record changes. With IXFR, only the changes will be transferred. Cloudflare supports both protocols.

With zone transfers, you have two configuration options:

* [Cloudflare as Primary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/): Cloudflare is your primary DNS provider and performs outgoing zone transfers to your secondary DNS provider(s).
* [Cloudflare as Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/): Cloudflare is your secondary DNS provider and initiates incoming zone transfers from your primary DNS provider.

## Peer DNS server

Peer DNS servers can be used as primary and secondary external DNS servers. The same peer can be linked to multiple primary and secondary zones. Each peer can be associated with only one Transaction Signature (TSIG).

The maximum number of linked peers per zone is 30.

You can manage peers via the [API](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/peers/methods/list/) or the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Refer to **DNS Settings** \> **DNS Zone Transfers**.

Depending on the usage of the peer, the fields are interpreted in a different way:

| Field        | Cloudflare as Primary (Outgoing)                            | Cloudflare as Secondary (Incoming)                       |
| ------------ | ----------------------------------------------------------- | -------------------------------------------------------- |
| Name         | Human readable name of peer                                 | Human readable name of peer                              |
| IP           | If configured, where Cloudflare sends the NOTIFY to         | Where Cloudflare sends the AXFR/IXFR transfer request to |
| Port         | IP Port for NOTIFY IP                                       | IP Port for transfer IP                                  |
| TSIG ID      | Attached TSIG object                                        | Attached TSIG object                                     |
| IXFR enabled | Cloudflare always supports IXFR for outgoing zone transfers | Specifies if Cloudflare only sends AXFR or AXFR and IXFR |

## Availability

Zone transfers are only available to customers on an Enterprise plan.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}}]}
```
