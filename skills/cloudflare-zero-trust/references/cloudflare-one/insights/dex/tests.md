---
description: Synthetic tests resources and guides for Zero Trust analytics.
title: Synthetic tests
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Synthetic tests

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Digital Experience Monitoring (DEX), you can test if your devices can connect to a private or public endpoint through the Cloudflare One Client. Tests allow you to monitor availability for a given application and investigate performance issues reported by your end users.

DEX tests will only run when the Cloudflare One Client is turned on, whereas [fleet status](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#fleet-status) metrics are always available.

To control which users or groups run a test, use [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/).

* [HTTP test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/)
* [Traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/)
* [View test results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/)

## Export DEX application test logs

You can use [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) to export [DEX application test](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) data to [R2](https://developers.cloudflare.com/r2/) (Cloudflare's object storage), a third-party cloud storage bucket, or a Security Information and Event Management (SIEM) tool. This is useful if you need to retain test data beyond the [7-day log retention period](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention) or correlate DEX data with other log sources.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/#page","headline":"Synthetic tests · Cloudflare One docs","description":"Synthetic tests resources and guides for Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
