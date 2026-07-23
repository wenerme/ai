---
description: Connect to Privacy Proxy, configure your client, and verify that traffic is proxied correctly.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-proxy/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/privacy-proxy/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

```sh
curl -v \
  --proxy https://your-proxy.example.com \
  --proxy-header "Proxy-Authorization: Preshared <YOUR_PSK>" \
  https://example.com
```

### Use Chaussette

[Chaussette](https://developers.cloudflare.com/privacy-proxy/reference/client-libraries/#chaussette) is a local SOCKS5 proxy that handles authentication and forwards requests to Privacy Proxy.

1. Start Chaussette with your PSK and proxy endpoint:
```sh
MASQUE_PRESHARED_KEY=<YOUR_PSK> chaussette \
  --listen 127.0.0.1:1987 \
  --proxy https://your-proxy.example.com:443
```
2. Configure your browser to use the local SOCKS5 proxy:
```sh
google-chrome --proxy-server="socks5://127.0.0.1:1987"
```

---

## 2\. Verify the connection

To confirm that traffic is routing through Privacy Proxy, check your apparent IP address:

```sh
curl -v \
  --proxy https://your-proxy.example.com \
  --proxy-header "Proxy-Authorization: Preshared <YOUR_PSK>" \
  https://cloudflare.com/cdn-cgi/trace
```

The response includes connection metadata. Look for the `ip` field, which should show a Cloudflare egress IP address rather than your real IP.

```txt
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

The `ip` value confirms the egress IP address used by the proxy.

---

## 3\. (Optional) Test geolocation

Privacy Proxy preserves user geolocation by selecting egress IP addresses based on the client's location. You can specify a geohash to test this behavior:

```sh
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/privacy-proxy/get-started/#page","headline":"Get started · Cloudflare Privacy Proxy docs","description":"Connect to Privacy Proxy, configure your client, and verify that traffic is proxied correctly.","url":"https://developers.cloudflare.com/privacy-proxy/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
