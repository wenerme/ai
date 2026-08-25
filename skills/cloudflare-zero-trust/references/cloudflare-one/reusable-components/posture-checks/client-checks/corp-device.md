---
description: Device serial numbers in Zero Trust.
title: Device serial numbers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Device serial numbers

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One allows you to build Zero Trust rules based on device serial numbers. You can create these rules so that access to applications is granted only to users connecting from company devices.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Create a list of serial numbers

To create rules based on device serial numbers, you first need to create a [Gateway List](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of numbers.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Create manual list** or **Upload CSV**. For larger teams, we recommend uploading a CSV or using Cloudflare's [API endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/).
3. Give your list a descriptive name, as this name will appear when configuring your policies.
4. Set **List Type** to _Serial numbers_.
5. Enter the serial numbers of the devices your team manages, or upload your CSV file.
6. Select **Save**.

You can now create an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) or a Gateway [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/#enforce-device-posture) that checks if the device presents a serial number on your list. In Access, the serial number check will appear as a _Device Posture - Serial Number List_ selector. In Gateway, your serial number list will appear in the **Value** dropdown when you choose the [Passed Device Posture Check](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#device-posture) selector.

## Validate the serial number

You can use the following commands to check the serial number of your device. The results can help you validate if the posture check is working as expected.

### macOS

1. Open a terminal window.
2. Use the `system_profiler` command to check for the value of `SPHardwareDataType` and retrieve the serial number.
```sh
system_profiler SPHardwareDataType | grep 'Serial Number'
```

### Windows

1. Open a PowerShell window.
2. Use the `Get-CimInstance` command to get the SerialNumber property of the `Win32_BIOS` class.
```powershell
Get-CimInstance Win32_BIOS
```

### Linux

1. Open a Terminal Window
2. Use the `dmidecode` command to get the version property `system-serial-number`.
```sh
sudo dmidecode -s system-serial-number
```

### iOS, Android and ChromeOS

Serial number checks are not supported on mobile devices. You can identify mobile devices by a [unique client ID](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid) instead of by serial number.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/#page","headline":"Device serial numbers · Cloudflare One docs","description":"Device serial numbers in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
```
