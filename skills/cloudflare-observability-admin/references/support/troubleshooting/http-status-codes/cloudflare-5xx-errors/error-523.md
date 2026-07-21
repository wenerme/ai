---
description: Troubleshoot HTTP 523 error responses.
title: Error 523
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 523

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Error 523: origin is unreachable

This error occurs when Cloudflare cannot contact your origin web server.

### Common causes

This typically occurs when a network device between Cloudflare and the origin web server does not have a route to the origin's IP address.

In AWS environments, a common cause is an overly broad route such as `172.0.0.0/8` in a VPC route table. Cloudflare uses public IP ranges in `172.64.0.0/13`, and a broad route can accidentally capture traffic intended for Cloudflare.

### Resolution

Contact your hosting provider and share the necessary [error details](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/#required-error-details-for-hosting-provider) to exclude the following common causes at your origin web server:

* Confirm the correct origin IP address is listed for A or AAAA records within your Cloudflare DNS app.
* Troubleshoot Internet routing issues between your origin and Cloudflare, or with the origin itself.
* In AWS, review VPC route tables and make sure you are not sending `172.64.0.0/13` toward a private destination. If required, add a more specific route for `172.64.0.0/13` to your Internet Gateway.

If none of the above leads to a resolution, request the following information from your hosting provider or site administrator:

* An [MTR or traceroute](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#perform-a-traceroute) from your origin web server to a [Cloudflare IP address ↗](http://www.cloudflare.com/ips) that most commonly connected to your origin web server before the issue occurred. Identify a connecting Cloudflare IP from the logs of the origin web server.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/#page","headline":"Error 523 · Cloudflare Support docs","description":"Troubleshoot HTTP 523 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
