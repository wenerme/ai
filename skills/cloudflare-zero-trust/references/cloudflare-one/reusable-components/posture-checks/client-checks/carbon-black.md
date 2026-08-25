---
description: Carbon Black in Zero Trust.
title: Carbon Black
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Carbon Black

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One can check if [Carbon Black ↗](https://www.carbonblack.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

* Carbon Black agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Configure the Carbon Black check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Carbon Black**.
4. You will be prompted for the following information:

  1. **Name**: Enter a unique name for this device posture check.
  2. **Operating system**: Select your operating system. You will need to configure one posture check per operating system (macOS and Windows currently supported).
  3. **Application Path**: Enter the full path to the Carbon Black process to be checked (for example, `c:\program files\CarbonBlack\CarbonBlack.exe`).
  4. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from Carbon Black and is the recommended way to validate the process.
  5. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to Carbon Black, as this will change between versions.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the Carbon Black check is returning the expected results.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/#page","headline":"Carbon Black · Cloudflare One docs","description":"Carbon Black in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
```
