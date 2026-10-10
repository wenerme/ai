---
description: Understand spans captured as requests move through Cloudflare.
title: Spans
image: https://developers.cloudflare.com/observability/traces/spans/og.png?v=2668c41ce53abbb0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Spans

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/traces/spans/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A span represents one operation within a trace. Each span records when an operation started and how long it took. Related spans form a hierarchy that shows how a request moved through Cloudflare.

The spans in a trace depend on the products and request path involved. A span appears only when the corresponding operation runs.

## Span reference

| Span | What it covers | What its duration measures |
| --- | --- | --- |
| `cloudflare_request` | Cloudflare's processing of an HTTP request. This is the root span for platform-level request processing. | Starts after tracing configuration and sampling are resolved. Includes the request processing, upstream, response delivery, and post-processing, but excludes processing before tracing is activated. |
| `response` | Response processing and delivery to the client. | Starts after an upstream or internally generated response becomes available. This includes the time spent to fully stream the response back to the client. |
| `workers_routing` | The decision to match, skip, or reject a Workers route or custom domain. A `skipped` means a skip or disabled route matched. Requests that are not eligible for Workers routing do not emit this span. | Includes the time to evaluate the routes/custom domains that might match the request. Does not include the time executing the Worker. |
| `page_rules` | One evaluation of a configured Page Rules set. | Includes the time to evaluate the Page Rules. It does not include applying those actions to the request. |
| `cache` | Getting a response from Cloudflare's cache, fetching or revalidating it when needed. | On a cache hit, includes reading and transferring the cached response. If Cloudflare needs to fetch or revalidate the response, that time is included too, including waiting for another request already filling the cache. **Includes the full response body, not just the cache lookup.** |
| `dynamic` | Fetching and returning an uncached response. | Includes establishing a connection when needed, sending the request and its body, waiting for the response, and transferring the full response body. **It is not just the time your origin spends processing the request.** |
| `upstream` | Fetching a response from another Cloudflare location using Tiered Cache. | Includes establishing a connection when needed, sending the request, waiting for the other location to produce a response, and receiving its full response body. If that location needs to fetch from your origin, that wait is included. **It is not just the network travel time between locations.** |

## Ruleset phase spans

Ruleset phase spans measure rule execution and application of the phase output. They start after eligibility checks and request-body preparation, and end after Cloudflare applies the resulting actions. A skipped phase does not emit a span.

| Span | Ruleset phase covered |
| --- | --- |
| `http_request_dynamic_redirect` | Dynamic Redirect Rules |
| `http_request_transform` | Early request Transform Rules |
| `http_config_settings` | Configuration Rules |
| `http_request_origin` | Origin Rules |
| `http_request_firewall_custom` | Custom rules |
| `http_request_firewall_managed` | Managed rules |
| `http_request_redirect` | Request redirect rules |
| `http_request_late_transform_managed` | Managed late request transforms |
| `http_request_late_transform` | Late request transforms |
| `http_request_cache_settings` | Cache Rules |
| `http_request_snippets` | Snippets rules |
| `http_custom_errors` | Custom Error Rules |
| `http_response_headers_transform_managed` | Managed response header transforms |
| `http_response_headers_transform` | Response Header Transform Rules |
| `http_response_compression` | Compression Rules |
| `http_response_firewall_managed` | Managed response firewall processing |

## Workers runtime spans

Cloudflare Traces include spans for supported Workers runtime operations, including handler invocations, fetch calls, and binding operations.

Refer to [Workers spans and attributes](https://developers.cloudflare.com/workers/observability/traces/spans-and-attributes/) for the complete runtime reference. You can also [create custom spans](https://developers.cloudflare.com/workers/observability/traces/custom-spans/) for application-specific operations.

Note

[Workers tracing](https://developers.cloudflare.com/workers/observability/traces/) needs to be enabled to see Workers spans in a Cloudflare Trace.

## Features without spans

Some Cloudflare features do not yet have dedicated spans. Requests processed by these features still appear in traces, but without span-level detail for that processing.

- DDoS protection rules
- Cloudflare Access
- Cloudflare Tunnel

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/traces/spans/#page","headline":"Spans","description":"Understand spans captured as requests move through Cloudflare.","url":"https://developers.cloudflare.com/observability/traces/spans/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/traces/spans/og.png?v=2668c41ce53abbb0","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
