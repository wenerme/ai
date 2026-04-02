---
title: Application-aware policies
description: Standard traffic policies match on network-layer attributes like IP addresses and port ranges. Application-aware policies go further — they identify traffic by the application generating it, so you can make routing and security decisions based on what the traffic is, not just where it is going.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/appliance/network-options/application-based-policies/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Application-aware policies

Standard traffic policies match on network-layer attributes like IP addresses and port ranges. Application-aware policies go further — they identify traffic by the application generating it, so you can make routing and security decisions based on what the traffic is, not just where it is going.

Cloudflare One Appliance (formerly Magic WAN Connector) classifies traffic using the same application categories used across Cloudflare's [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/). This means routing decisions on the Appliance and security policies in Gateway use the same application definitions.

For the full list of recognized applications and categories, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

With application-aware policies, you can:

* **Break out traffic directly to the Internet** — route specific applications directly to the Internet from the Appliance, bypassing Cloudflare's security filtering.
* **Prioritize traffic** — assign higher priority to specific applications so the Appliance processes them first when the network is congested.

For details, refer to the following pages:

* [ Breakout traffic ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/)
* [ Prioritized traffic ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/appliance/","name":"Configure with Appliance"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","name":"Application-aware policies"}}]}
```
