---
title: Troubleshooting
description: Where to find logs and diagnostics for Spectrum applications.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Troubleshooting

To investigate issues with a Spectrum application, use the logs and diagnostics described on this page. For API validation errors returned when creating or updating an application, refer to [Error codes](https://developers.cloudflare.com/spectrum/reference/error-codes/).

## Spectrum event logs

Spectrum logs the lifecycle of every connection it proxies, including status codes for edge-to-origin failures (for example, `521` connection refused, `522` timeout, `523` unreachable). Refer to [Event logs](https://developers.cloudflare.com/spectrum/reference/logs/).

## Virtual network origins

When a Spectrum application uses a [virtual network origin](https://developers.cloudflare.com/spectrum/reference/configuration-options/#virtual-network-origin), traffic to the origin flows through the connector associated with the virtual network. Diagnose origin connectivity from the connector side using the sources for your connector type.

### Cloudflare Tunnel as the connector

* **Tunnel logs** record activity between `cloudflared` and Cloudflare's network and between `cloudflared` and your origin. Refer to [Log streams](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/).
* **Tunnel diagnostic logs** collect a diagnostic report from a single `cloudflared` instance. Refer to [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/).
* **Private network connectivity** covers common causes when traffic does not reach a private origin through a tunnel. Refer to [Private network connectivity](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/private-networks/).

### Cloudflare WAN as the connector

For tunnel health, BGP, and routing diagnostics on WAN-connected origins, refer to [Troubleshoot Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/reference/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Spectrum docs","description":"Where to find logs and diagnostics for Spectrum applications.","url":"https://developers.cloudflare.com/spectrum/reference/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/reference/troubleshooting/","name":"Troubleshooting"}}]}
```
