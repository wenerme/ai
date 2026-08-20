---
description: Understand learned and uploaded Schema Profile sources.
title: Schema Profiles
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema Profiles

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A Schema Profile models expected request fields and their constraints. You can learn one from traffic or supply an uploaded schema.

After a profile becomes available, Cloudflare runs an **always-on detection**. Detection does not mitigate requests by itself.

## Learn from traffic

An operation is Cloudflare's term for an endpoint. Its identity combines an HTTP method, hostname pattern, and path pattern.

[Web Assets](https://developers.cloudflare.com/security/web-assets/) continuously discovers operations under **Web Assets** \> **Operations**. You can also add an operation manually.

Both methods only add operations to the inventory. To start profiling, select **Learn profile** from the operation overflow menu.

### Meet traffic requirements

Learning runs weekly using qualifying traffic from the previous seven days. Only requests that received a `2xx` response contribute.

The field-learning threshold requires 1,000 qualifying requests. The boundary-learning threshold requires 10,000 qualifying requests.

The field-learning threshold allows Cloudflare to learn request fields. The boundary-learning threshold allows Cloudflare to learn constraints such as numeric ranges and string lengths.

The first profile appears after the next weekly learning run. This can take up to seven days after meeting the relevant threshold.

### Review learned content

From the operation overflow menu, select **View details**. The learned schema appears under **Security overview**.

Profiles can learn these request components where supported:

* Path variables
* Query parameters
* Headers and cookies
* JSON request bodies
* Form-encoded request bodies

Profiles can validate integers, strings, universally unique identifiers (UUIDs), and arrays. Supported constraints include numeric ranges, string lengths, character classes, and enumerations containing up to three values.

Successful traffic can include bots, scanners, or malicious requests. Review the learned profile before enforcing its detection.

Each weekly run can update a profile as qualifying traffic changes. For a fixed schema, [export the learned schema](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#export-a-schema) as OpenAPI and [upload it for validation](https://developers.cloudflare.com/api-shield/security/schema-validation/#upload-a-schema).

### Consider limitations

Learned Schema Profiles have these limitations:

* Multipart forms, GraphQL, and XML are unsupported.
* Repeated parameters have each value validated, without uniqueness enforcement.
* Required parameter presence is not enforced.
* New parameters alone do not produce violations.
* Constraints apply to learned fields, not a complete allowlist.

## Use an uploaded schema

An uploaded OpenAPI schema supplies expected structure instead of observed traffic. It produces detections through `cf.schema_validation.uploaded.violated`.

API Shield provides the detailed [Schema validation reference](https://developers.cloudflare.com/api-shield/security/schema-validation/). It covers supported versions, import procedures, OpenAPI fields, body limits, and troubleshooting.

For automation, refer to the [API](https://developers.cloudflare.com/api-shield/security/schema-validation/api/) and [Terraform](https://developers.cloudflare.com/api-shield/reference/terraform/#manage-schema-validation) instructions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/#page","headline":"Schema Profiles · Cloudflare Web Application Firewall (WAF) docs","description":"Understand learned and uploaded Schema Profile sources.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
