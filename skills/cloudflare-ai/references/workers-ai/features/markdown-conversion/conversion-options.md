---
description: Configure per-format options for Workers AI Markdown Conversion, including HTML and image settings.
title: Conversion Options
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Conversion Options

Last updated Jul 13, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

By default, the `toMarkdown` service extracts text content from your files. To further extend the capabilities of the conversion process, you can pass options to the service to control how specific file types are converted.

Options are organized by file type and are all optional.

## Available options

### Output

```typescript
{
  output?: {
    format?: 'markdown' | 'text';
  }
}
```

* `format`: controls the format of the converted content. Defaults to `markdown`. Set to `text` to receive plain text with Markdown syntax removed.

When `format` is `text`, the `format` field of the [ConversionResult](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/#conversionresult-definition) is also set to `text`.

### Images

```typescript
{
  image?: {
    descriptionLanguage?: 'en' | 'it' | 'de' | 'es' | 'fr' | 'pt';
  }
}
```

* `descriptionLanguage`: controls the language of the AI-generated image descriptions.

Caution

This option works on a _best-effort_ basis: it is not guaranteed that the resulting text will be in the desired language.

### HTML

```typescript
{
  html?: {
    hostname?: string;
    cssSelector?: string;
  }
}
```

* `hostname`: string to use as a host when resolving relative links inside the HTML.
* `cssSelector`: string containing a CSS selector pattern to pick specific elements from your HTML. Refer to [how HTML is processed](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/#html) for more details.

### PDF

```typescript
{
  pdf?: {
    metadata?: boolean;
  }
}
```

* `metadata`: Previously, all converted PDF files always included metadata information when converted. This option allows you to opt-out of this behavior.

## Examples

### Binding

To configure custom options, pass a `conversionOptions` object inside the second argument of the binding call, like this:

```typescript
await env.AI.toMarkdown(..., {
  conversionOptions: {
    html: { ... },
    pdf: { ... },
    ...
   }
})
```

### REST API

Since the REST API uses file uploads, the request's `Content-Type` will be `multipart/form-data`. As such, include a new form field with your stringified object as a value:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \
  -X POST \
  -H 'Authorization: Bearer {API_TOKEN}' \
  ...
  -F 'conversionOptions={ "html": { ... }, ... }'
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#page","headline":"Conversion Options · Cloudflare Workers AI docs","description":"Configure per-format options for Workers AI Markdown Conversion, including HTML and image settings.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
