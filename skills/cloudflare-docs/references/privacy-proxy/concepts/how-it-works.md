---
title: How Privacy Proxy works
description: Learn how Privacy Proxy uses MASQUE protocols to create encrypted tunnels that separate user identity from user activity.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-proxy/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Privacy Proxy works

Privacy Proxy uses the MASQUE protocol suite to create encrypted tunnels between clients and destination servers. This page explains the protocol mechanics and how privacy is preserved.

## Traffic flow

```

┌──────────┐      1. Connect + Auth      ┌──────────┐      4. Connect        ┌─────────────┐

│          │ ──────────────────────────▶ │          │ ────────────────────▶  │             │

│  Client  │      2. CONNECT request     │  Privacy │      (Egress IP)       │ Destination │

│          │ ──────────────────────────▶ │  Proxy   │                        │   Server    │

│          │                             │          │ ◀────────────────────  │             │

│          │      3. 200 OK              │          │      5. Connected      │             │

│          │ ◀────────────────────────── │          │                        │             │

│          │                             │          │                        │             │

│          │  ◀───── 6. Encrypted data tunnel ─────▶  ◀─────────────────────▶│             │

└──────────┘                             └──────────┘                        └─────────────┘


           │◀──── Client IP hidden ────▶│◀──── Cloudflare Egress IP visible ──────────▶│


```

1. The client establishes an HTTP/2 or HTTP/3 connection to Privacy Proxy and presents credentials (PSK or Privacy Pass token) in the `Proxy-Authorization` header.
2. The client sends a CONNECT request specifying the destination hostname and port.
3. The proxy responds with `200 OK` to confirm the tunnel is ready.
4. The proxy opens a connection to the destination using an egress IP address selected based on the client's geolocation.
5. The client sends encrypted data through the tunnel. The proxy forwards bytes without inspection.

Throughout this process, the proxy learns the destination but not the content. The destination learns the egress IP address but not the client's real IP.

## MASQUE protocols

[MASQUE ↗](https://datatracker.ietf.org/wg/masque/about/) (Multiplexed Application Substrate over QUIC Encryption) defines methods for proxying traffic over HTTP. Privacy Proxy supports two MASQUE methods:

| Method       | Transport | Use case                                   |
| ------------ | --------- | ------------------------------------------ |
| HTTP CONNECT | TCP       | Traditional HTTPS traffic                  |
| CONNECT-UDP  | UDP       | QUIC-based traffic, real-time applications |

Both methods create encrypted tunnels where the proxy forwards traffic without inspecting the content. The proxy sees only the destination hostname and port, not the actual requests, paths, or data exchanged.

Privacy Proxy accepts connections over HTTP/2 (TLS over TCP) and HTTP/3 (QUIC), selecting the appropriate protocol based on client capabilities.

For a technical deep dive into how these protocols work, refer to our [blog post ↗](https://blog.cloudflare.com/a-primer-on-proxies/).

## Privacy separation

Privacy Proxy creates a privacy boundary between user identity and user activity:

| Information                         | Who knows it                                                  |
| ----------------------------------- | ------------------------------------------------------------- |
| User identity (IP address, account) | Authentication service, first-hop proxy (if using double-hop) |
| Destination server                  | Privacy Proxy, destination server                             |
| Request content                     | Client, destination server only                               |

The proxy authenticates users to verify they have permission to use the service, but authentication happens separately from proxying. Once authenticated, the proxy forwards traffic without linking individual requests to specific users.

## Related resources

* [A Primer on Proxies ↗](https://blog.cloudflare.com/a-primer-on-proxies/) \- Technical deep dive into HTTP CONNECT and MASQUE protocols.
* [MASQUE Working Group ↗](https://datatracker.ietf.org/wg/masque/about/) \- IETF working group developing proxy protocol standards.
* [RFC 9298 ↗](https://datatracker.ietf.org/doc/html/rfc9298) \- CONNECT-UDP specification for proxying UDP over HTTP.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/concepts/how-it-works/","name":"How Privacy Proxy works"}}]}
```
