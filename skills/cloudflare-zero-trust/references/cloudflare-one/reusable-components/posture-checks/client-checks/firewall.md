---
description: Firewall in Zero Trust.
title: Firewall
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Firewall

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Firewall device posture attribute ensures that a firewall is running on a device.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Enable the firewall check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Firewall**.
4. Enter a descriptive name for the check.
5. Select your operating system.
6. Configure **Enable firewall check** based on your desired security policy:

  * **Enabled**: (Recommended) The posture check passes only if the firewall is running.
  * **Disabled**: The posture check passes only if the firewall is turned off.
Note
The **Enable firewall check** toggle does not turn the posture check on or off; rather, the toggle determines whether the Cloudflare One Client looks for an active or inactive firewall.
7. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the firewall check is returning the expected results.

## Validate firewall status

Operating systems determine firewall configuration in various ways. Follow the steps below to understand how the Cloudflare One Client determines if the firewall is enabled.

### On macOS

macOS has two firewalls: an application-based firewall and a port-based firewall. The Cloudflare One Client will report a firewall is enabled if either firewall is running.

#### Application-based firewall

1. Open **System Settings** and go to **Network**.
2. Verify that **Firewall** is `Active`.

#### Port-based firewall

1. Open Terminal and run:
```sh
sudo /sbin/pfctl -s info
```
2. Verify that **Status** is `Enabled`.

### On Windows

1. Open PowerShell and run:
```powershell
Get-NetFirewallProfile -PolicyStore ActiveStore -Name Public
```
2. Verify that **Enabled** is `True`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/#page","headline":"Firewall · Cloudflare One docs","description":"Firewall in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
```
