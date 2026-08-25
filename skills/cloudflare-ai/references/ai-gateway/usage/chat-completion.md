---
description: Send requests to multiple AI providers through a single OpenAI-compatible endpoint on AI Gateway.
title: Unified API (OpenAI compat)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Unified API (OpenAI compat)

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecated for single-model calls

For standard single-model chat completions, this endpoint is deprecated. Use the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) instead, which provides OpenAI-compatible endpoints at `api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1/chat/completions`. The `/compat/chat/completions` endpoint will continue to work for existing integrations.

Required for dynamic routing

[Dynamic routes](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) (`dynamic/{route}`) are invoked through this `/compat/chat/completions` endpoint. The REST API does not currently cover dynamic routing, so continue to use this endpoint when calling a dynamic route. See [Using a dynamic route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/usage/) for examples.

Cloudflare's AI Gateway offers an OpenAI-compatible `/chat/completions` endpoint, enabling integration with multiple AI providers using a single URL. This feature simplifies the integration process, allowing for seamless switching between different models without significant code modifications.

## Endpoint URL

```txt
https://gateway.ai.cloudflare.com/v1/{account_id}/default/compat/chat/completions
```

Replace `{account_id}` with your Cloudflare account ID. The `default` gateway is created automatically on your first request — no setup needed. You can also replace `default` with a specific gateway ID if you have already created one.

## Parameters

Switch providers by changing the `model` and `apiKey` parameters.

Specify the model using `{provider}/{model}` format. For example:

* `openai/gpt-5-mini`
* `google-ai-studio/gemini-2.5-flash`
* `anthropic/claude-sonnet-4-5`

## Examples

Make a request to

![]() OpenAI

using

OpenAI JS SDK

with

Stored Key (BYOK)

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "openai/gpt-5.2",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "anthropic/claude-4-5-sonnet",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "google/gemini-2.5-pro",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "grok/grok-4",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "dynamic/customer-support",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{openai_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "openai/gpt-5.2",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{anthropic_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "anthropic/claude-4-5-sonnet",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{google_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "google/gemini-2.5-pro",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{grok_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "grok/grok-4",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{dynamic_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "dynamic/customer-support",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{workers-ai_api_token}",
  defaultHeaders: {
      // if gateway is authenticated
      "cf-aig-authorization": `Bearer {cf_api_token}`,
  },
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	messages: [{ role: "user", content: "Hello, world!" }],
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('openai/gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('anthropic/claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('google/gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('grok/grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('dynamic/customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('openai/gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('anthropic/claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('google/gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('grok/grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('dynamic/customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from 'ai-gateway-provider/providers/openai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const openai = createOpenAI();

const { text } = await generateText({
  model: aigateway(openai.chat('gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const anthropic = createAnthropic();

const { text } = await generateText({
  model: aigateway(anthropic('claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createGoogle } from 'ai-gateway-provider/providers/google';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const google = createGoogle();

const { text } = await generateText({
  model: aigateway(google('gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createXai } from 'ai-gateway-provider/providers/xai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const xai = createXai();

const { text } = await generateText({
  model: aigateway(xai('grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified();

const { text } = await generateText({
  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from 'ai-gateway-provider/providers/openai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const openai = createOpenAI({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(openai.chat('gpt-5.2')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createAnthropic } from 'ai-gateway-provider/providers/anthropic';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const anthropic = createAnthropic({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(anthropic('claude-4-5-sonnet')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createGoogle } from 'ai-gateway-provider/providers/google';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const google = createGoogle({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(google('gemini-2.5-pro')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createXai } from 'ai-gateway-provider/providers/xai';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const xai = createXai({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(xai('grok-4')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('customer-support')),
  prompt: 'What is Cloudflare?',
});
```

```javascript
import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({ apiKey: '{API_KEY}' });

const { text } = await generateText({
  model: aigateway(unified('@cf/meta/llama-3.3-70b-instruct-fp8-fast')),
  prompt: 'What is Cloudflare?',
});
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "openai/gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-4-5-sonnet",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemini-2.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "grok/grok-4",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/customer-support",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {openai_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "openai/gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {anthropic_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-4-5-sonnet",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {google_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "google/gemini-2.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {grok_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "grok/grok-4",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {dynamic_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/customer-support",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

```bash
curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \
  --header 'Authorization: Bearer {workers-ai_api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

## Supported Providers

The OpenAI-compatible endpoint supports models from the following providers:

* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/)
* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/)
* [Groq](https://developers.cloudflare.com/ai-gateway/usage/providers/groq/)
* [Mistral](https://developers.cloudflare.com/ai-gateway/usage/providers/mistral/)
* [Cohere](https://developers.cloudflare.com/ai-gateway/usage/providers/cohere/)
* [Perplexity](https://developers.cloudflare.com/ai-gateway/usage/providers/perplexity/)
* [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/)
* [Google-AI-Studio](https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/)
* [Google Vertex AI](https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/)
* [xAI](https://developers.cloudflare.com/ai-gateway/usage/providers/grok/)
* [DeepSeek](https://developers.cloudflare.com/ai-gateway/usage/providers/deepseek/)
* [Cerebras](https://developers.cloudflare.com/ai-gateway/usage/providers/cerebras/)
* [Baseten](https://developers.cloudflare.com/ai-gateway/usage/providers/baseten/)
* [Parallel](https://developers.cloudflare.com/ai-gateway/usage/providers/parallel/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/usage/chat-completion/#page","headline":"Unified API (OpenAI compat) · Cloudflare AI Gateway docs","description":"Send requests to multiple AI providers through a single OpenAI-compatible endpoint on AI Gateway.","url":"https://developers.cloudflare.com/ai-gateway/usage/chat-completion/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
