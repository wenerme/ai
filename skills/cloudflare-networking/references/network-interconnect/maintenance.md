---
description: Understand how Cloudflare coordinates maintenance across resilient CNI deployments.
title: Maintenance
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-interconnect/llms.txt
> Use this file to discover all available pages before exploring further.

# Maintenance

Last updated Sep 11, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network-interconnect/maintenance/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Planned maintenance

Routine CNI-disruptive maintenance is planned work that can interrupt traffic on an affected CNI connection. Cloudflare coordinates this work across resilient Cloudflare Network Interconnect (CNI) deployments, including across CNI locations.

### Timing and scheduling

For Dataplane v2 connectivity in multi-homed PoPs only:

* **Routine maintenance**: Minimum one week notice.
* **Emergency maintenance**: Best-effort notice, which may be less than one week.
* Routine maintenance on redundant devices at the same location will occur on different days.
* Routine maintenance is not rescheduled to accommodate customer schedule preferences.

| CNI deployment                                                                                                   | During routine CNI-disruptive maintenance |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| One CNI connection at one location                                                                               | The connection can be interrupted.        |
| Two CNI connections on separate devices at one location                                                          | One connection remains in service.        |
| Four CNI connections across two coordinated locations, with two connections on separate devices at each location | Three connections remain in service.      |

## Emergency and non-routine maintenance

Non-routine maintenance, such as maintenance that affects an entire PoP, can affect all CNI connections at the affected location. For the four-connection deployment with two connections at each of two locations, a full-PoP non-routine event at one location can interrupt two connections, leaving two in service. Cloudflare avoids performing non-routine maintenance at multiple coordinated locations at the same time.

Cloudflare coordinates emergency maintenance across locations where feasible.

## Receive maintenance notifications

To configure circuit-specific or point-of-presence (PoP) maintenance notifications, refer to [Monitoring and alerts](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-interconnect/maintenance/#page","headline":"Maintenance · Cloudflare Network Interconnect docs","description":"Understand how Cloudflare coordinates maintenance across resilient CNI deployments.","url":"https://developers.cloudflare.com/network-interconnect/maintenance/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
