---
description: Prepare hostnames for load balancer setup.
title: Hostname preparation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Hostname preparation

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/load-balancing/setup/hostname-preparation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Before setting up anything related to your load balancer, make sure you test that production hostnames meet the following criteria:

* Based on the [priority order](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#priority-order) of DNS records, they will receive the intended amount of traffic.
* Each hostname is covered by an [SSL/TLS certificate](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#ssltls-coverage).

After confirming each of these conditions are met, you can proceed with setting up your load balancer.

## Routing strategy

Depending on your preferences and infrastructure, you might route traffic to your load balancer in different ways:

* For most customers, it's simpler to create the load balancer on the hostname directly (`www.example.com`).
* However, you could also create the load balancer on another hostname (`lb.example.com`) and then route traffic using a `CNAME` record on `test.example.com` that points to `lb.example.com`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/hostname-preparation/#page","headline":"Hostname preparation · Cloudflare Learning Paths","description":"Prepare hostnames for load balancer setup.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/hostname-preparation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
