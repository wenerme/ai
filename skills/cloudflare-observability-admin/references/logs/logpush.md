---
description: Push logs in near real-time to storage or SIEM.
title: Logpush
image: https://developers.cloudflare.com/logs/logpush/og.png?v=7891593910363aac
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Logpush

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Logpush delivers logs in batches as quickly as possible, with no minimum batch size, potentially delivering files more than once per minute. This capability enables Cloudflare to provide information almost in real time, in smaller file sizes.

The push frequency is automatic and cannot be adjusted—Cloudflare pushes logs in batches as soon as possible. However, users can configure the batch size [using the API](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#max-upload-parameters) for improved control in case the log destination has specific requirements.

Important limitation

Logpush only pushes logs once as they become available and cannot backfill historical data. If your job is disabled or fails, logs generated during that period are permanently lost. This is why configuring [health notifications](https://developers.cloudflare.com/logs/logpush/logpush-health/) is essential for early detection of issues.

Logpush does not offer storage or search functionality for logs; its primary aim is to send logs as quickly as they arrive.

Cloudflare Logpush supports pushing logs to storage services, SIEMs, and log management providers via the Cloudflare dashboard or API.

## Estimating log volume

Before setting up a Logpush job, you can estimate the total volume of data that will be pushed to your destination. The volume depends on your traffic, the dataset, and the fields you select.

Logpush usage is measured in uncompressed bytes delivered, so estimate with uncompressed record sizes. For rates and included usage, refer to [Pricing](https://developers.cloudflare.com/logs/logpush/pricing/).

### Quick sizing for HTTP Requests

An [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/) record is about 1.5–3 kB uncompressed, depending on the fields selected. Each request produces one record, including Worker subrequests.

- 100k requests/day → \~150–300 MB/day
- 1M requests/day → \~1.5–3 GB/day, or \~45–90 GB/month
- 10M requests/day → \~15–30 GB/day
- 100M requests/day → \~150–300 GB/day

Files arrive at your destination gzip-compressed, so they use roughly a tenth of the storage that the uncompressed volume suggests.

Extra fields and [custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/) increase record size. Other datasets (Firewall, Workers, Load Balancing) add volume separately. For average record sizes by dataset, refer to [Log Explorer pricing](https://developers.cloudflare.com/observability/logs/log-explorer/pricing/#record-size-by-dataset).

For precise estimates, you can [sample your logs via Logpull](https://developers.cloudflare.com/logs/logpull/additional-details/#estimating-daily-data-volume) using a 1-hour sample.

## Limits

Logpush job limits depend on your plan, dataset, and job scope:

| Scope | Free, Pro, and Business | Enterprise |
| --- | --- | --- |
| All jobs in an account | 1,000 | No account-level limit |
| Each entitled dataset in an account or zone | Generally 1,000 | Generally 1,000 for new customers |

Existing Enterprise customers may retain a default limit of four jobs per dataset. Cloudflare can adjust this limit manually. Dataset-specific entitlements may also set different limits. Instant Logs supports two jobs per zone.

If you reach a limit, the API returns `creating a new job is not allowed: exceeded max jobs allowed`.

## Availability

|  | Free | Pro | Business | Enterprise |
| --- | --- | --- | --- | --- |
| Availability | Yes | Yes | Yes | Yes |

Dataset availability depends on the Cloudflare products on your account. Workers Trace Events Logpush requires the [Workers Paid](https://developers.cloudflare.com/workers/platform/pricing/#workers-trace-events-logpush) plan and retains separate request-based pricing.

For usage rates and included monthly usage, refer to [Pricing](https://developers.cloudflare.com/logs/logpush/pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/#page","headline":"Logpush","description":"Push logs in near real-time to storage or SIEM.","url":"https://developers.cloudflare.com/logs/logpush/","inLanguage":"en","image":"https://developers.cloudflare.com/logs/logpush/og.png?v=7891593910363aac","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
