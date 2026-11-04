---
description: Call a pool of models by one name, and route requests in a fallback order or with smart routing, without changing application code.
title: Model aliases
image: https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/og.png?v=9b842aabe8f41c71
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Model aliases

Last updated Nov 4, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A model alias is a pool of models that your application calls by a single name, such as `custom/support-fast`. For each request, AI Gateway picks a model from the pool in one of two ways:

- **Default order**: Try the models in the order you set, and fall back to the next model if one fails.
- **Smart routing**: Choose the model for each request.

Because your application only references the alias name, you can change the models or routing algorithm on your gateway without updating your code. Aliases belong to individual gateways, so a `custom/support-fast` alias on one gateway is separate from one with the same name on another.

For conditional branches, percentage splits, or limits within a routing flow, use [dynamic routes](https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/) instead.

## Before you start

- [Create a gateway](https://developers.cloudflare.com/ai-gateway/get-started/) and turn on [authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/).
- Configure [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) or [store provider keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) for the models you want to use.
- To call the REST API, create a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Account** > **Workers AI** > **Read** permission. This differs from the AI Gateway permissions used to manage aliases.

Not every catalog model is available as an alias target. Targets must be available to alias routing and support the protocol format you use.

## Create an alias

1. In the Cloudflare dashboard, go to **AI** > **AI Gateway**. [Go to **AI Gateway** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
2. Select your gateway, then go to **Routing**.
3. Select **Create alias**.
4. In **Alias name**, enter a name such as `support-fast`. The dashboard adds the `custom/` prefix.
5. In **Models**, select a model. To add fallbacks, select **Add model** and choose additional models. Drag the models to set their default order.
6. In **Routing algorithm**, select a [routing algorithm](#routing-algorithm).
7. Select **Create alias**.

The alias appears in the Routing list with its `custom/` prefix. Select its name to edit the models or routing algorithm, then select **Save alias**. Renaming an alias changes the name your application must request.

Configuration changes can take time to reach requests served from different locations. A request may use a cached alias configuration while it refreshes.

## Routing algorithm

| Algorithm | Behavior |
| --- | --- |
| *Default order* (`preferred`) | Try eligible models from top to bottom until one responds. |
| *Smart routing* (`smart`) | Choose a model for each request. If smart routing cannot rank the models, the gateway uses the default order. |

Routing options supplied with a request override the alias's saved routing algorithm.

Only models and providers that support the request format and pass gateway checks are eligible. A failed attempt can fall back to another eligible model or provider. This does not bypass authentication, billing, or gateway policies.

## Call an alias

Use the [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/) with `custom/<alias-name>` as the model. Include the `cf-aig-gateway-id` header to select the gateway where you created the alias.

Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` to your account ID and API token. Replace `my-gateway` with your gateway ID and `custom/support-fast` with your alias.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header "cf-aig-gateway-id: my-gateway" \
  --data '{
    "model": "custom/support-fast",
    "input": {
      "messages": [
        { "role": "user", "content": "Reply with a short greeting." }
      ]
    }
  }'
```

The request uses the alias configuration on `my-gateway`. Use an input format supported by the models you select. An alias does not make model-specific input formats interchangeable.

To override the alias's routing preferences for one request, add `options.routing` alongside `model` and `input`:

```json
{
	"model": "custom/support-fast",
	"input": {
		"messages": [{ "role": "user", "content": "Reply with a short greeting." }]
	},
	"options": {
		"routing": {
			"algorithm": "preferred"
		}
	}
}
```

## Configure an alias through the API

Alias configuration uses `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/model_aliases` under the Cloudflare API's `/client/v4` prefix. These operations require AI Gateway permissions, rather than the Workers AI permission used for inference.

| Method | Path suffix | Operation |
| --- | --- | --- |
| `GET` | `/model_aliases` | List aliases. |
| `POST` | `/model_aliases` | Create an alias. |
| `GET` | `/model_aliases/{alias_id}` | Get an alias. |
| `PUT` | `/model_aliases/{alias_id}` | Replace an alias. |
| `DELETE` | `/model_aliases/{alias_id}` | Delete an alias. |

For `POST` and `PUT`, provide an alias name without `custom/`, a list of catalog models, and optional routing preferences:

```json
{
	"name": "support-fast",
	"models": [
		{ "model": "openai/gpt-4.1-nano", "providers": ["openai"] },
		{ "model": "anthropic/claude-sonnet-4.6", "providers": ["anthropic"] }
	],
	"routing": {
		"algorithm": "preferred"
	}
}
```

Each model's optional `providers` list restricts its providers and sets their preferred order. Omit `providers` to allow the gateway's registered providers for that model. Provider restrictions are configured through the API. The dashboard editor selects models only.

`PUT` replaces the whole configuration. Include every model and provider restriction you want to keep. Omitting `routing`, or setting it to `null` or `{}`, clears the alias's routing preferences.

## Limits and errors

- Each gateway supports up to 100 aliases.
- An alias must contain between 1 and 50 model entries.
- Names must be unique within the gateway and contain 1–64 characters. Use lowercase letters and numbers, optionally separated by a single `.`, `_`, or `-`. For example, `support-fast` is valid. `Support Fast`, `support--fast`, and `support-` are not.
- An alias cannot reference another `custom/` alias.
- Models must support a shared protocol format for the request. Native-only model formats are not available through aliases.
- Aliases do not support x402 payments.

| Response | Meaning | Action |
| --- | --- | --- |
| `404` with `Model not found` | The selected gateway has no alias with that name. | Check the alias name, `custom/` prefix, and gateway ID. |
| `400` with `has no available models` | None of the alias's targets resolve to available protocol-compatible models. | Check the exact catalog model IDs and provider restrictions. |
| `503` with `Model aliases are temporarily unavailable` | The gateway cannot read the alias configuration. | Retry the request. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/#page","headline":"Model aliases","description":"Call a pool of models by one name, and route requests in a fallback order or with smart routing, without changing application code.","url":"https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/features/routing/model-aliases/og.png?v=9b842aabe8f41c71","dateModified":"2026-11-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
