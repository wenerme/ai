---
title: Security records
description: Learn how to configure SPF records, DKIM records, and DMARC records in your Cloudflare account to help improve email security.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dmarc-management/security-records.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security records

Without email authentication records, anyone can send email that appears to come from your domain — a technique known as domain spoofing. To prevent this, you add DNS TXT records (text-based entries in your domain's DNS settings) that allow receiving mail servers to verify whether an email actually came from you:

* [Sender Policy Framework (SPF) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): Lists the IP addresses and domains authorized to send email on behalf of your domain.
* [DomainKeys Identified Mail (DKIM) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Authenticates the sender's domain and verifies that email content was not altered in transit, using a cryptographic signature.
* [Domain-based Message Authentication Reporting and Conformance (DMARC) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Tells receiving servers what to do when SPF or DKIM checks fail (for example, reject or quarantine the email), and sends you aggregate reports about your email traffic.

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
