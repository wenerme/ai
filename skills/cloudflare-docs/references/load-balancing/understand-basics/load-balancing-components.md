---
title: Load Balancing components
description: Load balancers, pools, monitors, and how they work together.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Load Balancing components

This page provides a simplified overview of the three main components of the Cloudflare Load Balancing solution and how they relate to one another.

## Load balancers

For a hostname (`blog.example.com`) to resolve, the Domain Name System (DNS) must return an IP address, where the website or application is hosted (origin).

When you set up a public load balancer, Cloudflare automatically creates an [LB DNS record](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/) for the specified hostname. This means that, according to a [priority order](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#priority-order), instead of simply returning an IP address, the logic you introduced using the Cloudflare Load Balancing solution will be considered.

Note that you can use the root domain as a Load Balancer hostname. When doing so, make sure you enter the hostname without including the auto-generated dot that typically precedes your zone's name.

Note

Private load balancers are not automatically associated with a hostname. Private load balancers are created with either a CGNAT IP address or a custom RFC-1918 IP address.

    flowchart LR
      accTitle: Load balancing flow
      accDescr: Load balancing involves a load balancer, pools, endpoints, monitors, and health monitors.
      B[Request 1] --> A
      C[Request 2] --> A
      D[Request 3] --> A
      A[Load balancer] -- Request 1 --> P1
      A -- Request 2 --> P2
      A -- Request 3 --> P3
      subgraph P1 [Pool 1]
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end
      subgraph P2 [Pool 2]
      Endpoint3((Endpoint 3))
      Endpoint4((Endpoint 4))
      end
      subgraph P3 [Pool 3]
      Endpoint5((Endpoint 5))
      Endpoint6((Endpoint 6))
      end

## Pools

Within Cloudflare, pools represent your endpoints and how they are organized. As such, a pool can be a group of several endpoints, or you could also have only one endpoint per pool — it depends on what best suits your use case.

For example, if you are only using Cloudflare to globally distribute traffic across regions ([global traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/)), each pool could represent one region and, within each region, you could have one endpoint that represents the entry point to your data center.

Cloudflare [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) solution and [endpoint steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/) capabilities enable you to also load balance traffic between your servers within a data center. In this use case, each pool would represent a data center and contain several endpoints that represent your servers.

Smart Tiered Cache interaction

While Smart Tiered Cache selects one Upper Tier per origin, when using Load Balancing, Smart Tiered Cache will select the single best Upper Tier for the entire Load Balancing Pool.

## Endpoints

Endpoints refer to any service or hardware that intercepts and processes incoming public or private traffic.

Examples of endpoints include origins, hostnames, private or public IP addresses, virtual IP addresses (VIPs), servers, and other dedicated hardware boxes.

## Monitors

Finally, monitors are the component you can use to guarantee only [healthy pools](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/) are considered for traffic distribution.

When you configure a monitor and attach it to endpoints, the monitor will issue health monitor requests to your endpoints at regular intervals. This process makes it possible for your load balancer to intelligently handle traffic, considering which endpoints are actually available.

    flowchart RL
      accTitle: Load balancing monitor flow
      accDescr: Monitors issue health monitor requests, which validate the current status of servers within each pool.
      Monitor -- Health Monitor ----> Endpoint2
      Endpoint2 -- Response ----> Monitor
      subgraph Pool
      Endpoint1((Endpoint 1))
      Endpoint2((Endpoint 2))
      end

Note

Health monitors associated with load balancers are different from [**Standalone health checks**](https://developers.cloudflare.com/health-checks/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/load-balancing-components/","name":"Load Balancing components"}}]}
```
