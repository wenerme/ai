---
description: Learn how to deploy the Cloudflare One Client using JumpCloud.
title: JumpCloud
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# JumpCloud

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/jumpcloud/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Windows

1. Log in to the [JumpCloud Admin Portal ↗](https://console.jumpcloud.com).
2. Go to **Device Management** \> **Software Management**.
3. Select the **Windows** tab, then select **(+)**.
![Configuring the Cloudflare One Client in the JumpCloud Windows tab](https://developers.cloudflare.com/_astro/jumpcloud.COKUk56X_1YQzSg.webp)
_Note: Labels in this image may reflect a previous product name._
4. In the **Software Name** field, enter a unique display name.
5. In the **Package ID** field, enter `warp`.
6. Select **Install this software**.
7. (Optional) Select **Keep software package up to date** to automatically update this app as updates become available.
8. (Optional) Select **Allow end users to delay updates for up to one week** to avoid updates during a busy time.
9. Select **save**.
10. Select the device(s) you want to deploy the app to:

  * **Single device**: Go to the **Devices** tab and select the target device.
  * **Device group**: Go to the **Device Groups** tab and select the target device group.
11. Select **save**.
12. Select **save** again.

Verify that the Cloudflare One Client was installed by selecting the app and viewing the **Status** tab.

After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

## macOS

1. Log in to the [JumpCloud Admin Portal ↗](https://console.jumpcloud.com).
2. Go to **Device Management** \> **Software Management**.
3. Select the **Apple** tab, then select **(+)**.
![Configuring the Cloudflare One Client in the JumpCloud Apple tab](https://developers.cloudflare.com/_astro/jumpcloud-mac.B_6biy3e_1gulpG.webp)
_Note: Labels in this image may reflect a previous product name._
4. In the **Software Description** field, enter a unique display name.
5. In the **Software Package URL**, enter the URL location of the `Cloudflare_WARP_<VERSION>.pkg` file. If you do not already have the installer package, [download it here](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#macos).
6. Select the device(s) you want to deploy the app to:

  * **Single device**: Go to the **Devices** tab and select the target device. To select all devices, select the checkbox next to **Type**.
  * **Device group**: Go to the **Device Groups** tab and select the target device group. To select all device groups, select the checkbox next to **Type**.
7. Select **save** to install the client.

Verify that the Cloudflare One Client was installed by selecting the app and viewing the **Status** tab.

After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/jumpcloud/#page","headline":"JumpCloud · Cloudflare One docs","description":"Learn how to deploy the Cloudflare One Client using JumpCloud.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/jumpcloud/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
