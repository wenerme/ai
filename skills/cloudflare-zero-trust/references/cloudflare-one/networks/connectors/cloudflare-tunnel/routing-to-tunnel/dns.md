---
description: DNS records in Zero Trust networking.
title: DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# DNS records

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you create a tunnel, Cloudflare generates a subdomain at `<UUID>.cfargotunnel.com`. You point a CNAME record at this subdomain to route traffic from your hostname to the tunnel.

The `cfargotunnel.com` subdomain only proxies traffic for DNS records in the same Cloudflare account. If someone discovers your tunnel UUID, they cannot create a DNS record in another account to proxy traffic through it.

## Create a DNS record

To create a DNS record for a Cloudflare Tunnel:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **DNS Records** for your domain.
[Go to **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Enter the following values:

  * **Type**: _CNAME_
  * **Name**: Subdomain of your application
  * **Target**: `<UUID>.cfargotunnel.com`
4. Select **Save**.
![Example of fields completed to create a new CNAME record.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2544,height=830,format=webp/_astro/dns-record.B25etJTI.png)

For locally-managed tunnels, run the following command to create a CNAME record pointing to your tunnel subdomain:

```sh
cloudflared tunnel route dns <UUID or NAME> www.app.com
```

This creates a CNAME record but does not proxy traffic unless the tunnel is running.

Note

To create DNS records using `cloudflared`, the [cert.pem](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#certpem) file must be installed on your system.

The DNS record and the tunnel are independent. You can create DNS records that point to a tunnel that is not running. If a tunnel stops, the DNS record is not deleted — visitors will see a `1016` error.

You can also create multiple DNS records pointing to the same tunnel subdomain. If you route traffic from multiple hostnames to multiple services, create a CNAME entry for each hostname. All entries share the same target.

## Cloudflare settings

Published applications inherit the Cloudflare settings for their hostname, including [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/), [WAF rules](https://developers.cloudflare.com/waf/), and other [Rules](https://developers.cloudflare.com/rules/) configurations. You can change these settings for each hostname in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

If you use a load balancer, settings are applied to the load balancer hostname instead.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/#page","headline":"DNS records · Cloudflare One docs","description":"DNS records in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
