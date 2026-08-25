---
description: This tutorial explains how to analyze Cloudflare metrics using the New Relic One Cloudflare Quickstart.
title: New Relic
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# New Relic

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-integrations/new-relic/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial explains how to analyze Cloudflare metrics using the [New Relic One Cloudflare Quickstart ↗](https://newrelic.com/instant-observability/cloudflare/fc2bb0ac-6622-43c6-8c1f-6a4c26ab5434).

## Prerequisites

Before sending your Cloudflare log data to New Relic, make sure that you:

* Have a Cloudflare Enterprise account with Cloudflare Logs enabled.
* Have a New Relic account.
* Configure [Logpush to New Relic](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/new-relic/).

## Task 1 - Install the Cloudflare Network Logs quickstart

1. Log in to New Relic.
2. Click the Instant Observability button (top right).
3. Search for **Cloudflare Network Logs**.
![Cloudflare Network Logs install screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1999,height=1030,format=webp/_astro/cloudflare-network-logs.CYJYSb1Z.png)
1. Click **Install this quickstart**.
2. Follow the steps to deploy.

## Task 2 - View the Cloudflare Dashboards

You can view your dashboards on the New Relic dashboard page. The dashboards include the following information:

### Overview

Get a quick overview of the most important metrics from your websites and applications on the Cloudflare network.

![Cloudflare Network Logs install screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1407,height=817,format=webp/_astro/dash-1.CTd2mveX.png)

### Security

Get insights on threats to your websites and applications, including number of threats taken action on by the Web Application Firewall (WAF), threats over time, top threat countries, and more.

![Cloudflare Network security metrics screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1402,height=511,format=webp/_astro/dash-2.DpiyWwxC.png)

### Performance

Identify and address performance issues and caching misconfigurations. Metrics include total requests, total versus cached requests, total versus origin requests.

![Cloudflare Network Logs performance metrics screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1400,height=609,format=webp/_astro/dash-3.DMdRroU0.png)

### Reliability

Get insights on the availability of your websites and Applications. Metrics include, edge response status over time, percentage of `3xx`/`4xx`/`5xx` errors over time, and more.

![Cloudflare Network Logs reliability metrics screen](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=929,height=510,format=webp/_astro/dash-4.BIqk6bUl.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/new-relic/#page","headline":"New Relic · Cloudflare Analytics docs","description":"This tutorial explains how to analyze Cloudflare metrics using the New Relic One Cloudflare Quickstart.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/new-relic/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
