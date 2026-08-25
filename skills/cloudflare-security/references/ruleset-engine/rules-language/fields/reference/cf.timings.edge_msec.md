---
description: The time spent processing a request within the Cloudflare global network in milliseconds.
title: cf.timings.edge_msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.timings.edge\_msec

`cf.timings.edge_msec` `Integer`

The time spent processing a request within the Cloudflare global network in milliseconds.

The value corresponds to the time interval between when the Cloudflare edge server accepted the HTTP request headers for processing and just before the HTTP response headers were available to be sent to the client.

The value does not include:

* The time spent forwarding the request to the origin server (refer to [cf.timings.origin\_ttfb\_msec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.origin%5Fttfb%5Fmsec/)).
* The network transfer time to the client.

Example value:

```txt
28
```

Example usage:

```txt
# Matches requests where Cloudflare's edge processing time was greater than 500 milliseconds
cf.timings.edge_msec > 500
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.edge_msec/#page","headline":"cf.timings.edge_msec · Cloudflare Ruleset Engine docs","description":"The time spent processing a request within the Cloudflare global network in milliseconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.edge_msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
