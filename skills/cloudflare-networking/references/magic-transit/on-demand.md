---
description: Activate Magic Transit protection on demand during attacks.
title: Magic Transit on-demand
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/magic-transit/llms.txt
> Use this file to discover all available pages before exploring further.

# Magic Transit on-demand

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/magic-transit/on-demand/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you have access to the Magic Transit on-demand option, you can [configure prefix advertisement](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement) from the **IP Prefixes** page in your Cloudflare account home or through the [Cloudflare API](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement%5Fstatus/methods/edit/).

A common workflow is to enable prefix advertisement during an attack so that you can take advantage of Cloudflare protection and then disable advertisement once the incident is resolved. Dynamic advertisement (through the dashboard or API) does not support prefixes using BGP-controlled advertisements. Specify your preferred on-demand advertisement method during prefix onboarding.

To ensure smooth operation and simplify the advertisement process during an attack scenario, refer to [Dynamic advertisement: Best practices](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/).

Note

You cannot use Magic Transit on-demand with Cloudflare leased IPs.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/magic-transit/on-demand/#page","headline":"Magic Transit on-demand · Cloudflare Magic Transit docs","description":"Activate Magic Transit protection on demand during attacks.","url":"https://developers.cloudflare.com/magic-transit/on-demand/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
