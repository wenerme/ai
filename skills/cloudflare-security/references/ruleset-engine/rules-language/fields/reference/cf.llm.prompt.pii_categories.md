---
description: Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.
title: cf.llm.prompt.pii_categories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.pii\_categories

`cf.llm.prompt.pii_categories` `Array<String>`

Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.

The possible values are the following:

| Category        | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| BANK\_ACCOUNT   | Bank account number                                                       |
| CREDIT\_CARD    | Credit card number                                                        |
| DATE\_TIME      | Date or time expression                                                   |
| DRIVER\_LICENSE | Driver license number                                                     |
| EMAIL\_ADDRESS  | Email address                                                             |
| IP\_ADDRESS     | Internet Protocol (IPv4) address                                          |
| LOCATION        | Physical location or address                                              |
| PASSPORT        | Passport number                                                           |
| PERSON          | Full or partial name of an individual                                     |
| PHONE\_NUMBER   | Telephone number                                                          |
| TAX\_ID         | Tax identification number                                                 |
| US\_SSN         | US Social Security Number (SSN)                                           |
| URL             | Uniform Resource Locator (URL), used to locate a resource on the Internet |

The categories are detected by an AI-based Named Entity Recognition (NER) model.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Example usage:

```txt
# Matches requests where PII categorized as "EMAIL_ADDRESS" or "BANK_ACCOUNT" was detected:
(cf.llm.prompt.pii_detected and any(cf.llm.prompt.pii_categories[*] in {"EMAIL_ADDRESS" "BANK_ACCOUNT"}))
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_categories/#page","headline":"cf.llm.prompt.pii_categories · Cloudflare Ruleset Engine docs","description":"Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_categories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
