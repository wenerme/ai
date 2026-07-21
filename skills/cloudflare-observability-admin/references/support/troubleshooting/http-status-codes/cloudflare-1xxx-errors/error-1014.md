---
description: Troubleshoot Cloudflare 1014 error code.
title: Error 1014
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 1014

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Error 1014: CNAME Cross-User Banned

This error indicates that a CNAME record between domains in different Cloudflare accounts is prohibited.

### Common cause

By default, Cloudflare prohibits a DNS CNAME record between domains in different Cloudflare accounts. CNAME records are permitted within a domain (`www.example.com` CNAME to `api.example.com`) and across zones within the same user account (`www.example.com` CNAME to `www.example.net`) or using our [Cloudflare for SaaS ↗](https://www.cloudflare.com/saas/) solution.

Another common cause is connecting a custom domain to an R2 bucket, where the domain is an active zone with the [zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) feature enabled or if the zone is banned.

### Resolution

* To allow CNAME record resolution to a domain in a different Cloudflare account, the domain owner of the CNAME target must use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).
* To allow connecting to a R2 bucket with a custom domain, disable the [zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) feature on the custom domain target zone to resolve the 1014 error.
* To allow connections to an R2 bucket whose zone is banned:

  * First, check whether there is any [phishing report](https://developers.cloudflare.com/fundamentals/reference/report-abuse/complaint-types/) for the hostname (and request a review if there is one).
  * Second, make sure that you have no unpaid invoice(s), as you will not be able to enable any new services until [any outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) is addressed. If this does not resolve the issue, contact your account team.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/#page","headline":"Error 1014 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1014 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
