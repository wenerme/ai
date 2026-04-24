---
title: Cloudflare traffic not being sent to the geographically closest data center
description: Understand anycast routing to non-local data centers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

# Cloudflare traffic not being sent to the geographically closest data center

Due to the way routing on [Cloudflare's Anycast network ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) works, requests may be sent to data center locations that are not necessarily the closest geographically. We are continuously adding capacity to our global network and enhancing our automated traffic engineering systems to intelligently manage congestion and other network events. While we always strive to provide the best possible performance by serving traffic from the closest location, our top priority is reliability.

In instances where performance and reliability are in conflict, our systems are designed to prioritize a stable connection over a local one.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/troubleshooting/general-troubleshooting/","name":"General Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/","name":"Cloudflare traffic not being sent to the geographically closest data center"}}]}
```
