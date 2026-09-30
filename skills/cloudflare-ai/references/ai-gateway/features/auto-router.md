---
description: Automatically select a model for each request that balances response quality and cost.
title: Auto Router
image: https://developers.cloudflare.com/ai-gateway/features/auto-router/og.png?v=2485574d63144221
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto Router

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/features/auto-router/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Gateway Auto Router automatically selects an AI model for each request. It helps reduce costs while maintaining the quality of responses by matching requests with the model best suited to the task.

## How it works

For each request, AI Gateway first builds a pool of eligible models. It excludes models that do not support the request format or its inputs. For example, if a request includes an image, only models that accept image input are eligible. It also accounts for credentials, billing configuration, and spend limits configured for the gateway. Unhealthy providers are excluded and restored automatically once they recover.

A classification step then analyzes the conversation to estimate the type and difficulty of the task. A scoring step weighs the expected quality of each remaining candidate against its cost, and ranks the models by fit. AI Gateway attempts the top-ranked model first, and falls back to the next one if a provider cannot serve the request.

## Get started

To use Auto Router, send requests to your AI Gateway and specify `cloudflare/auto` in place of a provider-specific model. Refer to [Unified API (OpenAI compat)](https://developers.cloudflare.com/ai-gateway/usage/chat-completion/) for endpoint and authentication instructions.

Note

Auto Router supports the Chat Completions and Responses API formats. The [WebSockets API](https://developers.cloudflare.com/ai-gateway/usage/websockets-api/) is not yet supported.

```bash
curl -i -X POST "https://gateway.ai.cloudflare.com/v1/$CLOUDFLARE_ACCOUNT_ID/$CLOUDFLARE_GATEWAY_ID/compat/chat/completions" \
  --header "cf-aig-authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "cloudflare/auto",
    "messages": [
      {
        "role": "user",
        "content": "hello"
      }
    ]
  }'
```

The response headers show which model Auto Router selected:

```txt
cf-aig-routed-model: openai/gpt-5.6-luna
cf-aig-routing-reason: cost_optimal_within_pool
cf-aig-routing-decision-id: 91e0b970-33f0-4921-b8dc-127412e7b103
```

## Session affinity

For multi-turn conversations, such as chats or coding agents, send a `cf-aig-session-id` header with each request. Auto Router then keeps the same model for an entire turn, so requests can take advantage of prompt caching. A turn is a user message plus any follow-up requests, such as tool calls. Supported clients, such as OpenCode, do this automatically.

Without a session ID, Auto Router selects a model for each request. Requests in the same conversation may go to different models, so they cannot reuse the prompt cache.

Auto Router detects turns from the message history. To mark turns yourself, send a `cf-aig-turn-id` header. To turn off session affinity, including for supported clients, send `cf-aig-no-session-affinity: true`.

At the start of each turn, Auto Router switches models only when the expected benefit outweighs the cost of losing the cache. For example, if a conversation moves from a simple question to a multi-file coding task, Auto Router may switch to a more capable model.

## Headers

Auto Router supports the following request headers:

| Header | Description |
| --- | --- |
| `cf-aig-session-id` | Identifies the session that the request belongs to. Enables [session affinity](#session-affinity). |
| `cf-aig-turn-id` | Identifies the turn that the request belongs to. Overrides turn detection from message history. |
| `cf-aig-no-session-affinity` | Set to `true` to select a model for each request instead of pinning a model for the turn. |
| `cf-aig-allowed-models` | A comma-separated list of models that Auto Router can select from. Supports the `*` wildcard, for example `anthropic/*`. |
| `cf-aig-allowed-providers` | A comma-separated list of providers that Auto Router can select from, for example `openai,anthropic`. |

By default, Auto Router selects from a set of [default models](#default-models). `cf-aig-allowed-models` replaces the default models with the models you provide. Entries can match any model in [Models](#models), including additional models. The `*` wildcard does not match `/`, so use `anthropic/*` instead of `*`. If an entry matches no model, AI Gateway returns a `400` error. If you send both headers, a model must match both.

The response includes headers that describe the routing decision. These headers can help you identify the selected model, understand why it was selected, and correlate the request with AI Gateway logs for support and diagnostics:

| Header | Description |
| --- | --- |
| `cf-aig-routed-model` | The model that served the request, for example `anthropic/claude-sonnet-5`. |
| `cf-aig-routing-reason` | Why that model was selected. Refer to [Routing reasons](#routing-reasons). |
| `cf-aig-routing-decision-id` | The routing decision identifier. |
| `cf-aig-request-id` | The request identifier. |

### Routing reasons

The `cf-aig-routing-reason` header has one of these values:

| Value | Description |
| --- | --- |
| `cost_optimal_within_pool` | Auto Router selected the model with the best balance of expected quality and cost. |
| `forced_by_candidate_pool` | Only one model was eligible, so no selection was needed. |
| `pinned_by_turn` | Auto Router reused the model selected earlier in the turn. |
| `fallback_candidate_unavailable` | The selected model could not serve the request, so AI Gateway used another eligible model. |
| `fallback_key_not_in_candidates` | The routing decision was not valid, so AI Gateway selected a model without it. |
| `fallback_router_error` | The router was unavailable, so AI Gateway selected a model without it. |
| `fallback_router_timeout` | The router did not respond in time, so AI Gateway selected a model without it. |
| `fallback_unsupported_input` | The request had no text to classify, so AI Gateway selected a model without the router. |

## Models

Auto Router selects from a pool of models managed by Cloudflare. The pool may change over time.

### Default models

By default, Auto Router selects from the following models. To provide your own set of models, use the [`cf-aig-allowed-models` or `cf-aig-allowed-providers` header](#headers).

| Model | Provider |
| --- | --- |
| `anthropic/claude-fable-5` | `anthropic` |
| `anthropic/claude-opus-5` | `anthropic` |
| `anthropic/claude-sonnet-5` | `anthropic` |
| `openai/gpt-5.6-luna` | `openai` |
| `openai/gpt-5.6-sol` | `openai` |
| `openai/gpt-5.6-terra` | `openai` |
| `xai/grok-4.5` | `xai` |

### Additional models

Auto Router only selects these models when they match `cf-aig-allowed-models` or `cf-aig-allowed-providers`.

<details>

<summary>

Additional models

</summary>

| Model | Provider |
| --- | --- |
| <code>@cf/deepseek-ai/deepseek-v4-flash-0731</code> | <code>workers-ai</code> |
| <code>@cf/deepseek-ai/deepseek-v4-pro-0813</code> | <code>workers-ai</code> |
| <code>@cf/google/gemma-4-26b-a4b-it</code> | <code>workers-ai</code> |
| <code>@cf/moonshotai/kimi-k2.7-code</code> | <code>workers-ai</code> |
| <code>@cf/openai/gpt-oss-20b</code> | <code>workers-ai</code> |
| <code>@cf/qwen/qwen3.8-27b</code> | <code>workers-ai</code> |
| <code>@cf/zai-org/glm-5.2</code> | <code>workers-ai</code> |
| <code>alibaba/qwen3.8-max</code> | <code>alibaba</code> |
| <code>anthropic/claude-fable-5.1</code> | <code>anthropic</code> |
| <code>anthropic/claude-opus-4.8</code> | <code>anthropic</code> |
| <code>anthropic/claude-opus-5.5</code> | <code>anthropic</code> |
| <code>anthropic/claude-sonnet-4.6</code> | <code>anthropic</code> |
| <code>fireworks/glm-5.3</code> | <code>fireworks</code> |
| <code>fireworks/glm-5.3-flash</code> | <code>fireworks</code> |
| <code>minimax/m3</code> | <code>minimax</code> |
| <code>openai/gpt-5.5</code> | <code>openai</code> |
| <code>openai/gpt-6-astra</code> | <code>openai</code> |
| <code>openai/gpt-6-luna</code> | <code>openai</code> |
| <code>openai/gpt-6-sol</code> | <code>openai</code> |
| <code>xai/grok-4.6</code> | <code>xai</code> |

</details>

The Provider column uses the values that `cf-aig-allowed-providers` accepts.

## Use with OpenCode

[OpenCode ↗︎](https://opencode.ai/) can use Auto Router as a custom model. Set the `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_GATEWAY_ID`, and `CLOUDFLARE_API_TOKEN` environment variables, then add this `opencode.json` file to your project root:

*opencode.jsonjson*

```json
{
	"$schema": "https://opencode.ai/config.json",
	"enabled_providers": ["cloudflare-auto-gateway"],
	"provider": {
		"cloudflare-auto-gateway": {
			"npm": "@ai-sdk/openai-compatible",
			"name": "Cloudflare AI Gateway",
			"options": {
				"baseURL": "https://gateway.ai.cloudflare.com/v1/{env:CLOUDFLARE_ACCOUNT_ID}/{env:CLOUDFLARE_GATEWAY_ID}/compat",
				"apiKey": "",
				"headers": {
					"cf-aig-authorization": "Bearer {env:CLOUDFLARE_API_TOKEN}"
				}
			},
			"models": {
				"cloudflare/auto": {
					"name": "Cloudflare Auto",
					"modalities": {
						"input": ["text", "image"],
						"output": ["text"]
					},
					"limit": {
						"context": 1000000,
						"output": 128000
					},
					"options": {
						"max_completion_tokens": 32000
					}
				}
			}
		}
	}
}
```

Start OpenCode with `opencode` and select **Cloudflare Auto**. For more OpenCode configuration options, refer to [OpenCode](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/opencode/).

### Install the AI Gateway plugin

The [@cloudflare/aig-opencode-plugin ↗︎](https://www.npmjs.com/package/@cloudflare/aig-opencode-plugin) plugin shows which model Auto Router selected for each request. It requires OpenCode 1.18.29 or later. To install it, run the command for your OpenCode version, then restart OpenCode:

```sh
opencode plugin add @cloudflare/aig-opencode-plugin
```

```sh
opencode plugin @cloudflare/aig-opencode-plugin --global
```

The plugin adds the following features:

- **AI Gateway sidebar section.** Shows the selected model, session ID, request ID, routing decision ID, and trace ID for the latest request in the current session. Select the section to copy these values.
- **`/aig-show` command.** Prints the AI Gateway headers from the latest request, including `cf-aig-routing-reason`, without sending anything to the model. Run `/aig-show --help` for options, such as showing earlier requests or including request and response bodies.
- **`/aig-capture` command.** Run `/aig-capture off` or `/aig-capture on` to stop or resume capturing requests. Capture is on by default. Captured requests are kept in memory and cleared when OpenCode restarts.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/auto-router/#page","headline":"Auto Router","description":"Automatically select a model for each request that balances response quality and cost.","url":"https://developers.cloudflare.com/ai-gateway/features/auto-router/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/features/auto-router/og.png?v=2485574d63144221","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
