---
description: Choose how each domain samples, stores, exports, and connects traces.
title: Configuration
image: https://developers.cloudflare.com/observability/traces/configuration/og.png?v=61a155bcdb386a5f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/traces/configuration/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/) separately for each domain. Choose how many requests to trace, where to save or send traces, and whether to connect them to traces from other systems.

![Trace settings for sampling, persistence, export destinations, trace rules, and trace context propagation.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1500,height=892,format=webp/_astro/trace-configuration.K-zGxXIJ.png)

## Head sampling

**Default sample rate (%)** sets how many requests Cloudflare traces. For example, a rate of `10%` traces about 10 out of every 100 requests. Trace rules can use a different rate for requests that match a rule.

Cloudflare makes the sampling decision when the request arrives. Once a request is selected for tracing, Cloudflare captures the full request path. There is no overhead with enabling tracing.

Free plan daily limit

Free accounts have a daily ingestion limit. When this limit is reached, Cloudflare stops ingesting new traces for the remainder of that day. Refer to [Cloudflare Observability pricing](https://developers.cloudflare.com/observability/pricing/) for limit details.

## Trace rules

Trace rules override the default sample rate for matching requests. Cloudflare uses the first matching rule, so rule order matters.

Choose **Custom filter expression** to match selected requests, or choose **All incoming requests** to apply the rule to every request. Build a custom filter from fields, operators, and values, or select **Edit expression** to write it with the [Cloudflare Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).

Set **Sample rate (%)** to the percentage of matching requests you want to trace. Select **Save as Draft** to keep the rule inactive, or select **Deploy** to start using it.

![A trace rule that samples all incoming requests with a URL path starting with /api/v1.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1350,height=878,format=webp/_astro/create-trace-rule.PluHax99.png)

## Persist traces

Turn on **Persist to Cloudflare** to save traces in Cloudflare and view them in the dashboard.

Pricing

Beginning December 1, 2026, persisted traces contribute to Cloudflare Observability ingestion and storage usage. Refer to [Cloudflare Observability pricing](https://developers.cloudflare.com/observability/pricing/).

## Export traces

Use **Export destinations** to send traces to configured account-level OpenTelemetry destinations. To create a destination or configure a provider, refer to [OpenTelemetry export](https://developers.cloudflare.com/observability/export/opentelemetry/).

You can save and export the same traces. If you only want traces in an external tool, turn off **Persist to Cloudflare**.

## Propagate trace context

Trace context carries identifiers that connect spans from different systems into one trace. Cloudflare uses [W3C Trace Context ↗︎](https://www.w3.org/TR/trace-context-1/) to connect its spans to services before or after Cloudflare in the request path. You can configure incoming and outgoing propagation separately.

### Incoming trace context

Use **Incoming trace context** to choose whether Cloudflare accepts trace context included with an incoming request. The default setting is *Reject*, which ignores the incoming context so Cloudflare does not join the caller's trace.

Caution

Cloudflare does not verify that incoming trace context came from a trusted caller. If you accept it, treat the joined trace as untrusted.

### Forward context to your origin

Turn on **Forward to origin** to include trace context in requests that Cloudflare sends to your origin. An instrumented origin can use this context to add its spans to the same trace. Forwarding context does not instrument the origin or create origin spans by itself.

To view Cloudflare and origin spans in one trace in a third-party observability tool, send both sets of spans to the same OpenTelemetry destination.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/traces/configuration/#page","headline":"Configuration","description":"Choose how each domain samples, stores, exports, and connects traces.","url":"https://developers.cloudflare.com/observability/traces/configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/traces/configuration/og.png?v=61a155bcdb386a5f","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
