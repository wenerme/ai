---
description: Configure IAB TCF compliance for Zaraz consent.
title: IAB TCF Compliance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

# IAB TCF Compliance

Last updated Sep 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/zaraz/consent-management/iab-tcf-compliance/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Zaraz Consent Management Platform is compliant with the IAB Transparency & Consent Framework. Enabling this feature [could be required ↗](https://blog.google/products/adsense/new-consent-management-platform-requirements-for-serving-ads-in-the-eea-and-uk/) in order to serve Google Ads in the EEA and the UK.

The CMP ID of the approval is 433 and be can seen in the [IAB Europe ↗](https://iabeurope.eu/cmp-list/) website.

Using the Zaraz Consent Management Platform in IAB TCF Compliance Mode is opt-in.

1. In the Cloudflare dashboard, go to the **Consent** page.
[Go to **Consent** ↗](https://dash.cloudflare.com/?to=/:account/tag-management/consent)
2. Check the **Use IAB TCF compliant modal** option.
3. Under the **Assign purposes to tools** section, add vendor details to every tool that was not automatically assigned.
4. Press **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/consent-management/iab-tcf-compliance/#page","headline":"IAB Transparency & Consent Framework Compliance · Cloudflare Zaraz docs","description":"Configure IAB TCF compliance for Zaraz consent.","url":"https://developers.cloudflare.com/zaraz/consent-management/iab-tcf-compliance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
