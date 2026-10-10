---
description: Inspect production request paths in Cloudflare Observability.
title: Traces
image: https://developers.cloudflare.com/observability/traces/og.png?v=2f14e97f99a2b734
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Traces

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/traces/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Traces show how production requests move through Cloudflare and record traces from actual traffic on your domain. Each trace contains [spans](https://developers.cloudflare.com/observability/traces/spans/) for supported steps in the request path, such as [Rules](https://developers.cloudflare.com/rules/), request routing, [Cache](https://developers.cloudflare.com/cache/), [Workers](https://developers.cloudflare.com/workers/), and origin connections. A span records how long an operation took, its outcome, and related attributes, which helps you see where a request slowed down or failed.

![A Cloudflare trace showing request processing spans, Worker and origin operations, timing, and details for a selected span.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2638,height=1124,format=webp/_astro/full-cloudflare-trace.BdBuHOv5.png)

Use Cloudflare Traces to answer questions such as:

- Why was a request blocked or challenged, and which [security rule](https://developers.cloudflare.com/waf/custom-rules/) took action?
- Was the URL rewritten by a [Transform Rule](https://developers.cloudflare.com/rules/transform/) before it reached the application?
- Which [Page Rules](https://developers.cloudflare.com/rules/page-rules/), [Snippets](https://developers.cloudflare.com/rules/snippets/), or [Workers](https://developers.cloudflare.com/workers/) handled or changed the request?
- Was the response served from [cache](https://developers.cloudflare.com/cache/), and where was time spent between Cloudflare, the origin connection, and the application?
- Was the behavior isolated to a particular [Cloudflare location or region](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/)?

## Enable tracing

Enable tracing separately for each domain in your account. To manage sampling, context, export destinations, and trace rules, refer to [Configuration](https://developers.cloudflare.com/observability/traces/configuration/).

## Inspect a trace

Use **Add filter** or enter a query to search across traces for the selected time range. To find the trace for one request, filter on its Ray ID.

Open a trace to see the full request path as a hierarchy of spans. Each row represents one operation, and its bar shows when the operation ran and how long it took. Expand a span to inspect its child operations, or search for a span by name.

Select a span to open its details. The detail panel shows the span status, service, trigger, span and trace IDs, duration compared to similar spans, and recorded attributes. You can search or copy the attributes while investigating the operation.

Cloudflare Trace

[Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) simulates how Cloudflare configurations would handle a request. It does not show actual production traffic.

## Frequently asked questions

### Does tracing add latency to my requests

No. Tracing has no measurable overhead on request processing. Requests that are not sampled skip tracing entirely.

### Why is there a gap in my trace

A Worker in the request path may not have Workers tracing enabled. Enable it using `observability.traces.enabled = true` in your [Wrangler configuration](https://developers.cloudflare.com/workers/observability/traces/#how-to-enable-tracing).

### Why is there no outbound connection span

If the response was served from cache, Cloudflare did not contact your origin. Check the `cloudflare.cache.status` attribute on the `cache` span to confirm it was a HIT rather than an origin connection.

### How do I capture the trace for a specific request

Filter by Ray ID in the dashboard with `cloudflare.ray_id = "<ray>"`. To guarantee a particular request is captured regardless of the default sample rate, create a [trace rule](https://developers.cloudflare.com/observability/traces/configuration/#trace-rules) that matches a custom debug header and sets the sample rate to 100%.

### Can I sample only slow requests or errors

Not yet. Sampling is [head-based ↗︎](https://opentelemetry.io/docs/concepts/sampling/#head-sampling) — the decision happens when a request arrives, before the outcome is known. Tail-based sampling is not currently supported.

### Are request header values captured in spans

Header names and the operations performed on them are captured. Header values are not captured. URLs and query strings are captured.

### Are span names a stable interface

No. Span names and structure may change as the product evolves. Do not build hard dependencies on the exact shape of Cloudflare-emitted spans.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/observability/traces/#page","headline":"Traces","description":"Inspect production request paths in Cloudflare Observability.","url":"https://developers.cloudflare.com/observability/traces/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/traces/og.png?v=2f14e97f99a2b734","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
