---
title: Get started
description: Enable Smart Shield and configure origin protection features for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Smart Shield reduces the load on your origin server and improves content delivery by consolidating requests through Cloudflare's caching infrastructure. It is available to all customers as an opt-in configuration.

## Before you begin

* You must have a Cloudflare account and [onboard your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* Verify that DNS records for the domain you want to protect are set to [proxied](https://developers.cloudflare.com/dns/proxy-status/). Smart Shield operates within Cloudflare's reverse proxy, so traffic from DNS-only records is not routed through it.

## Steps

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Speed** \> **Smart Shield**.
3. (Optional) Explore the different [available packages](#packages-and-availability).
4. Select **Get started for free** or choose a different package and select **Continue** to proceed to the guided onboarding flow.

After setup, you can monitor origin performance and cache effectiveness through the [Observatory](https://developers.cloudflare.com/speed/observatory/) dashboard.

## Packages and availability

Pro, Business, and Enterprise customers have access to [Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/) for monitoring origin availability across all packages.

### Smart Shield

The base package for reducing origin load through caching and connection optimization.

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/) and [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/).

### Smart Shield + Argo

Adds network path optimization on top of the base package. Use when visitors are geographically distant from the origin server.

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/), [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/), and [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/).

### Smart Shield Advanced

The full package with additional caching customization through regional and persistent storage options.

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/), [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/), [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/), [Regional Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/), and [Cache Reserve](https://developers.cloudflare.com/smart-shield/configuration/cache-reserve/).

Dedicated CDN Egress IPs

Enterprise customers also have the option to configure [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/), allowing you to increase origin security by only allowing traffic from a small list of IP addresses. If you are interested, reach out to your account team.

## Further reading

* [ Network diagram ](https://developers.cloudflare.com/smart-shield/concepts/network-diagram/)
* [ Connection reuse ](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/get-started/","name":"Get started"}}]}
```
