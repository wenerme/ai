---
title: Enable DMARC Management
description: Allow Cloudflare to process DMARC reports for your apex domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dmarc-management/enable.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Enable DMARC Management

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dmarc-management/","name":"DMARC Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/dmarc-management/enable/","name":"Enable DMARC Management"}}]}
```
