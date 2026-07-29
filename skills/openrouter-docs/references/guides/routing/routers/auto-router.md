> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto Router

> Automatically select the best model for your prompt

The Auto Router automatically selects the best model for your prompt. It comes in two versions:

* **[Auto](https://openrouter.ai/openrouter/auto)** (`openrouter/auto`) — powered by [NotDiamond](https://www.notdiamond.ai/). **Deprecated**: it will soon be replaced by the beta router below.
* **[Auto Beta](https://openrouter.ai/openrouter/auto-beta)** (`openrouter/auto-beta`) — powered by OpenRouter's own task type rankings: live, community-wide usage data about which models developers actually rely on for each kind of task. See [How Auto Beta Works](#how-auto-beta-works), [Benchmarks](#benchmarks), and the [Cost / Quality Tradeoff](#cost--quality-tradeoff) dial.

## Overview

Instead of manually choosing a model, let the Auto Router analyze your prompt and select the optimal model from a curated set of high-quality options. The router considers factors like prompt complexity, task type, and model capabilities.

## How Auto Beta Works

Auto Beta routes on evidence: what thousands of developers, in aggregate, keep using for exactly the kind of task your prompt represents.

1. **Classify the task.** A fast, lightweight classifier assigns each prompt one of \~30 fine-grained task types — for example `code:debugging`, `agent:multi_step_planning`, `qa_knowledge`, `math`, `customer_support`, or `research_report`.
2. **Rank by real-world spend share.** For that task type, Auto Beta looks up which models the OpenRouter community actually spends on over a trailing 7-day window — the "Share of Spend" view from the [rankings page](https://openrouter.ai/rankings). This is a live signal: when developers migrate a workload to a new model, the router follows within days, with no retraining or manual curation.
3. **Apply your cost / quality dial.** The [`cost_quality_tradeoff`](#cost--quality-tradeoff) setting filters the candidate pool by cost, so you choose how much to favor cheaper models.
4. **Route with fallbacks.** The top surviving models (in spend-share order) become the primary pick plus fallbacks, after honoring your `allowed_models` restrictions and output-modality requirements. If classification or rankings are ever unavailable, the router degrades gracefully to a default model set — a request never fails because routing infrastructure hiccuped.

## Benchmarks

We benchmarked Auto Beta against the current Auto router on three very different workloads: GPQA Diamond (198 PhD-level science questions), τ-bench Verified Airline (50 multi-turn agentic customer-service tasks with tool use), and DRACO (20 deep-research report tasks across 10 domains, LLM-judged). Claude Opus 4.8 and GLM 5.2 were run as fixed-model reference points on GPQA and τ-bench. `cqt` is the [`cost_quality_tradeoff`](#cost--quality-tradeoff) setting: 0 is the high-quality end and higher values favor cheaper models. The rows below were measured at `cqt=0` and `cqt=7` (Auto Beta now defaults to `cqt=9`).

| Config                          | GPQA Diamond | τ-bench Airline | DRACO (norm. score) |
| ------------------------------- | ------------ | --------------- | ------------------- |
| **Auto Beta — quality (cqt=0)** | **83.8%**    | **74.0%**       | 60.0                |
| **Auto Beta — cqt=7**           | 74.2%        | 66.0%           | **63.2**            |
| Auto — quality (cqt=0)          | 50.0%        | 34.0%           | 19.6                |
| Auto — cqt=7                    | 61.6%        | 30.0%           | 25.6                |
| Claude Opus 4.8                 | 86.9%        | 78.0%           | —                   |
| GLM 5.2                         | 75.8%        | 72.0%           | —                   |

Auto Beta wins everywhere, and the gap widens as tasks get harder: it more than doubles Auto's τ-bench accuracy at every setting and scores \~2.5× higher on deep research. At the quality setting it lands within a few points of running Claude Opus on every single question — without you having to know which model is best for the job.

## Usage

Set your model to `openrouter/auto-beta` (or the deprecated `openrouter/auto`):

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  import { OpenRouter } from '@openrouter/sdk';

  const openRouter = new OpenRouter({
    apiKey: '<OPENROUTER_API_KEY>',
  });

  const completion = await openRouter.chat.send({
    model: 'openrouter/auto-beta',
    messages: [
      {
        role: 'user',
        content: 'Explain quantum entanglement in simple terms',
      },
    ],
  });

  console.log(completion.choices[0].message.content);
  // Check which model was selected
  console.log('Model used:', completion.model);
  ```

  ```typescript title="TypeScript (fetch)" expandable lines theme={null}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openrouter/auto-beta',
      messages: [
        {
          role: 'user',
          content: 'Explain quantum entanglement in simple terms',
        },
      ],
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  // Check which model was selected
  console.log('Model used:', data.model);
  ```

  ```python title="Python" expandable lines theme={null}
  import requests
  import json

  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "openrouter/auto-beta",
      "messages": [
        {
          "role": "user",
          "content": "Explain quantum entanglement in simple terms"
        }
      ]
    })
  )

  data = response.json()
  print(data['choices'][0]['message']['content'])
  # Check which model was selected
  print('Model used:', data['model'])
  ```
</CodeGroup>

## Response

The response includes the `model` field showing which model was actually used:

```json lines theme={null}
{
  "id": "gen-...",
  "model": "anthropic/claude-sonnet-4.5",  // The model that was selected
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "..."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 150,
    "total_tokens": 165
  }
}
```

## Session Stickiness

The Auto Router pins both the selected **model** and **provider** so that subsequent requests in the same conversation route to the same place. This ensures consistent behavior within a conversation and maximizes [prompt cache](/docs/guides/best-practices/prompt-caching) hits.

Stickiness applies at two levels:

* **Implicit (automatic)**: OpenRouter derives a conversation fingerprint from your messages (hashing the first system message and first user message). Once the provider reports prompt cache usage, the model and provider are pinned for that conversation. No configuration needed.
* **Explicit (`session_id`)**: When you include a `session_id`, stickiness kicks in on the first successful response — even before cache usage is observed. This is recommended for multi-turn conversations and agent workflows where you want consistent routing from the start.

In both cases, the cache expires after **5 minutes** of inactivity. Each successful request resets the timer. If the cached provider returns an error, the cache is not updated, allowing the next request to be re-routed.

For full details on how sticky routing works, cache key granularity, and the `x-session-id` header, see [Provider Sticky Routing](/docs/guides/best-practices/prompt-caching#provider-sticky-routing).

### Example with `session_id`

<CodeGroup>
  ```typescript title="TypeScript SDK" expandable lines theme={null}
  const completion = await openRouter.chat.send({
    model: 'openrouter/auto-beta',
    session_id: 'my-conversation-123',
    messages: [
      {
        role: 'user',
        content: 'Explain quantum entanglement',
      },
    ],
  });

  // Subsequent requests with the same session_id will use the same model and provider
  const followUp = await openRouter.chat.send({
    model: 'openrouter/auto-beta',
    session_id: 'my-conversation-123',
    messages: [
      { role: 'user', content: 'Explain quantum entanglement' },
      { role: 'assistant', content: completion.choices[0].message.content ?? '' },
      { role: 'user', content: 'Now explain it to a 5-year-old' },
    ],
  });
  ```

  ```typescript title="TypeScript (fetch)" lines theme={null}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openrouter/auto-beta',
      session_id: 'my-conversation-123',
      messages: [
        {
          role: 'user',
          content: 'Explain quantum entanglement',
        },
      ],
    }),
  });
  ```

  ```python title="Python" lines theme={null}
  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "openrouter/auto-beta",
      "session_id": "my-conversation-123",
      "messages": [
        {
          "role": "user",
          "content": "Explain quantum entanglement"
        }
      ]
    })
  )
  ```
</CodeGroup>

### Why It Matters for the Auto Router

Unlike using a fixed model, the Auto Router selects a different model each time based on your prompt. Session stickiness is especially important here because it also pins the **model selection** — not just the provider. Without it, you could get different models on each turn of a conversation, leading to inconsistent behavior and wasted prompt cache.

## Supported Models

The Auto Router selects from a curated set of high-quality models including:

<Warning>
  Model slugs change as new versions are released. The examples below are current as of December 4, 2025. Check the [models page](https://openrouter.ai/models) for the latest available models.
</Warning>

* Claude Sonnet 4.5 (`anthropic/claude-sonnet-4.5`)
* Claude Opus 4.5 (`anthropic/claude-opus-4.5`)
* GPT-5.1 (`openai/gpt-5.1`)
* Gemini 3.1 Pro (`google/gemini-3.1-pro-preview`)
* DeepSeek 3.2 (`deepseek/deepseek-v3.2`)
* And other top-performing models

The exact model pool may be updated as new models become available.

## Configuring Allowed Models

You can restrict which models the Auto Router can select from using the `plugins` parameter. This is useful when you want to limit routing to specific providers or model families.

### Via API Request

Use wildcard patterns to filter models. For example, `anthropic/*` matches all Anthropic models:

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  const completion = await openRouter.chat.send({
    model: 'openrouter/auto-beta',
    messages: [
      {
        role: 'user',
        content: 'Explain quantum entanglement',
      },
    ],
    plugins: [
      {
        id: 'auto-router',
        allowed_models: ['anthropic/*', 'openai/gpt-5.1'],
      },
    ],
  });
  ```

  ```typescript title="TypeScript (fetch)" expandable lines theme={null}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openrouter/auto-beta',
      messages: [
        {
          role: 'user',
          content: 'Explain quantum entanglement',
        },
      ],
      plugins: [
        {
          id: 'auto-router',
          allowed_models: ['anthropic/*', 'openai/gpt-5.1'],
        },
      ],
    }),
  });
  ```

  ```python title="Python" expandable lines theme={null}
  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "openrouter/auto-beta",
      "messages": [
        {
          "role": "user",
          "content": "Explain quantum entanglement"
        }
      ],
      "plugins": [
        {
          "id": "auto-router",
          "allowed_models": ["anthropic/*", "openai/gpt-5.1"]
        }
      ]
    })
  )
  ```
</CodeGroup>

### Via Settings UI

You can also configure default allowed models in your [Plugin Settings](https://openrouter.ai/settings/plugins):

1. Navigate to **Settings > Plugins**
2. Find **Auto Router** and click the configure button
3. Enter model patterns (one per line)
4. Save your settings

These defaults apply to all your API requests unless overridden per-request.

### Pattern Syntax

| Pattern          | Matches                                |
| ---------------- | -------------------------------------- |
| `anthropic/*`    | All Anthropic models                   |
| `openai/gpt-5*`  | All GPT-5 variants                     |
| `google/*`       | All Google models                      |
| `openai/gpt-5.1` | Exact match only                       |
| `*/claude-*`     | Any provider with claude in model name |

When no patterns are configured, the Auto Router uses all supported models.

## Cost / Quality Tradeoff

Control how aggressively the Auto Router optimizes for cost vs. quality using the `cost_quality_tradeoff` parameter (integer, 0–10). **Deprecated:** use the named `cost_tier` parameter instead. The numeric parameter remains supported for compatibility and takes precedence if both are provided.

* **0** = pure quality — always picks the most capable model regardless of cost
* **10** = maximize for cost — cheapest model wins
* Intermediate values blend quality and cost signals continuously

The default is **9** for Auto Beta (`openrouter/auto-beta`) and **7** for the deprecated `openrouter/auto`, balancing cost savings with strong output quality.

For the recommended named setting, use the `cost_tier` plugin parameter. On Auto it is a shorthand for `cost_quality_tradeoff`; on Auto Beta it selects a contiguous cost-percentile band:

| `cost_tier` | Auto cqt | Auto Beta cost band | Behavior                             |
| ----------- | -------: | ------------------: | ------------------------------------ |
| `low`       |        9 |            \[0, 20) | Cheapest models                      |
| `medium`    |        7 |           \[20, 40) | Lower-cost models                    |
| `high`      |        5 |           \[40, 60) | Middle-cost models                   |
| `xhigh`     |        3 |           \[60, 80) | Higher-cost, higher-quality models   |
| `max`       |        1 |          \[80, 100] | Highest-cost, highest-quality models |

```typescript theme={null}
plugins: [{ id: 'auto-router', cost_tier: 'medium' }]
```

If both parameters are provided, the numeric `cost_quality_tradeoff` value takes precedence.

### How It Works in Auto Beta

With a numeric `cost_quality_tradeoff`, Auto Beta acts as a cost-percentile ceiling on the ranked candidate pool for your prompt's task type. Each candidate model has an average cost per generation for that task; the dial keeps only models at or below a percentile of that cost distribution:

* At **0**, nearly the whole pool is eligible (up to the 90th cost percentile), so the top spend-share models win regardless of price.
* At the Auto Beta default of **9**, only the cheapest \~fifth of candidates survive.
* At **10**, just the cheapest decile remains.

When `cost_tier` is supplied without a numeric `cost_quality_tradeoff`, Auto Beta instead keeps models inside the tier's band. Unlike the numeric ceiling, a tier excludes models cheaper than the selected band. Each band is a clamped cost-sorted slice, so every non-empty candidate pool contributes at least one model; surviving models are still ranked by spend share.

### Via API Request

<CodeGroup>
  ```typescript title="TypeScript SDK" lines theme={null}
  const completion = await openRouter.chat.send({
    model: 'openrouter/auto-beta',
    messages: [
      {
        role: 'user',
        content: 'Summarize this paragraph',
      },
    ],
    plugins: [
      {
        id: 'auto-router',
        cost_quality_tradeoff: 3, // Favor quality over cost
      },
    ],
  });
  ```

  ```typescript title="TypeScript (fetch)" expandable lines theme={null}
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <OPENROUTER_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openrouter/auto-beta',
      messages: [
        {
          role: 'user',
          content: 'Summarize this paragraph',
        },
      ],
      plugins: [
        {
          id: 'auto-router',
          cost_quality_tradeoff: 3,
        },
      ],
    }),
  });
  ```

  ```python title="Python" expandable lines theme={null}
  response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
      "Authorization": "Bearer <OPENROUTER_API_KEY>",
      "Content-Type": "application/json",
    },
    data=json.dumps({
      "model": "openrouter/auto-beta",
      "messages": [
        {
          "role": "user",
          "content": "Summarize this paragraph"
        }
      ],
      "plugins": [
        {
          "id": "auto-router",
          "cost_quality_tradeoff": 3
        }
      ]
    })
  )
  ```
</CodeGroup>

### Via Settings UI

You can also set a default tradeoff in your [Plugin Settings](https://openrouter.ai/settings/plugins) under **Auto Router**. The per-request value overrides this default.

## Pricing

You pay the standard rate for whichever model is selected. There is no additional fee for using the Auto Router.

## Use Cases

* **General-purpose applications**: When you don't know what types of prompts users will send
* **Cost optimization**: Let the router choose efficient models for simpler tasks
* **Quality optimization**: Ensure complex prompts get routed to capable models
* **Experimentation**: Discover which models work best for your use case

## Limitations

* The router requires `messages` format (not `prompt`)
* Streaming is supported
* All standard OpenRouter features (tool calling, etc.) work with the selected model

## Related

* [Body Builder](/docs/guides/routing/routers/body-builder) - Generate multiple parallel API requests
* [Latest Model Resolution](/docs/guides/routing/routers/latest-resolution) - Always target the newest version of a model family
* [Model Fallbacks](/docs/guides/routing/model-fallbacks) - Configure fallback models
* [Provider Selection](/docs/guides/routing/provider-selection) - Control which providers are used
