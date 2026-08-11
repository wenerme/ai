> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Provider Integration

## For providers

If you'd like to be a model provider and sell inference on OpenRouter, [fill out our form](https://openrouter.ai/how-to-list) to get started.

<Note>
  Integrated before the current model document format? The
  [legacy flat format](/docs/guides/community/for-providers-legacy) remains supported for existing
  integrations.
</Note>

To be eligible to provide inference on OpenRouter you must have the following:

### 1. List models endpoint

You must implement an endpoint that returns all models that should be served by OpenRouter. Each model is described as a set of typed **input and output modality objects**: every modality owns its capabilities, constraints, passthrough parameters, pricing, and capacity. Only request-scoped prices and capacity entries with no owning modality remain at the document root.

Below is an example of the response format:

```json expandable lines theme={null}
{
  "data": [
    {
      "schema_version": "2.4",

      // Identity (required)
      "id": "anthropic/claude-sonnet-4",
      "name": "Anthropic: Claude Sonnet 4",
      "hugging_face_id": "", // required if the model is on Hugging Face
      "created": 1690502400,
      "quantization": "fp8", // or null when undeclared
      "tokenizer": "Claude", // optional; the model's tokenizer family
      "description": "Anthropic's flagship model...",

      // Input modalities: each entry owns its constraints, pricing, and capacity
      "input_modalities": [
        {
          "type": "text",
          "supported_inputs": {
            "max_context_length": { "value": 1000000, "unit": "token" }
          },
          "pricing": [
            { "type": "prompt", "unit": "token", "cost_usd": "0.000008" },
            { "type": "cached_prompt", "unit": "token", "cost_usd": "0.000001" },
            { "type": "cache_write", "unit": "token", "cost_usd": "0.00001" }
          ],
          "capacity": [
            { "type": "prompt", "unit": "token", "per": "minute", "value": 1000000 },
            { "type": "cached_prompt", "unit": "token", "per": "minute", "value": 2000000 }
          ]
        },
        {
          "type": "image",
          "supported_inputs": {
            "sources": { "type": "enum", "values": ["url", "base64"] },
            "formats": {
              "type": "enum",
              "values": ["image/png", "image/jpeg", "image/webp", "image/gif"]
            },
            "max_content_size_bytes": { "value": 20971520, "unit": "byte" }
          },
          "pricing": [{ "type": "prompt", "unit": "image", "cost_usd": "0.0048" }]
        },
        {
          "type": "file",
          "supported_inputs": {
            "formats": { "type": "enum", "values": ["application/pdf"] }
          }
        }
      ],

      // Output modalities: each entry owns its parameters, pricing, and capacity
      "output_modalities": [
        {
          "type": "text",
          "max_length": { "value": 128000, "unit": "token" },
          "streaming": true,
          "supported_parameters": {
            "temperature": { "type": "range", "min": 0, "max": 1 },
            "top_p": { "type": "range", "min": 0, "max": 1 },
            "max_tokens": { "type": "integer", "min": 1, "max": 128000, "unit": "token" },
            "stop": { "type": "array", "max_items": 4 },
            "tools": { "type": "boolean" },
            "structured_outputs": { "type": "boolean" },
            "reasoning": { "type": "boolean" }
          },
          "pricing": [
            { "type": "completion", "unit": "token", "cost_usd": "0.000024" },
            { "type": "internal_reasoning", "unit": "token", "cost_usd": "0.000024" }
          ],
          "capacity": [
            { "type": "completion", "unit": "token", "per": "minute", "value": 500000 }
          ]
        }
      ],

      // Root pricing and capacity: request-scoped entries only
      "pricing": [
        { "type": "web_search", "unit": "search", "cost_usd": "0.01" }
      ],
      "capacity": [
        { "type": "request", "unit": "request", "per": "minute", "value": 1000 }
      ],

      // Request-scoped passthrough parameters
      "passthrough_parameters": {
        "service_tier": { "type": "enum", "values": ["standard", "priority"] }
      },

      // Operational fields (optional)
      "deprecation_date": "2025-06-01T15:00:00Z",
      "is_ready": true,
      "is_free": false,
      "discount_to_user": 0,
      "openrouter": {
        "slug": "anthropic/claude-sonnet-4"
      },
      "datacenters": [{ "country_code": "US", "region": "us-east-1" }],
      "compliance": { "zdr": true, "hipaa": false }
    }
  ]
}
```

The `id` field should be the exact model identifier that OpenRouter will use when calling your API.

All `cost_usd` fields are in string format to avoid floating point precision issues, and must be in USD.

<Note>
  The [previous flat model document format](/docs/guides/community/for-providers-legacy) (a flat
  `pricing` object with `pricing.overrides`, `supported_sampling_parameters`,
  `supported_features`, and `capacity_tpm`) remains supported for existing integrations, but use
  the format above for all new integrations.
</Note>

Valid quantization values are: `int4`, `int8`, `fp4`, `mxfp4`, `nvfp4`, `fp6`, `fp8`, `mxfp8`, `fp16`, `bf16`, `fp32`. Use `null` (or omit the field) when the precision is undeclared.

The optional `tokenizer` field names the tokenizer family the model uses (for example `GPT`, `Claude`, `Llama3`, `Gemini`). Like `quantization`, it describes the model as a whole, so it lives at the root rather than under any modality. Omit it when unknown.

### 2. Modalities

A document must declare at least one input modality and at least one output modality.

#### Input modalities

Valid input modality types are: `text`, `image`, `video`, `audio`, `file`.

<CodeGroup>
  ```json title="text" lines theme={null}
  {
    "type": "text",
    "supported_inputs": {
      "max_context_length": { "value": 1000000, "unit": "token" },
      "max_prompt_length": { "value": 900000, "unit": "token" }
    },
    "pricing": [
      { "type": "prompt", "unit": "token", "cost_usd": "0.000008" },
      { "type": "cached_prompt", "unit": "token", "cost_usd": "0.000001" }
    ],
    "capacity": [
      { "type": "prompt", "unit": "token", "per": "minute", "value": 1000000 },
      { "type": "cached_prompt", "unit": "token", "per": "minute", "value": 2000000 }
    ]
  }
  ```

  ```json title="image" lines theme={null}
  {
    "type": "image",
    "supported_inputs": {
      "sources": { "type": "enum", "values": ["url", "base64"] },
      "formats": { "type": "enum", "values": ["image/png", "image/jpeg", "image/webp", "image/gif"] },
      "detail_levels": { "type": "enum", "values": ["auto", "low", "high"] },
      "references": { "type": "integer", "min": 0, "max": 10 },
      "max_content_size_bytes": { "value": 20971520, "unit": "byte" }
    },
    "pricing": [{ "type": "prompt", "unit": "image", "cost_usd": "0.0048" }]
  }
  ```

  ```json title="video" lines theme={null}
  {
    "type": "video",
    "supported_inputs": {
      "sources": { "type": "enum", "values": ["url", "base64"] },
      "formats": { "type": "enum", "values": ["video/mp4", "video/webm"] },
      "max_duration_seconds": { "value": 60, "unit": "second" },
      "max_content_size_bytes": { "value": 104857600, "unit": "byte" }
    },
    "pricing": [{ "type": "prompt", "unit": "second", "cost_usd": "0.0002" }]
  }
  ```

  ```json title="audio" lines theme={null}
  {
    "type": "audio",
    "supported_inputs": {
      "sources": { "type": "enum", "values": ["url", "base64"] },
      "formats": { "type": "enum", "values": ["audio/wav", "audio/mpeg"] },
      "max_duration_seconds": { "value": 3600, "unit": "second" }
    },
    "pricing": [{ "type": "prompt", "unit": "second", "cost_usd": "0.0001" }]
  }
  ```

  ```json title="file" lines theme={null}
  {
    "type": "file",
    "supported_inputs": {
      "sources": { "type": "enum", "values": ["url", "base64"] },
      "formats": { "type": "enum", "values": ["application/pdf", "text/plain", "text/csv"] },
      "references": { "type": "integer", "min": 0, "max": 5 },
      "max_content_size_bytes": { "value": 52428800, "unit": "byte" }
    }
  }
  ```
</CodeGroup>

Each input modality entry carries:

| Field                    | Required | Description                                                                                                 |
| ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| `type`                   | Yes      | The modality discriminator                                                                                  |
| `supported_inputs`       | No       | Typed constraints for this modality (see below)                                                             |
| `pricing`                | No       | Prices billed against this input (see [Pricing](#3-pricing))                                                |
| `capacity`               | No       | Declared throughput limits for this input (see [Capacity](#4-capacity))                                     |
| `passthrough_parameters` | No       | Provider-specific parameters scoped to this input (see [Passthrough Parameters](#5-passthrough-parameters)) |

The `supported_inputs` object uses the same [capability descriptor](#capability-descriptors) grammar as output `supported_parameters`, with closed enums for every known value domain:

| Modality | Constraint fields                                                                     |
| -------- | ------------------------------------------------------------------------------------- |
| `text`   | `max_context_length`, `max_prompt_length`                                             |
| `image`  | `sources`, `formats`, `detail_levels`, `references`, `role`, `max_content_size_bytes` |
| `video`  | `sources`, `formats`, `max_duration_seconds`, `max_content_size_bytes`                |
| `audio`  | `sources`, `formats`, `max_duration_seconds`, `max_content_size_bytes`                |
| `file`   | `sources`, `formats`, `references`, `max_content_size_bytes`                          |

Common constraint fields:

* `sources`, how media may be supplied: `url`, `base64`
* `formats`, accepted MIME types, e.g. `image/png`, `image/jpeg`, `image/webp`, `image/gif` for images; `video/mp4`, `video/webm` for video; `audio/wav`, `audio/mpeg` for audio; `application/pdf`, `text/plain`, `text/markdown`, `text/html`, `text/csv`, `application/json` for files
* `detail_levels` (image): `auto`, `low`, `high`, `original`
* `role` (image), the role an image plays in the request: `reference`, `first_frame`, `last_frame`
* `references` (image, file), an integer descriptor for how many reference items a request may include, e.g. `{ "type": "integer", "min": 0, "max": 10 }`
* `max_context_length` (text), the total context window: input and output tokens combined
* `max_prompt_length` (text), the maximum input length alone; declare it only when it differs from the context window

Single-value limits (`max_context_length`, `max_prompt_length`, output `max_length`, `max_duration_seconds`, `max_content_size_bytes`) are objects with a `value` and an optional `unit` (`second`, `pixel`, `byte`, `token`, `character`):

```json lines theme={null}
{ "max_context_length": { "value": 1000000, "unit": "token" } }
```

#### Output modalities

Valid output modality types are: `text`, `image`, `video`, `speech`, `transcription`, `embeddings`, `rerank`, `audio`.

<CodeGroup>
  ```json title="text" lines theme={null}
  {
    "type": "text",
    "max_length": { "value": 128000, "unit": "token" },
    "streaming": true,
    "supported_parameters": {
      "temperature": { "type": "range", "min": 0, "max": 1 },
      "top_p": { "type": "range", "min": 0, "max": 1 },
      "max_tokens": { "type": "integer", "min": 1, "max": 128000, "unit": "token" },
      "stop": { "type": "array", "max_items": 4 },
      "tools": { "type": "boolean" },
      "structured_outputs": { "type": "boolean" },
      "reasoning": { "type": "boolean" }
    },
    "pricing": [
      { "type": "completion", "unit": "token", "cost_usd": "0.000024" },
      { "type": "internal_reasoning", "unit": "token", "cost_usd": "0.000024" }
    ],
    "capacity": [
      { "type": "completion", "unit": "token", "per": "minute", "value": 500000 }
    ]
  }
  ```

  ```json title="image" lines theme={null}
  {
    "type": "image",
    "streaming": false,
    "supported_parameters": {
      "resolution": { "type": "enum", "values": ["1K", "2K", "4K"] },
      "steps": { "type": "integer", "min": 1, "max": 50 },
      "aspect_ratio": { "type": "enum", "values": ["1:1", "16:9", "9:16"] },
      "n": { "type": "integer", "min": 1, "max": 10 },
      "seed": { "type": "boolean" }
    },
    "pricing": [{ "type": "completion", "unit": "image", "cost_usd": "0.05" }],
    "capacity": [
      { "type": "completion", "unit": "image", "per": "minute", "value": 1000 },
      { "type": "concurrency", "unit": "request", "value": 4 }
    ]
  }
  ```

  ```json title="video" lines theme={null}
  {
    "type": "video",
    "streaming": false,
    "supported_parameters": {
      "duration_seconds": { "type": "enum", "values": [5, 10] },
      "resolution": { "type": "enum", "values": ["720p", "1080p"] },
      "aspect_ratio": { "type": "enum", "values": ["16:9", "9:16"] }
    },
    "pricing": [{ "type": "completion", "unit": "second", "cost_usd": "0.05" }]
  }
  ```

  ```json title="speech" lines theme={null}
  {
    "type": "speech",
    "streaming": true,
    "supported_parameters": {
      "voice": { "type": "enum", "values": ["alloy", "verse", "aria"] },
      "speed": { "type": "range", "min": 0.25, "max": 4, "default": 1 },
      "output_format": { "type": "enum", "values": ["mp3", "wav", "opus"] }
    },
    "pricing": [{ "type": "completion", "unit": "character", "cost_usd": "0.000015" }]
  }
  ```

  ```json title="transcription" lines theme={null}
  {
    "type": "transcription",
    "streaming": true,
    "supported_parameters": {
      "language": { "type": "enum", "values": ["auto", "en", "es", "fr"] },
      "timestamps": { "type": "boolean" },
      "diarization": { "type": "boolean" }
    },
    "pricing": [{ "type": "completion", "unit": "second", "cost_usd": "0.0001" }]
  }
  ```

  ```json title="embeddings" lines theme={null}
  {
    "type": "embeddings",
    "supported_parameters": {
      "dimensions": { "type": "enum", "values": [256, 1024, 3072] },
      "encoding_format": { "type": "enum", "values": ["float", "base64"] }
    },
    "pricing": [{ "type": "completion", "unit": "token", "cost_usd": "0.0000001" }]
  }
  ```

  ```json title="rerank" lines theme={null}
  {
    "type": "rerank",
    "supported_parameters": {
      "top_n": { "type": "integer", "min": 1, "max": 100 },
      "return_documents": { "type": "boolean" }
    },
    "pricing": [{ "type": "completion", "unit": "request", "cost_usd": "0.002" }]
  }
  ```

  ```json title="audio" lines theme={null}
  {
    "type": "audio",
    "streaming": true,
    "supported_parameters": {
      "voice": { "type": "enum", "values": ["alloy", "verse"] },
      "output_format": { "type": "enum", "values": ["pcm16", "mp3"] }
    },
    "pricing": [{ "type": "completion", "unit": "token", "cost_usd": "0.00008" }]
  }
  ```
</CodeGroup>

Each output modality entry carries:

| Field                    | Required | Description                                                                                   |
| ------------------------ | -------- | --------------------------------------------------------------------------------------------- |
| `type`                   | Yes      | The modality discriminator                                                                    |
| `supported_parameters`   | Yes      | Descriptor map of the generation parameters this modality accepts                             |
| `streaming`              | No       | Whether this output supports native SSE streaming (not applicable to `embeddings` / `rerank`) |
| `max_length`             | No       | Maximum output length (`text` only)                                                           |
| `pricing`                | No       | Prices billed against this output (see [Pricing](#3-pricing))                                 |
| `capacity`               | No       | Declared throughput limits for this output (see [Capacity](#4-capacity))                      |
| `passthrough_parameters` | No       | Provider-specific parameters scoped to this output                                            |

#### Capability descriptors

`supported_parameters` and `passthrough_parameters` are maps from parameter name to a typed descriptor describing what the parameter accepts:

| Type      | Shape                                                             | Meaning                                                 |
| --------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| `range`   | `{ "type": "range", "min": 0, "max": 1 }`                         | Any number in `[min, max]` is valid                     |
| `integer` | `{ "type": "integer", "min": 1, "max": 128000, "unit": "token" }` | Any integer in `[min, max]` is valid                    |
| `boolean` | `{ "type": "boolean" }`                                           | Supported (present) or unsupported (absent)             |
| `enum`    | `{ "type": "enum", "values": ["standard", "priority"] }`          | Discrete allowlist of accepted values                   |
| `array`   | `{ "type": "array", "items": { ... }, "max_items": 4 }`           | List of values described by `items`                     |
| `object`  | `{ "type": "object", "properties": { ... } }`                     | Nested object with per-key descriptors                  |
| `unknown` | `{ "type": "unknown" }`                                           | Accepted, but the value domain is not machine-described |

Descriptors may carry an optional `default` and, for numeric types, a `unit`. An absent key means the parameter is unsupported.

### 3. Pricing

Pricing uses **arrays nested on the modality that owns them**. Each pricing entry has a `type` (the billing kind), a `unit` (the billing basis), and a `cost_usd` string. The `unit` is the base billing unit, not a commitment to a flat price: per-image and per-token prices can scale with parameters declared by the owning modality.

Each pricing scope accepts the units it can bill in. Input entries take `token`, `image`, `megapixel`, `second`, or `character`. Output entries take those units plus `request`. Root `request` entries are always per `request` and `web_search` entries per `search`. Other combinations are rejected at validation time.

The `megapixel` unit prices resolution-scaled media: `cost_usd` is the rate per megapixel (1,000,000 pixels) of media area, so cost scales linearly with the pixel dimensions of the input consumed or output generated. An image output billed at \$0.015 per megapixel declares:

```json lines theme={null}
{ "type": "completion", "unit": "megapixel", "cost_usd": "0.015" }
```

A document that validates is a valid declaration, not a guarantee that every declared SKU is billed today: OpenRouter bills the SKUs its pipeline supports and records the rest, and billing for newly declared SKU shapes lands as support for them does. Declare what you charge; do not tailor the document to what OpenRouter currently bills.

**Input pricing types** (on input modality entries):

| Type            | Meaning                               |
| --------------- | ------------------------------------- |
| `prompt`        | Cost per unit of this input consumed  |
| `cached_prompt` | Cost per unit read from prompt cache  |
| `cache_write`   | Cost per unit written to prompt cache |

**Output pricing types** (on output modality entries):

| Type                 | Meaning                                    |
| -------------------- | ------------------------------------------ |
| `completion`         | Cost per unit of this output generated     |
| `internal_reasoning` | Cost per unit of internal reasoning tokens |

**Request pricing types** (root `pricing` array, the only prices at the root):

| Type         | Meaning                       |
| ------------ | ----------------------------- |
| `request`    | Flat cost per request         |
| `web_search` | Cost per web search performed |

Do not zero-stuff prices: omit pricing entries for SKUs you don't bill. A genuinely free SKU exposed as a distinct billable line may use `"0"`. A modality with no `pricing` array is simply unpriced.

#### Conditional pricing with `overrides`

Conditional pricing (e.g. long-context tiers) attaches declaratively to the individual pricing entry it modifies, using a `when` predicate:

```json lines theme={null}
{
  "type": "prompt",
  "unit": "token",
  "cost_usd": "0.000002",
  "overrides": [
    {
      "when": { "prompt_tokens": { "gte": 200001 } },
      "cost_usd": "0.000004"
    }
  ]
}
```

For scaled pricing, declare the controlling knobs in `supported_parameters` and attach overrides keyed by those parameter names. A plain predicate map applies **AND** across its keys:

```json lines theme={null}
{
  "type": "completion",
  "unit": "image",
  "cost_usd": "0.03",
  "overrides": [
    { "when": { "resolution": { "equals": "2K" } }, "cost_usd": "0.05" },
    { "when": { "resolution": { "equals": "4K" } }, "cost_usd": "0.09" },
    { "when": { "steps": { "gte": 30 } }, "cost_usd": "0.06" },
    {
      "when": {
        "allOf": [
          { "resolution": { "equals": "4K" } },
          { "steps": { "gte": 30 } }
        ]
      },
      "cost_usd": "0.12"
    }
  ]
}
```

The `when` predicate is either a parameter-to-condition map or a composition using `allOf`, `anyOf`, and `not`. Composition members are predicates, so these operators can be nested. Conditions reuse the operators `equals`, `gte`, `lte`, and `min_items`, with exactly one operator per condition object; a composition object carries exactly one of `allOf`, `anyOf`, or `not`. A plain multi-key map is equivalent to `allOf` over single-key maps.

Override entries are evaluated in order. Among matching predicates, the later entry wins. This makes a resolution-by-steps price matrix expressible without OR nesting. Predicates may reference parameters declared by the owning modality or request-derived quantities such as prompt token count.

<Note>
  Override predicates are parameter-based. Time-dependent pricing is not an override, because time
  is not a request parameter. See [Time-of-Day Pricing](#time-of-day-pricing).
</Note>

#### Cache pricing

Cache prices are first-class SKUs in a modality's `pricing` array. Multiple entries may have the same `type` when their qualifier fields differ. The effective identity of an entry is its `type` together with its qualifiers, so two `cache_write` entries with different TTLs are separate SKUs. Two entries with the same effective identity are invalid.

`ttl_seconds` is the cache lifetime the price applies to. It is a qualifier field, not part of the `type` string, so providers can add lifetimes without expanding the pricing type enum. `implicit` marks provider-initiated caching that the request does not ask for and defaults to `false`. Explicit and implicit cache modes can coexist on one model.

Cache pricing is input-side. Prompt caching stores and re-reads input tokens, so cache entries belong on input modality entries and never on outputs. The word `write` describes writing to the prompt cache, not generated output.

Cache prices are base entries, not overrides. Overrides remain reserved for request-conditional pricing on generation parameters. Cache SKUs are enumerable so billing and product surfaces can display them directly. A provider may take TTL as a request parameter and the price is still modeled as a cache SKU rather than an override. A cache entry may itself carry overrides for genuinely request-conditional pricing, such as a long-context tier raising the cache write rate, but never for TTL differences.

Cache pricing is per modality, so an image input modality can carry its own cache entries at its own rates. A text input modality offering two explicit write lifetimes alongside provider-initiated caching looks like this:

```json lines theme={null}
{
  "type": "text",
  "supported_inputs": {
    "max_context_length": { "value": 1000000, "unit": "token" }
  },
  "pricing": [
    { "type": "prompt", "unit": "token", "cost_usd": "0.000008" },
    { "type": "cached_prompt", "unit": "token", "cost_usd": "0.000001" },
    { "type": "cache_write", "unit": "token", "ttl_seconds": 300, "cost_usd": "0.00001" },
    { "type": "cache_write", "unit": "token", "ttl_seconds": 3600, "cost_usd": "0.00002" },
    { "type": "cache_write", "unit": "token", "ttl_seconds": 86400, "implicit": true, "cost_usd": "0" }
  ]
}
```

The zero cost on the implicit entry is intentional. It represents a genuinely free SKU that the provider exposes as a distinct line. Omit a SKU when the provider does not bill it.

#### Time-of-day pricing

Time-dependent prices (peak and off-peak rates) follow the same pattern as cache lifetimes: the time window is a pair of structured qualifier fields on the pricing entry, not an override. Time is not a request parameter, so an override's `when` predicate has nothing to reference.

`utc_start` and `utc_end` are HHMM values in UTC (`0000`–`2359`; the minute component must be `00`–`59`), declared together, and must differ. The window is half-open (it includes `utc_start` and excludes `utc_end`) and may wrap midnight. An entry without a window is the base rate for all other hours. A text modality billed at a higher rate during a peak window looks like this:

```json lines theme={null}
{
  "type": "text",
  "pricing": [
    { "type": "prompt", "unit": "token", "cost_usd": "0.000004" },
    { "type": "prompt", "unit": "token", "utc_start": 800, "utc_end": 1630, "cost_usd": "0.000008" }
  ]
}
```

Time windows are accepted on input and output pricing entries. Like `ttl_seconds`, the window is part of the entry's effective identity, so entries with different windows are separate SKUs and two entries with the same window are invalid.

### 4. Capacity

Capacity uses the same typed, scoped placement as pricing. Each input and output modality may carry its own `capacity` array as a sibling of `pricing`. The root `capacity` array holds request-scoped entries only. This adds no new root structure.

Each capacity entry has a `type` describing what is limited, a `unit` giving the basis, a `per` window, and a positive integer `value`:

```json lines theme={null}
{
  "type": "prompt",
  "unit": "token",
  "per": "minute",
  "value": 1000000
}
```

Capacity types reuse the pricing types for the scope that owns them. Input entries use input pricing types, output entries use output pricing types, and root entries use request pricing types. Output and root entries may also use `concurrency` for simultaneous in-flight work. `concurrency` has no `per` window. Valid windows are `minute`, `hour`, and `day`. An absent `capacity` array means the limit is undeclared, not zero.

A capacity entry's identity is its `type`, `unit`, and `per` window together, and two entries with the same identity are invalid. Entries that differ only in their window may coexist, so a per-minute burst limit and a daily quota on the same dimension are both declarable. `concurrency` entries carry no window, so they are unique by `type` and `unit` alone.

Limits declared in different scopes are independent buckets that all apply simultaneously: a per-modality token limit and a root request limit each constrain traffic on their own dimension, and a request is admitted only when every declared limit it consumes against has headroom. Declaring a limit in one scope does not relax or replace a limit in another.

This reuse distinguishes prompt, cached prompt, and output capacity without adding separate fields for each dimension. Capacity and pricing remain separate sibling arrays because a modality may declare limits without prices, or prices without declared limits. Units are constrained per scope, exactly as pricing units are: an entry accepts any unit its scope (input, output, or root) can bill in, so image capacity is expressed as images per minute (or megapixels per minute for resolution-scaled throughput), video capacity as output seconds per minute, and a mismatched pairing (such as a `prompt` capacity per `search`) is rejected at validation time. Validation is not narrowed to the owning modality's own billing unit, which is why an image output modality may carry a `concurrency` entry in `request` units.

Here is a capacity declaration covering text input, text output, image output, and request scope:

<CodeGroup>
  ```json title="text input" lines theme={null}
  {
    "type": "text",
    "supported_inputs": {
      "max_context_length": { "value": 1000000, "unit": "token" }
    },
    "capacity": [
      { "type": "prompt", "unit": "token", "per": "minute", "value": 1000000 },
      { "type": "cached_prompt", "unit": "token", "per": "minute", "value": 2000000 }
    ]
  }
  ```

  ```json title="text output" lines theme={null}
  {
    "type": "text",
    "supported_parameters": {
      "max_tokens": { "type": "integer", "min": 1, "max": 128000, "unit": "token" }
    },
    "capacity": [
      { "type": "completion", "unit": "token", "per": "minute", "value": 500000 }
    ]
  }
  ```

  ```json title="image output" lines theme={null}
  {
    "type": "image",
    "supported_parameters": {
      "resolution": { "type": "enum", "values": ["1K", "2K", "4K"] }
    },
    "capacity": [
      { "type": "completion", "unit": "image", "per": "minute", "value": 1000 },
      { "type": "concurrency", "unit": "request", "value": 4 }
    ]
  }
  ```

  ```json title="document root" lines theme={null}
  {
    "capacity": [
      { "type": "request", "unit": "request", "per": "minute", "value": 1000 }
    ]
  }
  ```
</CodeGroup>

### 5. Passthrough parameters

Passthrough parameters are provider-specific escape hatches that OpenRouter forwards verbatim, distinct from the normalized `supported_parameters`. They are placed by scope:

* **Request-scoped** parameters (applying to the request as a whole) live in the root `passthrough_parameters` map.
* **Input-scoped** parameters (owned by one input modality, e.g. reference-media controls) live on that input entry.
* **Output-scoped** parameters (generation controls owned by one output modality) live on that output entry.

Each map uses the same [capability descriptor](#capability-descriptors) grammar, so consumers can validate values instead of guessing:

```json lines theme={null}
{
  "passthrough_parameters": {
    "service_tier": { "type": "enum", "values": ["standard", "priority"] },
    "safety_settings": { "type": "object" }
  }
}
```

### 6. Datacenters and compliance

Declare where each endpoint physically serves from and its data-handling posture:

```json lines theme={null}
{
  "datacenters": [
    { "country_code": "US", "region": "us-east-1" },
    { "country_code": "DE" }
  ],
  "compliance": {
    "zdr": true,
    "hipaa": false
  }
}
```

* `datacenters[].country_code`: ISO 3166-1 alpha-2 country code.
* `datacenters[].region`: provider-scoped region identifier (e.g. `us-east-1`).
* `compliance.zdr`, zero data retention: no prompt retention and no training on prompts.
* `compliance.hipaa`: HIPAA compliance. Additional boolean certification flags (SOC 2, GDPR, FedRAMP, ...) may be added over time.

### 7. Operational fields

The operational fields control model availability and routing:

| Field              | Description                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `deprecation_date` | ISO 8601 date or UTC hour. See [Deprecation Date](#deprecation-date)                                       |
| `is_ready`         | Launch control. See [Controlling Launch with `is_ready`](#controlling-launch-with-is_ready)                |
| `is_free`          | Free variant marker. See [Free Model Variants with `is_free`](#free-model-variants-with-is_free)           |
| `discount_to_user` | Fractional user-facing discount. See [Discounts with `discount_to_user`](#discounts-with-discount_to_user) |
| `openrouter.slug`  | The OpenRouter slug this model maps to                                                                     |

#### Deprecation date

If a model is scheduled for deprecation, include the `deprecation_date` field in ISO 8601 format. OpenRouter accepts either a date-only value or a specific UTC hour:

```json lines theme={null}
{
  "id": "anthropic/claude-2.1",
  "deprecation_date": "2025-06-01"
}
```

* Use `YYYY-MM-DD` for date-only deprecations. Date-only values default to 13:00 UTC on that date.
* Use `YYYY-MM-DDTHH:00:00Z` to request a specific UTC hour, for example `2025-06-01T15:00:00Z`.

When OpenRouter's provider monitor detects a deprecation date or time, it will automatically update the endpoint to display deprecation warnings to users. Models past their deprecation time may be automatically hidden from the marketplace.

#### Controlling launch with `is_ready`

By default, when OpenRouter's provider monitor sees a new model in your `/v1/models` response, it auto-stages the endpoint, runs baseline tests, and unhides it (makes it live) once the tests pass and pricing is configured. If you need to upload a model ahead of an announcement, or temporarily take a model offline, set the optional boolean `is_ready` field:

```json lines theme={null}
{
  "id": "your-org/upcoming-model",
  "is_ready": false
}
```

Behavior:

* `is_ready: false` skips baseline tests for newly-staged endpoints, keeping them hidden, and auto-hides any matching endpoint that is currently live. Use this to upload a model in advance of launch, or to take a live model offline coordinated with us.
* `is_ready: true` and an omitted/absent field both preserve the default auto-stage and auto-unhide behavior.

#### Free model variants with `is_free`

If you want to offer a free version of a model, set `is_free: true`:

```json lines theme={null}
{
  "id": "your-org/your-model",
  "is_free": true
}
```

Behavior:

* `is_free: true` marks the endpoint as a free endpoint (`:free` suffix).
* Any pricing sent alongside `is_free: true` is ignored. Free endpoints always have zero cost.
* `is_free: false` or an omitted field preserves the default behavior (standard paid variant).

You can list both a free and a paid version of the same model. Just always set `is_free: true` on the free one.

#### Discounts with `discount_to_user`

To offer a discount on the prices users see and pay, include the optional `discount_to_user` field. It's a decimal fraction that OpenRouter applies to your displayed pricing:

```text lines theme={null}
user price = base price × (1 - discount_to_user)
```

```json lines theme={null}
{
  "id": "your-org/your-model",
  "discount_to_user": 0.2
}
```

Behavior:

* `0.2` means users see and pay 20% less than your listed pricing. A `cost_usd` of `"0.000024"` displays as `0.0000192`.
* The discount applies to every priced SKU (prompt, completion, image, cache reads, and so on), including conditional overrides and time windows.
* `0`, an omitted field, or an absent field all mean no discount.
* A negative value applies a markup instead of a discount, so `-0.1` shows prices 10% higher.
* A value of `1` or higher would make the model free (or negative-priced), which isn't a valid discount. The schema rejects it as a validation error, so use a value below `1`.

Send `discount_to_user` as a number, not a string. Unlike the `cost_usd` fields, it isn't quoted.

### 8. Schema download

The full schema is available as an OpenAPI 3.1 document, in which every closed value domain (modality types, pricing types and units, capacity windows, descriptor types, media sources, formats) surfaces as an explicit `enum`:

[Download the provider schema (OpenAPI 3.1 JSON)](/docs/assets/provider-monitor-schema-v2.openapi.json)

### 9. Auto top up or invoicing

For OpenRouter to use the provider we must be able to pay for inference automatically. This can be done via auto top up or invoicing.

### 10. Uptime monitoring and traffic routing

OpenRouter automatically monitors provider reliability and adjusts traffic routing based on uptime metrics. Your endpoint's uptime is calculated as: **successful requests ÷ total requests** (excluding user errors).

**Errors that affect your uptime:**

* Authentication issues (401)
* Payment failures (402)
* Model not found (404)
* All server errors (500+)
* Mid-stream errors
* Successful requests with error finish reasons

**Errors that DON'T affect uptime:**

* Bad requests (400) - user input errors
* Oversized payloads (413) - user input errors
* Rate limiting (429) - tracked separately
* Geographic restrictions (403) - tracked separately

**Traffic routing thresholds:**

* **Minimum data**: 100+ requests required before uptime calculation begins
* **Normal routing**: 95%+ uptime
* **Degraded status**: 80-94% uptime → receives lower priority
* **Down status**: \<80% uptime → only used as fallback

This system ensures traffic automatically flows to the most reliable providers while giving temporary issues time to resolve.

### 11. Performance metrics

OpenRouter publicly tracks TTFT (time to first token) and throughput (tokens/second) for all providers on each model page.

Throughput is calculated as: **output tokens ÷ generation time**, where generation time includes fetch latency (time from request to first server response), TTFT, and streaming time. This means any queueing on your end will show up in your throughput metrics.

To keep your metrics competitive:

* Return early 429s if under load, rather than queueing requests
* Stream tokens as soon as they're available
* If processing takes time (e.g. reasoning models), send SSE comments as keep-alives so we know you're still working on the request. Otherwise we may cancel with a fetch timeout and fallback to another provider

### 12. Auto Exacto: tool-calling traffic routing

[Auto Exacto](/docs/guides/routing/auto-exacto) is a routing step that automatically reorders providers for all requests that include tools. It runs by default on every tool-calling request and may change how much tool-calling traffic your endpoints receive.

#### How traffic is affected

Auto Exacto shifts tool-calling traffic toward providers that perform well on tool-use quality signals. Providers with strong metrics are moved to the front of the routing order and will receive more tool-calling requests, while providers with weaker signals are deprioritized and will see less.

Non-tool-calling traffic is **not affected** by Auto Exacto -- it continues to follow the standard [price-weighted routing](/docs/guides/routing/provider-selection#price-based-load-balancing-default-strategy).

#### How ranking factors are determined

Auto Exacto uses three classes of signals, all derived from real traffic and evaluations on your endpoints:

* **Throughput** -- real-time tokens-per-second measured from actual requests routed through your endpoint (visible on the [Performance tab](https://openrouter.ai/models) of any model page).
* **Tool-calling success rate** -- how reliably your endpoint completes tool calls without errors (also visible on the Performance tab).
* **Benchmark data** -- results from internal evaluations we run against provider endpoints. We are actively collecting this data and will make it available in your provider dashboard soon so you can review and run the same benchmarks on your end.

These are the same metrics available in your provider dashboard. Once onboarded, our team can give you access to it.

#### How deprioritization thresholds work

Throughput and tool-calling success rate compare current signal values against the live group of providers serving each model using a **median + MAD** (median absolute deviation) approach. Benchmark accuracy instead uses a historical baseline from the model's early benchmarking window, so once that window closes its cutoff does not move with the current peer group.

Each signal has a different sensitivity:

* **Benchmark accuracy** -- the cutoff is a baseline computed from the first approximately 21 days of benchmarking for that model and benchmark type: the median of per-endpoint scores over that window minus **2 standard deviations** (median − 2σ). Each window opens with the first qualifying result for that model and benchmark type. While a window is still in progress, the baseline is periodically recomputed from all qualifying results collected so far, so a new qualifying result for that benchmark type from any provider can shift the cutoff; after the window closes, the baseline as currently constituted admits no results from later benchmark runs and later changes in another provider's score do not move the cutoff. An endpoint scoring below the cutoff, or missing benchmark data entirely, is deprioritized.
* **Throughput** -- providers falling more than **1.5 standard deviations** below the median are deprioritized. The wider margin accounts for natural throughput variance caused by time-of-day load patterns.
* **Tool-calling success rate** -- providers falling more than **2 standard deviations** below the median are deprioritized. Success rates cluster near 100%, so this wider margin avoids penalizing normal noise while catching genuinely broken endpoints.

A minimum of **4 providers** is required before statistical thresholds are computed for live signals; benchmark thresholds require **4 endpoints** within the applicable baseline window. Below the applicable count, no deprioritization is applied for that signal.

Endpoints are placed into one of three tiers:

1. **Good** -- sufficient data and no signals below threshold. These receive top routing priority.
2. **Insufficient data** -- not enough recent traffic to evaluate. These sort behind known-good providers but ahead of deprioritized ones. An endpoint needs at least 100 general requests (30-minute window) and 200 tool-call requests (2-hour window) before it can be evaluated.
3. **Deprioritized** -- one or more signals fell below threshold. These are routed to last.

Consistent rate limiting (429s) can reduce the volume of successful requests available for evaluation, making it harder for us to collect enough benchmark data to place your endpoint in the top tier. Returning early 429s is still preferred over queueing, but minimizing rate limits where possible helps ensure your endpoint has sufficient data for a fair evaluation.

#### How to improve your ranking

To maximize the tool-calling traffic routed to your endpoints:

* **Maintain high tool-call reliability** -- ensure your endpoint returns well-formed tool call responses consistently.
* **Optimize throughput** -- minimize queueing and stream tokens as soon as they are available (see [Performance Metrics](#11-performance-metrics) above).
* **Return early 429s under load** -- rather than queueing and degrading throughput, return rate limit errors so we can retry with another provider and your metrics stay healthy.

For the full user-facing documentation on Auto Exacto, see [Auto Exacto](/docs/guides/routing/auto-exacto).
