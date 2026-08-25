---
description: Chrome and Mozilla have announced they will no longer trust Entrust certificates. Read about this change and how you can use Cloudflare to reduce impact.
title: Entrust distrust by major browsers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Entrust distrust by major browsers

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/reference/migration-guides/entrust-distrust/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Google Chrome and Mozilla have announced they will no longer trust certificates issued from Entrust's root CAs.

Since Entrust is not within the [certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) used by Cloudflare, this change may only affect customers who upload [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) issued by Entrust.

## The decision

New Entrust certificates issued on **November 12, 2024 or after** will not be trusted on Chrome by default. And new Entrust certificates issued on **December 1, 2024 or after** will not be trusted on Mozilla by default.

Refer to the announcements ([Chrome ↗](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html), [Mozilla ↗](https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/jCvkhBjg9Yw?pli=1)) for a full list of roots that will be distrusted.

## Entrust's response

To prevent their customers from facing issues, Entrust has partnered with SSL.com, a different certificate authority, trusted by both Chrome and Mozilla.

This means that Entrust certificates will be issued using SSL.com roots.

## Cloudflare-managed certificates

Since Cloudflare also [partners with SSL.com](https://developers.cloudflare.com/ssl/reference/certificate-authorities/), you can switch from uploading custom certificates to using Cloudflare-managed certificates. This change brings the following advantages:

* Use [Advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) to have more control and flexibility while also benefitting from automatic renewals.
* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) to automatically issue certificates for your [proxied hostnames](https://developers.cloudflare.com/dns/proxy-status/).
* Use [Delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) to reduce manual intervention when renewing certificates for [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) zones.
* If you are a SaaS provider, extend the benefits of automatic renewals to your customers by specifying SSL.com as the certificate authority when [creating](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) or [editing](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) your custom hostnames (API only).

## More resources

* [Use Cloudflare with SSL.com certificates](https://developers.cloudflare.com/ssl/reference/certificate-authorities/)
* [Google Security Blog ↗](https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html)
* [Entrust TLS Certificate Information Center ↗](https://www.entrust.com/tls-certificate-information-center)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/reference/migration-guides/entrust-distrust/#page","headline":"Entrust distrust by major browsers · Cloudflare SSL/TLS docs","description":"Chrome and Mozilla have announced they will no longer trust Entrust certificates. Read about this change and how you can use Cloudflare to reduce impact.","url":"https://developers.cloudflare.com/ssl/reference/migration-guides/entrust-distrust/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
```
