---
description: Serve content directly through the Tor network with Onion Routing.
title: Onion Routing and Tor support
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network/llms.txt
> Use this file to discover all available pages before exploring further.

# Onion Routing and Tor support

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network/onion-routing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Improve the Tor user experience by enabling Onion Routing, which enables Cloudflare to serve your website’s content directly through the Tor network and without requiring exit nodes.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## How it works

Onion Routing helps improve Tor browsing as follows:

* Tor users no longer access your site via exit nodes, which can sometimes be compromised, and may snoop on user traffic.
* Human Tor users and bots can be distinguished by our Onion services, such that interactive challenges are only served to malicious bot traffic.

[Tor Browser ↗](https://tb-manual.torproject.org/about/) users receive an [alt-svc header ↗](https://httpwg.org/specs/rfc7838.html#alt-svc) as part of the response to the first request to your website. The browser then creates a Tor Circuit to access this website using the `.onion` TLD service provided by this header.

You should note that the visible domain in the user interface remains unchanged, as the host header and the SNI are preserved. However, the underlying connection changes to be routed through Tor, as the [UI denotes on the left of the address bar ↗](https://tb-manual.torproject.org/managing-identities/#managing-identities) with a Tor Circuit. Cloudflare does not provide a certificate for the `.onion` domain provided as part of alt-svc flow, which therefore cannot be accessed via HTTPS.

## Enable Onion Routing

To enable **Onion Routing** in the dashboard:

1. In the Cloudflare dashboard, go to the **Network** page.
[Go to **Network** ↗](https://dash.cloudflare.com/?to=/:account/:zone/network)
2. For **Onion Routing**, switch the toggle to **On**.

To enable **Onion Routing** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `opportunistic_onion` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network/onion-routing/#page","headline":"Onion Routing and Tor support · Cloudflare Network settings docs","description":"Serve content directly through the Tor network with Onion Routing.","url":"https://developers.cloudflare.com/network/onion-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
