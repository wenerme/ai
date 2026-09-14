---
description: Zone plan and account subscription values available to Cloudflare Tenant partners.
title: Available subscriptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt
> Use this file to discover all available pages before exploring further.

# Available subscriptions

Last updated Apr 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/tenant/reference/subscriptions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When [provisioning services for an account](https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/), you need to include certain values with each API call to specify a particular service.

The subscriptions available to you will vary depending on your current partner program ([Agency Partner Program ↗](https://www.cloudflare.com/cloudflare-partners-self-serve-program-closed-beta/) or [Enterprise Resellers and MSP Program ↗](https://portal.cloudflarepartners.com)).

The following values are samples and not exhaustive. For the complete list of subscription values available to you, make an API call to the [zone subscriptions](https://developers.cloudflare.com/api/resources/zones/subresources/rate_plans/methods/get/) or [account subscriptions](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get/) endpoints.

## Zone plans

When creating or updating a [zone plan](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/get/), Partners can use one of the following values for the `id` of the `rate_plan` field (which controls the zone-level plan subscription).

| Partner program | Available subscriptions |
| --- | --- |
| Enterprise and self-serve resellers | `PARTNERS_FREE`, `PARTNERS_PRO`, `PARTNERS_BIZ`, `PARTNERS_ENT` |
| Agency partners | `CF_FREE`, `CF_PRO_20_20`, `CF_BIZ` |
| MSP partners | `msp_biz` |

## Other subscriptions

When you [create an account subscription](https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/#account-subscriptions), it provisions an add-on service for that account.

### Zero Trust subscriptions

The following table lists sample values for various Zero Trust subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Access](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) | `PARTNERS_ACCESS_BASIC`, `PARTNERS_ACCESS_ENT`, `PARTNERS_ACCESS_PREMIUM`, `TEAMS_ACCESS_ENT`, `TEAMS_ACCESS` |
| [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) | `TEAMS_GATEWAY_ENT`, `TEAMS_GATEWAY` |
| [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/) | `TEAMS_ENT`, `TEAMS_FREE`, `TEAMS_STANDARD` |

### Developer subscriptions

The following table lists sample values for various Developer platform subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Images](https://developers.cloudflare.com/images/) | `IMAGES_ENT`,`IMAGES_BASIC` |
| [Image transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/) | `IMAGE_RESIZING_ENT`, `IMAGE_RESIZING_BASIC` |
| [Stream](https://developers.cloudflare.com/stream/) | `PARTNERS_STREAM_ENT`, `PARTNERS_STREAM_BASIC`, `STREAM_BASIC` |
| [Workers](https://developers.cloudflare.com/workers) | `PARTNERS_WORKERS_ENT`, `WORKERS_PAID`, `PARTNERS_WORKERS_SS`, `PARTNERS_WORKERS_BASIC` |

### Application performance and security

The following table lists sample values for various application performance and security subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [API Shield](https://developers.cloudflare.com/api-shield/) | `API_SHIELD_ZONE` |
| [Advanced certificate manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) | `ADVANCED_CERT_MANAGER_FREE`, `ADVANCED_CERT_MANAGER` |
| [Argo smart routing](https://developers.cloudflare.com/argo-smart-routing/) | `PARTNERS_ZONE_ARGO`, `ARGO_ZONE_BASIC` |
| [Ethereum gateway](https://developers.cloudflare.com/web3/ethereum-gateway/) | `WEB3_ETHEREUM_ENT`, `WEB3_ETHEREUM_ENT_CONTRACT`, `WEB3_ETHEREUM_ENT_PAYGO` |
| [IPFS gateway](https://developers.cloudflare.com/web3/ipfs-gateway/) | `WEB3_IPFS_ENT`, `WEB3_IPFS_ENT_CONTRACT`, `WEB3_IPFS_ENT_PAYGO` |
| [Load balancing](https://developers.cloudflare.com/load-balancing/) | `PARTNERS_LOAD_BALANCING`, `PARTNERS_LOAD_BALANCING_ENT`, `LOAD_BALANCING_BASIC_PLUS` |
| [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/) | `PARTNERS_RATE_LIMITING` |
| [Spectrum](https://developers.cloudflare.com/spectrum/) | `PARTNERS_SPECTRUM` |
| [Waiting Room](https://developers.cloudflare.com/waiting-room/) | `WAITING_ROOMS_BASIC`, `WAITING_ROOMS_ADV` |

### Network services

The following table lists sample values for various network services subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) | `MAGIC_FIREWALL_BASIC`, `MAGIC_FIREWALL_ADVANCED` |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) | `MAGIC_WAN` |

## Getting new subscriptions

If your reseller plan does not have access to a specific subscription, you will receive the following error when making an API call:

```json
"errors": [
        {
            "code": 1225,
            "message": "Your account does not have access to this product. Contact billing@cloudflare.com for assistance."
        }
]
```

To change your program or - in some cases - get a specific subscription added to your reseller plan, contact `partners@cloudflare.com`. Agency Partners should contact [agency@cloudflare.com](mailto:agency@cloudflare.com)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tenant/reference/subscriptions/#page","headline":"Available subscriptions · Cloudflare Tenant docs","description":"Zone plan and account subscription values available to Cloudflare Tenant partners.","url":"https://developers.cloudflare.com/tenant/reference/subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
