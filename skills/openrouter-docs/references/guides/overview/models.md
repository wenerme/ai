> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

> One API for hundreds of models

Explore and browse 400+ models and providers [on our website](https://openrouter.ai/models), or [with our API](/api/api-reference/models/list-all-models-and-their-properties). You can also subscribe to our [RSS feed](https://openrouter.ai/api/v1/models?use_rss=true) to stay updated on new models.

## Query Parameters

The Models API supports query parameters to filter the list of models returned.

### `output_modalities`

Filter models by their output capabilities. Accepts a comma-separated list of modalities or `"all"` to include every model regardless of output type.

| Value        | Description                                 |
| ------------ | ------------------------------------------- |
| `text`       | Models that produce text output (default)   |
| `image`      | Models that generate images                 |
| `audio`      | Models that produce audio output            |
| `embeddings` | Embedding models                            |
| `all`        | Include all models, skip modality filtering |

Examples:

```bash lines theme={null}
# Default — text models only
curl "https://openrouter.ai/api/v1/models"

# Image generation models only
curl "https://openrouter.ai/api/v1/models?output_modalities=image"

# Text and image models
curl "https://openrouter.ai/api/v1/models?output_modalities=text,image"

# All models regardless of modality
curl "https://openrouter.ai/api/v1/models?output_modalities=all"
```

The same parameter is available on the [`/v1/models/count`](/api/api-reference/models/get-total-count-of-available-models) endpoint so that counts stay consistent with list results.

### `supported_parameters`

Filter models by the API parameters they support. For example, to find models that support tool calling:

```bash lines theme={null}
curl "https://openrouter.ai/api/v1/models?supported_parameters=tools"
```

### `sort`

Sort models server-side before they're returned. Accepts one of the following values:

| Value                    | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `pricing-low-to-high`    | Cheapest models first (weighted average of prompt, completion, request, and web\_search pricing) |
| `pricing-high-to-low`    | Most expensive models first                                                                      |
| `context-high-to-low`    | Largest context window first                                                                     |
| `throughput-high-to-low` | Highest tokens/second first (p50 throughput from routing heuristics)                             |
| `latency-low-to-high`    | Lowest time-to-first-token first (p50 latency)                                                   |
| `most-popular`           | Most tokens processed in the last week                                                           |
| `top-weekly`             | Same as `most-popular`                                                                           |
| `newest`                 | Most recently added to OpenRouter                                                                |

Models without data for the requested sort dimension (e.g. no pricing, no throughput heuristics) sort last. Omitting `sort` preserves the default ordering (backward compatible).

```bash lines theme={null}
# Cheapest models first
curl "https://openrouter.ai/api/v1/models?sort=pricing-low-to-high"

# Newest models
curl "https://openrouter.ai/api/v1/models?sort=newest"

# Combine with filters
curl "https://openrouter.ai/api/v1/models?sort=throughput-high-to-low&supported_parameters=tools"
```

## Single Model Lookup

Look up a single model's full details without fetching the entire list:

```
GET /api/v1/model/{author}/{slug}
```

The endpoint resolves aliases automatically. For example, `anthropic/claude-3-5-sonnet` redirects to the canonical `anthropic/claude-3.5-sonnet` and returns its data.

Variant suffixes are also supported — append `:free`, `:thinking`, etc. to the slug:

```bash lines theme={null}
# Look up a specific model
curl "https://openrouter.ai/api/v1/model/openai/gpt-4o"

# Aliases resolve automatically
curl "https://openrouter.ai/api/v1/model/anthropic/claude-3-5-sonnet"

# Variant suffixes
curl "https://openrouter.ai/api/v1/model/openai/gpt-4:free"
```

Returns `404` if the model doesn't exist and isn't an alias for another model. The response shape wraps the same Model object used in the list endpoint:

```json lines theme={null}
{
  "data": {
    "id": "openai/gpt-4o",
    "name": "GPT-4o",
    "pricing": { "prompt": "0.0000025", "completion": "0.00001", ... },
    ...
  }
}
```

## Models API Standard

Our [Models API](/api/api-reference/models/list-all-models-and-their-properties) makes the most important information about all LLMs freely available as soon as we confirm it.

### API Response Schema

The Models API returns a standardized JSON response format that provides comprehensive metadata for each available model. This schema is cached at the edge and designed for reliable integration with production applications.

#### Root Response Object

```json lines theme={null}
{
  "data": [
    /* Array of Model objects */
  ]
}
```

#### Model Object Schema

Each model in the `data` array contains the following standardized fields:

| Field                  | Type                                          | Description                                                                            |
| ---------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `id`                   | `string`                                      | Unique model identifier used in API requests (e.g., `"google/gemini-2.5-pro-preview"`) |
| `canonical_slug`       | `string`                                      | Permanent slug for the model that never changes                                        |
| `name`                 | `string`                                      | Human-readable display name for the model                                              |
| `created`              | `number`                                      | Unix timestamp of when the model was added to OpenRouter                               |
| `description`          | `string`                                      | Detailed description of the model's capabilities and characteristics                   |
| `context_length`       | `number`                                      | Maximum context window size in tokens                                                  |
| `architecture`         | `Architecture`                                | Object describing the model's technical capabilities                                   |
| `pricing`              | `Pricing`                                     | Lowest price structure for using this model                                            |
| `top_provider`         | `TopProvider`                                 | Configuration details for the primary provider                                         |
| `per_request_limits`   | Rate limiting information (null if no limits) |                                                                                        |
| `supported_parameters` | `string[]`                                    | Array of supported API parameters for this model                                       |
| `default_parameters`   | `object \| null`                              | Default parameter values for this model (null if none)                                 |
| `expiration_date`      | `string \| null`                              | Deprecation date for the model endpoint (null if not deprecated)                       |
| `benchmarks`           | `Benchmarks \| undefined`                     | Third-party benchmark rankings (omitted when no data is available)                     |

#### Architecture Object

```typescript lines theme={null}
{
  "input_modalities": string[], // Supported input types: ["file", "image", "text"]
  "output_modalities": string[], // Supported output types: ["text"]
  "tokenizer": string,          // Tokenization method used
  "instruct_type": string | null // Instruction format type (null if not applicable)
}
```

#### Pricing Object

All pricing values are in USD per token/request/unit. A value of `"0"` indicates the feature is free.

```typescript lines theme={null}
{
  "prompt": string,           // Cost per input token
  "completion": string,       // Cost per output token
  "request": string,          // Fixed cost per API request
  "image": string,           // Cost per image input
  "web_search": string,      // Cost per web search operation
  "internal_reasoning": string, // Cost for internal reasoning tokens
  "input_cache_read": string,   // Cost per cached input token read
  "input_cache_write": string   // Cost per cached input token write
}
```

#### Top Provider Object

```typescript lines theme={null}
{
  "context_length": number,        // Provider-specific context limit
  "max_completion_tokens": number, // Maximum tokens in response
  "is_moderated": boolean         // Whether content moderation is applied
}
```

#### Benchmarks Object

Present only on models that have been evaluated in third-party benchmarks. Currently includes [Design Arena](https://designarena.org) rankings.

```typescript lines theme={null}
{
  "design_arena": [
    {
      "arena": string,    // Arena type (e.g. "models", "builders", "agents")
      "category": string, // Category within the arena (e.g. "website", "gamedev")
      "elo": number,      // ELO rating from head-to-head arena battles
      "win_rate": number,  // Win rate percentage
      "rank": number      // Rank within this arena+category (1 = highest ELO)
    }
  ]
}
```

Rankings are computed among models listed on OpenRouter, not the full external leaderboard. Models without benchmark data omit the `benchmarks` field entirely.

```bash lines theme={null}
# Find models with benchmark data
curl -s "https://openrouter.ai/api/v1/models" | jq '.data[] | select(.benchmarks) | {id, benchmarks}'
```

#### Supported Parameters

The `supported_parameters` array indicates which OpenAI-compatible parameters work with each model:

* `tools` - Function calling capabilities
* `tool_choice` - Tool selection control
* `max_tokens` - Response length limiting
* `temperature` - Randomness control
* `top_p` - Nucleus sampling
* `reasoning` - Internal reasoning mode
* `include_reasoning` - Include reasoning in response
* `structured_outputs` - JSON schema enforcement
* `response_format` - Output format specification
* `stop` - Custom stop sequences
* `frequency_penalty` - Repetition reduction
* `presence_penalty` - Topic diversity
* `seed` - Deterministic outputs

<Note>
  **Different models tokenize text in different ways**

  Some models break up text into chunks of multiple characters (GPT, Claude,
  Llama, etc), while others tokenize by character (PaLM). This means that token
  counts (and therefore costs) will vary between models, even when inputs and
  outputs are the same. Costs are displayed and billed according to the
  tokenizer for the model in use. You can use the `usage` field in the response
  to get the token counts for the input and output.
</Note>

If there are models or providers you are interested in that OpenRouter doesn't have, please tell us about them in our [Discord channel](https://openrouter.ai/discord).

## For Providers

If you're interested in working with OpenRouter, you can learn more on our [providers page](/guides/community/for-providers).
