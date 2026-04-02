---
title: Security records
description: Learn how to configure SPF records, DKIM records, and DMARC records in your Cloudflare account to help improve email security.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dmarc-management/security-records.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Security records

There are several DNS mechanisms to prevent others from sending emails on behalf of your domain. These all work as TXT records that need to be added on your domain:

* [Sender Policy Framework (SPF) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): List authorized IP addresses and domains that can send email on behalf of your domain.
* [DomainKeys Identified Mail (DKIM) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Ensure email authenticity by cryptographically signing emails.
* [Domain-based Message Authentication Reporting and Conformance (DMARC) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Receive aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

Note

For additional background on email security records, refer to the [introductory blog post ↗](https://blog.cloudflare.com/tackling-email-spoofing/).

## Create security records

To set up email security records:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Email** \> **DMARC Management**.
3. In **Email record overview**, select **View records**.
4. Use the available options to set up [SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), and [DMARC records ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/). This page will also list any previous records you might already have in your account.

## Edit or delete records

Refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dmarc-management/","name":"DMARC Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/dmarc-management/security-records/","name":"Security records"}}]}
```
