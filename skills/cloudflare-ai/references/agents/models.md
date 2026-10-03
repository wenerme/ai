---
description: Call Workers AI and third-party models through AI Gateway from the AI SDK or pi-ai with one createAI provider over the AI binding.
title: Models
image: https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/models/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Agents SDK includes model providers for [Workers AI](https://developers.cloudflare.com/workers-ai/) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/). Each provider is one `createAI` factory over the Worker's `AI` binding. There are two, one per framework:

| Import | Framework | Use it with |
| --- | --- | --- |
| `agents/models/ai-sdk` | [AI SDK ↗︎](https://ai-sdk.dev/) v7 | `generateText`, `streamText`, Think, and any AI SDK consumer |
| `agents/models/pi-ai` | [pi-ai ↗︎](https://github.com/earendil-works/pi/tree/main/packages/ai) | The [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/), and pi-ai's `stream` |

Both take the same options, route through the same gateway, and handle Workers AI the same way.

Beta

The model providers are in beta. Their APIs may change in a minor release.

## How a model is chosen

The providers keep one model catalog up to date: Workers AI. Every other vendor's models come from that vendor's own package, and the provider routes them through AI Gateway.

- **A Workers AI model** is a `@cf/` id, such as `ai("@cf/zai-org/glm-4.7-flash")`. It runs through `env.AI.run()`. A compatibility layer turns each model's response into the standard OpenAI chat completions shape.
- **A third-party model** is a model object built by the vendor's provider, such as `ai(anthropic("claude-opus-4-8"))`. The vendor's code builds the request and parses the response. The provider swaps the transport, so the request goes through AI Gateway with `env.AI.gateway(id).run()`.

The provider does not keep third-party model ids, wire formats, or thinking settings. When a vendor ships a new model, update the vendor's package.

## What every model gets

- **No API tokens in your Worker.** Requests go through the `AI` binding. AI Gateway holds third-party credentials, through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or a key you [store on the gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).
- **Gateway options.** Caching, logging, metadata, timeouts, and retries are options on the provider, the model, or the call. The `default` gateway is created the first time you use it.
- **Fallback.** List models to try in order if the first fails before it produces output. Mix Workers AI and third-party models freely.
- **Gateway metadata on every result.** Each response carries the gateway log id, cache status, and the model that actually answered.

## Configure the binding

Both providers need the `AI` binding:

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

## Choose a provider

### [AI SDK](https://developers.cloudflare.com/agents/models/ai-sdk/)

A full AI SDK ProviderV4 for text, tools, structured output, embeddings, images, speech, transcription, and reranking.

### [pi-ai](https://developers.cloudflare.com/agents/models/pi-ai/)

pi-ai models for the Pi harness, pi-durable, and any framework built on a pi-ai Models registry.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/models/#page","headline":"Models","description":"Call Workers AI and third-party models through AI Gateway from the AI SDK or pi-ai with one createAI provider over the AI binding.","url":"https://developers.cloudflare.com/agents/models/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/models/og.png?v=dd8074fab97f2bb3","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
