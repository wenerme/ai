---
description: Building upon Mistral Small 3 (2501), Mistral Small 3.1 (2503) adds state-of-the-art vision understanding and enhances long context capabilities up to 128k tokens without compromising text performance. With 24 billion parameters, this model achieves top-tier capabilities in both text and vision tasks.
title: mistral-small-3.1-24b-instruct
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![MistralAI logo](https://developers.cloudflare.com/_astro/mistralai.Bn9UMUMu.svg)

# mistral-small-3.1-24b-instruct

Text Generation • MistralAI

Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/models/mistral-small-3.1-24b-instruct/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cf/mistralai/mistral-small-3.1-24b-instruct`

* Cloudflare-hosted
* Function calling

Building upon Mistral Small 3 (2501), Mistral Small 3.1 (2503) adds state-of-the-art vision understanding and enhances long context capabilities up to 128k tokens without compromising text performance. With 24 billion parameters, this model achieves top-tier capabilities in both text and vision tasks.

| Model Info                                                                            |                                                     |
| ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/platform/glossary/)   | 128,000 tokens                                      |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling/) | Yes                                                 |
| Unit Pricing                                                                          | $0.35 per M input tokens, $0.56 per M output tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and is an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/mistralai/mistral-small-3.1-24b-instruct)

## Usage

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

    const stream = await env.AI.run("@cf/mistralai/mistral-small-3.1-24b-instruct", {
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
    const response = await env.AI.run("@cf/mistralai/mistral-small-3.1-24b-instruct", { messages });

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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/mistralai/mistral-small-3.1-24b-instruct",
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

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/mistralai/mistral-small-3.1-24b-instruct \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

### Input

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

guided\_json{}

`object`JSON schema that should be fulfilled for the response.

raw

`boolean`default: falseIf true, a chat template is not applied and you must adhere to the specific model's expected formatting.

stream

`boolean`default: falseIf true, the response will be streamed back incrementally using SSE, Server Sent Events.

max\_tokens

`integer`default: 256The maximum number of tokens to generate in the response.

temperature

`number`default: 0.15minimum: 0maximum: 5Controls the randomness of the output; higher values produce more random results.

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

SynchronousInput

SynchronousOutput

StreamingInput

StreamingOutput

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/models/mistral-small-3.1-24b-instruct/#page","headline":"mistral-small-3.1-24b-instruct (MistralAI) · Cloudflare AI docs · Cloudflare Workers AI docs","description":"Building upon Mistral Small 3 (2501), Mistral Small 3.1 (2503) adds state-of-the-art vision understanding and enhances long context capabilities up to 128k tokens without compromising text performance. With 24 billion parameters, this model achieves top-tier capabilities in both text and vision tasks.","url":"https://developers.cloudflare.com/workers-ai/models/mistral-small-3.1-24b-instruct/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
