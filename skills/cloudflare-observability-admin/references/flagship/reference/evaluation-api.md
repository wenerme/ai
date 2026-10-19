---
description: Evaluate flags with scalar query or structured JSON context.
title: Evaluation API
image: https://developers.cloudflare.com/flagship/reference/evaluation-api/og.png?v=3bb4624174d3fd3d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Evaluation API

Last updated Oct 19, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/flagship/reference/evaluation-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the evaluation API when you cannot use the [Workers binding](https://developers.cloudflare.com/flagship/binding/). The API accepts query parameters or a JSON request body.

## Send scalar query context

The [`GET` endpoint](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/evaluate/methods/get/) accepts context attributes as query parameters. Use it for scalar context values.

Flagship coerces unambiguous number and boolean query values. For example, `42` becomes a number and `true` becomes a boolean. Other values remain strings.

JSON-looking query values remain strings. A value such as `{"plan":"enterprise"}` does not create a nested object.

## Send structured JSON context

Use `POST` to send nested objects, arrays, or `null`. The following request evaluates `new-checkout` with structured context:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Flagship Read</code>
- <code>Flagship Write</code>
- <code>Flagship Evaluate</code>

</details>

*Evaluate flag with JSON contextbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps/$APP_ID/evaluate" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"flagKey": "new-checkout",
		"context": {
				"targetingKey": "user-42",
				"profile": {
						"plan": "enterprise"
				},
				"tags": [
						"beta"
				]
		}
	}'
```

The `POST` response contains the same fields as `GET`:

```json
{
	"flagKey": "new-checkout",
	"value": true,
	"variant": "on",
	"reason": "TARGETING_MATCH"
}
```

Invalid context returns a `400` response. Refer to [Limits](https://developers.cloudflare.com/flagship/reference/limits/) and [evaluation error codes](https://developers.cloudflare.com/flagship/reference/evaluation-reasons/#error-codes) for details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/reference/evaluation-api/#page","headline":"Evaluation API","description":"Evaluate flags with scalar query or structured JSON context.","url":"https://developers.cloudflare.com/flagship/reference/evaluation-api/","inLanguage":"en","image":"https://developers.cloudflare.com/flagship/reference/evaluation-api/og.png?v=3bb4624174d3fd3d","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
