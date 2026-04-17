---
title: Get started
description: Enable Smart Shield and configure origin protection features for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/smart-shield/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Smart Shield is available to all customers as an opt-in configuration.

## Before you begin

* You should have a Cloudflare account and [onboard your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* Also make sure the relevant DNS records are set to [proxied](https://developers.cloudflare.com/dns/proxy-status/).

## Steps

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Speed** \> **Smart Shield**.
3. (Optional) Explore the different [available packages](#packages-and-availability).
4. Select **Get started for free** or choose a different package and select **Continue** to proceed to the guided onboarding flow.

Access analytics and get insights through the [Observatory](https://developers.cloudflare.com/speed/observatory/) dashboard.

## Packages and availability

### Smart Shield

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/) and [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/).
* Pro, Business, and Enterprise customers also have access to [Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/).

### Smart Shield + Argo

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/), [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/), and [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/).
* Pro, Business, and Enterprise customers also have access to [Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/).

### Smart Shield Advanced

* Includes [Smart Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/smart-tiered-cache/), [Connection Reuse](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/), [Argo Smart Routing](https://developers.cloudflare.com/smart-shield/configuration/argo/), and additional caching customization with [Regional Tiered Cache](https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/) and [Cache Reserve](https://developers.cloudflare.com/smart-shield/configuration/cache-reserve/).
* Pro, Business, and Enterprise customers also have access to [Health Checks](https://developers.cloudflare.com/smart-shield/configuration/health-checks/).

Dedicated CDN Egress IPs

Enterprise customers also have the option to configure [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/), allowing you to increase origin security by only allowing traffic from a small list of IP addresses. If you are interested, reach out to your account team.

Dedicated CDN Egress IPs will be available for other plans in the future.

## Further reading

* [ Network diagram ](https://developers.cloudflare.com/smart-shield/concepts/network-diagram/)
* [ Connection reuse ](https://developers.cloudflare.com/smart-shield/concepts/connection-reuse/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/get-started/","name":"Get started"}}]}
```
