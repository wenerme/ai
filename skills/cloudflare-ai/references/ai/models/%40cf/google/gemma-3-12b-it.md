---
title: gemma-3-12b-it
description: Gemma 3 models are well-suited for a variety of text generation and image understanding tasks, including question answering, summarization, and reasoning. Gemma 3 models are multimodal, handling text and image input and generating text output, with a large, 128K context window, multilingual support in over 140 languages, and is available in more sizes than previous versions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg)

#  gemma-3-12b-it

Text Generation • Google

`@cf/google/gemma-3-12b-it`

Gemma 3 models are well-suited for a variety of text generation and image understanding tasks, including question answering, summarization, and reasoning. Gemma 3 models are multimodal, handling text and image input and generating text output, with a large, 128K context window, multilingual support in over 140 languages, and is available in more sizes than previous versions.

| Model Info                                                                 |                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| Deprecated                                                                 | 5/30/2026                                           |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/) | 80,000 tokens                                       |
| LoRA                                                                       | Yes                                                 |
| Unit Pricing                                                               | $0.35 per M input tokens, $0.56 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[ Launch the LLM Playground ](https://playground.ai.cloudflare.com/?model=@cf/google/gemma-3-12b-it)

## Usage

* [  Worker (Streaming) ](#tab-panel-2244)
* [  TypeScript ](#tab-panel-2245)
* [  Python ](#tab-panel-2246)
* [  curl ](#tab-panel-2247)

**TypeScript**

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request, env): Promise<Response> {


    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];


    const stream = await env.AI.run("@cf/google/gemma-3-12b-it", {
      messages,
      stream: true,
    });


    return new Response(stream, {
      headers: { "content-type": "text/event-stream" },
    });
  },
} satisfies ExportedHandler<Env>;
```

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request, env): Promise<Response> {


    const messages = [
      { role: "system", content: "You are a friendly assistant" },
      {
        role: "user",
        content: "What is the origin of the phrase Hello, World",
      },
    ];
    const response = await env.AI.run("@cf/google/gemma-3-12b-it", { messages });


    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

```py
import os
import requests


ACCOUNT_ID = "your-account-id"
AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


prompt = "Tell me all about PEP-8"
response = requests.post(
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/google/gemma-3-12b-it",
    headers={"Authorization": f"Bearer {AUTH_TOKEN}"},
    json={
      "messages": [
        {"role": "system", "content": "You are a friendly assistant"},
        {"role": "user", "content": prompt}
      ]
    }
)
result = response.json()
print(result)
```

```sh
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/google/gemma-3-12b-it \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations ](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

### Input

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

guided\_json{}

`object`JSON schema that should be fufilled for the response.

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.6minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

top\_p

`number`minimum: 0maximum: 2Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.

top\_k

`integer`minimum: 1maximum: 50Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.

seed

`integer`minimum: 1maximum: 9999999999Random seed for reproducibility of the generation.

repetition\_penalty

`number`minimum: 0maximum: 2Penalty for repeated tokens; higher values discourage repetition.

frequency\_penalty

`number`minimum: 0maximum: 2Decreases the likelihood of the model repeating the same lines verbatim.

presence\_penalty

`number`minimum: 0maximum: 2Increases the likelihood of the model introducing new topics.

### Output

Synchronous — Send a request and receive a complete response

response

`string`The generated text response from the model

▶usage{}

`object`Usage statistics for the inference request

▶tool\_calls\[\]

`array`An array of tool calls requests made during the response generation

Streaming — Send a request with \`stream: true\` and receive server-sent events

type

`string`

contentType

`text/event-stream`

format

`binary`

## API Schemas (Raw)

 Synchronous Input [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/sync-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/sync-input.json "Download")

 Synchronous Output [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/sync-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/sync-output.json "Download")

 Streaming Input [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/streaming-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/streaming-input.json "Download")

 Streaming Output [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/streaming-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/streaming-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/google/gemma-3-12b-it/#page","headline":"gemma-3-12b-it (Google) · Cloudflare AI docs · Cloudflare AI docs","description":"Gemma 3 models are well-suited for a variety of text generation and image understanding tasks, including question answering, summarization, and reasoning. Gemma 3 models are multimodal, handling text and image input and generating text output, with a large, 128K context window, multilingual support in over 140 languages, and is available in more sizes than previous versions.","url":"https://developers.cloudflare.com/ai/models/%40cf/google/gemma-3-12b-it/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
