---
title: On-ramps
description: Reference information for On-ramps in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# On-ramps

To on-ramp your network traffic to Cloudflare WAN (formerly Magic WAN), you can use [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/), a lightweight software package you can install in corporate network locations to automatically connect, steer, and shape any IP traffic.

You can also use any device that supports [GRE or IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/) tunnels with the supported configuration parameters.

Additional compatible on-ramps include:

* [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect/): Connect your network infrastructure directly with Cloudflare - rather than using the public Internet - for a more reliable and secure experience.
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/): Cloudflare WAN can be used together with Cloudflare Tunnel for easy access between your networks and applications.
* [WARP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/): Protect corporate devices by securely and privately sending traffic from those devices to Cloudflare's global network, where Cloudflare Gateway can apply advanced web filtering.
* [Network on-ramp partnerships](https://www.cloudflare.com/network-onramp-partners/): Refer to our [third-party integration tutorials](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/) for guidance on configuring the most asked for third-party products.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/on-ramps/","name":"On-ramps"}}]}
```
