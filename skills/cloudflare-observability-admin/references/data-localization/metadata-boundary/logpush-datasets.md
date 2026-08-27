---
description: Logpush datasets that support Customer Metadata Boundary by region.
title: Logpush datasets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Logpush datasets

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Logpush](https://developers.cloudflare.com/logs/logpush/) is a service that automatically streams your Cloudflare log data to a storage destination you control (such as a cloud storage bucket or SIEM).

The table below lists the Logpush [datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/) (categories of log data) that support zones or accounts with Customer Metadata Boundary (CMB) enabled.

* **Level** — Whether this log type is collected per-zone (a single domain on your account) or per-account (across all domains).
* **Respects CMB** — Whether enabling CMB causes this dataset's logs to be stored only in your selected region. If ✅, logs are localized. If ✘, this dataset is not affected by CMB and may be stored outside your selected region.
* **Available with US/EU CMB region** — Whether you can receive this dataset when CMB is set to US or EU.

Caution

If you enable CMB for a region where a dataset is not available (marked ✘ in the US or EU column), Logpush will not deliver any data for that dataset — there is no error notification.

| Dataset name                                | Level   | Respects CMB               | Available with US CMB region | Available with EU CMB region |
| ------------------------------------------- | ------- | -------------------------- | ---------------------------- | ---------------------------- |
| Access Requests                             | Account | ✅                          | ✅                            | ✅                            |
| AI Gateway Events                           | Account | ✅                          | ✅                            | ✅                            |
| Audit Logs v1                               | Account | ✘                          | ✅                            | ✘                            |
| Audit Logs v2                               | Account | ✅                          | ✅                            | ✅                            |
| Browser Isolation User Actions              | Account | ✅                          | ✅                            | ✅                            |
| CASB Findings                               | Account | ✘                          | ✅                            | ✘                            |
| Client-side security (formerly Page Shield) | Zone    | ✅                          | ✅                            | ✅                            |
| DEX Application Tests                       | Account | ✅                          | ✘                            | ✅                            |
| DEX Device State Events                     | Account | ✅                          | ✘                            | ✅                            |
| Device Posture Results                      | Account | ✘                          | ✅                            | ✘                            |
| DLP Forensic Copies                         | Account | N/A[1](#user-content-fn-1) | ✘                            | ✘                            |
| DNS Firewall logs                           | Account | ✅                          | ✅                            | ✅                            |
| DNS logs                                    | Zone    | ✅                          | ✅                            | ✅                            |
| Email security Alerts                       | Account | ✅                          | ✅                            | ✅                            |
| Firewall events                             | Zone    | ✅                          | ✅                            | ✅                            |
| Gateway DNS                                 | Account | ✅                          | ✅                            | ✅                            |
| Gateway HTTP                                | Account | ✅                          | ✅                            | ✅                            |
| Gateway Network                             | Account | ✅                          | ✅                            | ✅                            |
| HTTP requests                               | Zone    | ✅                          | ✅                            | ✅                            |
| IPSec Logs                                  | Account | ✅                          | ✅                            | ✅                            |
| Magic IDS Detections                        | Account | ✅                          | ✅                            | ✅                            |
| NEL reports                                 | Zone    | ✘                          | ✅                            | ✘                            |
| Network Analytics Logs                      | Account | ✅                          | ✅                            | ✅                            |
| Sinkhole Events                             | Account | ✅                          | ✅                            | ✅                            |
| Spectrum events                             | Zone    | ✅                          | ✅                            | ✅                            |
| WARP Config Changes                         | Account | ✅                          | ✘                            | ✅                            |
| WARP Toggle Changes                         | Account | ✅                          | ✘                            | ✅                            |
| Workers Trace Events                        | Account | ✅                          | ✅                            | ✅                            |
| Zaraz Events                                | Zone    | ✅                          | ✅                            | ✅                            |
| Zero Trust Sessions                         | Account | ✅                          | ✅                            | ✅                            |

## Footnotes

1. Customer Metadata Boundary does not apply in this case, as these logs are sent directly from the processing location to your configured destination. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/#page","headline":"Logpush datasets · Cloudflare Data Localization Suite docs","description":"Logpush datasets that support Customer Metadata Boundary by region.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
