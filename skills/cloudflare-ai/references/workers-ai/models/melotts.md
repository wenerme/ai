---
description: MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.
title: melotts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MyShell logo](https://developers.cloudflare.com/_astro/myshell.6ROagMV2.svg)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/melotts/#page","headline":"melotts (MyShell) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"MeloTTS is a high-quality multi-lingual text-to-speech library by MyShell.ai.","url":"https://developers.cloudflare.com/workers-ai/models/melotts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
