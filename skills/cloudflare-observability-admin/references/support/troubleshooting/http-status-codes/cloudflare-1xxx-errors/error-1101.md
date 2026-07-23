---
description: Troubleshoot Cloudflare 1101 error code.
title: Error 1101
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 1101

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 1101: Rendering error

This error indicates a rendering issue.

### Common cause

This error typically occurs when a Cloudflare Worker encounters a runtime JavaScript exception.

### Debugging

To identify the specific JavaScript exception:

1. Check your Workers logs in the Cloudflare dashboard under **Workers & Pages** \> **Your Worker** \> **Logs**.
2. Review the Workers code for potential runtime errors such as:
  * Undefined variables or functions
  * Type errors
  * Promise rejections
  * Network request failures
3. Test the [Worker locally](https://developers.cloudflare.com/workers/local-development/#local-development) with sample requests to reproduce the error.
4. Refer to [Workers error handling](https://developers.cloudflare.com/workers/observability/errors/) for more details on debugging Workers.

### Resolution

Fix the JavaScript exception in your Workers code. If you need assistance, [provide appropriate issue details](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to Cloudflare Support, including:

* The Ray ID from the error page
* The Worker name
* Recent changes to the Worker code
* Steps to reproduce the error

### Related errors

* [Error 1102](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1102/) \- Workers CPU time limit exceeded
* [Error 500](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/) \- Internal server error (can be caused by Workers exceptions)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/#page","headline":"Error 1101 · Cloudflare Support docs","description":"Troubleshoot Cloudflare 1101 error code.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
