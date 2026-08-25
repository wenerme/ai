---
description: View aggregated metrics across all account domains.
title: Account analytics (beta)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Account analytics (beta)

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/account-and-zone-analytics/account-analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare account analytics lets you access a wide range of aggregated metrics from all the sites under a specific Cloudflare account.

Note

For general information about all of Cloudflare's analytics offerings, refer to [About Cloudflare Analytics](https://developers.cloudflare.com/analytics/faq/about-analytics/).

---

## View your account analytics

To view metrics for your site, in the Cloudflare dashboard, go to the **Account Analytics** page.

[Go to **Account analytics** ↗](https://dash.cloudflare.com/?to=/:account/analytics)

Once it loads, the Account Analytics app displays a collection of categorized charts with aggregated metrics for your account. To understand the various metrics available, refer to _Review your account metrics_ below.

---

## Review your account metrics

This section outlines the aggregated metrics under each category. Before reviewing your metrics, let's define a couple of concepts used in some panels:

* _Rate_ \- Reflects the ratio between the amount for a specific data category and the total.
* _Bandwidth_ \- Refers to the number of bytes sent from the Cloudflare edge network to the requesting client.

Also, note that:

* To filter metrics for a specific time period, use the dropdown in the top right.
* Most metrics are grouped into panels representing different aspects of the underlying data.

### Summary of metrics

Below is a brief description of the major elements comprising the metrics available.

#### HTTP Traffic

These charts aggregate data for HTTP traffic, and include:

![Chart showing last week's data for HTTP traffic](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=702,height=394,format=webp/_astro/hc-dash-account-analytics-map.CcPRTQU-.png)
* Spark lines for _Requests_, _Bandwidth_, _Page views_, and _Visitors_ (_Unique IPs)_
* An interactive map that breaks down the number of requests by country
* A table combining numerical and spark line data, sorted by total number of requests per country

#### Security

![Panel displaying lines highlighting encryption metrics: requests, requests rate, bandwidth, and bandwidth rate](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=702,height=86,format=webp/_astro/hc-dash-account-analytics_security_panel.5rFJ7hHV.png)

This panel features spark lines highlighting various encryption metrics, including: _requests_, _requests rate_, _bandwidth_, and _bandwidth rate_. These also include a comparative percentage change based on the previous period.

#### Cache

![Panel displaying lines for caching metrics: requests, requests rate, bandwidth, and bandwidth rate](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=704,height=88,format=webp/_astro/hc-dash-account-analytics_cache_card.BOCedSTx.png)

This panel features spark lines for various caching metrics, including: _requests_, _requests rate_, _bandwidth_, and _bandwidth rate_. These also include a comparative percentage change based on the previous equivalent period. For example, if you selected _Last week_ as your time period, the previous period refers to the _week_ before.

#### Errors

![Panel displaying lines for 4xx and 5xx error rates](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=704,height=88,format=webp/_astro/hc-account-analytics_errors_card.D2i2BrS9.png)

This panel displays spark lines for 4xx and 5xx error rates, respectively. Learn more about [HTTP Status Codes](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/).

#### Network

![Statistics showing the percentage of requests that use a specific version of HTTP](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=702,height=128,format=webp/_astro/hc-dash-account-analytics_network_card.Fso_4DUE.png)

#### Client HTTP Version Used

These statistics show the percentage of requests that use a specific version of HTTP.

#### Traffic Served Over SSL

These statistics show the percentage of traffic that is encrypted using a specific version of SSL or TLS.

#### Content Type Breakdown

These statistics show the number of requests based on the resource content type.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/account-analytics/#page","headline":"Account analytics (beta) · Cloudflare Analytics docs","description":"View aggregated metrics across all account domains.","url":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/account-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
