---
description: The most recent data delivery rate estimate for the client connection, in bytes per second.
title: cf.edge.l4.delivery_rate
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.edge.l4.delivery\_rate

`cf.edge.l4.delivery_rate` `Integer`

The most recent data delivery rate estimate for the client connection, in bytes per second.

This metric reflects the rate at which data is being successfully delivered over the connection.

Returns `0` when L4 statistics are not available for the request.

Example value:

```txt
123456
```

Example usage:

```txt
# Match requests where the delivery rate is below 100 KB/s
cf.edge.l4.delivery_rate < 100000
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.edge.l4.delivery_rate/#page","headline":"cf.edge.l4.delivery_rate · Cloudflare Ruleset Engine docs","description":"The most recent data delivery rate estimate for the client connection, in bytes per second.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.edge.l4.delivery_rate/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
