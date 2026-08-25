---
description: Exclude a prefix or prefix subset from Advanced DDoS Protection monitoring.
title: Exclude a prefix
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Exclude a prefix

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/exclude-prefix/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To exclude a prefix or a prefix subset from Advanced DDoS Protection:

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.
[Go to **DDoS Managed Rules** ↗](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection**.
3. [Add the prefix](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix/) you previously onboarded to Magic Transit to Advanced TCP Protection.
4. [Add the prefix](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/add-prefix/) (or subset) you wish to exclude as a new, separate prefix in Advanced TCP Protection.
5. For the prefix you added in the previous step, select **Exclude Subset** in the **Enrolled Prefixes** list.

Note

Prefixes or subsets added as _Excluded_ will not be protected by Advanced TCP Protection.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/exclude-prefix/#page","headline":"Exclude a prefix · Cloudflare DDoS Protection docs","description":"Exclude a prefix or prefix subset from Advanced DDoS Protection monitoring.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/exclude-prefix/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
