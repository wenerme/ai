---
title: About address maps
description: Map IP prefixes to zones and accounts with address maps.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# About address maps

Address map is a data structure enabling customers with BYOIP prefixes or account-level static IPs to specify which IP addresses should be mapped to DNS records when they are proxied through Cloudflare.

By default, Cloudflare responds to DNS queries for proxied hostnames with Cloudflare-owned [anycast IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). Address maps allow you to override this behavior — when a zone or account is associated with an address map, Cloudflare responds with the IP addresses you specify instead.

To use address maps, you must first have [BYOIP](https://developers.cloudflare.com/byoip/) prefixes or [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) configured on your account. You can [customize the IPs Cloudflare uses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/#customize-cloudflare-ip-addresses) through either approach. If you are interested in address maps but do not yet have BYOIP or static IPs, contact your account manager.

Note

Both IPv4 and IPv6 addresses are supported.

---

## How Address Maps works

For zones using [Cloudflare's authoritative DNS](https://developers.cloudflare.com/dns/), Cloudflare typically responds to DNS queries for proxied hostnames with [anycast IPs](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). However, if you [customize the IPs Cloudflare uses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/#customize-cloudflare-ip-addresses) and use Address Maps, Cloudflare will respond with the IP address(es) on the address map.

Address maps do not change [how Cloudflare reaches the configured origin](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy). The IP addresses defined on your zone's [DNS Records ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) continue to instruct Cloudflare how to reach the origin.

Warning

Depending on whether you use static IPs or BYOIP, the process to [create an address map](https://developers.cloudflare.com/byoip/address-maps/setup/) is different.

### Static IPs or BYOIP

Leased static IPs allow you to use a set of specifically assigned Cloudflare IPs to ensure they do not change. Cloudflare creates an address map with your static IPs that you may edit. You cannot create another map using your static IPs.

With BYOIP, you use your IPs by bringing an address space that you lease or own and creating an address map.

---

## Immutable address maps

Some customers may only proxy zones through BYOIP addresses, and are prohibited from using Cloudflare IP addresses for proxied DNS names. In this case, Cloudflare will create an immutable, account-wide address map to ensure all zones in your account receive BYOIP addresses as a fallback. These address maps cannot be deleted.

It is still possible to create more specific zone-level address maps with specific BYOIPs, but DNS will fall back to the account-wide address map without one.

To specify different addresses for certain zones, [create a new address map](https://developers.cloudflare.com/byoip/address-maps/setup/).

---

## Spectrum compatibility

You can use address maps to set up [non-SNI support](https://developers.cloudflare.com/byoip/address-maps/setup/#spectrum-https-applications) for Spectrum HTTPS applications.

However, to control what IP address Cloudflare will use when responding to requests for your Spectrum applications, you should first refer to their respective configuration and set the `edge_ips` field as `static`, e.g.:

```

"edge_ips": {

  "type": "static",

  "ips": ["1.2.3.4"]

}


```

For details, refer to the [Spectrum API](https://developers.cloudflare.com/api/resources/spectrum#%28resource%29%20spectrum%20%3E%20%28model%29%20edge%5Fips%20%3E%20%28schema%29%20%3E%20%28variant%29%201).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/address-maps/","name":"About address maps"}}]}
```
