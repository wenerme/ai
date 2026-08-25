---
description: The time spent executing a Cloudflare Worker in milliseconds.
title: cf.timings.worker_msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.timings.worker\_msec

`cf.timings.worker_msec` `Integer`

The time spent executing a Cloudflare Worker in milliseconds.

This field provides the wall-clock time that a Cloudflare Worker spent handling the request, measured in milliseconds.

Use this field to identify slow Worker executions, set up alerts for performance regressions, or add Worker execution time as a request header using Transform Rules for downstream observability.

If the request did not invoke a Worker, the value of this field will be `0`.

Example value:

```txt
12
```

Example usage:

```txt
# Matches requests where the Worker execution time exceeded 500 milliseconds
cf.timings.worker_msec > 500
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.worker_msec/#page","headline":"cf.timings.worker_msec · Cloudflare Ruleset Engine docs","description":"The time spent executing a Cloudflare Worker in milliseconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.timings.worker_msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
