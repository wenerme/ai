---
description: Error codes you may encounter when validating custom hostnames.
title: Error codes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Error codes

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you [validate a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/), you might encounter the following error codes.

| Error                                                                                                                   | Cause                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone does not have a fallback origin set.                                                                               | Fallback is not active.                                                                                                                                                                                                                  |
| Fallback origin is in a status of initializing, pending\_deployment, pending\_deletion, or deleted.                     | Fallback is not active.                                                                                                                                                                                                                  |
| Custom hostname does not CNAME to this zone.                                                                            | Zone does not have [apex proxying entitlement](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) and custom hostname does not CNAME to zone.                        |
| None of the A or AAAA records are owned by this account and the pre-generated ownership validation token was not found. | Account has [apex proxying enabled](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) but the custom hostname failed the hostname validation check on the A record. |
| This account and the pre-generated ownership validation token was not found.                                            | Hostname does not CNAME to zone or none of the A/AAAA records match reserved IPs for zone.                                                                                                                                               |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/#page","headline":"Error codes - Custom Hostname Validation · Cloudflare for Platforms docs","description":"Error codes you may encounter when validating custom hostnames.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/error-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
