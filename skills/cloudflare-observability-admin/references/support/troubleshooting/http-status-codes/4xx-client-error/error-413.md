---
description: Troubleshoot HTTP 413 error responses.
title: Error 413
image: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/og.png?v=7951c23e48fb79d0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 413

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## 413 Payload Too Large

The `413 Payload Too Large` status code indicates that the server refuses to process the request because the payload sent by the client exceeds the server's acceptable size limit. The server may optionally close the connection. If this refusal would only happen temporarily, then the server should send a `Retry-After` header to specify when the client should try the request again.

For more details, refer to [RFC 9110 ↗︎](https://www.rfc-editor.org/rfc/rfc9110#section-15.5.14).

### Common use cases

The `413 Payload Too Large` status code often occurs when clients attempt to upload large files, such as videos or images, or send oversized request bodies, like JSON or XML payloads, that exceed the server's size limits. This can also happen during file transfers or API requests involving large datasets, prompting the server to reject the request.

### Cloudflare-specific information

For incoming requests to a domain proxied through Cloudflare, the upload limit depends on the domain's plan. Requests exceeding this limit receive a `413 Request Entity Too Large` error.

|  | Free | Pro | Business | Enterprise |
| --- | --- | --- | --- | --- |
| Availability | Yes | Yes | Yes | Yes |
| Max upload size | 100 MB | 100 MB | 200 MB | Up to 5 GB |

Keep in mind, customers can adjust the **Maximum Upload Size** from the zone's **Network** page. Enterprise customers can self-serve any value up to 5 GB; uploads larger than 5 GB require additional configuration — contact your account team. Setting the limit below the size of an incoming request causes a `413`.

For uploads to a proxied domain, use smaller, separate requests if your application supports them, change your DNS record to [DNS-only](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records), or [upgrade your plan](https://developers.cloudflare.com/billing/manage/change-plan/).

### Outbound uploads from Containers and Durable Objects

Cloudflare limits each HTTP request body sent to an external service by a Durable Object or through a Container outbound handler to **100 MiB by default**. Increasing **Maximum Upload Size** for your application's domain does not increase this limit.

Check which request returned `413`: the incoming upload to your application or the outbound upload to another service. The destination service can also reject oversized requests.

For the applicable limits, upload guidance, and how to request an increase, refer to:

- [Containers outbound HTTP request body size](https://developers.cloudflare.com/containers/platform/limits/#outbound-http-request-body-size).
- [Durable Objects outbound HTTP request body size](https://developers.cloudflare.com/durable-objects/platform/limits/#outbound-http-request-body-size).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/#page","headline":"Error 413","description":"Troubleshoot HTTP 413 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/","inLanguage":"en","image":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/og.png?v=7951c23e48fb79d0","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
