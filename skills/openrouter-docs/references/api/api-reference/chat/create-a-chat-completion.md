> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a chat completion

> Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.



## OpenAPI

````yaml /openapi/openapi.yaml post /chat/completions
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
  /chat/completions:
    post:
      tags:
        - Chat
      summary: Create a chat completion
      description: >-
        Sends a request for a model response for the given chat conversation.
        Supports both streaming and non-streaming modes.
      operationId: sendChatCompletionRequest
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
              max_tokens: 150
              messages:
                - content: You are a helpful assistant.
                  role: system
                - content: What is the capital of France?
                  role: user
              model: openai/gpt-4
              temperature: 0.7
            schema:
              $ref: '#/components/schemas/ChatRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                choices:
                  - finish_reason: stop
                    index: 0
                    message:
                      content: The capital of France is Paris.
                      role: assistant
                created: 1677652288
                id: chatcmpl-123
                model: openai/gpt-4
                object: chat.completion
                usage:
                  completion_tokens: 10
                  prompt_tokens: 25
                  total_tokens: 35
              schema:
                $ref: '#/components/schemas/ChatResult'
            text/event-stream:
              example:
                data:
                  choices:
                    - delta:
                        content: Hello
                        role: assistant
                      finish_reason: null
                      index: 0
                  created: 1677652288
                  id: chatcmpl-123
                  model: openai/gpt-4
                  object: chat.completion.chunk
              schema:
                $ref: '#/components/schemas/ChatStreamingResponse'
              x-speakeasy-sse-sentinel: '[DONE]'
          description: Successful chat completion response
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
        '402':
          content:
            application/json:
              example:
                error:
                  code: 402
                  message: >-
                    Insufficient credits. Add more using
                    https://openrouter.ai/credits
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
          description: Payment Required - Insufficient credits or quota to complete request
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
                  code: 404
                  message: Resource not found
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
          description: Not Found - Resource does not exist
        '408':
          content:
            application/json:
              example:
                error:
                  code: 408
                  message: Operation timed out. Please try again later.
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
          description: Request Timeout - Operation exceeded time limit
        '413':
          content:
            application/json:
              example:
                error:
                  code: 413
                  message: Request payload too large
              schema:
                $ref: '#/components/schemas/PayloadTooLargeResponse'
          description: Payload Too Large - Request payload exceeds size limits
        '422':
          content:
            application/json:
              example:
                error:
                  code: 422
                  message: Invalid argument
              schema:
                $ref: '#/components/schemas/UnprocessableEntityResponse'
          description: Unprocessable Entity - Semantic validation failure
        '429':
          content:
            application/json:
              example:
                error:
                  code: 429
                  message: Rate limit exceeded
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
          description: Too Many Requests - Rate limit exceeded
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
        '502':
          content:
            application/json:
              example:
                error:
                  code: 502
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
          description: Bad Gateway - Provider/upstream API failure
        '503':
          content:
            application/json:
              example:
                error:
                  code: 503
                  message: Service temporarily unavailable
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
          description: Service Unavailable - Service temporarily unavailable
        '524':
          content:
            application/json:
              example:
                error:
                  code: 524
                  message: Request timed out. Please try again later.
              schema:
                $ref: '#/components/schemas/EdgeNetworkTimeoutResponse'
          description: Infrastructure Timeout - Provider request timed out at edge network
        '529':
          content:
            application/json:
              example:
                error:
                  code: 529
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/ProviderOverloadedResponse'
          description: Provider Overloaded - Provider is temporarily overloaded
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
          nullable: true
          type: number
        image_config:
          $ref: '#/components/schemas/ImageConfig'
        logit_bias:
          additionalProperties:
            format: double
            type: number
          description: Token logit bias adjustments
          example:
            '50256': -100
          nullable: true
          type: object
        logprobs:
          description: Return log probabilities
          example: false
          nullable: true
          type: boolean
        max_completion_tokens:
          description: Maximum tokens in completion
          example: 100
          nullable: true
          type: integer
        max_tokens:
          description: >-
            Maximum tokens (deprecated, use max_completion_tokens). Note: some
            providers enforce a minimum of 16.
          example: 100
          nullable: true
          type: integer
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
          nullable: true
          type: number
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
          nullable: true
          type: boolean
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
        presence_penalty:
          description: Presence penalty (-2.0 to 2.0)
          example: 0
          format: double
          nullable: true
          type: number
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
              nullable: true
              type: string
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
          nullable: true
          type: string
        repetition_penalty:
          description: >-
            Penalizes tokens based on how much they have already appeared in the
            text. A value of 1.0 means no penalty. Values above 1.0 penalize
            repeated tokens more strongly. Not all providers support this
            parameter.
          example: 1
          format: double
          nullable: true
          type: number
        response_format:
          description: Response format configuration
          discriminator:
            mapping:
              grammar:
                $ref: '#/components/schemas/ChatFormatGrammarConfig'
              json_object:
                $ref: '#/components/schemas/FormatJsonObjectConfig'
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
            - $ref: '#/components/schemas/FormatJsonObjectConfig'
            - $ref: '#/components/schemas/ChatFormatJsonSchemaConfig'
            - $ref: '#/components/schemas/ChatFormatGrammarConfig'
            - $ref: '#/components/schemas/ChatFormatPythonConfig'
        route:
          $ref: '#/components/schemas/DeprecatedRoute'
        seed:
          description: Random seed for deterministic outputs
          example: 42
          nullable: true
          type: integer
        service_tier:
          description: The service tier to use for processing this request.
          enum:
            - auto
            - default
            - flex
            - priority
            - scale
            - null
          example: auto
          nullable: true
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
        stop:
          anyOf:
            - type: string
            - items:
                type: string
              maxItems: 4
              type: array
            - nullable: true
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
          nullable: true
          type: number
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
          nullable: true
          type: number
        top_k:
          description: >-
            Limits the model to choose from the top K most likely tokens at each
            step. A value of 1 means the model will always pick the most likely
            next token. Not all providers support this parameter.
          example: 40
          nullable: true
          type: integer
        top_logprobs:
          description: Number of top log probabilities to return (0-20)
          example: 5
          nullable: true
          type: integer
        top_p:
          description: Nucleus sampling parameter (0-1)
          example: 1
          format: double
          nullable: true
          type: number
        trace:
          $ref: '#/components/schemas/TraceConfig'
        user:
          description: Unique user identifier
          example: user-123
          type: string
      required:
        - messages
      type: object
    ChatResult:
      description: Chat completion response
      example:
        choices:
          - finish_reason: stop
            index: 0
            message:
              content: The capital of France is Paris.
              role: assistant
        created: 1677652288
        id: chatcmpl-123
        model: openai/gpt-4
        object: chat.completion
        usage:
          completion_tokens: 15
          prompt_tokens: 10
          total_tokens: 25
      properties:
        choices:
          description: List of completion choices
          items:
            $ref: '#/components/schemas/ChatChoice'
          type: array
        created:
          description: Unix timestamp of creation
          example: 1677652288
          type: integer
        id:
          description: Unique completion identifier
          example: chatcmpl-123
          type: string
        model:
          description: Model used for completion
          example: openai/gpt-4
          type: string
        object:
          enum:
            - chat.completion
          type: string
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
        service_tier:
          description: The service tier used by the upstream provider for this request
          example: default
          nullable: true
          type: string
        system_fingerprint:
          description: System fingerprint
          example: fp_44709d6fcb
          nullable: true
          type: string
        usage:
          $ref: '#/components/schemas/ChatUsage'
      required:
        - id
        - choices
        - created
        - model
        - object
        - system_fingerprint
      type: object
    ChatStreamingResponse:
      example:
        data:
          choices:
            - delta:
                content: Hello
                role: assistant
              finish_reason: null
              index: 0
          created: 1677652288
          id: chatcmpl-123
          model: openai/gpt-4
          object: chat.completion.chunk
      properties:
        data:
          $ref: '#/components/schemas/ChatStreamChunk'
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
    PaymentRequiredResponse:
      description: Payment Required - Insufficient credits or quota to complete request
      example:
        error:
          code: 402
          message: Insufficient credits. Add more using https://openrouter.ai/credits
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
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
    RequestTimeoutResponse:
      description: Request Timeout - Operation exceeded time limit
      example:
        error:
          code: 408
          message: Operation timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
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
    PayloadTooLargeResponse:
      description: Payload Too Large - Request payload exceeds size limits
      example:
        error:
          code: 413
          message: Request payload too large
      properties:
        error:
          $ref: '#/components/schemas/PayloadTooLargeResponseErrorData'
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
    UnprocessableEntityResponse:
      description: Unprocessable Entity - Semantic validation failure
      example:
        error:
          code: 422
          message: Invalid argument
      properties:
        error:
          $ref: '#/components/schemas/UnprocessableEntityResponseErrorData'
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
    TooManyRequestsResponse:
      description: Too Many Requests - Rate limit exceeded
      example:
        error:
          code: 429
          message: Rate limit exceeded
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
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
    BadGatewayResponse:
      description: Bad Gateway - Provider/upstream API failure
      example:
        error:
          code: 502
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
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
    ServiceUnavailableResponse:
      description: Service Unavailable - Service temporarily unavailable
      example:
        error:
          code: 503
          message: Service temporarily unavailable
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
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
    EdgeNetworkTimeoutResponse:
      description: Infrastructure Timeout - Provider request timed out at edge network
      example:
        error:
          code: 524
          message: Request timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/EdgeNetworkTimeoutResponseErrorData'
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
    ProviderOverloadedResponse:
      description: Provider Overloaded - Provider is temporarily overloaded
      example:
        error:
          code: 529
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/ProviderOverloadedResponseErrorData'
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
          - items:
              nullable: true
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
    ChatReasoningSummaryVerbosityEnum:
      enum:
        - auto
        - concise
        - detailed
        - null
      example: concise
      nullable: true
      type: string
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
    FormatJsonObjectConfig:
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
      nullable: true
      type: string
      x-fern-ignore: true
      x-speakeasy-deprecation-message: Use providers.sort.partition instead.
      x-speakeasy-ignore: true
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
    ChatStreamOptions:
      description: Streaming configuration options
      example:
        include_usage: true
      nullable: true
      properties:
        include_usage:
          deprecated: true
          description: >-
            Deprecated: This field has no effect. Full usage details are always
            included.
          example: true
          type: boolean
      type: object
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
                  additionalProperties:
                    nullable: true
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
                  nullable: true
                  type: boolean
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
    ChatChoice:
      description: Chat completion choice
      example:
        finish_reason: stop
        index: 0
        logprobs: null
        message:
          content: The capital of France is Paris.
          role: assistant
      properties:
        finish_reason:
          $ref: '#/components/schemas/ChatFinishReasonEnum'
        index:
          description: Choice index
          example: 0
          type: integer
        logprobs:
          $ref: '#/components/schemas/ChatTokenLogprobs'
        message:
          $ref: '#/components/schemas/ChatAssistantMessage'
      required:
        - finish_reason
        - index
        - message
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
    ChatUsage:
      description: Token usage statistics
      example:
        completion_tokens: 15
        completion_tokens_details:
          reasoning_tokens: 5
        cost: 0.0012
        cost_details:
          upstream_inference_completions_cost: 0.0004
          upstream_inference_cost: null
          upstream_inference_prompt_cost: 0.0008
        is_byok: false
        prompt_tokens: 10
        prompt_tokens_details:
          cached_tokens: 2
        server_tool_use_details:
          tool_calls_executed: 2
          tool_calls_requested: 2
        total_tokens: 25
      properties:
        completion_tokens:
          description: Number of tokens in the completion
          type: integer
        completion_tokens_details:
          description: Detailed completion token usage
          nullable: true
          properties:
            accepted_prediction_tokens:
              description: Accepted prediction tokens
              nullable: true
              type: integer
            audio_tokens:
              description: Tokens used for audio output
              nullable: true
              type: integer
            reasoning_tokens:
              description: Tokens used for reasoning
              nullable: true
              type: integer
            rejected_prediction_tokens:
              description: Rejected prediction tokens
              nullable: true
              type: integer
          type: object
        cost:
          description: Cost of the completion
          format: double
          nullable: true
          type: number
        cost_details:
          $ref: '#/components/schemas/CostDetails'
        is_byok:
          description: Whether a request was made using a Bring Your Own Key configuration
          type: boolean
        prompt_tokens:
          description: Number of tokens in the prompt
          type: integer
        prompt_tokens_details:
          description: Detailed prompt token usage
          nullable: true
          properties:
            audio_tokens:
              description: Audio input tokens
              type: integer
            cache_write_tokens:
              description: >-
                Tokens written to cache. Only returned for models with explicit
                caching and cache write pricing.
              type: integer
            cached_tokens:
              description: Cached prompt tokens
              type: integer
            video_tokens:
              description: Video input tokens
              type: integer
          type: object
        server_tool_use_details:
          description: Usage for server-side tool execution (e.g., web search)
          nullable: true
          properties:
            tool_calls_executed:
              description: >-
                Number of OpenRouter server tool calls that executed and
                produced a result
              nullable: true
              type: integer
            tool_calls_requested:
              description: >-
                Total number of OpenRouter server-orchestrated tool calls the
                model requested, across all tool types. Provider-native tools
                (e.g. native web search) are not counted here.
              nullable: true
              type: integer
            web_search_requests:
              description: >-
                Number of web searches performed by server-side tools. For
                server-orchestrated tool calls a web search is also counted in
                tool_calls_requested; provider-native web search may report
                web_search_requests only. Do not sum the two.
              nullable: true
              type: integer
          type: object
        total_tokens:
          description: Total number of tokens
          type: integer
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      type: object
    ChatStreamChunk:
      description: Streaming chat completion chunk
      example:
        choices:
          - delta:
              content: Hello
              role: assistant
            finish_reason: null
            index: 0
        created: 1677652288
        id: chatcmpl-123
        model: openai/gpt-4
        object: chat.completion.chunk
      properties:
        choices:
          description: List of streaming chunk choices
          items:
            $ref: '#/components/schemas/ChatStreamChoice'
          type: array
        created:
          description: Unix timestamp of creation
          example: 1677652288
          type: integer
        error:
          description: Error information
          example:
            code: 429
            message: Rate limit exceeded
            metadata:
              error_type: rate_limit_exceeded
          properties:
            code:
              description: Error code
              example: 429
              format: int32
              type: integer
            message:
              description: Error message
              example: Rate limit exceeded
              type: string
            metadata:
              description: Structured error metadata
              properties:
                error_type:
                  $ref: '#/components/schemas/ApiErrorType'
                provider_code:
                  description: Upstream provider-specific error code, when available
                  type: string
              required:
                - error_type
              type: object
          required:
            - message
            - code
          type: object
        id:
          description: Unique chunk identifier
          example: chatcmpl-123
          type: string
        model:
          description: Model used for completion
          example: openai/gpt-4
          type: string
        object:
          enum:
            - chat.completion.chunk
          type: string
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
        service_tier:
          description: The service tier used by the upstream provider for this request
          example: default
          nullable: true
          type: string
        system_fingerprint:
          description: System fingerprint
          example: fp_44709d6fcb
          type: string
        usage:
          $ref: '#/components/schemas/ChatUsage'
      required:
        - id
        - choices
        - created
        - model
        - object
      type: object
      x-speakeasy-entity: ChatStreamChunk
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
      required:
        - code
        - message
      type: object
    PaymentRequiredResponseErrorData:
      description: Error data for PaymentRequiredResponse
      example:
        code: 402
        message: Insufficient credits. Add more using https://openrouter.ai/credits
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
      required:
        - code
        - message
      type: object
    RequestTimeoutResponseErrorData:
      description: Error data for RequestTimeoutResponse
      example:
        code: 408
        message: Operation timed out. Please try again later.
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
    PayloadTooLargeResponseErrorData:
      description: Error data for PayloadTooLargeResponse
      example:
        code: 413
        message: Request payload too large
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
    UnprocessableEntityResponseErrorData:
      description: Error data for UnprocessableEntityResponse
      example:
        code: 422
        message: Invalid argument
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
    TooManyRequestsResponseErrorData:
      description: Error data for TooManyRequestsResponse
      example:
        code: 429
        message: Rate limit exceeded
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
      required:
        - code
        - message
      type: object
    BadGatewayResponseErrorData:
      description: Error data for BadGatewayResponse
      example:
        code: 502
        message: Provider returned error
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
    ServiceUnavailableResponseErrorData:
      description: Error data for ServiceUnavailableResponse
      example:
        code: 503
        message: Service temporarily unavailable
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
    EdgeNetworkTimeoutResponseErrorData:
      description: Error data for EdgeNetworkTimeoutResponse
      example:
        code: 524
        message: Request timed out. Please try again later.
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
    ProviderOverloadedResponseErrorData:
      description: Error data for ProviderOverloadedResponse
      example:
        code: 529
        message: Provider returned error
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
    ChatAssistantMessage:
      description: Assistant message for requests and responses
      example:
        content: The capital of France is Paris.
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
            - nullable: true
          description: Assistant message content
        images:
          $ref: '#/components/schemas/ChatAssistantImages'
        name:
          description: Optional name for the assistant
          type: string
        reasoning:
          description: Reasoning output
          nullable: true
          type: string
        reasoning_details:
          $ref: '#/components/schemas/ChatReasoningDetails'
        refusal:
          description: Refusal message if content was refused
          nullable: true
          type: string
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
    ProviderName:
      enum:
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
          additionalProperties:
            nullable: true
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
          nullable: true
          type: boolean
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
      description: Cache control for the content part
      example:
        ttl: 5m
        type: ephemeral
    AdvisorServerTool_OpenRouter:
      description: >-
        OpenRouter built-in server tool: consults a higher-intelligence advisor
        model (any OpenRouter model) for guidance mid-generation and returns its
        response. The advisor may run as a sub-agent with its own tools. Include
        multiple entries to offer several named advisors; at most one entry may
        omit `name` to act as the default advisor.
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
        files via the Files API. Requires the `x-openrouter-file-ids:
        openrouter` request header.
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
        analysis models, then asks a judge model to summarize their collective
        output as structured JSON the outer model can synthesize from.
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
    ChatFinishReasonEnum:
      enum:
        - tool_calls
        - stop
        - length
        - content_filter
        - error
        - null
      example: stop
      nullable: true
      type: string
    ChatTokenLogprobs:
      description: Log probabilities for the completion
      example:
        content:
          - bytes: null
            logprob: -0.612345
            token: ' Hello'
            top_logprobs: []
        refusal: null
      nullable: true
      properties:
        content:
          description: Log probabilities for content tokens
          items:
            $ref: '#/components/schemas/ChatTokenLogprob'
          nullable: true
          type: array
        refusal:
          description: Log probabilities for refusal tokens
          items:
            $ref: '#/components/schemas/ChatTokenLogprob'
          nullable: true
          type: array
      required:
        - content
      type: object
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
    ChatStreamChoice:
      description: Streaming completion choice chunk
      example:
        delta:
          content: Hello
          role: assistant
        finish_reason: null
        index: 0
      properties:
        delta:
          $ref: '#/components/schemas/ChatStreamDelta'
        finish_reason:
          $ref: '#/components/schemas/ChatFinishReasonEnum'
        index:
          description: Choice index
          example: 0
          type: integer
        logprobs:
          $ref: '#/components/schemas/ChatTokenLogprobs'
      required:
        - delta
        - finish_reason
        - index
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
        - thinking: Let me work through this step by step...
          type: thinking
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
        max_tool_calls:
          description: >-
            Maximum number of tool-calling steps the advisor sub-agent may take
            during its agentic loop. Capped at 25. Only relevant when the
            advisor is given tools.
          example: 5
          maximum: 25
          minimum: 1
          type: integer
        model:
          description: >-
            Slug of the advisor model to consult (any OpenRouter model). When
            omitted, the executor can choose it via the tool call's `model`
            argument; if neither is set, the model from the outer API request is
            used. The advisor tool itself cannot be the advisor model.
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
        tools:
          description: >-
            Tools the advisor sub-agent may use while forming its advice. The
            advisor runs as an agentic sub-agent over these tools, then returns
            its text. Only OpenRouter server tools are supported — function
            tools are rejected — and the list must not include the advisor tool
            itself.
          items:
            $ref: '#/components/schemas/AdvisorNestedTool'
          type: array
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
            openrouter:web_fetch enabled, then a judge model summarizes the
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
            panelist and the judge model may produce per inner call. Controls
            the total output budget so reasoning-heavy models like GPT-5.5 do
            not exhaust their token allowance before producing visible text.
            When omitted, panelists default to 32000 and the judge to 50000.
          example: 16384
          type: integer
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
            Slug of the judge model that produces the structured analysis JSON.
            Defaults to the model used in the outer API request.
          example: ~anthropic/claude-opus-latest
          type: string
        reasoning:
          description: >-
            Reasoning configuration forwarded to panelist and judge inner calls.
            Use this to control reasoning effort and token budget for models
            that support extended thinking.
          properties:
            effort:
              description: Reasoning effort level for panelist and judge inner calls.
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
                Maximum number of reasoning tokens each panelist and judge model
                may use. Helps bound cost when models allocate too much budget
                to chain-of-thought.
              type: integer
          type: object
        temperature:
          description: >-
            Temperature forwarded to panelist inner calls. The judge always runs
            at temperature 0 regardless of this value. When omitted, the
            provider's default applies.
          example: 0.7
          format: double
          type: number
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
                  nullable: true
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
    SubagentServerToolConfig:
      description: Configuration for the openrouter:subagent server tool.
      example:
        model: ~anthropic/claude-haiku-latest
      properties:
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
            given tools. Accepted and validated but not yet enforced on the
            subagent call.
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
    ChatTokenLogprob:
      description: Token log probability information
      example:
        bytes: null
        logprob: -0.612345
        token: ' Hello'
        top_logprobs:
          - bytes: null
            logprob: -0.612345
            token: ' Hello'
      properties:
        bytes:
          description: UTF-8 bytes of the token
          items:
            type: integer
          nullable: true
          type: array
        logprob:
          description: Log probability of the token
          format: double
          type: number
        token:
          description: The token
          type: string
        top_logprobs:
          description: Top alternative tokens with probabilities
          items:
            properties:
              bytes:
                items:
                  type: integer
                nullable: true
                type: array
              logprob:
                format: double
                type: number
              token:
                type: string
            required:
              - token
              - logprob
              - bytes
            type: object
          type: array
      required:
        - token
        - logprob
        - bytes
        - top_logprobs
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
    ChatStreamDelta:
      description: Delta changes in streaming response
      example:
        content: Hello
        role: assistant
      properties:
        audio:
          allOf:
            - $ref: '#/components/schemas/ChatAudioOutput'
            - description: Audio output data
        content:
          description: Message content delta
          example: Hello
          nullable: true
          type: string
        reasoning:
          description: Reasoning content delta
          example: I need to
          nullable: true
          type: string
        reasoning_details:
          $ref: '#/components/schemas/ChatStreamReasoningDetails'
        refusal:
          description: Refusal message delta
          example: null
          nullable: true
          type: string
        role:
          description: The role of the message author
          enum:
            - assistant
          example: assistant
          type: string
        tool_calls:
          description: Tool calls delta
          items:
            $ref: '#/components/schemas/ChatStreamToolCall'
          type: array
      type: object
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
          $ref: '#/components/schemas/ChatContentVideoInput'
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
    AdvisorNestedTool:
      additionalProperties:
        nullable: true
      description: >-
        A tool made available to the advisor sub-agent. Only OpenRouter server
        tools (e.g. openrouter:web_search) are supported; function tools are
        rejected because the advisor has no way to execute them. The advisor
        tool may not list itself.
      example:
        type: openrouter:web_search
      properties:
        parameters:
          additionalProperties:
            nullable: true
          type: object
        type:
          type: string
      required:
        - type
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
            Maximum number of reasoning tokens the subagent may use. Accepted
            and validated but not yet forwarded to the subagent call.
          type: integer
      type: object
    SubagentNestedTool:
      additionalProperties:
        nullable: true
      description: >-
        A tool made available to the subagent. Only OpenRouter server tools
        (e.g. openrouter:web_search) are supported; function tools are rejected
        because the worker has no way to execute them. The subagent tool may not
        list itself.
      example:
        type: openrouter:web_search
      properties:
        parameters:
          additionalProperties:
            nullable: true
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
    ChatStreamReasoningDetails:
      description: Reasoning details for extended thinking models
      example:
        - text: Let me think about this...
          type: text
      items:
        $ref: '#/components/schemas/ReasoningDetailUnion'
      type: array
    ChatStreamToolCall:
      description: Tool call delta for streaming responses
      example:
        function:
          arguments: '{"location": "..."}'
          name: get_weather
        id: call_abc123
        index: 0
        type: function
      properties:
        function:
          description: Function call details
          properties:
            arguments:
              description: Function arguments as JSON string
              example: '{"location": "..."}'
              type: string
            name:
              description: Function name
              example: get_weather
              type: string
          type: object
        id:
          description: Tool call identifier
          example: call_abc123
          type: string
        index:
          description: Tool call index in the array
          example: 0
          type: integer
        type:
          description: Tool call type
          enum:
            - function
          example: function
          type: string
      required:
        - index
      type: object
    ChatContentVideoInput:
      description: Video input object
      example:
        url: https://example.com/video.mp4
      properties:
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
          nullable: true
          type: string
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
          nullable: true
          type: string
        index:
          type: integer
        result:
          type: string
        tool_call_id:
          nullable: true
          type: string
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
          nullable: true
          type: string
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
          nullable: true
          type: string
        index:
          type: integer
        signature:
          nullable: true
          type: string
        text:
          nullable: true
          type: string
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
    ReasoningFormat:
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
        - null
      example: unknown
      nullable: true
      type: string
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````