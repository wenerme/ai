> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Pareto Router

> Pick a coding model by minimum coding score without choosing a specific model

The [Pareto Router](https://openrouter.ai/openrouter/pareto-code) (`openrouter/pareto-code`) is a way to have OpenRouter always pick a strong coding model for your needs without committing to a specific one. You express a single `min_coding_score` preference between `0` and `1`, and the router routes your request to a coding model that meets that bar.

## Overview

The Pareto Router is tuned for coding use cases. It maintains a curated shortlist of strong coding models currently available on OpenRouter, ranked by their [Artificial Analysis](https://artificialanalysis.ai/) coding percentile (an integer between `0` and `100` that captures how a model ranks within AA's benchmarked coding field). Your `min_coding_score` picks the tier of models you want to route to. Within the chosen tier the router selects the cheapest model that is currently available (or the fastest, when you request the `:nitro` variant).

The name comes from [Pareto efficiency](https://en.wikipedia.org/wiki/Pareto_efficiency): the goal is to give you a strong coder without overspending. The exact shortlist evolves over time as new models land and benchmarks shift.

## Usage

Set your model to `openrouter/pareto-code` and optionally pass the `pareto-router` plugin to control the minimum coding score:

<CodeGroup>
  ```typescript title="TypeScript SDK" expandable lines theme={null}
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

  ```bash title="cURL" lines theme={null}
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

## Default Settings

Instead of passing the `pareto-router` plugin on every API request, you can configure a default `min_coding_score` in the dashboard:

1. Navigate to [Settings > Plugins](https://openrouter.ai/settings/plugins)
2. Find the **Pareto Router** row and click the configure (gear) icon
3. Select a quality tier — **High**, **Medium**, or **Low** — or choose **Custom score** to enter a specific value between `0` and `1`
4. Click **Save**
5. Toggle the plugin **on** to apply it to all requests using `openrouter/pareto-code`

Once enabled, the configured `min_coding_score` is automatically applied to every request that uses `openrouter/pareto-code`, without needing to include the `plugins` array in your API calls.

<Info>
  You can still override the default on a per-request basis by passing the `pareto-router` plugin in your request's `plugins` array. To prevent per-request overrides, enable "Prevent overrides" in the plugin configuration.
</Info>

## The `min_coding_score` parameter

`min_coding_score` is an optional number between `0` and `1`, where `1` is best. The router maps it to one of three quality tiers, and each tier corresponds to a percentile band on [Artificial Analysis](https://artificialanalysis.ai/) coding scores.

| `min_coding_score`  | Tier           | AA coding percentile band                  |
| ------------------- | -------------- | ------------------------------------------ |
| `>= 0.66`           | high           | top of AA's coding field                   |
| `>= 0.33`, `< 0.66` | medium         | strong modern flagships below the top      |
| `< 0.33`            | low            | capable coders that still beat AA's median |
| omitted             | high (default) | top of AA's coding field                   |

If you omit `min_coding_score`, the router defaults to the strongest available coders. Within a tier, the router picks the cheapest available model, or the fastest by p50 throughput when you request the `:nitro` variant.

<Info>
  The router resolves a primary coding model plus up to two same-tier fallbacks. The primary is what serves your request. The fallbacks only fire on transient provider errors or rate limits, they do not load-balance traffic. If the entire tier has no models currently published on OpenRouter, the router steps into a neighboring tier instead. The response `model` field always reports the concrete model that handled the request.
</Info>

<Note>
  Because the scoring axis is a *percentile* within AA's benchmarked coding field, the capability bar implied by a given `min_coding_score` shifts as the frontier moves. A new strong release can push existing models down a percentile band, so `min_coding_score=0.66` always means "top of the current field" rather than "above an absolute capability score".
</Note>

## Response

The response includes the `model` field showing which coding model was actually used:

```json lines theme={null}
{
  "id": "gen-...",
  "model": "anthropic/claude-opus-4.8",
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

## Session Stickiness

The Pareto Router pins both the selected **model** and **provider** so that subsequent requests in the same conversation route to the same place. This ensures consistent behavior within a conversation and maximizes [prompt cache](/guides/best-practices/prompt-caching) hits.

Stickiness applies at two levels:

* **Implicit (automatic)**: OpenRouter derives a conversation fingerprint from your messages (hashing the first system message and first user message). Once the provider reports prompt cache usage, the model and provider are pinned for that conversation. No configuration needed.
* **Explicit (`session_id`)**: When you include a `session_id`, stickiness kicks in on the first successful response — even before cache usage is observed. This is recommended for multi-turn coding sessions and agent workflows where you want consistent routing from the start.

In both cases, the cache expires after **5 minutes** of inactivity. Each successful request resets the timer. If the cached provider returns an error, the cache is not updated, allowing the next request to be re-routed.

For full details on how sticky routing works, cache key granularity, and the `x-session-id` header, see [Provider Sticky Routing](/guides/best-practices/prompt-caching#provider-sticky-routing).

### Example with `session_id`

<CodeGroup>
  ```typescript title="TypeScript SDK" expandable lines theme={null}
  const completion = await openRouter.chat.send({
    model: 'openrouter/pareto-code',
    session_id: 'my-coding-session-123',
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

  // Subsequent requests with the same session_id will use the same model and provider
  const followUp = await openRouter.chat.send({
    model: 'openrouter/pareto-code',
    session_id: 'my-coding-session-123',
    plugins: [
      {
        id: 'pareto-router',
        min_coding_score: 0.8,
      },
    ],
    messages: [
      { role: 'user', content: 'Write a Python function that merges two sorted lists.' },
      { role: 'assistant', content: completion.choices[0].message.content ?? '' },
      { role: 'user', content: 'Now add type hints and docstrings.' },
    ],
  });
  ```

  ```bash title="cURL" lines theme={null}
  curl https://openrouter.ai/api/v1/chat/completions \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "openrouter/pareto-code",
      "session_id": "my-coding-session-123",
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

### Why It Matters for the Pareto Router

The Pareto Router selects a model based on coding score and cost — different requests could resolve to different models as the shortlist evolves. Session stickiness pins the **model selection** — not just the provider — so your multi-turn coding session stays on the same model throughout. This prevents mid-conversation model switches that could lead to inconsistent code style or lost prompt cache.

## Pricing

The Pareto Router itself adds no fee. You pay only for the underlying model that handles the request. Because model selection varies across the shortlist, per-request cost will vary too. Use a lower `min_coding_score` when cost is the primary concern.

## Limitations

* **Coding only**: `openrouter/pareto-code` is tuned for coding tasks. For other use cases, use a different router or choose a specific model.
* **Model selection may change over time**: For a given `min_coding_score`, the same model is selected deterministically (sorted by price). However, the selected model may change when the underlying shortlist is updated (e.g. new models are added, benchmarks shift, or the percentile bands rebucket as the AA field evolves). Within a conversation, [session stickiness](#session-stickiness) keeps your requests on the same model and provider to maximize cache hits.
* **Coding score only**: `min_coding_score` is the only router parameter. You can't directly cap cost or latency per request.

## Related

* [Auto Router](/guides/routing/routers/auto-router) - Intelligent model selection across all task types
* [Free Models Router](/guides/routing/routers/free-router) - Zero-cost model selection
* [Body Builder](/guides/routing/routers/body-builder) - Generate multiple parallel API requests
* [Model Fallbacks](/guides/routing/model-fallbacks) - Configure fallback models
