> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Broadcast

> Send traces to external observability platforms

Broadcast allows you to automatically send traces from your OpenRouter requests to external observability and analytics platforms. This feature enables you to monitor, debug, and analyze your LLM usage across your preferred tools without any additional instrumentation in your application code.

## Enabling Broadcast

To enable broadcast for your account or organization:

1. Navigate to [Settings > Observability](https://openrouter.ai/settings/observability) in your OpenRouter dashboard
2. Toggle the "Enable Broadcast" switch to turn on the feature
3. Add one or more destinations where you want to send your traces

<Tip>
  If you're using an organization account, you must be an organization admin to edit broadcast settings.
</Tip>

Once enabled, OpenRouter will automatically send trace data for all your API requests to your configured destinations.

## Supported Destinations

The following destinations are currently available:

* [Arize AX](/docs/guides/features/broadcast/arize)
* [Braintrust](/docs/guides/features/broadcast/braintrust)
* [ClickHouse](/docs/guides/features/broadcast/clickhouse)
* [Comet Opik](/docs/guides/features/broadcast/opik)
* [Datadog](/docs/guides/features/broadcast/datadog)
* [Google BigQuery](/docs/guides/features/broadcast/bigquery)
* [Grafana Cloud](/docs/guides/features/broadcast/grafana)
* [Langfuse](/docs/guides/features/broadcast/langfuse)
* [LangSmith](/docs/guides/features/broadcast/langsmith)
* [New Relic](/docs/guides/features/broadcast/newrelic)
* [OpenTelemetry Collector](/docs/guides/features/broadcast/otel-collector)
* [PostHog](/docs/guides/features/broadcast/posthog)
* [Raindrop](/docs/guides/features/broadcast/raindrop)
* [Ramp](/docs/guides/features/broadcast/ramp)
* [S3 / S3-Compatible](/docs/guides/features/broadcast/s3)
* [Sentry](/docs/guides/features/broadcast/sentry)
* [Snowflake](/docs/guides/features/broadcast/snowflake)
* [W\&B Weave](/docs/guides/features/broadcast/weave)
* [Webhook](/docs/guides/features/broadcast/webhook)

Each destination has its own configuration requirements, such as API keys, endpoints, or project identifiers. When adding a destination, you'll be prompted to provide the necessary credentials which are encrypted and stored securely.

For the most up-to-date list of available destinations, visit the [Broadcast settings page](https://openrouter.ai/settings/observability) in your dashboard.

## Trace Data

Each broadcast trace includes comprehensive information about your API request:

* **Request & Response Data**: The input messages and model output (with multimodal content stripped for efficiency)
* **Token Usage**: Prompt tokens, completion tokens, and total tokens consumed
* **Cost Information**: The total cost of the request
* **Timing**: Request start time, end time, and latency metrics
* **Model Information**: The model slug and provider name used for the request
* **Tool Usage**: Whether tools were included in the request and if tool calls were made

### Token and cost fields

Use the root `GENERATION` observation for usage reporting. Its `promptTokens` and `completionTokens` are the token counts used by OpenRouter's accounting layer, normally derived from provider-reported usage. Provider-attempt and timing `SPAN` observations do not carry generation totals.

| Observation field                                                                | Meaning                                                                                                                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `promptTokens`, `completionTokens`, `totalTokens`                                | Accounted input, output, and total tokens. These can contain fallback estimates when provider usage is missing.                                         |
| `promptTokensDetails.cachedTokens`                                               | Tokens read from the provider's prompt cache.                                                                                                           |
| `promptTokensDetails.cacheWriteTokens`                                           | Tokens written to the provider's prompt cache. Uses the provider-reported aggregate when available; otherwise the pricing layer's cache-write quantity. |
| `promptTokensDetails.cacheCreation.ephemeral_5m_input_tokens`                    | Cache-write tokens with a five-minute TTL, when the provider reports a complete breakdown.                                                              |
| `promptTokensDetails.cacheCreation.ephemeral_1h_input_tokens`                    | Cache-write tokens with a one-hour TTL, when the provider reports a complete breakdown.                                                                 |
| `promptTokensDetails.audioTokens`, `promptTokensDetails.videoTokens`             | Available multimodal input-token breakdowns.                                                                                                            |
| `completionTokensDetails.reasoningTokens`, `completionTokensDetails.imageTokens` | Available reasoning and image output-token breakdowns.                                                                                                  |
| `inputCost`, `outputCost`                                                        | Prompt and completion portions of the inference cost in USD.                                                                                            |
| `totalCost`                                                                      | The total OpenRouter charge in USD, including applicable fees and plugin charges.                                                                       |

Enable **Cost** under **Additional generation metadata** on each destination to include the following fields in `metadata.openrouter_generation`. They remain available in Privacy Mode.

| Metadata field           | Meaning                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cache_write_tokens`     | The same cache-write total as `promptTokensDetails.cacheWriteTokens`.                                                                                                          |
| `cache_creation`         | The same TTL breakdown as `promptTokensDetails.cacheCreation`.                                                                                                                 |
| `native_server_tool_use` | Available per-tool counts for provider-native server tools; see below.                                                                                                         |
| `usage_is_estimated`     | `true` when accounting used a fallback prompt or completion quantity, or fallback pricing after a usage-calculation failure. `false` means those fallback paths were not used. |
| `usage`                  | The OpenRouter charge, matching the generation's total cost.                                                                                                                   |
| `is_byok`                | Whether the generation used your provider key.                                                                                                                                 |
| `byok_usage_inference`   | Reference inference cost for BYOK, not an additional OpenRouter charge or your provider's invoice amount.                                                                      |

The existing `openrouter_generation.tokens_prompt` and `tokens_completion` fields are OpenRouter's own token estimates, not the provider's token counters. The new `usage_is_estimated` flag describes the accounting path; it does not turn these two estimate fields into provider-reported measurements or certify every detailed token count and cost as provider-reported.

A null or omitted quantity is unavailable, not zero. An omitted `usage_is_estimated` flag means provenance is unavailable, such as on older exports or failures without accounting data. An interrupted stream is not automatically estimated: the flag depends on whether accounting actually used fallback quantities.

#### Native server-tool counts

`native_server_tool_use` can contain:

| Counter                     | Source                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web_search_requests`       | The existing provider-native web-search count, including Anthropic's reported usage and OpenAI Responses completed search calls.                                          |
| `web_fetch_requests`        | Anthropic's reported native web-fetch count.                                                                                                                              |
| `code_execution_requests`   | Distinct Anthropic code-execution invocations, or completed OpenAI Responses code-interpreter calls. Anthropic bash and text-editor code-execution variants are included. |
| `file_search_requests`      | Completed OpenAI Responses file-search calls.                                                                                                                             |
| `image_generation_requests` | Completed OpenAI Responses image-generation calls.                                                                                                                        |

These counters exclude client function calls and OpenRouter-orchestrated tool-call totals. They are not universally invoice units: a provider may bill code execution by container, session, or duration rather than invocation, and may charge for failed work. Apply your provider's billing rules rather than multiplying every tool count by a per-call price.

#### Cache TTL availability and BYOK reconciliation

Anthropic may report a TTL split at stream start and subsequently increase the cache-write aggregate during server-tool execution without sending a revised split. In that case, Broadcast preserves the later total and exports a null TTL breakdown rather than attributing the difference to a guessed TTL. When iteration usage is present, the exported quantities include all reported iterations.

For BYOK reconciliation, use available cache and native-tool quantities with your provider's rates, and distinguish fallback-estimated generations using `usage_is_estimated`. These additional exports do not change billing, existing native token counts, or API response usage. Provider-reported cache-write totals can differ from the quantities normalized by OpenRouter's pricing layer.

#### Raw provider usage

With the **Cost** metadata opt-in enabled, `upstream_raw_response_usage` carries the provider's own usage values as they arrived, before OpenRouter normalizes them. Unknown provider fields are preserved, so this object can change whenever a provider changes its API. Without the Cost opt-in, the field is absent from the export entirely, along with the rest of `openrouter_generation`.

| Container        | Meaning                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object           | One usage report, such as a final non-streaming or Responses usage object.                                                                                                               |
| Array of objects | Several usage reports for one generation, in the order the provider sent them, such as Anthropic stream frames. Do not add their values together; a provider may send cumulative totals. |
| `null`           | No provider usage was captured or the value was suppressed.                                                                                                                              |

This field is provider evidence, not an invoice calculation, and not every provider reports usage. Its values are not OpenRouter's accounting inputs: read `promptTokens`, `completionTokens`, costs, and the fields above for accounting, and treat differences between the two as expected rather than as a billing discrepancy.

OpenRouter replaces the object with `null` and records `upstream_raw_response_usage_suppression_reason` when:

| Reason            | Condition                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `privacy_mode`    | The destination has Privacy Mode enabled.                                                                         |
| `usage_estimated` | Accounting used fallback quantities or pricing, so the partial provider report would misrepresent the generation. |
| `size_limit`      | The provider's usage JSON exceeded 64 KiB. The object is never truncated.                                         |

An absent reason with a `null` value means provider usage was simply unavailable. An absent field means the export predates this feature. A reported `0` remains a provider-reported zero.

See the [S3 field locations](/docs/guides/features/broadcast/s3#billing-quantities) and [OTEL attribute mappings](/docs/guides/features/broadcast/otel-collector#billing-quantities) for destination-specific examples.

### Large Trace Values

This applies to the OpenTelemetry-based destinations (Arize, Grafana, Langfuse, LangSmith, New Relic, OpenInference, OTel Collector, Phoenix, Ramp, Sentry, and Webhook). Other destinations are not bounded this way and emit no truncation markers.

Large agent transcripts are normal, so broadcast delivery keeps the rest of the trace when an individual trace or observation value exceeds the per-attribute character limit (currently 10,000,000 characters). The oversized value is shortened rather than causing the trace to be dropped, and a boolean `<key>.truncated` attribute is added alongside it.

The shortened value carries an `openrouter_truncated` marker in one of three shapes, depending on what was cut:

```json theme={null}
{ "openrouter_truncated": { "omitted_items": 12 } }
{ "openrouter_truncated": { "omitted_keys": 3 } }
{ "openrouter_truncated": { "reason": "too_large" } }
```

An array keeps its leading elements and appends the `omitted_items` marker; an object keeps its leading entries and appends `omitted_keys`; a string keeps its longest fitting prefix and ends in `[truncated]`; and a value that cannot be shortened in place (or cannot be serialized at all) is replaced by the `reason` marker (`too_large` or `unserializable`).

The span includes an `openrouter.trace_truncated` event with the affected attribute keys, truncation reason, and character limit. The event also includes a plain-language message explaining that part of the trace was shortened. The remainder of the trace is still delivered to the destination.

### Optional Trace Data

You can enrich your traces with additional context by including these optional fields in your API requests:

* **User ID**: Associate traces with specific end-users by including the `user` field (up to 128 characters). This helps you track usage patterns and debug issues for individual users.

```json lines theme={null}
{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "Hello, world!"
    }
  ],
  "user": "user_12345"
}
```

* **Session ID**: Group related requests together (such as a conversation or agent workflow) by including the `session_id` field (up to 256 characters). You can also pass this via the `x-session-id` HTTP header.

```json lines theme={null}
{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "Hello, world!"
    }
  ],
  "session_id": "session_abc123"
}
```

### Custom Metadata

For advanced observability workflows, you can pass arbitrary metadata to your traces using the `trace` field. This field accepts any JSON object and is passed through to all your configured broadcast destinations.

```json lines theme={null}
{
  "model": "openai/gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": "Summarize this document..."
    }
  ],
  "trace": {
    "trace_id": "workflow_12345",
    "trace_name": "Document Processing",
    "span_name": "Summarization Step",
    "generation_name": "Generate Summary",
    "environment": "production",
    "feature": "customer-support",
    "version": "1.2.3"
  }
}
```

<Tip>
  The `trace` field is flexible and accepts any key-value pairs. Certain keys have special meaning depending on your observability destination. See the destination-specific documentation for details on which keys each platform recognizes.
</Tip>

#### Common Metadata Keys

These metadata keys are commonly used across observability platforms:

| Key               | Description                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `trace_id`        | Group multiple API requests into a single trace. Use the same ID across requests to track multi-step workflows.         |
| `trace_name`      | Custom name for the root trace in your observability platform. Defaults to the model name if not set.                   |
| `span_name`       | Create a parent span that groups LLM operations. Creates hierarchical structure where the span contains the generation. |
| `generation_name` | Custom name for the specific LLM generation/call. Defaults to the model name if not set.                                |
| `parent_span_id`  | Link your OpenRouter trace to an existing span from your own tracing system (e.g., OpenTelemetry).                      |

When using these fields, your traces will appear with a hierarchical structure in platforms like Langfuse:

```lines theme={null}
Document Processing (trace_id: workflow_12345)
└── Summarization Step (span)
    └── Generate Summary (generation)
```

#### Linking to External Traces

If you have your own tracing instrumentation (e.g., OpenTelemetry), you can use `parent_span_id` to nest OpenRouter calls under your existing spans:

```json lines theme={null}
{
  "model": "openai/gpt-4o",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "trace": {
    "trace_id": "your-existing-trace-id",
    "parent_span_id": "your-existing-span-id"
  }
}
```

This will create a trace structure like:

```lines theme={null}
Your Application Trace
└── Your Application Span (parent_span_id)
    └── openai/gpt-4o (generation from OpenRouter)
```

This enables you to:

* Track end-to-end workflows spanning multiple LLM calls
* Organize traces by business logic rather than individual API calls
* Build rich observability dashboards with meaningful trace names
* Integrate OpenRouter traces with your existing application traces
* Pass any custom data you need to your observability platforms

#### Destination-Specific Metadata

Each observability platform may recognize different metadata keys. See the destination-specific guides for details:

* [Langfuse](/docs/guides/features/broadcast/langfuse#custom-metadata) - Supports trace naming, user/session IDs, and arbitrary metadata
* [LangSmith](/docs/guides/features/broadcast/langsmith#custom-metadata) - Supports tags, session tracking, and metadata
* [Datadog](/docs/guides/features/broadcast/datadog#custom-metadata) - Supports tags, user IDs, and session IDs
* [Braintrust](/docs/guides/features/broadcast/braintrust#custom-metadata) - Supports tags and custom metadata fields
* [W\&B Weave](/docs/guides/features/broadcast/weave#custom-metadata) - Supports custom attributes in trace data
* [Arize AX](/docs/guides/features/broadcast/arize#custom-metadata) - Supports OpenInference span attributes and metadata
* [Comet Opik](/docs/guides/features/broadcast/opik#custom-metadata) - Supports trace/span metadata and cost tracking
* [Grafana Cloud](/docs/guides/features/broadcast/grafana#custom-metadata) - Supports TraceQL-queryable span attributes
* [New Relic](/docs/guides/features/broadcast/newrelic#custom-metadata) - Supports NRQL-queryable span attributes
* [Sentry](/docs/guides/features/broadcast/sentry#custom-metadata) - Supports span attributes for performance monitoring
* [OpenTelemetry Collector](/docs/guides/features/broadcast/otel-collector#custom-metadata) - Supports OTLP span attributes for any backend
* [Webhook](/docs/guides/features/broadcast/webhook#custom-metadata) - Custom metadata in OTLP JSON payload
* [PostHog](/docs/guides/features/broadcast/posthog#custom-metadata) - Supports event properties for LLM analytics
* [Raindrop](/docs/guides/features/broadcast/raindrop#custom-metadata) - Supports custom event properties for AI observability
* [Ramp](/docs/guides/features/broadcast/ramp#custom-metadata) - Supports OTLP span attributes for AI cost tracking
* [Snowflake](/docs/guides/features/broadcast/snowflake#custom-metadata) - Queryable via VARIANT column functions
* [ClickHouse](/docs/guides/features/broadcast/clickhouse#custom-metadata) - Queryable via JSONExtract functions
* [Google BigQuery](/docs/guides/features/broadcast/bigquery#custom-metadata) - Queryable via JSON functions
* [S3](/docs/guides/features/broadcast/s3#custom-metadata) - Stored in trace JSON files

## API Key Filtering

Each destination can be configured to only receive traces from specific API keys. This is useful when you want to:

* route traces from different parts of your application to different observability platforms
* isolate monitoring for specific use cases
* or send production API key traces at a lower sampling rate than development keys

When adding or editing a destination, you can select one or more API keys from your account. Only requests made with those selected API keys will have their traces sent to that destination. If no API keys are selected, the destination will receive traces from all your API keys or chatroom requests.

You can also select **excluded** API keys for a destination. Requests made with an excluded key are never sent to that destination, even if the key is also in the included list: exclusions take precedence. This is useful for keeping traces from internal or testing keys out of a production destination without having to enumerate every included key.

## Sampling Rate

Each destination can be configured with a sampling rate to control what percentage of traces are sent. This is useful for high-volume applications where you want to reduce costs or data volume while still maintaining visibility into your LLM usage. A sampling rate of 1.0 sends all traces, while 0.5 would send approximately 50% of traces.

<Tip>
  Sampling is deterministic: when you provide a `session_id`, all traces within that session will be consistently included or excluded together. This ensures you always see complete sessions in your observability platform rather than fragmented data.

  You’ll see full sessions per destination, but not necessarily the same sessions across all destinations.
</Tip>

## Privacy Mode

Each destination can optionally enable **Privacy Mode** to exclude prompt and completion content from traces. When Privacy Mode is enabled, the following data is stripped before sending traces:

* **Input messages** (prompts sent to the model)
* **Output choices** (completions returned by the model)

All other trace data (including token counts, costs, timing, model information, and custom metadata) is still sent normally.

This is useful when you want to monitor LLM usage metrics and costs without exposing the actual content of conversations, for example to comply with data privacy regulations or internal policies.

To enable Privacy Mode, toggle the **Privacy Mode** checkbox in the **Privacy** section when configuring a destination.

<Tip>
  Privacy Mode is configured per destination. You can send full traces to one destination for debugging while sending privacy-redacted traces to another for cost monitoring.
</Tip>

## Security

Your destination credentials are encrypted before being stored and are only decrypted when sending traces. Traces are sent asynchronously after requests complete, so enabling broadcast does not add latency to your API responses.

## Organization Support

Broadcast can be configured at both the individual user level and the organization level. Organization admins can set up shared destinations that apply to all API keys within the organization, ensuring consistent observability across your team.

## Walkthroughs

Step-by-step guides for configuring specific observability destinations:

* [Arize AX](/docs/guides/features/broadcast/arize) - ML observability and monitoring
* [Braintrust](/docs/guides/features/broadcast/braintrust) - LLM evaluation and monitoring
* [ClickHouse](/docs/guides/features/broadcast/clickhouse) - Real-time analytics database
* [Comet Opik](/docs/guides/features/broadcast/opik) - LLM evaluation and testing
* [Datadog](/docs/guides/features/broadcast/datadog) - Full-stack monitoring and analytics
* [Google BigQuery](/docs/guides/features/broadcast/bigquery) - Serverless cloud data warehouse
* [Grafana Cloud](/docs/guides/features/broadcast/grafana) - Observability and monitoring platform
* [Langfuse](/docs/guides/features/broadcast/langfuse) - Open-source LLM engineering platform
* [LangSmith](/docs/guides/features/broadcast/langsmith) - LangChain observability and debugging
* [New Relic](/docs/guides/features/broadcast/newrelic) - Full-stack observability platform
* [OpenTelemetry Collector](/docs/guides/features/broadcast/otel-collector) - Send traces to any OTLP-compatible backend
* [PostHog](/docs/guides/features/broadcast/posthog) - Product analytics with LLM tracking
* [Raindrop](/docs/guides/features/broadcast/raindrop) - AI observability and monitoring
* [Ramp](/docs/guides/features/broadcast/ramp) - AI usage tracking and cost management
* [S3 / S3-Compatible](/docs/guides/features/broadcast/s3) - Store traces in S3, R2, or compatible storage
* [Sentry](/docs/guides/features/broadcast/sentry) - Application monitoring and error tracking
* [Snowflake](/docs/guides/features/broadcast/snowflake) - Cloud data warehouse for analytics
* [W\&B Weave](/docs/guides/features/broadcast/weave) - LLM observability and tracking
* [Webhook](/docs/guides/features/broadcast/webhook) - Send traces to any HTTP endpoint
