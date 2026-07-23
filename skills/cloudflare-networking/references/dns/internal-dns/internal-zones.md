---
description: Explore internal DNS zones in Cloudflare. These zones organize DNS records for resources accessible only within your private network, queried via Cloudflare Gateway.
title: Internal zones
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Internal zones

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/internal-dns/internal-zones/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Internal DNS zones are groupings of internal DNS records. While [public DNS records](https://developers.cloudflare.com/dns/manage-dns-records/) contain information about resources that you want to make available to the public Internet, [internal DNS records](https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/) allow you to manage resources that should only be available within your private network.

Refer to [Manage internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/) for a full list of configuration conditions and step-by-step instructions.

Internal DNS zones do not get assigned Cloudflare nameservers and can only be queried via [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) when linked to a [DNS view](https://developers.cloudflare.com/dns/internal-dns/dns-views/). The Gateway configuration must exist within the same Cloudflare account where the internal zone exists.

## Resources

* [Manage internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/)
* [Manage internal DNS records](https://developers.cloudflare.com/dns/internal-dns/internal-zones/internal-dns-records/)
* [Reference zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/#page","headline":"Internal zones · Cloudflare DNS docs","description":"Explore internal DNS zones in Cloudflare. These zones organize DNS records for resources accessible only within your private network, queried via Cloudflare Gateway.","url":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
