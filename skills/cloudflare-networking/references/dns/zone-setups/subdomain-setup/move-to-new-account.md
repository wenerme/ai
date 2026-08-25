---
description: Move a subdomain zone to a different Cloudflare account.
title: Migrate to new account
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate to new account

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When using a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), you can have your subdomain as a separate zone within the same account as the parent domain or within a different account.

If you have already [created a standalone subdomain zone](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/) within the same account, you can still move it to a separate account.

1. [Add the subdomain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to a new Cloudflare account.
2. In the original subdomain zone, [export](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#export-records) the DNS records.
3. Review the exported records, delete any unnecessary ones, and [import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#import-records) them into the new subdomain zone.
4. Update the `NS` records in the parent zone to refer to the newly assigned nameservers of the child zone.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/#page","headline":"Migrate subdomain to a new account · Cloudflare DNS docs","description":"Move a subdomain zone to a different Cloudflare account.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/move-to-new-account/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
