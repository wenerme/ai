---
title: HTTP headers
description: HTTP headers used by Privacy Proxy for authentication, geolocation, and observability, including request and response formats.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# HTTP headers

This page documents the HTTP headers used by Privacy Proxy for authentication, geolocation, and observability. For full observability details, refer to [GraphQL Analytics API](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/) and [OpenTelemetry](https://developers.cloudflare.com/privacy-proxy/reference/metrics/opentelemetry/).

## Request headers

Clients include the following headers when connecting to Privacy Proxy.

### `Proxy-Authorization`

Authenticates the client to the proxy. Required for all requests.

Pre-shared key format:

```

Proxy-Authorization: Preshared <key>


```

Privacy Pass token format:

```

Proxy-Authorization: PrivateToken token=<base64-encoded-token>


```

| Parameter              | Description                               |
| ---------------------- | ----------------------------------------- |
| <key>                  | The pre-shared key provided by Cloudflare |
| <base64-encoded-token> | A base64-encoded Privacy Pass token       |

### GraphQL Analytics API request headers

When querying Privacy Proxy metrics via the GraphQL Analytics API, send a `POST` request to `https://api.cloudflare.com/client/v4/graphql`. For required headers and authentication details, refer to [GraphQL Analytics API](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/).

### `sec-ch-geohash`

Specifies the client's geographic location for egress IP selection. Optional but recommended for accurate geolocation.

```

sec-ch-geohash: <geohash>-<country_code>


```

| Parameter       | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| <geohash>       | A [geohash ↗](https://en.wikipedia.org/wiki/Geohash) string (typically 4-8 characters) |
| <country\_code> | ISO 3166-1 alpha-2 country code                                                        |

Example

```

sec-ch-geohash: u4pruydqqvj-GB


```

This example specifies a location in the United Kingdom.

---

## Response headers

Privacy Proxy includes the following headers in responses.

### `Server-Timing`

Provides timing information about proxy processing. This is part of the [OpenTelemetry](https://developers.cloudflare.com/privacy-proxy/reference/metrics/opentelemetry/) observability pipeline.

```

Server-Timing: proxy;dur=<milliseconds>


```

| Parameter      | Description                                             |
| -------------- | ------------------------------------------------------- |
| <milliseconds> | Processing time in milliseconds introduced by the proxy |

Example

```

Server-Timing: proxy;dur=8.2


```

### GraphQL Analytics API response headers

For response headers returned by the GraphQL API, refer to [GraphQL Analytics API](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/).

---

## `CONNECT` request format

A complete `CONNECT` request to Privacy Proxy looks like this:

```

CONNECT example.com:443 HTTP/2

Host: example.com

Proxy-Authorization: Preshared abc123xyz

sec-ch-geohash: 9q8yy-US


```

The proxy responds with a status code indicating success or failure:

| Status                  | Meaning                          |
| ----------------------- | -------------------------------- |
| 200 OK                  | Tunnel established successfully  |
| 403 Forbidden           | Authentication failed            |
| 502 Bad Gateway         | Could not connect to destination |
| 503 Service Unavailable | Proxy temporarily unavailable    |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/reference/http-headers/","name":"HTTP headers"}}]}
```
