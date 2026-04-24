---
title: sFlow configuration
description: A step-by-step configuration guide for exporting sFlow data to Cloudflare's network.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network-flow/routers/sflow-config.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# sFlow configuration

Configure your router to export sFlow data to Cloudflare's network for analysis in Network Flow (formerly Magic Network Monitoring). sFlow is a network monitoring protocol that samples network traffic to provide visibility into your network's performance and traffic patterns.

## Before you begin

Before configuring sFlow, verify the following:

* Your router supports sFlow export capabilities. Refer to [Supported routers](https://developers.cloudflare.com/network-flow/routers/supported-routers/) for a list of compatible routers.
* You have administrative access to your router's configuration interface.
* You have [registered your router with Cloudflare](https://developers.cloudflare.com/network-flow/get-started/#2-register-your-router-with-cloudflare) and noted the default sampling rate you configured during registration.

## 1\. Access your router configuration

Log in to your router's configuration application or command-line interface. The exact method varies by router vendor and model.

## 2\. Configure sFlow exporter

Locate your router's sFlow configuration menu and set up the sFlow exporter with the following values:

* **Destination IP address**: `162.159.65.1`
* **Destination Port**: `6343`
* **Transport Protocol**: `UDP`

These settings direct your router to send sFlow data to Cloudflare's network for analysis.

## 3\. Configure sampling rate

Set your router's sampling rate to match the value you entered when registering your router with Cloudflare. The sampling rate determines how frequently your router samples network traffic to generate sFlow data.

Refer to [Recommended sampling rate](https://developers.cloudflare.com/network-flow/routers/recommended-sampling-rate/) for guidance on selecting an appropriate sampling rate based on your network's traffic volume.

## 4\. Save and apply configuration

Save your sFlow configuration changes and apply them to your router. Depending on your router model, you may need to restart the sFlow service or reload the configuration for changes to take effect.

## Verify your configuration

After configuring sFlow, verify that data is being sent to Cloudflare:

1. Wait five to ten minutes for sFlow data to be transmitted and processed.
2. Check your router status in the Cloudflare dashboard under **Network flow** \> **Configure Network flow** \> **Check routers** (visible during onboarding) or view analytics in the **Network flow** page.
3. If data is not appearing, verify your sFlow exporter settings and confirm your router's public IP address matches the IP registered with Cloudflare.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/routers/","name":"Routers"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/routers/sflow-config/","name":"sFlow configuration"}}]}
```
