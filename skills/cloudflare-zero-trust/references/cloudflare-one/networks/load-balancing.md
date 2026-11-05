---
description: Distribute and fail over private network traffic across servers and sites connected with Cloudflare Tunnel, Cloudflare Mesh, or Cloudflare WAN.
title: Load balance private network traffic
image: https://developers.cloudflare.com/cloudflare-one/networks/load-balancing/og.png?v=2c4b4692de8ea329
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Load balance private network traffic

Last updated Nov 4, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/load-balancing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connectors such as Cloudflare Tunnel and Cloudflare Mesh make a private network reachable, but they do not let you control how traffic is spread across servers and sites. To do that, put a [private load balancer](https://developers.cloudflare.com/load-balancing/private-network/) in front of your private services.

A private load balancer gets an IP address that users reach through Cloudflare One. When a user connects to that IP, Cloudflare picks a healthy endpoint (a private IP address and its [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/)) based on your [steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/), and sends the traffic to it through whichever connector routes that endpoint.

Cloudflare One Client or Cloudflare WAN site

Connects to `100.112.0.0`

[Private load balancer](https://developers.cloudflare.com/load-balancing/private-network/)

Picks a healthy endpoint based on your steering policy

[Health monitors](https://developers.cloudflare.com/load-balancing/monitors/) [Steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/) [Session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#private-load-balancers)

- Pool 1 [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
  - `10.0.0.1`vnet-a
- Pool 2 [Cloudflare Mesh node](https://developers.cloudflare.com/mesh/)
  - `10.1.0.1`default
- Pool 3 [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)
  - `10.2.0.1`default

*Endpoint = IP address + virtual network*

## When to use a private load balancer

| You want to | Use |
| --- | --- |
| Keep a single tunnel or Mesh node online if one host fails | Connector redundancy: [`cloudflared` replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) or [Mesh high availability](https://developers.cloudflare.com/mesh/features/high-availability/) |
| Spread traffic across several servers, or fail over between data centers | A private load balancer |
| Monitor the health of each server, not only the connector | A private load balancer with [health monitors](https://developers.cloudflare.com/load-balancing/monitors/) |
| Keep each user on the same server | A private load balancer with [hash steering or session affinity](#keep-users-on-the-same-endpoint) |

Connector redundancy and load balancing work together. A typical setup has one tunnel or Mesh node per site, with replicas for redundancy, and one load balancer pool per site.

## Supported connectors

Private load balancers accept traffic from the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/), and other on-ramps. They can send traffic to endpoints behind any of these connectors:

- **Cloudflare Tunnel**: Add the private IPs from your tunnel's [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/) as endpoints, with the tunnel's virtual network. Refer to [Set up Private Network Load Balancing with Client-to-Tunnel](https://developers.cloudflare.com/load-balancing/private-network/warp-to-tunnel/).
- **Cloudflare Mesh**: Add private IPs from a Mesh node's [CIDR routes](https://developers.cloudflare.com/mesh/features/routes/), or a node's Mesh IP, as endpoints, with the virtual network that contains the node's route. Routes use the default virtual network unless you assign them to another one. The setup is the same as for [Client-to-Tunnel](https://developers.cloudflare.com/load-balancing/private-network/warp-to-tunnel/), with Mesh routes in place of tunnel routes.
- **Cloudflare WAN**: Add private IPs reachable through your GRE, IPsec, or CNI connections, with your default virtual network. Refer to [Set up Private Network Load Balancing with Cloudflare WAN](https://developers.cloudflare.com/load-balancing/private-network/cloudflare-wan/).

### Overlapping IP addresses

An endpoint is identified by its IP address and virtual network. For Cloudflare Tunnel and Cloudflare Mesh endpoints, Cloudflare sends the traffic through the route that covers that IP address in that virtual network.

Cloudflare Tunnel and Cloudflare Mesh share the same [routing table](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/). Within a virtual network, a CIDR can be assigned to only one tunnel or Mesh node, so you cannot add the same CIDR to both a tunnel and a Mesh node. For redundancy on the same route, run [`cloudflared` replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) or [Mesh replicas](https://developers.cloudflare.com/mesh/features/high-availability/) instead of separate connectors.

To reach the same IP address at several sites through Cloudflare Tunnel or Cloudflare Mesh, assign each site's route to its own [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/), and put each site's endpoints in a separate pool.

Cloudflare WAN uses a separate routing table whose routes are not tied to a virtual network, so a WAN route can cover the same CIDR as a tunnel or Mesh route. A WAN prefix can also have several next hops, with different priorities or as equal-cost routes, so a WAN site can have redundant tunnels on the same prefix. For details, refer to [Traffic steering](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/).

### Combine connectors

You can mix connectors in the same load balancer, with one pool per site or connector. For example, use a site connected with Cloudflare WAN as the primary pool, and a site connected with a Mesh node as the [failover](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#off---failover) pool.

## Keep users on the same endpoint

To send each user to the same endpoint, set the pool's endpoint steering to [**Hash**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/hash-origin-steering/#private-load-balancers), or set [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#private-load-balancers) to `ip_cookie` with the API. Both key on the Cloudflare One Client device, or on the source IP for other on-ramps.

This pins the endpoint, not the connector replica. For applications that tie a session to the source IP, refer to [Source IP seen by your application](#source-ip-seen-by-your-application).

## Source IP seen by your application

Some applications, such as firewall or appliance admin interfaces, end a session when the client's source IP changes. What the application sees depends on the connector:

- **Cloudflare Tunnel**: `cloudflared` opens the connection to your application, so the application sees the IP of the host running `cloudflared`. Cloudflare sends traffic to the [replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) closest to the Cloudflare data center handling the request, so with several replicas the same user can arrive from different host IPs.
- **Cloudflare Mesh**: Only one replica of a Mesh node is active at a time, so traffic arrives through a single host until a failover moves it to the new active replica. For how return traffic reaches the node, refer to [Return traffic routing](https://developers.cloudflare.com/mesh/features/routes/#return-traffic-routing).

If your application needs a stable source IP behind Cloudflare Tunnel, use a single tunnel replica per endpoint, put a proxy in front of the application, or connect that site with a Mesh node instead.

## Limitations

- Endpoints must be IP addresses. [Private hostname routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) and Mesh [hostname routes](https://developers.cloudflare.com/mesh/features/routes/#hostname-routes) cannot be used as load balancer endpoints.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/load-balancing/#page","headline":"Load balance private network traffic","description":"Distribute and fail over private network traffic across servers and sites connected with Cloudflare Tunnel, Cloudflare Mesh, or Cloudflare WAN.","url":"https://developers.cloudflare.com/cloudflare-one/networks/load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/load-balancing/og.png?v=2c4b4692de8ea329","dateModified":"2026-11-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
