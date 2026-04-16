---
title: Client-side security FAQ
description: Answers to common questions about client-side security rules, CSP headers, and monitoring.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/faq.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Client-side security FAQ

## What happens to CSP HTTP headers set by the origin server when I create a content security rule?

When you create content security rules, Cloudflare will generate content security policy (CSP) directives from those rules based on their configuration:

* Log rules will create CSP directives for the `Content-Security-Policy-Report-Only` HTTP header.
* Allow rules will create CSP directives for the `Content-Security-Policy` HTTP header.

Client-side security only adds new CSP HTTP headers to the response. This means that Cloudflare will keep any `Content-Security-Policy-Report-Only` and `Content-Security-Policy` HTTP headers in the response set by the origin server and it will add separate HTTP headers for the content security rules configured on your Cloudflare zone.

It is recommended that you only have one rule in [allow mode](https://developers.cloudflare.com/client-side-security/rules/#rule-actions) (that is, a content security rule being enforced). If there is more than one `Content-Security-Policy` HTTP header in the response, the most restrictive policy wins. For more information, refer to the [MDN documentation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#multiple%5Fcontent%5Fsecurity%5Fpolicies).

## Can I add a `nonce` CSP directive to a content security rule?

Client-side security currently does not support [nonce ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP#nonces) directives in content security rules. Instead, you can use a [hash ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP#hashes) CSP directive. For details on the supported directives and values, refer to [Supported CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/faq/","name":"Client-side security FAQ"}}]}
```
