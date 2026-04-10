---
title: Get started
description: This guide walks you through connecting to Privacy Proxy and verifying that traffic is proxied correctly.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-proxy/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

This guide walks you through connecting to Privacy Proxy and verifying that traffic is proxied correctly.

## Before you begin

Privacy Proxy is a managed service. Before you can connect, Cloudflare will provision an endpoint and provide you with:

* **Proxy endpoint URL**: The hostname for your Privacy Proxy instance (for example, `https://your-proxy.example.com`).
* **Pre-shared key (PSK)**: A secret key for proof-of-concept authentication.
* **Egress IP ranges**: The IP addresses that destination servers will see for proxied traffic.

[Contact us ↗](https://www.cloudflare.com/lp/privacy-edge/) to request access and receive your configuration details.

---

## 1\. Configure your client

Privacy Proxy accepts connections over HTTP/2 and HTTP/3 using the HTTP CONNECT method. Because Privacy Proxy requires authentication headers, you cannot configure browsers to connect directly. Instead, use one of the following approaches:

### Use curl for testing locally

For quick tests, use curl with the `--proxy` and `--proxy-header` flags to pass authentication directly:

Terminal window

```

curl -v \

  --proxy https://your-proxy.example.com \

  --proxy-header "Proxy-Authorization: Preshared <YOUR_PSK>" \

  https://example.com


```

### Use Chaussette

[Chaussette](https://developers.cloudflare.com/privacy-proxy/reference/client-libraries/#chaussette) is a local SOCKS5 proxy that handles authentication and forwards requests to Privacy Proxy.

1. Start Chaussette with your PSK and proxy endpoint:  
Terminal window  
```  
MASQUE_PRESHARED_KEY=<YOUR_PSK> chaussette \  
  --listen 127.0.0.1:1987 \  
  --proxy https://your-proxy.example.com:443  
```
2. Configure your browser to use the local SOCKS5 proxy:  
Terminal window  
```  
google-chrome --proxy-server="socks5://127.0.0.1:1987"  
```

---

## 2\. Verify the connection

To confirm that traffic is routing through Privacy Proxy, check your apparent IP address:

Terminal window

```

curl -v \

  --proxy https://your-proxy.example.com \

  --proxy-header "Proxy-Authorization: Preshared <YOUR_PSK>" \

  https://cloudflare.com/cdn-cgi/trace


```

The response includes connection metadata. Look for the `ip` field, which should show a Cloudflare egress IP address rather than your real IP.

Example response

```

fl=123f456

h=cloudflare.com

ip=162.159.xxx.xxx

ts=1234567890.123

visit_scheme=https

uag=curl/8.0.0

colo=SJC

http=http/2

loc=US

tls=TLSv1.3


```

Explain Code

The `ip` value confirms the egress IP address used by the proxy.

---

## 3\. (Optional) Test geolocation

Privacy Proxy preserves user geolocation by selecting egress IP addresses based on the client's location. You can specify a geohash to test this behavior:

Terminal window

```

curl -v \

  --proxy https://your-proxy.example.com \

  --proxy-header "Proxy-Authorization: Preshared <YOUR_PSK>" \

  --proxy-header "sec-ch-geohash: xn76c-JP" \

  https://cloudflare.com/cdn-cgi/trace


```

The `sec-ch-geohash` header provides a [geohash ↗](https://en.wikipedia.org/wiki/Geohash) that the proxy uses to select an appropriate egress IP. The format is `<geohash>-<country_code>`.

The response should show a `loc` value corresponding to the geohash region.

---

## Next steps

* Learn about [deployment models](https://developers.cloudflare.com/privacy-proxy/concepts/deployment-models/) to understand single-hop versus double-hop architectures.
* Review [authentication methods](https://developers.cloudflare.com/privacy-proxy/concepts/authentication/) for production deployments using Privacy Pass.
* Configure [observability](https://developers.cloudflare.com/privacy-proxy/reference/metrics/) to monitor proxy traffic with GraphQL Analytics and OpenTelemetry.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/get-started/","name":"Get started"}}]}
```
