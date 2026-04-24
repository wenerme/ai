---
title: Error 500
description: Troubleshoot HTTP 500 error responses.
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

# Error 500

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/","name":"Cloudflare 5xx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-500/","name":"Error 500"}}]}
```
