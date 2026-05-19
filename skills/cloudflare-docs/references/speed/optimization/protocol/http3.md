---
title: HTTP/3 (with QUIC)
description: Serve content over HTTP/3 with QUIC for faster connections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP/3 (with QUIC)

HTTP/3 uses QUIC, which is a secure-by-default transport protocol. HTTP/3 improves page load times in a similar way to HTTP/2\. However, the QUIC transport protocol solves TCP's head-of-line blocking problem, meaning that performance over lossy networks can be better.

Note

For more background on HTTP/3, visit the [Learning Center ↗](https://www.cloudflare.com/learning/performance/what-is-http3/).

Note

This setting is for connection between the user and Cloudflare. HTTP/3 connection to the origin is not yet supported.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Enable HTTP/3

HTTP/3 is available to all plans (though it does require an [SSL certificate at Cloudflare’s edge network](https://developers.cloudflare.com/ssl/get-started/)).

* [ Dashboard ](#tab-panel-8377)
* [ API ](#tab-panel-8378)

To enable **HTTP/3** in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** \> **Settings**.
4. Go to **Protocol Optimization**.
5. For **HTTP/3**, switch the toggle to **On**.

To enable **HTTP/3** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `http3` as the setting name in the URI path, and the `value` parameter set to `"on"`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/protocol/","name":"Protocol optimization"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/protocol/http3/","name":"HTTP/3 (with QUIC)"}}]}
```
