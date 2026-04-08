---
title: Predefined profiles
description: Cloudflare Zero Trust provides predefined DLP profiles for common types of sensitive data. Some profiles include built-in validation checks that increase detection accuracy. You can also configure advanced settings for predefined profiles.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Predefined profiles

Cloudflare Zero Trust provides predefined DLP profiles for common types of sensitive data. Some profiles include built-in validation checks that increase detection accuracy. You can also configure [advanced settings](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for predefined profiles.

## AI Prompt

DLP provides AI prompt protection with the following predefined profiles:

* AI Prompt: AI Security
* AI Prompt: Customer
* AI Prompt: Financial Information
* AI Prompt: PII
* AI Prompt: Technical

For more information on included detection entries, refer to [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/#ai-prompt-topics).

## Credentials and Secrets

The following secrets are validated with regex.

* Google Cloud Platform keys
* AWS keys
* Azure API keys
* SSH keys

## Financial Information

Availability

This predefined profile is available on all Zero Trust plans.

Credit card numbers begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits. Card verification values (CVVs) are not validated.

In the table below, entries use one of three validation methods. [Luhn's algorithm ↗](https://en.wikipedia.org/wiki/Luhn%5Falgorithm) is a checksum formula used to verify credit card numbers. Entries validated "with checksum" use an arithmetic check specific to that number format. Entries validated "with regex" match a known text pattern without performing a mathematical check.

| Detection entry                  | Notes                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| American Express Card Number     | Validated using [Luhn's algorithm ↗](https://en.wikipedia.org/wiki/Luhn%5Falgorithm). |
| American Express Text            | Text matching amex or american express.                                               |
| Diners Club Card Number          | Validated using Luhn's algorithm.                                                     |
| Generic CVV Card Number          | Validated with regex.                                                                 |
| Mastercard Card Number           | Validated using Luhn's algorithm.                                                     |
| Mastercard Text                  | Text matching mastercard.                                                             |
| Union Pay Card Number            | Validated using Luhn's algorithm.                                                     |
| Union Pay Text                   | Text matching union pay.                                                              |
| Visa Card Number                 | Validated using Luhn's algorithm.                                                     |
| Visa Text                        | Text matching visa.                                                                   |
| United States ABA Routing Number | Validated algorithmically with checksum.                                              |
| IBAN                             | Validated with checksum.                                                              |

## Health Information

The following diagnosis and medication names are checked for surrounding ASCII characters to prevent false positives.

* FDA active ingredients
* FDA drug names
* ICD-10 FY2023 short descriptions

## Social Security, Insurance, Tax, and Identifier Numbers

Availability

This predefined profile is available on all Zero Trust plans.

The following national identifier detections are validated algorithmically when possible.

| Detection entry                                      | Notes                                                                                                                                                                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| United States SSN Numeric Detection                  | Matched values must include commonly used separators. For example, 000-00-0000 matches but 000000000 does not. Unlike credit card numbers, Social Security numbers have no built-in checksum, so DLP validates the format only. |
| Social Security Number Text                          | Text matching ssn or social security.                                                                                                                                                                                           |
| Australia Tax File Number                            | Validated with checksum.                                                                                                                                                                                                        |
| Canada Social Insurance Number                       | Validated using Luhn's algorithm.                                                                                                                                                                                               |
| France Social Security Number                        | Validated with regex.                                                                                                                                                                                                           |
| Hong Kong Identity Card (HKIC) Number                | Validated with checksum.                                                                                                                                                                                                        |
| Indonesia Identity Card Number                       | Validated with regex.                                                                                                                                                                                                           |
| Malaysian National Identity Card Number              | Validated with regex.                                                                                                                                                                                                           |
| Philippines Unified Multi-Purpose ID (UMID) Number   | Validated with regex.                                                                                                                                                                                                           |
| Singapore National Registration Identity Card Number | Validated with checksum.                                                                                                                                                                                                        |
| Taiwan National Identification Number                | Validated with checksum.                                                                                                                                                                                                        |
| Thai Identity Card Number                            | Validated with checksum.                                                                                                                                                                                                        |
| United Kingdom NHS Number                            | Validated with checksum.                                                                                                                                                                                                        |
| United Kingdom National Insurance Number             | Validated with regex.                                                                                                                                                                                                           |

## Source Code

The following programming languages are validated with natural language processing (NLP).

* C
* C++
* C#
* Go
* Haskell
* Java
* JavaScript
* Lua
* Python
* R
* Rust
* Swift

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/","name":"DLP profiles"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/","name":"Predefined profiles"}}]}
```
