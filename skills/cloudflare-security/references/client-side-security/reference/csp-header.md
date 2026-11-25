---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Format of the Content Security Policy report-only HTTP header added by Cloudflare.
title: CSP HTTP header format
image: https://developers.cloudflare.com/client-side-security/reference/csp-header/og.png?v=c0d758266d3f0b0d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# CSP HTTP header format

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

- [Mozilla Developer Network's (MDN) documentation on Content-Security-Policy-Report-Only ↗︎](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/reference/csp-header/#page","headline":"CSP HTTP header format","description":"Format of the Content Security Policy report-only HTTP header added by Cloudflare.","url":"https://developers.cloudflare.com/client-side-security/reference/csp-header/","inLanguage":"en","image":"https://developers.cloudflare.com/client-side-security/reference/csp-header/og.png?v=c0d758266d3f0b0d","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","CSP"]}
```
