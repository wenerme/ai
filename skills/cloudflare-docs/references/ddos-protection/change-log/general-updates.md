---
title: General updates
description: General updates and improvements to Cloudflare DDoS protection.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/change-log/general-updates.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# General updates

[ Subscribe to RSS ](https://developers.cloudflare.com/ddos-protection/change-log/general-updates/index.xml)

## 2024-06-03

**DDoS alerts now available for EU CMB customers**

[DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/) are now available for EU Customer Metadata Boundary (CMB) customers. This includes all DDoS alert type (Standard and Advanced) for both HTTP DDoS attacks and L3/4 DDoS attacks.

## 2024-04-17

**Network Analytics now supported for EU CMB customers**

The Network Analytics dashboard is available to customers that have opted in to the EU [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) solution. This also includes Network Analytics Logs (Logpush) and GraphQL API.

API users can ensure they are routed properly by directing their API requests at `eu.api.cloudflare.com`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/general-updates/","name":"General updates"}}]}
```
