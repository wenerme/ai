---
description: Heartbeat in Zero Trust networking.
title: Heartbeat
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Heartbeat

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/heartbeat/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare One Appliance (formerly Magic WAN Connector) communicates periodically with Cloudflare via HTTPS. This is also known as a heartbeat, and lets Cloudflare know that the Cloudflare One Appliance in question is connected to the Internet and reachable.

The heartbeat calls are made to `api.cloudflare.com`. Each Cloudflare One Appliance has a heartbeat frequency of 10 seconds, independently of the number of WAN interfaces you have running on your device.

There are three symbols for the heartbeat signal that allow you to quickly check the status of Cloudflare One Appliance:

* **Blue `i`**: Cloudflare One Appliance is contacting Cloudflare as expected.
* **Yellow triangle**: Cloudflare One Appliance has not yet connected to Cloudflare.
* **Red triangle**: There is a potential problem with Cloudflare One Appliance.

### Access Cloudflare One Appliance's heartbeat

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Appliances**.
3. Find your Cloudflare One Appliance, and place your cursor over the icon on the **Status** column to check the timestamp. The timestamp displays the last time Cloudflare One Appliance successfully contacted Cloudflare.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/heartbeat/#page","headline":"Heartbeat · Cloudflare One docs","description":"Heartbeat in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/maintenance/heartbeat/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
