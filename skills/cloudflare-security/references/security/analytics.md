---
description: Security Analytics shows information about all incoming HTTP requests or mitigated requests (rule matches).
title: Security Analytics (new dashboard)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Security Analytics (new dashboard)

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security/analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Security Analytics shows information about all incoming HTTP requests or only about requests mitigated by Cloudflare.

Use Security Analytics as your starting point to understand and analyze traffic patterns, and to create security rules based on the filters you applied.

To access Security Analytics in the new security dashboard, go to the **Analytics** page.

[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)

By default, Security Analytics queries filter on `requestSource = 'eyeball'`, which represents requests from end users. Note that requests from Cloudflare Workers (subrequests) are not visible in Security Analytics.

## Traffic

The **Traffic** tab displays information about all incoming HTTP requests for your domain, including requests not handled by Cloudflare security products.

In this tab you can perform several tasks:

* View the traffic distribution for your domain.
* Understand which traffic is being mitigated by Cloudflare security products, and where non-mitigated traffic is being served from (Cloudflare global network or [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server/)).
* Analyze suspicious traffic and create tailored custom [security rules](https://developers.cloudflare.com/security/rules/) based on applied filters.
* [Find an appropriate rate limit](https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/) for incoming traffic.

For information on how to use the **Traffic** tab, refer to [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/#adjusting-displayed-data).

If you need to modify existing security-related rules you already configured, consider also using the [Events](#events) tab. This tab displays information about requests affected by Cloudflare security products.

Note

The **Traffic** tab includes functionality available in the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) page in the previous dashboard navigation structure.

## Events

Use the **Events** tab to review mitigated requests and to tailor your security configurations.

The **Events** tab displays information about requests actioned or flagged by Cloudflare security products. Each incoming HTTP request might generate one or more security events. The tab only shows these events, not the HTTP requests themselves. To obtain information on all incoming HTTP requests, use the [Traffic](#traffic) tab.

Users on a Free plan can view summarized events by date in sampled logs. Customers on paid plans have access to additional graphs and dashboards that summarize the most relevant information about the current behavior of Cloudflare's security features on your domain.

For more information on the **Events** tab, refer to [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/).

Note

The **Events** tab corresponds to the [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) page in the previous dashboard navigation structure.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/analytics/#page","headline":"Security Analytics (new dashboard) · Security dashboard docs","description":"Security Analytics shows information about all incoming HTTP requests or mitigated requests (rule matches).","url":"https://developers.cloudflare.com/security/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
