---
title: CSP HTTP header format
description: Format of the Content Security Policy report-only HTTP header added by Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ CSP ](https://developers.cloudflare.com/search/?tags=CSP) 

# CSP HTTP header format

The format of the Content Security Policy (CSP) report-only HTTP header added by Cloudflare is the following:

```

content-security-policy-report-only: script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; report-uri https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>


```

If you [configured the reporting endpoint](https://developers.cloudflare.com/client-side-security/reference/settings/#reporting-endpoint) to use the same hostname, the HTTP header will have the following format:

```

content-security-policy-report-only: script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; report-uri <YOUR_HOSTNAME>/cdn-cgi/script_monitor/report?<QUERY_STRING>


```

Notes

Cloudflare adds the CSP report-only HTTP header used to monitor webpage resources to a sample of sent responses.

Configuring [log rules](https://developers.cloudflare.com/client-side-security/rules/) will add other CSP report-only headers to responses. Cloudflare does not perform any sampling for these report-only headers related to customer-defined content security rules.

## Related resources

* [Mozilla Developer Network's (MDN) documentation on Content-Security-Policy-Report-Only ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/reference/csp-header/","name":"CSP HTTP header format"}}]}
```
