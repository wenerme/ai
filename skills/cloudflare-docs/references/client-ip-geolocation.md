---
title: Overview
description: Cloudflare designed Cloudflare WARP and 1.1.1.1 to make Internet browsing more private and secure. These applications encrypt last-mile connections and make it more difficult for others to use client IP addresses in user fingerprinting.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-ip-geolocation/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Overview

Note

Client IP Geolocation is currently in closed Beta testing.

Cloudflare designed [Cloudflare WARP](https://developers.cloudflare.com/warp-client/) and [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/) to make Internet browsing more private and secure. These applications encrypt last-mile connections and make it more difficult for others to use client IP addresses in user fingerprinting.

However, unlike legacy VPN applications, we never designed WARP or 1.1.1.1 to hide user locations or allow users to misrepresent their true geographic location. As a web property operator, you can use **Client IP Geolocation** to map Cloudflare egress IP addresses to specific geolocations.

[ Get started ](https://developers.cloudflare.com/client-ip-geolocation/get-started/) [ Learn more ](https://developers.cloudflare.com/client-ip-geolocation/about/) 

Note

Client IP Geolocation is different from the [Cloudflare IP Geolocation setting](https://developers.cloudflare.com/network/ip-geolocation/), which helps you capture country codes for visitors.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-ip-geolocation/","name":"Cloudflare Client IP Geolocation"}}]}
```
