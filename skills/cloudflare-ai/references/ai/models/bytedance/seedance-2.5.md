---
description: ByteDance's audio-video generation model for creating 30-second videos with reference control and editing capabilities. It supports extended storytelling, audio and visual editing, white-model control, and green-screen editing.
title: Seedance 2.5
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![ByteDance logo](https://developers.cloudflare.com/_astro/bytedance.T1uiROQ6.svg)

# Seedance 2.5

Text-to-Video • ByteDance

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai/models/bytedance/seedance-2.5/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`bytedance/seedance-2.5`

* Third-party

ByteDance's audio-video generation model for creating 30-second videos with reference control and editing capabilities. It supports extended storytelling, audio and visual editing, white-model control, and green-screen editing.

| Model Info       |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| More information | [link ↗](https://seed.bytedance.com/en/seedance2%5F5)                                                                    |
| Pricing          | [View pricing in the Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/ai/models/bytedance/seedance-2.5) |

## Usage

```ts
const response = await env.AI.run(
  'bytedance/seedance-2.5',
  {
    prompt:
      'A rain-soaked city street at night. A cyclist passes glowing storefronts as distant traffic and rainfall create a quiet urban soundtrack.',
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "bytedance/seedance-2.5",
  "input": {
    "prompt": "A rain-soaked city street at night. A cyclist passes glowing storefronts as distant traffic and rainfall create a quiet urban soundtrack."
  }
}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.5/#page","headline":"Seedance 2.5 (ByteDance) · Cloudflare AI docs · Cloudflare AI docs","description":"ByteDance's audio-video generation model for creating 30-second videos with reference control and editing capabilities. It supports extended storytelling, audio and visual editing, white-model control, and green-screen editing.","url":"https://developers.cloudflare.com/ai/models/bytedance/seedance-2.5/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
