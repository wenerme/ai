> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Pareto Router

The [Pareto Router](https://openrouter.ai/openrouter/pareto-code) (`openrouter/pareto-code`) is a way to have OpenRouter always pick a strong coding model for your needs without committing to a specific one. You express a single `min_coding_score` preference between `0` and `1`, and the router routes your request to a coding model that meets that bar.

## Overview

The name comes from [Pareto efficiency](https://en.wikipedia.org/wiki/Pareto_efficiency): at any given cost or capability point, we route to a coding model that sits on the quality/cost frontier we maintain for OpenRouter-hosted models.

The Pareto Router is tuned for coding use cases. It maintains a curated shortlist of strong coding models currently available on OpenRouter, ranked by widely-used external coding benchmarks. Your `min_coding_score` picks out how capable the selected model needs to be — higher scores route to stronger (and typically more expensive) models. The exact shortlist and selection logic evolve over time as new models land and benchmarks shift.

## Usage

Set your model to `openrouter/pareto-code` and optionally pass the `pareto-router` plugin to control the minimum coding score:

<CodeGroup>
  ```typescript title="TypeScript SDK"
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: '<OPENROUTER_API_KEY>',
  });

  const completion = await openRouter.chat.send({
    model: 'openrouter/pareto-code',
    plugins: [
      {
        id: 'pareto-router',
        min_coding_score: 0.8,
      },
    ],
    messages: [
      {
        role: 'user',
        content: 'Write a Python function that merges two sorted lists.',
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  console.log('Model used:', completion.model);
  ```

  ```bash title="cURL"
  curl https://openrouter.ai/api/v1/chat/completions \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "openrouter/pareto-code",
      "plugins": [
        {
          "id": "pareto-router",
          "min_coding_score": 0.8
        }
      ],
      "messages": [
        {"role": "user", "content": "Write a Python function that merges two sorted lists."}
      ]
    }'
  ```
</CodeGroup>

## The `min_coding_score` parameter

`min_coding_score` is an optional number between `0` and `1`, where `1` is best. It sets a floor on how capable the selected model needs to be for your request. Higher scores route to stronger coders at the top of the shortlist; lower scores open up cheaper, faster options.

If you omit `min_coding_score`, the router defaults to the strongest available coders.

<Callout intent="info">
  A model is drawn from the matching shortlist on each request. If every model in the matching set is temporarily unavailable, the router falls back to the next-closest set rather than failing the request. The response `model` field always reports the concrete model that handled the request.
</Callout>

## Response

The response includes the `model` field showing which coding model was actually used:

```json
{
  "id": "gen-...",
  "model": "anthropic/claude-opus-4.7",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 42,
    "completion_tokens": 128,
    "total_tokens": 170
  }
}
```

## How It Works

1. **Shortlist resolution**: Your `min_coding_score` value is used to pick the set of coding models that meet your quality bar.
2. **Candidate filtering**: The router filters the shortlist to models that are currently published on OpenRouter.
3. **Selection**: A single model is selected from the filtered candidates.
4. **Fallback**: If every candidate is unavailable, the router steps through neighboring sets to find a coding-capable model.
5. **Request forwarding**: Your request is forwarded to the selected model.

## Pricing

The Pareto Router itself adds no fee. You pay only for the underlying model that handles the request. Because model selection varies across the shortlist, per-request cost will vary too. Use a lower `min_coding_score` when cost is the primary concern.

## Limitations

* **Coding only**: `openrouter/pareto-code` is tuned for coding tasks. For other use cases, use a different router or choose a specific model.
* **Model selection may change over time**: For a given `min_coding_score`, the same model is selected deterministically (sorted by price). However, the selected model may change when the underlying shortlist is updated (e.g. new models are added or benchmarks shift). Within a conversation, [provider sticky routing](/docs/guides/best-practices/prompt-caching#provider-sticky-routing) keeps your requests on the same provider endpoint to maximize cache hits.
* **Coding score only**: `min_coding_score` is the only router parameter. You can't directly cap cost or latency per request.

## Related

* [Auto Router](/docs/guides/routing/routers/auto-router) - Intelligent model selection across all task types
* [Free Models Router](/docs/guides/routing/routers/free-router) - Zero-cost model selection
* [Body Builder](/docs/guides/routing/routers/body-builder) - Generate multiple parallel API requests
* [Model Fallbacks](/docs/guides/routing/model-fallbacks) - Configure fallback models