---
title: Cloudflare traffic not being sent to the geographically closest data center
description: Understand anycast routing to non-local data centers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Cloudflare traffic not being sent to the geographically closest data center

Due to the way routing on [Cloudflare's Anycast network ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) works, requests may be sent to data center locations that are not necessarily the closest geographically. We are continuously adding capacity to our global network and enhancing our automated traffic engineering systems to intelligently manage congestion and other network events. While we always strive to provide the best possible performance by serving traffic from the closest location, our top priority is reliability.

In instances where performance and reliability are in conflict, our systems are designed to prioritize a stable connection over a local one.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/#page","headline":"Cloudflare traffic not being sent to the geographically closest data center · Cloudflare Support docs","description":"Understand anycast routing to non-local data centers.","url":"https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/general-troubleshooting/","name":"General Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/","name":"Cloudflare traffic not being sent to the geographically closest data center"}}]}
```
