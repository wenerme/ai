---
description: Filter AI Search results by metadata attributes at query time.
title: Filtering
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Filtering

Last updated Aug 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Metadata filtering narrows down search results based on metadata, so only relevant content is retrieved. The filter is applied before retrieval, so you only query the documents that matter.

Filtering uses the metadata attributes extracted during indexing. To define custom attributes or use the built-in metadata attributes, refer to [Metadata attributes](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/).

AI Search can store string values longer than the filterable prefix. Filters only match the first 64 UTF-8 bytes of each indexed string. Vectorize can store string arrays, but does not currently index or filter them.

Note

If you are using the legacy AutoRAG API, refer to [Metadata filter format (legacy)](https://developers.cloudflare.com/ai-search/api/migration/autorag-filter-format/) for the filter syntax.

Here is an example of metadata filtering using the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/):

```ts
const instance = env.AI_SEARCH.get("my-instance");

const results = await instance.search({
	messages: [{ role: "user", content: "What is Cloudflare?" }],
	ai_search_options: {
		retrieval: {
			filters: {
				folder: "docs/getting-started/",
				timestamp: { $gte: 1735689600 },
			},
		},
	},
});
```

## Filter syntax

Filters are JSON objects where keys are metadata attribute names and values specify the filter condition.

### Supported operators

| Operator | Description                                                  |
| -------- | ------------------------------------------------------------ |
| $eq      | Equals                                                       |
| $ne      | Not equals                                                   |
| $in      | Matches a stored scalar against any candidate scalar value   |
| $nin     | Excludes a stored scalar matching any candidate scalar value |
| $lt      | Less than                                                    |
| $lte     | Less than or equal to                                        |
| $gt      | Greater than                                                 |
| $gte     | Greater than or equal to                                     |

### Implicit `$eq`

When you provide a direct value without an operator, it is treated as an equality check:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "folder": "docs/getting-started/" }
		}
	}
}
```

This is equivalent to:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "folder": { "$eq": "docs/getting-started/" } }
		}
	}
}
```

### Range queries

Combine upper and lower bound operators to filter by ranges:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "timestamp": { "$gte": 1735689600, "$lt": 1735900000 } }
		}
	}
}
```

### Multiple conditions (implicit AND)

When you specify multiple keys, all conditions must match:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": {
				"folder": "docs/getting-started/",
				"timestamp": { "$gte": 1735689600 }
			}
		}
	}
}
```

### `$in` operator

Match a stored scalar field against any value in the candidate array. `$in` does not search inside stored arrays:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "folder": { "$in": ["docs/guides/", "docs/tutorials/"] } }
		}
	}
}
```

## "Starts with" filter for folders

Use range queries to filter for all files within a folder and its subfolders.

For example, consider this file structure:

* docs
  * guide.pdf
  * tutorials
    * getting-started
      * intro.pdf

Using `{ "folder": "docs/" }` only matches files directly in that folder (like `guide.pdf`), not files in subfolders.

To match all files starting with `docs/`, use a range query:

```json
{
	"ai_search_options": {
		"retrieval": {
			"filters": { "folder": { "$gte": "docs/", "$lt": "docs0" } }
		}
	}
}
```

This works because:

* `$gte` includes all paths starting with `docs/`
* `$lt` with `docs0` excludes paths that do not start with `docs/` (since `0` comes after `/` in ASCII)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/#page","headline":"Filtering · Cloudflare AI Search docs","description":"Filter AI Search results by metadata attributes at query time.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
