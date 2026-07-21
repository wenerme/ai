---
description: Reference for the deprecated classic Schema validation feature in API Shield.
title: Classic Schema validation (deprecated)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

#  Classic Schema validation (deprecated)

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Deprecation notice

Classic Schema validation has been deprecated.

Upload all new schemas to [Schema validation 2.0](https://developers.cloudflare.com/api-shield/security/schema-validation/).

Use the **API Shield** interface to configure [API Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/), which validates requests according to the API schema you provide.

Before you can configure Schema validation for an API, you must obtain an API Schema file matching our [specifications](https://developers.cloudflare.com/api-shield/security/schema-validation/#specifications).

If you are in the Schema validation 2.0, you can make changes to your settings but you cannot add any new Classic Schema validation schemas.

Note

This feature is only available for customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

## Create an API Shield with Schema validation

To configure Schema validation in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Go to **Schema validation** and select **Add schema**.
4. Enter a descriptive name for your policy and optionally edit the expression to trigger Schema validation. For example, if your API is available at `http://api.example.com/v1`, include a check for the _Hostname_ field — equal to `api.example.com` — and a check for the _URI Path_ field using a regular expression — matching the regex `^/v1`.

Important

To validate the hostname, you must include the _Hostname_ field explicitly in the rule, even if the hostname value is in the schema file. Any hostname value present in the schema file will be ignored.

1. Select **Next**.
2. Upload your schema file.
3. Select **Save** to validate the content of the schema file and deploy the Schema validation rule. If you get a validation error, ensure that you are using one of the [supported file formats](https://developers.cloudflare.com/api-shield/security/schema-validation/#specifications) and that each endpoint and method pair has a unique operation ID.

After deploying your API Shield rule, Cloudflare displays a summary of all API endpoints organized by their protection level and actions that will occur for non-compliant and unprotected requests.

1. In the **Endpoint action** dropdown, select an action for every request that targets a protected endpoint and fails Schema validation.
2. In the **Fallthrough action** dropdown, select an action for every request that targets an unprotected endpoint.
3. Optionally, you can save the endpoints to Endpoint Management at the same time the Schema is saved by selecting **Save new endpoints to [endpoint management](https://developers.cloudflare.com/api-shield/management-and-monitoring/)**. Endpoints will be saved regardless of whether the Schema is saved as a draft or published live.
4. Select **Done**.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/#page","headline":"Configure Classic Schema validation (deprecated) · Cloudflare API Shield docs","description":"Reference for the deprecated classic Schema validation feature in API Shield.","url":"https://developers.cloudflare.com/api-shield/reference/classic-schema-validation/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
