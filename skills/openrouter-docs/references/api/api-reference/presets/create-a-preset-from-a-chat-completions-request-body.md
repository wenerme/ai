> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a preset from a chat-completions request body

> Creates a preset (or a new version of an existing one) from an inference request body. Only fields that overlap with the preset config are persisted; other fields (e.g. `messages`, `stream`, `prompt`) are silently ignored.



## OpenAPI

````yaml /openapi/openapi.yaml post /presets/{slug}/chat/completions
openapi: 3.1.0
info:
  contact:
    email: support@openrouter.ai
    name: OpenRouter Support
    url: https://openrouter.ai/docs
  description: OpenAI-compatible API with additional OpenRouter features
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  title: OpenRouter API
  version: 1.0.0
servers:
  - description: Production server
    url: https://openrouter.ai/api/v1
    x-speakeasy-server-id: production
security:
  - apiKey: []
tags:
  - description: API key management endpoints
    name: API Keys
  - description: Analytics and usage endpoints
    name: Analytics
  - description: Anthropic Messages endpoints
    name: Anthropic Messages
  - description: BYOK endpoints
    name: BYOK
  - description: Benchmarks endpoints
    name: Benchmarks
  - description: Chat completion endpoints
    name: Chat
  - description: Task classification market-share endpoints
    name: Classifications
  - description: Containers endpoints
    name: Containers
  - description: Credit management endpoints
    name: Credits
  - description: >-
      Public OpenRouter usage datasets. Data returned by these endpoints is
      licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/):
      reuse and republish it, including commercially, with attribution to
      OpenRouter.
    name: Datasets
  - description: Text embedding endpoints
    name: Embeddings
  - description: Endpoint information
    name: Endpoints
  - description: Files endpoints
    name: Files
  - description: Generation history endpoints
    name: Generations
  - description: Guardrails endpoints
    name: Guardrails
  - description: Images endpoints
    name: Images
  - description: Model information endpoints
    name: Models
  - description: OAuth authentication endpoints
    name: OAuth
  - description: Observability endpoints
    name: Observability
  - description: Organization endpoints
    name: Organization
  - description: Presets endpoints
    name: Presets
  - description: Provider information endpoints
    name: Providers
  - description: Rerank endpoints
    name: Rerank
  - description: OpenAI-compatible Responses API endpoints
    name: Responses
  - description: SCIM endpoints
    name: SCIM
  - description: Speech-to-text endpoints
    name: STT
    x-displayName: Transcriptions
  - description: Text-to-speech endpoints
    name: TTS
    x-displayName: Speech
  - description: Video Generation endpoints
    name: Video Generation
  - description: Workspaces endpoints
    name: Workspaces
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /presets/{slug}/chat/completions:
    post:
      tags:
        - Presets
      summary: Create a preset from a chat-completions request body
      description: >-
        Creates a preset (or a new version of an existing one) from an inference
        request body. Only fields that overlap with the preset config are
        persisted; other fields (e.g. `messages`, `stream`, `prompt`) are
        silently ignored.
      operationId: createPresetsChatCompletions
      parameters:
        - description: URL-safe slug identifying the preset. Created if it does not exist.
          in: path
          name: slug
          required: true
          schema:
            description: >-
              URL-safe slug identifying the preset. Created if it does not
              exist.
            example: my-preset
            minLength: 1
            type: string
      requestBody:
        content:
          application/json:
            example:
              messages:
                - content: You are a helpful assistant.
                  role: system
                - content: Hello!
                  role: user
              model: openai/gpt-5.4
              temperature: 0.7
            schema:
              $ref: '#/components/schemas/ChatRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  created_at: '2026-04-20T10:00:00Z'
                  creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
                  description: null
                  designated_version:
                    config:
                      model: openai/gpt-5.4
                      temperature: 0.7
                    created_at: '2026-04-20T10:00:00Z'
                    creator_id: user_2dHFtVWx2n56w6HkM0000000000
                    id: 550e8400-e29b-41d4-a716-446655440000
                    preset_id: 650e8400-e29b-41d4-a716-446655440001
                    system_prompt: You are a helpful assistant.
                    updated_at: '2026-04-20T10:00:00Z'
                    version: 1
                  designated_version_id: 550e8400-e29b-41d4-a716-446655440000
                  id: 650e8400-e29b-41d4-a716-446655440001
                  name: my-preset
                  slug: my-preset
                  status: active
                  status_updated_at: null
                  updated_at: '2026-04-20T10:00:00Z'
                  workspace_id: 750e8400-e29b-41d4-a716-446655440002
              schema:
                $ref: '#/components/schemas/CreatePresetFromInferenceResponse'
          description: Preset created or updated successfully.
        '400':
          content:
            application/json:
              example:
                error:
                  code: 400
                  message: Invalid request parameters
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
          description: Bad Request - Invalid request parameters or malformed input
        '401':
          content:
            application/json:
              example:
                error:
                  code: 401
                  message: Missing Authentication header
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
          description: Unauthorized - Authentication required or invalid credentials
        '403':
          content:
            application/json:
              example:
                error:
                  code: 403
                  message: Only management keys can perform this operation
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
          description: Forbidden - Authentication successful but insufficient permissions
        '404':
          content:
            application/json:
              example:
                error:
                  code: 404
                  message: Resource not found
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
          description: Not Found - Resource does not exist
        '409':
          content:
            application/json:
              example:
                error:
                  code: 409
                  message: Resource conflict. Please try again later.
              schema:
                $ref: '#/components/schemas/ConflictResponse'
          description: Conflict - Resource conflict or concurrent modification
        '500':
          content:
            application/json:
              example:
                error:
                  code: 500
                  message: Internal Server Error
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
          description: Internal Server Error - Unexpected server error
      security:
        - apiKey: []
components:
  schemas:
    ChatRequest:
      description: Chat completion request parameters
      example:
        max_tokens: 150
        messages:
          - content: You are a helpful assistant.
            role: system
          - content: What is the capital of France?
            role: user
        model: openai/gpt-4
        temperature: 0.7
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        debug:
          $ref: '#/components/schemas/ChatDebugOptions'
        frequency_penalty:
          description: Frequency penalty (-2.0 to 2.0)
          example: 0
          format: double
          type:
            - number
            - 'null'
        image_config:
          $ref: '#/components/schemas/ImageConfig'
        logit_bias:
          additionalProperties:
            format: double
            type: number
          description: Token logit bias adjustments
          example:
            '50256': -100
          type:
            - object
            - 'null'
        logprobs:
          description: Return log probabilities
          example: false
          type:
            - boolean
            - 'null'
        max_completion_tokens:
          description: Maximum tokens in completion
          example: 100
          type:
            - integer
            - 'null'
        max_tokens:
          description: >-
            Maximum tokens (deprecated, use max_completion_tokens). Note: some
            providers enforce a minimum of 16.
          example: 100
          type:
            - integer
            - 'null'
        messages:
          description: List of messages for the conversation
          example:
            - content: Hello!
              role: user
          items:
            $ref: '#/components/schemas/ChatMessages'
          minItems: 1
          type: array
        metadata:
          additionalProperties:
            type: string
          description: >-
            Key-value pairs for additional object information (max 16 pairs, 64
            char keys, 512 char values)
          example:
            session_id: session-456
            user_id: user-123
          type: object
        min_p:
          description: >-
            Minimum probability threshold relative to the most likely token.
            Tokens with probability below min_p * (probability of top token) are
            filtered out. Not all providers support this parameter.
          example: 0.1
          format: double
          type:
            - number
            - 'null'
        modalities:
          description: >-
            Output modalities for the response. Supported values are "text",
            "image", and "audio".
          example:
            - text
            - image
          items:
            enum:
              - text
              - image
              - audio
            type: string
          type: array
        model:
          $ref: '#/components/schemas/ModelName'
        models:
          $ref: '#/components/schemas/ChatModelNames'
        parallel_tool_calls:
          description: >-
            Whether to enable parallel function calling during tool use. When
            true, the model may generate multiple tool calls in a single
            response.
          example: true
          type:
            - boolean
            - 'null'
        plugins:
          description: >-
            Plugins you want to enable for this request, including their
            settings.
          items:
            discriminator:
              mapping:
                auto-beta-router:
                  $ref: '#/components/schemas/AutoBetaRouterPlugin'
                auto-router:
                  $ref: '#/components/schemas/AutoRouterPlugin'
                context-compression:
                  $ref: '#/components/schemas/ContextCompressionPlugin'
                file-parser:
                  $ref: '#/components/schemas/FileParserPlugin'
                fusion:
                  $ref: '#/components/schemas/FusionPlugin'
                moderation:
                  $ref: '#/components/schemas/ModerationPlugin'
                pareto-router:
                  $ref: '#/components/schemas/ParetoRouterPlugin'
                response-healing:
                  $ref: '#/components/schemas/ResponseHealingPlugin'
                web:
                  $ref: '#/components/schemas/WebSearchPlugin'
                web-fetch:
                  $ref: '#/components/schemas/WebFetchPlugin'
              propertyName: id
            oneOf:
              - $ref: '#/components/schemas/AutoRouterPlugin'
              - $ref: '#/components/schemas/AutoBetaRouterPlugin'
              - $ref: '#/components/schemas/ModerationPlugin'
              - $ref: '#/components/schemas/WebSearchPlugin'
              - $ref: '#/components/schemas/WebFetchPlugin'
              - $ref: '#/components/schemas/FileParserPlugin'
              - $ref: '#/components/schemas/ResponseHealingPlugin'
              - $ref: '#/components/schemas/ContextCompressionPlugin'
              - $ref: '#/components/schemas/ParetoRouterPlugin'
              - $ref: '#/components/schemas/FusionPlugin'
          type: array
        prediction:
          $ref: '#/components/schemas/Prediction'
        presence_penalty:
          description: Presence penalty (-2.0 to 2.0)
          example: 0
          format: double
          type:
            - number
            - 'null'
        prompt_cache_key:
          type:
            - string
            - 'null'
        prompt_cache_options:
          $ref: '#/components/schemas/PromptCacheOptions'
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        reasoning:
          description: Configuration options for reasoning models
          example:
            effort: medium
            summary: concise
          properties:
            effort:
              description: Constrains effort on reasoning for reasoning models
              enum:
                - max
                - xhigh
                - high
                - medium
                - low
                - minimal
                - none
                - null
              example: medium
              type:
                - string
                - 'null'
            summary:
              $ref: '#/components/schemas/ChatReasoningSummaryVerbosityEnum'
          type: object
        reasoning_effort:
          description: >-
            Shorthand for setting reasoning effort. Equivalent to setting
            reasoning.effort. Cannot be used simultaneously with
            reasoning.effort if they differ.
          enum:
            - max
            - xhigh
            - high
            - medium
            - low
            - minimal
            - none
            - null
          example: medium
          type:
            - string
            - 'null'
        repetition_penalty:
          description: >-
            Penalizes tokens based on how much they have already appeared in the
            text. A value of 1.0 means no penalty. Values above 1.0 penalize
            repeated tokens more strongly. Not all providers support this
            parameter.
          example: 1
          format: double
          type:
            - number
            - 'null'
        response_format:
          description: Response format configuration
          discriminator:
            mapping:
              grammar:
                $ref: '#/components/schemas/ChatFormatGrammarConfig'
              json_object:
                $ref: '#/components/schemas/ChatFormatJsonObjectConfig'
              json_schema:
                $ref: '#/components/schemas/ChatFormatJsonSchemaConfig'
              python:
                $ref: '#/components/schemas/ChatFormatPythonConfig'
              text:
                $ref: '#/components/schemas/ChatFormatTextConfig'
            propertyName: type
          example:
            type: json_object
          oneOf:
            - $ref: '#/components/schemas/ChatFormatTextConfig'
            - $ref: '#/components/schemas/ChatFormatJsonObjectConfig'
            - $ref: '#/components/schemas/ChatFormatJsonSchemaConfig'
            - $ref: '#/components/schemas/ChatFormatGrammarConfig'
            - $ref: '#/components/schemas/ChatFormatPythonConfig'
        route:
          $ref: '#/components/schemas/DeprecatedRoute'
        seed:
          description: Random seed for deterministic outputs
          example: 42
          type:
            - integer
            - 'null'
        service_tier:
          description: >-
            The service tier to use for processing this request. `fast` is
            accepted as an alias for `priority`.
          enum:
            - auto
            - default
            - fast
            - flex
            - priority
            - scale
            - null
          example: auto
          type:
            - string
            - 'null'
        session_id:
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow). When provided, OpenRouter uses it
            as the sticky routing key, routing all requests in the session to
            the same provider to maximize prompt cache hits. Also used for
            observability grouping. If provided in both the request body and the
            x-session-id header, the body value takes precedence. Maximum of 256
            characters.
          maxLength: 256
          type: string
        stop:
          anyOf:
            - type: string
            - items:
                type: string
              maxItems: 4
              type: array
            - type: 'null'
          description: Stop sequences (up to 4)
          example:
            - |+

        stop_server_tools_when:
          $ref: '#/components/schemas/StopServerToolsWhen'
        stream:
          default: false
          description: Enable streaming response
          example: false
          type: boolean
        stream_options:
          $ref: '#/components/schemas/ChatStreamOptions'
        temperature:
          description: Sampling temperature (0-2)
          example: 0.7
          format: double
          type:
            - number
            - 'null'
        tool_choice:
          $ref: '#/components/schemas/ChatToolChoice'
        tools:
          description: Available tools for function calling
          example:
            - function:
                description: Get weather
                name: get_weather
              type: function
          items:
            $ref: '#/components/schemas/ChatFunctionTool'
          type: array
        top_a:
          description: >-
            Consider only tokens with "sufficiently high" probabilities based on
            the probability of the most likely token. Not all providers support
            this parameter.
          example: 0
          format: double
          type:
            - number
            - 'null'
        top_k:
          description: >-
            Limits the model to choose from the top K most likely tokens at each
            step. A value of 1 means the model will always pick the most likely
            next token. Not all providers support this parameter.
          example: 40
          type:
            - integer
            - 'null'
        top_logprobs:
          description: Number of top log probabilities to return (0-20)
          example: 5
          type:
            - integer
            - 'null'
        top_p:
          description: Nucleus sampling parameter (0-1)
          example: 1
          format: double
          type:
            - number
            - 'null'
        trace:
          $ref: '#/components/schemas/TraceConfig'
        user:
          description: >-
            Per-end-user identifier for abuse isolation. Use a stable ID, hash,
            or pseudonym. When a provider requires a user identity, OpenRouter
            folds it into the hashed identity sent upstream and never forwards
            it raw. If omitted, requests use an account-level identity, so
            provider policy blocks can affect the whole account.
          example: user-123
          type: string
      required:
        - messages
      type: object
    CreatePresetFromInferenceResponse:
      description: Response containing the created preset with its designated version.
      example:
        data:
          created_at: '2026-04-20T10:00:00Z'
          creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
          description: null
          designated_version:
            config:
              model: openai/gpt-4o
              temperature: 0.7
            created_at: '2026-04-20T10:00:00Z'
            creator_id: user_2dHFtVWx2n56w6HkM0000000000
            id: 550e8400-e29b-41d4-a716-446655440000
            preset_id: 650e8400-e29b-41d4-a716-446655440001
            system_prompt: You are a helpful assistant.
            updated_at: '2026-04-20T10:00:00Z'
            version: 1
          designated_version_id: 550e8400-e29b-41d4-a716-446655440000
          id: 650e8400-e29b-41d4-a716-446655440001
          name: my-preset
          slug: my-preset
          status: active
          status_updated_at: null
          updated_at: '2026-04-20T10:00:00Z'
          workspace_id: 750e8400-e29b-41d4-a716-446655440002
      properties:
        data:
          $ref: '#/components/schemas/PresetWithDesignatedVersion'
      required:
        - data
      type: object
    BadRequestResponse:
      description: Bad Request - Invalid request parameters or malformed input
      example:
        error:
          code: 400
          message: Invalid request parameters
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    UnauthorizedResponse:
      description: Unauthorized - Authentication required or invalid credentials
      example:
        error:
          code: 401
          message: Missing Authentication header
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    ForbiddenResponse:
      description: Forbidden - Authentication successful but insufficient permissions
      example:
        error:
          code: 403
          message: Only management keys can perform this operation
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    NotFoundResponse:
      description: Not Found - Resource does not exist
      example:
        error:
          code: 404
          message: Resource not found
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    ConflictResponse:
      description: Conflict - Resource conflict or concurrent modification
      example:
        error:
          code: 409
          message: Resource conflict. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/ConflictResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    InternalServerResponse:
      description: Internal Server Error - Unexpected server error
      example:
        error:
          code: 500
          message: Internal Server Error
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    AnthropicCacheControlDirective:
      description: >-
        Enable automatic prompt caching. When set at the top level, the system
        automatically applies cache breakpoints to the last cacheable block in
        the request. When set on an individual content block, it marks an
        explicit cache breakpoint; block-level markers also work on OpenAI
        models that support explicit prompt caching — OpenRouter converts them
        to the provider's native format.
      example:
        type: ephemeral
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          enum:
            - ephemeral
          type: string
      required:
        - type
      type: object
    ChatDebugOptions:
      description: Debug options for inspecting request transformations (streaming only)
      example:
        echo_upstream_body: true
      properties:
        echo_upstream_body:
          description: >-
            If true, includes the transformed upstream request body in a debug
            chunk at the start of the stream. Only works with streaming mode.
          example: true
          type: boolean
      type: object
    ImageConfig:
      additionalProperties:
        anyOf:
          - type: string
          - format: double
            type: number
          - items: {}
            type: array
      description: >-
        Provider-specific image configuration options. Keys and values vary by
        model/provider. See
        https://openrouter.ai/docs/guides/overview/multimodal/image-generation
        for more details.
      example:
        aspect_ratio: '16:9'
        quality: high
      type: object
    ChatMessages:
      description: Chat completion message with role-based discrimination
      discriminator:
        mapping:
          assistant:
            $ref: '#/components/schemas/ChatAssistantMessage'
          developer:
            $ref: '#/components/schemas/ChatDeveloperMessage'
          system:
            $ref: '#/components/schemas/ChatSystemMessage'
          tool:
            $ref: '#/components/schemas/ChatToolMessage'
          user:
            $ref: '#/components/schemas/ChatUserMessage'
        propertyName: role
      example:
        content: What is the capital of France?
        role: user
      oneOf:
        - $ref: '#/components/schemas/ChatSystemMessage'
        - $ref: '#/components/schemas/ChatUserMessage'
        - $ref: '#/components/schemas/ChatDeveloperMessage'
        - $ref: '#/components/schemas/ChatAssistantMessage'
        - $ref: '#/components/schemas/ChatToolMessage'
    ModelName:
      description: Model to use for completion
      example: openai/gpt-4
      type: string
    ChatModelNames:
      description: Models to use for completion
      example:
        - openai/gpt-4
        - openai/gpt-4o
      items:
        allOf:
          - $ref: '#/components/schemas/ModelName'
          - description: Available OpenRouter chat completion models
      type: array
    AutoBetaRouterPlugin:
      example:
        allowed_models:
          - anthropic/*
          - openai/*
        cost_tier: low
        enabled: true
        excluded_models:
          - openai/gpt-4o
        id: auto-beta-router
      properties:
        allowed_models:
          description: >-
            List of model patterns to filter which models the auto-beta-router
            can route between. Supports wildcards (e.g., "anthropic/*" matches
            all Anthropic models). Up to 1024 patterns, each at most 1024
            characters, with 65536 total characters across all patterns. When
            not specified, every model ranked for the classified task type is a
            candidate, falling back to a default model set when rankings are
            unavailable.
          example:
            - anthropic/*
            - openai/gpt-4o
            - google/*
          items:
            maxLength: 1024
            type: string
          maxItems: 1024
          type: array
        cost_quality_tradeoff:
          deprecated: true
          description: >-
            Deprecated: Use cost_tier instead. Balances routing between cost and
            quality on a 0-10 scale. The auto-beta-router ranks models for the
            classified task type by community spend share, then filters
            candidates by their average cost per generation for that task.
            Higher values favor cheaper models: 10 keeps only models around the
            cheapest 10th percentile, while 0 permits models up to the 90th
            percentile for cost. Defaults to 9 when no cost setting is provided.
            It remains supported and retains ceiling behavior, but cost_tier
            takes precedence when both are provided.
          example: 9
          maximum: 10
          minimum: 0
          type: integer
        cost_tier:
          description: >-
            Named cost/quality setting. For auto-beta-router, tiers select
            cost-percentile bands: low = [0, 20), medium = [20, 40), high = [40,
            60), xhigh = [60, 80), and max = [80, 100]. Takes precedence over
            the deprecated numeric cost_quality_tradeoff when both are provided.
          enum:
            - low
            - medium
            - high
            - xhigh
            - max
          example: low
          type: string
        enabled:
          description: >-
            Set to false to disable the auto-beta-router plugin for this
            request. Defaults to true.
          type: boolean
        excluded_models:
          description: >-
            List of model patterns to exclude from auto-beta-router selection.
            Supports wildcards (e.g., "meta-llama/*" excludes all Llama models).
            Up to 1024 patterns, each at most 1024 characters, with 65536 total
            characters across all patterns. Applied after allowed_models, so an
            excluded pattern always wins over an allowed one.
          example:
            - openai/gpt-4o
            - meta-llama/*
          items:
            maxLength: 1024
            type: string
          maxItems: 1024
          type: array
        id:
          enum:
            - auto-beta-router
          type: string
      required:
        - id
      type: object
    AutoRouterPlugin:
      example:
        allowed_models:
          - anthropic/*
          - openai/*
        cost_tier: low
        enabled: true
        excluded_models:
          - openai/gpt-4o
        id: auto-router
        pin_model: false
      properties:
        allowed_models:
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). Up to 1024 patterns, each at most 1024
            characters, with 65536 total characters across all patterns. When
            not specified, every model ranked for the classified task type is a
            candidate, falling back to a default model set when rankings are
            unavailable.
          example:
            - anthropic/*
            - openai/gpt-4o
            - google/*
          items:
            maxLength: 1024
            type: string
          maxItems: 1024
          type: array
        cost_quality_tradeoff:
          deprecated: true
          description: >-
            Deprecated: Use cost_tier instead. Balances routing between cost and
            quality on a 0-10 scale. The auto-router ranks models for the
            classified task type by community spend share, then filters
            candidates by their average cost per generation for that task.
            Higher values favor cheaper models: 10 keeps only models around the
            cheapest 10th percentile, while 0 permits models up to the 90th
            percentile for cost. Defaults to 9 when no cost setting is provided.
            It remains supported and retains ceiling behavior, but cost_tier
            takes precedence when both are provided.
          example: 9
          maximum: 10
          minimum: 0
          type: integer
        cost_tier:
          description: >-
            Named cost/quality setting. Tiers select cost-percentile bands: low
            = [0, 20), medium = [20, 40), high = [40, 60), xhigh = [60, 80), and
            max = [80, 100]. Takes precedence over the deprecated numeric
            cost_quality_tradeoff when both are provided.
          enum:
            - low
            - medium
            - high
            - xhigh
            - max
          example: low
          type: string
        enabled:
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
          type: boolean
        excluded_models:
          description: >-
            List of model patterns to exclude from auto-router selection.
            Supports wildcards (e.g., "meta-llama/*" excludes all Llama models).
            Up to 1024 patterns, each at most 1024 characters, with 65536 total
            characters across all patterns. Applied after allowed_models, so an
            excluded pattern always wins over an allowed one.
          example:
            - openai/gpt-4o
            - meta-llama/*
          items:
            maxLength: 1024
            type: string
          maxItems: 1024
          type: array
        id:
          enum:
            - auto-router
          type: string
        pin_model:
          description: >-
            When true, reuses the model from the most recent assistant message's
            `model` attribute for subsequent turns. Defaults to false.
          example: false
          type: boolean
      required:
        - id
      type: object
    ContextCompressionPlugin:
      example:
        enabled: true
        engine: middle-out
        id: context-compression
      properties:
        enabled:
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
          type: boolean
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
        id:
          enum:
            - context-compression
          type: string
      required:
        - id
      type: object
    FileParserPlugin:
      example:
        enabled: true
        id: file-parser
        pdf:
          engine: cloudflare-ai
      properties:
        enabled:
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
          type: boolean
        id:
          enum:
            - file-parser
          type: string
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      type: object
    FusionPlugin:
      example:
        analysis_models:
          - ~anthropic/claude-opus-latest
          - ~openai/gpt-latest
          - ~google/gemini-pro-latest
        enabled: true
        id: fusion
        model: ~anthropic/claude-opus-latest
      properties:
        analysis_models:
          description: >-
            For a Fusion run started by the `openrouter/fusion` model slug or
            `openrouter:fusion` server tool, slugs of models to run in parallel
            as the "expert panel" the analyst analyzes. Each model receives the
            same user prompt with web_search + web_fetch enabled. Capped at 8
            models to bound cost amplification. When omitted, defaults to the
            Quality preset from the /labs/fusion UI
            (~anthropic/claude-opus-latest, ~openai/gpt-latest,
            ~google/gemini-pro-latest).
          example:
            - ~anthropic/claude-opus-latest
            - ~openai/gpt-latest
            - ~google/gemini-pro-latest
          items:
            type: string
          maxItems: 8
          minItems: 1
          type: array
        enabled:
          description: >-
            Set to false to disable Fusion configuration for a run started by
            the `openrouter/fusion` model slug or `openrouter:fusion` server
            tool. Defaults to true.
          type: boolean
        id:
          enum:
            - fusion
          type: string
        max_tool_calls:
          description: >-
            For a Fusion run started by the `openrouter/fusion` model slug or
            `openrouter:fusion` server tool, the maximum number of tool-calling
            steps each panelist (analysis model) and the analyst model may take
            during their agentic web-research loop. Models with
            web_search/web_fetch enabled iterate until they produce a text
            response or hit this ceiling. Defaults to 4. Capped at 16.
          example: 12
          maximum: 16
          minimum: 1
          type: integer
        model:
          description: >-
            For a Fusion run started by the `openrouter/fusion` model slug or
            `openrouter:fusion` server tool, the slug of the model that performs
            both the analyst step (with web_search + web_fetch) and the final
            synthesis. When omitted, defaults to the first model in the Quality
            preset.
          example: ~anthropic/claude-opus-latest
          type: string
        preset:
          description: >-
            Configuration for a Fusion run started by the `openrouter/fusion`
            model slug or `openrouter:fusion` server tool. A curated OpenRouter
            preset (slugs follow `<task>-<tier>`, e.g. `general-high`). Expands
            server-side into the preset's analysis_models panel and analyst
            model, so callers never name individual models. Explicitly provided
            `analysis_models` / `model` take precedence.
          enum:
            - general-high
            - general-budget
            - general-fast
          example: general-high
          type: string
        tools:
          description: >-
            For a Fusion run started by the `openrouter/fusion` model slug or
            `openrouter:fusion` server tool, server tools available to panelist
            and analyst inner calls. Each entry uses the same `{ type,
            parameters? }` shorthand as the outer Chat Completions request. When
            omitted, defaults to `[{ type: "openrouter:web_search" }, { type:
            "openrouter:web_fetch" }]`. Pass an empty array to disable tools
            entirely (panelists answer from parametric knowledge only).
          example:
            - parameters:
                excluded_domains:
                  - example.com
              type: openrouter:web_search
            - type: openrouter:web_fetch
          items:
            properties:
              parameters:
                additionalProperties:
                  anyOf:
                    - type: string
                    - format: double
                      type: number
                    - type: boolean
                    - type: 'null'
                    - items:
                        anyOf:
                          - type: string
                          - format: double
                            type: number
                          - type: boolean
                          - type: 'null'
                          - type: 'null'
                      type: array
                    - additionalProperties:
                        anyOf:
                          - type: string
                          - format: double
                            type: number
                          - type: boolean
                          - type: 'null'
                          - type: 'null'
                      type: object
                    - type: 'null'
                description: >-
                  Optional configuration forwarded as the tool's `parameters`
                  object.
                type: object
              type:
                description: >-
                  Server tool type identifier (e.g. "openrouter:web_search",
                  "openrouter:web_fetch").
                type: string
            required:
              - type
            type: object
          maxItems: 8
          type: array
      required:
        - id
      type: object
    ModerationPlugin:
      example:
        id: moderation
      properties:
        id:
          enum:
            - moderation
          type: string
      required:
        - id
      type: object
    ParetoRouterPlugin:
      example:
        enabled: true
        id: pareto-router
        max_price: 5
        price_source: prompt
      properties:
        enabled:
          description: >-
            Set to false to disable the pareto-router plugin for this request.
            Defaults to true.
          type: boolean
        id:
          enum:
            - pareto-router
          type: string
        max_price:
          description: >-
            Maximum input price in USD per million tokens. When set,
            quality-tier selection (min_coding_score) is bypassed: the router
            computes the Pareto frontier over the top coding models and routes
            to the best-scoring frontier model priced at or below this cap,
            falling back through cheaper frontier models, then non-frontier
            models. Enforced against the price source given by price_source.
            Returns 404 when no candidate satisfies the cap.
          example: 5
          format: double
          minimum: 0
          type: number
        min_coding_score:
          description: >-
            Minimum coding quality score between 0 and 1. Maps to internal
            quality tiers: >= 0.66 → high (top coding models), >= 0.33 → medium
            (strong modern flagships), < 0.33 → low (capable coders above the
            median). Omit to default to the highest tier (equivalent to >=
            0.66). Not used when max_price is set (price-based selection takes
            over).
          example: 0.8
          format: double
          maximum: 1
          minimum: 0
          type: number
        price_source:
          description: >-
            Price source for the Pareto frontier cost axis and for enforcing
            max_price. "prompt" uses catalog list price
            (endpoint.pricing.prompt). "weighted_avg" uses traffic-weighted
            effective input price from ClickHouse, falling back to prompt price
            for models without traffic data. Defaults to "prompt".
          enum:
            - prompt
            - weighted_avg
          type: string
      required:
        - id
      type: object
    ResponseHealingPlugin:
      example:
        enabled: true
        id: response-healing
      properties:
        enabled:
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
          type: boolean
        id:
          enum:
            - response-healing
          type: string
      required:
        - id
      type: object
    WebSearchPlugin:
      example:
        enabled: true
        id: web
        max_results: 5
      properties:
        enabled:
          description: >-
            Set to false to disable the web-search plugin for this request.
            Defaults to true.
          type: boolean
        engine:
          $ref: '#/components/schemas/WebSearchEngine'
        exclude_domains:
          description: >-
            A list of domains to exclude from web search results. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
          example:
            - example.com
            - '*.substack.com'
            - openai.com/blog
          items:
            type: string
          type: array
        id:
          enum:
            - web
          type: string
        include_domains:
          description: >-
            A list of domains to restrict web search results to. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
          example:
            - example.com
            - '*.substack.com'
            - openai.com/blog
          items:
            type: string
          type: array
        max_results:
          type: integer
        max_uses:
          description: >-
            Maximum number of times the model can invoke web search in a single
            turn. Passed through to native providers that support it (e.g.
            Anthropic).
          type: integer
        mode:
          $ref: '#/components/schemas/WebSearchMode'
        search_prompt:
          type: string
        user_location:
          allOf:
            - $ref: '#/components/schemas/WebSearchUserLocation'
            - description: >-
                Approximate user location for location-biased search results.
                Passed through to native providers that support it (e.g.
                Anthropic).
              example:
                city: San Francisco
                country: US
                region: California
                timezone: America/Los_Angeles
                type: approximate
              required:
                - type
      required:
        - id
      type: object
    WebFetchPlugin:
      example:
        id: web-fetch
        max_uses: 10
      properties:
        allowed_domains:
          description: Only fetch from these domains.
          items:
            type: string
          type: array
        blocked_domains:
          description: Never fetch from these domains.
          items:
            type: string
          type: array
        id:
          enum:
            - web-fetch
          type: string
        max_content_tokens:
          description: >-
            Maximum content length in approximate tokens. Content exceeding this
            limit is truncated.
          type: integer
        max_uses:
          description: >-
            Maximum number of web fetches per request. Once exceeded, the tool
            returns an error.
          type: integer
      required:
        - id
      type: object
    Prediction:
      description: >-
        Static predicted output content. Supported models can use this to reduce
        latency when much of the response is known in advance.
      example:
        content: Expected response
        type: content
      properties:
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/PredictionContentText'
              type: array
        type:
          enum:
            - content
          type: string
      required:
        - type
        - content
      type:
        - object
        - 'null'
    PromptCacheOptions:
      description: >-
        Request-level prompt-cache controls. `mode: "explicit"` disables
        OpenAI-managed breakpoints so only blocks marked with
        `prompt_cache_breakpoint` are cached. Only supported by OpenAI GPT-5.6
        and newer.
      example:
        mode: explicit
        ttl: 30m
      properties:
        mode:
          enum:
            - explicit
          type: string
        ttl:
          type:
            - string
            - 'null'
      required:
        - mode
      type:
        - object
        - 'null'
    ProviderPreferences:
      additionalProperties: false
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      example:
        allow_fallbacks: true
      properties:
        allow_fallbacks:
          description: >
            Whether to allow backup providers to serve requests

            - true: (default) when the primary provider (or your custom
            providers in "order") is unavailable, use the next best provider.

            - false: use only the primary/custom provider, and return the
            upstream error if it's unavailable.
          type:
            - boolean
            - 'null'
        data_collection:
          description: >-
            Data collection setting. If no available model provider meets the
            requirement, your request will return an error.

            - allow: (default) allow providers which store user data
            non-transiently and may train on it


            - deny: use only providers which do not collect user data.
          enum:
            - deny
            - allow
            - null
          example: allow
          type:
            - string
            - 'null'
        enforce_distillable_text:
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
          example: true
          type:
            - boolean
            - 'null'
        ignore:
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
          example:
            - openai
            - anthropic
          items:
            anyOf:
              - $ref: '#/components/schemas/ProviderName'
              - type: string
          type:
            - array
            - 'null'
        max_price:
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
          properties:
            audio:
              description: Maximum price in USD per audio unit
              type: string
            completion:
              description: Maximum price in USD per million completion tokens
              type: string
            image:
              description: Maximum price in USD per image
              type: string
            prompt:
              description: Maximum price in USD per million prompt tokens
              type: string
            request:
              description: Maximum price in USD per request
              type: string
          type: object
        only:
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
          example:
            - openai
            - anthropic
          items:
            anyOf:
              - $ref: '#/components/schemas/ProviderName'
              - type: string
          type:
            - array
            - 'null'
        order:
          description: >-
            An ordered list of provider slugs. The router will attempt to use
            the first provider in the subset of this list that supports your
            requested model, and fall back to the next if it is unavailable. If
            no providers are available, the request will fail with an error
            message.
          example:
            - openai
            - anthropic
          items:
            anyOf:
              - $ref: '#/components/schemas/ProviderName'
              - type: string
          type:
            - array
            - 'null'
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        quantizations:
          description: A list of quantization levels to filter the provider by.
          items:
            $ref: '#/components/schemas/Quantization'
          type:
            - array
            - 'null'
        require_parameters:
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
          type:
            - boolean
            - 'null'
        sort:
          anyOf:
            - $ref: '#/components/schemas/ProviderSort'
            - $ref: '#/components/schemas/ProviderSortConfig'
            - type: 'null'
          description: >-
            The sorting strategy to use for this request, if "order" is not
            specified. When set, no load balancing is performed.
          example: price
        zdr:
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
          example: true
          type:
            - boolean
            - 'null'
      type:
        - object
        - 'null'
    ChatReasoningSummaryVerbosityEnum:
      enum:
        - auto
        - concise
        - detailed
        - null
      example: concise
      type:
        - string
        - 'null'
    ChatFormatGrammarConfig:
      description: Custom grammar response format
      example:
        grammar: root ::= "yes" | "no"
        type: grammar
      properties:
        grammar:
          description: Custom grammar for text generation
          example: root ::= "yes" | "no"
          type: string
        type:
          enum:
            - grammar
          type: string
      required:
        - type
        - grammar
      type: object
    ChatFormatJsonObjectConfig:
      description: JSON object response format
      example:
        type: json_object
      properties:
        type:
          enum:
            - json_object
          type: string
      required:
        - type
      type: object
    ChatFormatJsonSchemaConfig:
      description: JSON Schema response format for structured outputs
      example:
        json_schema:
          name: math_response
          schema:
            properties:
              answer:
                type: number
            required:
              - answer
            type: object
        type: json_schema
      properties:
        json_schema:
          $ref: '#/components/schemas/ChatJsonSchemaConfig'
        type:
          enum:
            - json_schema
          type: string
      required:
        - type
        - json_schema
      type: object
    ChatFormatPythonConfig:
      description: Python code response format
      example:
        type: python
      properties:
        type:
          enum:
            - python
          type: string
      required:
        - type
      type: object
    ChatFormatTextConfig:
      description: Default text response format
      example:
        type: text
      properties:
        type:
          enum:
            - text
          type: string
      required:
        - type
      type: object
    DeprecatedRoute:
      deprecated: true
      description: >-
        **DEPRECATED** Use providers.sort.partition instead.
        Backwards-compatible alias for providers.sort.partition. Accepts legacy
        values: "fallback" (maps to "model"), "sort" (maps to "none").
      enum:
        - fallback
        - sort
        - null
      example: fallback
      type:
        - string
        - 'null'
      x-fern-ignore: true
      x-speakeasy-deprecation-message: Use providers.sort.partition instead.
      x-speakeasy-ignore: true
    StopServerToolsWhen:
      description: >-
        Stop conditions for the server-tool agent loop. Any condition firing
        halts the loop (OR logic). When set, this overrides `max_tool_calls`.
        When a condition fires while the model is still emitting tool calls, the
        pending tool calls are executed and one final turn is made with tool
        calls disabled so the response ends with a natural-language answer
        instead of an unfinished tool call.
      example:
        - step_count: 5
          type: step_count_is
        - max_cost_in_dollars: 0.5
          type: max_cost
      items:
        $ref: '#/components/schemas/StopServerToolsWhenCondition'
      minItems: 1
      type: array
    ChatStreamOptions:
      description: Streaming configuration options
      example:
        include_usage: true
      properties:
        include_usage:
          deprecated: true
          description: >-
            Deprecated: This field has no effect. Full usage details are always
            included.
          example: true
          type: boolean
      type:
        - object
        - 'null'
    ChatToolChoice:
      anyOf:
        - enum:
            - none
          type: string
        - enum:
            - auto
          type: string
        - enum:
            - required
          type: string
        - $ref: '#/components/schemas/ChatNamedToolChoice'
        - $ref: '#/components/schemas/ChatServerToolChoice'
      description: Tool choice configuration
      example: auto
    ChatFunctionTool:
      anyOf:
        - properties:
            cache_control:
              $ref: '#/components/schemas/ChatContentCacheControl'
            function:
              description: Function definition for tool calling
              example:
                description: Get the current weather for a location
                name: get_weather
                parameters:
                  properties:
                    location:
                      description: City name
                      type: string
                  required:
                    - location
                  type: object
              properties:
                description:
                  description: Function description for the model
                  example: Get the current weather for a location
                  type: string
                name:
                  description: >-
                    Function name (a-z, A-Z, 0-9, underscores, dashes, max 64
                    chars)
                  example: get_weather
                  maxLength: 64
                  type: string
                parameters:
                  additionalProperties: {}
                  description: Function parameters as JSON Schema object
                  example:
                    properties:
                      location:
                        description: City name
                        type: string
                    required:
                      - location
                    type: object
                  type: object
                strict:
                  description: Enable strict schema adherence
                  example: false
                  type:
                    - boolean
                    - 'null'
              required:
                - name
              type: object
            type:
              enum:
                - function
              type: string
          required:
            - type
            - function
          type: object
        - $ref: '#/components/schemas/AdvisorServerTool_OpenRouter'
        - $ref: '#/components/schemas/BashServerTool'
        - $ref: '#/components/schemas/DatetimeServerTool'
        - $ref: '#/components/schemas/FilesServerTool'
        - $ref: '#/components/schemas/FusionServerTool_OpenRouter'
        - $ref: '#/components/schemas/ImageGenerationServerTool_OpenRouter'
        - $ref: '#/components/schemas/ChatSearchModelsServerTool'
        - $ref: '#/components/schemas/SubagentServerTool_OpenRouter'
        - $ref: '#/components/schemas/WebFetchServerTool'
        - $ref: '#/components/schemas/OpenRouterWebSearchServerTool'
        - $ref: '#/components/schemas/ChatWebSearchShorthand'
      description: >-
        Tool definition for function calling (regular function or OpenRouter
        built-in server tool)
      example:
        function:
          description: Get the current weather for a location
          name: get_weather
          parameters:
            properties:
              location:
                description: City name
                type: string
              unit:
                enum:
                  - celsius
                  - fahrenheit
                type: string
            required:
              - location
            type: object
        type: function
    TraceConfig:
      additionalProperties: {}
      description: >-
        Metadata for observability and tracing. Known keys (trace_id,
        trace_name, span_name, generation_name, parent_span_id) have special
        handling. Additional keys are passed through as custom metadata to
        configured broadcast destinations.
      example:
        trace_id: trace-abc123
        trace_name: my-app-trace
      properties:
        generation_name:
          type: string
        parent_span_id:
          type: string
        span_name:
          type: string
        trace_id:
          type: string
        trace_name:
          type: string
      type: object
    PresetWithDesignatedVersion:
      allOf:
        - $ref: '#/components/schemas/Preset'
        - properties:
            designated_version:
              $ref: '#/components/schemas/PresetDesignatedVersion'
          required:
            - designated_version
          type: object
      description: A preset with its currently designated version.
      example:
        created_at: '2026-04-20T10:00:00Z'
        creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
        description: null
        designated_version:
          config:
            model: openai/gpt-4o
            temperature: 0.7
          created_at: '2026-04-20T10:00:00Z'
          creator_id: user_2dHFtVWx2n56w6HkM0000000000
          id: 550e8400-e29b-41d4-a716-446655440000
          preset_id: 650e8400-e29b-41d4-a716-446655440001
          system_prompt: You are a helpful assistant.
          updated_at: '2026-04-20T10:00:00Z'
          version: 1
        designated_version_id: 550e8400-e29b-41d4-a716-446655440000
        id: 650e8400-e29b-41d4-a716-446655440001
        name: my-preset
        slug: my-preset
        status: active
        status_updated_at: null
        updated_at: '2026-04-20T10:00:00Z'
        workspace_id: 750e8400-e29b-41d4-a716-446655440002
    BadRequestResponseErrorData:
      description: Error data for BadRequestResponse
      example:
        code: 400
        message: Invalid request parameters
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    UnauthorizedResponseErrorData:
      description: Error data for UnauthorizedResponse
      example:
        code: 401
        message: Missing Authentication header
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    ForbiddenResponseErrorData:
      description: Error data for ForbiddenResponse
      example:
        code: 403
        message: Only management keys can perform this operation
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    NotFoundResponseErrorData:
      description: Error data for NotFoundResponse
      example:
        code: 404
        message: Resource not found
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    ConflictResponseErrorData:
      description: Error data for ConflictResponse
      example:
        code: 409
        message: Resource conflict. Please try again later.
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    InternalServerResponseErrorData:
      description: Error data for InternalServerResponse
      example:
        code: 500
        message: Internal Server Error
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
    AnthropicCacheControlTtl:
      enum:
        - 5m
        - 1h
      example: 5m
      type: string
    ChatAssistantMessage:
      description: Assistant message for requests and responses
      example:
        content: The capital of France is Paris.
        model: openai/gpt-4o
        role: assistant
      properties:
        audio:
          $ref: '#/components/schemas/ChatAudioOutput'
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/ChatContentItems'
              type: array
            - type: 'null'
          description: Assistant message content
        images:
          $ref: '#/components/schemas/ChatAssistantImages'
        model:
          description: Model that generated this assistant message
          example: openai/gpt-4o
          type: string
        name:
          description: Optional name for the assistant
          type: string
        reasoning:
          description: Reasoning output
          type:
            - string
            - 'null'
        reasoning_details:
          $ref: '#/components/schemas/ChatReasoningDetails'
        refusal:
          description: Refusal message if content was refused
          type:
            - string
            - 'null'
        role:
          enum:
            - assistant
          type: string
        tool_calls:
          description: Tool calls made by the assistant
          items:
            $ref: '#/components/schemas/ChatToolCall'
          type: array
      required:
        - role
      type: object
    ChatDeveloperMessage:
      description: Developer message
      example:
        content: This is a message from the developer.
        role: developer
      properties:
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/ChatContentText'
              type: array
          description: Developer message content
          example: This is a message from the developer.
        name:
          description: Optional name for the developer message
          example: Developer
          type: string
        role:
          enum:
            - developer
          type: string
      required:
        - role
        - content
      type: object
    ChatSystemMessage:
      description: System message for setting behavior
      example:
        content: You are a helpful assistant.
        name: Assistant Config
        role: system
      properties:
        configuration_update:
          additionalProperties: false
          description: >-
            OpenRouter extension. Changes reasoning effort from this point in
            the conversation onward without invalidating the prompt cache for
            the preceding turns. Place it on a content-less system message
            (`content: ""`) directly before the user message it should apply to,
            and keep it at that position in later requests. Equivalent to the
            OpenAI Responses `configuration_update` input item and the Anthropic
            Messages per-message `output_config.effort`.
          example:
            reasoning:
              effort: low
          properties:
            reasoning:
              $ref: '#/components/schemas/ConfigurationUpdateReasoning'
          required:
            - reasoning
          type:
            - object
            - 'null'
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/ChatContentText'
              type: array
          description: System message content
          example: You are a helpful assistant.
        name:
          description: Optional name for the system message
          example: Assistant Config
          type: string
        role:
          enum:
            - system
          type: string
      required:
        - role
        - content
      type: object
    ChatToolMessage:
      description: Tool response message
      example:
        content: The weather in San Francisco is 72°F and sunny.
        role: tool
        tool_call_id: call_abc123
      properties:
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/ChatContentItems'
              type: array
          description: Tool response content
          example: The weather in San Francisco is 72°F and sunny.
        role:
          enum:
            - tool
          type: string
        tool_call_id:
          description: ID of the assistant message tool call this message responds to
          example: call_abc123
          type: string
      required:
        - role
        - content
        - tool_call_id
      type: object
    ChatUserMessage:
      description: User message
      example:
        content: What is the capital of France?
        role: user
      properties:
        content:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/ChatContentItems'
              type: array
          description: User message content
          example: What is the capital of France?
        name:
          description: Optional name for the user
          example: User
          type: string
        role:
          enum:
            - user
          type: string
      required:
        - role
        - content
      type: object
    ContextCompressionEngine:
      description: The compression engine to use. Defaults to "middle-out".
      enum:
        - middle-out
      example: middle-out
      type: string
    PDFParserOptions:
      description: Options for PDF parsing.
      example:
        engine: cloudflare-ai
      properties:
        engine:
          $ref: '#/components/schemas/PDFParserEngine'
      type: object
    WebSearchEngine:
      description: The search engine to use for web search.
      enum:
        - native
        - exa
        - firecrawl
        - parallel
        - perplexity
      example: exa
      type: string
    WebSearchMode:
      description: >-
        Engine-native search mode. Exa supports instant, fast, auto (default),
        deep-lite, deep, and deep-reasoning. Parallel supports turbo, fast,
        basic (default), and advanced. Modes unsupported by the selected engine
        are ignored.
      enum:
        - instant
        - fast
        - auto
        - deep-lite
        - deep
        - deep-reasoning
        - turbo
        - basic
        - advanced
      example: auto
      type: string
    WebSearchUserLocation:
      description: User location information for web search
      example:
        city: San Francisco
        country: USA
        region: California
        timezone: America/Los_Angeles
        type: approximate
      properties:
        city:
          type:
            - string
            - 'null'
        country:
          type:
            - string
            - 'null'
        region:
          type:
            - string
            - 'null'
        timezone:
          type:
            - string
            - 'null'
        type:
          enum:
            - approximate
          type: string
      type:
        - object
        - 'null'
    PredictionContentText:
      description: Text content part for a predicted output.
      example:
        text: Expected response
        type: text
      properties:
        text:
          type: string
        type:
          enum:
            - text
          type: string
      required:
        - type
        - text
      type: object
    ProviderName:
      enum:
        - Modal
        - AkashML
        - AI21
        - AionLabs
        - Alibaba
        - Ambient
        - Baidu
        - Amazon Bedrock
        - Amazon Nova
        - Anthropic
        - Arcee AI
        - AtlasCloud
        - Avian
        - Azure
        - BaseTen
        - BytePlus
        - Black Forest Labs
        - Cerebras
        - Chutes
        - Cirrascale
        - Claude Platform on AWS
        - Clarifai
        - Cloudflare
        - Cohere
        - CoreWeave
        - Cosine
        - Crucible
        - Crusoe
        - Darkbloom
        - Databricks
        - Decart
        - Deepgram
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - DigitalOcean
        - Featherless
        - Fireworks
        - Fish Audio
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
        - HeyGen
        - Inception
        - Inceptron
        - InferenceNet
        - Ionstream
        - Infermatic
        - Io Net
        - Inferact vLLM
        - Inflection
        - Liquid
        - Makora
        - Mara
        - Mancer 2
        - Meta
        - Minimax
        - ModelRun
        - Mistral
        - Modular
        - Moonshot AI
        - Morph
        - VoyageAI by MongoDB
        - NCompass
        - Nebius
        - Nex AGI
        - NextBit
        - Novita
        - Nvidia
        - Ollama
        - OpenAI
        - OpenInference
        - Parasail
        - Poolside
        - PrimeIntellect
        - Perceptron
        - Perplexity
        - Phala
        - Recraft
        - Reka
        - Relace
        - Sail Research
        - Sakana AI
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Tencent
        - Tenstorrent
        - Thinking Machines
        - Together
        - Upstage
        - Venice
        - Wafer
        - WandB
        - Quiver
        - Krea
        - Runway
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      example: OpenAI
      type: string
    PreferredMaxLatency:
      anyOf:
        - format: double
          type: number
        - $ref: '#/components/schemas/PercentileLatencyCutoffs'
        - type: 'null'
      description: >-
        Preferred maximum latency (in seconds). Can be a number (applies to p50)
        or an object with percentile-specific cutoffs. Endpoints above the
        threshold(s) may still be used, but are deprioritized in routing. When
        using fallback models, this may cause a fallback model to be used
        instead of the primary model if it meets the threshold.
      example: 5
    PreferredMinThroughput:
      anyOf:
        - format: double
          type: number
        - $ref: '#/components/schemas/PercentileThroughputCutoffs'
        - type: 'null'
      description: >-
        Preferred minimum throughput (in tokens per second). Can be a number
        (applies to p50) or an object with percentile-specific cutoffs.
        Endpoints below the threshold(s) may still be used, but are
        deprioritized in routing. When using fallback models, this may cause a
        fallback model to be used instead of the primary model if it meets the
        threshold.
      example: 100
    Quantization:
      enum:
        - int4
        - int8
        - fp4
        - mxfp4
        - nvfp4
        - fp6
        - fp8
        - mxfp8
        - fp16
        - bf16
        - fp32
        - unknown
      example: fp16
      type: string
    ProviderSort:
      description: The provider sorting strategy (price, throughput, latency)
      enum:
        - price
        - throughput
        - latency
        - exacto
      example: price
      type: string
    ProviderSortConfig:
      description: The provider sorting strategy (price, throughput, latency)
      example:
        by: price
        partition: model
      properties:
        by:
          description: The provider sorting strategy (price, throughput, latency)
          enum:
            - price
            - throughput
            - latency
            - exacto
            - null
          example: price
          type:
            - string
            - 'null'
        partition:
          description: >-
            Partitioning strategy for sorting: "model" (default) groups
            endpoints by model before sorting (fallback models remain
            fallbacks), "none" sorts all endpoints together regardless of model.
          enum:
            - model
            - none
            - null
          example: model
          type:
            - string
            - 'null'
      type: object
    ChatJsonSchemaConfig:
      description: JSON Schema configuration object
      example:
        description: A mathematical response
        name: math_response
        schema:
          properties:
            answer:
              type: number
          required:
            - answer
          type: object
        strict: true
      properties:
        description:
          description: Schema description for the model
          example: A mathematical response
          type: string
        name:
          description: Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
          example: math_response
          maxLength: 64
          type: string
        schema:
          additionalProperties: {}
          description: JSON Schema object
          example:
            properties:
              answer:
                type: number
            required:
              - answer
            type: object
          type: object
        strict:
          description: Enable strict schema adherence
          example: false
          type:
            - boolean
            - 'null'
      required:
        - name
      type: object
    StopServerToolsWhenCondition:
      description: A single condition that, when met, halts the server-tool agent loop.
      discriminator:
        mapping:
          finish_reason_is:
            $ref: '#/components/schemas/StopServerToolsWhenFinishReasonIs'
          has_tool_call:
            $ref: '#/components/schemas/StopServerToolsWhenHasToolCall'
          max_cost:
            $ref: '#/components/schemas/StopServerToolsWhenMaxCost'
          max_tokens_used:
            $ref: '#/components/schemas/StopServerToolsWhenMaxTokensUsed'
          step_count_is:
            $ref: '#/components/schemas/StopServerToolsWhenStepCountIs'
        propertyName: type
      example:
        step_count: 5
        type: step_count_is
      oneOf:
        - $ref: '#/components/schemas/StopServerToolsWhenStepCountIs'
        - $ref: '#/components/schemas/StopServerToolsWhenHasToolCall'
        - $ref: '#/components/schemas/StopServerToolsWhenMaxTokensUsed'
        - $ref: '#/components/schemas/StopServerToolsWhenMaxCost'
        - $ref: '#/components/schemas/StopServerToolsWhenFinishReasonIs'
    ChatNamedToolChoice:
      description: Named tool choice for specific function
      example:
        function:
          name: get_weather
        type: function
      properties:
        function:
          properties:
            name:
              description: Function name to call
              example: get_weather
              type: string
          required:
            - name
          type: object
        type:
          enum:
            - function
          type: string
      required:
        - type
        - function
      type: object
    ChatServerToolChoice:
      description: >-
        OpenRouter extension: force a specific server tool by naming it directly
        in `tool_choice.type` instead of wrapping it in `{ type: "function",
        function: { name } }`.
      example:
        type: openrouter:web_search
      properties:
        type:
          description: >-
            OpenRouter server-tool type to force (e.g. `openrouter:web_search`,
            `web_search`, `web_search_preview`).
          example: openrouter:web_search
          type: string
      required:
        - type
      type: object
    ChatContentCacheControl:
      allOf:
        - $ref: '#/components/schemas/AnthropicCacheControlDirective'
        - properties: {}
          type: object
      description: >-
        Anthropic-style cache breakpoint for the content part. Interchangeable
        with the OpenAI-style `prompt_cache_breakpoint` marker: OpenRouter
        converts between the two based on the provider serving the request.
      example:
        ttl: 5m
        type: ephemeral
    AdvisorServerTool_OpenRouter:
      description: >-
        OpenRouter built-in server tool: consults a higher-intelligence advisor
        model (any OpenRouter model) for guidance mid-generation and returns its
        response. Include multiple entries to offer several named advisors; at
        most one entry may omit `name` to act as the default advisor.
      example:
        parameters:
          model: ~anthropic/claude-opus-latest
          name: reviewer
        type: openrouter:advisor
      properties:
        parameters:
          $ref: '#/components/schemas/AdvisorServerToolConfig'
        type:
          enum:
            - openrouter:advisor
          type: string
      required:
        - type
      type: object
    BashServerTool:
      description: >-
        OpenRouter built-in server tool: runs shell commands server-side in a
        sandboxed container
      example:
        parameters:
          environment:
            type: container_auto
        type: openrouter:bash
      properties:
        parameters:
          $ref: '#/components/schemas/BashServerToolConfig'
        type:
          enum:
            - openrouter:bash
          type: string
      required:
        - type
      type: object
    DatetimeServerTool:
      description: 'OpenRouter built-in server tool: returns the current date and time'
      example:
        parameters:
          timezone: America/New_York
        type: openrouter:datetime
      properties:
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolConfig'
        type:
          enum:
            - openrouter:datetime
          type: string
      required:
        - type
      type: object
    FilesServerTool:
      description: >-
        OpenRouter built-in server tool: read, write, edit, and list workspace
        files via the Files API. Requires an authenticated request; files come
        from the API key's workspace (or the default workspace for keys without
        one).
      example:
        parameters: {}
        type: openrouter:files
      properties:
        parameters:
          $ref: '#/components/schemas/FilesServerToolConfig'
        type:
          enum:
            - openrouter:files
          type: string
      required:
        - type
      type: object
    FusionServerTool_OpenRouter:
      description: >-
        OpenRouter built-in server tool: fans out the user prompt to a panel of
        analysis models, then asks an analyst model to summarize their
        collective output as structured JSON the outer model can synthesize
        from.
      example:
        parameters:
          analysis_models:
            - ~anthropic/claude-opus-latest
            - ~openai/gpt-latest
        type: openrouter:fusion
      properties:
        parameters:
          $ref: '#/components/schemas/FusionServerToolConfig'
        type:
          enum:
            - openrouter:fusion
          type: string
      required:
        - type
      type: object
    ImageGenerationServerTool_OpenRouter:
      description: >-
        OpenRouter built-in server tool: generates images from text prompts
        using an image generation model
      example:
        parameters:
          model: openai/gpt-5-image
          quality: high
          size: 1024x1024
        type: openrouter:image_generation
      properties:
        parameters:
          $ref: '#/components/schemas/ImageGenerationServerToolConfig'
        type:
          enum:
            - openrouter:image_generation
          type: string
      required:
        - type
      type: object
    ChatSearchModelsServerTool:
      description: >-
        OpenRouter built-in server tool: searches and filters AI models
        available on OpenRouter
      example:
        parameters:
          max_results: 5
        type: openrouter:experimental__search_models
      properties:
        parameters:
          $ref: '#/components/schemas/SearchModelsServerToolConfig'
        type:
          enum:
            - openrouter:experimental__search_models
          type: string
      required:
        - type
      type: object
    SubagentServerTool_OpenRouter:
      description: >-
        OpenRouter built-in server tool: delegates self-contained tasks to a
        smaller, cheaper, faster worker model (any OpenRouter model)
        mid-generation and returns its outcome. The worker may run as a
        sub-agent with its own tools.
      example:
        parameters:
          model: ~anthropic/claude-haiku-latest
        type: openrouter:subagent
      properties:
        parameters:
          $ref: '#/components/schemas/SubagentServerToolConfig'
        type:
          enum:
            - openrouter:subagent
          type: string
      required:
        - type
      type: object
    WebFetchServerTool:
      description: >-
        OpenRouter built-in server tool: fetches full content from a URL (web
        page or PDF)
      example:
        parameters:
          max_uses: 10
        type: openrouter:web_fetch
      properties:
        parameters:
          $ref: '#/components/schemas/WebFetchServerToolConfig'
        type:
          enum:
            - openrouter:web_fetch
          type: string
      required:
        - type
      type: object
    OpenRouterWebSearchServerTool:
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      example:
        parameters:
          max_results: 5
        type: openrouter:web_search
      properties:
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
        type:
          enum:
            - openrouter:web_search
          type: string
      required:
        - type
      type: object
    ChatWebSearchShorthand:
      description: >-
        Web search tool using OpenAI Responses API syntax. Automatically
        converted to openrouter:web_search.
      example:
        type: web_search_preview
      properties:
        allowed_domains:
          description: >-
            Limit search results to these domains. Supported by Exa, Firecrawl,
            Parallel, Perplexity, and most native providers (Anthropic, OpenAI,
            xAI). Cannot be used with excluded_domains.
          items:
            type: string
          type: array
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Firecrawl, Parallel, Perplexity, Anthropic, OpenAI, and xAI. Cannot
            be used with allowed_domains.
          items:
            type: string
          type: array
        max_characters:
          description: >-
            Exact maximum number of characters of content per search result.
            Applies to the Exa, Parallel, and Perplexity engines; ignored with
            native provider search and Firecrawl. For Exa, caps highlight
            content per result. For Parallel, caps excerpt content per result
            (default 1,500 when omitted). For Perplexity, maps to the native
            `max_tokens_per_page` parameter (converted from characters to
            tokens) and trims the response to the exact character cap. When both
            `max_characters` and `search_context_size` are set, `max_characters`
            takes precedence. When omitted, falls back to `search_context_size`
            mapping (Exa) or engine defaults (Parallel, Perplexity).
          example: 2000
          type: integer
        max_results:
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, Parallel, and Perplexity engines;
            ignored with native provider search. Perplexity supports a maximum
            of 20; values above 20 are clamped.
          example: 5
          type: integer
        max_total_results:
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops. Defaults to 50 when not specified.
          example: 50
          type: integer
        max_uses:
          description: >-
            Maximum number of web searches the model may perform in a single
            request. Once reached, further search calls return an error result
            instead of executing. Applies to the Exa, Firecrawl, Parallel, and
            Perplexity engines. With native provider search, forwarded only to
            Anthropic (as `max_uses`); other native search providers have no
            equivalent parameter and ignore it.
          example: 3
          type: integer
        mode:
          $ref: '#/components/schemas/WebSearchMode'
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        type:
          enum:
            - web_search
            - web_search_preview
            - web_search_preview_2025_03_11
            - web_search_2025_08_26
          type: string
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
      required:
        - type
      type: object
    Preset:
      description: A preset without version details.
      example:
        created_at: '2026-04-20T10:00:00Z'
        creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
        description: null
        designated_version_id: 550e8400-e29b-41d4-a716-446655440000
        id: 650e8400-e29b-41d4-a716-446655440001
        name: my-preset
        slug: my-preset
        status: active
        status_updated_at: null
        updated_at: '2026-04-20T10:00:00Z'
        workspace_id: 750e8400-e29b-41d4-a716-446655440002
      properties:
        created_at:
          type: string
        creator_user_id:
          type:
            - string
            - 'null'
        description:
          type:
            - string
            - 'null'
        designated_version_id:
          type:
            - string
            - 'null'
        id:
          type: string
        name:
          type: string
        slug:
          type: string
        status:
          $ref: '#/components/schemas/PresetStatus'
        status_updated_at:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        workspace_id:
          type:
            - string
            - 'null'
      required:
        - id
        - creator_user_id
        - workspace_id
        - name
        - slug
        - description
        - status
        - designated_version_id
        - created_at
        - updated_at
        - status_updated_at
      type: object
    PresetDesignatedVersion:
      description: >-
        A specific version of a preset, containing config and optional system
        prompt.
      example:
        config:
          model: openai/gpt-4o
          temperature: 0.7
        created_at: '2026-04-20T10:00:00Z'
        creator_id: user_2dHFtVWx2n56w6HkM0000000000
        id: 550e8400-e29b-41d4-a716-446655440000
        preset_id: 650e8400-e29b-41d4-a716-446655440001
        system_prompt: You are a helpful assistant.
        updated_at: '2026-04-20T10:00:00Z'
        version: 1
      properties:
        config:
          additionalProperties: {}
          type: object
        created_at:
          type: string
        creator_id:
          type: string
        id:
          type: string
        preset_id:
          type: string
        system_prompt:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        version:
          type: integer
      required:
        - id
        - preset_id
        - creator_id
        - version
        - system_prompt
        - config
        - created_at
        - updated_at
      type:
        - object
        - 'null'
    ChatAudioOutput:
      description: Audio output data or reference
      example:
        data: UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1f
        expires_at: 1677652400
        id: audio_abc123
        transcript: Hello! How can I help you today?
      properties:
        data:
          description: Base64 encoded audio data
          type: string
        expires_at:
          description: Audio expiration timestamp
          type: integer
        id:
          description: Audio output identifier
          type: string
        transcript:
          description: Audio transcript
          type: string
      type: object
    ChatContentItems:
      description: Content part for chat completion messages
      discriminator:
        mapping:
          file:
            $ref: '#/components/schemas/ChatContentFile'
          image_url:
            $ref: '#/components/schemas/ChatContentImage'
          input_audio:
            $ref: '#/components/schemas/ChatContentAudio'
          input_video:
            $ref: '#/components/schemas/Legacy_ChatContentVideo'
          text:
            $ref: '#/components/schemas/ChatContentText'
          video_url:
            $ref: '#/components/schemas/ChatContentVideo'
        propertyName: type
      example:
        text: Hello, world!
        type: text
      oneOf:
        - $ref: '#/components/schemas/ChatContentText'
        - $ref: '#/components/schemas/ChatContentImage'
        - $ref: '#/components/schemas/ChatContentAudio'
        - $ref: '#/components/schemas/Legacy_ChatContentVideo'
        - $ref: '#/components/schemas/ChatContentVideo'
        - $ref: '#/components/schemas/ChatContentFile'
    ChatAssistantImages:
      description: Generated images from image generation models
      example:
        - image_url:
            url: data:image/png;base64,iVBORw0KGgo...
      items:
        properties:
          image_url:
            properties:
              url:
                description: URL or base64-encoded data of the generated image
                type: string
            required:
              - url
            type: object
        required:
          - image_url
        type: object
      type: array
    ChatReasoningDetails:
      description: Reasoning details for extended thinking models
      example:
        - text: Let me work through this step by step...
          type: reasoning.text
      items:
        $ref: '#/components/schemas/ReasoningDetailUnion'
      type: array
    ChatToolCall:
      description: Tool call made by the assistant
      example:
        function:
          arguments: '{"location": "Boston, MA"}'
          name: get_current_weather
        id: call_abc123
        type: function
      properties:
        function:
          properties:
            arguments:
              description: Function arguments as JSON string
              type: string
            name:
              description: Function name to call
              type: string
          required:
            - name
            - arguments
          type: object
        id:
          description: Tool call identifier
          type: string
        type:
          enum:
            - function
          type: string
      required:
        - id
        - type
        - function
      type: object
    ChatContentText:
      description: Text content part
      example:
        text: Hello, world!
        type: text
      properties:
        cache_control:
          $ref: '#/components/schemas/ChatContentCacheControl'
        prompt_cache_breakpoint:
          $ref: '#/components/schemas/PromptCacheBreakpoint'
        text:
          type: string
        type:
          enum:
            - text
          type: string
      required:
        - type
        - text
      type: object
    ConfigurationUpdateReasoning:
      additionalProperties: false
      description: Reasoning settings applied from this point in the conversation onward
      example:
        effort: low
      properties:
        effort:
          description: Reasoning effort to apply from this point in the conversation onward
          enum:
            - max
            - xhigh
            - high
            - medium
            - low
            - minimal
            - none
          example: low
          type: string
      required:
        - effort
      type: object
    PDFParserEngine:
      anyOf:
        - enum:
            - mistral-ocr
            - native
            - cloudflare-ai
          type: string
        - enum:
            - pdf-text
          type: string
      description: >-
        The engine to use for parsing PDF files. "pdf-text" is deprecated and
        automatically redirected to "cloudflare-ai".
      example: cloudflare-ai
    PercentileLatencyCutoffs:
      description: >-
        Percentile-based latency cutoffs. All specified cutoffs must be met for
        an endpoint to be preferred.
      example:
        p50: 5
        p90: 10
      properties:
        p50:
          description: Maximum p50 latency (seconds)
          format: double
          type:
            - number
            - 'null'
        p75:
          description: Maximum p75 latency (seconds)
          format: double
          type:
            - number
            - 'null'
        p90:
          description: Maximum p90 latency (seconds)
          format: double
          type:
            - number
            - 'null'
        p99:
          description: Maximum p99 latency (seconds)
          format: double
          type:
            - number
            - 'null'
      type: object
    PercentileThroughputCutoffs:
      description: >-
        Percentile-based throughput cutoffs. All specified cutoffs must be met
        for an endpoint to be preferred.
      example:
        p50: 100
        p90: 50
      properties:
        p50:
          description: Minimum p50 throughput (tokens/sec)
          format: double
          type:
            - number
            - 'null'
        p75:
          description: Minimum p75 throughput (tokens/sec)
          format: double
          type:
            - number
            - 'null'
        p90:
          description: Minimum p90 throughput (tokens/sec)
          format: double
          type:
            - number
            - 'null'
        p99:
          description: Minimum p99 throughput (tokens/sec)
          format: double
          type:
            - number
            - 'null'
      type: object
    StopServerToolsWhenFinishReasonIs:
      description: Stop when the upstream model emits this finish reason (e.g. `length`).
      example:
        reason: length
        type: finish_reason_is
      properties:
        reason:
          minLength: 1
          type: string
        type:
          enum:
            - finish_reason_is
          type: string
      required:
        - type
        - reason
      type: object
    StopServerToolsWhenHasToolCall:
      description: Stop after a tool with this name has been called.
      example:
        tool_name: finalize
        type: has_tool_call
      properties:
        tool_name:
          minLength: 1
          type: string
        type:
          enum:
            - has_tool_call
          type: string
      required:
        - type
        - tool_name
      type: object
    StopServerToolsWhenMaxCost:
      description: Stop once cumulative cost across the loop exceeds this dollar threshold.
      example:
        max_cost_in_dollars: 0.5
        type: max_cost
      properties:
        max_cost_in_dollars:
          format: double
          type: number
        type:
          enum:
            - max_cost
          type: string
      required:
        - type
        - max_cost_in_dollars
      type: object
    StopServerToolsWhenMaxTokensUsed:
      description: Stop once cumulative token usage across the loop exceeds this threshold.
      example:
        max_tokens: 10000
        type: max_tokens_used
      properties:
        max_tokens:
          type: integer
        type:
          enum:
            - max_tokens_used
          type: string
      required:
        - type
        - max_tokens
      type: object
    StopServerToolsWhenStepCountIs:
      description: Stop after the agent loop has executed this many steps.
      example:
        step_count: 5
        type: step_count_is
      properties:
        step_count:
          type: integer
        type:
          enum:
            - step_count_is
          type: string
      required:
        - type
        - step_count
      type: object
    AdvisorServerToolConfig:
      description: Configuration for one openrouter:advisor server tool entry.
      example:
        model: ~anthropic/claude-opus-latest
        name: reviewer
      properties:
        forward_transcript:
          description: >-
            When true, the full parent conversation is forwarded to the advisor
            so it sees the same context the executor does (and the tool-call
            `prompt`, if given, is appended as a final user turn). When false or
            omitted, the advisor receives only the `prompt` the executor passes
            in the tool call.
          example: false
          type: boolean
        instructions:
          description: >-
            System instructions for the advisor sub-agent. When omitted, the
            advisor responds with no system prompt of its own.
          example: You are a senior staff engineer. Give a focused, decisive plan.
          type: string
        max_completion_tokens:
          description: >-
            Maximum number of output tokens (including reasoning) the advisor
            may produce. When omitted, the provider's default applies.
          example: 2048
          type: integer
        model:
          description: >-
            Slug of the advisor model to consult (any OpenRouter model). When
            omitted, the executor can choose it via the tool call's `model`
            argument; if neither is set, the model from the outer API request is
            used.
          example: ~anthropic/claude-opus-latest
          type: string
        name:
          description: >-
            Optional name for this advisor. The model sees one tool per named
            advisor (and one default for an unnamed entry). Names must be unique
            across advisor entries. Letters, digits, spaces, underscores, and
            dashes; trimmed; 1–64 chars.
          example: reviewer
          maxLength: 64
          minLength: 1
          pattern: ^[a-zA-Z0-9 _-]+$
          type: string
        reasoning:
          $ref: '#/components/schemas/AdvisorReasoning'
        stream:
          description: >-
            When true, the advisor's advice streams incrementally as it is
            produced. In the Responses API this emits
            `response.output_text.delta` events targeting the advisor output
            item; the final `advice` field is still set on the completed item.
            Has no effect on the Chat Completions API (where the advice arrives
            only as the final tool result). When false or omitted, the advice
            arrives only as the final result.
          example: false
          type: boolean
        temperature:
          description: >-
            Sampling temperature forwarded to the advisor call. When omitted,
            the provider's default applies.
          example: 0.7
          format: double
          type: number
      type: object
    BashServerToolConfig:
      description: Configuration for the openrouter:bash server tool
      example:
        environment:
          type: container_auto
      properties:
        engine:
          $ref: '#/components/schemas/BashServerToolEngine'
        environment:
          $ref: '#/components/schemas/BashServerToolEnvironment'
        sleep_after_seconds:
          $ref: '#/components/schemas/SandboxSleepAfterSeconds'
      type: object
    DatetimeServerToolConfig:
      description: Configuration for the openrouter:datetime server tool
      example:
        timezone: America/New_York
      properties:
        timezone:
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
          example: America/New_York
          type: string
      type: object
    FilesServerToolConfig:
      description: Configuration for the openrouter:files server tool
      example: {}
      properties: {}
      type: object
    FusionServerToolConfig:
      description: Configuration for the openrouter:fusion server tool.
      example:
        analysis_models:
          - ~anthropic/claude-opus-latest
          - ~openai/gpt-latest
          - ~google/gemini-pro-latest
      properties:
        analysis_models:
          description: >-
            Slugs of models to run in parallel as the analysis panel. Each model
            receives the user prompt with openrouter:web_search and
            openrouter:web_fetch enabled, then an analyst model summarizes the
            collective output into structured analysis JSON. Capped at 8 models
            to bound cost amplification. Defaults to the Quality preset from
            /labs/fusion.
          example:
            - ~anthropic/claude-opus-latest
            - ~openai/gpt-latest
            - ~google/gemini-pro-latest
          items:
            type: string
          maxItems: 8
          minItems: 1
          type: array
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        max_completion_tokens:
          description: >-
            Maximum number of output tokens (including reasoning tokens) each
            panelist and the analyst model may produce per inner call. Controls
            the total output budget so reasoning-heavy models like GPT-5.5 do
            not exhaust their token allowance before producing visible text.
            Defaults to 16000 when omitted.
          example: 16384
          type: integer
        max_tool_calls:
          description: >-
            Maximum number of tool-calling steps each panelist (analysis model)
            and the analyst model may take during their agentic web-research
            loop. Models with web_search/web_fetch enabled iterate until they
            produce a text response or hit this ceiling. Defaults to 4. Capped
            at 16.
          example: 12
          maximum: 16
          minimum: 1
          type: integer
        model:
          description: >-
            Slug of the analyst model that produces the structured analysis
            JSON. Defaults to the model used in the outer API request.
          example: ~anthropic/claude-opus-latest
          type: string
        reasoning:
          description: >-
            Reasoning configuration forwarded to panelist and analyst inner
            calls. Use this to control reasoning effort and token budget for
            models that support extended thinking.
          properties:
            effort:
              description: Reasoning effort level for panelist and analyst inner calls.
              enum:
                - max
                - xhigh
                - high
                - medium
                - low
                - minimal
                - none
              type: string
            max_tokens:
              description: >-
                Maximum number of reasoning tokens each panelist and analyst
                model may use. Helps bound cost when models allocate too much
                budget to chain-of-thought.
              type: integer
          type: object
        temperature:
          description: >-
            Temperature forwarded to panelist inner calls. The analyst always
            runs at temperature 0 regardless of this value. When omitted, the
            provider's default applies.
          example: 0.7
          format: double
          type: number
        tools:
          description: >-
            Server tools available to panelist and analyst inner calls. Each
            entry uses the same `{ type, parameters? }` shorthand as the outer
            Chat Completions request. When omitted, defaults to `[{ type:
            "openrouter:web_search" }, { type: "openrouter:web_fetch" }]`. Pass
            an empty array to disable tools entirely (panelists answer from
            parametric knowledge only).
          example:
            - parameters:
                excluded_domains:
                  - example.com
              type: openrouter:web_search
            - type: openrouter:web_fetch
          items:
            properties:
              parameters:
                additionalProperties: {}
                description: >-
                  Optional configuration forwarded as the tool's `parameters`
                  object.
                type: object
              type:
                description: >-
                  Server tool type identifier (e.g. "openrouter:web_search",
                  "openrouter:web_fetch").
                type: string
            required:
              - type
            type: object
          maxItems: 8
          type: array
      type: object
    ImageGenerationServerToolConfig:
      additionalProperties:
        anyOf:
          - type: string
          - format: double
            type: number
          - items: {}
            type: array
      description: >-
        Configuration for the openrouter:image_generation server tool. Accepts
        all image_config params (aspect_ratio, quality, size, background,
        output_format, output_compression, moderation, etc.) plus a model field.
      example:
        aspect_ratio: '16:9'
        model: openai/gpt-5-image
        quality: high
      properties:
        model:
          description: >-
            Which image generation model to use (e.g. "openai/gpt-5-image").
            Defaults to "openai/gpt-5-image".
          example: openai/gpt-5-image
          type: string
      type: object
    SearchModelsServerToolConfig:
      description: Configuration for the openrouter:experimental__search_models server tool
      example:
        max_results: 5
      properties:
        max_results:
          description: Maximum number of models to return. Defaults to 5, max 20.
          example: 5
          type: integer
      type: object
    SubagentServerToolConfig:
      description: Configuration for one openrouter:subagent server tool entry.
      example:
        model: ~anthropic/claude-haiku-latest
        name: summarizer
      properties:
        inherit_functions:
          description: >-
            EXPERIMENTAL — subject to change without notice. When true, the
            subagent inherits every client function defined in the request's
            top-level `tools` list. Supported on the Responses API
            (`/api/v1/responses`) only; other APIs reject it with a `400`.
          example: true
          type: boolean
        inherited_function_names:
          description: >-
            EXPERIMENTAL — subject to change without notice. Names of the
            top-level function tools that the subagent will inherit. Any tool
            that matches by name will be copied fully into the tools array of
            the subagent. When `inherit_functions` is `true`, this list does
            nothing, because every client function will be inherited by default.
            Names are trimmed before validation, so a whitespace-only name is
            rejected with a `400`. Supported on the Responses API
            (`/api/v1/responses`) only; other APIs reject it with a `400`.
          example:
            - lookup_order
          items:
            minLength: 1
            type: string
          type: array
        instructions:
          description: >-
            System instructions for the subagent. When omitted, the subagent
            responds with no system prompt of its own.
          example: >-
            You are a fast, focused worker. Complete the task exactly as
            described.
          type: string
        max_completion_tokens:
          description: >-
            Maximum number of output tokens (including reasoning) the subagent
            may produce. When omitted, the provider's default applies.
          example: 2048
          type: integer
        max_tool_calls:
          description: >-
            Maximum number of tool-calling steps the subagent may take during
            its agentic loop. Capped at 25. Only relevant when the subagent is
            given tools. Forwarded to the subagent call as `max_tool_calls`.
          example: 5
          maximum: 25
          minimum: 1
          type: integer
        model:
          description: >-
            Slug of the model that executes delegated tasks (any OpenRouter
            model). Typically a smaller, cheaper, faster model than the one
            delegating. When omitted, the model from the outer API request is
            used. The subagent tool itself cannot be the subagent model.
          example: ~anthropic/claude-haiku-latest
          type: string
        name:
          description: >-
            Optional name for this subagent. The model sees one tool per named
            subagent (and one default for an unnamed entry). Names must be
            unique across subagent entries. Letters, digits, spaces,
            underscores, and dashes; trimmed; 1–64 chars.
          example: summarizer
          maxLength: 64
          minLength: 1
          pattern: ^[a-zA-Z0-9 _-]+$
          type: string
        reasoning:
          $ref: '#/components/schemas/SubagentReasoning'
        temperature:
          description: >-
            Sampling temperature forwarded to the subagent call. When omitted,
            the provider's default applies.
          example: 0.7
          format: double
          type: number
        tools:
          description: >-
            Tools the subagent may use while executing a delegated task. The
            subagent runs as an agentic sub-agent over these tools, then returns
            its outcome. Only OpenRouter server tools are supported — function
            tools are rejected — and the list must not include the subagent tool
            itself.
          items:
            $ref: '#/components/schemas/SubagentNestedTool'
          type: array
      type: object
    WebFetchServerToolConfig:
      description: Configuration for the openrouter:web_fetch server tool
      example:
        max_content_tokens: 100000
        max_uses: 10
      properties:
        allowed_domains:
          description: Only fetch from these domains.
          items:
            type: string
          type: array
        blocked_domains:
          description: Never fetch from these domains.
          items:
            type: string
          type: array
        engine:
          $ref: '#/components/schemas/WebFetchEngineEnum'
        max_content_tokens:
          description: >-
            Maximum content length in approximate tokens. Content exceeding this
            limit is truncated.
          example: 100000
          type: integer
        max_uses:
          description: >-
            Maximum number of web fetches per request. Once exceeded, the tool
            returns an error.
          example: 10
          type: integer
      type: object
    WebSearchConfig:
      example:
        max_results: 5
        search_context_size: medium
      properties:
        allowed_domains:
          description: >-
            Limit search results to these domains. Supported by Exa, Firecrawl,
            Parallel, Perplexity, and most native providers (Anthropic, OpenAI,
            xAI). Cannot be used with excluded_domains.
          items:
            type: string
          type: array
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Firecrawl, Parallel, Perplexity, Anthropic, OpenAI, and xAI. Cannot
            be used with allowed_domains.
          items:
            type: string
          type: array
        max_characters:
          description: >-
            Exact maximum number of characters of content per search result.
            Applies to the Exa, Parallel, and Perplexity engines; ignored with
            native provider search and Firecrawl. For Exa, caps highlight
            content per result. For Parallel, caps excerpt content per result
            (default 1,500 when omitted). For Perplexity, maps to the native
            `max_tokens_per_page` parameter (converted from characters to
            tokens) and trims the response to the exact character cap. When both
            `max_characters` and `search_context_size` are set, `max_characters`
            takes precedence. When omitted, falls back to `search_context_size`
            mapping (Exa) or engine defaults (Parallel, Perplexity).
          example: 2000
          type: integer
        max_results:
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, Parallel, and Perplexity engines;
            ignored with native provider search. Perplexity supports a maximum
            of 20; values above 20 are clamped.
          example: 5
          type: integer
        max_total_results:
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops. Defaults to 50 when not specified.
          example: 50
          type: integer
        max_uses:
          description: >-
            Maximum number of web searches the model may perform in a single
            request. Once reached, further search calls return an error result
            instead of executing. Applies to the Exa, Firecrawl, Parallel, and
            Perplexity engines. With native provider search, forwarded only to
            Anthropic (as `max_uses`); other native search providers have no
            equivalent parameter and ignore it.
          example: 3
          type: integer
        mode:
          $ref: '#/components/schemas/WebSearchMode'
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
      type: object
    WebSearchEngineEnum:
      description: >-
        Which search engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl
        (requires BYOK). "parallel" uses the Parallel search API. "perplexity"
        uses the Perplexity Search API (raw ranked results).
      enum:
        - native
        - exa
        - parallel
        - firecrawl
        - perplexity
        - auto
      example: auto
      type: string
    SearchQualityLevel:
      description: >-
        How much context to retrieve per result. Applies to Exa, Parallel, and
        Perplexity engines; ignored with native provider search and Firecrawl.
        For Exa, pins a fixed per-result character cap (low=5,000,
        medium=15,000, high=30,000); when omitted, Exa picks an adaptive size
        per query and document (typically ~2,000–4,000 characters per result).
        For Parallel, controls the total characters across all results; when
        omitted, Parallel uses its own default size. For Perplexity, maps
        directly to the Search API's native search_context_size parameter.
        Overridden by `max_characters` when both are set.
      enum:
        - low
        - medium
        - high
      example: medium
      type: string
    WebSearchUserLocationServerTool:
      description: Approximate user location for location-biased results.
      example:
        city: San Francisco
        country: US
        region: California
        timezone: America/Los_Angeles
        type: approximate
      properties:
        city:
          type:
            - string
            - 'null'
        country:
          type:
            - string
            - 'null'
        region:
          type:
            - string
            - 'null'
        timezone:
          type:
            - string
            - 'null'
        type:
          enum:
            - approximate
          type: string
      type: object
    PresetStatus:
      description: The status of a preset.
      enum:
        - active
        - disabled
        - archived
      example: active
      type: string
    ChatContentFile:
      description: File content part for document processing
      example:
        file:
          file_data: https://example.com/document.pdf
          filename: document.pdf
        type: file
      properties:
        file:
          properties:
            file_data:
              description: File content as base64 data URL or URL
              type: string
            file_id:
              description: File ID for previously uploaded files
              type: string
            filename:
              description: Original filename
              type: string
          type: object
        type:
          enum:
            - file
          type: string
      required:
        - type
        - file
      type: object
    ChatContentImage:
      description: Image content part for vision models
      example:
        image_url:
          detail: auto
          url: https://example.com/image.jpg
        type: image_url
      properties:
        image_url:
          properties:
            detail:
              description: >-
                Image detail level for vision models. `original` is an
                OpenRouter extension (not in the OpenAI Chat Completions spec)
                requesting true original-resolution media; it is downgraded to
                `high` for providers that lack an original-resolution tier.
              enum:
                - auto
                - low
                - high
                - original
              type: string
            url:
              description: 'URL of the image (data: URLs supported)'
              type: string
          required:
            - url
          type: object
        type:
          enum:
            - image_url
          type: string
      required:
        - type
        - image_url
      type: object
    ChatContentAudio:
      description: Audio input content part. Supported audio formats vary by provider.
      example:
        input_audio:
          data: SGVsbG8gV29ybGQ=
          format: wav
        type: input_audio
      properties:
        input_audio:
          properties:
            data:
              description: Base64 encoded audio data
              type: string
            format:
              description: >-
                Audio format (e.g., wav, mp3, flac, m4a, ogg, aiff, aac, pcm16,
                pcm24). Supported formats vary by provider.
              type: string
          required:
            - data
            - format
          type: object
        type:
          enum:
            - input_audio
          type: string
      required:
        - type
        - input_audio
      type: object
    Legacy_ChatContentVideo:
      deprecated: true
      description: Video input content part (legacy format - deprecated)
      example:
        type: input_video
        video_url:
          url: https://example.com/video.mp4
      properties:
        type:
          enum:
            - input_video
          type: string
        video_url:
          $ref: '#/components/schemas/Legacy_ChatContentVideoInput'
      required:
        - type
        - video_url
      type: object
    ChatContentVideo:
      description: Video input content part
      example:
        type: video_url
        video_url:
          url: https://example.com/video.mp4
      properties:
        type:
          enum:
            - video_url
          type: string
        video_url:
          $ref: '#/components/schemas/ChatContentVideoInput'
      required:
        - type
        - video_url
      type: object
    ReasoningDetailUnion:
      description: Reasoning detail union schema
      discriminator:
        mapping:
          reasoning.encrypted:
            $ref: '#/components/schemas/ReasoningDetailEncrypted'
          reasoning.server_tool_call:
            $ref: '#/components/schemas/ReasoningDetailServerToolCall'
          reasoning.summary:
            $ref: '#/components/schemas/ReasoningDetailSummary'
          reasoning.text:
            $ref: '#/components/schemas/ReasoningDetailText'
        propertyName: type
      example:
        summary: >-
          The model analyzed the problem by first identifying key constraints,
          then evaluating possible solutions...
        type: reasoning.summary
      oneOf:
        - $ref: '#/components/schemas/ReasoningDetailSummary'
        - $ref: '#/components/schemas/ReasoningDetailEncrypted'
        - $ref: '#/components/schemas/ReasoningDetailText'
        - $ref: '#/components/schemas/ReasoningDetailServerToolCall'
    PromptCacheBreakpoint:
      description: >-
        Marks an explicit prompt-cache boundary on this content block
        (OpenAI-style). Everything through the block carrying this marker is
        part of the candidate cached prefix. Supported natively by OpenAI
        GPT-5.6 and newer; on providers that use Anthropic-style
        `cache_control`, OpenRouter converts the marker to that format
        automatically.
      example:
        mode: explicit
      properties:
        mode:
          enum:
            - explicit
          type: string
      required:
        - mode
      type:
        - object
        - 'null'
    AdvisorReasoning:
      description: >-
        Reasoning configuration forwarded to the advisor call. Use this to
        control reasoning effort and token budget for models that support
        extended thinking.
      example:
        effort: high
      properties:
        effort:
          description: Reasoning effort level for the advisor call.
          enum:
            - max
            - xhigh
            - high
            - medium
            - low
            - minimal
            - none
          type: string
        max_tokens:
          description: Maximum number of reasoning tokens the advisor may use.
          type: integer
      type: object
    BashServerToolEngine:
      description: >-
        Which bash engine to use. "openrouter" runs commands server-side in the
        OpenRouter sandbox. "auto" (default) and "native" use native
        passthrough, returning the tool call to your application to run
        client-side; OpenRouter does not execute the commands.
      enum:
        - auto
        - native
        - openrouter
      example: auto
      type: string
    BashServerToolEnvironment:
      description: Execution environment for the bash server tool.
      discriminator:
        mapping:
          container_auto:
            $ref: '#/components/schemas/ContainerAutoEnvironment'
          container_reference:
            $ref: '#/components/schemas/ContainerReferenceEnvironment'
        propertyName: type
      example:
        type: container_auto
      oneOf:
        - $ref: '#/components/schemas/ContainerAutoEnvironment'
        - $ref: '#/components/schemas/ContainerReferenceEnvironment'
    SandboxSleepAfterSeconds:
      description: >-
        How long (in seconds) the container stays warm after its last command
        before sleeping, freeing its capacity slot. Idle-based: each command
        renews the timer. Defaults to 300 (5 minutes); capped at 14400 (4
        hours).
      example: 300
      type: integer
    SubagentReasoning:
      description: >-
        Reasoning configuration forwarded to the subagent call. Use this to
        control reasoning effort and token budget for models that support
        extended thinking.
      example:
        effort: low
      properties:
        effort:
          description: Reasoning effort level for the subagent call.
          enum:
            - max
            - xhigh
            - high
            - medium
            - low
            - minimal
            - none
          type: string
        max_tokens:
          description: >-
            Maximum number of reasoning tokens the subagent may use. Forwarded
            to the subagent call as `reasoning.max_tokens`.
          type: integer
      type: object
    SubagentNestedTool:
      additionalProperties: {}
      description: >-
        A tool made available to the subagent. Only OpenRouter server tools
        (e.g. openrouter:web_search) are supported; function tools are rejected
        because the worker has no way to execute them. The subagent tool may not
        list itself.
      example:
        type: openrouter:web_search
      properties:
        parameters:
          additionalProperties: {}
          type: object
        type:
          type: string
      required:
        - type
      type: object
    WebFetchEngineEnum:
      description: >-
        Which fetch engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        fetch. "exa" uses Exa Contents API. "openrouter" uses direct HTTP fetch.
        "firecrawl" uses Firecrawl scrape (requires BYOK). "parallel" uses the
        Parallel extract API.
      enum:
        - auto
        - native
        - openrouter
        - exa
        - parallel
        - firecrawl
      example: auto
      type: string
    Legacy_ChatContentVideoInput:
      description: Video input object
      example:
        url: https://example.com/video.mp4
      properties:
        processing:
          description: >-
            Video processing mode. `agentic` enables agentic video processing
            and `static` forces fixed-rate frame sampling on providers that
            support it (currently Google Gemini).
          enum:
            - agentic
            - static
          example: agentic
          type: string
        url:
          description: 'URL of the video (data: URLs supported)'
          type: string
      required:
        - url
      type: object
    ChatContentVideoInput:
      description: Video input object
      example:
        url: https://example.com/video.mp4
      properties:
        processing:
          description: >-
            Video processing mode. `agentic` enables agentic video processing
            and `static` forces fixed-rate frame sampling on providers that
            support it (currently Google Gemini).
          enum:
            - agentic
            - static
          example: agentic
          type: string
        url:
          description: 'URL of the video (data: URLs supported)'
          type: string
      required:
        - url
      type: object
    ReasoningDetailEncrypted:
      description: Reasoning detail encrypted schema
      example:
        data: encrypted data
        type: reasoning.encrypted
      properties:
        data:
          type: string
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        id:
          type:
            - string
            - 'null'
        index:
          type: integer
        type:
          enum:
            - reasoning.encrypted
          type: string
      required:
        - type
        - data
      type: object
    ReasoningDetailServerToolCall:
      description: >-
        Record of an OpenRouter server-tool invocation (e.g. openrouter:fusion),
        carried in reasoning_details so a prior tool call can be rehydrated into
        a later turn of the same conversation.
      example:
        arguments: '{"prompt":"Compare carbon tax proposals"}'
        result: '{"status":"ok","models":["openai/gpt-4o"]}'
        tool_call_id: call_abc123
        tool_name: openrouter:fusion
        type: reasoning.server_tool_call
      properties:
        arguments:
          type: string
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        id:
          type:
            - string
            - 'null'
        index:
          type: integer
        result:
          type: string
        tool_call_id:
          type:
            - string
            - 'null'
        tool_name:
          type: string
        type:
          enum:
            - reasoning.server_tool_call
          type: string
      required:
        - type
        - tool_name
        - arguments
        - result
      type: object
    ReasoningDetailSummary:
      description: Reasoning detail summary schema
      example:
        summary: >-
          The model analyzed the problem by first identifying key constraints,
          then evaluating possible solutions...
        type: reasoning.summary
      properties:
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        id:
          type:
            - string
            - 'null'
        index:
          type: integer
        summary:
          type: string
        type:
          enum:
            - reasoning.summary
          type: string
      required:
        - type
        - summary
      type: object
    ReasoningDetailText:
      description: Reasoning detail text schema
      example:
        signature: signature
        text: >-
          The model analyzed the problem by first identifying key constraints,
          then evaluating possible solutions...
        type: reasoning.text
      properties:
        format:
          $ref: '#/components/schemas/ReasoningFormat'
        id:
          type:
            - string
            - 'null'
        index:
          type: integer
        signature:
          type:
            - string
            - 'null'
        text:
          type:
            - string
            - 'null'
        type:
          enum:
            - reasoning.text
          type: string
      required:
        - type
      type: object
    ContainerAutoEnvironment:
      description: An OpenRouter-managed, auto-provisioned ephemeral container.
      example:
        type: container_auto
      properties:
        file_ids:
          $ref: '#/components/schemas/ContainerFileIds'
        network_policy:
          $ref: '#/components/schemas/ContainerNetworkPolicy'
        type:
          enum:
            - container_auto
          type: string
      required:
        - type
      type: object
    ContainerReferenceEnvironment:
      description: >-
        Reference to a container by its canonical id — a previously returned
        container_id or a fresh name to create a persistent container.
      example:
        container_id: sess_abc123
        type: container_reference
      properties:
        container_id:
          description: >-
            Canonical container id to reuse (max 40 characters,
            letters/digits/underscores/hyphens). Any container_id previously
            returned by a bash or shell tool result works here and reattaches to
            the same container and files — including session-derived ids
            (sess_...) and generation-derived ids (gen_...). Note that a
            session-derived id is always sess_ + the sanitized session key,
            which is not necessarily the raw session id you sent. Using the same
            container_id from both the bash and shell tools shares the same
            files, with last-write-wins when both flush concurrently. A fresh
            name creates a new persistent container. Containers are always
            scoped to your account and workspace.
          example: sess_abc123
          maxLength: 40
          minLength: 1
          pattern: ^[\w-]+$
          type: string
        file_ids:
          $ref: '#/components/schemas/ContainerFileIds'
        network_policy:
          $ref: '#/components/schemas/ContainerNetworkPolicy'
        type:
          enum:
            - container_reference
          type: string
      required:
        - type
        - container_id
      type: object
    ReasoningFormat:
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - bedrock-openai-responses-v1
        - bedrock-xai-responses-v1
        - xai-responses-v1
        - meta-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
        - null
      example: unknown
      type:
        - string
        - 'null'
    ContainerFileIds:
      description: >-
        Workspace file ids (or_file_…) to attach into the container before the
        first command runs. Each file is copied to the container home as a
        writable copy named {last 8 characters of the file id}-{base filename}
        (a file stored as data/report.csv with id or_file_…NR6q4V8w attaches to
        ~/NR6q4V8w-report.csv), so same-named files never collide; the source
        document is never modified. Unknown, foreign, or malformed ids fail the
        request with a 400 before any command executes. Max 20 ids.
      example:
        - or_file_011CNha8iCJcU1wXNR6q4V8w
      items:
        minLength: 1
        type: string
      maxItems: 20
      type: array
    ContainerNetworkPolicy:
      anyOf:
        - properties:
            type:
              description: No outbound internet access.
              enum:
                - disabled
              type: string
          required:
            - type
          type: object
        - properties:
            allowed_domains:
              description: >-
                Hostnames the container may reach over ports 80/443 (max 50).
                Entries are lowercase hostnames or glob patterns where * matches
                any run of characters (e.g. *.example.com). An exact hostname
                does not cover its subdomains — use a glob or list each
                hostname. pip needs both pypi.org and files.pythonhosted.org (or
                *.pythonhosted.org).
              example:
                - pypi.org
                - files.pythonhosted.org
              items:
                maxLength: 253
                minLength: 1
                pattern: >-
                  ^[a-z0-9*]([a-z0-9*-]{0,61}[a-z0-9*])?(\.[a-z0-9*]([a-z0-9*-]{0,61}[a-z0-9*])?)*$
                type: string
              maxItems: 50
              minItems: 1
              type: array
            type:
              description: Outbound access restricted to the listed domains.
              enum:
                - allowlist
              type: string
          required:
            - type
            - allowed_domains
          type: object
      description: >-
        Network egress policy for the container. "disabled" blocks all outbound
        internet; "allowlist" permits only hosts matching the listed hostnames
        or * glob patterns (ports 80/443, DNS via Cloudflare resolvers). The
        policy is fixed when a container starts: sending a different policy to a
        warm container fails the request with a 409. Omitted: defaults to
        "disabled" (no outbound internet). For unrestricted egress, use an
        allowlist of ["*"].
      example:
        allowed_domains:
          - pypi.org
          - files.pythonhosted.org
        type: allowlist
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````