---
description: Allow Cloudflare to process DMARC reports for your apex domain.
title: Enable DMARC Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dmarc-management/llms.txt
> Use this file to discover all available pages before exploring further.

#  Enable DMARC Management

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dmarc-management/enable/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You need to enable DMARC Management to allow Cloudflare to process DMARC reports on your behalf. DMARC Management only works with apex domains (for example, `example.com`, not `blog.example.com`) and not domains in [subdomain setups](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

A warning on DMARC Management and SPF records

DMARC Management does not support modifications to SPF records when a CNAME record in your zone points to an external domain. Any changes to the SPF record could invalidate your DMARC policy, as Cloudflare cannot update the associated external DNS records. We recommend managing SPF updates directly through the external domain's DNS provider.

To enable DMARC Management:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Email** \> **DMARC Management**.
3. Select **Enable DMARC Management**.
4. DMARC Management will scan your zone for DMARC records, and will present you with two outcomes:
  * If no DMARC record is found, Cloudflare will automatically invite you to add one that you can edit later. Select **Add** to continue.
  * If a DMARC record is found in your zone, Cloudflare will add another `rua` (Reporting URI for Aggregate data) entry to it. The `rua` tag specifies the URI (typically a `mailto:` address) where aggregate DMARC reports are sent. This additional entry uses a Cloudflare email address so that Cloudflare can receive and process DMARC reports on your behalf. Select **Next** to continue.

DMARC Management (beta) is now active. However, it may take up to 24 hours to receive your first DMARC report and to display this information in DMARC Management.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dmarc-management/enable/#page","headline":"Enable DMARC Management · Cloudflare DMARC Management docs","description":"Allow Cloudflare to process DMARC reports for your apex domain.","url":"https://developers.cloudflare.com/dmarc-management/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
