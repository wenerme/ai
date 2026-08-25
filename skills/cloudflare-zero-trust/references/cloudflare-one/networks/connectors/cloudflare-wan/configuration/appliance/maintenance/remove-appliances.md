---
description: Remove connectors in Zero Trust networking.
title: Remove connectors
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove connectors

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/remove-appliances/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When adding or removing Cloudflare One Appliances (formerly Magic WAN Connectors), you need to be aware of the difference between the physical device and its profile.

* The physical device is the hardware at your site.
* The profile contains the configuration that allows the device to connect to Cloudflare, including your WANs, LANs, traffic steering, and LAN policies.

You can have more than one Cloudflare One Appliance in one profile if you initially enabled high availability during the configuration of the profile. If you did not enable high availability, you need to delete the profile associated with a site before adding a new Cloudflare One Appliance.

## Remove a profile

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
3. Find the profile that you want to edit > select the three dots next to it > **Delete**.

## Remove a physical device

To remove a Cloudflare One Appliance from your account:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Appliances**.
3. Find the Cloudflare One Appliance that you want to delete > select the three dots next to it > **Delete**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/remove-appliances/#page","headline":"Remove connectors · Cloudflare One docs","description":"Remove connectors in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/remove-appliances/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
