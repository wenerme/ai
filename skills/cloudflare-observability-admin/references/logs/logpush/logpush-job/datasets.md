---
description: Browse available Logpush dataset fields by category.
title: Datasets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Datasets

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Datasets

The datasets below describe the fields available by log category:

* [Zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/)
* [Account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/)

## API

The list of fields can also be accessed directly from the API using the following endpoints:

* For zone-scoped datasets: `https://api.cloudflare.com/client/v4/zones/{zone_id}/logpush/datasets/<DATASET>/fields`
* For account-scoped datasets: `https://api.cloudflare.com/client/v4/accounts/{account_id}/logpush/datasets/<DATASET>/fields`

The `<DATASET>` argument indicates the log category. For example, `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`.

## Availability

* The availability of Logpush dataset fields depends on your subscription plan.
* Zone-scoped HTTP requests are available in both Logpush and Logpull.
* [Custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/) for HTTP requests are only available in Logpush.
* All other datasets are only available through Logpush.

## Deprecation

Deprecated fields remain available to prevent breaking existing jobs. They may eventually become empty values if completely removed. Customers are encouraged to migrate away from deprecated fields if they are using them.

## Recommendation

For log field **ClientIPClass**, Cloudflare recommends using [bot tags](https://developers.cloudflare.com/bots/concepts/bot-tags/) to classify IPs.

## Additional resources

For more information on logs available in Cloudflare Zero Trust, refer to [Zero Trust logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/#page","headline":"Datasets · Cloudflare Logs docs","description":"Browse available Logpush dataset fields by category.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
