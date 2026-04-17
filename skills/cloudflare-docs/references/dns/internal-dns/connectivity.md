---
title: Connect to Gateway resolver
description: Connect to the Internal DNS Gateway resolver.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/internal-dns/connectivity.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect to Gateway resolver

To connect to Cloudflare Gateway resolver - which is [required to reach private resources in Internal DNS](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview) \- you can use the following options:

* DNS endpoints supported with [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/)  
   * DNS over UDP/TCP port 53 (IPv4 or IPv6)  
   * DNS over TLS  
   * DNS over HTTPS
* [Proxy Auto-Configuration (PAC) files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)
* [WARP device client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)
* [Clientless browser isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/#filter-dns-queries)
* [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/connectivity/","name":"Connect to Gateway resolver"}}]}
```
