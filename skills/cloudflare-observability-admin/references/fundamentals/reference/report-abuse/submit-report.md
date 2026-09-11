---
description: Submit abuse reports to Cloudflare via the dashboard, public form, or API, and view reports filed against your account.
title: View and submit reports
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# View and submit reports

Last updated Sep 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Submit reports

Cloudflare provides security, performance, and reliability services to millions of websites. When you report abuse involving a website that uses Cloudflare, Cloudflare's ability to respond depends on the Cloudflare service involved. Many reports involve websites using Cloudflare's pass-through CDN and security services, while others involve domains registered through Cloudflare Registrar or content hosted on Cloudflare's developer platform.

If you find abusive content on a website that uses Cloudflare, you can submit a report in one of three ways:

* **Public form**: Use [Submit an abuse report ↗](https://abuse.cloudflare.com/) to report abuse to Cloudflare. This form is available to anyone on the Internet.
* **Cloudflare dashboard**: Entitled Cloudflare customers can submit abuse reports from the **Abuse reports** page. You must have the **Trust & Safety**, **Admin**, or **Super Admin** role.
[Go to **Abuse reports** ↗](https://dash.cloudflare.com/?to=/:account/abuse-reports)
* **Cloudflare API**: Entitled Cloudflare customers can submit abuse reports using the [Abuse Reports API](https://developers.cloudflare.com/api/resources/abuse%5Freports/). You must have the **Trust & Safety**, **Admin**, or **Super Admin** role.

## View submitted reports

Entitled Cloudflare customers with the **Trust & Safety**, **Admin**, or **Super Admin** role can view abuse reports against content associated with their account.

1. In the Cloudflare dashboard, go to the **Abuse reports** page.
[Go to **Abuse reports** ↗](https://dash.cloudflare.com/?to=/:account/abuse-reports)
2. Optionally, filter reports by date, report status, report type, or domain.

If Cloudflare applied a mitigation to your website because of an abuse report, you may be able to request a review of that mitigation in the dashboard or using the [Abuse Report Mitigations API](https://developers.cloudflare.com/api/resources/abuse%5Freports/subresources/mitigations/). Cloudflare will review the request and may remove the mitigation.

## Receive notifications

You can enable abuse notifications for your account to configure email, webhook, or PagerDuty alerts about new abuse reports against your websites.

For help setting up alerts, refer to [Configure Cloudflare notifications](https://developers.cloudflare.com/notifications/get-started/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/#page","headline":"View and submit reports · Cloudflare Fundamentals docs","description":"Submit abuse reports to Cloudflare via the dashboard, public form, or API, and view reports filed against your account.","url":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
