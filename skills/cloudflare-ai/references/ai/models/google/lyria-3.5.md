---
description: Google's Lyria 3.5 model generates full-length MP3 songs from text prompts and optional image prompts.
title: Lyria 3.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

# Lyria 3.5

Music Generation • Google

Model ID

`google/lyria-3.5` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party
- Zero data retention

Google's Lyria 3.5 model generates full-length MP3 songs from text prompts and optional image prompts.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/music/generate-music) |
| Zero data retention | Yes |
| Pricing | <ul><li>Per track$0.08</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'google/lyria-3.5',
  {
    prompt:
      'A soulful alternative pop song about starting over, with two verses, a memorable chorus, a contrasting bridge, warm electric piano, expressive vocals, and a powerful final chorus',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "google/lyria-3.5",
  "input": {
    "prompt": "A soulful alternative pop song about starting over, with two verses, a memorable chorus, a contrasting bridge, warm electric piano, expressive vocals, and a powerful final chorus"
  }
}'
```

```json
{
  "state": "Completed",
  "result": {
    "audio": "https://examples.aig.cloudflare.com/google/lyria-3.5/full-length-alternative-pop.mp3"
  }
}
```

## Parameters

prompt

`string`requiredminLength: 1maxLength: 5000

image

`string`minLength: 1Base64-encoded image used as visual inspiration

audio

`string`Generated music as an audio URL

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/google/lyria-3.5/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/google/lyria-3.5/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/google/lyria-3.5/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/google/lyria-3.5/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/google/lyria-3.5/#page","headline":"Lyria 3.5","description":"Google's Lyria 3.5 model generates full-length MP3 songs from text prompts and optional image prompts.","url":"https://developers.cloudflare.com/ai/models/google/lyria-3.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
