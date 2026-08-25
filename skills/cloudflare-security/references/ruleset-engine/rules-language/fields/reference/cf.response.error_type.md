---
description: A string with the type of error in the response being returned.
title: cf.response.error_type
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.response.error\_type

`cf.response.error_type` `String`

A string with the type of error in the response being returned.

The default value is an empty string (`""`).

The available values are the following:

* `"managed_challenge"`
* `"iuam"`
* `"legacy_challenge"`
* `"ip_ban"`
* `"waf"`
* `"5xx"`
* `"1xxx"`
* `"always_online"`
* `"country_challenge"`
* `"ratelimit"`

You can use this field to customize the response for a specific type of error (for example, all 1XXX errors or all WAF block actions).

**Note**: This field is only available in [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) and [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/).

Categories:
* Response

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.response.error_type/#page","headline":"cf.response.error_type · Cloudflare Ruleset Engine docs","description":"A string with the type of error in the response being returned.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.response.error_type/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
