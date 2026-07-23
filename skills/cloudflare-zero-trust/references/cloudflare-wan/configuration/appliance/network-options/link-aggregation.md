---
description: Bundle physical LAN ports into a single logical interface for redundancy and bandwidth.
title: Configure link aggregation groups
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure link aggregation groups

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/link-aggregation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can bundle multiple physical LAN ports on a Cloudflare One Appliance into a single logical port called a Link Aggregation Group (LAG). This increases LAN bandwidth and provides redundancy. If a member port fails, traffic automatically shifts to the remaining ports in under one second.

Note

Your appliance must be running OS version 2026.2.0 or later. This version deploys automatically.

The following guide assumes you have already created a site and configured your Cloudflare One Appliance. For instructions, refer to [Configure hardware Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-hardware-appliance/) or [Configure virtual Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-virtual-appliance/).

## Create a LAG

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to configure > **Edit**.
3. Go to the **Appliances** tab.
4. In **Link aggregation groups (LAGs)**, select **Create A LAG**.
5. Select the LAN ports you want to bundle. You can add up to six ports per LAG. All ports must be the same type and speed.
6. Select **Save**.

## Assign a LAN to a LAG

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to edit > **Edit**.
3. Go to **Network Configuration** \> **LAN configuration**.
4. Select or create a LAN > **Edit**.
5. In **Interface** \> **Interface type**, select **Aggregate** as your LAG instead of a single port.
6. Select **Save**.

## Monitor LAG status

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance > **Edit**.
3. Go to the **Appliances** tab.

The page displays each configured LAG and the status of its member ports.

## Delete a LAG

1. Go to the **Connectors** page.
[Go to **Connectors** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance > **Edit**.
3. Go to the **Appliances** tab.
4. Next to the LAG you want to delete, select the three-dot menu > **Delete**.
5. Select **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/link-aggregation/#page","headline":"Configure link aggregation groups · Cloudflare WAN docs","description":"Bundle physical LAN ports into a single logical interface for redundancy and bandwidth.","url":"https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/link-aggregation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
