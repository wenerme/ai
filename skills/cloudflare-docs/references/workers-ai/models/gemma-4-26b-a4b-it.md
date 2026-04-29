---
title: gemma-4-26b-a4b-it
description: Gemma 4 is Google's most intelligent family of open models, built from Gemini 3 research to maximize intelligence-per-parameter.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

![Google logo](https://developers.cloudflare.com/_astro/google.DyXKPTPP.svg) 

#  gemma-4-26b-a4b-it 

Text Generation • Google • Hosted 

`@cf/google/gemma-4-26b-a4b-it` 

Gemma 4 is Google's most intelligent family of open models, built from Gemini 3 research to maximize intelligence-per-parameter.

| Model Info                                                                           |                                                                |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Context Window[ ↗](https://developers.cloudflare.com/workers-ai/glossary/)           | 256,000 tokens                                                 |
| Terms and License                                                                    | [link ↗](https://ai.google.dev/gemma/docs/gemma%5F4%5Flicense) |
| Function calling [ ↗](https://developers.cloudflare.com/workers-ai/function-calling) | Yes                                                            |
| Reasoning                                                                            | Yes                                                            |
| Vision                                                                               | Yes                                                            |
| Unit Pricing                                                                         | $0.10 per M input tokens, $0.30 per M output tokens            |

## Playground

Try out this model with Workers AI LLM Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=@cf/google/gemma-4-26b-a4b-it) 

## Usage

* [  Worker (Streaming) ](#tab-panel-2552)
* [  TypeScript ](#tab-panel-2553)
* [  Python ](#tab-panel-2554)
* [  curl ](#tab-panel-2555)

TypeScript

```

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


    const stream = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {

      messages,

      stream: true,

    });


    return new Response(stream, {

      headers: { "content-type": "text/event-stream" },

    });

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

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

    const response = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", { messages });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

```

import os

import requests


ACCOUNT_ID = "your-account-id"

AUTH_TOKEN = os.environ.get("CLOUDFLARE_AUTH_TOKEN")


prompt = "Tell me all about PEP-8"

response = requests.post(

  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/google/gemma-4-26b-a4b-it",

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

Explain Code

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/google/gemma-4-26b-a4b-it \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'


```

OpenAI compatible endpoints 

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/).

## Parameters

Synchronous — Send a request and receive a complete response 

* [ Input ](#tab-panel-2556)
* [ Output ](#tab-panel-2557)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

skip\_special\_tokens

`boolean`default: false

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

* [ Input ](#tab-panel-2558)
* [ Output ](#tab-panel-2559)

Input format

Prompt

Simple text input for single-turn interactions

Messages

Structured conversation format with roles (user, assistant, system)

prompt

`string`requiredminLength: 1The input text prompt for the model to generate a response.

skip\_special\_tokens

`boolean`default: false

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

* [ Input ](#tab-panel-2560)
* [ Output ](#tab-panel-2561)

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

Synchronous Input 

Synchronous Output 

Streaming Input 

Streaming Output 

Batch Input 

Batch Output 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/models/","name":"Models"}}]}
```
