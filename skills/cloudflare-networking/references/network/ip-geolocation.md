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

Last updated Aug 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/network/ip-geolocation/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

IP geolocation adds the [CF-IPCountry header](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ipcountry) to all requests to your origin server.

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

## Accuracy and limitations

IP geolocation is an estimate, not an exact science. There is nothing that inherently binds an IP address to a physical location or country. Because IP addresses rotate and ownership can change, the data is dynamic and may shift over time.

Caution

For use cases where location must be highly precise or compliance-critical, such as state-based access restrictions, do not use IP geolocation as the sole signal. Combine it with device GPS or other first-party signals, with appropriate user consent and compliance with applicable privacy laws.

Here is what you can expect regarding data accuracy and updates:

* **Update frequency**: Cloudflare automatically updates its IP geolocation database multiple times per week.
* **Processing time**: Cloudflare reviews correction requests, which may or may not result in a change. Confirmed changes generally take effect within a few business days.
* **Accuracy**: Due to the dynamic nature of IP address allocation, Cloudflare cannot guarantee that its IP geolocation will align with other providers. Cloudflare does not provide SLAs for IP geolocation accuracy or the timing of updates.

---

## Report an incorrect IP location

If you find an IP address with a location that you believe is incorrect, fill in the [data correction form ↗](https://www.cloudflare.com/lp/ip-corrections/) with the relevant IP address range(s) along with the correct information as applicable (country, state/province, city name, and ZIP code).

If the data is confirmed, Cloudflare will make the necessary changes, generally within a few business days.

If Cloudflare cannot confirm the submitted location, the correction does not result in a change.

If an end user's IP address rotates frequently, for example on mobile or CGNAT networks, the address may change again before the correction completes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network/ip-geolocation/#page","headline":"IP geolocation · Cloudflare Network settings docs","description":"Add visitor country information via the CF-IPCountry header.","url":"https://developers.cloudflare.com/network/ip-geolocation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
```
