---
description: Block or challenge traffic from the Tor network.
title: Block Tor traffic
image: https://developers.cloudflare.com/waf/custom-rules/use-cases/block-tor-traffic/og.png?v=2fead4a3cefd896c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Block Tor traffic

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-tor-traffic/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare identifies requests coming from Tor exit nodes with the continent code `T1`. If you do not want Tor traffic on your zone, this example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests from the Tor network using the [`ip.src.continent`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/) field.

- **When incoming requests match**:

  If you are using the expression editor:
  `(ip.src.continent eq "T1")`
- **Then take action**: *Block*

If you prefer not to block Tor traffic outright, use the *Managed Challenge* action instead.

Note

If you block or challenge Tor traffic, disable [Onion Routing](https://developers.cloudflare.com/network/onion-routing/) on your zone. Onion Routing improves the experience of visitors using the Tor Browser, which contradicts blocking Tor traffic.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-tor-traffic/#page","headline":"Block Tor traffic","description":"Block or challenge traffic from the Tor network.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-tor-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-tor-traffic/og.png?v=2fead4a3cefd896c","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
