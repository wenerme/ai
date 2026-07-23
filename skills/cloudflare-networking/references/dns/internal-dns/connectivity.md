---
description: Connect to the Internal DNS Gateway resolver.
title: Connect to Gateway resolver
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to Gateway resolver

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/internal-dns/connectivity/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To connect to Cloudflare Gateway resolver - which is [required to reach private resources in Internal DNS](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview) \- you can use the following options:

* DNS endpoints supported with [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/)
  * DNS over UDP/TCP port 53 (IPv4 or IPv6)
  * DNS over TLS
  * DNS over HTTPS
* [Proxy Auto-Configuration (PAC) files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)
* [WARP device client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)
* [Clientless browser isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/#filter-dns-queries)
* [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/connectivity/#page","headline":"Connect to Gateway resolver · Cloudflare DNS docs","description":"Connect to the Internal DNS Gateway resolver.","url":"https://developers.cloudflare.com/dns/internal-dns/connectivity/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
