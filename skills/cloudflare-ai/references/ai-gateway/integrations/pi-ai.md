---
description: Call AI Gateway from Pi AI with createAI from agents/models/pi-ai.
title: Pi AI
image: https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/og.png?v=ae6beb0d263037eb
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Pi AI

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

To call AI Gateway from [Pi AI ↗︎](https://github.com/earendil-works/pi/tree/main/packages/ai), use `createAI` from `agents/models/pi-ai`. It calls models from the [model catalog](https://developers.cloudflare.com/ai/models/), [dynamic routes](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/), and Pi AI's own model objects through your gateway. This page covers the AI Gateway features. For the full reference, refer to [Pi AI](https://developers.cloudflare.com/agents/models/pi-ai/).

## Installation

Install the Agents SDK and Pi AI. `createAI` needs `@earendil-works/pi-ai@~1.3.0`:

npmyarnpnpmbun

```
npm i agents @earendil-works/pi-ai
```

```
yarn add agents @earendil-works/pi-ai
```

```
pnpm add agents @earendil-works/pi-ai
```

```
bun add agents @earendil-works/pi-ai
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

Pass a `<provider>/<id>` from Pi AI's AI Gateway catalog. You do not need a vendor key. AI Gateway bills the request through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), or uses a [key stored on the gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/):

```js
import { createAI } from "agents/models/pi-ai";

export default {
	async fetch(request, env) {
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const reply = await ai.complete(ai("anthropic/claude-opus-5.5"), {
			messages: [
				{ role: "user", content: "Write a short story", timestamp: Date.now() },
			],
		});

		return Response.json(reply.content);
	},
};
```

```ts
import { createAI } from "agents/models/pi-ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const reply = await ai.complete(ai("anthropic/claude-opus-5.5"), {
			messages: [
				{ role: "user", content: "Write a short story", timestamp: Date.now() },
			],
		});

		return Response.json(reply.content);
	},
};
```

Use the catalog's spelling of the id, such as `anthropic/claude-opus-5.5` or `openai/gpt-5.5`. The request goes in the model's own format, Anthropic Messages or OpenAI Responses, so Pi AI's own parsers read the answer and thinking works as it does with the vendor. `id` sets the gateway and defaults to `default`. A dynamic route on that gateway is `dynamic/<route>`, for example `ai("dynamic/support")`.

## Call a Pi AI model object

Pass any model from a Pi AI registry. The request goes to the vendor's [provider-native endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/) on your gateway, and AI Gateway supplies the credential:

```ts
import { getBuiltinModel } from "@earendil-works/pi-ai/providers/all";
import { createAI } from "agents/models/pi-ai";

const ai = createAI({ binding: env.AI, id: "my-gateway" });

const model = ai(getBuiltinModel("anthropic", "claude-opus-5-5"));
```

A model object keeps the vendor's own id, such as `claude-opus-5-5`, and all of Pi AI's metadata for it.

## Fall back to another model

`fallback` lists models to try in order if the primary model fails before it produces any output. Mix catalog ids, dynamic routes, Workers AI ids, and model objects:

```ts
const model = ai("anthropic/claude-opus-5.5", {
	fallback: ["openai/gpt-5.5", "@cf/zai-org/glm-4.7-flash"],
});
```

## Set gateway options

Set [caching](https://developers.cloudflare.com/ai-gateway/features/caching/), logging, metadata, timeouts, and retries on `createAI`, on a model, or per call:

```ts
const ai = createAI({
	binding: env.AI,
	id: "my-gateway",
	cacheTtl: 60,
	metadata: { app: "support-bot" },
});

const model = ai("openai/gpt-5.5", { byokAlias: "production" });
```

For every option, refer to [Cache, tag, and time out requests](https://developers.cloudflare.com/agents/models/pi-ai/#cache-tag-and-time-out-requests).

## Use an account id and API token

To use a gateway in another account, or to call from outside a Worker, pass `accountId` and `apiToken` instead of `binding`:

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

[Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the **Workers AI Read** permission for model ids and **AI Gateway Run** for model objects.

## Related resources

- [Pi AI provider reference](https://developers.cloudflare.com/agents/models/pi-ai/)
- [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/)
- [Model catalog](https://developers.cloudflare.com/ai/models/)
- [Vercel AI SDK](https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/#page","headline":"Pi AI","description":"Call AI Gateway from Pi AI with createAI from agents/models/pi-ai.","url":"https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/og.png?v=ae6beb0d263037eb","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
