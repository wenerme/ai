---
description: Remove a zone from your Cloudflare account.
title: Zone removal
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Zone removal

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/removal/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If domains on Free zones remain in the [Pending](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#pending) or [Moved](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#moved) status for too long, Cloudflare automatically removes them from your account and the Cloudflare network. Refer to [zone statuses](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) for more details.

You can also [manually remove a domain](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) from Cloudflare.

If you need to re-add a domain to your account, follow the [regular onboarding flow](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/). Cloudflare will assign a new nameserver pair when you re-add the domain, so you must [update your registrar](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) with the new nameservers. Refer to [nameserver assignment](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method) for details.

Purged zones

By default, your zone will be automatically purged seven days after the removal. In this case, even if you re-add the domain to the same Cloudflare account, none of the zone settings are expected to be restored. Refer to [zone statuses](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) for more details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/removal/#page","headline":"Zone removal · Cloudflare DNS docs","description":"Remove a zone from your Cloudflare account.","url":"https://developers.cloudflare.com/dns/zone-setups/removal/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
