---
description: Learn a Schema Profile and safely configure mitigation.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/application-profiles/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Create a learned Schema Profile for one operation. Then review its detections before configuring mitigation.

Note

Customers with API Security already have access to Schema Profiles through Schema Learning and Schema Validation. Cloudflare is opening a closed beta to invited Enterprise customers without API Security. Interested customers can contact their account team to express interest. Closed-beta access does not imply future plan availability or pricing.

## Review learning requirements

Cloudflare learns profiles weekly from qualifying traffic during the previous seven days. Only requests that received a `2xx` response qualify.

An operation needs 1,000 qualifying requests for the field-learning threshold. It needs 10,000 qualifying requests for the boundary-learning threshold.

After meeting the field-learning threshold, Cloudflare can learn request fields. After meeting the boundary-learning threshold, Cloudflare can learn constraints such as numeric ranges and string lengths.

The first profile appears after the next weekly learning run. This can take up to seven days after meeting the relevant threshold.

## Learn and review a profile

1. In the Cloudflare dashboard, go to **Web Assets** \> **Operations**.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select a discovered operation or [add one manually](https://developers.cloudflare.com/security/web-assets/manage-operations/#add-operations-manually). An operation uses an HTTP method, hostname pattern, and path pattern.
3. From the operation overflow menu, select **Learn profile**. Discovery and manual creation do not start profiling.
4. Allow Cloudflare to collect enough qualifying traffic.
5. From the operation overflow menu, select **View details**. Review the learned schema under **Security overview**.
6. In **Security** \> **Analytics**, open **Profile Analysis**. Review request time series for profile conformance and violations.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
7. Drill into sampled logs to review violation reasons.
8. After reviewing representative production traffic, [create a Custom Rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).
9. Scope the rule to the intended hostname, path, or operation. Then choose a mitigation action.

After the profile becomes available, Cloudflare runs an **always-on detection**. It does not mitigate requests without a Custom Rule.

If no learned schema appears, confirm that you selected **Learn profile**. Cloudflare may still be collecting enough qualifying traffic.

For learning details and limitations, refer to [Schema Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/).

## Use an uploaded schema

If you have an OpenAPI schema, upload it through [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/). Uploaded schemas produce detections through `cf.schema_validation.uploaded.violated`.

The API Shield reference covers upload formats, OpenAPI requirements, API configuration, Terraform configuration, and limitations.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/application-profiles/get-started/#page","headline":"Get started · Cloudflare Web Application Firewall (WAF) docs","description":"Learn a Schema Profile and safely configure mitigation.","url":"https://developers.cloudflare.com/waf/detections/application-profiles/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
