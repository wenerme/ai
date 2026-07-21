---
description: Handle multiple DNS records with the same name.
title: Records with the same name
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

#  Records with the same name

Last updated Jul 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Occasionally, Cloudflare will not allow you to [create new DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) with the same value in the **Name** field.

This error can occur due to the special requirements of CNAME records[1](#user-content-fn-1).

## Causes

You will encounter this error if you try to do one of the following:

* Create a CNAME record with a **Name** matching the name of an existing A/AAAA[2](#user-content-fn-2) or CNAME record.
* Create an A/AAAA record with a **Name** matching the name of an existing CNAME record.
* Create a [Spectrum](https://developers.cloudflare.com/spectrum/) application for a name that already has a manually-created `A`, `AAAA`, or `CNAME` record. Spectrum provisions and manages its own DNS record for the application, so Cloudflare does not support having both on the same name. Multiple Spectrum applications can, however, share the same name. Refer to [Spectrum Troubleshooting](https://developers.cloudflare.com/spectrum/reference/troubleshooting/#cannot-create-spectrum-application--dns-record-already-exists) for recommended workarounds.

Cloudflare prevents you from creating this combination of records because if a CNAME record is provided for a hostname DNS servers expect only that CNAME record to provide DNS information for that hostname.

Adding additional records would send conflicting information to DNS servers. For a technical explanation of the mechanism behind this, refer to [RFC 1034 ↗](https://www.rfc-editor.org/rfc/rfc1034).

## Solution

Review your existing DNS records to find the matching value in the **Name** field. Then, decide whether you want to keep the current record or delete it and make a new one.

Note

CNAME records are the only IP resolution record with this type of limitation. You can have more than one A/AAAA record per hostname, which is a way some domains do [simple load balancing](https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/) for incoming requests.

## Footnotes

1. [CNAME records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) map a domain name to another (canonical) domain name. They can be used to resolve other record types present on the target domain name.
[↩](#user-content-fnref-1)
2. [A and AAAA records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/) map a domain name to one or multiple IPv4 or IPv6 address(es).
[↩](#user-content-fnref-2)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/#page","headline":"Cannot add DNS records with the same name · Cloudflare DNS docs","description":"Handle multiple DNS records with the same name.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
