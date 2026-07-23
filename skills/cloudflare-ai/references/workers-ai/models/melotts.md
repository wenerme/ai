---
description: MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.
title: melotts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MyShell logo](https://developers.cloudflare.com/_astro/myshell.BpTDMxd2.svg)

# melotts

Text-to-Speech • MyShell

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/melotts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/myshell-ai/melotts`

* Cloudflare-hosted

MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.

| Model Info   |                          |
| ------------ | ------------------------ |
| Unit Pricing | $0.0002 per audio minute |

## Parameters

prompt

`string`requiredminLength: 1A text description of the audio you want to generate

lang

`string`default: enThe speech language (e.g., 'en' for English, 'fr' for French). Defaults to 'en' if not specified

▶Option 1{}

objectcontentType: application/json

Option 2

stringcontentType: audio/mpegformat: binary

The generated audio in MP3 format

## API Schemas (Raw)

Input

Output

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/melotts/#page","headline":"melotts (MyShell) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.","url":"https://developers.cloudflare.com/workers-ai/models/melotts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
