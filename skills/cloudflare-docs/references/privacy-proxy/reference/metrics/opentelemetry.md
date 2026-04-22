---
title: OpenTelemetry
description: Export Privacy Proxy metrics and traces to your observability platform using the OpenTelemetry Protocol (OTLP).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-proxy/reference/metrics/opentelemetry.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# OpenTelemetry

Privacy Proxy exports telemetry data using the [OpenTelemetry Protocol (OTLP) ↗](https://opentelemetry.io/docs/specs/otlp/). You can configure an endpoint to receive this data and forward it to your observability platform.

---

## Configure telemetry export

During onboarding, provide Cloudflare with your OpenTelemetry collector endpoint:

* **Endpoint URL**: The HTTPS endpoint where telemetry data should be sent.
* **Authentication**: Headers or credentials required to authenticate with your collector. Supported authentication types include bearer token headers, custom header-based authentication, and mutual TLS (mTLS).

Cloudflare configures your Privacy Proxy instance to export telemetry to this endpoint.

---

## Supported signals

Privacy Proxy exports the following telemetry signals:

| Signal  | Description                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------- |
| Metrics | Connection counts, request rates, latency histograms, error rates                                     |
| Traces  | Per-request traces showing proxy processing time. Traces are sampled at approximately 1% of requests. |

---

## Metrics

Privacy Proxy exports metrics that help you understand usage patterns and performance.

### Connection metrics

| Metric                                         | Description                       |
| ---------------------------------------------- | --------------------------------- |
| privacy\_proxy\_connections\_total             | Total number of proxy connections |
| privacy\_proxy\_connections\_active            | Currently active connections      |
| privacy\_proxy\_connections\_duration\_seconds | Connection duration histogram     |

### Request metrics

| Metric                                 | Description                              |
| -------------------------------------- | ---------------------------------------- |
| privacy\_proxy\_requests\_total        | Total CONNECT requests processed         |
| privacy\_proxy\_requests\_by\_status   | Requests grouped by response status code |
| privacy\_proxy\_bytes\_sent\_total     | Total bytes sent to destinations         |
| privacy\_proxy\_bytes\_received\_total | Total bytes received from destinations   |

### Latency metrics

| Metric                                        | Description                                 |
| --------------------------------------------- | ------------------------------------------- |
| privacy\_proxy\_connect\_latency\_seconds     | Time to establish connection to destination |
| privacy\_proxy\_first\_byte\_latency\_seconds | Time to first byte from destination         |

---

## `Server-Timing` header

Privacy Proxy includes a `Server-Timing` header in responses to help measure processing latency from the client side. For full header format details, refer to [HTTP headers](https://developers.cloudflare.com/privacy-proxy/reference/http-headers/#server-timing).

```

Server-Timing: proxy;dur=12.5


```

The `dur` value is the processing time in milliseconds introduced by the proxy. Use this header as a client-side SLI (Service Level Indicator) to monitor proxy performance.

### Example: Prometheus and Grafana

To visualize Privacy Proxy metrics in Grafana:

1. Configure an OpenTelemetry collector to receive data from Privacy Proxy.
2. Export metrics from the collector to Prometheus.
3. Create Grafana dashboards using Prometheus as a data source.

Example Prometheus queries

```

# Request rate over time

rate(privacy_proxy_requests_total[5m])


# 95th percentile connection latency

histogram_quantile(0.95, rate(privacy_proxy_connect_latency_seconds_bucket[5m]))


# Error rate

sum(rate(privacy_proxy_requests_by_status{status=~"5.."}[5m])) / sum(rate(privacy_proxy_requests_total[5m]))


```

---

## Related resources

* [OpenTelemetry documentation ↗](https://opentelemetry.io/docs/) — Learn more about OpenTelemetry concepts and configuration.
* [GraphQL Analytics API](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/) — Query metrics programmatically via Cloudflare's GraphQL API.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/reference/metrics/","name":"Observability"}},{"@type":"ListItem","position":5,"item":{"@id":"/privacy-proxy/reference/metrics/opentelemetry/","name":"OpenTelemetry"}}]}
```
