---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Define AI Gateway dynamic routing flows using the REST API and JSON element structure.
title: JSON Configuration
image: https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/json-configuration/og.png?v=d0ecbe9d1009423a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# JSON Configuration

Instead of using the **dashboard editor UI** to define the route graph, you can do it using the REST API. Routes are internally represented using a simple JSON structure:

```json
{
  "id": "<route id>",
  "name": "<route name>",
  "elements": [<array of elements>]
}
```

## Request metadata

Conditional and rate/budget limit elements read data from the request's metadata only. They do not read the request body, headers, model, or task. AI Gateway does not detect a task or add it to metadata.

Reference metadata keys as `metadata.<key>`. The keys available are:

- The [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) that you send in the `cf-aig-metadata` header. For example, if you send `cf-aig-metadata: {"plan": "free", "task": "summarize"}`, you can use `metadata.plan` and `metadata.task`.
- `metadata.cf.user_id`, which AI Gateway adds when a user authenticates with [Cloudflare Access](https://developers.cloudflare.com/ai-gateway/configuration/cloudflare-access/). Service-token requests and requests without a user subject do not include this key. Refer to [Reserved metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/#reserved-metadata).

To route on a value that AI Gateway does not supply, such as the task type, add it to `cf-aig-metadata` in your application.

## Supported elements

Dynamic routing supports several types of elements that you can combine to create sophisticated routing flows. Each element has specific inputs, outputs, and configuration options.

### Start Element

Marks the beginning of a route. Every route must start with a Start element.

- **Inputs**: None
- **Outputs**:
  - `next`: Forwards the unchanged request to the next element

```json
{
	"id": "<id>",
	"type": "start",
	"outputs": {
		"next": { "elementId": "<id>" }
	}
}
```

### Conditional Element (If/Else)

Evaluates a condition against the [request metadata](#request-metadata) and routes the request accordingly.

- **Inputs**: Request
- **Outputs**:
  - `true`: Forwards request to provided element if condition evaluates to true
  - `false`: Forwards request to provided element if condition evaluates to false

`conditions` supports MongoDB-like operators such as `$eq`, `$ne`, `$in`, `$and`, and `$or`. If the request does not include a metadata key, the condition evaluates the key as missing. For example, `$eq` evaluates to false and `$ne` evaluates to true.

```json
{
	"id": "<id>",
	"type": "conditional",
	"properties": {
		"conditions": {
			"metadata.plan": { "$eq": "free" }
		}
	},
	"outputs": {
		"true": { "elementId": "<id>" },
		"false": { "elementId": "<id>" }
	}
}
```

### Percentage Split

Routes requests probabilistically across multiple outputs, useful for A/B testing and gradual rollouts.

- **Inputs**: Request
- **Outputs**: Up to 5 named percentage outputs
  - Each output key (for example, `"10%"`) is the probability for that branch, and the keys must sum to 100%

```json
{
	"id": "<id>",
	"type": "percentage",
	"outputs": {
		"10%": { "elementId": "<id>" },
		"40%": { "elementId": "<id>" },
		"50%": { "elementId": "<id>" }
	}
}
```

### Rate/Budget Limit

Apply limits based on [request metadata](#request-metadata). Supports both count-based and cost-based limits.

- **Inputs**: Request
- **Outputs**:
  - `success`: Forwards request to provided element if request is not rate limited
  - `fallback`: Optional output for rate-limited requests (route terminates if not provided)

**Properties**:

- `limitType`: "count" or "cost"
- `key`: Metadata key to use for rate limiting. For example, `metadata.user_id` for a custom key that your application sends, or `metadata.cf.user_id` for the Access user ID. Requests that do not include this key share one limit.
- `limit`: Maximum allowed requests/cost
- `window`: Time window in seconds

```json
{
	"id": "<id>",
	"type": "rate",
	"properties": {
		"limitType": "count",
		"key": "metadata.user_id",
		"limit": 100,
		"window": 3600
	},
	"outputs": {
		"success": { "elementId": "node_model_workers_ai" },
		"fallback": { "elementId": "node_model_openai_mini" }
	}
}
```

### Model

Executes inference using a specified model and provider with configurable timeout and retry settings.

- **Inputs**: Request
- **Outputs**:
  - `success`: Forwards request to provided element if model successfully starts streaming a response
  - `fallback`: Optional output if model fails after all retries or times out

**Properties**:

- `provider`: AI provider (e.g. "openai", "anthropic")
- `model`: Specific model name
- `timeout`: Request timeout in milliseconds
- `retries`: Number of retry attempts

```json
{
	"id": "<id>",
	"type": "model",
	"properties": {
		"provider": "openai",
		"model": "gpt-4o-mini",
		"timeout": 60000,
		"retries": 4
	},
	"outputs": {
		"success": { "elementId": "<id>" },
		"fallback": { "elementId": "<id>" }
	}
}
```

### End element

Marks the end of a route. Returns the last successful model response, or an error if no model response was generated.

- **Inputs**: Request
- **Outputs**: None (provide an empty `outputs` object)

```json
{
	"id": "<id>",
	"type": "end",
	"outputs": {}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/json-configuration/#page","headline":"JSON Configuration","description":"Define AI Gateway dynamic routing flows using the REST API and JSON element structure.","url":"https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/json-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/json-configuration/og.png?v=d0ecbe9d1009423a","dateModified":"2026-11-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
