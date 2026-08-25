---
description: Contains the specific code for 1XXX Cloudflare errors.
title: cf.response.1xxx_code
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.response.1xxx\_code

`cf.response.1xxx_code` `Integer`

Contains the specific code for 1XXX Cloudflare errors.

Use this field to differentiate between 1XXX errors associated with the same HTTP status code. The default value is `0`.

For a list of 1XXX errors, refer to [Troubleshooting Cloudflare 1XXX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/).

**Note**: This field is only available in [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) and [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/).

Example value:

```txt
1020
```

Categories:
* Response

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.response.1xxx_code/#page","headline":"cf.response.1xxx_code · Cloudflare Ruleset Engine docs","description":"Contains the specific code for 1XXX Cloudflare errors.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.response.1xxx_code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
