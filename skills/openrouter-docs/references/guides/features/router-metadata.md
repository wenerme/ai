> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Router Metadata

<Note title="Experimental">
  Router metadata is **experimental**. The `openrouter_metadata` response shape is unstable: fields and pipeline stage types may be **added, renamed, removed, or change semantics at any time**, without a deprecation cycle. Do not pin production tooling to specific field names or values yet.
</Note>

OpenRouter's router runs every request through a multi-stage pipeline: it picks a provider, may compress context, may run guardrails, may invoke server-side tools, and may retry against fallbacks. By default, none of that is visible on the response.

Router metadata is a **per-request opt-in** that adds an `openrouter_metadata` field to successful responses, capturing exactly what the router did. It's intended for debugging routing decisions, attributing latency or cost, and auditing pipeline behavior.

## Enabling Router Metadata

Opt in by sending the `X-OpenRouter-Experimental-Metadata` request header with the value `enabled`:

<Template data={{ API_KEY_REF }}>
  <CodeGroup>
    ```bash title="cURL"
    curl https://openrouter.ai/api/v1/chat/completions \
      -H "Authorization: Bearer {{API_KEY_REF}}" \
      -H "Content-Type: application/json" \
      -H "X-OpenRouter-Experimental-Metadata: enabled" \
      -d '{
        "model": "openai/gpt-4o-mini",
        "messages": [{ "role": "user", "content": "Hello" }]
      }'
    ```

    ```typescript title="TypeScript"
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer {{API_KEY_REF}}`,
        'Content-Type': 'application/json',
        'X-OpenRouter-Experimental-Metadata': 'enabled',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });
    ```

    ```python title="Python"
    import requests

    response = requests.post(
        'https://openrouter.ai/api/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {{API_KEY_REF}}',
            'Content-Type': 'application/json',
            'X-OpenRouter-Experimental-Metadata': 'enabled',
        },
        json={
            'model': 'openai/gpt-4o-mini',
            'messages': [{'role': 'user', 'content': 'Hello'}],
        },
    )
    ```
  </CodeGroup>
</Template>

### Accepted Values

The header accepts the following values, matched case-insensitively:

| Value      | Behavior                                                    |
| ---------- | ----------------------------------------------------------- |
| `enabled`  | Surface `openrouter_metadata` on the response.              |
| `disabled` | Do not surface metadata. Equivalent to omitting the header. |

Any other value (including misspellings, empty strings, and unknown levels) falls back to `disabled`. The default behavior — when the header is absent — is `disabled`.

## Supported Endpoints

Router metadata is wired into every public completion route:

* `/api/v1/chat/completions` (OpenAI Chat Completions)
* `/api/v1/messages` (Anthropic Messages)
* `/api/v1/responses` (OpenAI Responses)
* `/api/v1/completions` (legacy text completions)

Both **streaming** and **non-streaming** requests carry the field when opted in. For streaming responses, `openrouter_metadata` is delivered on the **final chunk** before `data: [DONE]` (Chat Completions / Responses) or as part of the terminal `message_stop` event (Anthropic Messages).

## Response Shape

When opted in, successful responses include an `openrouter_metadata` object alongside the rest of the response payload:

```json
{
  "id": "gen-...",
  "model": "openai/gpt-4o-mini",
  "choices": [...],
  "usage": {...},
  "openrouter_metadata": {
    "requested": "openai/gpt-4o-mini",
    "strategy": "direct",
    "region": "iad",
    "summary": "available=1, selected=OpenAI",
    "attempt": 1,
    "is_byok": false,
    "endpoints": {
      "total": 1,
      "available": [
        {
          "provider": "OpenAI",
          "model": "openai/gpt-4o-mini",
          "selected": true
        }
      ]
    },
    "attempts": [
      { "provider": "OpenAI", "model": "openai/gpt-4o-mini", "status": 200 }
    ],
    "pipeline": [
      {
        "type": "context_compression",
        "name": "context-compression",
        "data": {
          "engine": "middle-out",
          "input_type": "messages",
          "original_count": 42,
          "compressed_count": 30
        }
      }
    ]
  }
}
```

### Field Reference

| Field       | Type                | Description                                                                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `requested` | `string`            | The model slug (or alias) the client sent. May differ from the provider/model that actually served the request.           |
| `strategy`  | `string`            | Routing strategy used: `direct`, `auto`, `free`, `latest`, `alias`, `fallback`, `pareto`, `bodybuilder`.                  |
| `region`    | `string \| null`    | Edge region that handled the request, when available.                                                                     |
| `summary`   | `string`            | Human-readable one-liner describing the routing decision (e.g. candidate count, selected provider).                       |
| `attempt`   | `integer`           | 1-indexed attempt number that succeeded. Greater than 1 means earlier attempts failed and fell back.                      |
| `is_byok`   | `boolean`           | Whether the request used a Bring-Your-Own-Key provider key.                                                               |
| `endpoints` | `EndpointsMetadata` | Snapshot of endpoint candidates considered, and which one was selected.                                                   |
| `params`    | `RouterParams`      | Optional. Router-level parameters that influenced selection (e.g. `quality_floor`, `throughput_floor`).                   |
| `attempts`  | `Attempt[]`         | Optional. Per-attempt provider/model/status when the router retried against fallbacks.                                    |
| `pipeline`  | `PipelineStage[]`   | Optional. Plugins that materially altered the request or response (compression, guardrails, healing, server tools, etc.). |

The full schema is documented under [`OpenRouterMetadata`](/docs/api-reference) in the OpenAPI spec, including SDK type definitions for [TypeScript](/docs/sdks/typescript) and other generated clients.

## Pipeline Stages

The `pipeline` array records every plugin that materially affected the request. A plugin only emits a stage when it actually ran; a no-op plugin (e.g. context compression that found the input already fit the budget) is omitted. Today's stage types include:

| `type`                | `name` values                                           | What it tells you                                                                                             |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `guardrail`           | `content-filter`, `moderation`, `lakera`, `model-armor` | `flagged: bool`, plus engine-specific verdict (`decision`, `confidence_level`, `matched_entity_types`, etc.). |
| `plugin`              | `web-search`, `file-parser`                             | Plugin-specific telemetry (e.g. result counts for web search, page count for file parsing).                   |
| `server_tools`        | `server-tools`                                          | Mode (`native` / `sdk`) and the list of tools invoked.                                                        |
| `response_healing`    | `response-healing`                                      | Mode (`json_schema` / `json_object`), whether healing improved the response, lengths.                         |
| `context_compression` | `context-compression`                                   | Engine used, input type (`messages` / `prompt`), original vs. compressed counts.                              |

Multiple plugins can share a `type`. To find a specific guardrail (say, the content filter), iterate the array and match on both `type === 'guardrail'` and `name === 'content-filter'`. The full set of guardrail-level plugins emits `type: 'guardrail'` so you can filter all of them together (`pipeline.filter(s => s.type === 'guardrail')`) without enumerating individual plugins.

The list grows over time. Treat unknown stage types as opaque — `data` is a free-form record by design so plugins can attach plugin-specific telemetry without a schema bump.

## Cache Hits

Cache hits never include `openrouter_metadata`. Both streaming and non-streaming cache replays strip the field so clients cannot pin behavior on stale routing data. This is intentional: the metadata you see on a cache miss may not reflect the routing that produced the cached payload.

## Error Responses

Opt-in error responses surface `openrouter_metadata` at the **top level** of the error envelope, mirroring the success-path placement (sibling of `error` rather than nested inside it). This applies to all four routes — Chat Completions, Messages, Responses, and legacy Completions — and to both streaming and non-streaming requests. The same opt-in rules apply: send `X-OpenRouter-Experimental-Metadata: enabled` and the snapshot is included on failure; omit it and it isn't.

```json
{
  "error": {
    "code": 404,
    "message": "No allowed providers are available for the selected model"
  },
  "openrouter_metadata": {
    "requested": "openai/gpt-4o-mini",
    "strategy": "direct",
    "attempt": 0,
    "endpoints": {
      "total": 1,
      "available": [
        {
          "provider": "OpenAI",
          "model": "openai/gpt-4o-mini",
          "selected": false
        }
      ]
    }
  }
}
```

A few things to know:

* **`attempt` reflects how far the router got.** A value of `0` means the request never reached a provider — typically because every candidate was filtered out before submission (e.g. `provider.only` excluded the last endpoint, or an allowed-providers / max-price filter rejected everything). Values `≥ 1` mean every attempted provider failed and fallbacks were exhausted.
* **No endpoint is marked `selected` on failure.** None of the `endpoints.available[].selected` flags are `true` because no endpoint actually served a 200.
* **Internal-error masking still applies.** Responses with a `500` status are scrubbed to a generic message, and `openrouter_metadata` is omitted from those envelopes by design — we don't surface internal routing details on errors whose cause is already hidden. Other 5xx classes (`502`, `503`, `504`, `529`) still include the metadata when the client opted in.
* **Some failure modes won't carry it.** Authentication / rate-limit failures and other errors that fire before the router has usable routing state (for example, validation rejections at the API edge) will not include the field. If you need post-mortem routing context for a request that completed past the API edge but before the router materialised state, fetch the generation record via [`GET /api/v1/generation`](/docs/api-reference) using the `X-Generation-Id` response header.

## Stability

Router metadata is **experimental**. The `openrouter_metadata` response shape is unstable — fields and pipeline stage types may be added, renamed, removed, or change semantics at any time, without a deprecation cycle. Treat the payload as best-effort debugging telemetry, not as a stable contract.

The `X-OpenRouter-Experimental-Metadata` opt-in header is the supported way to enable the feature, but the header name and accepted values may also change while the feature is experimental.

If you consume the field in code, decode it permissively (treat unknown fields and stage types as opaque) and be prepared to update on every release.