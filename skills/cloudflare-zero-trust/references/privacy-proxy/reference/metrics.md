---
description: Monitor Privacy Proxy deployments using the GraphQL Analytics API or OpenTelemetry telemetry export.
title: Observability
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-proxy/llms.txt
> Use this file to discover all available pages before exploring further.

#  Observability

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/privacy-proxy/reference/metrics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Privacy Proxy provides two methods for accessing metrics and monitoring your proxy deployment. We recommend getting started with GraphQL as the default method for observability.

* [ GraphQL Analytics API ](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/)
* [ OpenTelemetry ](https://developers.cloudflare.com/privacy-proxy/reference/metrics/opentelemetry/)

## Data privacy

Regardless of whether you use the GraphQL Analytics API or OpenTelemetry, Privacy Proxy observability data does not include:

* User IP addresses
* Request content or headers (beyond what is needed for metrics)
* Destination URLs or hostnames (aggregated only)
* Authentication tokens or credentials

Both methods export only operational metrics that help you monitor service health without compromising user privacy.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/privacy-proxy/reference/metrics/#page","headline":"Observability · Cloudflare Privacy Proxy docs","description":"Monitor Privacy Proxy deployments using the GraphQL Analytics API or OpenTelemetry telemetry export.","url":"https://developers.cloudflare.com/privacy-proxy/reference/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
