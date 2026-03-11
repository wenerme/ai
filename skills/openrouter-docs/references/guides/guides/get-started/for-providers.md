## For Providers

If you'd like to be a model provider and sell inference on OpenRouter, [fill out our form](https://openrouter.ai/how-to-list) to get started.

To be eligible to provide inference on OpenRouter you must have the following:

### 1. List Models Endpoint

You must implement an endpoint that returns all models that should be served by OpenRouter. At this endpoint, please return a list of all available models on your platform. Below is an example of the response format:

```json
{
  "data": [
    {
      // Required
      "id": "anthropic/claude-sonnet-4",
      "hugging_face_id": "", // required if the model is on Hugging Face
      "name": "Anthropic: Claude Sonnet 4",
      "created": 1690502400,
      "input_modalities": ["text", "image", "file"],
      "output_modalities": ["text", "image", "file"],
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
      "deprecation_date": "2025-06-01", // ISO 8601 date (YYYY-MM-DD)
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

Valid quantization values are: `int4`, `int8`, `fp4`, `fp6`, `fp8`, `fp16`, `bf16`, `fp32`.

Valid sampling parameters are: `temperature`, `top_p`, `top_k`, `min_p`, `top_a`, `frequency_penalty`, `presence_penalty`, `repetition_penalty`, `stop`, `seed`, `max_tokens`, `logit_bias`, `logprobs`, `top_logprobs`.

Valid features are: `tools`, `json_mode`, `structured_outputs`, `logprobs`, `web_search`, `reasoning`.

#### Tiered Pricing

For models with different pricing based on context length (e.g., long context pricing), you can provide `pricing` as an array of tiers instead of a single object:

```json
{
  "pricing": [
    {
      "prompt": "0.000002", // base tier pricing per 1 token
      "completion": "0.000012", // base tier pricing per 1 token
      "image": "0.01", // pricing per 1 image (base tier only)
      "request": "0", // pricing per 1 request (base tier only)
      "input_cache_read": "0.000001" // base tier pricing per 1 token
    },
    {
      "prompt": "0.000004", // long context tier pricing per 1 token
      "completion": "0.000018", // long context tier pricing per 1 token
      "input_cache_read": "0.000002", // long context tier pricing per 1 token
      "min_context": 200000 // minimum input tokens for this tier to apply
    }
  ]
}
```

When using tiered pricing, the first tier (index 0) is the base pricing that applies when input tokens are below the `min_context` threshold. The second tier applies when input tokens meet or exceed the `min_context` value.

Limitations:

* Currently, OpenRouter supports up to 2 pricing tiers.
* The `image` and `request` fields are only supported in the base tier (index 0) and will be ignored if included in other tiers.

#### Deprecation Date

If a model is scheduled for deprecation, include the `deprecation_date` field in ISO 8601 format (YYYY-MM-DD):

```json
{
  "id": "anthropic/claude-2.1",
  "deprecation_date": "2025-06-01"
}
```

When OpenRouter's provider monitor detects a deprecation date, it will automatically update the endpoint to display deprecation warnings to users. Models past their deprecation date may be automatically hidden from the marketplace.

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

For each model, we compare every provider's signal values against the group of providers serving that model. We use a **median + MAD** (median absolute deviation) approach rather than simple averages, which keeps thresholds stable even when one provider is a significant outlier.

Each signal has a different sensitivity:

* **Benchmark accuracy** -- providers falling more than **1 standard deviation** below the median are deprioritized. This is the tightest threshold because benchmark scores cluster closely and small differences are meaningful.
* **Throughput** -- providers falling more than **1.5 standard deviations** below the median are deprioritized. The wider margin accounts for natural throughput variance caused by time-of-day load patterns.
* **Tool-calling success rate** -- providers falling more than **2 standard deviations** below the median are deprioritized. Success rates cluster near 100%, so this wider margin avoids penalizing normal noise while catching genuinely broken endpoints.

A minimum of **4 providers** serving the same model is required before statistical thresholds are computed. Below that count, no deprioritization is applied for that signal.

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
