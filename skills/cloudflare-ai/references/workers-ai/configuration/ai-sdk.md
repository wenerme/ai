---
description: Use Workers AI models with the AI SDK through createAI from agents/models/ai-sdk.
title: Vercel AI SDK
image: https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/og.png?v=6e60b4e5c89fbf07
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel AI SDK

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To use Workers AI with the [AI SDK ↗︎](https://ai-sdk.dev/), use `createAI` from `agents/models/ai-sdk`. This page covers Workers AI models. For AI Gateway catalog models, fallback, gateway options, and the full option reference, refer to [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/).

The `workers-ai-provider` package is deprecated. Use `createAI` instead.

## Setup

Install the Agents SDK and the AI SDK. `createAI` needs `ai@^7` and `@ai-sdk/provider@^4`:

npmyarnpnpmbun

```
npm i agents ai @ai-sdk/provider
```

```
yarn add agents ai @ai-sdk/provider
```

```
pnpm add agents ai @ai-sdk/provider
```

```
bun add agents ai @ai-sdk/provider
```

Add the `AI` binding to your Wrangler configuration:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
}
```

```toml
[ai]
binding = "AI"
```

## Choose a model

Pass the id of any [Workers AI model](https://developers.cloudflare.com/workers-ai/models/). Model ids start with `@cf/` and autocomplete from `@cloudflare/workers-types`:

```ts
import { createAI } from "agents/models/ai-sdk";

const ai = createAI({ binding: env.AI });

const model = ai("@cf/zai-org/glm-4.7-flash");
```

## Generate text

```js
import { createAI } from "agents/models/ai-sdk";
import { generateText } from "ai";

export default {
	async fetch(request, env) {
		const ai = createAI({ binding: env.AI });

		const { text } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return new Response(text);
	},
};
```

```ts
import { createAI } from "agents/models/ai-sdk";
import { generateText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const { text } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return new Response(text);
	},
};
```

## Stream text

For longer responses, stream the output as the model generates it:

```js
import { createAI } from "agents/models/ai-sdk";
import { streamText } from "ai";

export default {
	async fetch(request, env) {
		const ai = createAI({ binding: env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return result.toTextStreamResponse();
	},
};
```

```ts
import { createAI } from "agents/models/ai-sdk";
import { streamText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return result.toTextStreamResponse();
	},
};
```

## Generate structured output

Pass a Zod schema to get a typed JSON response:

```js
import { createAI } from "agents/models/ai-sdk";
import { generateText, Output } from "ai";
import { z } from "zod";

export default {
	async fetch(request, env) {
		const ai = createAI({ binding: env.AI });

		const { output } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Generate a lasagna recipe.",
			output: Output.object({
				schema: z.object({
					recipe: z.object({
						ingredients: z.array(z.string()),
						description: z.string(),
					}),
				}),
			}),
		});

		return Response.json(output);
	},
};
```

```ts
import { createAI } from "agents/models/ai-sdk";
import { generateText, Output } from "ai";
import { z } from "zod";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const { output } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Generate a lasagna recipe.",
			output: Output.object({
				schema: z.object({
					recipe: z.object({
						ingredients: z.array(z.string()),
						description: z.string(),
					}),
				}),
			}),
		});

		return Response.json(output);
	},
};
```

## Use other model types

Embeddings, images, speech, transcription, and reranking come from the same provider:

```ts
import {
	embedMany,
	generateImage,
	generateSpeech,
	rerank,
	transcribe,
} from "ai";

const { embeddings } = await embedMany({
	model: ai.embedding("@cf/baai/bge-base-en-v1.5"),
	values: ["hello", "world"],
});

const { image } = await generateImage({
	model: ai.image("@cf/black-forest-labs/flux-1-schnell"),
	prompt: "A cyberpunk lizard",
});

const { audio } = await generateSpeech({
	model: ai.speech("@cf/deepgram/aura-1"),
	text: "Hello from Cloudflare.",
});

const { text } = await transcribe({
	model: ai.transcription("@cf/openai/whisper-large-v3-turbo"),
	audio: audio.uint8Array,
});

const { rerankedDocuments } = await rerank({
	model: ai.reranking("@cf/baai/bge-reranker-base"),
	documents: ["a cyberpunk lizard", "a rainy Tuesday"],
	query: "Which one is cooler?",
});
```

For model-specific settings, refer to [Use other modalities](https://developers.cloudflare.com/agents/models/ai-sdk/#use-other-modalities).

## Use AI Gateway

Requests go through [AI Gateway](https://developers.cloudflare.com/ai-gateway/). The gateway defaults to `default`. To use another gateway, set its `id`:

```ts
const ai = createAI({ binding: env.AI, id: "my-gateway" });
```

The same provider also calls models from the [AI Gateway catalog](https://developers.cloudflare.com/ai/models/), such as `anthropic/claude-opus-5.5`. Refer to [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/) for catalog models, caching, fallback, and the other gateway options.

## Related resources

- [AI SDK provider reference](https://developers.cloudflare.com/agents/models/ai-sdk/)
- [Workers AI models](https://developers.cloudflare.com/workers-ai/models/)
- [AI SDK documentation ↗︎](https://ai-sdk.dev/docs/introduction)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/#page","headline":"Vercel AI SDK","description":"Use Workers AI models with the AI SDK through createAI from agents/models/ai-sdk.","url":"https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/og.png?v=6e60b4e5c89fbf07","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
