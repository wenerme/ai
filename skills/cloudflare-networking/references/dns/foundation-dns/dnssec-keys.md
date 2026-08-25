---
description: DNSSEC key management for Foundation DNS zones.
title: DNSSEC keys
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# DNSSEC keys

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/foundation-dns/dnssec-keys/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/), you can request that the ZSK/KSK pair that is used for [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) is unique to your Cloudflare account. To opt in to this feature, contact your account team.

All zones within your Cloudflare account - regardless of using [standard](https://developers.cloudflare.com/dns/nameservers/#standard-nameservers) or [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) \- will use the dedicated Zone Signing Key (ZSK) and Key Signing Key (KSK) for DNSSEC. These keys are set at the account level.

## Further reading

For more background information, refer to [How DNSSEC works ↗](https://www.cloudflare.com/learning/dns/dnssec/how-dnssec-works/).

For details about DNSSEC settings at Cloudflare, refer to the [DNSSEC documentation](https://developers.cloudflare.com/dns/dnssec/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/dnssec-keys/#page","headline":"DNSSEC keys · Cloudflare DNS docs","description":"DNSSEC key management for Foundation DNS zones.","url":"https://developers.cloudflare.com/dns/foundation-dns/dnssec-keys/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
