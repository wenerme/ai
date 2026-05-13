> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Pareto Router

The [Pareto Router](https://openrouter.ai/openrouter/pareto-code) (`openrouter/pareto-code`) is a way to have OpenRouter always pick a strong coding model for your needs without committing to a specific one. You express a single `min_coding_score` preference between `0` and `1`, and the router routes your request to a coding model that meets that bar.

## Overview

The Pareto Router is tuned for coding use cases. It maintains a curated shortlist of strong coding models currently available on OpenRouter, ranked by their [Artificial Analysis](https://artificialanalysis.ai/) coding percentile (an integer between `0` and `100` that captures how a model ranks within AA's benchmarked coding field). Your `min_coding_score` picks the tier of models you want to route to. Within the chosen tier the router selects the cheapest model that is currently available (or the fastest, when you request the `:nitro` variant).

The name comes from [Pareto efficiency](https://en.wikipedia.org/wiki/Pareto_efficiency): the goal is to give you a strong coder without overspending. The exact shortlist evolves over time as new models land and benchmarks shift.

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

`min_coding_score` is an optional number between `0` and `1`, where `1` is best. The router maps it to one of three quality tiers, and each tier corresponds to a percentile band on [Artificial Analysis](https://artificialanalysis.ai/) coding scores.

| `min_coding_score`  | Tier           | AA coding percentile band                  |
| ------------------- | -------------- | ------------------------------------------ |
| `>= 0.66`           | high           | top of AA's coding field                   |
| `>= 0.33`, `< 0.66` | medium         | strong modern flagships below the top      |
| `< 0.33`            | low            | capable coders that still beat AA's median |
| omitted             | high (default) | top of AA's coding field                   |

If you omit `min_coding_score`, the router defaults to the strongest available coders. Within a tier, the router picks the cheapest available model, or the fastest by p50 throughput when you request the `:nitro` variant.

<Callout intent="info">
  The router resolves a primary coding model plus up to two same-tier fallbacks. The primary is what serves your request. The fallbacks only fire on transient provider errors or rate limits, they do not load-balance traffic. If the entire tier has no models currently published on OpenRouter, the router steps into a neighboring tier instead. The response `model` field always reports the concrete model that handled the request.
</Callout>

<Callout intent="note">
  Because the scoring axis is a *percentile* within AA's benchmarked coding field, the capability bar implied by a given `min_coding_score` shifts as the frontier moves. A new strong release can push existing models down a percentile band, so `min_coding_score=0.66` always means "top of the current field" rather than "above an absolute capability score".
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

1. **Tier resolution**: Your `min_coding_score` value is mapped to one of three tiers (`high`, `medium`, `low`) using the thresholds in the table above.
2. **Candidate filtering**: The router takes the tier's curated shortlist and filters it to models that are currently published on OpenRouter.
3. **Selection**: The filtered shortlist is sorted by price ascending, or by p50 throughput descending when you request the `:nitro` variant. The top entry becomes the primary model and the next two are kept as same-tier fallbacks.
4. **Runtime fallback**: If the primary's endpoints are unavailable due to transient provider errors or rate limits, the request cascades through the same-tier fallbacks. Only when the entire tier is missing from the catalog does the router step into a neighboring tier.
5. **Request forwarding**: Your request is forwarded to the selected model.

## Pricing

The Pareto Router itself adds no fee. You pay only for the underlying model that handles the request. Because model selection varies across the shortlist, per-request cost will vary too. Use a lower `min_coding_score` when cost is the primary concern.

## Limitations

* **Coding only**: `openrouter/pareto-code` is tuned for coding tasks. For other use cases, use a different router or choose a specific model.
* **Model selection may change over time**: For a given `min_coding_score`, the same model is selected deterministically (sorted by price). However, the selected model may change when the underlying shortlist is updated (e.g. new models are added, benchmarks shift, or the percentile bands rebucket as the AA field evolves). Within a conversation, [provider sticky routing](/docs/guides/best-practices/prompt-caching#provider-sticky-routing) keeps your requests on the same provider endpoint to maximize cache hits.
* **Coding score only**: `min_coding_score` is the only router parameter. You can't directly cap cost or latency per request.

## Related

* [Auto Router](/docs/guides/routing/routers/auto-router) - Intelligent model selection across all task types
* [Free Models Router](/docs/guides/routing/routers/free-router) - Zero-cost model selection
* [Body Builder](/docs/guides/routing/routers/body-builder) - Generate multiple parallel API requests
* [Model Fallbacks](/docs/guides/routing/model-fallbacks) - Configure fallback models