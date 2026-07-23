---
description: Overview of Tiered policies in Gateway.
title: Tiered policies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Tiered policies

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Only available on Enterprise plans.

Gateway tiered policies allow you to share and enforce Gateway policies across multiple Zero Trust accounts. This enables centralized policy management for organizations that manage multiple accounts.

There are two approaches for setting up tiered policies, depending on your deployment model and policy requirements:

* **[Cloudflare Organizations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/organizations/)** — Share DNS, network, HTTP, and resolver policies across accounts in a Cloudflare Organization using the dashboard.
* **[Tenant API](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/tenant-api/)** — Manage DNS policies across parent and child accounts for Managed Service Provider (MSP) deployments.

## Organizations vs. Tenant API

| Feature                    | [Cloudflare Organizations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/organizations/) | [Tenant API](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/tenant-api/) |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Supported policy types** | DNS, Network, HTTP, Resolver                                                                                                 | DNS only                                                                                                    |
| **Account model**          | Source / Recipient accounts                                                                                                  | Parent / Child accounts                                                                                     |
| **Shareable settings**     | Block pages, extended email matching                                                                                         | Block pages                                                                                                 |
| **Setup**                  | Dashboard (self-serve)                                                                                                       | API-only                                                                                                    |
| **Availability**           | Enterprise (beta)                                                                                                            | Enterprise (GA)                                                                                             |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/#page","headline":"Tiered policies · Cloudflare One docs","description":"Overview of Tiered policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
