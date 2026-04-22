---
title: Observability
description: Monitor Privacy Proxy deployments using the GraphQL Analytics API or OpenTelemetry telemetry export.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-proxy/reference/metrics/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Observability

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/reference/metrics/","name":"Observability"}}]}
```
