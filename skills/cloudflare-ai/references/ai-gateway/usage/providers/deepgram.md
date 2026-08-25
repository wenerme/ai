---
description: Route Deepgram speech-to-text and text-to-speech requests through AI Gateway for observability and control.
title: Deepgram
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Deepgram

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/deepgram/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Deepgram ↗](https://developers.deepgram.com/home) provides Voice AI APIs for speech-to-text, text-to-speech, and voice agents.

Note

Deepgram is also available through Workers AI, see [Deepgram Workers AI](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/realtime-api/#deepgram-workers-ai).

## Endpoint

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram
```

## URL Structure

When making requests to Deepgram, replace `https://api.deepgram.com/` in the URL you are currently using with `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram/`.

## Prerequisites

When making requests to Deepgram, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Deepgram API token.

## Example

### SDK

```ts
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";


const deepgram = createClient("{deepgram_api_key}", {
    global: {
      websocket: {
        options: {
          url: "wss://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/deepgram/",
          _nodeOnlyHeaders: {
            "cf-aig-authorization": "Bearer {CF_AIG_TOKEN}"
          }
        }
      }
    }
});


const connection = deepgram.listen.live({
    model: "nova-3",
    language: "en-US",
    smart_format: true,
});

connection.send(...);
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/deepgram/#page","headline":"Deepgram · Cloudflare AI Gateway docs","description":"Route Deepgram speech-to-text and text-to-speech requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/deepgram/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
