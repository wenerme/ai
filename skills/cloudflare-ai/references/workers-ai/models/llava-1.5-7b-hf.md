---
title: llava-1.5-7b-hf
description: LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

 l

#  llava-1.5-7b-hf Beta

Image-to-Text • llava-hf

`@cf/llava-hf/llava-1.5-7b-hf`

LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture.

| Model Info |     |
| ---------- | --- |
| Beta       | Yes |

## Usage

**TypeScript**

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const res = await fetch("https://cataas.com/cat");
    const blob = await res.arrayBuffer();
    const input = {
      image: [...new Uint8Array(blob)],
      prompt: "Generate a caption for this image",
      max_tokens: 512,
    };
    const response = await env.AI.run(
      "@cf/llava-hf/llava-1.5-7b-hf",
      input
      );
    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
```

## Parameters

* [ Input ](#tab-panel-5215)
* [ Output ](#tab-panel-5216)

Option 1

stringformat: binary

Binary string representing the image contents.

▶Option 2{}

object

description

`string`

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/#page","headline":"llava-1.5-7b-hf (llava-hf) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"LLaVA is an open-source chatbot trained by fine-tuning LLaMA/Vicuna on GPT-generated multimodal instruction-following data. It is an auto-regressive language model, based on the transformer architecture.","url":"https://developers.cloudflare.com/workers-ai/models/llava-1.5-7b-hf/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
