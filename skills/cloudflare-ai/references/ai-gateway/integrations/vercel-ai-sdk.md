---
description: Call AI Gateway from the AI SDK with createAI from agents/models/ai-sdk.
title: Vercel AI SDK
image: https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/og.png?v=e856be29d04805cb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Vercel AI SDK

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To call AI Gateway from the [AI SDK ↗︎](https://ai-sdk.dev/), use `createAI` from `agents/models/ai-sdk`. It calls models from the [model catalog](https://developers.cloudflare.com/ai/models/), [dynamic routes](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/), and a vendor's own AI SDK models through your gateway. This page covers the AI Gateway features. For the full reference, refer to [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/).

The `ai-gateway-provider` package is deprecated. Use `createAI` instead.

## Installation

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

In a Worker, add the `AI` binding to your Wrangler configuration:

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

## Call a catalog model

Pass an `<author>/<model>` id from the [model catalog](https://developers.cloudflare.com/ai/models/). You do not need a vendor package or a vendor key. AI Gateway bills the request through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), or uses a [key stored on the gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/):

```js
import { createAI } from "agents/models/ai-sdk";
import { streamText } from "ai";

export default {
	async fetch(request, env) {
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			messages: [{ role: "user", content: "Write a short story" }],
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
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			messages: [{ role: "user", content: "Write a short story" }],
		});

		return result.toTextStreamResponse();
	},
};
```

Use the catalog's spelling of the id, such as `anthropic/claude-opus-5.5` or `openai/gpt-5.5`. `id` sets the gateway and defaults to `default`. A [dynamic route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) on that gateway is `dynamic/<route>`, for example `ai("dynamic/support")`.

## Call a vendor's model object

Pass a model from the vendor's own AI SDK package. The request goes unchanged to the vendor's [provider-native endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/) on your gateway. AI Gateway holds the credential, so the vendor's `apiKey` is a placeholder:

```ts
import { createAnthropic } from "@ai-sdk/anthropic";
import { createAI } from "agents/models/ai-sdk";

const ai = createAI({ binding: env.AI, id: "my-gateway" });
const anthropic = createAnthropic({ apiKey: "cloudflare" });

const model = ai(anthropic("claude-opus-5-5"));
```

Use the vendor's own model id here, such as `claude-opus-5-5`. To send a key you hold instead, refer to [Unified billing and BYOK](https://developers.cloudflare.com/agents/models/ai-sdk/#unified-billing-and-byok).

## Fall back to another model

`fallback` lists models to try in order if the primary model fails before it produces any output. Mix catalog ids, dynamic routes, Workers AI ids, and model objects:

```ts
const model = ai(anthropic("claude-opus-5-5"), {
	fallback: ["openai/gpt-5.5", "@cf/zai-org/glm-4.7-flash"],
});
```

## Set gateway options

Set [caching](https://developers.cloudflare.com/ai-gateway/features/caching/), logging, metadata, timeouts, and retries on the provider, on a model, or per call under `providerOptions.cloudflare`:

```ts
const ai = createAI({
	binding: env.AI,
	id: "my-gateway",
	cacheTtl: 60,
	metadata: { app: "support-bot" },
});

await generateText({
	model: ai("openai/gpt-5.5"),
	prompt: "Summarize this ticket",
	providerOptions: {
		cloudflare: { skipCache: true, metadata: { userId: "u_123" } },
	},
});
```

For every option, refer to [Set options](https://developers.cloudflare.com/agents/models/ai-sdk/#set-options).

## Use an account id and API token

To use a gateway in another account, or to call from outside a Worker, pass `accountId` and `apiToken` instead of `binding`:

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

The call forms and options are the same. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the **Workers AI Read** permission for model ids and **AI Gateway Run** for model objects.

## Related resources

- [AI SDK provider reference](https://developers.cloudflare.com/agents/models/ai-sdk/)
- [Model catalog](https://developers.cloudflare.com/ai/models/)
- [Dynamic routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)
- [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/#page","headline":"Vercel AI SDK","description":"Call AI Gateway from the AI SDK with createAI from agents/models/ai-sdk.","url":"https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/og.png?v=e856be29d04805cb","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
