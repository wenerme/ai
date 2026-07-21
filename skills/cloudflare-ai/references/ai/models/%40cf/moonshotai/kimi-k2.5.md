---
title: kimi-k2.5
description: Kimi K2.5 is a frontier-scale open-source model with a 256k context window, multi-turn tool calling, vision inputs, and structured outputs for agentic workloads.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

![Moonshot AI logo](https://developers.cloudflare.com/_astro/moonshotai.D9EBG7kx.svg)

#  kimi-k2.5

Text Generation • Moonshot AI

`@cf/moonshotai/kimi-k2.5`

Kimi K2.5 is a frontier-scale open-source model with a 256k context window, multi-turn tool calling, vision inputs, and structured outputs for agentic workloads.

| Model Info                                                                           |                                                                                      |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Deprecated                                                                           | 5/30/2026                                                                            |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/)           | 256,000 tokens                                                                       |
| Terms and License                                                                    | [link ↗](https://github.com/MoonshotAI/Kimi-K2.5/blob/master/LICENSE)                |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling) | Yes                                                                                  |
| Reasoning                                                                            | Yes                                                                                  |
| Vision                                                                               | Yes                                                                                  |
| Batch                                                                                | Yes                                                                                  |
| Unit Pricing                                                                         | $0.60 per M input tokens, $3.00 per M output tokens, $0.10 per M cached input tokens |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[ Launch the LLM Playground ](https://playground.ai.cloudflare.com/?model=@cf/moonshotai/kimi-k2.5)

## Usage

* [  Worker (Streaming) ](#tab-panel-2467)
* [  TypeScript ](#tab-panel-2468)
* [  Python ](#tab-panel-2469)
* [  curl ](#tab-panel-2470)

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


    const stream = await env.AI.run("@cf/moonshotai/kimi-k2.5", {
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
    const response = await env.AI.run("@cf/moonshotai/kimi-k2.5", { messages });


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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/moonshotai/kimi-k2.5",
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/moonshotai/kimi-k2.5 \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations ](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response

* [ Input ](#tab-panel-2471)
* [ Output ](#tab-panel-2472)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

model

`string`ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

`object`Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

`number | null`Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

`object | null`Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

`boolean | null`Whether to return log probabilities of the output tokens.

top\_logprobs

`integer | null`How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

`integer | null`Deprecated in favor of max\_completion\_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

`integer | null`An upper bound for the number of tokens that can be generated for a completion.

metadata

`object | null`Set of 16 key-value pairs that can be attached to the object.

modalities

`array | null`Output types requested from the model (e.g. \['text'\] or \['text', 'audio'\]).

n

`integer | null`How many chat completion choices to generate for each input message.

parallel\_tool\_calls

`boolean`default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

`object`

presence\_penalty

`number | null`Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

`string | null`Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

`object`

▶response\_format

`one of`Specifies the format the model must output.

seed

`integer | null`If specified, the system will make a best effort to sample deterministically.

service\_tier

`string | null`Specifies the processing type used for serving the request.

▶stop

`one of`

store

`boolean | null`Whether to store the output for model distillation / evals.

stream

`boolean | null`If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

`object`

temperature

`number | null`Sampling temperature between 0 and 2.

▶tool\_choice

`one of`Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[\]

`array`A list of tools the model may call.

top\_p

`number | null`Nucleus sampling: considers the results of the tokens with top\_p probability mass.

user

`string`A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

`object`Options for the web search tool (when using built-in web search).

▶function\_call

`one of`

▶functions\[\]

`array`minItems: 1maxItems: 128

id

`string`A unique identifier for the chat completion.

object

`string`

created

`integer`Unix timestamp (seconds) of when the completion was created.

model

`string`The model used for the chat completion.

▶choices\[\]

`array`minItems: 1

▶usage{}

`object`

system\_fingerprint

`string | null`

service\_tier

`string | null`

Streaming — Send a request with \`stream: true\` and receive server-sent events

* [ Input ](#tab-panel-2473)
* [ Output ](#tab-panel-2474)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

model

`string`ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').

▶audio{}

`object`Parameters for audio output. Required when modalities includes 'audio'.

frequency\_penalty

`number | null`Penalizes new tokens based on their existing frequency in the text so far.

logit\_bias

`object | null`Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.

logprobs

`boolean | null`Whether to return log probabilities of the output tokens.

top\_logprobs

`integer | null`How many top log probabilities to return at each token position (0-20). Requires logprobs=true.

max\_tokens

`integer | null`Deprecated in favor of max\_completion\_tokens. The maximum number of tokens to generate.

max\_completion\_tokens

`integer | null`An upper bound for the number of tokens that can be generated for a completion.

metadata

`object | null`Set of 16 key-value pairs that can be attached to the object.

modalities

`array | null`Output types requested from the model (e.g. \['text'\] or \['text', 'audio'\]).

n

`integer | null`How many chat completion choices to generate for each input message.

parallel\_tool\_calls

`boolean`default: trueWhether to enable parallel function calling during tool use.

▶prediction{}

`object`

presence\_penalty

`number | null`Penalizes new tokens based on whether they appear in the text so far.

reasoning\_effort

`string | null`Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.).

▶chat\_template\_kwargs{}

`object`

▶response\_format

`one of`Specifies the format the model must output.

seed

`integer | null`If specified, the system will make a best effort to sample deterministically.

service\_tier

`string | null`Specifies the processing type used for serving the request.

▶stop

`one of`

store

`boolean | null`Whether to store the output for model distillation / evals.

stream

`boolean | null`If true, partial message deltas will be sent as server-sent events.

▶stream\_options{}

`object`

temperature

`number | null`Sampling temperature between 0 and 2.

▶tool\_choice

`one of`Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.

▶tools\[\]

`array`A list of tools the model may call.

top\_p

`number | null`Nucleus sampling: considers the results of the tokens with top\_p probability mass.

user

`string`A unique identifier representing your end-user, for abuse monitoring.

▶web\_search\_options{}

`object`Options for the web search tool (when using built-in web search).

▶function\_call

`one of`

▶functions\[\]

`array`minItems: 1maxItems: 128

type

`string`

contentType

`text/event-stream`

format

`binary`

Batch — Send multiple requests in a single API call

* [ Input ](#tab-panel-2475)
* [ Output ](#tab-panel-2476)

▶requests\[\]

`array`

id

`string`A unique identifier for the chat completion.

object

`string`

created

`integer`Unix timestamp (seconds) of when the completion was created.

model

`string`The model used for the chat completion.

▶choices\[\]

`array`minItems: 1

▶usage{}

`object`

system\_fingerprint

`string | null`

service\_tier

`string | null`

## API Schemas (Raw)

 Synchronous Input [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/sync-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/sync-input.json "Download")

 Synchronous Output [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/sync-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/sync-output.json "Download")

 Streaming Input [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/streaming-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/streaming-input.json "Download")

 Streaming Output [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/streaming-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/streaming-output.json "Download")

 Batch Input [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/batch-input.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/batch-input.json "Download")

 Batch Output [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/batch-output.json "Open") [ ](https://developers.cloudflare.com/workers-ai/models/kimi-k2.5/batch-output.json "Download")

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/%40cf/moonshotai/kimi-k2.5/#page","headline":"kimi-k2.5 (Moonshot AI) · Cloudflare AI docs · Cloudflare AI docs","description":"Kimi K2.5 is a frontier-scale open-source model with a 256k context window, multi-turn tool calling, vision inputs, and structured outputs for agentic workloads.","url":"https://developers.cloudflare.com/ai/models/%40cf/moonshotai/kimi-k2.5/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai/","name":"AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai/models/","name":"Models"}}]}
```
