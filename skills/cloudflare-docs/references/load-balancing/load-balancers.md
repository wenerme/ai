---
title: Load balancers
description: A load balancer distributes traffic among pools according to pool health and traffic steering policies. Each load balancer is identified by its DNS hostname (lb.example.com, dev.example.com, etc.) or IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/load-balancers/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Load balancers

A load balancer distributes traffic among pools according to [pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/) and [traffic steering policies](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/). Each load balancer is identified by its DNS hostname (`lb.example.com`, `dev.example.com`, etc.) or IP address.

Note

For an overview of how the Cloudflare Load Balancing solution works, refer to [Load Balancing components](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/). For more background information on what load balancers are, refer to the Cloudflare [Learning Center ↗](https://www.cloudflare.com/learning/performance/what-is-load-balancing/).

---

## Common configurations

For suggestions, refer to [Common load balancer configurations](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/).

## Public vs. Private Load Balancers

Public Load Balancers are designed to handle traffic from the public Internet. When deployed, they automatically receive a hostname, making them immediately accessible. These load balancers can direct traffic to a range of destinations, including public hostnames, public IP addresses, and private IP addresses.

Private Load Balancers, in contrast, are meant for internal use within private networks. They do not automatically receive a hostname, but one can be assigned via Gateway Firewall Policies or through an internal DNS system. Private Load Balancers only accept traffic over a private network on-ramp, such as [the Cloudflare One Client](https://developers.cloudflare.com/warp-client/) or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/). They are capable of forwarding traffic exclusively to private IP addresses.

## Load balancing and existing DNS records

For details about DNS records, refer to [DNS records for load balancing](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/).

## HTTP keep-alive (persistent HTTP connection)

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its edge network to the site's origin.

Ensure HTTP Keep-Alive connections are enabled on your origin. Cloudflare reuses open TCP connections for up to 15 minutes (900 seconds) after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP Keep-Alive helps avoid premature reset of connections for requests proxied by Cloudflare.

### Session cookies

**When using HTTP cookies to track and bind user sessions to a specific server**, configure [Session Affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) to parse HTTP requests by cookie header. Doing so directs each request to the correct application server even when HTTP requests share the same TCP connection due to keep-alive.

**For example, F5 BIG-IP load balancers set a session cookie at the beginning of a TCP connection** (if none exists) and then ignore all cookies from subsequent HTTP requests on the same TCP connection. This tends to break session affinity because Cloudflare sends multiple HTTP sessions on the same TCP connection. Configuring the load balancer to parse HTTP requests by cookie headers avoids this issue.

---

## Create load balancers

For step-by-step guidance, refer to [Create a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/).

---

## Properties

For an up-to-date list of load balancer properties, refer to [Load balancer properties](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/get/) in the Cloudflare API documentation.

---

## API commands

The Cloudflare API supports the following commands for load balancers.

| Command                                                                                                            | Method | Endpoint                             |
| ------------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------ |
| [Create Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/create/)           | POST   | /zones/:zone\_id/load\_balancers     |
| [Delete Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/delete/)           | DELETE | /zones/:zone\_id/load\_balancers/:id |
| [List Load Balancers](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/list/)              | GET    | /zones/:zone\_id/load\_balancers     |
| [Load Balancer Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/get/)             | GET    | /zones/:zone\_id/load\_balancers/:id |
| [Overwrite specific properties](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/edit/)    | PATCH  | /zones/:zone\_id/load\_balancers/:id |
| [Overwrite entire Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/update/) | PUT    | /zones/:zone\_id/load\_balancers/:id |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/load-balancers/","name":"Load balancers"}}]}
```
