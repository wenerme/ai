---
description: DeepSeek V4.1 Flash is a language model from DeepSeek, available through Cloudflare Workers AI and Subconscious, with PrimaLabs as a fallback.
title: DeepSeek V4.1 Flash
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![DeepSeek logo](https://developers.cloudflare.com/_astro/deepseek.CkzAgvN6.svg)

# DeepSeek V4.1 Flash

Text Generation • DeepSeek

Model ID

`deepseek-ai/deepseek-v4.1-flash-1017` Copy

Use with the [Workers AI binding](https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/), the AI Gateway [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), or the [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/).

Calling the provider directly? Use the provider's model name instead, including with [provider-native endpoints](https://developers.cloudflare.com/ai-gateway/usage/providers/) or the provider's own SDK. For example, Anthropic's name for `anthropic/claude-opus-4.8` is `claude-opus-4-8`.

- Third-party

DeepSeek V4.1 Flash is a language model from DeepSeek, available through Cloudflare Workers AI and Subconscious, with PrimaLabs as a fallback.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://api-docs.deepseek.com/) |
| Request formats | Chat Completions, Responses |
| Pricing | <ul><li>Input (per 1M tokens)$0.30</li><li>Cached input (per 1M tokens)$0.007</li><li>Output (per 1M tokens)$1.20</li></ul> |

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

    const stream = await env.AI.run("deepseek-ai/deepseek-v4.1-flash-1017", {
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
    const response = await env.AI.run("deepseek-ai/deepseek-v4.1-flash-1017", { messages });

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
  f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/deepseek-ai/deepseek-v4.1-flash-1017",
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
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/deepseek-ai/deepseek-v4.1-flash-1017 \
  -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \
  -d '{ "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good" }]}'
```

OpenAI compatible endpoints

Workers AI also supports OpenAI compatible API endpoints for `/v1/chat/completions` and `/v1/embeddings`. For more details, refer to [Configurations](https://developers.cloudflare.com/workers-ai/configuration/open-ai-compatibility/) .

## Parameters

Schema variant

Chat CompletionsResponses

▶messages\[]

`array`required

temperature

`number`minimum: 0maximum: 2

max\_tokens

`number`exclusiveMinimum: 0

max\_completion\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

frequency\_penalty

`number`minimum: -2maximum: 2

presence\_penalty

`number`minimum: -2maximum: 2

stream

`boolean`

▶stream\_options{}

`object`

▶tools\[]

`array`

tool\_choice

response\_format

▶modalities\[]

`array`

▶audio{}

`object`

reasoning\_effort

`string`Optional reasoning control; availability and accepted values are model-dependent.

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`

created

`number`

model

`string`

▶choices\[]

`array`

▶usage{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/#page","headline":"DeepSeek V4.1 Flash","description":"DeepSeek V4.1 Flash is a language model from DeepSeek, available through Cloudflare Workers AI and Subconscious, with PrimaLabs as a fallback.","url":"https://developers.cloudflare.com/ai/models/deepseek-ai/deepseek-v4.1-flash-1017/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
