---
title: Getting started
description: In this guide, you will learn how to set up and use your first AI Gateway.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Getting started

**Last reviewed:**  almost 2 years ago 

In this guide, you will learn how to set up and use your first AI Gateway.

## Get your account ID and authentication token

Before making requests, you need two things:

1. Your **Account ID** — find it in the [Cloudflare dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
2. A **Cloudflare API token** — [create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `AI Gateway - Read` and `AI Gateway - Edit` permissions. The example below also uses Workers AI, so add `Workers AI - Read` as well.

## Send your first request

Run the following command to make your first request through AI Gateway:

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/$CLOUDFLARE_ACCOUNT_ID/default/compat/chat/completions \

  --header "cf-aig-authorization: Bearer $CLOUDFLARE_API_TOKEN" \

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

Note

AI Gateway automatically creates a gateway for you on the first request. The gateway is created with [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) turned on, so the `cf-aig-authorization` header is required for all requests. For more details on how the default gateway works, refer to [Default gateway](https://developers.cloudflare.com/ai-gateway/configuration/manage-gateway/#default-gateway).

Create a gateway manually

You can also create gateways manually with a custom name and configuration through the dashboard or API.

* [ Dashboard ](#tab-panel-3056)
* [ API ](#tab-panel-3057)

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select **Create Gateway**.
4. Enter your **Gateway name**. Note: Gateway name has a 64 character limit.
5. Select **Create**.

To set up an AI Gateway using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
   * `AI Gateway - Read`  
   * `AI Gateway - Edit`
2. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to the Cloudflare API.

## Provider authentication

Authenticate with your upstream AI provider using one of the following options:

* **Unified Billing:** Use the AI Gateway billing to pay for and authenticate your inference requests. Refer to [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/).
* **BYOK (Store Keys):** Store your own provider API Keys with Cloudflare, and AI Gateway will include them at runtime. Refer to [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
* **Request headers:** Include your provider API Key in the request headers as you normally would (for example, `Authorization: Bearer <OPENAI_API_KEY>`).

## Integration options

### Unified API Endpoint

OpenAI Compatible Recommended   
  
The easiest way to get started with AI Gateway is through our OpenAI-compatible `/chat/completions` endpoint. This allows you to use existing OpenAI SDKs and tools with minimal code changes while gaining access to multiple AI providers.

`https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions`

**Key benefits:**

* Drop-in replacement for OpenAI API, works with existing OpenAI SDKs and other OpenAI compliant clients
* Switch between providers by changing the `model` parameter
* Dynamic Routing - Define complex routing scenarios requiring conditional logic, conduct A/B tests, set rate / budget limits, etc

#### Example:

Make a request to 

![]() OpenAI

using 

OpenAI JS SDK

with 

Stored Key (BYOK)

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

```

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

Refer to [Unified API](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) to learn more about OpenAI compatibility.

### Provider-specific endpoints

For direct integration with specific AI providers, use dedicated endpoints that maintain the original provider's API schema while adding AI Gateway features.

```

https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}


```

**Available providers:**

* [OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/openai/) \- GPT models and embeddings
* [Anthropic](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/) \- Claude models
* [Google AI Studio](https://developers.cloudflare.com/ai-gateway/usage/providers/google-ai-studio/) \- Gemini models
* [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/) \- Cloudflare's inference platform
* [AWS Bedrock](https://developers.cloudflare.com/ai-gateway/usage/providers/bedrock/) \- Amazon's managed AI service
* [Azure OpenAI](https://developers.cloudflare.com/ai-gateway/usage/providers/azureopenai/) \- Microsoft's OpenAI service
* [and more...](https://developers.cloudflare.com/ai-gateway/usage/providers/)

## Next steps

* Learn more about [caching](https://developers.cloudflare.com/ai-gateway/features/caching/) for faster requests and cost savings and [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) to control how your application scales.
* Explore how to specify model or provider [fallbacks, ratelimits, A/B tests](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) for resiliency.
* Learn how to use low-cost, open source models on [Workers AI](https://developers.cloudflare.com/ai-gateway/usage/providers/workersai/) \- our AI inference service.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/get-started/","name":"Getting started"}}]}
```
