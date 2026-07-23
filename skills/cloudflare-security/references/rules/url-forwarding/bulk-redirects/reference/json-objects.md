---
description: JSON object structure for Bulk Redirect API requests.
title: Bulk Redirects API JSON objects
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk Redirects API JSON objects

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/json-objects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Bulk Redirect Rule

A fully populated Bulk Redirect Rule object has the following JSON structure:

```json
{
	"action": "redirect",
	"expression": "http.request.full_uri in $<LIST_NAME>",
	"action_parameters": {
		"from_list": {
			"name": "<LIST_NAME>",
			"key": "http.request.full_uri"
		}
	}
}
```

The JSON object properties must comply with the following:

* `action` must be `redirect`
* `action_parameters` must contain a `from_list` object with additional settings.
* `from_list` must contain the following properties:

  * `name`: The name of an existing Bulk Redirect List to associate with the current Bulk Redirect Rule.
  * `key`: An expression that defines the value that will be matched against the configured URL redirect's source URL values, following the rules of the [URL matching algorithm](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/#url-matching-algorithm). Refer to [Bulk Redirects concepts](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-rules) for more information.
* `expression` must reference the request field used in the `key` property. Refer to [Bulk Redirects concepts](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-rules) for more information.

## URL redirect list item

A fully populated URL redirect list item object has the following JSON structure:

```json
{
	"id": "7c5dae5552338874e5053f2534d2767a",
	"redirect": {
		"source_url": "https://example.com/blog",
		"target_url": "https://example.com/blog/latest",
		"status_code": 301,
		"include_subdomains": false,
		"subpath_matching": false,
		"preserve_query_string": false,
		"preserve_path_suffix": true
	},
	"created_on": "2021-10-11T12:39:02Z",
	"modified_on": "2021-10-11T12:39:02Z"
}
```

For details on the `redirect` object properties, refer to [URL redirect parameters](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/json-objects/#page","headline":"Bulk Redirects API JSON objects · Cloudflare Rules docs","description":"JSON object structure for Bulk Redirect API requests.","url":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/json-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
