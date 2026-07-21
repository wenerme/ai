---
description: Restrict where customer traffic metadata and logs are stored by region.
title: Customer Metadata Boundary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

#  Customer Metadata Boundary

Last updated Jul 1, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/data-localization/metadata-boundary/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

As part of the Data Localization Suite, the Customer Metadata Boundary (CMB) ensures that Customer Logs stay in the region you select.

Customer Logs are traffic metadata — information generated when visitors access your site, such as request URLs, timestamps, and firewall events — that could identify your end users. These logs are tagged with your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and will be stored exclusively in the European Union (`eu`) or the United States (`us`), depending on the region you configure. Customer Metadata Boundary supports these two regions only; by default no boundary is applied and logs may be stored in Cloudflare's core data centers globally. CMB uses its own region setting, separate from [Regional Services regions](https://developers.cloudflare.com/data-localization/region-support/#region-types). For example, if you select the `eu` Customer Metadata Boundary, metadata will **only** be sent to Cloudflare's core data center (the centralized processing facility, as distinct from the globally distributed edge data centers) located in the European Union.

An exception is made if "Allow out-of-region access" is enabled. When enabled, Customer Logs will still be stored in the configured regions but will be accessible to authorized users on your account, regardless of physical location. Refer to [Out of region access](https://developers.cloudflare.com/data-localization/metadata-boundary/out-of-region-access/) for more details.

## Customer traffic metadata flow

The following diagram shows how metadata about your traffic is generated at a Cloudflare edge data center and forwarded exclusively to the core data center in the configured region (EU in this example). Authorized users access logs and analytics from that core data center.


sequenceDiagram
    participant UserEU as End user
    participant CloudflarePoP as Closest data center
    participant EUCoreDC as Core data center in EU
    participant CloudflareSuperAdmin as Admin

    UserEU->>CloudflarePoP: Connects
    Note right of CloudflarePoP: Customer Logs generated <br> (for example, HTTP requests and Firewall events)
    CloudflarePoP-->>EUCoreDC: Forwards encrypted Customer Logs
    Note right of EUCoreDC: Authorized users can view Logs & Analytics <br> on the UI or via API
    CloudflareSuperAdmin->>EUCoreDC: Authenticated access
    EUCoreDC->>CloudflareSuperAdmin: Logs & Analytics
    CloudflarePoP->>UserEU: Response


## Log management

Additionally, you can configure [Logpush](https://developers.cloudflare.com/logs/logpush/) (Cloudflare's log export service) to push Customer Logs to your own storage services, SIEMs (Security Information and Event Management systems), and log management providers.

## Product specific-behavior

For detailed information about product-specific behavior regarding Metadata Boundary, refer to the [Cloudflare product compatibility](https://developers.cloudflare.com/data-localization/compatibility/) page.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/metadata-boundary/#page","headline":"Customer Metadata Boundary · Cloudflare Data Localization Suite docs","description":"Restrict where customer traffic metadata and logs are stored by region.","url":"https://developers.cloudflare.com/data-localization/metadata-boundary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance","Privacy"]}
```
