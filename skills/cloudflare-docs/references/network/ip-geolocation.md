---
title: IP geolocation
description: IP geolocation adds the CF-IPCountry header to all requests to your origin server.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Geolocation ](https://developers.cloudflare.com/search/?tags=Geolocation) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network/ip-geolocation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# IP geolocation

IP geolocation adds the [CF-IPCountry header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry) to all requests to your origin server.

Cloudflare automatically updates its IP geolocation database multiple times per week.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Add IP geolocation information

The recommended procedure to enable IP geolocation information is to [enable the **Add visitor location headers** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-visitor-location-headers). This Managed Transform adds HTTP request headers with location information for the visitor's IP address, such as city, country, continent, longitude, and latitude.

If you only want the request header for the visitor's country, you can enable **IP Geolocation**.

* [ Dashboard ](#tab-panel-5393)
* [ API ](#tab-panel-5394)

To enable **IP Geolocation** in the dashboard:

1. Log in to your [Cloudflare account ↗](https://dash.cloudflare.com) and go to a specific domain.
2. Go to **Network**.
3. For **IP Geolocation**, switch the toggle to **On**.

To enable **IP Geolocation** with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ip_geolocation` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Note

In order to use this data, you will need to then retrieve it from the [CF-IPCountry header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry).

---

## Report an incorrect IP location

If you find an IP address with a location that you believe is incorrect, fill in the [data correction form ↗](https://www.cloudflare.com/lp/ip-corrections/) with the relevant IP address range(s) along with the correct information as applicable (country, state/province, city name, and ZIP code).

If the data is confirmed, Cloudflare will make the necessary changes, which should be reflected within 48 hours.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network/","name":"Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/network/ip-geolocation/","name":"IP geolocation"}}]}
```
