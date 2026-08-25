---
description: Use additional DNS records with load balancers.
title: Additional DNS records
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Additional DNS records

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/#page","headline":"Load balance additional DNS records · Cloudflare Load Balancing docs","description":"Use additional DNS records with load balancers.","url":"https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
