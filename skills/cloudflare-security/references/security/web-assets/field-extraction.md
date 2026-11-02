---
description: Configure field extractors to identify application data that Cloudflare security products should inspect.
title: Configure field extraction
image: https://developers.cloudflare.com/security/web-assets/field-extraction/og.png?v=dd6da5b860446e16
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure field extraction

Last updated Nov 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/security/web-assets/field-extraction/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Field extraction tells Cloudflare where to find application data in incoming requests. Expressions can locate data in supported request bodies, headers, and URI query parameters. Cloudflare security products can inspect the extracted values and expose detection results for rules and analytics.

Note

**API-only**: Field extraction is currently available only through the API. For endpoint specifications, refer to [Field Extractors](https://developers.cloudflare.com/api/resources/field_extractors/).

Field extraction supports different extractor types. Currently, the API supports the `llm_prompts` extractor for [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Custom configurations are account-scoped. They apply to matching labeled operations within the account.

## Supported extractors

The following extractor is available:

| Extractor | Extracted data | Requirement |
| --- | --- | --- |
| `llm_prompts` | LLM prompt strings | The operation must have the [`cf-llm` managed label](https://developers.cloudflare.com/security/web-assets/label-operations/). |

The `llm_prompts` extractor requires access to AI Security for Apps detection fields. For availability information, refer to [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/#availability/).

## Configure LLM prompt extraction

Cloudflare-managed rules extract prompts from common JSON request structures. Add custom extraction rules when your application stores prompts in other supported request fields or locations.

The following request bodies correspond to the two custom rules in the API example.

The first request body stores a prompt in two nested arrays:

```json
{
  "requests": [
    {
      "params": {
        "messages": [
          { "content": "Summarize the latest support request." }
        ]
      }
    }
  ]
}
```

The second request body stores a prompt at the top-level `/prompt` location:

```json
{
  "prompt": "Summarize the latest support request."
}
```

AI Security for Apps fallback behavior

AI Security for Apps normally scans the prompt returned by field extraction. If extraction does not return a prompt, or if a JSON request body contains duplicate property names that make the extracted value ambiguous, AI Security for Apps instead scans the request body available for inspection.

Use a `PUT` request to define the complete custom configuration for an extractor:

*Update Field Extractorbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/field_extractors/llm_prompts" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"ref": "nested-batch-messages",
						"description": "Extract prompts from nested batch messages",
						"fields": [
								{
										"name": "prompt",
										"expression": "filter(http.request.body.json.strings.values, http.request.body.json.strings.pointers[*] matches \"^/requests/\\\\d+/params/messages/\\\\d+/content$\")"
								}
						]
				},
				{
						"ref": "simple-prompt",
						"fields": [
								{
										"name": "prompt",
										"expression": "filter(http.request.body.json.strings.values, http.request.body.json.strings.pointers[*] matches \"^/prompt$\")"
								}
						]
				}
		]
	}'
```

The `http.request.body.json.strings.values` field contains string values from the JSON request body. The corresponding `http.request.body.json.strings.pointers` field contains their JSON Pointer locations.

Caution

A `PUT` request replaces all custom rules for the specified extractor. Include every custom rule that you want to keep. Concurrent updates use last-write-wins behavior.

### Rule properties

Each configuration must meet the following requirements:

| Property | Requirement |
| --- | --- |
| `rules` | A non-empty array with no more than 10 rules |
| `rules[].ref` | A unique value with 1–64 letters, numbers, hyphens, or underscores |
| `rules[].description` | An optional description with no more than 4,096 characters |
| `rules[].fields` | A non-empty array of fields |
| `rules[].fields[].name` | For `llm_prompts`, one field named `prompt` |
| `rules[].fields[].expression` | A wirefilter value expression with 1–4,096 characters |

The API manages custom extraction rules separately from Cloudflare-managed extraction rules. Updating custom rules does not change the managed defaults.

Custom extraction rules run before Cloudflare-managed rules. Within the custom ruleset, rules run in the order provided.

## Review the configuration

Use a `GET` request to list the custom rules for an extractor:

*Get Field Extractorbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/field_extractors/llm_prompts" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

The response includes the extractor and its custom rules:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "extractor": "llm_prompts",
    "rules": [
      {
        "ref": "simple-prompt",
        "fields": [
          {
            "name": "prompt",
            "expression": "filter(http.request.body.json.strings.values, http.request.body.json.strings.pointers[*] matches \"^/prompt$\")"
          }
        ]
      }
    ]
  }
}
```

If the extractor has no custom rules, the API returns a `404` response.

## Delete the configuration

Use a `DELETE` request to remove all custom rules for an extractor:

*Delete Field Extractorbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/field_extractors/llm_prompts" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Deleting the custom configuration does not remove Cloudflare-managed extraction rules. The request succeeds even when no custom rules exist.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security/web-assets/field-extraction/#page","headline":"Configure field extraction","description":"Configure field extractors to identify application data that Cloudflare security products should inspect.","url":"https://developers.cloudflare.com/security/web-assets/field-extraction/","inLanguage":"en","image":"https://developers.cloudflare.com/security/web-assets/field-extraction/og.png?v=dd6da5b860446e16","dateModified":"2026-11-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
