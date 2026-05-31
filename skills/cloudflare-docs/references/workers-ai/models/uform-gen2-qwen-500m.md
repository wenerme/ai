---
title: uform-gen2-qwen-500m
description: UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Unum logo](https://developers.cloudflare.com/_astro/unum.Cjjoj0_o.svg) 

#  uform-gen2-qwen-500m Beta 

Image-to-Text • Unum • Hosted 

`@cf/unum/uform-gen2-qwen-500m` 

UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering. The model was pre-trained on the internal image captioning dataset and fine-tuned on public instructions datasets: SVIT, LVIS, VQAs datasets.

| Model Info       |                                   |
| ---------------- | --------------------------------- |
| Deprecated       | 5/30/2026                         |
| More information | [link ↗](https://www.unum.cloud/) |
| Beta             | Yes                               |

## Usage

TypeScript

```

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

      "@cf/unum/uform-gen2-qwen-500m",

      input

      );

    return new Response(JSON.stringify(response));

  },

} satisfies ExportedHandler<Env>;


```

## Parameters

* [ Input ](#tab-panel-4169)
* [ Output ](#tab-panel-4170)

Option 1

stringformat: binary

Binary string representing the image contents.

▶Option 2{}

object

description

`string`

## API Schemas (Raw)

Input 

Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
