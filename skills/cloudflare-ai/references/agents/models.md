---
description: Call Workers AI, AI Gateway catalog models, dynamic routes, and vendor models from the AI SDK or Pi AI with one createAI provider over the AI binding or an account id and API token.
title: Models
image: https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/models/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Agents SDK includes model providers for [Workers AI](https://developers.cloudflare.com/workers-ai/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Each provider is one `createAI` factory over the Worker's `AI` binding, or an account id and API token. There are two, one per framework:

| Import | Framework | Use it with |
| --- | --- | --- |
| `agents/models/ai-sdk` | [AI SDK ↗︎](https://ai-sdk.dev/) v7 | `generateText`, `streamText`, Think, and any AI SDK consumer |
| `agents/models/pi-ai` | [Pi AI ↗︎](https://github.com/earendil-works/pi/tree/main/packages/ai) | The [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/), and Pi AI's `stream` |

Both take the same options, route through the same gateway, and handle Workers AI the same way. The [OpenCode harness](https://developers.cloudflare.com/agents/harnesses/opencode/) has a third, `agents/models/opencode`, built on the AI SDK provider.

Beta

The model providers are in beta. Their APIs may change in a minor release.

## How a model is chosen

Name a model with a string, or pass a model object built by the vendor's own package:

```ts
ai("@cf/zai-org/glm-4.7-flash"); // Workers AI
ai("anthropic/claude-opus-5.5"); // AI Gateway catalog
ai("dynamic/support"); // AI Gateway dynamic route
ai(anthropic("claude-opus-5-5")); // the vendor's own model object
```

- **A Workers AI model** is a `@cf/` id. It runs through `env.AI.run()`. A compatibility layer turns each model's response into the standard OpenAI chat completions shape.
- **An AI Gateway catalog model** is an `<author>/<model>` id from the [model catalog](https://developers.cloudflare.com/ai/models/), such as `anthropic/claude-opus-5.5` or `openai/gpt-5.5`. It also runs through `env.AI.run()`, which sends it to AI Gateway. The gateway picks a provider and bills the call. Use the catalog's spelling, not the vendor's: `anthropic/claude-opus-5.5`, not `claude-opus-5-5`.
- **A [dynamic route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)** is `dynamic/<route>`. The route you configured on the gateway picks the model.
- **A model object** comes from the vendor's provider package, such as `anthropic("claude-opus-5-5")`. The vendor's code builds the request and parses the response. The provider sends that request unchanged through the binding to AI Gateway's [provider-native endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/) for that vendor.

The providers do not use the deprecated [Universal Endpoint](https://developers.cloudflare.com/ai-gateway/usage/universal/).

## What every model gets

- **No vendor keys.** AI Gateway holds third-party credentials, through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a key you [store on the gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/). Unified Billing requires [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) on the gateway.
- **Gateway options.** Caching, logging, metadata, timeouts, retries, and BYOK key aliases are options on the provider, the model, or the call. The `default` gateway is created the first time you use it.
- **Fallback.** List models to try in order if the first fails before it produces output. Mix Workers AI ids, catalog ids, dynamic routes, and model objects.
- **Stream resume.** Through the binding, a stream from a catalog model or a dynamic route resumes after a dropped connection. You do not need to configure anything.
- **Gateway metadata on every result.** Each response carries the gateway log id, cache status, run id, and the model that actually answered.

`createAI` from `agents/models/ai-sdk` replaces `workers-ai-provider` and `ai-gateway-provider`. For AI Search, use `ai-search-provider`.

## Connect to Cloudflare

Inside a Worker, pass the `AI` binding, `createAI({ binding: env.AI })`, and add it to your Wrangler configuration:

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

To use a gateway in another account, or to call from outside a Worker, pass an account id and API token instead. [Create the token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Workers AI Read** and **AI Gateway Run**:

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

## Choose a provider

### [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/)

A full AI SDK ProviderV4 for text, tools, structured output, embeddings, images, speech, transcription, and reranking.

### [Pi AI](https://developers.cloudflare.com/agents/models/pi-ai/)

Pi AI models for the Pi harness, Pi Durable, and any framework built on a Pi AI Models registry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/models/#page","headline":"Models","description":"Call Workers AI, AI Gateway catalog models, dynamic routes, and vendor models from the AI SDK or Pi AI with one createAI provider over the AI binding or an account id and API token.","url":"https://developers.cloudflare.com/agents/models/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
