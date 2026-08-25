---
description: Cloudflare One Client checks resources and guides for Zero Trust.
title: Cloudflare One Client checks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare One Client checks

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

These device posture checks are performed by the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). To use this feature, you must [deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) to your devices and enable the desired posture checks.

## Supported Client modes

* Traffic and DNS mode
* Traffic only mode
* Posture only mode

## Supported operating systems

| Device posture check                                                                                                                        | macOS | Windows | Linux | iOS | Android/ChromeOS |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ----- | --- | ---------------- |
| [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/antivirus/)                   | ❌     | ✅       | ❌     | ❌   | ❌                |
| [Application check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/)   | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Carbon Black](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/)             | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Client certificate](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/) | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/)     | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Device UUID](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid/)               | ❌     | ❌       | ❌     | ✅   | ✅                |
| [Disk encryption](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/disk-encryption/)       | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Domain joined](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/)           | ❌     | ✅       | ❌     | ❌   | ❌                |
| [File check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/)                 | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Firewall](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/)                     | ✅     | ✅       | ❌     | ❌   | ❌                |
| [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/)                 | ✅     | ✅       | ✅     | ✅   | ✅                |
| [Require Gateway](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-gateway/)       | ✅     | ✅       | ✅     | ✅   | ✅                |
| [Require WARP](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-warp/)             | ✅     | ✅       | ✅     | ✅   | ✅                |
| [SentinelOne](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/sentinel-one/)              | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Tanium (legacy)](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/tanium/)                | ✅     | ✅       | ✅     | ❌   | ❌                |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/#page","headline":"Cloudflare One Client checks · Cloudflare One docs","description":"Cloudflare One Client checks resources and guides for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
