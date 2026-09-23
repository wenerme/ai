---
description: Troubleshoot Cloudflare 1014 error code.
title: Error 1014
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1014

Last updated Sep 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1014: CNAME Cross-User Banned

This error indicates that a CNAME record between domains in different Cloudflare accounts is prohibited.

### Common cause

Common causes include:

- A DNS CNAME record points between domains in different Cloudflare accounts. Cloudflare permits CNAME records within a domain ( `www.example.com` CNAME to `api.example.com`), across zones within the same user account ( `www.example.com` CNAME to `www.example.net`), or when using [Cloudflare for SaaS ↗](https://www.cloudflare.com/saas/).
- A custom domain is connected to an R2 bucket, and its active zone has a [zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) or is banned.
- A custom domain is used to [create an MCP portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#create-a-portal), and its active zone has a zone hold or is banned.

### Resolution

- To allow CNAME record resolution to a domain in a different Cloudflare account, the domain owner of the CNAME target must use [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).
- To connect a custom domain to an R2 bucket, release the [zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) on the custom domain target zone.
- To create an MCP portal with a custom domain, release the [zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/) on the selected zone and each parent zone. Then create the portal again.
- If the zone for the custom domain is banned:
  - First, check whether there is any [phishing report](https://developers.cloudflare.com/fundamentals/reference/report-abuse/complaint-types/) for the hostname (and request a review if there is one).
  - Second, make sure that you have no unpaid invoice(s), as you will not be able to enable any new services until [any outstanding balance](https://developers.cloudflare.com/billing/manage/pay-invoices-overdue-balances/) is addressed. If this does not resolve the issue, contact your account team.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/#page","headline":"Error 1014","description":"Troubleshoot Cloudflare 1014 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1014/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
