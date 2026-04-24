---
title: On-ramps
description: Connect to Cloudflare WAN using tunnels, Appliances, or CNI.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/on-ramps.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# On-ramps

To on-ramp your network traffic to Cloudflare WAN (formerly Magic WAN), you can use [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/), a lightweight software package you can install in corporate network locations to automatically connect, steer, and shape any IP traffic.

You can also use any device that supports [GRE or IPsec](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/) tunnels with the supported configuration parameters.

Additional compatible on-ramps include:

* [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/cloudflare-wan/network-interconnect/): Connect your network infrastructure directly with Cloudflare - rather than using the public Internet - for a more reliable and secure experience.
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-tunnel/): Cloudflare WAN can be used together with Cloudflare Tunnel for easy access between your networks and applications.
* [WARP](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-one-client/): Protect corporate devices by securely and privately sending traffic from those devices to Cloudflare's global network, where Cloudflare Gateway can apply advanced web filtering.
* [Multi-Cloud Networking](https://developers.cloudflare.com/cloudflare-wan/configuration/multi-cloud-networking/): Automatically create on-ramps from your cloud networks to Cloudflare WAN.
* [Network on-ramp partnerships](https://www.cloudflare.com/network-onramp-partners/): Refer to our [third-party integration tutorials](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/) for guidance on configuring the most asked for third-party products.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/on-ramps/","name":"On-ramps"}}]}
```
