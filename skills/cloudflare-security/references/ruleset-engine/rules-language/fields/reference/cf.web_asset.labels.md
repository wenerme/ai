---
description: An array of labels associated with the operation matched by the request.
title: cf.web_asset.labels
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.web\_asset.labels

`cf.web_asset.labels``Array<String>`

An array of labels associated with the operation matched by the request.

Use this field to create rules based on labels applied to operations in Web Assets, including API endpoints. For more information, refer to [Label operations](https://developers.cloudflare.com/security/web-assets/label-operations/).

Example value:

```txt
["cf-log-in"]
```

Example usage:

```txt
any(cf.web_asset.labels[*] == "cf-log-in")
```

Categories:
- Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.web_asset.labels/#page","headline":"cf.web_asset.labels","description":"An array of labels associated with the operation matched by the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.web_asset.labels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
