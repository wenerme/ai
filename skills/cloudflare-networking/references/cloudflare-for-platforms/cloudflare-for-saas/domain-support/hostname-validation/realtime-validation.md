---
description: Validate custom hostnames when customers add DNS routing records to their domain.
title: Real-time validation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Real-time validation

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you use a real-time validation method, Cloudflare verifies your customer's hostname when your customers adds their [DNS routing record](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record) to their authoritative DNS.

## Use when

Real-time validation methods put less burden on your customers because it does not require any additional actions.

However, it may cause some downtime since Cloudflare takes a few seconds to iterate over DNS records. This downtime also can increase - due to the increasing [validation backoff schedule](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/backoff-schedule/) \- if your customer takes additional time to add their DNS routing record.

To minimize this downtime, you can continually send no-change [PATCH requests](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) for the specific custom hostname until it validates (which resets the validation backoff schedule).

To avoid any chance of downtime, use a [pre-validation method](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/)

## How to

Real-time validation occurs automatically when your customer adds their [DNS routing record](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record).

The exact record depends on your Cloudflare for SaaS setup.

### Normal setup (CNAME target)

Most customers will have a `CNAME` target, which requires their customers to create a `CNAME` record similar to:

```txt
mystore.com CNAME customers.saasprovider.com
```

### Apex proxying

With [apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/), SaaS customers need to create an `A` record for their hostname that points to the IP prefix allocated to the SaaS provider's account.

```txt
example.com.  60  IN  A   192.0.2.1
```

Note

For [BYOIP](https://developers.cloudflare.com/byoip/) customers, Cloudflare automatically enables the Apex Proxy Access feature on your BYOIP block, which allows Custom Hostnames to be activated via [Apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/#apex-proxying) when Authoritative DNS for a customer's hostname targets any IP addresses in your BYOIP block.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/#page","headline":"Real-time validation methods - Custom Hostname Validation · Cloudflare for Platforms docs","description":"Validate custom hostnames when customers add DNS routing records to their domain.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
