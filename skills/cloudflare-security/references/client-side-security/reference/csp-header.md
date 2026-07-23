---
description: Format of the Content Security Policy report-only HTTP header added by Cloudflare.
title: CSP HTTP header format
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# CSP HTTP header format

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/client-side-security/reference/csp-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The format of the Content Security Policy (CSP) report-only HTTP header added by Cloudflare is the following:

```txt
content-security-policy-report-only: script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; report-uri https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

If you [configured the reporting endpoint](https://developers.cloudflare.com/client-side-security/reference/settings/#reporting-endpoint) to use the same hostname, the HTTP header will have the following format:

```txt
content-security-policy-report-only: script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; report-uri <YOUR_HOSTNAME>/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

Notes

Cloudflare adds the CSP report-only HTTP header used to monitor webpage resources to a sample of sent responses.

Configuring [log rules](https://developers.cloudflare.com/client-side-security/rules/) will add other CSP report-only headers to responses. Cloudflare does not perform any sampling for these report-only headers related to customer-defined content security rules.

## Related resources

* [Mozilla Developer Network's (MDN) documentation on Content-Security-Policy-Report-Only ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/reference/csp-header/#page","headline":"CSP HTTP header format · Client-side security docs","description":"Format of the Content Security Policy report-only HTTP header added by Cloudflare.","url":"https://developers.cloudflare.com/client-side-security/reference/csp-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","CSP"]}
```
