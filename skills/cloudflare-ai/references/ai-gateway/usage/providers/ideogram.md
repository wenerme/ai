---
description: Route Ideogram image generation requests through AI Gateway for observability and control.
title: Ideogram
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Ideogram

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/providers/ideogram/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Ideogram ↗](https://ideogram.ai/) provides advanced text-to-image generation models with exceptional text rendering capabilities and visual quality.

## Endpoint

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/ideogram
```

## Prerequisites

When making requests to Ideogram, ensure you have the following:

* Your AI Gateway Account ID.
* Your AI Gateway gateway name.
* An active Ideogram API key.
* The name of the Ideogram model you want to use (e.g., `V_3`).

## Examples

### cURL

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/ideogram/v1/ideogram-v3/generate \
  --header 'Api-Key: {ideogram_api_key}' \
  --header 'Content-Type: application/json' \
  --data '{
    "prompt": "A serene landscape with mountains and a lake at sunset",
    "model": "V_3"
  }'
```

### Use with JavaScript

```js
const accountId = "{account_id}";
const gatewayId = "{gateway_id}";
const ideogramApiKey = "{ideogram_api_key}";
const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/ideogram`;

const response = await fetch(`${baseURL}/v1/ideogram-v3/generate`, {
  method: "POST",
  headers: {
    "Api-Key": ideogramApiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "A serene landscape with mountains and a lake at sunset",
    model: "V_3",
  }),
});

const result = await response.json();
console.log(result);
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/providers/ideogram/#page","headline":"Ideogram · Cloudflare AI Gateway docs","description":"Route Ideogram image generation requests through AI Gateway for observability and control.","url":"https://developers.cloudflare.com/ai-gateway/usage/providers/ideogram/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
