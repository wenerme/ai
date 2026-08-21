> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API Changelog

> Changes to the OpenRouter API, generated from the OpenAPI specification on every release.

Entries on this page are generated automatically from [OpenAPI specification](/docs/api_reference/overview) diffs when releases ship. Breaking changes are reviewed by a human before publication. See [API Versioning](/docs/api_reference/versioning) for what counts as a breaking change and how deprecations are announced. Endpoint paths are shown relative to the API base URL (`https://openrouter.ai/api/v1`).

<Update label="August 19, 2026" tags={["BYOK"]} rss="New: manage BYOK credential restrictions (allowed_models, allowed_user_ids, allowed_api_key_hashes) via create/update.">
  ## New capabilities

  * BYOK API: manage credential restrictions (`allowed_models`, `allowed_user_ids`, `allowed_api_key_hashes`) via create/update. See the [BYOK guide](/docs/guides/overview/auth/byok#managing-filters-via-the-management-api) for examples and validation rules.
</Update>

<Update label="August 19, 2026" tags={["Errors","Schemas"]} rss="Actionable model availability errors: new error.availability object with 11 machine-readable codes.">
  ## Actionable model availability errors

  Model-availability failures (unknown model, no endpoints, deprecated model, provider capacity exhausted, region/privacy/constraint filtering, ended `:free` promotions) now carry an additive `error.availability` object on the error envelope, on non-streaming responses and streaming error chunks across all three API skins (Chat Completions, Responses, Anthropic Messages).

  * New `error.availability` object with fields: `code` (one of 11 stable values: `model_not_found`, `wrong_endpoint`, `no_endpoints`, `model_deprecated`, `model_unavailable_upstream`, `capacity_exhausted`, `temporarily_unavailable`, `region_restricted`, `privacy_restricted`, `constraint_filtered`, `free_variant_ended`), `retryable`, `retry_after`, `requested_models`, `affected_providers`, `excluded_by`, `fallback_models`, `constraint`, and `docs_url`. See [Model availability errors](/docs/api_reference/errors-and-debugging#model-availability-errors) for the full code table, field reference, and example payloads.
  * **Migration notes:** The change is additive and backward compatible — `error_type`, `http_status`, and `message` are unchanged, so existing error handling keeps working. Clients that currently parse the free-text `message` prose to distinguish availability conditions should switch to `availability.code`. Clients keying off HTTP status alone should note that unknown model ids on the chat completions router now consistently return `400` (previously they could surface as `500`). `availability.retry_after` mirrors the `Retry-After` header in the response body and is populated whenever any attempted endpoint supplied a retry hint. `error.metadata.previous_errors` is now a slim, stable shape (`{provider, code, status}`) and no longer carries raw upstream provider error bodies — do not parse upstream bodies from it.
</Update>

<Update label="July 29, 2026" tags={["Benchmarks"]} rss="1 modified endpoint, 1 new schema, 2 modified schemas.">
  ## Modified endpoints

  * [`GET /benchmarks`](/docs/api/api-reference/benchmarks/list-benchmarks): description updated; parameter `source` updated; response schema updated

  ## New schemas

  * `UnifiedBenchmarksORItem`
    * Used by [`GET /benchmarks`](/docs/api/api-reference/benchmarks/list-benchmarks)

  ## Modified schemas

  * `UnifiedBenchmarksMeta`: enum property\_added
    * Used by [`GET /benchmarks`](/docs/api/api-reference/benchmarks/list-benchmarks)
  * `UnifiedBenchmarksResponse`: example modified; new union variant added
    * Used by [`GET /benchmarks`](/docs/api/api-reference/benchmarks/list-benchmarks)
</Update>

<Update label="July 28, 2026" tags={["Breaking","Files","Responses","Schemas"]} rss="2 breaking changes, 5 modified endpoints, 22 modified schemas.">
  ## Breaking changes

  * `FusionCallAnalysisInProgressEvent`: required `analyst_model` property added<Badge stroke color="gray" className="changelog-status-badge">No action needed</Badge>
    * **No action required for existing consumers.** `analyst_model` replaces `judge_model` in this streaming event; `judge_model` is retained as a deprecated alias that always carries the same value.
    * Used by [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * \$.tags: responses object removed<Badge stroke color="gray" className="changelog-status-badge">No action needed</Badge>
    * **No action required.** The `responses` OpenAPI tag was renamed to `Responses` for consistent Title Case across the API Reference. This is a documentation-grouping change only: `POST /api/v1/responses` and its schemas are unchanged, SDK namespaces are unchanged (`client.responses.send()` in TypeScript and Python, `Sdk.Responses.Send()` in Go), and endpoint documentation URLs are unchanged.

  ## Modified endpoints

  * [`GET /files`](/docs/api/api-reference/files/list-files): parameter `cursor` updated; response schema updated
  * [`POST /files`](/docs/api/api-reference/files/upload-a-file): response schema updated
  * [`DELETE /files/{file_id}`](/docs/api/api-reference/files/delete-a-file): parameter `file_id` updated; response schema updated
  * [`GET /files/{file_id}`](/docs/api/api-reference/files/get-file-metadata): parameter `file_id` updated; response schema updated
  * [`GET /files/{file_id}/content`](/docs/api/api-reference/files/download-file-content): parameter `file_id` updated

  ## Modified schemas

  * `FusionAnalysisResult`: description updated
    * Used by [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body), [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `FusionCallAnalysisCompletedEvent`: description updated
    * Used by [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `FusionCallAnalysisInProgressEvent`:
    * description updated
    * example modified
    * new property `analyst_model`
    * property `judge_model` deprecated (alias of `analyst_model`, kept for existing consumers)
    * Used by [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `FusionPlugin`: description updated

      <Expandable title="6 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `FusionServerToolConfig`: description updated; property `effort` updated; property `max_tokens` updated

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `FusionServerTool_OpenRouter`: description updated

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `FusionSource`: description updated
    * Used by [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body), [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `OutputFusionServerToolItem`: description updated
    * Used by [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body), [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `ChatWebSearchShorthand`: description updated
    * Used by [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion), [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
  * `WebSearchConfig`: description updated

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
      </Expandable>
  * `WebSearchDomainFilter`: example modified; new property `blocked_domains`
    * Used by [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body), [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `WebSearchServerToolConfig`: description updated
    * Used by [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body), [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
  * `AnthropicFileDocumentSource`: example modified
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message), [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
  * `FileDeleteResponse`: example modified
    * Used by [`DELETE /files/{file_id}`](/docs/api/api-reference/files/delete-a-file)
  * `FileListResponse`: example modified
    * Used by [`GET /files`](/docs/api/api-reference/files/list-files)
  * `FileMetadata`: example modified
    * Used by [`GET /files`](/docs/api/api-reference/files/list-files), [`GET /files/{file_id}`](/docs/api/api-reference/files/get-file-metadata), [`POST /files`](/docs/api/api-reference/files/upload-a-file)
  * `GenerationResponse`: property `data_region` updated
    * Used by [`GET /generation`](/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation)
  * `CreateGuardrailRequest`: new property `enable_free_model_publication`; new property `enable_free_model_training`; new property `enable_paid_model_training`
    * Used by [`POST /guardrails`](/docs/api/api-reference/guardrails/create-a-guardrail)
  * `Guardrail`:

    * example modified
    * new property `enable_free_model_publication`
    * new property `enable_free_model_training`
    * new property `enable_paid_model_training`

      <Expandable title="4 endpoints using this schema">
        - [`GET /guardrails`](/docs/api/api-reference/guardrails/list-guardrails)
        - [`GET /guardrails/{id}`](/docs/api/api-reference/guardrails/get-a-guardrail)
        - [`PATCH /guardrails/{id}`](/docs/api/api-reference/guardrails/update-a-guardrail)
        - [`POST /guardrails`](/docs/api/api-reference/guardrails/create-a-guardrail)
      </Expandable>
  * `UpdateGuardrailRequest`: new property `enable_free_model_publication`; new property `enable_free_model_training`; new property `enable_paid_model_training`
    * Used by [`PATCH /guardrails/{id}`](/docs/api/api-reference/guardrails/update-a-guardrail)
  * `AutoBetaRouterPlugin`:

    * example modified
    * new property `cost_tier`
    * deprecated property\_added
    * description updated

      <Expandable title="6 endpoints using this schema">
        - [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        - [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        - [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        - [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        - [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        - [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `AutoRouterPlugin`:

    * example modified
    * new property `cost_tier`
    * deprecated property\_added
    * description updated

      <Expandable title="6 endpoints using this schema">
        - [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        - [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        - [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        - [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        - [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        - [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
</Update>

<Update label="July 27, 2026" tags={["Embeddings","Schemas"]} rss="1 modified endpoint, 2 modified schemas.">
  ## Modified endpoints

  * [`POST /embeddings`](/docs/api/api-reference/embeddings/submit-an-embedding-request): request schema updated

  ## Modified schemas

  * `Quantization`: enum property\_added

      <Expandable title="10 endpoints using this schema">
        * [`GET /endpoints/zdr`](/docs/api/api-reference/endpoints/preview-the-impact-of-zdr-on-the-available-endpoints)
        * [`GET /models/{author}/{slug}/endpoints`](/docs/api/api-reference/endpoints/list-all-endpoints-for-a-model)
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /embeddings`](/docs/api/api-reference/embeddings/submit-an-embedding-request)
        * [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /rerank`](/docs/api/api-reference/rerank/submit-a-rerank-request)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `ReasoningFormat`: enum property\_added

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
</Update>

<Update label="July 25, 2026" tags={["BYOK","Breaking","Responses","Schemas"]} rss="2 breaking changes, 2 modified endpoints, 5 modified schemas.">
  ## Breaking changes

  * [`POST /responses`](/docs/api/api-reference/responses/create-a-response): tags `beta.responses` property removed
    * **Migration: no action for HTTP clients.** The Responses API is now GA. `beta.responses` was an OpenAPI grouping tag and SDK namespace, never a URL. `POST /api/v1/responses` and its request and response schemas are unchanged, so raw HTTP callers and OpenAI-compatible clients (including the OpenAI Agents SDK) need no changes. The endpoint now appears under **Responses** instead of **Beta responses** in the API Reference.
    * **Migration for SDK users: optional until sunset.** The canonical namespace is now `responses`, with `client.responses.send()` (TypeScript, Python) and `client.Responses.Send()` (Go). The `beta.responses` namespace, and TypeScript's `betaResponsesSend` standalone function, keep working as deprecated aliases; their removal will be announced here with a sunset date before it ships.
  * \$.tags: beta.responses object removed
    * Same change as above at the specification level: the `beta.responses` tag definition is gone from `$.tags`.

  ## Modified endpoints

  * [`POST /responses`](/docs/api/api-reference/responses/create-a-response): tags property\_added
  * [`GET /byok`](/docs/api/api-reference/byok/list-byok-provider-credentials): parameter `provider` updated

  ## Modified schemas

  * `MessagesStartEvent`: property `provider` updated
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `ProviderName`: enum property\_added

      <Expandable title="11 endpoints using this schema">
        * [`GET /endpoints/zdr`](/docs/api/api-reference/endpoints/preview-the-impact-of-zdr-on-the-available-endpoints)
        * [`GET /models/{author}/{slug}/endpoints`](/docs/api/api-reference/endpoints/list-all-endpoints-for-a-model)
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /embeddings`](/docs/api/api-reference/embeddings/submit-an-embedding-request)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /rerank`](/docs/api/api-reference/rerank/submit-a-rerank-request)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `ProviderOptions`: new property `claude-on-aws`

      <Expandable title="4 endpoints using this schema">
        * [`POST /audio/speech`](/docs/api/api-reference/tts/create-speech)
        * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /videos`](/docs/api/api-reference/video-generation/submit-a-video-generation-request)
      </Expandable>
  * `ProviderResponse`: enum property\_added
    * Used by [`GET /generation`](/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation)
  * `BYOKProviderSlug`: enum property\_added

      <Expandable title="4 endpoints using this schema">
        * [`GET /byok`](/docs/api/api-reference/byok/list-byok-provider-credentials)
        * [`GET /byok/{id}`](/docs/api/api-reference/byok/get-a-byok-provider-credential)
        * [`PATCH /byok/{id}`](/docs/api/api-reference/byok/update-a-byok-provider-credential)
        * [`POST /byok`](/docs/api/api-reference/byok/create-a-byok-provider-credential)
      </Expandable>
</Update>

<Update label="July 24, 2026" tags={["Schemas"]} rss="8 modified schemas.">
  ## Modified schemas

  * `MessagesStartEvent`: property `provider` updated
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `ProviderName`: enum property\_added

      <Expandable title="11 endpoints using this schema">
        * [`GET /endpoints/zdr`](/docs/api/api-reference/endpoints/preview-the-impact-of-zdr-on-the-available-endpoints)
        * [`GET /models/{author}/{slug}/endpoints`](/docs/api/api-reference/endpoints/list-all-endpoints-for-a-model)
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /embeddings`](/docs/api/api-reference/embeddings/submit-an-embedding-request)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /rerank`](/docs/api/api-reference/rerank/submit-a-rerank-request)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `ProviderOptions`: new property `voyageai`

      <Expandable title="4 endpoints using this schema">
        * [`POST /audio/speech`](/docs/api/api-reference/tts/create-speech)
        * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /videos`](/docs/api/api-reference/video-generation/submit-a-video-generation-request)
      </Expandable>
  * `ProviderResponse`: enum property\_added
    * Used by [`GET /generation`](/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation)
  * `AnthropicCompactionBlock`: new property `encrypted_content`
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `MessagesToolAdditionBlock`: new property `cache_control`; new union variant added; type property\_removed
    * `tool` widened from a single `tool_reference` object to a union of `tool_reference`, `mcp_tool_reference` (`name` + `server_name`) and `mcp_toolset_reference` (`server_name`). The `tool_reference` variant is unchanged, so existing `{ "type": "tool_reference", "name": "…" }` payloads stay valid. The `name` and `type` properties moved into that variant rather than being removed.
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message), [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
  * `MessagesToolRemovalBlock`: new property `cache_control`; new union variant added; type property\_removed
    * `tool` widened the same way as `MessagesToolAdditionBlock`; existing `tool_reference` payloads stay valid.
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message), [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
  * `ORAnthropicStopReason`: enum property\_added
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
</Update>

<Update label="July 8, 2026" tags={["Schemas"]} rss="1 new schema, 1 modified schema.">
  ## New schemas

  * `ImageGenTextChunkEvent`
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)

  ## Modified schemas

  * `ImageStreamingResponse`: new union variant added
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
</Update>

<Update label="July 7, 2026" tags={["Datasets","Images","Models","STT"]} rss="3 modified endpoints, 1 new response code, 3 new schemas, 6 modified schemas.">
  ## Modified endpoints

  * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription): description updated; request body now accepts `multipart/form-data`
  * [`GET /datasets/rankings-daily`](/docs/api/api-reference/datasets/daily-token-totals-for-top-50-models):
    * description updated
    * new parameter `category`
    * new parameter `context_bucket`
    * new parameter `language_type`
    * new parameter `modality`
    * new parameter `period`
  * [`GET /models`](/docs/api/api-reference/models/list-all-models-and-their-properties):
    * new parameter `max_age_days`
    * new parameter `max_agentic_index`
    * new parameter `max_coding_index`
    * new parameter `max_intelligence_index`
    * new parameter `max_output_price`
    * new parameter `max_tool_success_rate`
    * new parameter `min_age_days`
    * new parameter `min_agentic_index`
    * new parameter `min_coding_index`
    * new parameter `min_intelligence_index`
    * new parameter `min_output_price`
    * new parameter `min_tool_success_rate`
    * description updated
    * parameter `sort` updated

  ## New response codes

  * [`POST /images`](/docs/api/api-reference/images/generate-an-image): now returns `413`

  ## New schemas

  * `STTSegment`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
  * `STTTimestampGranularity`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
  * `STTWord`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)

  ## Modified schemas

  * `ChatFunctionTool`: new union variant added
    * Used by [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion), [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
  * `FusionServerToolConfig`: description updated

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `ImageGenCompletedEvent`: description updated; example modified
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
  * `ImageGenerationResponse`: property `media_type` updated
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
  * `STTRequest`: new property `response_format`; new property `timestamp_granularities`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
  * `STTResponse`:
    * new property `duration`
    * new property `language`
    * new property `segments`
    * new property `task`
    * new property `words`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
</Update>

<Update label="July 3, 2026" tags={["Workspaces"]} rss="1 new endpoint, 1 new schema.">
  ## New endpoints

  * [`GET /workspaces/{id}/members`](/docs/api/api-reference/workspaces/list-workspace-members): List workspace members

  ## New schemas

  * `ListWorkspaceMembersResponse`
    * Used by [`GET /workspaces/{id}/members`](/docs/api/api-reference/workspaces/list-workspace-members)
</Update>
