---
title: moondream3.1-9B-A2B
description: Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Moondream logo](https://developers.cloudflare.com/_astro/moondream.D8EsrOAZ.svg)

#  moondream3.1-9B-A2B

Image-to-Text • Moondream

`@cf/moondream/moondream3.1-9B-A2B`

Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.

| Model Info   |                                                     |
| ------------ | --------------------------------------------------- |
| Vision       | Yes                                                 |
| Unit Pricing | $0.30 per M input tokens, $1.00 per M output tokens |

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
      "@cf/moondream/moondream3.1-9B-A2B",
      input
      );
    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
```

## Parameters

* [ Input ](#tab-panel-5268)
* [ Output ](#tab-panel-5269)

task

`string`default: queryenum: query, caption, point, detectWhich Moondream skill to run.

image

`string`Input image as a public HTTPS URL or base64 data URI. Optional for \`query\`; required for \`caption\`, \`point\`, and \`detect\`.

question

`string`default: What's in this image?Question for the \`query\` task.

caption\_length

`string`default: normalenum: short, normal, longCaption length for the \`caption\` task.

target

`string`default: personObject phrase to locate for \`point\` and \`detect\` tasks (e.g. 'person wearing a red shirt').

reasoning

`boolean`default: trueEnable reasoning trace for the \`query\` task.

temperature

`number`default: 0.2minimum: 0maximum: 2Sampling temperature.

top\_p

`number`default: 0.9minimum: 0maximum: 1Top-p (nucleus) sampling.

max\_tokens

`integer`default: 8192minimum: 1maximum: 28672Max tokens to generate for \`query\` and \`caption\`.

max\_objects

`integer`default: 150minimum: 1maximum: 500Max objects to return for \`point\` and \`detect\`.

stream

`boolean`default: trueReturn incremental tokens for \`query\` and \`caption\`. \`point\` and \`detect\` do not support streaming.

finish\_reason

`string`Reason the generation finished.

▶metrics{}

`object`

answer

`string`Answer text for the \`query\` task. Null for other tasks.

caption

`string`Caption text for the \`caption\` task. Null for other tasks.

▶points\[\]

`array`Located points for the \`point\` task. Null for other tasks.

▶objects\[\]

`array`Detected bounding boxes for the \`detect\` task. Null for other tasks.

▶reasoning{}

`object`Reasoning trace for the \`query\` task when reasoning=true. Null otherwise.

## API Schemas (Raw)

Input [ ](https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/schema-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/schema-input.json "Download")

Output [ ](https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/schema-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/schema-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/#page","headline":"moondream3.1-9B-A2B (Moondream) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Moondream 3 is a fast, efficient 9B mixture-of-experts vision language model (2B active parameters) that delivers frontier-level visual reasoning for tasks like object detection, pointing, OCR, and structured output.","url":"https://developers.cloudflare.com/workers-ai/models/moondream3.1-9B-A2B/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
