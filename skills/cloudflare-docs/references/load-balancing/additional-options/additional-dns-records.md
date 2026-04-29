---
title: Additional DNS records
description: Use additional DNS records with load balancers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Additional DNS records

In addition to load balancing between DNS records used for IP resolution — `A`, `AAAA`, and `CNAME` records — Enterprise customers can also load balance between **MX** and **SRV** records.

## MX records

To load balance between multiple mail servers:

1. Make sure you have the [required DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/#send-and-receive-email) for your mail servers.
2. [Create a monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/) with a **Type** of _SMTP_.
3. [Create a pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/) with your mail servers and attach the newly created monitor.
4. [Create a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) that includes your newly created pools. Since it will forward SMTP traffic, the load balancer should be [unproxied (DNS-only)](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing).

## SRV records

To load balance between different **SRV** records, which contain significantly more information than many other DNS records:

1. [Create your SRV records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records).
2. [Create a monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/) with a **Type** of _UDP-ICMP_ or _TCP_.
3. [Create a pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/) with your various SRV records and attach the newly created monitor.
4. [Create a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) that includes your newly created pools. This load balancer should be [unproxied (DNS-only)](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/#dns-only-load-balancing).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/additional-options/","name":"Additional configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/additional-options/additional-dns-records/","name":"Additional DNS records"}}]}
```
