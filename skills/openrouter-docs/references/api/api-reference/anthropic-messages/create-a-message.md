> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a message

> Creates a message using the Anthropic Messages API format. Supports text, images, PDFs, tools, and extended thinking.



## OpenAPI

````yaml /openapi/openapi.yaml post /messages
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
  - description: Credit management endpoints
    name: Credits
  - description: Datasets endpoints
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
  - description: beta.Analytics endpoints
    name: beta.Analytics
  - description: beta.responses endpoints
    name: beta.responses
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /messages:
    post:
      tags:
        - Anthropic Messages
      summary: Create a message
      description: >-
        Creates a message using the Anthropic Messages API format. Supports
        text, images, PDFs, tools, and extended thinking.
      operationId: createMessages
      parameters:
        - description: >-
            Opt-in to surface routing metadata on the response under
            `openrouter_metadata`. Defaults to `disabled`. The legacy header
            `X-OpenRouter-Experimental-Metadata` is also accepted for backward
            compatibility.
          example: enabled
          in: header
          name: X-OpenRouter-Metadata
          required: false
          schema:
            $ref: '#/components/schemas/MetadataLevel'
      requestBody:
        content:
          application/json:
            example:
              max_tokens: 1024
              messages:
                - content: Hello, how are you?
                  role: user
              model: anthropic/claude-sonnet-4
            schema:
              $ref: '#/components/schemas/MessagesRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                content:
                  - text: >-
                      I'm doing well, thank you for asking! How can I help you
                      today?
                    type: text
                id: msg_abc123
                model: anthropic/claude-sonnet-4
                role: assistant
                stop_reason: end_turn
                type: message
                usage:
                  input_tokens: 12
                  output_tokens: 18
              schema:
                $ref: '#/components/schemas/MessagesResult'
            text/event-stream:
              example:
                data:
                  delta:
                    text: Hello
                    type: text_delta
                  index: 0
                  type: content_block_delta
                event: content_block_delta
              schema:
                $ref: '#/components/schemas/MessagesStreamingResponse'
              x-speakeasy-sse-sentinel: '[DONE]'
          description: Successful response
        '400':
          content:
            application/json:
              example:
                error:
                  message: 'Invalid request: messages is required'
                  type: invalid_request_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Invalid request error
        '401':
          content:
            application/json:
              example:
                error:
                  message: Invalid API key
                  type: authentication_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Authentication error
        '403':
          content:
            application/json:
              examples:
                guardrail-blocked:
                  summary: Guardrail blocked the request
                  value:
                    error:
                      code: 403
                      message: 'Request blocked: prompt injection patterns detected'
                      metadata:
                        patterns:
                          - ignore all previous instructions
                    openrouter_metadata:
                      attempt: 1
                      endpoints:
                        available:
                          - model: openai/gpt-4o
                            provider: OpenAI
                            selected: false
                        total: 1
                      is_byok: false
                      pipeline:
                        - data:
                            action: blocked
                            detected: true
                            engines:
                              - regex
                            patterns:
                              - ignore all previous instructions
                          guardrail_id: grd_abc123
                          guardrail_scope: api-key
                          name: regex_pi_detection
                          summary: >-
                            Blocked: prompt injection detected (1 pattern
                            matched)
                          type: guardrail
                      region: iad
                      requested: openai/gpt-4o
                      strategy: direct
                      summary: available=1
                insufficient-permissions:
                  summary: Insufficient permissions
                  value:
                    error:
                      code: 403
                      message: Only management keys can perform this operation
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
          description: >-
            Forbidden - Authentication successful but insufficient permissions,
            or a guardrail blocked the request. When guardrails block and the
            `X-OpenRouter-Metadata: enabled` header is present, the response
            includes `openrouter_metadata` with full routing context and a
            `pipeline` array containing guardrail stage details.
        '404':
          content:
            application/json:
              example:
                error:
                  message: Model not found
                  type: not_found_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Not found error
        '429':
          content:
            application/json:
              example:
                error:
                  message: Rate limit exceeded
                  type: rate_limit_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Rate limit error
        '500':
          content:
            application/json:
              example:
                error:
                  message: Internal server error
                  type: api_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: API error
        '503':
          content:
            application/json:
              example:
                error:
                  message: Service temporarily overloaded
                  type: overloaded_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Overloaded error
        '529':
          content:
            application/json:
              example:
                error:
                  message: Provider is temporarily overloaded
                  type: overloaded_error
                type: error
              schema:
                $ref: '#/components/schemas/MessagesErrorResponse'
          description: Overloaded error
components:
  schemas:
    MetadataLevel:
      description: >-
        Opt-in level for surfacing routing metadata on the response under
        `openrouter_metadata`.
      enum:
        - disabled
        - enabled
      example: enabled
      type: string
    MessagesRequest:
      description: Request schema for Anthropic Messages API endpoint
      example:
        max_tokens: 1024
        messages:
          - content: Hello, how are you?
            role: user
        model: anthropic/claude-4.5-sonnet-20250929
        temperature: 0.7
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        context_management:
          nullable: true
          properties:
            edits:
              items:
                oneOf:
                  - properties:
                      clear_at_least:
                        $ref: '#/components/schemas/AnthropicInputTokensClearAtLeast'
                      clear_tool_inputs:
                        anyOf:
                          - type: boolean
                          - items:
                              type: string
                            type: array
                          - nullable: true
                      exclude_tools:
                        items:
                          type: string
                        nullable: true
                        type: array
                      keep:
                        $ref: '#/components/schemas/AnthropicToolUsesKeep'
                      trigger:
                        discriminator:
                          mapping:
                            input_tokens:
                              $ref: '#/components/schemas/AnthropicInputTokensTrigger'
                            tool_uses:
                              $ref: '#/components/schemas/AnthropicToolUsesTrigger'
                          propertyName: type
                        oneOf:
                          - $ref: '#/components/schemas/AnthropicInputTokensTrigger'
                          - $ref: '#/components/schemas/AnthropicToolUsesTrigger'
                      type:
                        enum:
                          - clear_tool_uses_20250919
                        type: string
                    required:
                      - type
                    type: object
                  - properties:
                      keep:
                        anyOf:
                          - $ref: '#/components/schemas/AnthropicThinkingTurns'
                          - properties:
                              type:
                                enum:
                                  - all
                                type: string
                            required:
                              - type
                            type: object
                          - enum:
                              - all
                            type: string
                      type:
                        enum:
                          - clear_thinking_20251015
                        type: string
                    required:
                      - type
                    type: object
                  - properties:
                      instructions:
                        nullable: true
                        type: string
                      pause_after_compaction:
                        type: boolean
                      trigger:
                        allOf:
                          - $ref: '#/components/schemas/AnthropicInputTokensTrigger'
                          - nullable: true
                            properties: {}
                            type: object
                        example:
                          type: input_tokens
                          value: 100000
                      type:
                        enum:
                          - compact_20260112
                        type: string
                    required:
                      - type
                    type: object
              type: array
          type: object
        fallbacks:
          description: >-
            Fallback models to try if the primary model fails or refuses, in
            order. Handled by OpenRouter multi-model routing rather than
            Anthropic server-side fallbacks; cannot be combined with `models`.
            Each entry accepts only `model`. Maximum of 3 entries.
          example:
            - model: claude-opus-4-8
          items:
            $ref: '#/components/schemas/MessagesFallbackParam'
          nullable: true
          type: array
        max_tokens:
          type: integer
        messages:
          items:
            $ref: '#/components/schemas/MessagesMessageParam'
          nullable: true
          type: array
        metadata:
          properties:
            user_id:
              nullable: true
              type: string
          type: object
        model:
          type: string
        models:
          items:
            type: string
          type: array
        output_config:
          $ref: '#/components/schemas/MessagesOutputConfig'
        plugins:
          description: >-
            Plugins you want to enable for this request, including their
            settings.
          items:
            discriminator:
              mapping:
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
              - $ref: '#/components/schemas/ModerationPlugin'
              - $ref: '#/components/schemas/WebSearchPlugin'
              - $ref: '#/components/schemas/WebFetchPlugin'
              - $ref: '#/components/schemas/FileParserPlugin'
              - $ref: '#/components/schemas/ResponseHealingPlugin'
              - $ref: '#/components/schemas/ContextCompressionPlugin'
              - $ref: '#/components/schemas/ParetoRouterPlugin'
              - $ref: '#/components/schemas/FusionPlugin'
          type: array
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        route:
          $ref: '#/components/schemas/DeprecatedRoute'
        service_tier:
          type: string
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
        speed:
          allOf:
            - $ref: '#/components/schemas/AnthropicSpeed'
            - description: >-
                Controls output generation speed. When set to `fast`, uses a
                higher-speed inference configuration at premium pricing.
                Defaults to `standard` when omitted.
              example: fast
        stop_sequences:
          items:
            type: string
          type: array
        stop_server_tools_when:
          $ref: '#/components/schemas/StopServerToolsWhen'
        stream:
          type: boolean
        system:
          anyOf:
            - type: string
            - items:
                $ref: '#/components/schemas/AnthropicTextBlockParam'
              type: array
        temperature:
          format: double
          type: number
        thinking:
          oneOf:
            - properties:
                budget_tokens:
                  type: integer
                display:
                  $ref: '#/components/schemas/AnthropicThinkingDisplay'
                type:
                  enum:
                    - enabled
                  type: string
              required:
                - type
                - budget_tokens
              type: object
            - properties:
                type:
                  enum:
                    - disabled
                  type: string
              required:
                - type
              type: object
            - properties:
                display:
                  $ref: '#/components/schemas/AnthropicThinkingDisplay'
                type:
                  enum:
                    - adaptive
                  type: string
              required:
                - type
              type: object
        tool_choice:
          oneOf:
            - properties:
                disable_parallel_tool_use:
                  type: boolean
                type:
                  enum:
                    - auto
                  type: string
              required:
                - type
              type: object
            - properties:
                disable_parallel_tool_use:
                  type: boolean
                type:
                  enum:
                    - any
                  type: string
              required:
                - type
              type: object
            - properties:
                type:
                  enum:
                    - none
                  type: string
              required:
                - type
              type: object
            - properties:
                disable_parallel_tool_use:
                  type: boolean
                name:
                  type: string
                type:
                  enum:
                    - tool
                  type: string
              required:
                - type
                - name
              type: object
        tools:
          items:
            anyOf:
              - properties:
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  description:
                    type: string
                  input_schema:
                    additionalProperties:
                      nullable: true
                    properties:
                      properties:
                        nullable: true
                      required:
                        items:
                          type: string
                        nullable: true
                        type: array
                      type:
                        default: object
                        type: string
                    type: object
                  name:
                    type: string
                  type:
                    enum:
                      - custom
                    type: string
                required:
                  - name
                  - input_schema
                type: object
              - properties:
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  name:
                    enum:
                      - bash
                    type: string
                  type:
                    enum:
                      - bash_20250124
                    type: string
                required:
                  - type
                  - name
                type: object
              - properties:
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  name:
                    enum:
                      - str_replace_editor
                    type: string
                  type:
                    enum:
                      - text_editor_20250124
                    type: string
                required:
                  - type
                  - name
                type: object
              - properties:
                  allowed_domains:
                    items:
                      type: string
                    nullable: true
                    type: array
                  blocked_domains:
                    items:
                      type: string
                    nullable: true
                    type: array
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  max_uses:
                    nullable: true
                    type: integer
                  name:
                    enum:
                      - web_search
                    type: string
                  type:
                    enum:
                      - web_search_20250305
                    type: string
                  user_location:
                    $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
                required:
                  - type
                  - name
                type: object
              - properties:
                  allowed_callers:
                    $ref: '#/components/schemas/AnthropicAllowedCallers'
                  allowed_domains:
                    items:
                      type: string
                    nullable: true
                    type: array
                  blocked_domains:
                    items:
                      type: string
                    nullable: true
                    type: array
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  max_uses:
                    nullable: true
                    type: integer
                  name:
                    enum:
                      - web_search
                    type: string
                  type:
                    enum:
                      - web_search_20260209
                    type: string
                  user_location:
                    $ref: '#/components/schemas/AnthropicWebSearchToolUserLocation'
                required:
                  - type
                  - name
                type: object
              - properties:
                  allowed_callers:
                    $ref: '#/components/schemas/AnthropicAllowedCallers'
                  cache_control:
                    $ref: '#/components/schemas/AnthropicCacheControlDirective'
                  caching:
                    allOf:
                      - $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      - nullable: true
                  defer_loading:
                    type: boolean
                  max_uses:
                    type: integer
                  model:
                    type: string
                  name:
                    enum:
                      - advisor
                    type: string
                  type:
                    enum:
                      - advisor_20260301
                    type: string
                required:
                  - type
                  - name
                  - model
                type: object
              - $ref: '#/components/schemas/BashServerTool'
              - $ref: '#/components/schemas/DatetimeServerTool'
              - $ref: '#/components/schemas/ImageGenerationServerTool_OpenRouter'
              - $ref: '#/components/schemas/ChatSearchModelsServerTool'
              - $ref: '#/components/schemas/WebFetchServerTool'
              - $ref: '#/components/schemas/OpenRouterWebSearchServerTool'
              - additionalProperties:
                  nullable: true
                properties:
                  type:
                    type: string
                required:
                  - type
                type: object
          type: array
        top_k:
          type: integer
        top_p:
          format: double
          type: number
        trace:
          $ref: '#/components/schemas/TraceConfig'
        user:
          description: >-
            A unique identifier representing your end-user, which helps
            distinguish between different users of your app. This allows your
            app to identify specific users in case of abuse reports, preventing
            your entire app from being affected by the actions of individual
            users. Maximum of 256 characters.
          maxLength: 256
          type: string
      required:
        - model
        - messages
      type: object
    MessagesResult:
      allOf:
        - $ref: '#/components/schemas/BaseMessagesResult'
        - properties:
            context_management:
              nullable: true
              properties:
                applied_edits:
                  items:
                    additionalProperties:
                      nullable: true
                    properties:
                      type:
                        type: string
                    required:
                      - type
                    type: object
                  type: array
              required:
                - applied_edits
              type: object
            openrouter_metadata:
              $ref: '#/components/schemas/OpenRouterMetadata'
            provider:
              $ref: '#/components/schemas/ProviderName'
            usage:
              allOf:
                - $ref: '#/components/schemas/AnthropicUsage'
                - properties:
                    cost:
                      format: double
                      nullable: true
                      type: number
                    cost_details:
                      $ref: '#/components/schemas/CostDetails'
                    is_byok:
                      type: boolean
                    iterations:
                      items:
                        $ref: '#/components/schemas/AnthropicUsageIteration'
                      type: array
                    service_tier:
                      nullable: true
                      type: string
                    speed:
                      $ref: '#/components/schemas/AnthropicSpeed'
                  type: object
              example:
                cache_creation: null
                cache_creation_input_tokens: null
                cache_read_input_tokens: null
                inference_geo: null
                input_tokens: 100
                output_tokens: 50
                server_tool_use: null
                service_tier: standard
          type: object
      description: >-
        Non-streaming response from the Anthropic Messages API with OpenRouter
        extensions
      example:
        container: null
        content:
          - citations: []
            text: Hello! I'm doing well, thank you for asking.
            type: text
        id: msg_01XFDUDYJgAACzvnptvVoYEL
        model: claude-sonnet-4-5-20250929
        role: assistant
        stop_details: null
        stop_reason: end_turn
        stop_sequence: null
        type: message
        usage:
          cache_creation: null
          cache_creation_input_tokens: null
          cache_read_input_tokens: null
          inference_geo: null
          input_tokens: 12
          output_tokens: 15
          server_tool_use: null
          service_tier: standard
    MessagesStreamingResponse:
      example:
        data:
          delta:
            text: Hello
            type: text_delta
          index: 0
          type: content_block_delta
        event: content_block_delta
      properties:
        data:
          $ref: '#/components/schemas/MessagesStreamEvents'
        event:
          type: string
      required:
        - event
        - data
      type: object
    MessagesErrorResponse:
      example:
        error:
          message: Invalid request parameters
          type: invalid_request_error
        type: error
      properties:
        error:
          $ref: '#/components/schemas/MessagesErrorDetail'
        type:
          enum:
            - error
          type: string
      required:
        - type
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
        user_id:
          nullable: true
          type: string
      required:
        - error
      type: object
    AnthropicCacheControlDirective:
      description: >-
        Enable automatic prompt caching. When set at the top level, the system
        automatically applies cache breakpoints to the last cacheable block in
        the request. Currently supported for Anthropic Claude models.
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
    AnthropicInputTokensClearAtLeast:
      example:
        type: input_tokens
        value: 50000
      nullable: true
      properties:
        type:
          enum:
            - input_tokens
          type: string
        value:
          type: integer
      required:
        - type
        - value
      type: object
    AnthropicToolUsesKeep:
      example:
        type: tool_uses
        value: 5
      properties:
        type:
          enum:
            - tool_uses
          type: string
        value:
          type: integer
      required:
        - type
        - value
      type: object
    AnthropicInputTokensTrigger:
      example:
        type: input_tokens
        value: 100000
      properties:
        type:
          enum:
            - input_tokens
          type: string
        value:
          type: integer
      required:
        - type
        - value
      type: object
    AnthropicToolUsesTrigger:
      example:
        type: tool_uses
        value: 10
      properties:
        type:
          enum:
            - tool_uses
          type: string
        value:
          type: integer
      required:
        - type
        - value
      type: object
    AnthropicThinkingTurns:
      example:
        type: thinking_turns
        value: 3
      properties:
        type:
          enum:
            - thinking_turns
          type: string
        value:
          type: integer
      required:
        - type
        - value
      type: object
    MessagesFallbackParam:
      additionalProperties:
        nullable: true
      description: >-
        Fallback model to try when the primary model fails or refuses. Only the
        `model` field is supported; per-attempt overrides are rejected.
      example:
        model: claude-opus-4-8
      properties:
        model:
          type: string
      required:
        - model
      type: object
    MessagesMessageParam:
      description: Anthropic message with OpenRouter extensions
      example:
        content: Hello, how are you?
        role: user
      properties:
        content:
          anyOf:
            - type: string
            - items:
                oneOf:
                  - $ref: '#/components/schemas/AnthropicTextBlockParam'
                  - $ref: '#/components/schemas/AnthropicImageBlockParam'
                  - $ref: '#/components/schemas/AnthropicDocumentBlockParam'
                  - properties:
                      cache_control:
                        $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      id:
                        type: string
                      input:
                        nullable: true
                      name:
                        type: string
                      type:
                        enum:
                          - tool_use
                        type: string
                    required:
                      - type
                      - id
                      - name
                    type: object
                  - properties:
                      cache_control:
                        $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      content:
                        anyOf:
                          - type: string
                          - items:
                              anyOf:
                                - $ref: '#/components/schemas/AnthropicTextBlockParam'
                                - $ref: >-
                                    #/components/schemas/AnthropicImageBlockParam
                                - properties:
                                    tool_name:
                                      type: string
                                    type:
                                      enum:
                                        - tool_reference
                                      type: string
                                  required:
                                    - type
                                    - tool_name
                                  type: object
                                - $ref: >-
                                    #/components/schemas/AnthropicSearchResultBlockParam
                                - $ref: >-
                                    #/components/schemas/AnthropicDocumentBlockParam
                            type: array
                      is_error:
                        type: boolean
                      tool_use_id:
                        type: string
                      type:
                        enum:
                          - tool_result
                        type: string
                    required:
                      - type
                      - tool_use_id
                    type: object
                  - properties:
                      signature:
                        type: string
                      thinking:
                        type: string
                      type:
                        enum:
                          - thinking
                        type: string
                    required:
                      - type
                      - thinking
                      - signature
                    type: object
                  - properties:
                      data:
                        type: string
                      type:
                        enum:
                          - redacted_thinking
                        type: string
                    required:
                      - type
                      - data
                    type: object
                  - properties:
                      cache_control:
                        $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      id:
                        type: string
                      input:
                        nullable: true
                      name:
                        type: string
                      type:
                        enum:
                          - server_tool_use
                        type: string
                    required:
                      - type
                      - id
                      - name
                    type: object
                  - properties:
                      cache_control:
                        $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      content:
                        anyOf:
                          - items:
                              $ref: >-
                                #/components/schemas/AnthropicWebSearchResultBlockParam
                            type: array
                          - properties:
                              error_code:
                                enum:
                                  - invalid_tool_input
                                  - unavailable
                                  - max_uses_exceeded
                                  - too_many_requests
                                  - query_too_long
                                type: string
                              type:
                                enum:
                                  - web_search_tool_result_error
                                type: string
                            required:
                              - type
                              - error_code
                            type: object
                      tool_use_id:
                        type: string
                      type:
                        enum:
                          - web_search_tool_result
                        type: string
                    required:
                      - type
                      - tool_use_id
                      - content
                    type: object
                  - $ref: '#/components/schemas/AnthropicSearchResultBlockParam'
                  - properties:
                      cache_control:
                        $ref: '#/components/schemas/AnthropicCacheControlDirective'
                      content:
                        nullable: true
                        type: string
                      type:
                        enum:
                          - compaction
                        type: string
                    required:
                      - type
                      - content
                    type: object
                  - $ref: '#/components/schemas/MessagesAdvisorToolResultBlock'
              type: array
        role:
          enum:
            - user
            - assistant
            - system
          type: string
      required:
        - role
        - content
      type: object
    MessagesOutputConfig:
      description: >-
        Configuration for controlling output behavior. Supports the effort
        parameter and structured output format.
      example:
        effort: medium
      properties:
        effort:
          description: >-
            How much effort the model should put into its response. Higher
            effort levels may result in more thorough analysis but take longer.
            Valid values are `low`, `medium`, `high`, `xhigh`, or `max`.
          enum:
            - low
            - medium
            - high
            - xhigh
            - max
            - null
          example: medium
          nullable: true
          type: string
        format:
          description: >-
            A schema to specify Claude's output format in responses. See
            [structured
            outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).
          nullable: true
          properties:
            schema:
              additionalProperties:
                nullable: true
              type: object
            type:
              enum:
                - json_schema
              type: string
          required:
            - type
            - schema
          type: object
        task_budget:
          description: >-
            Task budget for an agentic turn. The model sees a countdown of
            remaining tokens and uses it to prioritize work and wind down
            gracefully. Advisory — does not enforce a hard cap.
          example:
            total: 400000
            type: tokens
          nullable: true
          properties:
            remaining:
              minimum: 0
              nullable: true
              type: integer
            total:
              minimum: 20000
              type: integer
            type:
              enum:
                - tokens
              type: string
          required:
            - type
            - total
          type: object
      type: object
    AutoRouterPlugin:
      example:
        allowed_models:
          - anthropic/*
          - openai/gpt-4o
        cost_quality_tradeoff: 7
        enabled: true
        id: auto-router
      properties:
        allowed_models:
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). When not specified, uses the default supported
            models list.
          example:
            - anthropic/*
            - openai/gpt-4o
            - google/*
          items:
            type: string
          type: array
        cost_quality_tradeoff:
          description: >-
            Controls cost vs. quality routing tradeoff (0–10). 0 = pure quality
            (best model regardless of cost), 10 = maximize for cost (cheapest
            model wins). Intermediate values blend quality and cost signals
            continuously. Defaults to 7.
          example: 7
          maximum: 10
          minimum: 0
          type: integer
        enabled:
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
          type: boolean
        id:
          enum:
            - auto-router
          type: string
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
            Slugs of models to run in parallel as the "expert panel" the judge
            analyzes. Each model receives the same user prompt with web_search +
            web_fetch enabled. Capped at 8 models to bound cost amplification.
            When omitted, defaults to the Quality preset from the /labs/fusion
            UI (~anthropic/claude-opus-latest, ~openai/gpt-latest,
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
            Set to false to disable the fusion plugin for this request. Defaults
            to true.
          type: boolean
        id:
          enum:
            - fusion
          type: string
        max_tool_calls:
          description: >-
            Maximum number of tool-calling steps each panelist (analysis model)
            and the judge model may take during their agentic web-research loop.
            Models with web_search/web_fetch enabled iterate until they produce
            a text response or hit this ceiling. Defaults to 8. Capped at 16.
          example: 12
          maximum: 16
          minimum: 1
          type: integer
        model:
          description: >-
            Slug of the model that performs both the judge step (with web_search
            + web_fetch) and the final synthesis. When omitted, defaults to the
            first model in the Quality preset.
          example: ~anthropic/claude-opus-latest
          type: string
        preset:
          description: >-
            A curated OpenRouter fusion preset (slugs follow `<task>-<tier>`,
            e.g. `general-high`). Expands server-side into the preset's
            analysis_models panel and judge model, so callers never name
            individual models. Explicitly provided `analysis_models` / `model`
            take precedence.
          enum:
            - general-high
            - general-budget
            - general-fast
          example: general-high
          type: string
        tools:
          description: >-
            Server tools available to panelist and judge inner calls. Each entry
            uses the same `{ type, parameters? }` shorthand as the outer Chat
            Completions request. When omitted, defaults to `[{ type:
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
                additionalProperties:
                  anyOf:
                    - type: string
                    - format: double
                      type: number
                    - type: boolean
                    - nullable: true
                    - items:
                        anyOf:
                          - type: string
                          - format: double
                            type: number
                          - type: boolean
                          - nullable: true
                          - nullable: true
                      type: array
                    - additionalProperties:
                        anyOf:
                          - type: string
                          - format: double
                            type: number
                          - type: boolean
                          - nullable: true
                          - nullable: true
                      type: object
                    - nullable: true
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
        min_coding_score: 0.8
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
        min_coding_score:
          description: >-
            Minimum coding quality score between 0 and 1. Maps to internal
            quality tiers: >= 0.66 → high (top coding models), >= 0.33 → medium
            (strong modern flagships), < 0.33 → low (capable coders above the
            median). Omit to default to the highest tier (equivalent to >=
            0.66).
          example: 0.8
          format: double
          maximum: 1
          minimum: 0
          type: number
        price_source:
          description: >-
            Price source for the Pareto frontier cost axis. "prompt" uses
            catalog list price (endpoint.pricing.prompt). "weighted_avg" uses
            traffic-weighted effective input price from ClickHouse, falling back
            to prompt price for models without traffic data. Defaults to
            "prompt".
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
    ProviderPreferences:
      additionalProperties: false
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      example:
        allow_fallbacks: true
      nullable: true
      properties:
        allow_fallbacks:
          description: >
            Whether to allow backup providers to serve requests

            - true: (default) when the primary provider (or your custom
            providers in "order") is unavailable, use the next best provider.

            - false: use only the primary/custom provider, and return the
            upstream error if it's unavailable.
          nullable: true
          type: boolean
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
          nullable: true
          type: string
        enforce_distillable_text:
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
          example: true
          nullable: true
          type: boolean
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
          nullable: true
          type: array
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
          nullable: true
          type: array
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
          nullable: true
          type: array
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        quantizations:
          description: A list of quantization levels to filter the provider by.
          items:
            $ref: '#/components/schemas/Quantization'
          nullable: true
          type: array
        require_parameters:
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
          nullable: true
          type: boolean
        sort:
          anyOf:
            - $ref: '#/components/schemas/ProviderSort'
            - $ref: '#/components/schemas/ProviderSortConfig'
            - nullable: true
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
          nullable: true
          type: boolean
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
      nullable: true
      type: string
      x-fern-ignore: true
      x-speakeasy-deprecation-message: Use providers.sort.partition instead.
      x-speakeasy-ignore: true
    AnthropicSpeed:
      enum:
        - fast
        - standard
        - null
      example: standard
      nullable: true
      type: string
    StopServerToolsWhen:
      description: >-
        Stop conditions for the server-tool agent loop. Any condition firing
        halts the loop (OR logic). When set, this overrides `max_tool_calls`.
      example:
        - step_count: 5
          type: step_count_is
        - max_cost_in_dollars: 0.5
          type: max_cost
      items:
        $ref: '#/components/schemas/StopServerToolsWhenCondition'
      minItems: 1
      type: array
    AnthropicTextBlockParam:
      example:
        text: Hello, world!
        type: text
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          items:
            discriminator:
              mapping:
                char_location:
                  $ref: '#/components/schemas/AnthropicCitationCharLocationParam'
                content_block_location:
                  $ref: >-
                    #/components/schemas/AnthropicCitationContentBlockLocationParam
                page_location:
                  $ref: '#/components/schemas/AnthropicCitationPageLocationParam'
                search_result_location:
                  $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
                web_search_result_location:
                  $ref: >-
                    #/components/schemas/AnthropicCitationWebSearchResultLocation
              propertyName: type
            oneOf:
              - $ref: '#/components/schemas/AnthropicCitationCharLocationParam'
              - $ref: '#/components/schemas/AnthropicCitationPageLocationParam'
              - $ref: >-
                  #/components/schemas/AnthropicCitationContentBlockLocationParam
              - $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocation'
              - $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
          nullable: true
          type: array
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
    AnthropicThinkingDisplay:
      enum:
        - summarized
        - omitted
        - null
      example: summarized
      nullable: true
      type: string
    AnthropicWebSearchToolUserLocation:
      example:
        city: San Francisco
        country: US
        region: California
        timezone: America/Los_Angeles
        type: approximate
      nullable: true
      properties:
        city:
          nullable: true
          type: string
        country:
          nullable: true
          type: string
        region:
          nullable: true
          type: string
        timezone:
          nullable: true
          type: string
        type:
          enum:
            - approximate
          type: string
      required:
        - type
      type: object
    AnthropicAllowedCallers:
      example:
        - direct
      items:
        enum:
          - direct
          - code_execution_20250825
          - code_execution_20260120
        type: string
      type: array
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
    TraceConfig:
      additionalProperties:
        nullable: true
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
    BaseMessagesResult:
      description: Base Anthropic Messages API response before OpenRouter extensions
      example:
        container: null
        content:
          - citations: []
            text: Hello!
            type: text
        id: msg_01XFDUDYJgAACzvnptvVoYEL
        model: claude-sonnet-4-5-20250929
        role: assistant
        stop_details: null
        stop_reason: end_turn
        stop_sequence: null
        type: message
        usage:
          cache_creation_input_tokens: null
          cache_read_input_tokens: null
          input_tokens: 12
          output_tokens: 8
      properties:
        container:
          $ref: '#/components/schemas/AnthropicContainer'
        content:
          items:
            $ref: '#/components/schemas/ORAnthropicContentBlock'
          type: array
        id:
          type: string
        model:
          type: string
        role:
          enum:
            - assistant
          type: string
        stop_details:
          $ref: '#/components/schemas/AnthropicRefusalStopDetails'
        stop_reason:
          $ref: '#/components/schemas/ORAnthropicStopReason'
        stop_sequence:
          nullable: true
          type: string
        type:
          enum:
            - message
          type: string
        usage:
          allOf:
            - $ref: '#/components/schemas/AnthropicUsage'
            - properties:
                iterations:
                  items:
                    $ref: '#/components/schemas/AnthropicUsageIteration'
                  type: array
                speed:
                  $ref: '#/components/schemas/AnthropicSpeed'
              type: object
          example:
            cache_creation: null
            cache_creation_input_tokens: null
            cache_read_input_tokens: null
            inference_geo: null
            input_tokens: 100
            output_tokens: 50
            output_tokens_details: null
            server_tool_use: null
            service_tier: standard
      required:
        - id
        - type
        - role
        - container
        - content
        - model
        - stop_reason
        - stop_details
        - stop_sequence
        - usage
      type: object
    OpenRouterMetadata:
      example:
        attempt: 1
        endpoints:
          available:
            - model: openai/gpt-4o
              provider: OpenAI
              selected: true
          total: 1
        is_byok: false
        region: iad
        requested: openai/gpt-4o
        strategy: direct
        summary: available=1, selected=OpenAI
      properties:
        attempt:
          type: integer
        attempts:
          items:
            $ref: '#/components/schemas/RouterAttempt'
          type: array
        endpoints:
          $ref: '#/components/schemas/EndpointsMetadata'
        is_byok:
          type: boolean
        params:
          $ref: '#/components/schemas/RouterParams'
        pipeline:
          items:
            $ref: '#/components/schemas/PipelineStage'
          type: array
        region:
          nullable: true
          type: string
        requested:
          type: string
        strategy:
          $ref: '#/components/schemas/RoutingStrategy'
        summary:
          type: string
      required:
        - requested
        - strategy
        - region
        - summary
        - attempt
        - is_byok
        - endpoints
      type: object
    ProviderName:
      enum:
        - Meta
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
        - Clarifai
        - Cloudflare
        - Cohere
        - Crucible
        - Crusoe
        - Darkbloom
        - Decart
        - Deepgram
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - DigitalOcean
        - Featherless
        - Fireworks
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
        - Mara
        - Mancer 2
        - Minimax
        - ModelRun
        - Mistral
        - Modular
        - Moonshot AI
        - Morph
        - NCompass
        - Nebius
        - Nex AGI
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Poolside
        - Perceptron
        - Perplexity
        - Phala
        - Recraft
        - Reka
        - Relace
        - Sakana AI
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Tenstorrent
        - Together
        - Upstage
        - Venice
        - Wafer
        - WandB
        - Quiver
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      example: OpenAI
      type: string
    AnthropicUsage:
      example:
        cache_creation: null
        cache_creation_input_tokens: null
        cache_read_input_tokens: null
        inference_geo: null
        input_tokens: 100
        output_tokens: 50
        output_tokens_details: null
        server_tool_use: null
        service_tier: standard
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicCacheCreation'
        cache_creation_input_tokens:
          nullable: true
          type: integer
        cache_read_input_tokens:
          nullable: true
          type: integer
        inference_geo:
          nullable: true
          type: string
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        output_tokens_details:
          $ref: '#/components/schemas/AnthropicOutputTokensDetails'
        server_tool_use:
          $ref: '#/components/schemas/AnthropicServerToolUsage'
        service_tier:
          $ref: '#/components/schemas/AnthropicServiceTier'
      required:
        - input_tokens
        - output_tokens
        - output_tokens_details
        - cache_creation_input_tokens
        - cache_read_input_tokens
        - cache_creation
        - inference_geo
        - server_tool_use
        - service_tier
      type: object
    CostDetails:
      description: Breakdown of upstream inference costs
      example:
        upstream_inference_completions_cost: 0.0004
        upstream_inference_cost: null
        upstream_inference_prompt_cost: 0.0008
      nullable: true
      properties:
        upstream_inference_completions_cost:
          format: double
          type: number
        upstream_inference_cost:
          format: double
          nullable: true
          type: number
        upstream_inference_prompt_cost:
          format: double
          type: number
      required:
        - upstream_inference_prompt_cost
        - upstream_inference_completions_cost
      type: object
    AnthropicUsageIteration:
      anyOf:
        - $ref: '#/components/schemas/AnthropicCompactionUsageIteration'
        - $ref: '#/components/schemas/AnthropicMessageUsageIteration'
        - $ref: '#/components/schemas/AnthropicAdvisorMessageUsageIteration'
        - $ref: '#/components/schemas/AnthropicUnknownUsageIteration'
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 100
        output_tokens: 50
        type: message
    MessagesStreamEvents:
      description: Union of all possible streaming events
      discriminator:
        mapping:
          content_block_delta:
            $ref: '#/components/schemas/MessagesContentBlockDeltaEvent'
          content_block_start:
            $ref: '#/components/schemas/MessagesContentBlockStartEvent'
          content_block_stop:
            $ref: '#/components/schemas/MessagesContentBlockStopEvent'
          error:
            $ref: '#/components/schemas/MessagesErrorEvent'
          message_delta:
            $ref: '#/components/schemas/MessagesDeltaEvent'
          message_start:
            $ref: '#/components/schemas/MessagesStartEvent'
          message_stop:
            $ref: '#/components/schemas/MessagesStopEvent'
          ping:
            $ref: '#/components/schemas/MessagesPingEvent'
        propertyName: type
      example:
        delta:
          text: Hello
          type: text_delta
        index: 0
        type: content_block_delta
      oneOf:
        - $ref: '#/components/schemas/MessagesStartEvent'
        - $ref: '#/components/schemas/MessagesDeltaEvent'
        - $ref: '#/components/schemas/MessagesStopEvent'
        - $ref: '#/components/schemas/MessagesContentBlockStartEvent'
        - $ref: '#/components/schemas/MessagesContentBlockDeltaEvent'
        - $ref: '#/components/schemas/MessagesContentBlockStopEvent'
        - $ref: '#/components/schemas/MessagesPingEvent'
        - $ref: '#/components/schemas/MessagesErrorEvent'
    MessagesErrorDetail:
      example:
        error_type: invalid_request
        message: Invalid request parameters
        type: invalid_request_error
      properties:
        error_type:
          $ref: '#/components/schemas/ApiErrorType'
        message:
          type: string
        type:
          type: string
      required:
        - type
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
    AnthropicImageBlockParam:
      example:
        source:
          data: /9j/4AAQ...
          media_type: image/jpeg
          type: base64
        type: image
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        source:
          discriminator:
            mapping:
              base64:
                $ref: '#/components/schemas/AnthropicBase64ImageSource'
              url:
                $ref: '#/components/schemas/AnthropicUrlImageSource'
            propertyName: type
          oneOf:
            - $ref: '#/components/schemas/AnthropicBase64ImageSource'
            - $ref: '#/components/schemas/AnthropicUrlImageSource'
        type:
          enum:
            - image
          type: string
      required:
        - type
        - source
      type: object
    AnthropicDocumentBlockParam:
      example:
        source:
          data: Hello, world!
          media_type: text/plain
          type: text
        type: document
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          nullable: true
          properties:
            enabled:
              type: boolean
          type: object
        context:
          nullable: true
          type: string
        source:
          oneOf:
            - $ref: '#/components/schemas/AnthropicBase64PdfSource'
            - $ref: '#/components/schemas/AnthropicPlainTextSource'
            - properties:
                content:
                  anyOf:
                    - type: string
                    - items:
                        discriminator:
                          mapping:
                            image:
                              $ref: '#/components/schemas/AnthropicImageBlockParam'
                            text:
                              $ref: '#/components/schemas/AnthropicTextBlockParam'
                          propertyName: type
                        oneOf:
                          - $ref: '#/components/schemas/AnthropicTextBlockParam'
                          - $ref: '#/components/schemas/AnthropicImageBlockParam'
                      type: array
                type:
                  enum:
                    - content
                  type: string
              required:
                - type
                - content
              type: object
            - $ref: '#/components/schemas/AnthropicUrlPdfSource'
            - $ref: '#/components/schemas/AnthropicFileDocumentSource'
        title:
          nullable: true
          type: string
        type:
          enum:
            - document
          type: string
      required:
        - type
        - source
      type: object
    AnthropicSearchResultBlockParam:
      example:
        content:
          - text: Result content
            type: text
        source: example_source
        title: Example Result
        type: search_result
      properties:
        cache_control:
          $ref: '#/components/schemas/AnthropicCacheControlDirective'
        citations:
          properties:
            enabled:
              type: boolean
          type: object
        content:
          items:
            $ref: '#/components/schemas/AnthropicTextBlockParam'
          type: array
        source:
          type: string
        title:
          type: string
        type:
          enum:
            - search_result
          type: string
      required:
        - type
        - source
        - title
        - content
      type: object
    AnthropicWebSearchResultBlockParam:
      example:
        encrypted_content: enc_content_0
        title: Example Page
        type: web_search_result
        url: https://example.com
      properties:
        encrypted_content:
          type: string
        page_age:
          nullable: true
          type: string
        title:
          type: string
        type:
          enum:
            - web_search_result
          type: string
        url:
          type: string
      required:
        - type
        - encrypted_content
        - title
        - url
      type: object
    MessagesAdvisorToolResultBlock:
      description: >-
        Advisor tool result from a prior assistant turn, replayed back to the
        model on the next turn. Mirrors the block Anthropic returns in assistant
        content when the `advisor_20260301` tool runs.
      example:
        content:
          text: Advisor response text
          type: advisor_result
        tool_use_id: srvtoolu_01abc
        type: advisor_tool_result
      properties:
        content:
          additionalProperties:
            nullable: true
          type: object
        tool_use_id:
          type: string
        type:
          enum:
            - advisor_tool_result
          type: string
      required:
        - type
        - tool_use_id
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
    WebSearchUserLocation:
      description: User location information for web search
      example:
        city: San Francisco
        country: USA
        region: California
        timezone: America/Los_Angeles
        type: approximate
      nullable: true
      properties:
        city:
          nullable: true
          type: string
        country:
          nullable: true
          type: string
        region:
          nullable: true
          type: string
        timezone:
          nullable: true
          type: string
        type:
          enum:
            - approximate
          type: string
      type: object
    PreferredMaxLatency:
      anyOf:
        - format: double
          type: number
        - $ref: '#/components/schemas/PercentileLatencyCutoffs'
        - nullable: true
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
        - nullable: true
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
        - fp6
        - fp8
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
          nullable: true
          type: string
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
          nullable: true
          type: string
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
    AnthropicCitationCharLocationParam:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_char_index: 18
        start_char_index: 0
        type: char_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_char_index:
          type: integer
        start_char_index:
          type: integer
        type:
          enum:
            - char_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
      type: object
    AnthropicCitationContentBlockLocationParam:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_block_index: 1
        start_block_index: 0
        type: content_block_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_block_index:
          type: integer
        start_block_index:
          type: integer
        type:
          enum:
            - content_block_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
      type: object
    AnthropicCitationPageLocationParam:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_page_number: 2
        start_page_number: 1
        type: page_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_page_number:
          type: integer
        start_page_number:
          type: integer
        type:
          enum:
            - page_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
      type: object
    AnthropicCitationSearchResultLocation:
      example:
        cited_text: Example cited text
        end_block_index: 1
        search_result_index: 0
        source: example_source
        start_block_index: 0
        title: Example Result
        type: search_result_location
      properties:
        cited_text:
          type: string
        end_block_index:
          type: integer
        search_result_index:
          type: integer
        source:
          type: string
        start_block_index:
          type: integer
        title:
          nullable: true
          type: string
        type:
          enum:
            - search_result_location
          type: string
      required:
        - type
        - cited_text
        - search_result_index
        - source
        - title
        - start_block_index
        - end_block_index
      type: object
    AnthropicCitationWebSearchResultLocation:
      example:
        cited_text: Example cited text
        encrypted_index: enc_idx_0
        title: Example Page
        type: web_search_result_location
        url: https://example.com
      properties:
        cited_text:
          type: string
        encrypted_index:
          type: string
        title:
          nullable: true
          type: string
        type:
          enum:
            - web_search_result_location
          type: string
        url:
          type: string
      required:
        - type
        - cited_text
        - encrypted_index
        - title
        - url
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
    ImageGenerationServerToolConfig:
      additionalProperties:
        anyOf:
          - type: string
          - format: double
            type: number
          - items:
              nullable: true
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
            Firecrawl, Parallel, Perplexity, Anthropic, and xAI. Not supported
            with OpenAI (silently ignored). Cannot be used with allowed_domains.
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
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
      type: object
    AnthropicContainer:
      example:
        expires_at: '2026-04-08T00:00:00Z'
        id: ctr_01abc
      nullable: true
      properties:
        expires_at:
          type: string
        id:
          type: string
      required:
        - id
        - expires_at
      type: object
    ORAnthropicContentBlock:
      discriminator:
        mapping:
          advisor_tool_result:
            $ref: '#/components/schemas/AnthropicAdvisorToolResult'
          bash_code_execution_tool_result:
            $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResult'
          code_execution_tool_result:
            $ref: '#/components/schemas/AnthropicCodeExecutionToolResult'
          compaction:
            $ref: '#/components/schemas/AnthropicCompactionBlock'
          container_upload:
            $ref: '#/components/schemas/AnthropicContainerUpload'
          redacted_thinking:
            $ref: '#/components/schemas/AnthropicRedactedThinkingBlock'
          server_tool_use:
            $ref: '#/components/schemas/ORAnthropicServerToolUseBlock'
          text:
            $ref: '#/components/schemas/AnthropicTextBlock'
          text_editor_code_execution_tool_result:
            $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResult'
          thinking:
            $ref: '#/components/schemas/AnthropicThinkingBlock'
          tool_search_tool_result:
            $ref: '#/components/schemas/AnthropicToolSearchToolResult'
          tool_use:
            $ref: '#/components/schemas/AnthropicToolUseBlock'
          web_fetch_tool_result:
            $ref: '#/components/schemas/AnthropicWebFetchToolResult'
          web_search_tool_result:
            $ref: '#/components/schemas/AnthropicWebSearchToolResult'
        propertyName: type
      example:
        citations: null
        text: Hello, world!
        type: text
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextBlock'
        - $ref: '#/components/schemas/AnthropicToolUseBlock'
        - $ref: '#/components/schemas/AnthropicThinkingBlock'
        - $ref: '#/components/schemas/AnthropicRedactedThinkingBlock'
        - $ref: '#/components/schemas/ORAnthropicServerToolUseBlock'
        - $ref: '#/components/schemas/AnthropicWebSearchToolResult'
        - $ref: '#/components/schemas/AnthropicWebFetchToolResult'
        - $ref: '#/components/schemas/AnthropicCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResult'
        - $ref: '#/components/schemas/AnthropicToolSearchToolResult'
        - $ref: '#/components/schemas/AnthropicContainerUpload'
        - $ref: '#/components/schemas/AnthropicCompactionBlock'
        - $ref: '#/components/schemas/AnthropicAdvisorToolResult'
    AnthropicRefusalStopDetails:
      description: Structured information about a refusal
      example:
        category: cyber
        explanation: The request was refused due to policy.
        type: refusal
      nullable: true
      properties:
        category:
          enum:
            - cyber
            - bio
            - null
          nullable: true
          type: string
        explanation:
          nullable: true
          type: string
        type:
          enum:
            - refusal
          type: string
      required:
        - type
        - category
        - explanation
      type: object
    ORAnthropicStopReason:
      enum:
        - end_turn
        - max_tokens
        - stop_sequence
        - tool_use
        - pause_turn
        - refusal
        - compaction
        - null
      example: end_turn
      nullable: true
      type: string
    RouterAttempt:
      example:
        model: openai/gpt-4o
        provider: OpenAI
        status: 200
      properties:
        model:
          type: string
        provider:
          type: string
        status:
          type: integer
      required:
        - provider
        - model
        - status
      type: object
    EndpointsMetadata:
      example:
        available:
          - model: openai/gpt-4o
            provider: OpenAI
            selected: true
        total: 3
      properties:
        available:
          items:
            $ref: '#/components/schemas/EndpointInfo'
          type: array
        total:
          type: integer
      required:
        - total
        - available
      type: object
    RouterParams:
      additionalProperties:
        nullable: true
      example:
        version_group: anthropic/claude-sonnet-4
      properties:
        quality_floor:
          format: double
          type: number
        throughput_floor:
          format: double
          type: number
        version_group:
          type: string
      type: object
    PipelineStage:
      example:
        data:
          action: redacted
          engines:
            - presidio
          flagged: true
          matched_entity_types:
            - EMAIL
            - PHONE
        name: content-filter
        summary: PII redacted via Presidio (EMAIL, PHONE)
        type: guardrail
      properties:
        cost_usd:
          format: double
          nullable: true
          type: number
        data:
          additionalProperties:
            nullable: true
          type: object
        guardrail_id:
          type: string
        guardrail_scope:
          type: string
        name:
          type: string
        summary:
          type: string
        type:
          $ref: '#/components/schemas/PipelineStageType'
      required:
        - type
        - name
      type: object
    RoutingStrategy:
      enum:
        - direct
        - auto
        - free
        - latest
        - alias
        - fallback
        - pareto
        - bodybuilder
        - fusion
      example: direct
      type: string
    AnthropicCacheCreation:
      example:
        ephemeral_1h_input_tokens: 0
        ephemeral_5m_input_tokens: 100
      nullable: true
      properties:
        ephemeral_1h_input_tokens:
          type: integer
        ephemeral_5m_input_tokens:
          type: integer
      required:
        - ephemeral_5m_input_tokens
        - ephemeral_1h_input_tokens
      type: object
    AnthropicOutputTokensDetails:
      example:
        thinking_tokens: 0
      nullable: true
      properties:
        thinking_tokens:
          type: integer
      required:
        - thinking_tokens
      type: object
    AnthropicServerToolUsage:
      example:
        web_fetch_requests: 0
        web_search_requests: 1
      nullable: true
      properties:
        web_fetch_requests:
          type: integer
        web_search_requests:
          type: integer
      required:
        - web_search_requests
        - web_fetch_requests
      type: object
    AnthropicServiceTier:
      enum:
        - standard
        - priority
        - batch
        - null
      example: standard
      nullable: true
      type: string
    AnthropicCompactionUsageIteration:
      allOf:
        - $ref: '#/components/schemas/AnthropicBaseUsageIteration'
        - properties:
            type:
              enum:
                - compaction
              type: string
          required:
            - type
          type: object
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 50
        output_tokens: 25
        type: compaction
    AnthropicMessageUsageIteration:
      allOf:
        - $ref: '#/components/schemas/AnthropicBaseUsageIteration'
        - properties:
            model:
              type: string
            type:
              enum:
                - message
              type: string
          required:
            - type
          type: object
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 100
        output_tokens: 50
        type: message
    AnthropicAdvisorMessageUsageIteration:
      allOf:
        - $ref: '#/components/schemas/AnthropicBaseUsageIteration'
        - properties:
            model:
              type: string
            type:
              enum:
                - advisor_message
              type: string
          required:
            - type
            - model
          type: object
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 823
        model: claude-opus-4-6
        output_tokens: 1612
        type: advisor_message
    AnthropicUnknownUsageIteration:
      allOf:
        - $ref: '#/components/schemas/AnthropicBaseUsageIteration'
        - properties:
            type:
              type: string
          required:
            - type
          type: object
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 100
        output_tokens: 50
        type: unknown
    MessagesContentBlockDeltaEvent:
      description: Event sent when content is added to a content block
      example:
        delta:
          text: Hello
          type: text_delta
        index: 0
        type: content_block_delta
      properties:
        delta:
          oneOf:
            - properties:
                text:
                  type: string
                type:
                  enum:
                    - text_delta
                  type: string
              required:
                - type
                - text
              type: object
            - properties:
                partial_json:
                  type: string
                type:
                  enum:
                    - input_json_delta
                  type: string
              required:
                - type
                - partial_json
              type: object
            - properties:
                thinking:
                  type: string
                type:
                  enum:
                    - thinking_delta
                  type: string
              required:
                - type
                - thinking
              type: object
            - properties:
                signature:
                  type: string
                type:
                  enum:
                    - signature_delta
                  type: string
              required:
                - type
                - signature
              type: object
            - properties:
                citation:
                  discriminator:
                    mapping:
                      char_location:
                        $ref: '#/components/schemas/AnthropicCitationCharLocation'
                      content_block_location:
                        $ref: >-
                          #/components/schemas/AnthropicCitationContentBlockLocation
                      page_location:
                        $ref: '#/components/schemas/AnthropicCitationPageLocation'
                      search_result_location:
                        $ref: >-
                          #/components/schemas/AnthropicCitationSearchResultLocation
                      web_search_result_location:
                        $ref: >-
                          #/components/schemas/AnthropicCitationWebSearchResultLocation
                    propertyName: type
                  oneOf:
                    - $ref: '#/components/schemas/AnthropicCitationCharLocation'
                    - $ref: '#/components/schemas/AnthropicCitationPageLocation'
                    - $ref: >-
                        #/components/schemas/AnthropicCitationContentBlockLocation
                    - $ref: >-
                        #/components/schemas/AnthropicCitationWebSearchResultLocation
                    - $ref: >-
                        #/components/schemas/AnthropicCitationSearchResultLocation
                type:
                  enum:
                    - citations_delta
                  type: string
              required:
                - type
                - citation
              type: object
            - properties:
                content:
                  nullable: true
                  type: string
                type:
                  enum:
                    - compaction_delta
                  type: string
              required:
                - type
                - content
              type: object
        index:
          type: integer
        type:
          enum:
            - content_block_delta
          type: string
      required:
        - type
        - index
        - delta
      type: object
    MessagesContentBlockStartEvent:
      description: Event sent when a new content block starts
      example:
        content_block:
          text: ''
          type: text
        index: 0
        type: content_block_start
      properties:
        content_block:
          anyOf:
            - $ref: '#/components/schemas/AnthropicTextBlock'
            - $ref: '#/components/schemas/AnthropicToolUseBlock'
            - $ref: '#/components/schemas/AnthropicThinkingBlock'
            - $ref: '#/components/schemas/AnthropicRedactedThinkingBlock'
            - $ref: '#/components/schemas/ORAnthropicServerToolUseBlock'
            - $ref: '#/components/schemas/AnthropicWebSearchToolResult'
            - $ref: '#/components/schemas/AnthropicWebFetchToolResult'
            - $ref: '#/components/schemas/AnthropicCodeExecutionToolResult'
            - $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResult'
            - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResult'
            - $ref: '#/components/schemas/AnthropicToolSearchToolResult'
            - $ref: '#/components/schemas/AnthropicContainerUpload'
            - $ref: '#/components/schemas/AnthropicCompactionBlock'
            - $ref: '#/components/schemas/AnthropicAdvisorToolResult'
            - properties:
                content:
                  nullable: true
                  type: string
                type:
                  enum:
                    - compaction
                  type: string
              required:
                - type
                - content
              type: object
        index:
          type: integer
        type:
          enum:
            - content_block_start
          type: string
      required:
        - type
        - index
        - content_block
      type: object
    MessagesContentBlockStopEvent:
      description: Event sent when a content block is complete
      example:
        index: 0
        type: content_block_stop
      properties:
        index:
          type: integer
        type:
          enum:
            - content_block_stop
          type: string
      required:
        - type
        - index
      type: object
    MessagesErrorEvent:
      description: Error event in the stream
      example:
        error:
          error_type: provider_overloaded
          message: Overloaded
          type: overloaded_error
        type: error
      properties:
        error:
          properties:
            error_type:
              $ref: '#/components/schemas/ApiErrorType'
            message:
              type: string
            type:
              type: string
          required:
            - type
            - message
          type: object
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
        type:
          enum:
            - error
          type: string
      required:
        - type
        - error
      type: object
    MessagesDeltaEvent:
      description: Event sent when the message metadata changes (e.g., stop_reason)
      example:
        delta:
          stop_details: null
          stop_reason: end_turn
          stop_sequence: null
        type: message_delta
        usage:
          output_tokens: 15
      properties:
        delta:
          properties:
            container:
              $ref: '#/components/schemas/AnthropicContainer'
            stop_details:
              $ref: '#/components/schemas/AnthropicRefusalStopDetails'
            stop_reason:
              $ref: '#/components/schemas/ORAnthropicStopReason'
            stop_sequence:
              nullable: true
              type: string
          required:
            - container
            - stop_details
            - stop_reason
            - stop_sequence
          type: object
        type:
          enum:
            - message_delta
          type: string
        usage:
          properties:
            cache_creation_input_tokens:
              nullable: true
              type: integer
            cache_read_input_tokens:
              nullable: true
              type: integer
            input_tokens:
              nullable: true
              type: integer
            iterations:
              items:
                $ref: '#/components/schemas/AnthropicUsageIteration'
              type: array
            output_tokens:
              type: integer
            output_tokens_details:
              $ref: '#/components/schemas/AnthropicOutputTokensDetails'
            server_tool_use:
              nullable: true
              properties:
                web_fetch_requests:
                  type: integer
                web_search_requests:
                  type: integer
              required:
                - web_search_requests
                - web_fetch_requests
              type: object
          required:
            - input_tokens
            - output_tokens
            - output_tokens_details
            - cache_creation_input_tokens
            - cache_read_input_tokens
            - server_tool_use
          type: object
      required:
        - type
        - delta
        - usage
      type: object
    MessagesStartEvent:
      description: Event sent at the start of a streaming message
      example:
        message:
          content: []
          id: msg_01XFDUDYJgAACzvnptvVoYEL
          model: claude-sonnet-4-5-20250929
          role: assistant
          stop_details: null
          stop_reason: null
          stop_sequence: null
          type: message
          usage:
            input_tokens: 12
            output_tokens: 0
        type: message_start
      properties:
        message:
          properties:
            container:
              $ref: '#/components/schemas/AnthropicContainer'
            content:
              items:
                $ref: '#/components/schemas/ORAnthropicContentBlock'
              type: array
            id:
              type: string
            model:
              type: string
            provider:
              enum:
                - AnyScale
                - Atoma
                - Cent-ML
                - CrofAI
                - Enfer
                - GoPomelo
                - HuggingFace
                - Hyperbolic
                - Hyperbolic 2
                - InoCloud
                - Kluster
                - Lambda
                - Lepton
                - Lynn 2
                - Lynn
                - Mancer
                - Meta
                - Modal
                - Nineteen
                - OctoAI
                - Recursal
                - Reflection
                - Replicate
                - SambaNova 2
                - SF Compute
                - Targon
                - Together 2
                - Ubicloud
                - 01.AI
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
                - Clarifai
                - Cloudflare
                - Cohere
                - Crucible
                - Crusoe
                - Darkbloom
                - Decart
                - Deepgram
                - DeepInfra
                - DeepSeek
                - DekaLLM
                - DigitalOcean
                - Featherless
                - Fireworks
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
                - Mara
                - Mancer 2
                - Minimax
                - ModelRun
                - Mistral
                - Modular
                - Moonshot AI
                - Morph
                - NCompass
                - Nebius
                - Nex AGI
                - NextBit
                - Novita
                - Nvidia
                - OpenAI
                - OpenInference
                - Parasail
                - Poolside
                - Perceptron
                - Perplexity
                - Phala
                - Recraft
                - Reka
                - Relace
                - Sakana AI
                - SambaNova
                - Seed
                - SiliconFlow
                - Sourceful
                - StepFun
                - Stealth
                - StreamLake
                - Switchpoint
                - Tenstorrent
                - Together
                - Upstage
                - Venice
                - Wafer
                - WandB
                - Quiver
                - Xiaomi
                - xAI
                - Z.AI
                - FakeProvider
              type: string
            role:
              enum:
                - assistant
              type: string
            stop_details:
              $ref: '#/components/schemas/AnthropicRefusalStopDetails'
            stop_reason:
              nullable: true
            stop_sequence:
              nullable: true
            type:
              enum:
                - message
              type: string
            usage:
              allOf:
                - $ref: '#/components/schemas/AnthropicUsage'
                - properties:
                    iterations:
                      items:
                        $ref: '#/components/schemas/AnthropicUsageIteration'
                      type: array
                    speed:
                      $ref: '#/components/schemas/AnthropicSpeed'
                  type: object
              example:
                cache_creation: null
                cache_creation_input_tokens: null
                cache_read_input_tokens: null
                inference_geo: null
                input_tokens: 100
                output_tokens: 50
                server_tool_use: null
                service_tier: standard
          required:
            - id
            - type
            - role
            - container
            - content
            - model
            - stop_reason
            - stop_details
            - stop_sequence
            - usage
          type: object
        type:
          enum:
            - message_start
          type: string
      required:
        - type
        - message
      type: object
    MessagesStopEvent:
      description: Event sent when the message is complete
      example:
        type: message_stop
      properties:
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
        type:
          enum:
            - message_stop
          type: string
      required:
        - type
      type: object
    MessagesPingEvent:
      description: Keep-alive ping event
      example:
        type: ping
      properties:
        type:
          enum:
            - ping
          type: string
      required:
        - type
      type: object
    ApiErrorType:
      description: Canonical OpenRouter error type, stable across all API formats
      enum:
        - context_length_exceeded
        - max_tokens_exceeded
        - token_limit_exceeded
        - string_too_long
        - authentication
        - permission_denied
        - payment_required
        - rate_limit_exceeded
        - provider_overloaded
        - provider_unavailable
        - invalid_request
        - invalid_prompt
        - not_found
        - precondition_failed
        - payload_too_large
        - unprocessable
        - content_policy_violation
        - refusal
        - invalid_image
        - image_too_large
        - image_too_small
        - unsupported_image_format
        - image_not_found
        - image_download_failed
        - server
        - timeout
        - unmapped
      example: rate_limit_exceeded
      type: string
    AnthropicBase64ImageSource:
      example:
        data: /9j/4AAQ...
        media_type: image/jpeg
        type: base64
      properties:
        data:
          type: string
        media_type:
          $ref: '#/components/schemas/AnthropicImageMimeType'
        type:
          enum:
            - base64
          type: string
      required:
        - type
        - media_type
        - data
      type: object
    AnthropicUrlImageSource:
      example:
        type: url
        url: https://example.com/image.jpg
      properties:
        type:
          enum:
            - url
          type: string
        url:
          type: string
      required:
        - type
        - url
      type: object
    AnthropicBase64PdfSource:
      example:
        data: JVBERi0x...
        media_type: application/pdf
        type: base64
      properties:
        data:
          type: string
        media_type:
          enum:
            - application/pdf
          type: string
        type:
          enum:
            - base64
          type: string
      required:
        - type
        - media_type
        - data
      type: object
    AnthropicPlainTextSource:
      example:
        data: Hello, world!
        media_type: text/plain
        type: text
      properties:
        data:
          type: string
        media_type:
          enum:
            - text/plain
          type: string
        type:
          enum:
            - text
          type: string
      required:
        - type
        - media_type
        - data
      type: object
    AnthropicUrlPdfSource:
      example:
        type: url
        url: https://example.com/document.pdf
      properties:
        type:
          enum:
            - url
          type: string
        url:
          type: string
      required:
        - type
        - url
      type: object
    AnthropicFileDocumentSource:
      example:
        file_id: file_011CNha8iCJcU1wXNR6q4V8w
        type: file
      properties:
        file_id:
          type: string
        type:
          enum:
            - file
          type: string
      required:
        - type
        - file_id
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
          nullable: true
          type: number
        p75:
          description: Maximum p75 latency (seconds)
          format: double
          nullable: true
          type: number
        p90:
          description: Maximum p90 latency (seconds)
          format: double
          nullable: true
          type: number
        p99:
          description: Maximum p99 latency (seconds)
          format: double
          nullable: true
          type: number
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
          nullable: true
          type: number
        p75:
          description: Minimum p75 throughput (tokens/sec)
          format: double
          nullable: true
          type: number
        p90:
          description: Minimum p90 throughput (tokens/sec)
          format: double
          nullable: true
          type: number
        p99:
          description: Minimum p99 throughput (tokens/sec)
          format: double
          nullable: true
          type: number
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
        renews the timer. Defaults to 900 (15 minutes); capped at 2592000 (30
        days).
      example: 900
      type: integer
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
          nullable: true
          type: string
        country:
          nullable: true
          type: string
        region:
          nullable: true
          type: string
        timezone:
          nullable: true
          type: string
        type:
          enum:
            - approximate
          type: string
      type: object
    AnthropicAdvisorToolResult:
      example:
        content:
          text: Advisor response text
          type: advisor_result
        tool_use_id: srvtoolu_01abc
        type: advisor_tool_result
      properties:
        content:
          additionalProperties:
            nullable: true
          type: object
        tool_use_id:
          type: string
        type:
          enum:
            - advisor_tool_result
          type: string
      required:
        - type
        - tool_use_id
        - content
      type: object
    AnthropicBashCodeExecutionToolResult:
      example:
        content:
          content: []
          return_code: 0
          stderr: ''
          stdout: Hello
          type: bash_code_execution_result
        tool_use_id: srvtoolu_01abc
        type: bash_code_execution_tool_result
      properties:
        content:
          $ref: '#/components/schemas/AnthropicBashCodeExecutionContent'
        tool_use_id:
          type: string
        type:
          enum:
            - bash_code_execution_tool_result
          type: string
      required:
        - type
        - content
        - tool_use_id
      type: object
    AnthropicCodeExecutionToolResult:
      example:
        content:
          content: []
          return_code: 0
          stderr: ''
          stdout: Hello
          type: code_execution_result
        tool_use_id: srvtoolu_01abc
        type: code_execution_tool_result
      properties:
        content:
          $ref: '#/components/schemas/AnthropicCodeExecutionContent'
        tool_use_id:
          type: string
        type:
          enum:
            - code_execution_tool_result
          type: string
      required:
        - type
        - content
        - tool_use_id
      type: object
    AnthropicCompactionBlock:
      example:
        content: Compacted summary of conversation.
        type: compaction
      properties:
        content:
          nullable: true
          type: string
        type:
          enum:
            - compaction
          type: string
      required:
        - type
        - content
      type: object
    AnthropicContainerUpload:
      example:
        file_id: file_01abc
        type: container_upload
      properties:
        file_id:
          type: string
        type:
          enum:
            - container_upload
          type: string
      required:
        - type
        - file_id
      type: object
    AnthropicRedactedThinkingBlock:
      example:
        data: cmVkYWN0ZWQ=
        type: redacted_thinking
      properties:
        data:
          type: string
        type:
          enum:
            - redacted_thinking
          type: string
      required:
        - type
        - data
      type: object
    ORAnthropicServerToolUseBlock:
      example:
        caller: null
        id: srvtoolu_01abc
        input: {}
        name: advisor
        type: server_tool_use
      properties:
        caller:
          $ref: '#/components/schemas/ORAnthropicNullableCaller'
        id:
          type: string
        input:
          nullable: true
        name:
          type: string
        type:
          enum:
            - server_tool_use
          type: string
      required:
        - type
        - id
        - name
      type: object
    AnthropicTextBlock:
      example:
        citations: null
        text: Hello, world!
        type: text
      properties:
        citations:
          items:
            $ref: '#/components/schemas/AnthropicTextCitation'
          nullable: true
          type: array
        text:
          type: string
        type:
          enum:
            - text
          type: string
      required:
        - type
        - text
        - citations
      type: object
    AnthropicTextEditorCodeExecutionToolResult:
      example:
        content:
          content: file content
          file_type: text
          num_lines: 10
          start_line: 1
          total_lines: 10
          type: text_editor_code_execution_view_result
        tool_use_id: srvtoolu_01abc
        type: text_editor_code_execution_tool_result
      properties:
        content:
          $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionContent'
        tool_use_id:
          type: string
        type:
          enum:
            - text_editor_code_execution_tool_result
          type: string
      required:
        - type
        - content
        - tool_use_id
      type: object
    AnthropicThinkingBlock:
      example:
        signature: sig_abc123
        thinking: Let me think about this...
        type: thinking
      properties:
        signature:
          type: string
        thinking:
          type: string
        type:
          enum:
            - thinking
          type: string
      required:
        - type
        - thinking
        - signature
      type: object
    AnthropicToolSearchToolResult:
      example:
        content:
          tool_references:
            - tool_name: my_tool
              type: tool_reference
          type: tool_search_tool_search_result
        tool_use_id: srvtoolu_01abc
        type: tool_search_tool_result
      properties:
        content:
          $ref: '#/components/schemas/AnthropicToolSearchContent'
        tool_use_id:
          type: string
        type:
          enum:
            - tool_search_tool_result
          type: string
      required:
        - type
        - content
        - tool_use_id
      type: object
    AnthropicToolUseBlock:
      example:
        caller:
          type: direct
        id: toolu_01abc
        input:
          location: San Francisco
        name: get_weather
        type: tool_use
      properties:
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        id:
          type: string
        input:
          nullable: true
        name:
          type: string
        type:
          enum:
            - tool_use
          type: string
      required:
        - type
        - id
        - caller
        - name
      type: object
    AnthropicWebFetchToolResult:
      example:
        caller:
          type: direct
        content:
          content:
            citations: null
            source:
              data: ''
              media_type: text/plain
              type: text
            title: null
            type: document
          retrieved_at: null
          type: web_fetch_result
          url: https://example.com
        tool_use_id: srvtoolu_01abc
        type: web_fetch_tool_result
      properties:
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        content:
          $ref: '#/components/schemas/AnthropicWebFetchContent'
        tool_use_id:
          type: string
        type:
          enum:
            - web_fetch_tool_result
          type: string
      required:
        - type
        - caller
        - content
        - tool_use_id
      type: object
    AnthropicWebSearchToolResult:
      example:
        caller:
          type: direct
        content: []
        tool_use_id: srvtoolu_01abc
        type: web_search_tool_result
      properties:
        caller:
          $ref: '#/components/schemas/AnthropicCaller'
        content:
          anyOf:
            - items:
                $ref: '#/components/schemas/AnthropicWebSearchResult'
              type: array
            - $ref: '#/components/schemas/AnthropicWebSearchToolResultError'
        tool_use_id:
          type: string
        type:
          enum:
            - web_search_tool_result
          type: string
      required:
        - type
        - caller
        - tool_use_id
        - content
      type: object
    EndpointInfo:
      example:
        model: openai/gpt-4o
        provider: OpenAI
        selected: true
      properties:
        model:
          type: string
        provider:
          type: string
        selected:
          type: boolean
      required:
        - provider
        - model
        - selected
      type: object
    PipelineStageType:
      description: >-
        Categorical kind of a pipeline stage. Multiple plugins can share a type
        (e.g. all guardrail-level plugins emit `guardrail`); the `name` field
        disambiguates which plugin emitted it.
      enum:
        - guardrail
        - plugin
        - server_tools
        - response_healing
        - context_compression
      example: guardrail
      type: string
    AnthropicBaseUsageIteration:
      example:
        cache_creation: null
        cache_creation_input_tokens: 0
        cache_read_input_tokens: 0
        input_tokens: 100
        output_tokens: 50
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
      type: object
    AnthropicCitationCharLocation:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_char_index: 18
        file_id: null
        start_char_index: 0
        type: char_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_char_index:
          type: integer
        file_id:
          nullable: true
          type: string
        start_char_index:
          type: integer
        type:
          enum:
            - char_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_char_index
        - end_char_index
        - file_id
      type: object
    AnthropicCitationContentBlockLocation:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_block_index: 1
        file_id: null
        start_block_index: 0
        type: content_block_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_block_index:
          type: integer
        file_id:
          nullable: true
          type: string
        start_block_index:
          type: integer
        type:
          enum:
            - content_block_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_block_index
        - end_block_index
        - file_id
      type: object
    AnthropicCitationPageLocation:
      example:
        cited_text: Example cited text
        document_index: 0
        document_title: null
        end_page_number: 2
        file_id: null
        start_page_number: 1
        type: page_location
      properties:
        cited_text:
          type: string
        document_index:
          type: integer
        document_title:
          nullable: true
          type: string
        end_page_number:
          type: integer
        file_id:
          nullable: true
          type: string
        start_page_number:
          type: integer
        type:
          enum:
            - page_location
          type: string
      required:
        - type
        - cited_text
        - document_index
        - document_title
        - start_page_number
        - end_page_number
        - file_id
      type: object
    AnthropicImageMimeType:
      enum:
        - image/jpeg
        - image/png
        - image/gif
        - image/webp
      example: image/jpeg
      type: string
    ContainerAutoEnvironment:
      description: An OpenRouter-managed, auto-provisioned ephemeral container.
      example:
        type: container_auto
      properties:
        type:
          enum:
            - container_auto
          type: string
      required:
        - type
      type: object
    ContainerReferenceEnvironment:
      description: Reference to a previously created container to reuse.
      example:
        container_id: cntr_abc123
        type: container_reference
      properties:
        container_id:
          description: Identifier of an existing container to reuse (max 20 characters).
          example: cntr_abc123
          maxLength: 20
          minLength: 1
          pattern: ^[\w-]+$
          type: string
        type:
          enum:
            - container_reference
          type: string
      required:
        - type
        - container_id
      type: object
    AnthropicBashCodeExecutionContent:
      discriminator:
        mapping:
          bash_code_execution_result:
            $ref: '#/components/schemas/AnthropicBashCodeExecutionResult'
          bash_code_execution_tool_result_error:
            $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResultError'
        propertyName: type
      example:
        content: []
        return_code: 0
        stderr: ''
        stdout: Hello
        type: bash_code_execution_result
      oneOf:
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicBashCodeExecutionResult'
    AnthropicCodeExecutionContent:
      discriminator:
        mapping:
          code_execution_result:
            $ref: '#/components/schemas/AnthropicCodeExecutionResult'
          code_execution_tool_result_error:
            $ref: '#/components/schemas/AnthropicCodeExecutionToolResultError'
          encrypted_code_execution_result:
            $ref: '#/components/schemas/AnthropicEncryptedCodeExecutionResult'
        propertyName: type
      example:
        content: []
        return_code: 0
        stderr: ''
        stdout: Hello
        type: code_execution_result
      oneOf:
        - $ref: '#/components/schemas/AnthropicCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicCodeExecutionResult'
        - $ref: '#/components/schemas/AnthropicEncryptedCodeExecutionResult'
    ORAnthropicNullableCaller:
      discriminator:
        mapping:
          code_execution_20250825:
            $ref: '#/components/schemas/AnthropicCodeExecution20250825Caller'
          code_execution_20260120:
            $ref: '#/components/schemas/AnthropicCodeExecution20260120Caller'
          direct:
            $ref: '#/components/schemas/AnthropicDirectCaller'
        propertyName: type
      example: null
      oneOf:
        - $ref: '#/components/schemas/AnthropicDirectCaller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20250825Caller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20260120Caller'
        - nullable: true
    AnthropicTextCitation:
      discriminator:
        mapping:
          char_location:
            $ref: '#/components/schemas/AnthropicCitationCharLocation'
          content_block_location:
            $ref: '#/components/schemas/AnthropicCitationContentBlockLocation'
          page_location:
            $ref: '#/components/schemas/AnthropicCitationPageLocation'
          search_result_location:
            $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
          web_search_result_location:
            $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocation'
        propertyName: type
      example:
        cited_text: Example text
        document_index: 0
        document_title: null
        end_char_index: 10
        file_id: null
        start_char_index: 0
        type: char_location
      oneOf:
        - $ref: '#/components/schemas/AnthropicCitationCharLocation'
        - $ref: '#/components/schemas/AnthropicCitationPageLocation'
        - $ref: '#/components/schemas/AnthropicCitationContentBlockLocation'
        - $ref: '#/components/schemas/AnthropicCitationWebSearchResultLocation'
        - $ref: '#/components/schemas/AnthropicCitationSearchResultLocation'
    AnthropicTextEditorCodeExecutionContent:
      discriminator:
        mapping:
          text_editor_code_execution_create_result:
            $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionCreateResult'
          text_editor_code_execution_str_replace_result:
            $ref: >-
              #/components/schemas/AnthropicTextEditorCodeExecutionStrReplaceResult
          text_editor_code_execution_tool_result_error:
            $ref: >-
              #/components/schemas/AnthropicTextEditorCodeExecutionToolResultError
          text_editor_code_execution_view_result:
            $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionViewResult'
        propertyName: type
      example:
        content: file content
        file_type: text
        num_lines: 10
        start_line: 1
        total_lines: 10
        type: text_editor_code_execution_view_result
      oneOf:
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionToolResultError'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionViewResult'
        - $ref: '#/components/schemas/AnthropicTextEditorCodeExecutionCreateResult'
        - $ref: >-
            #/components/schemas/AnthropicTextEditorCodeExecutionStrReplaceResult
    AnthropicToolSearchContent:
      discriminator:
        mapping:
          tool_search_tool_result_error:
            $ref: '#/components/schemas/AnthropicToolSearchResultError'
          tool_search_tool_search_result:
            $ref: '#/components/schemas/AnthropicToolSearchResult'
        propertyName: type
      example:
        tool_references:
          - tool_name: my_tool
            type: tool_reference
        type: tool_search_tool_search_result
      oneOf:
        - $ref: '#/components/schemas/AnthropicToolSearchResultError'
        - $ref: '#/components/schemas/AnthropicToolSearchResult'
    AnthropicCaller:
      discriminator:
        mapping:
          code_execution_20250825:
            $ref: '#/components/schemas/AnthropicCodeExecution20250825Caller'
          code_execution_20260120:
            $ref: '#/components/schemas/AnthropicCodeExecution20260120Caller'
          direct:
            $ref: '#/components/schemas/AnthropicDirectCaller'
        propertyName: type
      example:
        type: direct
      oneOf:
        - $ref: '#/components/schemas/AnthropicDirectCaller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20250825Caller'
        - $ref: '#/components/schemas/AnthropicCodeExecution20260120Caller'
    AnthropicWebFetchContent:
      discriminator:
        mapping:
          web_fetch_result:
            $ref: '#/components/schemas/AnthropicWebFetchBlock'
          web_fetch_tool_result_error:
            $ref: '#/components/schemas/AnthropicWebFetchToolResultError'
        propertyName: type
      example:
        content:
          citations: null
          source:
            data: ''
            media_type: text/plain
            type: text
          title: null
          type: document
        retrieved_at: null
        type: web_fetch_result
        url: https://example.com
      oneOf:
        - $ref: '#/components/schemas/AnthropicWebFetchToolResultError'
        - $ref: '#/components/schemas/AnthropicWebFetchBlock'
    AnthropicWebSearchResult:
      example:
        encrypted_content: enc_content_0
        page_age: null
        title: Example Page
        type: web_search_result
        url: https://example.com
      properties:
        encrypted_content:
          type: string
        page_age:
          nullable: true
          type: string
        title:
          type: string
        type:
          enum:
            - web_search_result
          type: string
        url:
          type: string
      required:
        - type
        - encrypted_content
        - page_age
        - title
        - url
      type: object
    AnthropicWebSearchToolResultError:
      example:
        error_code: unavailable
        type: web_search_tool_result_error
      properties:
        error_code:
          enum:
            - invalid_tool_input
            - unavailable
            - max_uses_exceeded
            - too_many_requests
            - query_too_long
            - request_too_large
          type: string
        type:
          enum:
            - web_search_tool_result_error
          type: string
      required:
        - type
        - error_code
      type: object
    AnthropicIterationCacheCreation:
      default: null
      example:
        ephemeral_1h_input_tokens: 0
        ephemeral_5m_input_tokens: 0
      nullable: true
      properties:
        ephemeral_1h_input_tokens:
          type: integer
        ephemeral_5m_input_tokens:
          type: integer
      type: object
    AnthropicBashCodeExecutionResult:
      example:
        content: []
        return_code: 0
        stderr: ''
        stdout: Hello
        type: bash_code_execution_result
      properties:
        content:
          items:
            $ref: '#/components/schemas/AnthropicBashCodeExecutionOutput'
          type: array
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          enum:
            - bash_code_execution_result
          type: string
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      type: object
    AnthropicBashCodeExecutionToolResultError:
      example:
        error_code: unavailable
        type: bash_code_execution_tool_result_error
      properties:
        error_code:
          enum:
            - invalid_tool_input
            - unavailable
            - too_many_requests
            - execution_time_exceeded
            - output_file_too_large
          type: string
        type:
          enum:
            - bash_code_execution_tool_result_error
          type: string
      required:
        - error_code
        - type
      type: object
    AnthropicCodeExecutionResult:
      example:
        content: []
        return_code: 0
        stderr: ''
        stdout: Hello
        type: code_execution_result
      properties:
        content:
          items:
            $ref: '#/components/schemas/AnthropicCodeExecutionOutput'
          type: array
        return_code:
          type: integer
        stderr:
          type: string
        stdout:
          type: string
        type:
          enum:
            - code_execution_result
          type: string
      required:
        - content
        - return_code
        - stderr
        - stdout
        - type
      type: object
    AnthropicCodeExecutionToolResultError:
      example:
        error_code: unavailable
        type: code_execution_tool_result_error
      properties:
        error_code:
          $ref: '#/components/schemas/AnthropicServerToolErrorCode'
        type:
          enum:
            - code_execution_tool_result_error
          type: string
      required:
        - error_code
        - type
      type: object
    AnthropicEncryptedCodeExecutionResult:
      example:
        content: []
        encrypted_stdout: enc_stdout
        return_code: 0
        stderr: ''
        type: encrypted_code_execution_result
      properties:
        content:
          items:
            $ref: '#/components/schemas/AnthropicCodeExecutionOutput'
          type: array
        encrypted_stdout:
          type: string
        return_code:
          type: integer
        stderr:
          type: string
        type:
          enum:
            - encrypted_code_execution_result
          type: string
      required:
        - content
        - encrypted_stdout
        - return_code
        - stderr
        - type
      type: object
    AnthropicCodeExecution20250825Caller:
      example:
        tool_id: toolu_01abc
        type: code_execution_20250825
      properties:
        tool_id:
          type: string
        type:
          enum:
            - code_execution_20250825
          type: string
      required:
        - type
        - tool_id
      type: object
    AnthropicCodeExecution20260120Caller:
      example:
        tool_id: toolu_01abc
        type: code_execution_20260120
      properties:
        tool_id:
          type: string
        type:
          enum:
            - code_execution_20260120
          type: string
      required:
        - type
        - tool_id
      type: object
    AnthropicDirectCaller:
      example:
        type: direct
      properties:
        type:
          enum:
            - direct
          type: string
      required:
        - type
      type: object
    AnthropicTextEditorCodeExecutionCreateResult:
      example:
        is_file_update: false
        type: text_editor_code_execution_create_result
      properties:
        is_file_update:
          type: boolean
        type:
          enum:
            - text_editor_code_execution_create_result
          type: string
      required:
        - is_file_update
        - type
      type: object
    AnthropicTextEditorCodeExecutionStrReplaceResult:
      example:
        lines: null
        new_lines: null
        new_start: null
        old_lines: null
        old_start: null
        type: text_editor_code_execution_str_replace_result
      properties:
        lines:
          items:
            type: string
          nullable: true
          type: array
        new_lines:
          nullable: true
          type: integer
        new_start:
          nullable: true
          type: integer
        old_lines:
          nullable: true
          type: integer
        old_start:
          nullable: true
          type: integer
        type:
          enum:
            - text_editor_code_execution_str_replace_result
          type: string
      required:
        - lines
        - new_lines
        - new_start
        - old_lines
        - old_start
        - type
      type: object
    AnthropicTextEditorCodeExecutionToolResultError:
      example:
        error_code: unavailable
        error_message: null
        type: text_editor_code_execution_tool_result_error
      properties:
        error_code:
          enum:
            - invalid_tool_input
            - unavailable
            - too_many_requests
            - execution_time_exceeded
            - file_not_found
          type: string
        error_message:
          nullable: true
          type: string
        type:
          enum:
            - text_editor_code_execution_tool_result_error
          type: string
      required:
        - error_code
        - error_message
        - type
      type: object
    AnthropicTextEditorCodeExecutionViewResult:
      example:
        content: file content
        file_type: text
        num_lines: 10
        start_line: 1
        total_lines: 10
        type: text_editor_code_execution_view_result
      properties:
        content:
          type: string
        file_type:
          enum:
            - text
            - image
            - pdf
          type: string
        num_lines:
          nullable: true
          type: integer
        start_line:
          nullable: true
          type: integer
        total_lines:
          nullable: true
          type: integer
        type:
          enum:
            - text_editor_code_execution_view_result
          type: string
      required:
        - content
        - file_type
        - num_lines
        - start_line
        - total_lines
        - type
      type: object
    AnthropicToolSearchResultError:
      example:
        error_code: unavailable
        error_message: null
        type: tool_search_tool_result_error
      properties:
        error_code:
          $ref: '#/components/schemas/AnthropicServerToolErrorCode'
        error_message:
          nullable: true
          type: string
        type:
          enum:
            - tool_search_tool_result_error
          type: string
      required:
        - error_code
        - error_message
        - type
      type: object
    AnthropicToolSearchResult:
      example:
        tool_references:
          - tool_name: my_tool
            type: tool_reference
        type: tool_search_tool_search_result
      properties:
        tool_references:
          items:
            $ref: '#/components/schemas/AnthropicToolReference'
          type: array
        type:
          enum:
            - tool_search_tool_search_result
          type: string
      required:
        - tool_references
        - type
      type: object
    AnthropicWebFetchBlock:
      example:
        content:
          citations: null
          source:
            data: ''
            media_type: text/plain
            type: text
          title: null
          type: document
        retrieved_at: null
        type: web_fetch_result
        url: https://example.com
      properties:
        content:
          $ref: '#/components/schemas/AnthropicDocumentBlock'
        retrieved_at:
          nullable: true
          type: string
        type:
          enum:
            - web_fetch_result
          type: string
        url:
          type: string
      required:
        - content
        - retrieved_at
        - type
        - url
      type: object
    AnthropicWebFetchToolResultError:
      example:
        error_code: unavailable
        type: web_fetch_tool_result_error
      properties:
        error_code:
          enum:
            - invalid_tool_input
            - url_too_long
            - url_not_allowed
            - url_not_accessible
            - unsupported_content_type
            - too_many_requests
            - max_uses_exceeded
            - unavailable
          type: string
        type:
          enum:
            - web_fetch_tool_result_error
          type: string
      required:
        - type
        - error_code
      type: object
    AnthropicBashCodeExecutionOutput:
      example:
        file_id: file_01abc
        type: bash_code_execution_output
      properties:
        file_id:
          type: string
        type:
          enum:
            - bash_code_execution_output
          type: string
      required:
        - file_id
        - type
      type: object
    AnthropicCodeExecutionOutput:
      example:
        file_id: file_01abc
        type: code_execution_output
      properties:
        file_id:
          type: string
        type:
          enum:
            - code_execution_output
          type: string
      required:
        - file_id
        - type
      type: object
    AnthropicServerToolErrorCode:
      enum:
        - invalid_tool_input
        - unavailable
        - too_many_requests
        - execution_time_exceeded
      example: unavailable
      type: string
    AnthropicToolReference:
      example:
        tool_name: my_tool
        type: tool_reference
      properties:
        tool_name:
          type: string
        type:
          enum:
            - tool_reference
          type: string
      required:
        - tool_name
        - type
      type: object
    AnthropicDocumentBlock:
      example:
        citations: null
        source:
          data: Hello, world!
          media_type: text/plain
          type: text
        title: null
        type: document
      properties:
        citations:
          $ref: '#/components/schemas/AnthropicCitationsConfig'
        source:
          anyOf:
            - $ref: '#/components/schemas/AnthropicBase64PdfSource'
            - $ref: '#/components/schemas/AnthropicPlainTextSource'
        title:
          nullable: true
          type: string
        type:
          enum:
            - document
          type: string
      required:
        - source
        - title
        - type
      type: object
    AnthropicCitationsConfig:
      default: null
      example:
        enabled: true
      nullable: true
      properties:
        enabled:
          type: boolean
      required:
        - enabled
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````