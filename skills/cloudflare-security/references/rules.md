---
description: Use Cloudflare Rules to adjust requests and responses, configure settings, and trigger actions for specific requests.
title: Cloudflare Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Cloudflare Rules

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

 Available on all plans

Cloudflare Rules allows you to control how Cloudflare handles traffic to your website. For example, redirecting visitors, rewriting URLs, overriding where requests are sent, or customizing Cloudflare settings for specific requests.

Rules features require that your domain (or subdomain) has its [DNS records proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare, meaning traffic passes through the Cloudflare network before reaching your origin server.

---

## Features

[Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/)

Customize Cloudflare configuration settings for matching incoming requests.

 Use Configuration Rules

[Snippets](https://developers.cloudflare.com/rules/snippets/)

Customize the behavior of your website or application using short pieces of JavaScript code.

 Use Snippets

[Transform Rules](https://developers.cloudflare.com/rules/transform/)

Adjust the URI path, query string, and HTTP headers of requests and responses on the Cloudflare global network.

 Use Transform Rules

[Redirects](https://developers.cloudflare.com/rules/url-forwarding/)

Redirect visitors from a source URL to a target URL with a specific HTTP status code. Use Single Redirects or Bulk Redirects depending on your use case.

 Use Redirects

[Origin Rules](https://developers.cloudflare.com/rules/origin-rules/)

Customize where the incoming traffic will go and with which parameters. Override request properties such as `Host` header, destination hostname, and destination port.

 Use Origin Rules

[Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/)

Route matching incoming traffic from your website to a public cloud provider such as AWS, Google Cloud, and Azure.

 Use Cloud Connector

[Compression Rules](https://developers.cloudflare.com/rules/compression-rules/)

Customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type.

 Use Compression Rules

[Page Rules](https://developers.cloudflare.com/rules/page-rules/)

Trigger certain actions when a request matches a URL pattern.

 Use Page Rules

[URL normalization](https://developers.cloudflare.com/rules/normalization/)

Modify the URLs of incoming requests so that they conform to a consistent formatting standard.

 Configure URL normalization

[Custom Errors](https://developers.cloudflare.com/rules/custom-errors/)

Define what custom content to serve for errors returned by an origin server or by a Cloudflare product, including Workers.

 Configure Custom Errors

---

## Related products

[Custom rules](https://developers.cloudflare.com/waf/custom-rules/)

Control incoming traffic by filtering requests to a zone. You can block or challenge incoming requests according to rules you define.

[Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)

Define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.

[Cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)

Customize the cache properties of your HTTP requests.

[Workers](https://developers.cloudflare.com/workers/)

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

---

## More resources

### [ Plans ](https://www.cloudflare.com/plans/#overview)

Compare available Cloudflare plans

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/#page","headline":"Overview · Cloudflare Rules docs","description":"Use Cloudflare Rules to adjust requests and responses, configure settings, and trigger actions for specific requests.","url":"https://developers.cloudflare.com/rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
