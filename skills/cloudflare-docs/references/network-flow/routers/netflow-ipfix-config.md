---
title: Netflow/IPFIX configuration
description: A step-by-step configuration guide for exporting NetFlow or IPFIX data to Cloudflare's network.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Netflow/IPFIX configuration

Configure your router to export flow data to Cloudflare's network for analysis in Network Flow (formerly Magic Network Monitoring). Network Flow supports the NetFlow v5, NetFlow v9, and IPFIX formats.

## Before you begin

Before configuring NetFlow or IPFIX, verify the following:

* Your router supports NetFlow or IPFIX export capabilities. Refer to [Supported routers](https://developers.cloudflare.com/network-flow/routers/supported-routers/) for a list of compatible routers.
* You have administrative access to your router's configuration interface.
* You have [registered your router with Cloudflare](https://developers.cloudflare.com/network-flow/get-started/#2-register-your-router-with-cloudflare).

## 1\. Access your router configuration

Log in to your router's configuration application or command-line interface. The exact method varies by router vendor and model.

## 2\. Configure Flow Exporter

Open your router's NetFlow configuration menu and set up the **Flow Exporter** with the following values:

* **Destination IP address**: `162.159.65.1`
* **Destination Port**: `2055`
* **Transport Protocol**: `UDP`

These settings direct your router to send flow data to Cloudflare's network for analysis.

## 3\. Configure Flow Record

Set up your router's **Flow Record** configuration with the following fields. These fields define what traffic metadata your router collects and exports.

Match fields identify the traffic:

* `match ipv4 protocol`
* `match ipv4 source address`
* `match ipv4 destination address`
* `match transport source-port`
* `match transport destination-port`
* `match interface input`

Collect fields capture statistics about the traffic:

* `collect transport tcp flag`
* `collect counter packets long`
* `collect counter bytes long`
* `collect flow sampler`
* `collect timestamp sys-uptime first`
* `collect timestamp sys-uptime last`

## 4\. Save and apply configuration

Save your NetFlow or IPFIX configuration changes and apply them to your router. Verify that your router's NetFlow template does not contain duplicated fields, as duplicates can cause export errors.

## 5\. Verify your configuration

After configuring NetFlow or IPFIX, verify that data is being sent to Cloudflare:

1. Wait five to ten minutes for flow data to be transmitted and processed.
2. Check your router status in the Cloudflare dashboard under **Network flow** \> **Configure Network flow** \> **Check routers** (visible during onboarding) or view analytics in the **Network flow** page.
3. If data is not appearing, verify your Flow Exporter settings and confirm your router's public IP address matches the IP registered with Cloudflare.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/routers/","name":"Routers"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/routers/netflow-ipfix-config/","name":"Netflow/IPFIX configuration"}}]}
```
