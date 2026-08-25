---
description: The round-trip time (RTT) between the Cloudflare global network and the origin server in milliseconds.
title: cf.timings.origin_ttfb_msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.timings.origin\_ttfb\_msec

`cf.timings.origin_ttfb_msec` `Integer`

The round-trip time (RTT) between the Cloudflare global network and the origin server in milliseconds.

This field provides insight into origin server latency. It represents the Time to First Byte (TTFB) from the perspective of the Cloudflare edge server.

This metric includes both the network RTT and the time the origin server spent handling the request.

If the request was served from the Cloudflare CDN cache and the origin server was not reached, the value of this field will be `0`.

Example value:

```txt
150
```

Example usage:

```txt
# Matches requests where the origin response time (TTFB) was greater than 2 seconds:
cf.timings.origin_ttfb_msec > 2000
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.origin_ttfb_msec/#page","headline":"cf.timings.origin_ttfb_msec · Cloudflare Ruleset Engine docs","description":"The round-trip time (RTT) between the Cloudflare global network and the origin server in milliseconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.origin_ttfb_msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
