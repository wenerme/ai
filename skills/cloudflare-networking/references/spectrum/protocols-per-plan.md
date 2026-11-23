---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Supported protocols for Spectrum applications by Cloudflare plan.
title: Protocols per plan
image: https://developers.cloudflare.com/spectrum/protocols-per-plan/og.png?v=f6640606cf542957
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt
> Use this file to discover all available pages before exploring further.

# Protocols per plan

On this table, you have information about which protocols are available per plan.

|  | Free | Pro | Business | Enterprise |
| --- | --- | --- | --- | --- |
| Availability | No | Paid add-on | Paid add-on | Yes |
| TCP (IP or DNS origin) | No | No | No | Paid add-on |
| TCP (Worker origin, beta) | No | One app per zone | One app per zone | Paid add-on |
| UDP | No | No | No | Paid add-on |
| HTTP | No | No | No | Paid add-on |
| HTTPS | No | No | No | Paid add-on |
| Minecraft (one app allowed) | No | Yes | Yes | Yes |
| SSH (one app allowed) | No | Yes | Yes | Yes |
| RDP (one app allowed) | No | No | Yes | Yes |

For [Worker origins](https://developers.cloudflare.com/spectrum/how-to/route-tcp-traffic-to-a-worker/), each application uses a single TCP port. Pro and Business zones without Spectrum Enterprise can create one Worker-origin application in addition to their existing plan-supported applications. Port ranges are not supported.

The Enterprise column requires Spectrum Enterprise access, which is separate from a zone's Enterprise plan. [TLS termination](https://developers.cloudflare.com/spectrum/reference/settings-by-plan/) requires Spectrum Enterprise. Applications on Pro and Business subscriptions without Spectrum Enterprise pass TCP traffic through without terminating TLS.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/spectrum/protocols-per-plan/#page","headline":"Protocols per plan","description":"Supported protocols for Spectrum applications by Cloudflare plan.","url":"https://developers.cloudflare.com/spectrum/protocols-per-plan/","inLanguage":"en","image":"https://developers.cloudflare.com/spectrum/protocols-per-plan/og.png?v=f6640606cf542957","dateModified":"2026-11-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
