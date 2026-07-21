---
description: Lower Azure egress costs using Microsoft Routing Preference.
title: Reduce data transfer (egress costs) between Azure and Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

#  Reduce data transfer (egress costs) between Azure and Cloudflare

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/support/third-party-software/others/reduce-data-transfer-egress-costs-between-azure-and-cloudflare/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Overview

Cloudflare launched Bandwidth Alliance in 2018 – a group of forward-looking cloud and storage providers who have agreed to waive or steeply discount egress costs for mutual customers.

Cloudflare customers using Azure can lower their egress bills between Cloudflare and Azure via [Microsoft Routing Preference ↗](https://docs.microsoft.com/en-us/azure/virtual-network/routing-preference-overview).

---

## How to

To lower your data transfer costs from Azure and Cloudflare:

1. In the Azure portal, go to your storage account.
2. Navigate to **Network Routing > Firewalls and virtual networks**.
3. For **Routing preference**, choose **Internet routing**.
4. Publish route-specific endpoint to **Internet routing**.
5. Navigate to **Properties**.
6. Locate the endpoint values for **Internet Routing**.
7. Enter these endpoint values in your Cloudflare Dashboard.
![Example of where to enter endpoint URLs from Microsoft Azure into your Cloudflare dashboard.](https://developers.cloudflare.com/_astro/bandwidth-alliance.BYbPK3YS_Z1hQW7.webp)

For additional details, refer to [Configure network routing preference for Azure Storage ↗](https://docs.microsoft.com/en-us/azure/storage/common/configure-network-routing-preference?tabs=azure-portal) and [Microsoft Routing Preference ↗](https://docs.microsoft.com/en-us/azure/storage/common/network-routing-preference).

---

## Related resources

* [Microsoft Azure data transfer announcement ↗](https://blog.cloudflare.com/discounted-egress-for-cloudflare-customers-from-microsoft-azure-is-now-available/) (blog)
* [Bandwidth Alliance ↗](https://www.cloudflare.com/bandwidth-alliance/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/third-party-software/others/reduce-data-transfer-egress-costs-between-azure-and-cloudflare/#page","headline":"Reduce data transfer (egress costs) between Azure and Cloudflare · Cloudflare Support docs","description":"Lower Azure egress costs using Microsoft Routing Preference.","url":"https://developers.cloudflare.com/support/third-party-software/others/reduce-data-transfer-egress-costs-between-azure-and-cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
