> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Provider Integration

## For Providers

If you'd like to be a model provider and sell inference on OpenRouter, [fill out our form](https://openrouter.ai/how-to-list) to get started.

To be eligible to provide inference on OpenRouter you must have the following:

### 1. List Models Endpoint

You must implement an endpoint that returns all models that should be served by OpenRouter. At this endpoint, please return a list of all available models on your platform. Below is an example of the response format:

```json expandable lines theme={null}
{
  "data": [
    {
      // Required
      "id": "anthropic/claude-sonnet-4",
      "hugging_face_id": "", // required if the model is on Hugging Face
      "name": "Anthropic: Claude Sonnet 4",
      "created": 1690502400,
      "input_modalities": ["text", "image", "file"],
      "output_modalities": ["text"],
      "quantization": "fp8",
      "context_length": 1000000,
      "max_output_length": 128000,
      "pricing": {
        "prompt": "0.000008", // pricing per 1 token
        "completion": "0.000024", // pricing per 1 token
        "image": "0", // pricing per 1 image
        "request": "0", // pricing per 1 request
        "input_cache_read": "0" // pricing per 1 token
      },
      "supported_sampling_parameters": ["temperature", "stop"],
      "supported_features": [
        "tools",
        "json_mode",
        "structured_outputs",
        "web_search",
        "reasoning"
      ],
      // Optional
      "description": "Anthropic's flagship model...",
      "deprecation_date": "2025-06-01T15:00:00Z", // ISO 8601 date or UTC hour
      "is_ready": true, // false to keep the model staged-but-hidden on OpenRouter
      "is_free": false, // true to mark as a free endpoint
      "discount_to_user": 0, // fractional discount on user-facing pricing (0 = none)
      "capacity_tpm": 1000000, // input tokens per minute capacity for this model (optional)
      "openrouter": {
        "slug": "anthropic/claude-sonnet-4"
      },
      "datacenters": [
        {
          "country_code": "US" // `Iso3166Alpha2Code`
        }
      ]
    }
  ]
}
```

The `id` field should be the exact model identifier that OpenRouter will use when calling your API.

The `pricing` fields are in string format to avoid floating point precision issues, and must be in USD.

Valid input modalities are: `text`, `image`, `file`, `audio`, `video`.

Valid output modalities are: `text`, `image`, `embeddings`, `audio`, `video`, `rerank`, `speech`, `transcription`.

Valid quantization values are: `int4`, `int8`, `fp4`, `mxfp4`, `nvfp4`, `fp6`, `fp8`, `mxfp8`, `fp16`, `bf16`, `fp32`.

Valid sampling parameters are: `temperature`, `top_p`, `top_k`, `min_p`, `top_a`, `frequency_penalty`, `presence_penalty`, `repetition_penalty`, `stop`, `seed`, `max_tokens`, `logit_bias`.

Valid features are: `tools`, `json_mode`, `structured_outputs`, `logprobs`, `web_search`, `reasoning`.

#### Conditional Pricing with `pricing.overrides`

For models whose pricing varies by condition — long-context pricing or time-based (peak/off-peak) pricing — add an `overrides` array to the `pricing` object. This is the same shape OpenRouter exposes publicly in [`/v1/models`](/docs/guides/overview/models#pricing-object).

Each override entry carries condition fields plus the prices that apply when the condition matches. Price fields omitted from an override inherit from the base `pricing` values.

**Long-context pricing** uses `min_prompt_tokens` — the override applies when prompt tokens exceed the threshold (strict `>`):

```json lines theme={null}
{
  "pricing": {
    "prompt": "0.000002", // base pricing per 1 token
    "completion": "0.000012",
    "input_cache_read": "0.000001",
    "overrides": [
      {
        "min_prompt_tokens": 200000, // applies when prompt tokens > 200K
        "prompt": "0.000004",
        "completion": "0.000018",
        "input_cache_read": "0.000002"
      }
    ]
  }
}
```

**Time-based pricing** uses `utc_start` / `utc_end` — HHMM clock values in UTC. Windows are half-open (`[start, end)`) and may wrap midnight. The windows are pure time conditions: the base pricing applies outside them and the override prices apply inside them, in either direction — the override may be higher or lower than the base price. OpenRouter labels whichever schedule segments are higher-priced as "Peak" on the model page.

Base as the discounted price, with a surcharge override during peak hours:

```json lines theme={null}
{
  "pricing": {
    "prompt": "0.00000028", // base (off-peak) pricing per 1 token
    "completion": "0.0000011",
    "overrides": [
      {
        "utc_start": 100, // peak window: 01:00–05:00 UTC
        "utc_end": 500,
        "prompt": "0.00000056",
        "completion": "0.0000022"
      }
    ]
  }
}
```

Or equivalently, base as the normal price, with a discount override during off-peak hours:

```json lines theme={null}
{
  "pricing": {
    "prompt": "0.00000056", // base (peak) pricing per 1 token
    "completion": "0.0000022",
    "overrides": [
      {
        "utc_start": 500, // off-peak window: 05:00–01:00 UTC
        "utc_end": 100,
        "prompt": "0.00000028",
        "completion": "0.0000011"
      }
    ]
  }
}
```

Limitations:

* Up to 2 long-context tiers, or up to 2 peak windows (all peak windows must share the same prices).
* Long-context and time-based conditions cannot be combined on the same endpoint. Overrides mixing both condition kinds are ignored.

<Note>
  A legacy format — `pricing` as an array of tiers with `min_context` breakpoints — remains supported
  for backwards compatibility, but use `pricing.overrides` for all new integrations.
</Note>

#### Discounts with `discount_to_user`

To offer a discount on the prices users see and pay, include the optional `discount_to_user` field. It's a decimal fraction that OpenRouter applies to your displayed pricing:

```text lines theme={null}
user price = base price × (1 - discount_to_user)
```

```json lines theme={null}
{
  "id": "your-org/your-model",
  "pricing": {
    "prompt": "0.000008",
    "completion": "0.000024"
  },
  "discount_to_user": 0.2
}
```

Behavior:

* `0.2` means users see and pay 20% less than your listed `pricing`. The example `completion` price of `0.000024` displays as `0.0000192`.
* The discount applies to every priced SKU (prompt, completion, image, cache reads, and so on) and to both flat and tiered pricing.
* `0`, an omitted field, or an absent field all mean no discount.
* A negative value applies a markup instead of a discount, so `-0.1` shows prices 10% higher.
* A value of `1` or higher would make the model free (or negative-priced), which isn't a valid discount. We treat it as a misconfiguration and fall back to no discount (`0`), so use a value below `1`.

Send `discount_to_user` as a number, not a string. Unlike the `pricing` fields, it isn't quoted.

#### Deprecation Date

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

#### Controlling Launch with `is_ready`

By default, when OpenRouter's provider monitor sees a new model in your `/v1/models` response, it auto-stages the endpoint, runs baseline tests, and unhides it (makes it live) once the tests pass and pricing is configured. If you need to upload a model ahead of an announcement — or temporarily take a model offline — set the optional boolean `is_ready` field:

```json lines theme={null}
{
  "id": "your-org/upcoming-model",
  "is_ready": false
}
```

Behavior:

* `is_ready: false` skips baseline tests for newly-staged endpoints, keeping them hidden, and auto-hides any matching endpoint that is currently live. Use this to upload a model in advance of launch, or to take a live model offline coordinated with us.
* `is_ready: true` and an omitted/absent field both preserve the default auto-stage and auto-unhide behavior.

#### Free Model Variants with `is_free`

If you want to offer a free version of a model, set `is_free: true`:

```json lines theme={null}
{
  "id": "your-org/your-model",
  "is_free": true
}
```

Behavior:

* `is_free: true` marks the endpoint as a free endpoint (`:free` suffix).
* Any upstream `pricing` sent alongside `is_free: true` is ignored — free endpoints always have zero cost.
* `is_free: false` or an omitted field preserves the default behavior (standard paid variant).

You can list both a free and a paid version of the same model — just always set `is_free: true` on the free one.

#### Capacity with `capacity_tpm`

Report your per-model throughput capacity so OpenRouter can make better routing and capacity-planning decisions. The value is in **input tokens per minute**:

```json lines theme={null}
{
  "id": "your-org/your-model",
  "capacity_tpm": 5000000
}
```

* The value is an integer representing the input tokens per minute your infrastructure can process for this model (i.e. prompt/input throughput, not output generation).
* Omitting the field or setting it to `null` leaves the capacity unknown (the default).
* OpenRouter's provider monitor auto-applies capacity changes when they appear in your `/v1/models` response.

### 2. Auto Top Up or Invoicing

For OpenRouter to use the provider we must be able to pay for inference automatically. This can be done via auto top up or invoicing.

### 3. Uptime Monitoring & Traffic Routing

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

### 4. Performance Metrics

OpenRouter publicly tracks TTFT (time to first token) and throughput (tokens/second) for all providers on each model page.

Throughput is calculated as: **output tokens ÷ generation time**, where generation time includes fetch latency (time from request to first server response), TTFT, and streaming time. This means any queueing on your end will show up in your throughput metrics.

To keep your metrics competitive:

* Return early 429s if under load, rather than queueing requests
* Stream tokens as soon as they're available
* If processing takes time (e.g. reasoning models), send SSE comments as keep-alives so we know you're still working on the request. Otherwise we may cancel with a fetch timeout and fallback to another provider

### 5. Auto Exacto: Tool-Calling Traffic Routing

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
* **Optimize throughput** -- minimize queueing and stream tokens as soon as they are available (see [Performance Metrics](#4-performance-metrics) above).
* **Return early 429s under load** -- rather than queueing and degrading throughput, return rate limit errors so we can retry with another provider and your metrics stay healthy.

For the full user-facing documentation on Auto Exacto, see [Auto Exacto](/docs/guides/routing/auto-exacto).
