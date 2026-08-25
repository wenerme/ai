---
description: Define built-in and custom metadata attributes on indexed documents.
title: Metadata attributes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Metadata attributes

Last updated Aug 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use metadata attributes to organize your indexed documents and provide context to guide AI responses. This page covers built-in metadata attributes and custom metadata schemas. To filter search results by these attributes at query time, refer to [Filtering](https://developers.cloudflare.com/ai-search/configuration/retrieval/filtering/).

## Built-in metadata attributes

AI Search automatically extracts the following metadata attributes from your indexed documents:

| Attribute | Description                                                                                         | Example                                                                 |
| --------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| filename  | The name of the file.                                                                               | guide.pdf or docs/getting-started/guide.pdf                             |
| folder    | The folder or prefix to the object.                                                                 | For docs/getting-started/guide.pdf, the folder is docs/getting-started/ |
| timestamp | Unix timestamp (milliseconds) when the object was last modified. Comparisons round down to seconds. | 1735689600000 (2025-01-01 00:00:00 UTC)                                 |

## Custom metadata attributes

Custom metadata allows you to define additional fields for filtering search results. You can attach structured metadata to documents and filter queries by attributes such as category, version, or any custom field.

### Supported data types

| Type     | Description                        | Example values               |
| -------- | ---------------------------------- | ---------------------------- |
| text     | String values (max 500 characters) | "documentation", "blog-post" |
| number   | Numeric values (parsed as float)   | 2.5, 100, \-3.14             |
| boolean  | Boolean values                     | true, false, 1, 0, yes, no   |
| datetime | Date and time values               | "2026-01-15T00:00:00Z"       |

### Define a schema

Before custom metadata can be extracted, define a schema in your AI Search configuration using the `custom_metadata` field. The schema specifies which fields to extract and their data types.

```ts
custom_metadata: [
	{ field_name: "category", data_type: "text" },
	{ field_name: "version", data_type: "number" },
	{ field_name: "is_public", data_type: "boolean" },
];
```

**Schema constraints:**

* Maximum of 5 custom metadata fields per AI Search instance
* Field names are case-insensitive and stored as lowercase
* Field names cannot use reserved names: `timestamp`, `folder`, `filename`
* Text values are truncated to 500 characters
* Changing the schema triggers a full re-index of all documents

### Add custom metadata attributes to documents

How you attach custom metadata attributes depends on your data source:

* **R2 bucket**: Set metadata using S3-compatible custom headers (`x-amz-meta-*`). Refer to [R2 custom metadata](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/#custom-metadata) for examples.
* **Website**: Add `<meta>` tags to your HTML pages. Refer to [Website custom metadata](https://developers.cloudflare.com/ai-search/configuration/data-source/website/custom-metadata/) for details.
* **Built-in storage**: Attach metadata when uploading files through the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/#upload-with-metadata).

## Re-indexing behavior

When you modify the `custom_metadata` schema:

1. New fields are added to the search index.
2. Removed fields are deleted from the search index.
3. A full re-index is triggered for all documents.
4. Existing vectors are updated with the new metadata structure.

## Limitations

| Constraint                | Limit                       |
| ------------------------- | --------------------------- |
| Maximum custom fields     | 5 per AI Search instance    |
| Maximum text value length | 500 characters              |
| Reserved field names      | timestamp, folder, filename |
| Field name matching       | Case-insensitive            |

If file metadata exceeds size limits, the metadata is replaced with an error indicator:

```json
{
	"file": { "error": "metadata is too large" }
}
```

To avoid this, keep individual metadata values concise.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/#page","headline":"Metadata attributes · Cloudflare AI Search docs","description":"Define built-in and custom metadata attributes on indexed documents.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
