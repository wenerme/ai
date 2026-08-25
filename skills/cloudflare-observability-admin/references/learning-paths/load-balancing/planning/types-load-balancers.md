---
description: Compare Layer 7, DNS-only, and Layer 4 balancing.
title: Types of load balancers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Types of load balancers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/load-balancing/planning/types-load-balancers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare, you can choose between three types of load balancers:

* [Layer 7 (HTTP/HTTPS)](#layer-7-load-balancing) (most common)
* [DNS-only](#dns-only-load-balancing)
* [Layer 4 (TCP)](#layer-4-load-balancing)

---

## Layer 7 load balancing

Layer 7 load balancers direct traffic to specific endpoints based on information present in each HTTP/HTTPS request (HTTP headers, URI, cookies, type of data, etc.).

When a client visits your application, Cloudflare directs their request to a healthy endpoint (determined by your [traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) and [endpoint weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights)).

Cloudflare performs layer 7 load balancing when traffic to your hostname is **proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with an orange cloud.

![DNS-only load balancers are marked with an orange cloud](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2402,height=434,format=webp/_astro/proxied-load-balancer.BMq3VCyA.png)

Caution

Note that if a [DNS-only (grey cloud)](https://developers.cloudflare.com/dns/proxy-status/) CNAME record points to a proxied load balancer, the IP returned for it would be endpoint IP and a HTTP request sent to it would not be proxied.

### Benefits

In comparison to DNS-only load balancing, layer 7 load balancing:

* Protects endpoints from DDoS attacks by hiding their IP addresses.
* Offers faster failover and more accurate routing, which can otherwise be affected by DNS caching.
* Integrates with other Cloudflare features such as caching, Workers, and the WAF.
* Reduces authoritative queries against Cloudflare, which can potentially save money for customers with usage-based billing.
* Supports customized [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) and [endpoint drain](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/#endpoint-drain).
* More accurately geo-locates traffic, using the data center associated with the user making the request instead of the data center associated with a user's recursive resolver.
* Supports private IP addresses with [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/).

---

## DNS-only load balancing

DNS-only load balancers route traffic by returning specific IP addresses in response to a client's DNS query.

When a client visits your application, Cloudflare provides the address for a healthy endpoint (determined by your [traffic steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) and [endpoint-level steering policy](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/)). However, Cloudflare relies on DNS resolvers respecting the short TTL to re-query Cloudflare's DNS for an updated list of healthy addresses. If a client has a cached DNS response, they will go to their previous destination, potentially ignoring your load balancer.

Cloudflare performs DNS-only load balancing when traffic to your hostname is **not proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with a gray cloud.

![DNS-only load balancers are marked with a gray cloud](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2402,height=434,format=webp/_astro/dns-only-load-balancer.DI9EgD6m.png)

Note

Note that if a load balancer endpoint is a [proxied (orange-cloud)](https://developers.cloudflare.com/dns/proxy-status/) CNAME record on Cloudflare, the IP returned for it would be Cloudflare's and a HTTP request sent to it would be proxied accordingly.

### Benefits

If your load balancer is attached to a hostname used for an [MX or SRV record](https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/) — and not an `A`, `AAAA`, or `CNAME` record — its proxy mode should be **DNS-only**.


### Limitations

In comparison to proxied, layer 7 load balancing, DNS-only load balancing:

* Does not hide the IP addresses of your endpoints, leaving them vulnerable to DDoS attacks.
* Performs slower failover and less accurate routing, because it has to rely on DNS resolvers and cache settings.
* Cannot integrate with other Cloudflare features such as caching, Workers, and the WAF.
* Increases authoritative queries against Cloudflare, which can potentially cost more for customers with usage-based billing.
* Does not support [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/). Alternatively, you can use [DNS persistence](https://developers.cloudflare.com/load-balancing/additional-options/dns-persistence/).
* Geo-locates traffic based on the data center associated with the ECS source address, if available. If not available, geo-locates based on a user's recursive resolver, which can sometimes cause issues with [latency-based steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/dynamic-steering/).
* Does not support [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/).

---

## Layer 4 load balancing

Layer 4 load balancers route traffic by forwarding traffic to certain ports or IP addresses.

Cloudflare currently only supports layer 4 load balancing as part of [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/about/load-balancer/).

Note

Since Spectrum operates at the TCP level, it does not have the information to support features like [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), [custom rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/), or caching.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/types-load-balancers/#page","headline":"Types of load balancers · Cloudflare Learning Paths","description":"Compare Layer 7, DNS-only, and Layer 4 balancing.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/planning/types-load-balancers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
