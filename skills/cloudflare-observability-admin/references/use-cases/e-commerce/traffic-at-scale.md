---
description: Handle flash sales and traffic spikes for e-commerce stores with load balancing, visitor queuing, and smart routing.
title: Handle traffic at scale
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Handle traffic at scale

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/e-commerce/traffic-at-scale/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Flash sales, seasonal peaks, and viral moments can overwhelm your origin infrastructure. Cloudflare Load Balancing distributes traffic across multiple origins with automatic failover, Waiting Room queues excess visitors to prevent overload, and Argo Smart Routing reduces latency between edge and origin.

## Solutions

### Load balancing

Distribute traffic across origins with health checks and automatic failover. [Learn more about Load balancing](https://developers.cloudflare.com/load-balancing/).

* **Origin protection** \- Distribute traffic across origin servers and queue excess visitors to prevent overload during peak events
* **Automatic failover** \- Health checks detect unhealthy origins and reroute traffic automatically

### Waiting Room

Manage visitor queuing during traffic surges. [Learn more about Waiting Room](https://developers.cloudflare.com/waiting-room/).

* **Flash sale readiness** \- Queue visitors fairly during extreme demand, preserving a consistent experience without crashing the site

### Argo Smart Routing

Route traffic through the fastest paths across Cloudflare's network. [Learn more about Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/).

* **Reduced latency** \- Route requests through the fastest available network paths between edge and origin

## Get started

1. [Set up Load Balancing](https://developers.cloudflare.com/load-balancing/get-started/)
2. [Configure Waiting Room](https://developers.cloudflare.com/waiting-room/get-started/)
3. [Create Health Checks](https://developers.cloudflare.com/health-checks/get-started/)

## See also

Cloudflare Smart Shield acts as an intermediate caching layer between Cloudflare's content delivery network and your origin server, consolidating multiple requests from various locations into a single request. [Learn more about Smart Shield](https://developers.cloudflare.com/smart-shield/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/e-commerce/traffic-at-scale/#page","headline":"Handle traffic at scale · Cloudflare use cases","description":"Handle flash sales and traffic spikes for e-commerce stores with load balancing, visitor queuing, and smart routing.","url":"https://developers.cloudflare.com/use-cases/e-commerce/traffic-at-scale/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
