---
title: Proxy status reference
description: All possible proxyStatus values for Privacy Proxy error classification in GraphQL Analytics and OpenTelemetry metrics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-proxy/reference/proxy-status.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Proxy status reference

The `proxyStatus` dimension provides proxy-level error classification. This field is available in both [GraphQL Analytics API](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/) and [OpenTelemetry](https://developers.cloudflare.com/privacy-proxy/reference/metrics/opentelemetry/) metrics. The value is an empty string when no proxy-level error occurred.

---

## `proxyStatus` values

| Value                        | Description                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| dns\_error                   | The proxy encountered a DNS error when resolving the next hop hostname.                              |
| dns\_timeout                 | The proxy timed out while resolving the next hop hostname.                                           |
| destination\_not\_found      | The proxy cannot determine the appropriate next hop for this request.                                |
| destination\_unavailable     | The proxy considers the next hop unavailable (for example, recent failures or health check is down). |
| destination\_ip\_prohibited  | The proxy is configured to prohibit connections to the next hop IP address.                          |
| destination\_ip\_unroutable  | The proxy cannot find a route to the next hop IP address.                                            |
| connection\_refused          | The proxy's connection to the next hop was refused.                                                  |
| connection\_terminated       | The proxy's connection to the next hop was closed before any response was received.                  |
| connection\_timeout          | The proxy's attempt to open a connection to the next hop timed out.                                  |
| connection\_read\_timeout    | The proxy was expecting data on a connection but received none within the configured time limit.     |
| connection\_write\_timeout   | The proxy was attempting to write data to a connection but was unable to.                            |
| connection\_limit\_reached   | The proxy's configured connection limit to the next hop has been exceeded.                           |
| source\_addr\_in\_use        | The proxy cannot assign a source address when connecting to the next hop.                            |
| source\_addr\_not\_available | The proxy cannot assign a source address (bind failure or source host resolution failure).           |
| tls\_protocol\_error         | The proxy encountered a TLS error when communicating with the next hop.                              |
| tls\_certificate\_error      | The proxy encountered an error verifying the certificate presented by the next hop.                  |
| http\_request\_error         | The proxy is generating a client (4xx) response on the origin's behalf.                              |
| http\_upgrade\_failed        | The HTTP Upgrade between the proxy and the next hop failed.                                          |
| http\_request\_denied        | The proxy rejected the HTTP request based on its configuration or policy.                            |
| proxy\_internal\_error       | The proxy encountered an internal error unrelated to the origin.                                     |
| proxy\_loop\_detected        | The proxy tried to forward the request to itself.                                                    |
| http\_protocol\_error        | The proxy encountered an HTTP protocol error when communicating with the next hop.                   |
| http\_response\_incomplete   | The proxy received an incomplete response from the next hop.                                         |
| rate\_limited                | The client has reached the maximum number of connections per second to a single origin.              |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/reference/proxy-status/","name":"Proxy status reference"}}]}
```
