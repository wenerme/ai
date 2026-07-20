---
title: Error 404
description: Troubleshoot HTTP 404 error responses.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Error 404

## 404 Not Found

The `404 Not Found` status code indicates that the origin server was unable to locate the requested resource. Typically, this means the host server could not find the resource. For a more permanent version of this error, the 410 Gone status code should be used.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

These errors typically occur when someone mistypes a URL on your site, when there is a broken link from another page, when a page that previously existed is moved or removed, or there is an error when a search engine indexes your site.

These errors typically account for approximately 3% of total page views for a typical site. However, they often go untracked by traditional analytics platforms, such as Google Analytics. To improve user experience, website owners usually implement a custom 404 page to be displayed when this error is generated.

### Cloudflare-specific information

Cloudflare does not generate `404s` for customer websites, we only proxy the request from the origin server. If you encounter a `404` error on a Cloudflare-powered site, the issue lies with the origin server. In such cases, contact your hosting provider for assistance.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-404/#page","headline":"Error 404 · Cloudflare Support docs","description":"Troubleshoot HTTP 404 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-404/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/http-status-codes/","name":"HTTP Status Codes"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/","name":"4xx Client Error"}},{"@type":"ListItem","position":6,"item":{"@id":"/support/troubleshooting/http-status-codes/4xx-client-error/error-404/","name":"Error 404"}}]}
```
