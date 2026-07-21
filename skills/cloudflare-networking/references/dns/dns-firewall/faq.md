---
description: Find answers to common questions about Cloudflare's DNS Firewall, including cache behavior, EDNS support, and setting PTR records.
title: DNS Firewall FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

#  DNS Firewall FAQ

Last updated Jul 10, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/dns/dns-firewall/faq/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Consider the answers for frequently asked questions about Cloudflare DNS Firewall.

## How does DNS Firewall choose a backend nameserver to query upstream?

DNS Firewall alternates between a customer's nameservers, using an algorithm that is more likely to send queries to the faster upstream nameservers than slower nameservers.

## How long does DNS Firewall cache a stale object?

DNS Firewall sets cache longevity according to allocated memory.

As long as there is enough allocated memory, Cloudflare does not clear items from the cache forcefully, even when the TTL expires. This feature allows Cloudflare to serve stale objects from cache if your nameservers are offline.

## Does the DNS Firewall cache SERVFAIL?

Yes. `SERVFAIL` is treated like any other negative answer for caching purposes. The default TTL is 30 seconds. You can set a different negative cache TTL on your cluster in the Cloudflare dashboard, or via the [API](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/methods/edit/) (`negative_cache_ttl` parameter).

## Does DNS Firewall support EDNS Client Subnet (ECS)?

Yes. Often, DNS providers want to see a client's IP via EDNS Client Subnet (ECS) ([RFC 7871 ↗](https://www.rfc-editor.org/rfc/rfc7871.html)) because they serve geographically specific DNS answers based on the client's IP. With EDNS Client Subnet enabled, the DNS Firewall will forward the client's IP subnet along with the DNS query to the upstream nameserver.

When EDNS is enabled, the DNS Firewall gives out the geographically correct answer in cache based on the client IP subnet. To do this, the DNS Firewall segments its cache. For example:

1. A resolver says it is looking for an answer for client `192.0.2.0/24`.
2. The DNS Firewall will proxy the request to the upstream nameserver for the answer.
3. The DNS Firewall will cache the answer from the upstream nameserver, but only for that `/24`.
4. `203.0.113.0/24` now asks the same DNS question and the answer is again returned from the upstream nameserver instead of the cache.

Note

EDNS limits the effectiveness of the DNS cache.

Some resolvers might not be sending any EDNS data. When you enable ECS fallback on your cluster in the Cloudflare dashboard — or set the `ecs_fallback` parameter to `true` via the [API](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/methods/edit/) — DNS Firewall will forward the IP subnet of the resolver instead, only if there is no EDNS data present in the incoming DNS query.

## Does DNS Firewall cache negative answers?

Yes. The default TTL is 30 seconds. You can configure the negative cache TTL on your cluster in the Cloudflare dashboard, or via the [API](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/methods/edit/) (`negative_cache_ttl` parameter). This will affect the TTL of responses with status `REFUSED`, `NXDOMAIN`, or `SERVFAIL`.

## How can I set PTR records for nameserver hostnames?

To set up PTR records for the DNS Firewall cluster IPs that point to your nameserver hostnames, use the following API endpoints:

* [Show DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/subresources/reverse%5Fdns/methods/get/)
* [Update DNS Firewall Cluster Reverse DNS](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/subresources/reverse%5Fdns/methods/edit/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dns-firewall/faq/#page","headline":"FAQs — DNS Firewall · Cloudflare DNS docs","description":"Find answers to common questions about Cloudflare's DNS Firewall, including cache behavior, EDNS support, and setting PTR records.","url":"https://developers.cloudflare.com/dns/dns-firewall/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
```
