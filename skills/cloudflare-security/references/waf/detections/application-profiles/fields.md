---
description: Reference Schema Profile detection fields and usage.
title: Fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Fields

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Schema Profile detections populate these fields after an applicable profile becomes available:

| Field                                   | Type    | Source                 | Meaning                                                      | Available in                        |
| --------------------------------------- | ------- | ---------------------- | ------------------------------------------------------------ | ----------------------------------- |
| cf.schema\_validation.learned.violated  | Boolean | Learned Schema Profile | true when an evaluated request violates the learned profile. | Security Analytics and Custom Rules |
| cf.schema\_validation.uploaded.violated | Boolean | Uploaded schema        | true when an evaluated request violates the supplied schema. | Security Analytics and Custom Rules |

## Availability

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without API Security. Interested customers can contact their account team to express interest. Closed-beta access does not imply future plan availability or pricing.

## Evaluation

Cloudflare evaluates requests after the corresponding profile becomes available. The profile must apply to the request operation.

Requests without an applicable profile have **Not evaluated** status.

For request statuses and investigation steps, refer to [Analyze profile detections](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/fields/#page","headline":"Fields · Cloudflare Web Application Firewall (WAF) docs","description":"Reference Schema Profile detection fields and usage.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
