> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API Changelog

> Changes to the OpenRouter API, generated from the OpenAPI specification on every release.

Entries on this page are generated automatically from [OpenAPI specification](/docs/api_reference/overview) diffs when releases ship. Breaking changes are reviewed by a human before publication — see [API Versioning](/docs/api_reference/versioning) for what counts as a breaking change and how deprecations are announced. Endpoint paths are shown relative to the API base URL (`https://openrouter.ai/api/v1`).

<Update label="July 27, 2026" tags={["Embeddings","Schemas"]} rss="1 modified endpoint, 2 modified schemas.">
  ## Modified endpoints

  * [`POST /embeddings`](/docs/api/api-reference/embeddings/submit-an-embedding-request) — request schema updated

  ## Modified schemas

  * `Quantization` — enum property\_added

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
  * `ReasoningFormat` — enum property\_added

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
</Update>

<Update label="July 25, 2026" tags={["BYOK","Breaking","Schemas","responses"]} rss="2 breaking changes, 2 modified endpoints, 5 modified schemas.">
  ## Breaking changes

  * [`POST /responses`](/docs/api/api-reference/responses/create-a-response) — tags `beta.responses` property removed
    * **Migration: no action for HTTP clients.** The Responses API is now GA. `beta.responses` was an OpenAPI grouping tag and SDK namespace, never a URL — `POST /api/v1/responses` and its request and response schemas are unchanged, so raw HTTP callers and OpenAI-compatible clients (including the OpenAI Agents SDK) need no changes. The endpoint now appears under **Responses** instead of **Beta responses** in the API Reference.
    * **Migration for SDK users: optional until sunset.** The canonical namespace is now `responses` — `client.responses.send()` (TypeScript, Python) and `client.Responses.Send()` (Go). The `beta.responses` namespace, and TypeScript's `betaResponsesSend` standalone function, keep working as deprecated aliases; their removal will be announced here with a sunset date before it ships.
  * \$.tags: beta.responses object removed
    * Same change as above at the specification level: the `beta.responses` tag definition is gone from `$.tags`.

  ## Modified endpoints

  * [`POST /responses`](/docs/api/api-reference/responses/create-a-response) — tags property\_added
  * [`GET /byok`](/docs/api/api-reference/byok/list-byok-provider-credentials) — parameter `provider` updated

  ## Modified schemas

  * `MessagesStartEvent` — property `provider` updated
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `ProviderName` — enum property\_added

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
  * `ProviderOptions` — new property `claude-on-aws`

      <Expandable title="4 endpoints using this schema">
        * [`POST /audio/speech`](/docs/api/api-reference/tts/create-speech)
        * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /videos`](/docs/api/api-reference/video-generation/submit-a-video-generation-request)
      </Expandable>
  * `ProviderResponse` — enum property\_added
    * Used by [`GET /generation`](/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation)
  * `BYOKProviderSlug` — enum property\_added

      <Expandable title="4 endpoints using this schema">
        * [`GET /byok`](/docs/api/api-reference/byok/list-byok-provider-credentials)
        * [`GET /byok/{id}`](/docs/api/api-reference/byok/get-a-byok-provider-credential)
        * [`PATCH /byok/{id}`](/docs/api/api-reference/byok/update-a-byok-provider-credential)
        * [`POST /byok`](/docs/api/api-reference/byok/create-a-byok-provider-credential)
      </Expandable>
</Update>

<Update label="July 24, 2026" tags={["Schemas"]} rss="8 modified schemas.">
  ## Modified schemas

  * `MessagesStartEvent` — property `provider` updated
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `ProviderName` — enum property\_added

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
  * `ProviderOptions` — new property `voyageai`

      <Expandable title="4 endpoints using this schema">
        * [`POST /audio/speech`](/docs/api/api-reference/tts/create-speech)
        * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
        * [`POST /images`](/docs/api/api-reference/images/generate-an-image)
        * [`POST /videos`](/docs/api/api-reference/video-generation/submit-a-video-generation-request)
      </Expandable>
  * `ProviderResponse` — enum property\_added
    * Used by [`GET /generation`](/docs/api/api-reference/generations/get-request-&-usage-metadata-for-a-generation)
  * `AnthropicCompactionBlock` — new property `encrypted_content`
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
  * `MessagesToolAdditionBlock` — new property `cache_control`; new union variant added; type property\_removed
    * `tool` widened from a single `tool_reference` object to a union of `tool_reference`, `mcp_tool_reference` (`name` + `server_name`) and `mcp_toolset_reference` (`server_name`). The `tool_reference` variant is unchanged, so existing `{ "type": "tool_reference", "name": "…" }` payloads stay valid — the `name` and `type` properties moved into that variant rather than being removed.
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message), [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
  * `MessagesToolRemovalBlock` — new property `cache_control`; new union variant added; type property\_removed
    * `tool` widened the same way as `MessagesToolAdditionBlock`; existing `tool_reference` payloads stay valid.
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message), [`POST /presets/{slug}/messages`](/docs/api/api-reference/presets/create-a-preset-from-a-messages-request-body)
  * `ORAnthropicStopReason` — enum property\_added
    * Used by [`POST /messages`](/docs/api/api-reference/anthropic-messages/create-a-message)
</Update>

<Update label="July 8, 2026" tags={["Schemas"]} rss="1 new schema, 1 modified schema.">
  ## New schemas

  * `ImageGenTextChunkEvent`
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)

  ## Modified schemas

  * `ImageStreamingResponse` — new union variant added
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
</Update>

<Update label="July 7, 2026" tags={["Datasets","Images","Models","STT"]} rss="3 modified endpoints, 1 new response code, 3 new schemas, 6 modified schemas.">
  ## Modified endpoints

  * [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription) — description updated; request body now accepts `multipart/form-data`
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

  * [`POST /images`](/docs/api/api-reference/images/generate-an-image) — now returns `413`

  ## New schemas

  * `STTSegment`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
  * `STTTimestampGranularity`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)
  * `STTWord`
    * Used by [`POST /audio/transcriptions`](/docs/api/api-reference/stt/create-transcription)

  ## Modified schemas

  * `ChatFunctionTool` — new union variant added
    * Used by [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion), [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
  * `FusionServerToolConfig` — description updated

      <Expandable title="4 endpoints using this schema">
        * [`POST /chat/completions`](/docs/api/api-reference/chat/create-a-chat-completion)
        * [`POST /presets/{slug}/chat/completions`](/docs/api/api-reference/presets/create-a-preset-from-a-chat-completions-request-body)
        * [`POST /presets/{slug}/responses`](/docs/api/api-reference/presets/create-a-preset-from-a-responses-request-body)
        * [`POST /responses`](/docs/api/api-reference/responses/create-a-response)
      </Expandable>
  * `ImageGenCompletedEvent` — description updated; example modified
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
  * `ImageGenerationResponse` — property `media_type` updated
    * Used by [`POST /images`](/docs/api/api-reference/images/generate-an-image)
  * `STTRequest` — new property `response_format`; new property `timestamp_granularities`
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

  * [`GET /workspaces/{id}/members`](/docs/api/api-reference/workspaces/list-workspace-members) — List workspace members

  ## New schemas

  * `ListWorkspaceMembersResponse`
    * Used by [`GET /workspaces/{id}/members`](/docs/api/api-reference/workspaces/list-workspace-members)
</Update>
