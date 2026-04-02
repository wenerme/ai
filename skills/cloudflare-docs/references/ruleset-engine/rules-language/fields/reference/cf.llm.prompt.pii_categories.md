---
title: cf.llm.prompt.pii_categories
description: Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  cf.llm.prompt.pii\_categories 

`cf.llm.prompt.pii_categories` ` Array<String> ` 

Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.

The possible values are the following:

| Category                     | Description                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| CREDIT\_CARD                 | Credit card number                                                                                                                       |
| CRYPTO                       | Crypto wallet number (currently only Bitcoin address)                                                                                    |
| DATE\_TIME                   | Absolute or relative dates or periods or times smaller than a day                                                                        |
| EMAIL\_ADDRESS               | Email address                                                                                                                            |
| IBAN\_CODE                   | International Bank Account Number (IBAN)                                                                                                 |
| IP\_ADDRESS                  | Internet Protocol (IP) address                                                                                                           |
| NRP                          | A person's nationality, religious or political group                                                                                     |
| LOCATION                     | Name of politically or geographically defined location (cities, provinces, countries, international regions, bodies of water, mountains) |
| PERSON                       | Full person name                                                                                                                         |
| PHONE\_NUMBER                | Telephone number                                                                                                                         |
| MEDICAL\_LICENSE             | Common medical license numbers                                                                                                           |
| URL                          | Uniform Resource Locator (URL), used to locate a resource on the Internet                                                                |
| US\_BANK\_NUMBER             | US bank account number                                                                                                                   |
| US\_DRIVER\_LICENSE          | US driver license                                                                                                                        |
| US\_ITIN                     | US Individual Taxpayer Identification Number (ITIN)                                                                                      |
| US\_PASSPORT                 | US passport number                                                                                                                       |
| US\_SSN                      | US Social Security Number (SSN)                                                                                                          |
| UK\_NHS                      | UK NHS number                                                                                                                            |
| UK\_NINO                     | UK National Insurance Number                                                                                                             |
| ES\_NIF                      | Spanish NIF number (personal tax ID)                                                                                                     |
| ES\_NIE                      | Spanish NIE number (foreigners ID card)                                                                                                  |
| IT\_FISCAL\_CODE             | Italian personal tax ID code                                                                                                             |
| IT\_DRIVER\_LICENSE          | Italian driver license number                                                                                                            |
| IT\_VAT\_CODE                | Italian VAT code number                                                                                                                  |
| IT\_PASSPORT                 | Italian passport number                                                                                                                  |
| IT\_IDENTITY\_CARD           | Italian identity card number                                                                                                             |
| PL\_PESEL                    | Polish PESEL number                                                                                                                      |
| SG\_NRIC\_FIN                | National Registration Identification Card (Singapore)                                                                                    |
| SG\_UEN                      | Unique Entity Number (for entities registered in Singapore)                                                                              |
| AU\_ABN                      | Australian Business Number (ABN)                                                                                                         |
| AU\_ACN                      | Australian Company Number (ACN)                                                                                                          |
| AU\_TFN                      | Australian tax file number (TFN)                                                                                                         |
| AU\_MEDICARE                 | Medicare number (issued by Australian government)                                                                                        |
| IN\_PAN                      | Indian Permanent Account Number (PAN)                                                                                                    |
| IN\_AADHAAR                  | Individual identity number (issued by Indian government)                                                                                 |
| IN\_VEHICLE\_REGISTRATION    | Vehicle registration number (issued by Indian government)                                                                                |
| IN\_VOTER                    | Numeric voter ID (issued by Indian Election Commission)                                                                                  |
| IN\_PASSPORT                 | Indian Passport Number                                                                                                                   |
| FI\_PERSONAL\_IDENTITY\_CODE | Finnish Personal Identity Code                                                                                                           |

The categories list is based on the [list of PII entities supported by Presidio](https://microsoft.github.io/presidio/supported%5Fentities/). Presidio is the data protection and de-identification SDK used in AI Security for Apps.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Example usage:

```

# Matches requests where PII categorized as "EMAIL_ADDRESS" or "IBAN_CODE" was detected:

(cf.llm.prompt.pii_detected and any(cf.llm.prompt.pii_categories[*] in {"EMAIL_ADDRESS" "IBAN_CODE"}))


```

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
