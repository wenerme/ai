---
description: Understand how your Worker projects are performing via logs, traces, metrics, and other data sources.
title: Observability
image: https://developers.cloudflare.com/workers/observability/og.png?v=fe4d438ff952dcab
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Observability

Last updated Oct 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/observability/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Workers provides comprehensive observability tools to help you understand how your applications are performing, diagnose issues, and gain insights into request flows. Whether you want to use Cloudflare's native observability platform or export telemetry data to your existing monitoring stack, Workers has you covered.

## Logs

Logs are essential for troubleshooting and understanding your application's behavior. Cloudflare offers several ways to access and manage your Worker logs.

### [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)

Automatically collect, store, filter, and analyze logs in the Cloudflare dashboard.

### [Real-time logs](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/)

Access log events in near real-time for immediate feedback during development and deployments.

### [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/)

Apply custom filtering, sampling, and transformation logic to your telemetry data.

### [Workers Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/)

Send Workers Trace Event Logs to supported destinations like R2, S3, or logging providers.

## Traces

[Tracing](https://developers.cloudflare.com/workers/observability/traces/) gives you end-to-end visibility into the life of a request as it travels through your Workers application and connected services. With automatic instrumentation, Cloudflare captures telemetry data for fetch calls, binding operations (KV, R2, Durable Objects), and handler invocations - no code changes required.

## Issues

[Issues](https://developers.cloudflare.com/workers/observability/issues/) detects and groups recurring Worker failures. Investigate each occurrence and route issues to coding agents, webhooks, chat services, or incident-management tools.

## Metrics and analytics

[Metrics and analytics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/) let you monitor your Worker's health with built-in metrics including request counts, error rates, CPU time, wall time, and execution duration. View metrics per Worker or aggregated across all Workers on a zone.

## Query Builder

The [Query Builder](https://developers.cloudflare.com/workers/observability/query-builder/) helps you write structured queries to investigate and visualize your telemetry data. Build queries with filters, aggregations, and groupings to analyze logs and identify patterns.

## Exporting data

[Configure OpenTelemetry export](https://developers.cloudflare.com/workers/observability/opentelemetry-export/) for Workers logs and traces. Workers can export to any [supported OpenTelemetry destination](https://developers.cloudflare.com/observability/export/opentelemetry/).

## Debugging

### [Errors and exceptions](https://developers.cloudflare.com/workers/observability/errors/)

Understand Workers error codes and debug common issues.

### [Source maps and stack traces](https://developers.cloudflare.com/workers/observability/source-maps/)

Get readable stack traces that map back to your original source code.

### [DevTools](https://developers.cloudflare.com/workers/observability/dev-tools/)

Use Chrome DevTools for breakpoints, CPU profiling, and memory debugging during local development.

### [Profiling in production](https://developers.cloudflare.com/workers/observability/profiling-in-production/)

Capture CPU and allocation profiles for deployed Workers and Durable Objects.

### [Local observability](https://developers.cloudflare.com/workers/local-development/local-explorer/)

Capture traces, spans, and logs from your Workers locally.

## Additional resources

### [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/#cloudflare-api-mcp-server)

Query Workers observability data with the Cloudflare API MCP server.

### [Third-party integrations](https://developers.cloudflare.com/workers/observability/third-party-integrations/)

Integrate Workers with third-party observability platforms.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/observability/#page","headline":"Observability","description":"Understand how your Worker projects are performing via logs, traces, metrics, and other data sources.","url":"https://developers.cloudflare.com/workers/observability/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/observability/og.png?v=fe4d438ff952dcab","dateModified":"2026-10-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
