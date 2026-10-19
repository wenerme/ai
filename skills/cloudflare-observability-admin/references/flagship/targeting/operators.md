---
description: Reference for the 13 comparison operators available in Flagship targeting rule conditions, including equality, comparison, string, and array operators.
title: Operators
image: https://developers.cloudflare.com/flagship/targeting/operators/og.png?v=8faf75cc8c4cacf3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Operators

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/flagship/targeting/operators/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Flagship supports 13 comparison operators for targeting rule conditions. Each operator compares an attribute from the [evaluation context](https://developers.cloudflare.com/flagship/concepts/#evaluation-context) against a specified value.

## Operator reference

| Operator | Description | Example | Rule value type |
| --- | --- | --- | --- |
| `equals` | Returns true if the attribute matches the specified scalar. | `country equals "US"` | Scalar |
| `not_equals` | Returns true if the attribute differs from the specified scalar. | `plan not_equals "free"` | Scalar |
| `greater_than` | Returns true if the attribute value is greater than the specified value. | `age greater_than 18` | Number, ISO 8601 datetime |
| `less_than` | Returns true if the attribute value is less than the specified value. | `loginCount less_than 5` | Number, ISO 8601 datetime |
| `greater_than_or_equals` | Returns true if the attribute value is greater than or equal to the specified value. | `score greater_than_or_equals 90` | Number, ISO 8601 datetime |
| `less_than_or_equals` | Returns true if the attribute value is less than or equal to the specified value. | `createdAt less_than_or_equals <DATETIME>` | Number, ISO 8601 datetime |
| `contains` | Returns true if the attribute value contains the specified substring. | `email contains "@cloudflare.com"` | String |
| `starts_with` | Returns true if the attribute value starts with the specified prefix. | `path starts_with "/api/v2"` | String |
| `ends_with` | Returns true if the attribute value ends with the specified suffix. | `domain ends_with ".dev"` | String |
| `in` | Returns true if the scalar attribute is in the specified array. | `country in ["US", "CA", "UK"]` | Array |
| `not_in` | Returns true if the scalar attribute is not in the specified array. | `userId not_in ["blocked-1", "blocked-2"]` | Array |
| `has` | Returns true if the array attribute contains the specified scalar. | `tags has "beta"` | Scalar |
| `not_has` | Returns true if the array attribute does not contain the specified scalar. | `roles not_has "contractor"` | Scalar |

## Operator categories

### Equality operators

`equals`, `not_equals`

Use these operators for exact scalar matching. String comparisons are case-sensitive.

### Comparison operators

`greater_than`, `less_than`, `greater_than_or_equals`, `less_than_or_equals`

These operators work with numeric values and ISO 8601 datetime strings. Provide datetime values in ISO 8601 format.

### String operators

`contains`, `starts_with`, `ends_with`

These operators perform substring matching against the attribute value. All string comparisons are case-sensitive.

### Array operators

`in`, `not_in`, `has`, `not_has`

For `in` and `not_in`, the rule value must be an array. Flagship checks whether a scalar attribute belongs to that array.

For `has` and `not_has`, the context attribute must be an array. Flagship checks whether that array contains the rule's scalar value.

## Context value behavior

Missing attributes never match, including with negative operators. A `null` attribute only matches `not_equals` and `not_in` conditions.

Arrays support `has` and `not_has`. Object and array attributes do not act as scalar operands for other operators.

Dot-separated attributes can traverse up to five object segments. A literal top-level key takes precedence over nested traversal.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/targeting/operators/#page","headline":"Operators","description":"Reference for the 13 comparison operators available in Flagship targeting rule conditions, including equality, comparison, string, and array operators.","url":"https://developers.cloudflare.com/flagship/targeting/operators/","inLanguage":"en","image":"https://developers.cloudflare.com/flagship/targeting/operators/og.png?v=8faf75cc8c4cacf3","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
