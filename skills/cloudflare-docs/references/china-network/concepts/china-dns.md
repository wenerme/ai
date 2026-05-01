---
title: China Authoritative DNS
description: Resolve DNS queries in Mainland China to improve Time to First Byte performance.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/china-network/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ DNS ](https://developers.cloudflare.com/search/?tags=DNS) 

# China Authoritative DNS

By default, Cloudflare China Network resolves each DNS request at the data center closest to the client. For clients outside of Mainland China, the closest global Cloudflare data center handles the request. For clients in Mainland China, a JD Cloud data center handles the request.

## In-China Nameserver

Cloudflare can deploy DNS service in Mainland China to improve Time to First Byte (TTFB) performance. With this option enabled, DNS queries resolve at data centers in Mainland China instead of at global DNS servers.

## When to use

Before you enable China Authoritative DNS, confirm that the majority (over 90%) of your traffic comes from Mainland China.

Warning

After you enable China Authoritative DNS, all DNS requests — including those from users outside of China — route to JD Cloud data centers in Mainland China instead of to the nearest global data center. This can increase latency for users outside of China.

## Comparison

The following table compares the default DNS offering with the In-China Nameserver option.

| DNS option   | Behavior                                      |
| ------------ | --------------------------------------------- |
| Default      | Uses the DNS server closest to the end user.  |
| In-China DNS | Uses only DNS in China, operated by JD Cloud. |

## General setup

After you [enable the Cloudflare China Network service](https://developers.cloudflare.com/china-network/get-started/), do the following:

1. Contact your Cloudflare sales team to enable the feature. Currently you cannot enable it in the Cloudflare dashboard.  
The current China Network supports both a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) and a [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
2. Update your domain registrar with the assigned in-China nameservers.  
   * For a full setup: These nameservers are displayed in the Cloudflare dashboard.  
   * For a partial setup: Create a `CNAME` record pointing to `<hostname>.cdn.cloudflareanycast.net` for global default DNS setting and `<hostname>.cdn.cloudflarecn.net` for In-China DNS.  
Example 1: China Network zone named `example.cn` that requires In-China DNS  
If you have two DNS records, `www` and `media`, pointing to two different origin servers, your Authoritative DNS server will have the following DNS records:  
   * CNAME `www.example.cn` to `www.example.cn.cdn.cloudflarecn.net`  
   * CNAME `media.example.cn` to `media.example.cn.cdn.cloudflarecn.net`  
Example 2: China Network zone named `example.com` that requires global default DNS setting  
If you have two DNS records, `www` and `media`, pointing to two different origin servers, your Authoritative DNS server will have the following DNS records:  
   * CNAME `www.example.com` to `www.example.com.cdn.cloudflareanycast.net`  
   * CNAME `media.example.com` to `media.example.com.cdn.cloudflareanycast.net`
3. Test your configuration by checking if the domain resolves correctly.

For further assistance, contact your account team.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/china-network/","name":"China Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/china-network/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/china-network/concepts/china-dns/","name":"China Authoritative DNS"}}]}
```
