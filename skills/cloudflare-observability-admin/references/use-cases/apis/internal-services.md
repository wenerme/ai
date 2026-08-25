---
description: Expose internal APIs and microservices securely without opening inbound firewall ports.
title: Connect your internal network services
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect your internal network services

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/use-cases/apis/internal-services/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Internal services and microservices often need to communicate without exposing endpoints to the public Internet. Cloudflare Tunnel creates outbound-only connections with no inbound firewall rules, while Access enforces Zero Trust policies for every request between services.

## Solutions

### Cloudflare Tunnel

Connect infrastructure to Cloudflare without opening inbound firewall ports. [Learn more about Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

* **No public exposure** \- Internal Application Programming Interfaces (APIs) remain private; Tunnel establishes an outbound-only connection with no inbound firewall rules needed

### Access

Zero Trust access control for applications and infrastructure. [Learn more about Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

* **Zero Trust policies** \- Verify identity and enforce per-service policies for every request between services
* **Centralized policy management** \- Manage access rules for all internal services from a single control plane

### Service Tokens

Non-interactive credentials for machine-to-machine authentication. [Learn more about Service Tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).

* **Service-to-service auth** \- Authenticate internal services with non-interactive credentials managed in Cloudflare One

## Get started

1. [Create a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/)
2. [Cloudflare Access get started](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)
3. [Create service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/apis/internal-services/#page","headline":"Connect your internal network services · Cloudflare use cases","description":"Expose internal APIs and microservices securely without opening inbound firewall ports.","url":"https://developers.cloudflare.com/use-cases/apis/internal-services/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
