---
description: Secure Internet traffic and SaaS apps.
title: Configure the device agent
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure the device agent

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare One Client (known as the Cloudflare One Agent in mobile app stores) encrypts designated traffic from a user's device to Cloudflare's global network. In this learning path, we will first define all of your parameters and deployment rules, and then we will install and connect the client. If you prefer to start the client download now, refer to [Download the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

Note

The following steps are identical to [Configure the device agent](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/) in the Replace your VPN implementation guide. If you have already completed Replace your VPN, you can skip ahead to [Determine when to use PAC files](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/pac-files/).

## Objectives

By the end of this module, you will be able to:

* Define which users can connect devices to your Zero Trust instance.
* Configure global and device-specific settings for the Cloudflare One Client.
* Route user traffic through Cloudflare Gateway.
* Route domains to a private DNS server, if required.

Troubleshoot the Cloudflare One Client

For step-by-step guidance on diagnosing and resolving Cloudflare One Client issues, refer to the [Cloudflare One Client troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/). The guide covers:

* How to collect diagnostic logs via the Cloudflare dashboard or CLI
* How to review key configuration files
* Common misconfigurations and their fixes
* Best practices for filing support tickets

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/#page","headline":"Configure the device agent · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
