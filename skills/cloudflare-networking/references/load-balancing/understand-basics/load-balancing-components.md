---
description: Load balancers, pools, monitors, and how they work together.
title: Load Balancing components
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Load Balancing components

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/#page","headline":"Load Balancing components · Cloudflare Load Balancing docs","description":"Load balancers, pools, monitors, and how they work together.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
