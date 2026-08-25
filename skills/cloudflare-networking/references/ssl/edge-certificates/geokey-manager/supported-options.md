---
description: Learn which options are supported for Geo Key Manager.
title: Supported options
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported options

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Available regions

For customers with Geo Key Manager v2, you can use the `policy` parameter to specify following regions using the **Region code**:

| Region code | Region name           |
| ----------- | --------------------- |
| AFR         | Africa                |
| APAC        | Asia Pacific          |
| EEUR        | Eastern Europe        |
| ENAM        | Eastern North America |
| EU          | European Union        |
| ME          | Middle East           |
| OC          | Oceania               |
| SAM         | South America         |
| WEUR        | Western Europe        |
| WNAM        | Western North America |

---

## Available countries

For customers with Geo Key Manager v2, you can use the `policy` parameter to specify individual countries as well. Cloudflare is constantly expanding the number of supported countries. To indicate a country, specify the two-letter (ISO 3166) country code.

Examples of supported countries are Japan, Canada, India, and Australia.

---

## Highest security data centers

For customers with both Geo Key Manager v1 and v2, you can use the `geo_restrictions` parameter to only choose Cloudflare's highest security data centers.

The following aspects are unique to our highest security data centers, but the baseline security requirements for all data centers are also detailed in [our blog ↗](https://blog.cloudflare.com/introducing-cloudflare-geo-key-manager/).

### Pre-scheduled and biometric controlled facility access

Employees of Cloudflare permitted to access the facility must have previously scheduled a visit before access will be granted.

Access to the entrance of the facility is controlled through the use of a biometric hand reader combined with an assigned access code.

### Private cages with biometric readers

All equipment is in private cages with physical access controlled via biometrics and recorded in audit logs. Entrants have to pass through five separate readers before they can access the cage.

### Exterior security controls and monitoring

All points of ingress/egress are monitored by an intrusion detection system (IDS), with authorized users and access events archived for historical review.

### Interior security controls and monitoring

Interior points of ingress/egress are controlled by the access control subsystem, with entry routed through a mantrap. All areas are monitored and recorded with closed-circuit television, with data kept for a minimum of thirty days.

Exterior walls are airtight and may incorporate additional security measures such as reinforced concrete, Kevlar bullet board, vapor barriers, or bullet-proof front doors.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/#page","headline":"Supported options - Geo Key Manager · Cloudflare SSL/TLS docs","description":"Learn which options are supported for Geo Key Manager.","url":"https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation","Compliance"]}
```
