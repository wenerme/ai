---
description: Best practices for managing dynamic IP prefix advertisement.
title: Best practices
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt
> Use this file to discover all available pages before exploring further.

#  Best practices

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Prerequisites

To prevent issues and simplify the advertisement process during an attack scenario, complete the following tasks.

* Assign appropriate user roles. Ensure that users assigned to manage the status of IP prefix advertisement have the **Administrator** or **Super Administrator** role in your Cloudflare account. For more information, refer to [Setting up Multi-user accounts on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-members/).
* Get a list of the prefix IDs that you want to manage. Maintain a list of Cloudflare prefix IDs to simplify dynamic advertisement management and operations. You can [obtain prefix IDs](#obtain-prefix-ids) via the Cloudflare dashboard or use the [list prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list/) operation in the Cloudflare API. Refer to these prefix IDs when managing prefix advertisement.

## Enable prefix advertisement

You can avoid latency and the possibility of dropped routes by enabling prefix advertisement from Cloudflare before you withdraw the advertisement from your data center.

1. Refer to [configure dynamic advertisement](#configure-dynamic-advertisement). This operation requires your account ID, prefix IDs, and API key.
2. Verify the advertisement using a looking glass of your choice, such as [Hurricane Electric Internet Services ↗](https://lg.he.net/). Use the Cloudflare ASN (`13335`) to track the advertisement route.
3. Remove the prefix advertisement that originates from your data center.

Note

If you do not remove the advertisement from your data center, some of your traffic may not route through Cloudflare for protection, depending on which routes your ISP prefers.

If you want to continue advertising from your data center while using [Magic Transit](https://developers.cloudflare.com/magic-transit/), one option is to advertise a less specific route and have Cloudflare advertise more specific routes.

Enablement takes approximately five to seven minutes.

## Disable or withdraw prefix advertisement

1. Add the prefix advertisement to your data center.
2. (Optional) Verify the advertisement using a looking glass of your choice, such as [Hurricane Electric Internet Services ↗](https://lg.he.net/).
3. Refer to [configure dynamic advertisement](#configure-dynamic-advertisement). This operation requires your account ID, prefix IDs, and API key.

Disablement takes approximately 15 minutes.

## Configure dynamic advertisement

### Via the Cloudflare dashboard

1. Log in to your [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** \> **BYOIP Prefixes**.
3. Select **Edit** at the end of the entry.
4. From **Edit IP Prefixes**, select **Advertised** or **Withdrawn** under **Status**.
5. Select **Save** to commit your changes.

After saving your changes, it takes between two to seven minutes to enable advertisement and approximately 15 minutes to disable or withdraw advertisement.

### Via the API

To configure prefix advertisement with the Cloudflare API, use the [IP Address Management and Dynamic Advertisement](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/advertisement%5Fstatus/methods/edit/) API.

Most dynamic advertisement operations require that you supply the Cloudflare ID for any prefix you want to access with the Cloudflare API. The following section outlines how to obtain prefix IDs.

## Obtain prefix IDs

1. Log in to your [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** \> **BYOIP Prefixes**.
3. Find the CIDR for which you want the prefix ID, and select the arrow next to it.
4. Under **Prefix ID**, select **Copy** to add the value to your clipboard.

To obtain prefix IDs using the API, refer to the [list prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/methods/list/) operation in the Cloudflare API.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/#page","headline":"Best practices for dynamic advertisement · Cloudflare BYOIP docs","description":"Best practices for managing dynamic IP prefix advertisement.","url":"https://developers.cloudflare.com/byoip/concepts/dynamic-advertisement/best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
