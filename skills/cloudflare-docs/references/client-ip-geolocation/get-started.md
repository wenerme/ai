---
title: Get started
description: There are several things you can do to best handle traffic from Cloudflare VPN and forward-proxy users:
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-ip-geolocation/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Note

Client IP Geolocation is currently in closed Beta testing.

There are several things you can do to best handle traffic from Cloudflare VPN and forward-proxy users:

* **Origin operators**:  
   * Do not block IP addresses associated with our VPN and proxy products (see the [About section](https://developers.cloudflare.com/client-ip-geolocation/about/) for more details)  
   * To get even more accurate geolocation data, ensure your origin is [reachable via IPv6](https://developers.cloudflare.com/client-ip-geolocation/faq/)
* **Geolocation data providers**:  
   * Regularly pull updated geolocation data from the [Cloudflare API ↗](https://api.cloudflare.com/local-ip-ranges.csv)
* **Users of WARP and 1.1.1.1**:  
   * Review the [FAQs](https://developers.cloudflare.com/client-ip-geolocation/faq/#cloudflare-vpn-users) and [About section](https://developers.cloudflare.com/client-ip-geolocation/about/) to learn exactly how, how much, and why we share geolocation data

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-ip-geolocation/","name":"Cloudflare Client IP Geolocation"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-ip-geolocation/get-started/","name":"Get started"}}]}
```
