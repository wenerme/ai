---
description: Troubleshoot HTTP 403 error responses.
title: Error 403
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 403

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-403/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 403 Forbidden

The `403 Forbidden` status code indicates that the client's request was understood by the server but cannot be fulfilled due to insufficient permissions to access the requested resource. For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

If you encounter a `403` error without the Cloudflare branding, this means that the error is being returned directly by the origin web server, not Cloudflare. This is typically related to permission rules set on your server. Common reasons for this error are:

* Permission rules configured on the origin web server (for example, in an Apache `.htaccess` file).
* Mod\_security rules.
* IP deny rules, such as blocking traffic from certain IP ranges. Make sure that [Cloudflare's IP ranges ↗](https://www.cloudflare.com/ips) are not being blocked.

### Cloudflare-specific information

Cloudflare may serve `403` responses in the following scenarios:

* **WAF rules**: The request violated a default WAF managed rule (enabled for all orange-clouded Cloudflare domains) or a custom WAF managed rule specific to your zone. For more information, refer to [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).
* **Security features**: A `403` response with Cloudflare branding in the response body may be triggered by:

  * [WAF Custom or Managed Rules](https://developers.cloudflare.com/waf/) with the challenge or block action.
  * [Security Level](https://developers.cloudflare.com/waf/tools/security-level/) settings, which default to Medium.
  * [DDoS Protection](https://developers.cloudflare.com/ddos-protection/), which is enabled by default on zones onboarded to Cloudflare, IP applications onboarded to Spectrum, and IP Prefixes onboarded to Magic Transit.
  * Most [1xxx Cloudflare error codes](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/).
  * The [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/).
  * [Validation Checks](https://developers.cloudflare.com/waf/tools/validation-checks/).

Cloudflare may also serve an unstyled `403` error page in specific cases. These errors are not logged because they occur early in Cloudflare's infrastructure, before domain configuration is loaded. An example is:

* [SNI ↗](https://www.cloudflare.com/learning/ssl/what-is-sni/): A `403` error is returned when the client sends a host that does not match the SNI (Server Name Indication).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-403/#page","headline":"Error 403 · Cloudflare Support docs","description":"Troubleshoot HTTP 403 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-403/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
