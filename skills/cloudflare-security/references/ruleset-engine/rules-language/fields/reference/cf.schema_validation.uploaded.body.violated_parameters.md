---
description: The JSON path of a detected request body [violation of the uploaded schema](/waf/detections/application-profiles/fields/#violated-parameters).
title: cf.schema_validation.uploaded.body.violated_parameters
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.schema\_validation.uploaded.body.violated\_parameters

`cf.schema_validation.uploaded.body.violated_parameters``Array<String>`

The JSON path of a detected request body [violation of the uploaded schema](https://developers.cloudflare.com/waf/detections/application-profiles/fields/#violated-parameters).

Body validation reports the first detected violation. A value of `$` identifies the body without a more specific path.

Example value:

```txt
["$"]
```

Example usage:

```txt
any(cf.schema_validation.uploaded.body.violated_parameters[*] == "$")
```

Categories:
- Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.schema_validation.uploaded.body.violated_parameters/#page","headline":"cf.schema_validation.uploaded.body.violated_parameters","description":"The JSON path of a detected request body violation of the uploaded schema.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.schema_validation.uploaded.body.violated_parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
