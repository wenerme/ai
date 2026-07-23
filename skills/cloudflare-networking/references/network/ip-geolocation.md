---
description: Add visitor country information via the CF-IPCountry header.
title: IP geolocation
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network/llms.txt
> Use this file to discover all available pages before exploring further.

# IP geolocation

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network/ip-geolocation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

IP geolocation adds the [CF-IPCountry header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry) to all requests to your origin server.

Cloudflare automatically updates its IP geolocation database multiple times per week.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | Yes  | Yes | Yes      | Yes        |

## Add IP geolocation information

The recommended procedure to enable IP geolocation information is to [enable the **Add visitor location headers** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-visitor-location-headers). This Managed Transform adds HTTP request headers with location information for the visitor's IP address, such as city, country, continent, longitude, and latitude.

If you only want the request header for the visitor's country, you can enable **IP Geolocation**.

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network/ip-geolocation/#page","headline":"IP geolocation · Cloudflare Network settings docs","description":"Add visitor country information via the CF-IPCountry header.","url":"https://developers.cloudflare.com/network/ip-geolocation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
```
