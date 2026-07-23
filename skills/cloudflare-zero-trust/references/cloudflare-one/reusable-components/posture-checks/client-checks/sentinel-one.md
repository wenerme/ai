---
description: SentinelOne in Zero Trust.
title: SentinelOne
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# SentinelOne

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/sentinel-one/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One can check if [SentinelOne ↗](https://www.sentinelone.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

* SentinelOne agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Configure the SentinelOne check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **SentinelOne**.
4. You will be prompted for the following information:

  1. **Name**: Enter a unique name for this device posture check.
  2. **Operating system**: Select your operating system. You will need to configure one posture check per operating system.
  3. **Application Path**: Enter the full path to the SentinelOne process to be checked (for example, `C:\Program Files\SentinelOne\Sentinel Agent 21.7.4.1043\SentinelAgent.exe`).
  Note
  The path of the SentinelOne process may change between updates. Make sure to edit **Application Path** to match the new path, or use `%PATH%` variables.
  4. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from SentinelOne and is the recommended way to validate the process.
  5. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to SentinelOne, as this will change between versions.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the SentinelOne check is returning the expected results.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/sentinel-one/#page","headline":"SentinelOne - Cloudflare One Client checks · Cloudflare One docs","description":"SentinelOne in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/sentinel-one/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture","SentinelOne"]}
```
