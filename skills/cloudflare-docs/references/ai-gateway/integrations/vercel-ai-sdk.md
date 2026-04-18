---
title: Vercel AI SDK
description: The Vercel AI SDK is a TypeScript library for building AI applications. The SDK supports many different AI providers, tools for streaming completions, and more.
To use Cloudflare AI Gateway with Vercel AI SDK, you will need to use the ai-gateway-provider package.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/integrations/vercel-ai-sdk.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Vercel AI SDK

The [Vercel AI SDK ↗](https://sdk.vercel.ai/) is a TypeScript library for building AI applications. The SDK supports many different AI providers, tools for streaming completions, and more. To use Cloudflare AI Gateway with Vercel AI SDK, you will need to use the `ai-gateway-provider` package.

## Installation

Terminal window

```

npm install ai-gateway-provider


```

## Examples

Make a request to 

![]() OpenAI

Unified

API with 

Stored Key (BYOK)

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

### AI binding with third-party models

If you are already using the [workers-ai-provider ↗](https://www.npmjs.com/package/workers-ai-provider) package, you can route requests through AI Gateway to call third-party models without needing separate provider SDKs. Pass a `gateway` option with your gateway ID to `createWorkersAI`:

* [  JavaScript ](#tab-panel-5083)
* [  TypeScript ](#tab-panel-5084)

JavaScript

```

import { createWorkersAI } from "workers-ai-provider";

import { streamText } from "ai";


export default {

  async fetch(request, env) {

    const workersai = createWorkersAI({

      binding: env.AI,

      gateway: { id: "my-gateway" },

    });


    const result = streamText({

      model: workersai("openai/gpt-4o"),

      messages: [{ role: "user", content: "Write a short story" }],

    });


    return result.toTextStreamResponse();

  },

};


```

Explain Code

TypeScript

```

import { createWorkersAI } from "workers-ai-provider";

import { streamText } from "ai";


export default {

  async fetch(request, env) {

    const workersai = createWorkersAI({

      binding: env.AI,

      gateway: { id: "my-gateway" },

    });


    const result = streamText({

      model: workersai("openai/gpt-4o"),

      messages: [{ role: "user", content: "Write a short story" }],

    });


    return result.toTextStreamResponse();

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

This works with any [supported provider and model](https://developers.cloudflare.com/ai/models/) available through AI Gateway.

### Fallback Providers

To specify model or provider fallbacks to handle request failures and ensure reliability, you can pass an array of models to the `model` option.

```

const { text } = await generateText({

  model: aigateway([openai.chat("gpt-5.1"), anthropic("claude-sonnet-4-5")]),

  prompt: "Write a vegetarian lasagna recipe for 4 people.",

});


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/vercel-ai-sdk/","name":"Vercel AI SDK"}}]}
```
