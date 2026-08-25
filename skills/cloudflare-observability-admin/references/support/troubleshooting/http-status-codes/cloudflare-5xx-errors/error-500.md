---
description: Troubleshoot HTTP 500 error responses.
title: Error 500
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 500

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Error 500: internal server error

This error indicates a problem with your origin web server, preventing it from fulfilling the request.

### Common causes

The `Error establishing database connection message` is a common HTTP `500` error, typically indicating an origin web server issue. If you encounter this error, contact your hosting provider for assistance.

### Resolution

When dealing with most `5XX` errors, the first step is to reach out to your hosting provider or site administrator to help troubleshoot the issue. Share the necessary [error details](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/#required-error-details-for-hosting-provider) to your hosting provider to assist troubleshooting the issue.

However, if the `500` error contains `cloudflare` or `cloudflare-nginx` in the HTML response body, contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) and provide the following details:

* Your domain name
* The time and timezone of the `500` error occurrence
* The output of `www.example.com/cdn-cgi/trace` from the browser where the `500` error was observed (replace `www.example.com` with your actual domain and hostname)

Note

If you observe blank or white pages when visiting your website, confirm whether the issue occurs when [temporarily pausing Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) and contact your hosting provider for assistance.

### Workers-specific causes

Error 500 can also occur when using Cloudflare Workers:

* A Cloudflare Worker throws a runtime JavaScript exception (see [Error 1101](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/))

If you are using Workers, check the Workers dashboard for error logs and exceptions.

### Troubleshooting steps

1. **Check recent configuration changes**: Review any recent changes to Page Rules, Transform Rules, or Workers that might affect request processing.
2. **Verify origin connectivity**: Ensure your origin server is responding correctly and within acceptable timeframes.
3. **Review Workers logs**: If using Workers, check for JavaScript exceptions or CPU time limit errors in the Workers dashboard.
4. **Test with Cloudflare paused**: Temporarily pause Cloudflare to determine if the issue is origin-related.

### Known Cloudflare issue leading to HTTP Error 500

* A configuration issue on Page Rules can generate HTTP Error `500`. Refer to [Page Rules troubleshooting](https://developers.cloudflare.com/rules/page-rules/troubleshooting/general/#error-500-internal-server-error) for more details and resolution.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/#page","headline":"Error 500 · Cloudflare Support docs","description":"Troubleshoot HTTP 500 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
