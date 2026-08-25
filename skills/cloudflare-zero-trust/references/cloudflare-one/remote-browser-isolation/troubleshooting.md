---
description: Resolve common issues with Cloudflare Browser Isolation, including session limits, rendering errors, and WebGL support.
title: Troubleshoot Browser Isolation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshoot Browser Isolation

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review common troubleshooting scenarios for Cloudflare Browser Isolation.

## Connectivity and sessions

### No Browsers Available

If you encounter a `No Browsers Available` alert, please file feedback via the Cloudflare One Client. This error typically indicates a temporary capacity issue in the data center or a connectivity problem between your client and the remote browser.

### Maximum Sessions Reached

This alert appears if your device attempts to establish more than two concurrent remote browser instances. A browser isolation session is shared across all tabs and windows within the same browser (for example, all Chrome tabs share one session). You can use two different browsers (such as Chrome and Firefox) concurrently, but opening a third will trigger this alert. To release a session, close all tabs and windows in one of your local browsers.

## Rendering and performance

### WebGL Rendering Error

Cloudflare Browser Isolation uses Network Vector Rendering (NVR), which does not support WebGL (Web Graphics Library) in all environments. If a website requires WebGL and your device lacks the necessary hardware resources in the virtualized environment, you may see a rendering error.

To resolve this, try enabling software rasterization in your browser:

1. Go to `chrome://flags/#override-software-rendering-list`.
2. Set **Override software rendering list** to _Enabled_.
3. Select **Relaunch**.

### Blank screen on Windows

On Windows devices, Clientless Web Isolation may load with a blank screen if there is a conflict between browser mDNS settings and Windows IGMP configuration.

| IGMPLevel    | WebRTC Anonymization | Result         |
| ------------ | -------------------- | -------------- |
| 0 (disabled) | Enabled / Default    | ❌ Blank screen |
| 0 (disabled) | Disabled             | ✅ Works        |
| 2 (enabled)  | Enabled / Default    | ✅ Works        |

To fix this, either disable **Anonymize local IPs exposed by WebRTC** in your browser flags or ensure `IGMPLevel` is enabled (set to `2`) in your Windows network settings.

### Rendering issues (CSS/Images)

If a website displays incorrectly (for example, broken CSS or missing images), it may indicate that the remote browser is unable to fetch specific resources from the origin server. Check your [Gateway HTTP logs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshooting/) for any blocked subresources that might be required by the page.

---

## How to contact Support

If you cannot resolve the issue, [open a support case](https://developers.cloudflare.com/support/contacting-cloudflare-support/). For RBI issues, it is helpful to provide the [Ray ID](https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/) from any error page and a description of the browser you are using.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/#page","headline":"Troubleshoot Browser Isolation · Cloudflare One docs","description":"Resolve common issues with Cloudflare Browser Isolation, including session limits, rendering errors, and WebGL support.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
```
