> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# API Changelog

> Changes to the OpenRouter API, generated from the OpenAPI specification on every release.

Entries on this page are generated automatically from [OpenAPI specification](/docs/api_reference/overview) diffs when releases ship. Breaking changes are reviewed by a human before publication — see [API Versioning](/docs/api_reference/versioning) for what counts as a breaking change and how deprecations are announced. Endpoint paths are shown relative to the API base URL (`https://openrouter.ai/api/v1`).

<Update label="July 24, 2026" description="release-20260724-191903-abhinav-pola-9b6ee52" tags={["Schemas"]} rss="4 modified schemas.">
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
        * [`POST /responses`](/docs/api/api-reference/betaresponses/create-a-response)
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
        * [`POST /responses`](/docs/api/api-reference/betaresponses/create-a-response)
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
