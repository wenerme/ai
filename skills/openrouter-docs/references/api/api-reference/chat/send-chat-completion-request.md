# Create a chat completion

POST https://openrouter.ai/api/v1/chat/completions
Content-Type: application/json

Sends a request for a model response for the given chat conversation. Supports both streaming and non-streaming modes.

Reference: https://openrouter.ai/docs/api/api-reference/chat/send-chat-completion-request

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /chat/completions:
    post:
      operationId: send-chat-completion-request
      summary: Create a chat completion
      description: >-
        Sends a request for a model response for the given chat conversation.
        Supports both streaming and non-streaming modes.
      tags:
        - subpackage_chat
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful chat completion response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatResult'
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '402':
          description: Payment Required - Insufficient credits or quota to complete request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '408':
          description: Request Timeout - Operation exceeded time limit
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
        '413':
          description: Payload Too Large - Request payload exceeds size limits
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PayloadTooLargeResponse'
        '422':
          description: Unprocessable Entity - Semantic validation failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnprocessableEntityResponse'
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
        '502':
          description: Bad Gateway - Provider/upstream API failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
        '503':
          description: Service Unavailable - Service temporarily unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    DataCollection:
      type: string
      enum:
        - deny
        - allow
      description: >-
        Data collection setting. If no available model provider meets the
        requirement, your request will return an error.

        - allow: (default) allow providers which store user data non-transiently
        and may train on it


        - deny: use only providers which do not collect user data.
      title: DataCollection
    ProviderName:
      type: string
      enum:
        - AkashML
        - AI21
        - AionLabs
        - Alibaba
        - Ambient
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
        - Crusoe
        - DeepInfra
        - DeepSeek
        - Featherless
        - Fireworks
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
        - Hyperbolic
        - Inception
        - Inceptron
        - InferenceNet
        - Ionstream
        - Infermatic
        - Io Net
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
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Perplexity
        - Phala
        - Reka
        - Relace
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Together
        - Upstage
        - Venice
        - WandB
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      title: ProviderName
    ChatRequestProviderOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ChatRequestProviderOrderItems
    ChatRequestProviderOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ChatRequestProviderOnlyItems
    ChatRequestProviderIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ChatRequestProviderIgnoreItems
    Quantization:
      type: string
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
      title: Quantization
    ChatRequestProviderSort:
      type: object
      properties: {}
      title: ChatRequestProviderSort
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ChatRequestProviderMaxPriceCompletion:
      type: object
      properties: {}
      title: ChatRequestProviderMaxPriceCompletion
    ChatRequestProviderMaxPriceImage:
      type: object
      properties: {}
      title: ChatRequestProviderMaxPriceImage
    ChatRequestProviderMaxPriceAudio:
      type: object
      properties: {}
      title: ChatRequestProviderMaxPriceAudio
    ChatRequestProviderMaxPriceRequest:
      type: object
      properties: {}
      title: ChatRequestProviderMaxPriceRequest
    ChatRequestProviderMaxPrice:
      type: object
      properties:
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/ChatRequestProviderMaxPriceCompletion'
        image:
          $ref: '#/components/schemas/ChatRequestProviderMaxPriceImage'
        audio:
          $ref: '#/components/schemas/ChatRequestProviderMaxPriceAudio'
        request:
          $ref: '#/components/schemas/ChatRequestProviderMaxPriceRequest'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: ChatRequestProviderMaxPrice
    PercentileThroughputCutoffs:
      type: object
      properties:
        p50:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p50 throughput (tokens/sec)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p75 throughput (tokens/sec)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p90 throughput (tokens/sec)
        p99:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p99 throughput (tokens/sec)
      description: >-
        Percentile-based throughput cutoffs. All specified cutoffs must be met
        for an endpoint to be preferred.
      title: PercentileThroughputCutoffs
    PreferredMinThroughput:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileThroughputCutoffs'
        - description: Any type
      description: >-
        Preferred minimum throughput (in tokens per second). Can be a number
        (applies to p50) or an object with percentile-specific cutoffs.
        Endpoints below the threshold(s) may still be used, but are
        deprioritized in routing. When using fallback models, this may cause a
        fallback model to be used instead of the primary model if it meets the
        threshold.
      title: PreferredMinThroughput
    PercentileLatencyCutoffs:
      type: object
      properties:
        p50:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p50 latency (seconds)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p75 latency (seconds)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p90 latency (seconds)
        p99:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p99 latency (seconds)
      description: >-
        Percentile-based latency cutoffs. All specified cutoffs must be met for
        an endpoint to be preferred.
      title: PercentileLatencyCutoffs
    PreferredMaxLatency:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileLatencyCutoffs'
        - description: Any type
      description: >-
        Preferred maximum latency (in seconds). Can be a number (applies to p50)
        or an object with percentile-specific cutoffs. Endpoints above the
        threshold(s) may still be used, but are deprioritized in routing. When
        using fallback models, this may cause a fallback model to be used
        instead of the primary model if it meets the threshold.
      title: PreferredMaxLatency
    ChatRequestProvider:
      type: object
      properties:
        allow_fallbacks:
          type:
            - boolean
            - 'null'
          description: >
            Whether to allow backup providers to serve requests

            - true: (default) when the primary provider (or your custom
            providers in "order") is unavailable, use the next best provider.

            - false: use only the primary/custom provider, and return the
            upstream error if it's unavailable.
        require_parameters:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
        data_collection:
          $ref: '#/components/schemas/DataCollection'
        zdr:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
        enforce_distillable_text:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
        order:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ChatRequestProviderOrderItems'
          description: >-
            An ordered list of provider slugs. The router will attempt to use
            the first provider in the subset of this list that supports your
            requested model, and fall back to the next if it is unavailable. If
            no providers are available, the request will fail with an error
            message.
        only:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ChatRequestProviderOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ChatRequestProviderIgnoreItems'
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
        quantizations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/Quantization'
          description: A list of quantization levels to filter the provider by.
        sort:
          $ref: '#/components/schemas/ChatRequestProviderSort'
        max_price:
          $ref: '#/components/schemas/ChatRequestProviderMaxPrice'
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      title: ChatRequestProvider
    ChatRequestPluginsItemsOneOf0Id:
      type: string
      enum:
        - auto-router
      title: ChatRequestPluginsItemsOneOf0Id
    ChatRequestPluginsItems0:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf0Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
        allowed_models:
          type: array
          items:
            type: string
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). When not specified, uses the default supported
            models list.
      required:
        - id
      title: ChatRequestPluginsItems0
    ChatRequestPluginsItemsOneOf1Id:
      type: string
      enum:
        - moderation
      title: ChatRequestPluginsItemsOneOf1Id
    ChatRequestPluginsItems1:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf1Id'
      required:
        - id
      title: ChatRequestPluginsItems1
    ChatRequestPluginsItemsOneOf2Id:
      type: string
      enum:
        - web
      title: ChatRequestPluginsItemsOneOf2Id
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
        - firecrawl
        - parallel
      description: The search engine to use for web search.
      title: WebSearchEngine
    ChatRequestPluginsItems2:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf2Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the web-search plugin for this request.
            Defaults to true.
        max_results:
          type: number
          format: double
        search_prompt:
          type: string
        engine:
          $ref: '#/components/schemas/WebSearchEngine'
        include_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to restrict web search results to. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
        exclude_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to exclude from web search results. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
      required:
        - id
      title: ChatRequestPluginsItems2
    ChatRequestPluginsItemsOneOf3Id:
      type: string
      enum:
        - file-parser
      title: ChatRequestPluginsItemsOneOf3Id
    PdfParserEngine0:
      type: string
      enum:
        - mistral-ocr
        - native
        - cloudflare-ai
      title: PdfParserEngine0
    PdfParserEngine1:
      type: string
      enum:
        - pdf-text
      title: PdfParserEngine1
    PDFParserEngine:
      oneOf:
        - $ref: '#/components/schemas/PdfParserEngine0'
        - $ref: '#/components/schemas/PdfParserEngine1'
      description: >-
        The engine to use for parsing PDF files. "pdf-text" is deprecated and
        automatically redirected to "cloudflare-ai".
      title: PDFParserEngine
    PDFParserOptions:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/PDFParserEngine'
      description: Options for PDF parsing.
      title: PDFParserOptions
    ChatRequestPluginsItems3:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf3Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      title: ChatRequestPluginsItems3
    ChatRequestPluginsItemsOneOf4Id:
      type: string
      enum:
        - response-healing
      title: ChatRequestPluginsItemsOneOf4Id
    ChatRequestPluginsItems4:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf4Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
      required:
        - id
      title: ChatRequestPluginsItems4
    ChatRequestPluginsItemsOneOf5Id:
      type: string
      enum:
        - context-compression
      title: ChatRequestPluginsItemsOneOf5Id
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
    ChatRequestPluginsItems5:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ChatRequestPluginsItemsOneOf5Id'
        enabled:
          type: boolean
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
      required:
        - id
      title: ChatRequestPluginsItems5
    ChatRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/ChatRequestPluginsItems0'
        - $ref: '#/components/schemas/ChatRequestPluginsItems1'
        - $ref: '#/components/schemas/ChatRequestPluginsItems2'
        - $ref: '#/components/schemas/ChatRequestPluginsItems3'
        - $ref: '#/components/schemas/ChatRequestPluginsItems4'
        - $ref: '#/components/schemas/ChatRequestPluginsItems5'
      title: ChatRequestPluginsItems
    ChatRequestTrace:
      type: object
      properties:
        trace_id:
          type: string
        trace_name:
          type: string
        span_name:
          type: string
        generation_name:
          type: string
        parent_span_id:
          type: string
      description: >-
        Metadata for observability and tracing. Known keys (trace_id,
        trace_name, span_name, generation_name, parent_span_id) have special
        handling. Additional keys are passed through as custom metadata to
        configured broadcast destinations.
      title: ChatRequestTrace
    ChatSystemMessageRole:
      type: string
      enum:
        - system
      title: ChatSystemMessageRole
    ChatContentTextType:
      type: string
      enum:
        - text
      title: ChatContentTextType
    ChatContentCacheControlType:
      type: string
      enum:
        - ephemeral
      title: ChatContentCacheControlType
    ChatContentCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: ChatContentCacheControlTtl
    ChatContentCacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentCacheControlType'
        ttl:
          $ref: '#/components/schemas/ChatContentCacheControlTtl'
      required:
        - type
      description: Cache control for the content part
      title: ChatContentCacheControl
    ChatContentText:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentTextType'
        text:
          type: string
        cache_control:
          $ref: '#/components/schemas/ChatContentCacheControl'
      required:
        - type
        - text
      description: Text content part
      title: ChatContentText
    ChatSystemMessageContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentText'
      title: ChatSystemMessageContent1
    ChatSystemMessageContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/ChatSystemMessageContent1'
      description: System message content
      title: ChatSystemMessageContent
    ChatSystemMessage:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/ChatSystemMessageRole'
        content:
          $ref: '#/components/schemas/ChatSystemMessageContent'
          description: System message content
        name:
          type: string
          description: Optional name for the system message
      required:
        - role
        - content
      description: System message for setting behavior
      title: ChatSystemMessage
    ChatUserMessageRole:
      type: string
      enum:
        - user
      title: ChatUserMessageRole
    ChatContentImageType:
      type: string
      enum:
        - image_url
      title: ChatContentImageType
    ChatContentImageImageUrlDetail:
      type: string
      enum:
        - auto
        - low
        - high
      description: Image detail level for vision models
      title: ChatContentImageImageUrlDetail
    ChatContentImageImageUrl:
      type: object
      properties:
        url:
          type: string
          description: 'URL of the image (data: URLs supported)'
        detail:
          $ref: '#/components/schemas/ChatContentImageImageUrlDetail'
          description: Image detail level for vision models
      required:
        - url
      title: ChatContentImageImageUrl
    ChatContentImage:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentImageType'
        image_url:
          $ref: '#/components/schemas/ChatContentImageImageUrl'
      required:
        - type
        - image_url
      description: Image content part for vision models
      title: ChatContentImage
    ChatContentAudioType:
      type: string
      enum:
        - input_audio
      title: ChatContentAudioType
    ChatContentAudioInputAudio:
      type: object
      properties:
        data:
          type: string
          description: Base64 encoded audio data
        format:
          type: string
          description: >-
            Audio format (e.g., wav, mp3, flac, m4a, ogg, aiff, aac, pcm16,
            pcm24). Supported formats vary by provider.
      required:
        - data
        - format
      title: ChatContentAudioInputAudio
    ChatContentAudio:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentAudioType'
        input_audio:
          $ref: '#/components/schemas/ChatContentAudioInputAudio'
      required:
        - type
        - input_audio
      description: Audio input content part. Supported audio formats vary by provider.
      title: ChatContentAudio
    LegacyChatContentVideoType:
      type: string
      enum:
        - input_video
      title: LegacyChatContentVideoType
    ChatContentVideoInput:
      type: object
      properties:
        url:
          type: string
          description: 'URL of the video (data: URLs supported)'
      required:
        - url
      description: Video input object
      title: ChatContentVideoInput
    Legacy_ChatContentVideo:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/LegacyChatContentVideoType'
        video_url:
          $ref: '#/components/schemas/ChatContentVideoInput'
      required:
        - type
        - video_url
      description: Video input content part (legacy format - deprecated)
      title: Legacy_ChatContentVideo
    ChatContentVideoType:
      type: string
      enum:
        - video_url
      title: ChatContentVideoType
    ChatContentVideo:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentVideoType'
        video_url:
          $ref: '#/components/schemas/ChatContentVideoInput'
      required:
        - type
        - video_url
      description: Video input content part
      title: ChatContentVideo
    ChatContentItems3:
      oneOf:
        - $ref: '#/components/schemas/Legacy_ChatContentVideo'
        - $ref: '#/components/schemas/ChatContentVideo'
      title: ChatContentItems3
    ChatContentFileType:
      type: string
      enum:
        - file
      title: ChatContentFileType
    ChatContentFileFile:
      type: object
      properties:
        file_data:
          type: string
          description: File content as base64 data URL or URL
        file_id:
          type: string
          description: File ID for previously uploaded files
        filename:
          type: string
          description: Original filename
      title: ChatContentFileFile
    ChatContentFile:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatContentFileType'
        file:
          $ref: '#/components/schemas/ChatContentFileFile'
      required:
        - type
        - file
      description: File content part for document processing
      title: ChatContentFile
    ChatContentItems:
      oneOf:
        - $ref: '#/components/schemas/ChatContentText'
        - $ref: '#/components/schemas/ChatContentImage'
        - $ref: '#/components/schemas/ChatContentAudio'
        - $ref: '#/components/schemas/ChatContentItems3'
        - $ref: '#/components/schemas/ChatContentFile'
      description: Content part for chat completion messages
      title: ChatContentItems
    ChatUserMessageContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentItems'
      title: ChatUserMessageContent1
    ChatUserMessageContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/ChatUserMessageContent1'
      description: User message content
      title: ChatUserMessageContent
    ChatUserMessage:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/ChatUserMessageRole'
        content:
          $ref: '#/components/schemas/ChatUserMessageContent'
          description: User message content
        name:
          type: string
          description: Optional name for the user
      required:
        - role
        - content
      description: User message
      title: ChatUserMessage
    ChatDeveloperMessageRole:
      type: string
      enum:
        - developer
      title: ChatDeveloperMessageRole
    ChatDeveloperMessageContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentText'
      title: ChatDeveloperMessageContent1
    ChatDeveloperMessageContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/ChatDeveloperMessageContent1'
      description: Developer message content
      title: ChatDeveloperMessageContent
    ChatDeveloperMessage:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/ChatDeveloperMessageRole'
        content:
          $ref: '#/components/schemas/ChatDeveloperMessageContent'
          description: Developer message content
        name:
          type: string
          description: Optional name for the developer message
      required:
        - role
        - content
      description: Developer message
      title: ChatDeveloperMessage
    ChatAssistantMessageRole:
      type: string
      enum:
        - assistant
      title: ChatAssistantMessageRole
    ChatAssistantMessageContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentItems'
      title: ChatAssistantMessageContent1
    ChatAssistantMessageContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/ChatAssistantMessageContent1'
        - description: Any type
      description: Assistant message content
      title: ChatAssistantMessageContent
    ChatToolCallType:
      type: string
      enum:
        - function
      title: ChatToolCallType
    ChatToolCallFunction:
      type: object
      properties:
        name:
          type: string
          description: Function name to call
        arguments:
          type: string
          description: Function arguments as JSON string
      required:
        - name
        - arguments
      title: ChatToolCallFunction
    ChatToolCall:
      type: object
      properties:
        id:
          type: string
          description: Tool call identifier
        type:
          $ref: '#/components/schemas/ChatToolCallType'
        function:
          $ref: '#/components/schemas/ChatToolCallFunction'
      required:
        - id
        - type
        - function
      description: Tool call made by the assistant
      title: ChatToolCall
    ReasoningDetailSummaryType:
      type: string
      enum:
        - reasoning.summary
      title: ReasoningDetailSummaryType
    ReasoningDetailSummaryFormat:
      type: string
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
      title: ReasoningDetailSummaryFormat
    ReasoningDetailSummary:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ReasoningDetailSummaryType'
        summary:
          type: string
        id:
          type:
            - string
            - 'null'
        format:
          oneOf:
            - $ref: '#/components/schemas/ReasoningDetailSummaryFormat'
            - type: 'null'
        index:
          type: number
          format: double
      required:
        - type
        - summary
      description: Reasoning detail summary schema
      title: ReasoningDetailSummary
    ReasoningDetailEncryptedType:
      type: string
      enum:
        - reasoning.encrypted
      title: ReasoningDetailEncryptedType
    ReasoningDetailEncryptedFormat:
      type: string
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
      title: ReasoningDetailEncryptedFormat
    ReasoningDetailEncrypted:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ReasoningDetailEncryptedType'
        data:
          type: string
        id:
          type:
            - string
            - 'null'
        format:
          oneOf:
            - $ref: '#/components/schemas/ReasoningDetailEncryptedFormat'
            - type: 'null'
        index:
          type: number
          format: double
      required:
        - type
        - data
      description: Reasoning detail encrypted schema
      title: ReasoningDetailEncrypted
    ReasoningDetailTextType:
      type: string
      enum:
        - reasoning.text
      title: ReasoningDetailTextType
    ReasoningDetailTextFormat:
      type: string
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
      title: ReasoningDetailTextFormat
    ReasoningDetailText:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ReasoningDetailTextType'
        text:
          type:
            - string
            - 'null'
        signature:
          type:
            - string
            - 'null'
        id:
          type:
            - string
            - 'null'
        format:
          oneOf:
            - $ref: '#/components/schemas/ReasoningDetailTextFormat'
            - type: 'null'
        index:
          type: number
          format: double
      required:
        - type
      description: Reasoning detail text schema
      title: ReasoningDetailText
    ReasoningDetailUnion:
      oneOf:
        - $ref: '#/components/schemas/ReasoningDetailSummary'
        - $ref: '#/components/schemas/ReasoningDetailEncrypted'
        - $ref: '#/components/schemas/ReasoningDetailText'
      description: Reasoning detail union schema
      title: ReasoningDetailUnion
    ChatReasoningDetails:
      type: array
      items:
        $ref: '#/components/schemas/ReasoningDetailUnion'
      description: Reasoning details for extended thinking models
      title: ChatReasoningDetails
    ChatAssistantImagesItemsImageUrl:
      type: object
      properties:
        url:
          type: string
          description: URL or base64-encoded data of the generated image
      required:
        - url
      title: ChatAssistantImagesItemsImageUrl
    ChatAssistantImagesItems:
      type: object
      properties:
        image_url:
          $ref: '#/components/schemas/ChatAssistantImagesItemsImageUrl'
      required:
        - image_url
      title: ChatAssistantImagesItems
    ChatAssistantImages:
      type: array
      items:
        $ref: '#/components/schemas/ChatAssistantImagesItems'
      description: Generated images from image generation models
      title: ChatAssistantImages
    ChatAudioOutput:
      type: object
      properties:
        id:
          type: string
          description: Audio output identifier
        expires_at:
          type: integer
          description: Audio expiration timestamp
        data:
          type: string
          description: Base64 encoded audio data
        transcript:
          type: string
          description: Audio transcript
      description: Audio output data or reference
      title: ChatAudioOutput
    ChatAssistantMessage:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/ChatAssistantMessageRole'
        content:
          $ref: '#/components/schemas/ChatAssistantMessageContent'
          description: Assistant message content
        name:
          type: string
          description: Optional name for the assistant
        tool_calls:
          type: array
          items:
            $ref: '#/components/schemas/ChatToolCall'
          description: Tool calls made by the assistant
        refusal:
          type:
            - string
            - 'null'
          description: Refusal message if content was refused
        reasoning:
          type:
            - string
            - 'null'
          description: Reasoning output
        reasoning_details:
          $ref: '#/components/schemas/ChatReasoningDetails'
        images:
          $ref: '#/components/schemas/ChatAssistantImages'
        audio:
          $ref: '#/components/schemas/ChatAudioOutput'
      required:
        - role
      description: Assistant message for requests and responses
      title: ChatAssistantMessage
    ChatToolMessageRole:
      type: string
      enum:
        - tool
      title: ChatToolMessageRole
    ChatToolMessageContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentItems'
      title: ChatToolMessageContent1
    ChatToolMessageContent:
      oneOf:
        - type: string
        - $ref: '#/components/schemas/ChatToolMessageContent1'
      description: Tool response content
      title: ChatToolMessageContent
    ChatToolMessage:
      type: object
      properties:
        role:
          $ref: '#/components/schemas/ChatToolMessageRole'
        content:
          $ref: '#/components/schemas/ChatToolMessageContent'
          description: Tool response content
        tool_call_id:
          type: string
          description: ID of the assistant message tool call this message responds to
      required:
        - role
        - content
        - tool_call_id
      description: Tool response message
      title: ChatToolMessage
    ChatMessages:
      oneOf:
        - $ref: '#/components/schemas/ChatSystemMessage'
        - $ref: '#/components/schemas/ChatUserMessage'
        - $ref: '#/components/schemas/ChatDeveloperMessage'
        - $ref: '#/components/schemas/ChatAssistantMessage'
        - $ref: '#/components/schemas/ChatToolMessage'
      description: Chat completion message with role-based discrimination
      title: ChatMessages
    ModelName:
      type: string
      description: Model to use for completion
      title: ModelName
    ChatModelNamesItems:
      type: object
      properties: {}
      title: ChatModelNamesItems
    ChatModelNames:
      type: array
      items:
        $ref: '#/components/schemas/ChatModelNamesItems'
      description: Models to use for completion
      title: ChatModelNames
    ChatRequestReasoningEffort:
      type: string
      enum:
        - xhigh
        - high
        - medium
        - low
        - minimal
        - none
      description: Constrains effort on reasoning for reasoning models
      title: ChatRequestReasoningEffort
    ChatReasoningSummaryVerbosityEnum:
      type: string
      enum:
        - auto
        - concise
        - detailed
      title: ChatReasoningSummaryVerbosityEnum
    ChatRequestReasoningSummary:
      oneOf:
        - $ref: '#/components/schemas/ChatReasoningSummaryVerbosityEnum'
        - description: Any type
        - description: Any type
      title: ChatRequestReasoningSummary
    ChatRequestReasoning:
      type: object
      properties:
        effort:
          oneOf:
            - $ref: '#/components/schemas/ChatRequestReasoningEffort'
            - type: 'null'
          description: Constrains effort on reasoning for reasoning models
        summary:
          $ref: '#/components/schemas/ChatRequestReasoningSummary'
      description: Configuration options for reasoning models
      title: ChatRequestReasoning
    ChatFormatTextConfigType:
      type: string
      enum:
        - text
      title: ChatFormatTextConfigType
    ChatFormatTextConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatFormatTextConfigType'
      required:
        - type
      description: Default text response format
      title: ChatFormatTextConfig
    FormatJsonObjectConfigType:
      type: string
      enum:
        - json_object
      title: FormatJsonObjectConfigType
    FormatJsonObjectConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/FormatJsonObjectConfigType'
      required:
        - type
      description: JSON object response format
      title: FormatJsonObjectConfig
    ChatFormatJsonSchemaConfigType:
      type: string
      enum:
        - json_schema
      title: ChatFormatJsonSchemaConfigType
    ChatJsonSchemaConfig:
      type: object
      properties:
        name:
          type: string
          description: Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
        description:
          type: string
          description: Schema description for the model
        schema:
          type: object
          additionalProperties:
            description: Any type
          description: JSON Schema object
        strict:
          type:
            - boolean
            - 'null'
          description: Enable strict schema adherence
      required:
        - name
      description: JSON Schema configuration object
      title: ChatJsonSchemaConfig
    ChatFormatJsonSchemaConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatFormatJsonSchemaConfigType'
        json_schema:
          $ref: '#/components/schemas/ChatJsonSchemaConfig'
      required:
        - type
        - json_schema
      description: JSON Schema response format for structured outputs
      title: ChatFormatJsonSchemaConfig
    ChatFormatGrammarConfigType:
      type: string
      enum:
        - grammar
      title: ChatFormatGrammarConfigType
    ChatFormatGrammarConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatFormatGrammarConfigType'
        grammar:
          type: string
          description: Custom grammar for text generation
      required:
        - type
        - grammar
      description: Custom grammar response format
      title: ChatFormatGrammarConfig
    ChatFormatPythonConfigType:
      type: string
      enum:
        - python
      title: ChatFormatPythonConfigType
    ChatFormatPythonConfig:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatFormatPythonConfigType'
      required:
        - type
      description: Python code response format
      title: ChatFormatPythonConfig
    ChatRequestResponseFormat:
      oneOf:
        - $ref: '#/components/schemas/ChatFormatTextConfig'
        - $ref: '#/components/schemas/FormatJsonObjectConfig'
        - $ref: '#/components/schemas/ChatFormatJsonSchemaConfig'
        - $ref: '#/components/schemas/ChatFormatGrammarConfig'
        - $ref: '#/components/schemas/ChatFormatPythonConfig'
      description: Response format configuration
      title: ChatRequestResponseFormat
    ChatRequestStop:
      oneOf:
        - type: string
        - type: array
          items:
            type: string
        - description: Any type
      description: Stop sequences (up to 4)
      title: ChatRequestStop
    ChatStreamOptions:
      type: object
      properties:
        include_usage:
          type: boolean
          description: >-
            Deprecated: This field has no effect. Full usage details are always
            included.
      description: Streaming configuration options
      title: ChatStreamOptions
    ChatToolChoice0:
      type: string
      enum:
        - none
      title: ChatToolChoice0
    ChatToolChoice1:
      type: string
      enum:
        - auto
      title: ChatToolChoice1
    ChatToolChoice2:
      type: string
      enum:
        - required
      title: ChatToolChoice2
    ChatNamedToolChoiceType:
      type: string
      enum:
        - function
      title: ChatNamedToolChoiceType
    ChatNamedToolChoiceFunction:
      type: object
      properties:
        name:
          type: string
          description: Function name to call
      required:
        - name
      title: ChatNamedToolChoiceFunction
    ChatNamedToolChoice:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatNamedToolChoiceType'
        function:
          $ref: '#/components/schemas/ChatNamedToolChoiceFunction'
      required:
        - type
        - function
      description: Named tool choice for specific function
      title: ChatNamedToolChoice
    ChatToolChoice:
      oneOf:
        - $ref: '#/components/schemas/ChatToolChoice0'
        - $ref: '#/components/schemas/ChatToolChoice1'
        - $ref: '#/components/schemas/ChatToolChoice2'
        - $ref: '#/components/schemas/ChatNamedToolChoice'
      description: Tool choice configuration
      title: ChatToolChoice
    ChatFunctionToolOneOf0Type:
      type: string
      enum:
        - function
      title: ChatFunctionToolOneOf0Type
    ChatFunctionToolOneOf0Function:
      type: object
      properties:
        name:
          type: string
          description: Function name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
        description:
          type: string
          description: Function description for the model
        parameters:
          type: object
          additionalProperties:
            description: Any type
          description: Function parameters as JSON Schema object
        strict:
          type:
            - boolean
            - 'null'
          description: Enable strict schema adherence
      required:
        - name
      description: Function definition for tool calling
      title: ChatFunctionToolOneOf0Function
    ChatFunctionTool0:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatFunctionToolOneOf0Type'
        function:
          $ref: '#/components/schemas/ChatFunctionToolOneOf0Function'
          description: Function definition for tool calling
        cache_control:
          $ref: '#/components/schemas/ChatContentCacheControl'
      required:
        - type
        - function
      title: ChatFunctionTool0
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerToolParameters:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      title: DatetimeServerToolParameters
    DatetimeServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolParameters'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
    ChatWebSearchServerToolType:
      type: string
      enum:
        - openrouter:web_search
      title: ChatWebSearchServerToolType
    ChatWebSearchServerToolParametersEngine:
      type: string
      enum:
        - auto
        - native
        - exa
        - firecrawl
        - parallel
      description: >-
        Which search engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl
        (requires BYOK). "parallel" uses the Parallel search API.
      title: ChatWebSearchServerToolParametersEngine
    ChatWebSearchServerToolParametersSearchContextSize:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: ChatWebSearchServerToolParametersSearchContextSize
    ChatWebSearchServerToolParametersUserLocationType:
      type: string
      enum:
        - approximate
      title: ChatWebSearchServerToolParametersUserLocationType
    ChatWebSearchServerToolParametersUserLocation:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/ChatWebSearchServerToolParametersUserLocationType
        city:
          type: string
        region:
          type: string
        country:
          type: string
        timezone:
          type: string
      description: Approximate user location for location-biased results.
      title: ChatWebSearchServerToolParametersUserLocation
    ChatWebSearchServerToolParameters:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/ChatWebSearchServerToolParametersEngine'
          description: >-
            Which search engine to use. "auto" (default) uses native if the
            provider supports it, otherwise Exa. "native" forces the provider's
            built-in search. "exa" forces the Exa search API. "firecrawl" uses
            Firecrawl (requires BYOK). "parallel" uses the Parallel search API.
        max_results:
          type: number
          format: double
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: number
          format: double
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        search_context_size:
          $ref: >-
            #/components/schemas/ChatWebSearchServerToolParametersSearchContextSize
          description: >-
            How much context to retrieve per result. Defaults to medium (15000
            chars). Only applies when using the Exa engine; ignored with native
            provider search.
        user_location:
          $ref: '#/components/schemas/ChatWebSearchServerToolParametersUserLocation'
          description: Approximate user location for location-biased results.
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
      title: ChatWebSearchServerToolParameters
    ChatWebSearchServerTool:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatWebSearchServerToolType'
        parameters:
          $ref: '#/components/schemas/ChatWebSearchServerToolParameters'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: ChatWebSearchServerTool
    ChatWebSearchShorthandType:
      type: string
      enum:
        - web_search
        - web_search_preview
        - web_search_preview_2025_03_11
        - web_search_2025_08_26
      title: ChatWebSearchShorthandType
    ChatWebSearchShorthandEngine:
      type: string
      enum:
        - auto
        - native
        - exa
        - firecrawl
        - parallel
      description: >-
        Which search engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl
        (requires BYOK). "parallel" uses the Parallel search API.
      title: ChatWebSearchShorthandEngine
    ChatWebSearchShorthandSearchContextSize:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: ChatWebSearchShorthandSearchContextSize
    ChatWebSearchShorthandUserLocationType:
      type: string
      enum:
        - approximate
      title: ChatWebSearchShorthandUserLocationType
    ChatWebSearchShorthandUserLocation:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatWebSearchShorthandUserLocationType'
        city:
          type: string
        region:
          type: string
        country:
          type: string
        timezone:
          type: string
      description: Approximate user location for location-biased results.
      title: ChatWebSearchShorthandUserLocation
    ChatWebSearchShorthandParametersEngine:
      type: string
      enum:
        - auto
        - native
        - exa
        - firecrawl
        - parallel
      description: >-
        Which search engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        search. "exa" forces the Exa search API. "firecrawl" uses Firecrawl
        (requires BYOK). "parallel" uses the Parallel search API.
      title: ChatWebSearchShorthandParametersEngine
    ChatWebSearchShorthandParametersSearchContextSize:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: ChatWebSearchShorthandParametersSearchContextSize
    ChatWebSearchShorthandParametersUserLocationType:
      type: string
      enum:
        - approximate
      title: ChatWebSearchShorthandParametersUserLocationType
    ChatWebSearchShorthandParametersUserLocation:
      type: object
      properties:
        type:
          $ref: >-
            #/components/schemas/ChatWebSearchShorthandParametersUserLocationType
        city:
          type: string
        region:
          type: string
        country:
          type: string
        timezone:
          type: string
      description: Approximate user location for location-biased results.
      title: ChatWebSearchShorthandParametersUserLocation
    ChatWebSearchShorthandParameters:
      type: object
      properties:
        engine:
          $ref: '#/components/schemas/ChatWebSearchShorthandParametersEngine'
          description: >-
            Which search engine to use. "auto" (default) uses native if the
            provider supports it, otherwise Exa. "native" forces the provider's
            built-in search. "exa" forces the Exa search API. "firecrawl" uses
            Firecrawl (requires BYOK). "parallel" uses the Parallel search API.
        max_results:
          type: number
          format: double
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: number
          format: double
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        search_context_size:
          $ref: >-
            #/components/schemas/ChatWebSearchShorthandParametersSearchContextSize
          description: >-
            How much context to retrieve per result. Defaults to medium (15000
            chars). Only applies when using the Exa engine; ignored with native
            provider search.
        user_location:
          $ref: '#/components/schemas/ChatWebSearchShorthandParametersUserLocation'
          description: Approximate user location for location-biased results.
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
      title: ChatWebSearchShorthandParameters
    ChatWebSearchShorthand:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatWebSearchShorthandType'
        engine:
          $ref: '#/components/schemas/ChatWebSearchShorthandEngine'
          description: >-
            Which search engine to use. "auto" (default) uses native if the
            provider supports it, otherwise Exa. "native" forces the provider's
            built-in search. "exa" forces the Exa search API. "firecrawl" uses
            Firecrawl (requires BYOK). "parallel" uses the Parallel search API.
        max_results:
          type: number
          format: double
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: number
          format: double
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        search_context_size:
          $ref: '#/components/schemas/ChatWebSearchShorthandSearchContextSize'
          description: >-
            How much context to retrieve per result. Defaults to medium (15000
            chars). Only applies when using the Exa engine; ignored with native
            provider search.
        user_location:
          $ref: '#/components/schemas/ChatWebSearchShorthandUserLocation'
          description: Approximate user location for location-biased results.
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
        parameters:
          $ref: '#/components/schemas/ChatWebSearchShorthandParameters'
      required:
        - type
      description: >-
        Web search tool using OpenAI Responses API syntax. Automatically
        converted to openrouter:web_search.
      title: ChatWebSearchShorthand
    ChatFunctionTool:
      oneOf:
        - $ref: '#/components/schemas/ChatFunctionTool0'
        - $ref: '#/components/schemas/DatetimeServerTool'
        - $ref: '#/components/schemas/ChatWebSearchServerTool'
        - $ref: '#/components/schemas/ChatWebSearchShorthand'
      description: >-
        Tool definition for function calling (regular function or OpenRouter
        built-in server tool)
      title: ChatFunctionTool
    ChatDebugOptions:
      type: object
      properties:
        echo_upstream_body:
          type: boolean
          description: >-
            If true, includes the transformed upstream request body in a debug
            chunk at the start of the stream. Only works with streaming mode.
      description: Debug options for inspecting request transformations (streaming only)
      title: ChatDebugOptions
    ChatRequestImageConfig:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: array
          items:
            description: Any type
      title: ChatRequestImageConfig
    ChatRequestModalitiesItems:
      type: string
      enum:
        - text
        - image
        - audio
      title: ChatRequestModalitiesItems
    ChatRequestCacheControlType:
      type: string
      enum:
        - ephemeral
      title: ChatRequestCacheControlType
    ChatRequestCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: ChatRequestCacheControlTtl
    ChatRequestCacheControl:
      type: object
      properties:
        type:
          $ref: '#/components/schemas/ChatRequestCacheControlType'
        ttl:
          $ref: '#/components/schemas/ChatRequestCacheControlTtl'
      required:
        - type
      description: >-
        Enable automatic prompt caching. When set, the system automatically
        applies cache breakpoints to the last cacheable block in the request.
        Currently supported for Anthropic Claude models.
      title: ChatRequestCacheControl
    ChatRequestServiceTier:
      type: string
      enum:
        - auto
        - default
        - flex
        - priority
        - scale
      description: The service tier to use for processing this request.
      title: ChatRequestServiceTier
    ChatRequest:
      type: object
      properties:
        provider:
          oneOf:
            - $ref: '#/components/schemas/ChatRequestProvider'
            - type: 'null'
          description: >-
            When multiple model providers are available, optionally indicate
            your routing preference.
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/ChatRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
        user:
          type: string
          description: Unique user identifier
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 256 characters.
        trace:
          $ref: '#/components/schemas/ChatRequestTrace'
          description: >-
            Metadata for observability and tracing. Known keys (trace_id,
            trace_name, span_name, generation_name, parent_span_id) have special
            handling. Additional keys are passed through as custom metadata to
            configured broadcast destinations.
        messages:
          type: array
          items:
            $ref: '#/components/schemas/ChatMessages'
          description: List of messages for the conversation
        model:
          $ref: '#/components/schemas/ModelName'
        models:
          $ref: '#/components/schemas/ChatModelNames'
        frequency_penalty:
          type: number
          format: double
          description: Frequency penalty (-2.0 to 2.0)
        logit_bias:
          type:
            - object
            - 'null'
          additionalProperties:
            type: number
            format: double
          description: Token logit bias adjustments
        logprobs:
          type:
            - boolean
            - 'null'
          description: Return log probabilities
        top_logprobs:
          type: integer
          description: Number of top log probabilities to return (0-20)
        max_completion_tokens:
          type: integer
          description: Maximum tokens in completion
        max_tokens:
          type: integer
          description: >-
            Maximum tokens (deprecated, use max_completion_tokens). Note: some
            providers enforce a minimum of 16.
        metadata:
          type: object
          additionalProperties:
            type: string
          description: >-
            Key-value pairs for additional object information (max 16 pairs, 64
            char keys, 512 char values)
        presence_penalty:
          type: number
          format: double
          description: Presence penalty (-2.0 to 2.0)
        reasoning:
          $ref: '#/components/schemas/ChatRequestReasoning'
          description: Configuration options for reasoning models
        response_format:
          $ref: '#/components/schemas/ChatRequestResponseFormat'
          description: Response format configuration
        seed:
          type: integer
          description: Random seed for deterministic outputs
        stop:
          $ref: '#/components/schemas/ChatRequestStop'
          description: Stop sequences (up to 4)
        stream:
          type: boolean
          default: false
          description: Enable streaming response
        stream_options:
          $ref: '#/components/schemas/ChatStreamOptions'
        temperature:
          type: number
          format: double
          description: Sampling temperature (0-2)
        parallel_tool_calls:
          type:
            - boolean
            - 'null'
        tool_choice:
          $ref: '#/components/schemas/ChatToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/ChatFunctionTool'
          description: Available tools for function calling
        top_p:
          type: number
          format: double
          description: Nucleus sampling parameter (0-1)
        debug:
          $ref: '#/components/schemas/ChatDebugOptions'
        image_config:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ChatRequestImageConfig'
          description: >-
            Provider-specific image configuration options. Keys and values vary
            by model/provider. See
            https://openrouter.ai/docs/guides/overview/multimodal/image-generation
            for more details.
        modalities:
          type: array
          items:
            $ref: '#/components/schemas/ChatRequestModalitiesItems'
          description: >-
            Output modalities for the response. Supported values are "text",
            "image", and "audio".
        cache_control:
          $ref: '#/components/schemas/ChatRequestCacheControl'
          description: >-
            Enable automatic prompt caching. When set, the system automatically
            applies cache breakpoints to the last cacheable block in the
            request. Currently supported for Anthropic Claude models.
        service_tier:
          oneOf:
            - $ref: '#/components/schemas/ChatRequestServiceTier'
            - type: 'null'
          description: The service tier to use for processing this request.
      required:
        - messages
      description: Chat completion request parameters
      title: ChatRequest
    ChatFinishReasonEnum:
      type: string
      enum:
        - tool_calls
        - stop
        - length
        - content_filter
        - error
      title: ChatFinishReasonEnum
    ChatChoiceFinishReason:
      oneOf:
        - $ref: '#/components/schemas/ChatFinishReasonEnum'
        - description: Any type
        - description: Any type
      title: ChatChoiceFinishReason
    ChatTokenLogprobTopLogprobsItems:
      type: object
      properties:
        token:
          type: string
        logprob:
          type: number
          format: double
        bytes:
          type:
            - array
            - 'null'
          items:
            type: integer
      required:
        - token
        - logprob
        - bytes
      title: ChatTokenLogprobTopLogprobsItems
    ChatTokenLogprob:
      type: object
      properties:
        token:
          type: string
          description: The token
        logprob:
          type: number
          format: double
          description: Log probability of the token
        bytes:
          type:
            - array
            - 'null'
          items:
            type: integer
          description: UTF-8 bytes of the token
        top_logprobs:
          type: array
          items:
            $ref: '#/components/schemas/ChatTokenLogprobTopLogprobsItems'
          description: Top alternative tokens with probabilities
      required:
        - token
        - logprob
        - bytes
        - top_logprobs
      description: Token log probability information
      title: ChatTokenLogprob
    ChatTokenLogprobs:
      type: object
      properties:
        content:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ChatTokenLogprob'
          description: Log probabilities for content tokens
        refusal:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ChatTokenLogprob'
          description: Log probabilities for refusal tokens
      required:
        - content
      description: Log probabilities for the completion
      title: ChatTokenLogprobs
    ChatChoice:
      type: object
      properties:
        finish_reason:
          $ref: '#/components/schemas/ChatChoiceFinishReason'
        index:
          type: integer
          description: Choice index
        message:
          $ref: '#/components/schemas/ChatAssistantMessage'
        logprobs:
          $ref: '#/components/schemas/ChatTokenLogprobs'
      required:
        - finish_reason
        - index
        - message
      description: Chat completion choice
      title: ChatChoice
    ChatResultObject:
      type: string
      enum:
        - chat.completion
      title: ChatResultObject
    ChatUsageCompletionTokensDetails:
      type: object
      properties:
        reasoning_tokens:
          type: integer
          description: Tokens used for reasoning
        audio_tokens:
          type: integer
          description: Tokens used for audio output
        accepted_prediction_tokens:
          type: integer
          description: Accepted prediction tokens
        rejected_prediction_tokens:
          type: integer
          description: Rejected prediction tokens
      description: Detailed completion token usage
      title: ChatUsageCompletionTokensDetails
    ChatUsagePromptTokensDetails:
      type: object
      properties:
        cached_tokens:
          type: integer
          description: Cached prompt tokens
        cache_write_tokens:
          type: integer
          description: >-
            Tokens written to cache. Only returned for models with explicit
            caching and cache write pricing.
        audio_tokens:
          type: integer
          description: Audio input tokens
        video_tokens:
          type: integer
          description: Video input tokens
      description: Detailed prompt token usage
      title: ChatUsagePromptTokensDetails
    ChatUsage:
      type: object
      properties:
        completion_tokens:
          type: integer
          description: Number of tokens in the completion
        prompt_tokens:
          type: integer
          description: Number of tokens in the prompt
        total_tokens:
          type: integer
          description: Total number of tokens
        completion_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ChatUsageCompletionTokensDetails'
            - type: 'null'
          description: Detailed completion token usage
        prompt_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ChatUsagePromptTokensDetails'
            - type: 'null'
          description: Detailed prompt token usage
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      description: Token usage statistics
      title: ChatUsage
    ChatResult:
      type: object
      properties:
        id:
          type: string
          description: Unique completion identifier
        choices:
          type: array
          items:
            $ref: '#/components/schemas/ChatChoice'
          description: List of completion choices
        created:
          type: integer
          description: Unix timestamp of creation
        model:
          type: string
          description: Model used for completion
        object:
          $ref: '#/components/schemas/ChatResultObject'
        system_fingerprint:
          type:
            - string
            - 'null'
          description: System fingerprint
        service_tier:
          type:
            - string
            - 'null'
          description: The service tier used by the upstream provider for this request
        usage:
          $ref: '#/components/schemas/ChatUsage'
      required:
        - id
        - choices
        - created
        - model
        - object
        - system_fingerprint
      description: Chat completion response
      title: ChatResult
    BadRequestResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadRequestResponse
      title: BadRequestResponseErrorData
    BadRequestResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
    UnauthorizedResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    PaymentRequiredResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for PaymentRequiredResponse
      title: PaymentRequiredResponseErrorData
    PaymentRequiredResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
    NotFoundResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Not Found - Resource does not exist
      title: NotFoundResponse
    RequestTimeoutResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for RequestTimeoutResponse
      title: RequestTimeoutResponseErrorData
    RequestTimeoutResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Request Timeout - Operation exceeded time limit
      title: RequestTimeoutResponse
    PayloadTooLargeResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for PayloadTooLargeResponse
      title: PayloadTooLargeResponseErrorData
    PayloadTooLargeResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PayloadTooLargeResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payload Too Large - Request payload exceeds size limits
      title: PayloadTooLargeResponse
    UnprocessableEntityResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnprocessableEntityResponse
      title: UnprocessableEntityResponseErrorData
    UnprocessableEntityResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnprocessableEntityResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unprocessable Entity - Semantic validation failure
      title: UnprocessableEntityResponse
    TooManyRequestsResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
    BadGatewayResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadGatewayResponse
      title: BadGatewayResponseErrorData
    BadGatewayResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Gateway - Provider/upstream API failure
      title: BadGatewayResponse
    ServiceUnavailableResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for ServiceUnavailableResponse
      title: ServiceUnavailableResponseErrorData
    ServiceUnavailableResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Service Unavailable - Service temporarily unavailable
      title: ServiceUnavailableResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/chat/completions"

payload = {
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "What is the capital of France?"
        }
    ],
    "model": "openai/gpt-4",
    "max_tokens": 150,
    "temperature": 0.7
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/chat/completions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"messages":[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":"What is the capital of France?"}],"model":"openai/gpt-4","max_tokens":150,"temperature":0.7}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/chat/completions"

	payload := strings.NewReader("{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"model\": \"openai/gpt-4\",\n  \"max_tokens\": 150,\n  \"temperature\": 0.7\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/chat/completions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"model\": \"openai/gpt-4\",\n  \"max_tokens\": 150,\n  \"temperature\": 0.7\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/chat/completions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"model\": \"openai/gpt-4\",\n  \"max_tokens\": 150,\n  \"temperature\": 0.7\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/chat/completions', [
  'body' => '{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "model": "openai/gpt-4",
  "max_tokens": 150,
  "temperature": 0.7
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/chat/completions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"model\": \"openai/gpt-4\",\n  \"max_tokens\": 150,\n  \"temperature\": 0.7\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "messages": [
    [
      "role": "system",
      "content": "You are a helpful assistant."
    ],
    [
      "role": "user",
      "content": "What is the capital of France?"
    ]
  ],
  "model": "openai/gpt-4",
  "max_tokens": 150,
  "temperature": 0.7
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/chat/completions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```