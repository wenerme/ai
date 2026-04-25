---
title: Error 1101
description: Troubleshoot Cloudflare 1101 error code.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Error 1101

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
3. Test the [Worker locally](https://developers.cloudflare.com/workers/development-testing/#local-development) with sample requests to reproduce the error.
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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/","name":"Cloudflare 1xxx errors"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1101/","name":"Error 1101"}}]}
```
