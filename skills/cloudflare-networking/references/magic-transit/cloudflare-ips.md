---
description: Cloudflare IP addresses used by Magic Transit.
title: Cloudflare IPs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare IPs

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/cloudflare-ips/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To use Magic Transit, you need to own a publicly routable IP address block with a minimum size of `/24`. If you do not own a `/24` address block, you can use Magic Transit with a Cloudflare-owned IP address. This option is helpful if you do not meet the `/24` prefix length requirements or want to protect a smaller network.

To protect your network with a Cloudflare IP address, contact your account manager. After you receive your IP address:

* [Create a tunnel](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/).
* [Set up static routes](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-static-routes) or [BGP peering (beta)](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes).
* [Configure health checks](https://developers.cloudflare.com/magic-transit/network-health/run-endpoint-health-checks/).
* Confirm you properly configured [tunnel](https://developers.cloudflare.com/magic-transit/network-health/update-tunnel-health-checks-frequency/) and endpoint health checks.
* Update your infrastructure at your own pace to use the allocated Cloudflare IPs.

When you use a Cloudflare-owned IP space, you do not need a Letter of Agency (LOA). When using Cloudflare-leased IPs, Cloudflare automatically enables [Magic Transit Egress](https://developers.cloudflare.com/magic-transit/reference/egress/), which routes your egress traffic to Cloudflare instead of the Internet. Set up policy-based routing on your end to ensure return traffic routes properly.

## Check your Cloudflare IPs

You can find your leased Anycast IPs for Magic Transit on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/cloudflare-ips/#page","headline":"Cloudflare IPs · Cloudflare Magic Transit docs","description":"Cloudflare IP addresses used by Magic Transit.","url":"https://developers.cloudflare.com/magic-transit/cloudflare-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
