---
description: Configure Email Sending and Email Routing on subdomains within your zone.
title: Subdomains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Subdomains

Last updated Jun 9, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/email-service/configuration/subdomains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Email Routing is a zone-level feature that applies to the apex domain (for example, `example.com`) by default. Email Sending treats each domain separately and is onboarded per domain. You can extend either service to subdomains of the same zone, such as `mail.example.com` or `corp.example.com`, but the onboarding flow differs between the two.

A zone can have up to 30 domains configured for Email Routing or Email Sending combined, including the apex domain. Refer to [Limits](https://developers.cloudflare.com/email-service/platform/limits/) for the full list of platform limits.

## Add a subdomain to Email Routing

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Compute** \> **Email Service** \> **Email Routing**.
[Go to **Email Routing** ↗](https://dash.cloudflare.com/?to=/:account/email-service/routing)
3. Select the apex domain, then open **Settings**.
4. Under **Subdomains**, enter the subdomain you want to enable in the inline form and submit it.

Cloudflare adds the required DNS records to the subdomain. Once the records propagate, you can create [routing rules](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/) on the subdomain in the same way as on the apex domain.

## Add a subdomain to Email Sending

Email Sending treats a subdomain as a separate sending domain. Onboard the subdomain through the standard onboarding flow:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** \> **Email Service** \> **Email Sending**.
[Go to **Email Sending** ↗](https://dash.cloudflare.com/?to=/:account/email-service/sending)
3. Select **Onboard Domain** and choose the subdomain you want to send from. The onboarding flow adds the `cf-bounce` MX, SPF, DKIM, and DMARC records to the subdomain.
4. Select **Done**.

Once verified, you can send emails from addresses on the subdomain (for example, `notifications@mail.example.com`) using either the [REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/) or the [Workers binding](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).

## Next steps

* [Domain configuration](https://developers.cloudflare.com/email-service/configuration/domains/) — manage DNS records for sending and routing.
* [Routing rules and addresses](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/) — create routing rules on subdomains.
* [Deliverability](https://developers.cloudflare.com/email-service/concepts/deliverability/) — separate subdomains for different email types.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/configuration/subdomains/#page","headline":"Subdomains · Cloudflare Email Service docs","description":"Configure Email Sending and Email Routing on subdomains within your zone.","url":"https://developers.cloudflare.com/email-service/configuration/subdomains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
