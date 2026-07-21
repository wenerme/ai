---
description: Troubleshoot Cloudflare 1013 error code.
title: Error 1013
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Error 1013

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1013/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Error 1013: HTTP hostname and TLS SNI hostname mismatch

This error indicates a mismatch between the HTTP hostname and the TLS SNI hostname.

### Common cause

The hostname sent by the client or browser via Server Name Indication (SNI) does not match the request host header.

### Resolution

Error `1013` is commonly caused by the following:

* Your local browser setting the incorrect SNI host header, or
* A network proxying SSL traffic caused a mismatch between SNI and the Host header of the request.

Test for an SNI mismatch via an online tool, such as [SSL Shopper ↗](https://www.sslshopper.com/ssl-checker.html).

Provide Cloudflare Support the following information:

* A [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) captured while duplicating the error.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1013/#page","headline":"Error 1013 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1013 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1013/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
