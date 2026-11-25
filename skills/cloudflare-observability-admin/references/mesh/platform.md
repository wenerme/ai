---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Review Cloudflare Mesh availability and platform requirements.
title: Platform
image: https://developers.cloudflare.com/mesh/platform/og.png?v=e51b50ef2cf8138c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/mesh/llms.txt
> Use this file to discover all available pages before exploring further.

# Platform

Cloudflare Mesh is available in beta to Cloudflare One accounts, including accounts on the Free plan.

## Platform requirements

- Mesh nodes require a [supported Linux distribution](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux) or the [`cloudflare/mesh` container image](https://developers.cloudflare.com/mesh/guides/run-mesh-in-containers/).
- Client devices can use any [operating system supported by the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).
- Mesh nodes must use the MASQUE device tunnel protocol. Hostname routes, IPv6 CIDR routes, and high availability do not work with WireGuard.
- Using Cloudflare Mesh with Cloudflare WAN requires [Unified Routing mode](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing).

## Host sizing

We recommend a host with at least 4 virtual CPUs (vCPUs) and 4 GB of RAM for each Mesh node. On this host, a Mesh node typically carries 350 to 750 Mbps. A device that runs the Cloudflare One Client typically carries the same range.

Use these figures for planning. They are not guarantees, because your traffic and network path also affect throughput.

A host with fewer resources delivers less throughput. At this time, a host with more resources does not raise throughput above this range. For sustained throughput above 1 Gbps at a site, use [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/).

To compare throughput across connectors, refer to [Connector selection](https://developers.cloudflare.com/cloudflare-one/networks/connectors/choose-a-connector/#throughput).

For deployment recommendations and interoperability constraints, refer to [Best practices](https://developers.cloudflare.com/mesh/best-practices/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/mesh/platform/#page","headline":"Platform","description":"Review Cloudflare Mesh availability and platform requirements.","url":"https://developers.cloudflare.com/mesh/platform/","inLanguage":"en","image":"https://developers.cloudflare.com/mesh/platform/og.png?v=e51b50ef2cf8138c","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
