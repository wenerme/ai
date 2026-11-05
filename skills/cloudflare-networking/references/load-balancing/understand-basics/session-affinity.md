---
description: Route repeat visitors to the same origin server.
title: Session affinity
image: https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/og.png?v=80985e8cd7aca60e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Session affinity

Last updated Nov 4, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you enable session affinity, your load balancer directs all requests from a particular end user to a specific endpoint. This continuity preserves information about the user session — such as items in their shopping cart — that might otherwise be lost if requests were spread out among multiple servers.

Session affinity can also help reduce network requests, leading to savings for customers with usage-based billing.

Note

Private load balancers support only the **By Cloudflare cookie and Client IP fallback** type, which works without cookies. For details, refer to [Session affinity on private load balancers](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#private-load-balancers).

## Types

Session affinity specifies the type of session affinity the load balancer should use unless specified as `"none"` or `""` (default).

### By Cloudflare cookie only

On the first request to a proxied load balancer, a cookie is generated, encoding information of which endpoint the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the endpoint the cookie encodes for the duration of the cookie and as long as the endpoint remains healthy. If the cookie has expired or the endpoint is unhealthy, a new endpoint is calculated and used.

#### How does it work?

Session affinity automatically directs requests from the same client to the same endpoint:

1. When a client makes its first request, Cloudflare sets a `__cflb` cookie on the client (to track the associated endpoint).
2. Subsequent requests by the same client are forwarded to that endpoint for the duration of the cookie and as long as the endpoint remains healthy.
3. If the cookie expires or the endpoint becomes unhealthy, Cloudflare sets a new cookie tracking the new failover endpoint.

```
    flowchart LR
      accTitle: Session affinity process
      accDescr: Session affinity directs requests from the same client to the same server.
     A[Client] --Request--> B{<code>__cflb</code> cookie set?}
     B -->|Yes| C[Route to previous endpoint]
     C --> O2
     B ---->|No| E[Follow normal routing]
     E --> O2
     E --Set <code>__cflb</code> cookie--> A
     subgraph P1 [Pool 1]
        O1[Endpoint 1]
        O2[Endpoint 2]
     end

```



All cookie-based sessions default to 23 hours unless you set a custom session *Time to live* (TTL).

The session cookie is secure when [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.

### By Cloudflare cookie and Client IP fallback

This behaves similar to `cookie` except the initial endpoint selection is stable and based on the client's IP address.

### By HTTP header

On the first request to a proxied load balancer, a session key based on the configured HTTP headers is generated. The session key encodes the request headers used for storing which endpoint the request will be forwarded to during the load balancer session state. Subsequent requests to the load balancer with the same headers will be sent to the same endpoint, for the duration of the session and as long as the endpoint remains healthy. If the session has been idle for the duration of session affinity TTL seconds or the endpoint is unhealthy, then a new endpoint is calculated and used.

Note

[Sticky Zero-Downtime Failover](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#zero-downtime-failover) is not supported for session affinity by HTTP header.

#### Control how headers are used

By default, at least one of the HTTP headers that you configure for session affinity by HTTP header must be present on requests sent to your load balancer in order for header-based sessions to be created. If a client adds or removes HTTP headers on their requests and they have already established a session, a new session will be created based on the new HTTP headers found in subsequent requests as long as they are specified in your configuration.

If you would like to require all of your configured HTTP headers to be present on requests in order for sessions to be created, then set `session_affinity_attributes.require_all_headers` to `true` via the Cloudflare API or toggle `Require all headers` to `enabled` in the Cloudflare dashboard when editing your load balancer.

---

## Enabling Session Affinity from the Cloudflare dashboard

Enable Session Affinity when you [create or edit a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/), during the **Hostname** step.

If you enable Session Affinity, choose one of the following options:

- **By Cloudflare cookie only**: Sets a `__cflb` cookie to track the associated endpoint.
- **By Cloudflare cookie and Client IP fallback**: Sets a `__cflb` cookie, but also uses the client IP address when no session affinity cookie is provided.
- **By HTTP header**.

Important

Session Affinity is not supported in [DNS-only mode (gray cloud)](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/). Alternatively, you can use [DNS persistence](https://developers.cloudflare.com/load-balancing/additional-options/dns-persistence/).

---

## Enabling Session Affinity via the Cloudflare API

Session affinity is a property of load balancers, which you can set with the following endpoints:

- [Create a load balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/create/)
- [Edit a load balancer](https://developers.cloudflare.com/api/resources/load_balancers/methods/update/)

Customize the behavior of session affinity by using the `session_affinity`, `session_affinity_ttl`, and `session_affinity_attributes` parameters.

To enable session affinity by HTTP header, set the `session_affinity` value to `header` and add your HTTP header names to `session_affinity_attributes.headers`.

For more details on API commands in context, refer to [Create a load balancer with the API](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/).

---

## Private load balancers

[Private load balancers](https://developers.cloudflare.com/load-balancing/private-network/) handle Layer 3/4 traffic and do not set or read cookies or HTTP headers. To get session affinity on a private load balancer, use the [API](#enabling-session-affinity-via-the-cloudflare-api) to set `session_affinity` to `ip_cookie` (**By Cloudflare cookie and Client IP fallback**). The `cookie` and `header` types have no effect on private load balancers.

With `ip_cookie`, the load balancer picks the endpoint based on a stable identifier for the client:

- For traffic from the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), the identifier is the client device. A device keeps the same endpoint even if its IP address changes.
- For traffic from other on-ramps, the identifier is the source IP address.

Requests with the same identifier go to the same endpoint for as long as that endpoint stays healthy. No cookie is stored, so `session_affinity_ttl` does not apply. A client may move to a different endpoint if that endpoint becomes unhealthy or if you add, remove, or reweight endpoints in the pool.

The dashboard does not show session affinity settings for private load balancers. To keep each client on the same endpoint within a pool from the dashboard, set the pool's **Endpoint steering** to [**Hash**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering/#private-load-balancers) instead. Hash steering uses the same client identifier.

Session affinity selects an endpoint, not a tunnel replica

Session affinity on a private load balancer keeps a client on the same endpoint (IP address and virtual network). It does not control which [`cloudflared` replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) of a tunnel carries the traffic. Cloudflare forwards traffic to the replica closest to the Cloudflare data center handling the request, so the same client can reach the endpoint through different replicas over time. Each replica can reach the endpoint from a different source IP. Applications that bind a session to the client's source IP, such as some firewall or appliance admin interfaces, may still see requests from different IP addresses. To avoid this, put a proxy in front of the application so it always sees the same source IP, or run a single `cloudflared` replica for that tunnel (this removes replica redundancy).

---

## Endpoint Drain

Drain or remove all traffic from an endpoint without affecting any active customers using endpoint drain. For more details on endpoint drain, refer to [Performing planned maintenance](https://developers.cloudflare.com/load-balancing/additional-options/planned-maintenance/#gradual-rotation).

Important

Endpoint drain is not supported for load balancers in [DNS-only mode (gray cloud)](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/).

## Zero-Downtime Failover

Zero-Downtime Failover automatically sends traffic to endpoints within a pool during transient network issues. This helps reduce errors shown to your users when issues occur in between active health monitors.

You can enable one of three options:

- **None**: No failover will take place and errors may show to your users.
- **Temporary**: Traffic will be sent to other endpoint(s) until the originally pinned endpoint is available.
- **Sticky**: The session affinity cookie is updated and subsequent requests are sent to the new endpoint moving forward as needed.

Note

[Sticky Zero-Downtime Failover](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#zero-downtime-failover) is not supported for session affinity by HTTP header.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#page","headline":"Session affinity","description":"Route repeat visitors to the same origin server.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/","inLanguage":"en","image":"https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/og.png?v=80985e8cd7aca60e","dateModified":"2026-11-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
