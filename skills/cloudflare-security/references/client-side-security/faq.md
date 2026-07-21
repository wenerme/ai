---
description: Answers to common questions about client-side security rules, CSP headers, and monitoring.
title: Client-side security FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

#  Client-side security FAQ

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/client-side-security/faq/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## What happens to CSP HTTP headers set by the origin server when I create a content security rule?

When you create content security rules, Cloudflare will generate content security policy (CSP) directives from those rules based on their configuration:

* Log rules will create CSP directives for the `Content-Security-Policy-Report-Only` HTTP header.
* Allow rules will create CSP directives for the `Content-Security-Policy` HTTP header.

Client-side security only adds new CSP HTTP headers to the response. This means that Cloudflare will keep any `Content-Security-Policy-Report-Only` and `Content-Security-Policy` HTTP headers in the response set by the origin server and it will add separate HTTP headers for the content security rules configured on your Cloudflare zone.

It is recommended that you only have one rule in [allow mode](https://developers.cloudflare.com/client-side-security/rules/#rule-actions) (that is, a content security rule being enforced). If there is more than one `Content-Security-Policy` HTTP header in the response, the most restrictive policy wins. For more information, refer to the [MDN documentation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#multiple%5Fcontent%5Fsecurity%5Fpolicies).

## Can I add a `nonce` CSP directive to a content security rule?

Client-side security currently does not support [nonce ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP#nonces) directives in content security rules. Instead, you can use a [hash ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP#hashes) CSP directive. For details on the supported directives and values, refer to [Supported CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/faq/#page","headline":"Client-side security FAQ · Client-side security docs","description":"Answers to common questions about client-side security rules, CSP headers, and monitoring.","url":"https://developers.cloudflare.com/client-side-security/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","CSP"]}
```
