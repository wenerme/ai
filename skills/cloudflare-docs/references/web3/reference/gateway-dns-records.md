---
title: Gateway DNS records
description: DNS records created for Web3 gateways.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Gateway DNS records

Once you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway), Cloudflare automatically creates and adds records to your Cloudflare DNS so your gateway can receive and route traffic appropriately:

* **Ethereum gateways**: Creates a [proxied](https://developers.cloudflare.com/dns/proxy-status/) `CNAME` record pointing your hostname to `ethereum.cloudflare.com`.
* **IPFS gateways**: Creates a [proxied](https://developers.cloudflare.com/dns/proxy-status/) `CNAME` record pointing your hostname to `ipfs.cloudflare.com` and a `TXT` record with the value specified for its [DNSLink](https://developers.cloudflare.com/web3/ipfs-gateway/concepts/dnslink/#how-is-it-used-with-cloudflare).

These records cannot be edited within Cloudflare DNS. To make edits, you will have to [edit the gateway configuration](https://developers.cloudflare.com/web3/how-to/manage-gateways/#edit-a-gateway) itself.

## Existing DNS records

When you [create a gateway](https://developers.cloudflare.com/web3/how-to/manage-gateways/#create-a-gateway) using a hostname with pre-existing DNS records, Cloudflare automatically overwrites your existing records to make them apply to your Web3 gateway.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/reference/gateway-dns-records/","name":"Gateway DNS records"}}]}
```
