---
description: Reference Schema Profile detection fields and usage.
title: Fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Fields

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/fields/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Schema Profile detections populate these fields after an applicable profile becomes available:

| Field | Type | Source | Meaning | Available in |
| --- | --- | --- | --- | --- |
| `cf.schema_validation.learned.violated` | `Boolean` | Learned Schema Profile | `true` when an evaluated request violates the learned profile. | Security Analytics and Custom Rules |
| `cf.schema_validation.uploaded.violated` | `Boolean` | Uploaded schema | `true` when an evaluated request violates the supplied schema. | Security Analytics and Custom Rules |

## Violation details

Sampled violations in Profile Analysis contain four structured fields:

| Field | Type | Meaning |
| --- | --- | --- |
| `location` | `String` | Request component containing the violation: `path`, `query`, `header`, `cookie`, or `body`. |
| `error_class` | `String` | Stable, broad category for grouping similar violations. |
| `error_detail` | `String` | Optional specific reason within the error class. |
| `target` | `String` | Optional parameter, header, cookie, or `$`-prefixed JSON body path associated with the violation. |

These values provide context in sampled logs. Schema Validation reports the first detected failure for each request.

### Error classes

The `error_class` field can have the following values:

| Value | Meaning |
| --- | --- |
| `missing_required` | A required parameter, body, or header was absent. |
| `invalid_type` | A value had the wrong OpenAPI or JSON type. |
| `invalid_encoding` | Bytes or text did not use the expected encoding. |
| `invalid_syntax` | Request syntax was invalid, such as malformed JSON. |
| `invalid_media_type` | A media type did not match the schema. |
| `unsupported_media_type` | A media type or media type parameter is unsupported. |
| `duplicate_value` | A value that accepts one entry appeared more than once. |
| `too_many_values` | A collection contained more values than the validator accepts. |
| `constraint_violation` | A value violated an OpenAPI or JSON Schema constraint. |
| `body_size` | The request body could not be validated because of its size or truncation. |

### Error details

The `error_detail` field adds context when the error class alone is insufficient. The field is empty when the class, location, and target identify the failure.

<details>

<summary>

Error detail values

</summary>

| Detail family | Possible values |
| --- | --- |
| Expected type | <code>expected:array</code>, <code>expected:boolean</code>, <code>expected:integer</code>, <code>expected:null</code>, <code>expected:number</code>, <code>expected:object</code>, <code>expected:string</code>, <code>expected:one_of</code> |
| Encoding and syntax | <code>invalid_utf8</code>, <code>invalid_ascii</code>, <code>invalid_json</code>, <code>invalid_form_urlencoded</code> |
| Media type | <code>invalid_content_type</code>, <code>invalid_media_type</code>, <code>unsupported_media_type_parameter</code> |
| Schema constraint | <code>invalid_length</code>, <code>invalid_object_property_count</code>, <code>invalid_array_item_count</code>, <code>not</code>, <code>all_of</code>, <code>any_of</code>, <code>one_of</code>, <code>invalid_enum_variant</code>, <code>forbidden_value</code>, <code>missing_required_property</code>, <code>number_too_small</code>, <code>number_too_big</code>, <code>number_not_in_range</code>, <code>string_length_not_in_range</code>, <code>different_const_value</code>, <code>multiple_of</code>, <code>pattern_no_match</code>, <code>value_too_deep</code> |
| Format constraint | <code>format_violation:&lt;format&gt;</code>, where <code>&lt;format&gt;</code> identifies the OpenAPI format. Current formats include <code>uuid</code>, <code>email</code>, <code>date-time</code>, <code>date</code>, <code>time</code>, <code>hostname</code>, <code>ipv4</code>, <code>ipv6</code>, <code>uri</code>, <code>uri-reference</code>, <code>iri</code>, <code>iri-reference</code>, <code>int32</code>, <code>int64</code>, <code>uint64</code>, <code>byte</code>, <code>float</code>, and <code>double</code>. |

</details>

### Targets

The `target` value depends on the violation location:

| Location | Target |
| --- | --- |
| `path`, `query`, or `cookie` | Parameter name |
| `header` | Header name, such as `content-type` |
| `body` | `$`-prefixed JSON path, such as `$.items[0].quantity` |

The target is empty for failures that apply to the entire request body. It can also be empty when Cloudflare cannot safely report a target.

## Availability

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without API Security. Interested customers can contact their account team to express interest. Closed-beta access does not imply future plan availability or pricing.

## Evaluation

Cloudflare evaluates requests after the corresponding profile becomes available. The profile must apply to the request operation.

Requests without an applicable profile have **Not evaluated** status.

For request statuses and investigation steps, refer to [Analyze profile detections](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/fields/#page","headline":"Fields · Cloudflare Web Application Firewall (WAF) docs","description":"Reference Schema Profile detection fields and usage.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
