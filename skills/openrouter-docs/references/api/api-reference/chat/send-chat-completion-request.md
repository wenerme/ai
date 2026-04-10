For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/chat/llms.txt. For full documentation content, see https://openrouter.ai/docs/api/api-reference/chat/llms-full.txt.

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
    AnthropicCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicCacheControlTtl
    AnthropicCacheControlDirectiveType:
      type: string
      enum:
        - ephemeral
      title: AnthropicCacheControlDirectiveType
    ChatRequestCacheControl:
      type: object
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          $ref: '#/components/schemas/AnthropicCacheControlDirectiveType'
      required:
        - type
      title: ChatRequestCacheControl
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
    ChatContentCacheControl:
      type: object
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          $ref: '#/components/schemas/AnthropicCacheControlDirectiveType'
      required:
        - type
      description: Cache control for the content part
      title: ChatContentCacheControl
    ChatContentTextType:
      type: string
      enum:
        - text
      title: ChatContentTextType
    ChatContentText:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/ChatContentCacheControl'
        text:
          type: string
        type:
          $ref: '#/components/schemas/ChatContentTextType'
      required:
        - text
        - type
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
    ChatSystemMessageRole:
      type: string
      enum:
        - system
      title: ChatSystemMessageRole
    ChatSystemMessage:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/ChatSystemMessageContent'
          description: System message content
        name:
          type: string
          description: Optional name for the system message
        role:
          $ref: '#/components/schemas/ChatSystemMessageRole'
      required:
        - content
        - role
      description: System message for setting behavior
      title: ChatSystemMessage
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
        detail:
          $ref: '#/components/schemas/ChatContentImageImageUrlDetail'
          description: Image detail level for vision models
        url:
          type: string
          description: 'URL of the image (data: URLs supported)'
      required:
        - url
      title: ChatContentImageImageUrl
    ChatContentImageType:
      type: string
      enum:
        - image_url
      title: ChatContentImageType
    ChatContentImage:
      type: object
      properties:
        image_url:
          $ref: '#/components/schemas/ChatContentImageImageUrl'
        type:
          $ref: '#/components/schemas/ChatContentImageType'
      required:
        - image_url
        - type
      description: Image content part for vision models
      title: ChatContentImage
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
    ChatContentAudioType:
      type: string
      enum:
        - input_audio
      title: ChatContentAudioType
    ChatContentAudio:
      type: object
      properties:
        input_audio:
          $ref: '#/components/schemas/ChatContentAudioInputAudio'
        type:
          $ref: '#/components/schemas/ChatContentAudioType'
      required:
        - input_audio
        - type
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
    ChatContentFileType:
      type: string
      enum:
        - file
      title: ChatContentFileType
    ChatContentFile:
      type: object
      properties:
        file:
          $ref: '#/components/schemas/ChatContentFileFile'
        type:
          $ref: '#/components/schemas/ChatContentFileType'
      required:
        - file
        - type
      description: File content part for document processing
      title: ChatContentFile
    ChatContentItems:
      oneOf:
        - $ref: '#/components/schemas/ChatContentText'
        - $ref: '#/components/schemas/ChatContentImage'
        - $ref: '#/components/schemas/ChatContentAudio'
        - $ref: '#/components/schemas/Legacy_ChatContentVideo'
        - $ref: '#/components/schemas/ChatContentVideo'
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
    ChatUserMessageRole:
      type: string
      enum:
        - user
      title: ChatUserMessageRole
    ChatUserMessage:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/ChatUserMessageContent'
          description: User message content
        name:
          type: string
          description: Optional name for the user
        role:
          $ref: '#/components/schemas/ChatUserMessageRole'
      required:
        - content
        - role
      description: User message
      title: ChatUserMessage
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
    ChatDeveloperMessageRole:
      type: string
      enum:
        - developer
      title: ChatDeveloperMessageRole
    ChatDeveloperMessage:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/ChatDeveloperMessageContent'
          description: Developer message content
        name:
          type: string
          description: Optional name for the developer message
        role:
          $ref: '#/components/schemas/ChatDeveloperMessageRole'
      required:
        - content
        - role
      description: Developer message
      title: ChatDeveloperMessage
    ChatAudioOutput:
      type: object
      properties:
        data:
          type: string
          description: Base64 encoded audio data
        expires_at:
          type: integer
          description: Audio expiration timestamp
        id:
          type: string
          description: Audio output identifier
        transcript:
          type: string
          description: Audio transcript
      description: Audio output data or reference
      title: ChatAudioOutput
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
    ReasoningFormat:
      type: string
      enum:
        - unknown
        - openai-responses-v1
        - azure-openai-responses-v1
        - xai-responses-v1
        - anthropic-claude-v1
        - google-gemini-v1
      title: ReasoningFormat
    ReasoningDetailSummaryType:
      type: string
      enum:
        - reasoning.summary
      title: ReasoningDetailSummaryType
    ReasoningDetailSummary:
      type: object
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
          $ref: '#/components/schemas/ReasoningDetailSummaryType'
      required:
        - summary
        - type
      description: Reasoning detail summary schema
      title: ReasoningDetailSummary
    ReasoningDetailEncryptedType:
      type: string
      enum:
        - reasoning.encrypted
      title: ReasoningDetailEncryptedType
    ReasoningDetailEncrypted:
      type: object
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
          $ref: '#/components/schemas/ReasoningDetailEncryptedType'
      required:
        - data
        - type
      description: Reasoning detail encrypted schema
      title: ReasoningDetailEncrypted
    ReasoningDetailTextType:
      type: string
      enum:
        - reasoning.text
      title: ReasoningDetailTextType
    ReasoningDetailText:
      type: object
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
          $ref: '#/components/schemas/ReasoningDetailTextType'
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
    ChatAssistantMessageRole:
      type: string
      enum:
        - assistant
      title: ChatAssistantMessageRole
    ChatToolCallFunction:
      type: object
      properties:
        arguments:
          type: string
          description: Function arguments as JSON string
        name:
          type: string
          description: Function name to call
      required:
        - arguments
        - name
      title: ChatToolCallFunction
    ChatToolCallType:
      type: string
      enum:
        - function
      title: ChatToolCallType
    ChatToolCall:
      type: object
      properties:
        function:
          $ref: '#/components/schemas/ChatToolCallFunction'
        id:
          type: string
          description: Tool call identifier
        type:
          $ref: '#/components/schemas/ChatToolCallType'
      required:
        - function
        - id
        - type
      description: Tool call made by the assistant
      title: ChatToolCall
    ChatAssistantMessage:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/ChatAudioOutput'
        content:
          $ref: '#/components/schemas/ChatAssistantMessageContent'
          description: Assistant message content
        images:
          $ref: '#/components/schemas/ChatAssistantImages'
        name:
          type: string
          description: Optional name for the assistant
        reasoning:
          type:
            - string
            - 'null'
          description: Reasoning output
        reasoning_details:
          $ref: '#/components/schemas/ChatReasoningDetails'
        refusal:
          type:
            - string
            - 'null'
          description: Refusal message if content was refused
        role:
          $ref: '#/components/schemas/ChatAssistantMessageRole'
        tool_calls:
          type: array
          items:
            $ref: '#/components/schemas/ChatToolCall'
          description: Tool calls made by the assistant
      required:
        - role
      description: Assistant message for requests and responses
      title: ChatAssistantMessage
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
    ChatToolMessageRole:
      type: string
      enum:
        - tool
      title: ChatToolMessageRole
    ChatToolMessage:
      type: object
      properties:
        content:
          $ref: '#/components/schemas/ChatToolMessageContent'
          description: Tool response content
        role:
          $ref: '#/components/schemas/ChatToolMessageRole'
        tool_call_id:
          type: string
          description: ID of the assistant message tool call this message responds to
      required:
        - content
        - role
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
    ChatRequestModalitiesItems:
      type: string
      enum:
        - text
        - image
        - audio
      title: ChatRequestModalitiesItems
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
    AutoRouterPluginId:
      type: string
      enum:
        - auto-router
      title: AutoRouterPluginId
    AutoRouterPlugin:
      type: object
      properties:
        allowed_models:
          type: array
          items:
            type: string
          description: >-
            List of model patterns to filter which models the auto-router can
            route between. Supports wildcards (e.g., "anthropic/*" matches all
            Anthropic models). When not specified, uses the default supported
            models list.
        enabled:
          type: boolean
          description: >-
            Set to false to disable the auto-router plugin for this request.
            Defaults to true.
        id:
          $ref: '#/components/schemas/AutoRouterPluginId'
      required:
        - id
      title: AutoRouterPlugin
    ModerationPluginId:
      type: string
      enum:
        - moderation
      title: ModerationPluginId
    ModerationPlugin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/ModerationPluginId'
      required:
        - id
      title: ModerationPlugin
    WebSearchEngine:
      type: string
      enum:
        - native
        - exa
        - firecrawl
        - parallel
      description: The search engine to use for web search.
      title: WebSearchEngine
    WebSearchPluginId:
      type: string
      enum:
        - web
      title: WebSearchPluginId
    WebSearchPlugin:
      type: object
      properties:
        enabled:
          type: boolean
          description: >-
            Set to false to disable the web-search plugin for this request.
            Defaults to true.
        engine:
          $ref: '#/components/schemas/WebSearchEngine'
        exclude_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to exclude from web search results. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
        id:
          $ref: '#/components/schemas/WebSearchPluginId'
        include_domains:
          type: array
          items:
            type: string
          description: >-
            A list of domains to restrict web search results to. Supports
            wildcards (e.g. "*.substack.com") and path filtering (e.g.
            "openai.com/blog").
        max_results:
          type: integer
        search_prompt:
          type: string
      required:
        - id
      title: WebSearchPlugin
    FileParserPluginId:
      type: string
      enum:
        - file-parser
      title: FileParserPluginId
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
    FileParserPlugin:
      type: object
      properties:
        enabled:
          type: boolean
          description: >-
            Set to false to disable the file-parser plugin for this request.
            Defaults to true.
        id:
          $ref: '#/components/schemas/FileParserPluginId'
        pdf:
          $ref: '#/components/schemas/PDFParserOptions'
      required:
        - id
      title: FileParserPlugin
    ResponseHealingPluginId:
      type: string
      enum:
        - response-healing
      title: ResponseHealingPluginId
    ResponseHealingPlugin:
      type: object
      properties:
        enabled:
          type: boolean
          description: >-
            Set to false to disable the response-healing plugin for this
            request. Defaults to true.
        id:
          $ref: '#/components/schemas/ResponseHealingPluginId'
      required:
        - id
      title: ResponseHealingPlugin
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
    ContextCompressionPluginId:
      type: string
      enum:
        - context-compression
      title: ContextCompressionPluginId
    ContextCompressionPlugin:
      type: object
      properties:
        enabled:
          type: boolean
          description: >-
            Set to false to disable the context-compression plugin for this
            request. Defaults to true.
        engine:
          $ref: '#/components/schemas/ContextCompressionEngine'
        id:
          $ref: '#/components/schemas/ContextCompressionPluginId'
      required:
        - id
      title: ContextCompressionPlugin
    ChatRequestPluginsItems:
      oneOf:
        - $ref: '#/components/schemas/AutoRouterPlugin'
        - $ref: '#/components/schemas/ModerationPlugin'
        - $ref: '#/components/schemas/WebSearchPlugin'
        - $ref: '#/components/schemas/FileParserPlugin'
        - $ref: '#/components/schemas/ResponseHealingPlugin'
        - $ref: '#/components/schemas/ContextCompressionPlugin'
      title: ChatRequestPluginsItems
    ProviderPreferencesDataCollection:
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
      title: ProviderPreferencesDataCollection
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
    ProviderPreferencesIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesIgnoreItems
    ProviderPreferencesMaxPriceAudio:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceAudio
    ProviderPreferencesMaxPriceCompletion:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceCompletion
    ProviderPreferencesMaxPriceImage:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceImage
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ProviderPreferencesMaxPriceRequest:
      type: object
      properties: {}
      title: ProviderPreferencesMaxPriceRequest
    ProviderPreferencesMaxPrice:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceAudio'
        completion:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceCompletion'
        image:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceImage'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/ProviderPreferencesMaxPriceRequest'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: ProviderPreferencesMaxPrice
    ProviderPreferencesOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOnlyItems
    ProviderPreferencesOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: ProviderPreferencesOrderItems
    PercentileLatencyCutoffs:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Maximum p50 latency (seconds)
        p75:
          type: number
          format: double
          description: Maximum p75 latency (seconds)
        p90:
          type: number
          format: double
          description: Maximum p90 latency (seconds)
        p99:
          type: number
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
    PercentileThroughputCutoffs:
      type: object
      properties:
        p50:
          type: number
          format: double
          description: Minimum p50 throughput (tokens/sec)
        p75:
          type: number
          format: double
          description: Minimum p75 throughput (tokens/sec)
        p90:
          type: number
          format: double
          description: Minimum p90 throughput (tokens/sec)
        p99:
          type: number
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
    ProviderSort:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSort
    ProviderSortConfigBy:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfigBy
    ProviderSortConfigPartition:
      type: string
      enum:
        - model
        - none
      description: >-
        Partitioning strategy for sorting: "model" (default) groups endpoints by
        model before sorting (fallback models remain fallbacks), "none" sorts
        all endpoints together regardless of model.
      title: ProviderSortConfigPartition
    ProviderSortConfig:
      type: object
      properties:
        by:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigBy'
            - type: 'null'
          description: The provider sorting strategy (price, throughput, latency)
        partition:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigPartition'
            - type: 'null'
          description: >-
            Partitioning strategy for sorting: "model" (default) groups
            endpoints by model before sorting (fallback models remain
            fallbacks), "none" sorts all endpoints together regardless of model.
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfig
    ProviderPreferencesSort:
      oneOf:
        - $ref: '#/components/schemas/ProviderSort'
        - $ref: '#/components/schemas/ProviderSortConfig'
        - description: Any type
      description: >-
        The sorting strategy to use for this request, if "order" is not
        specified. When set, no load balancing is performed.
      title: ProviderPreferencesSort
    ProviderPreferences:
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
        data_collection:
          oneOf:
            - $ref: '#/components/schemas/ProviderPreferencesDataCollection'
            - type: 'null'
          description: >-
            Data collection setting. If no available model provider meets the
            requirement, your request will return an error.

            - allow: (default) allow providers which store user data
            non-transiently and may train on it


            - deny: use only providers which do not collect user data.
        enforce_distillable_text:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesIgnoreItems'
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
        max_price:
          $ref: '#/components/schemas/ProviderPreferencesMaxPrice'
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
        only:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesOnlyItems'
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        order:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/ProviderPreferencesOrderItems'
          description: >-
            An ordered list of provider slugs. The router will attempt to use
            the first provider in the subset of this list that supports your
            requested model, and fall back to the next if it is unavailable. If
            no providers are available, the request will fail with an error
            message.
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        quantizations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/Quantization'
          description: A list of quantization levels to filter the provider by.
        require_parameters:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
        sort:
          $ref: '#/components/schemas/ProviderPreferencesSort'
          description: >-
            The sorting strategy to use for this request, if "order" is not
            specified. When set, no load balancing is performed.
        zdr:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
      description: >-
        When multiple model providers are available, optionally indicate your
        routing preference.
      title: ProviderPreferences
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
    ChatRequestReasoning:
      type: object
      properties:
        effort:
          oneOf:
            - $ref: '#/components/schemas/ChatRequestReasoningEffort'
            - type: 'null'
          description: Constrains effort on reasoning for reasoning models
        summary:
          $ref: '#/components/schemas/ChatReasoningSummaryVerbosityEnum'
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
    ChatJsonSchemaConfig:
      type: object
      properties:
        description:
          type: string
          description: Schema description for the model
        name:
          type: string
          description: Schema name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
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
    ChatFormatJsonSchemaConfigType:
      type: string
      enum:
        - json_schema
      title: ChatFormatJsonSchemaConfigType
    ChatFormatJsonSchemaConfig:
      type: object
      properties:
        json_schema:
          $ref: '#/components/schemas/ChatJsonSchemaConfig'
        type:
          $ref: '#/components/schemas/ChatFormatJsonSchemaConfigType'
      required:
        - json_schema
        - type
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
        grammar:
          type: string
          description: Custom grammar for text generation
        type:
          $ref: '#/components/schemas/ChatFormatGrammarConfigType'
      required:
        - grammar
        - type
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
    ChatNamedToolChoiceFunction:
      type: object
      properties:
        name:
          type: string
          description: Function name to call
      required:
        - name
      title: ChatNamedToolChoiceFunction
    ChatNamedToolChoiceType:
      type: string
      enum:
        - function
      title: ChatNamedToolChoiceType
    ChatNamedToolChoice:
      type: object
      properties:
        function:
          $ref: '#/components/schemas/ChatNamedToolChoiceFunction'
        type:
          $ref: '#/components/schemas/ChatNamedToolChoiceType'
      required:
        - function
        - type
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
    ChatFunctionToolOneOf0Function:
      type: object
      properties:
        description:
          type: string
          description: Function description for the model
        name:
          type: string
          description: Function name (a-z, A-Z, 0-9, underscores, dashes, max 64 chars)
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
    ChatFunctionToolOneOf0Type:
      type: string
      enum:
        - function
      title: ChatFunctionToolOneOf0Type
    ChatFunctionTool0:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/ChatContentCacheControl'
        function:
          $ref: '#/components/schemas/ChatFunctionToolOneOf0Function'
          description: Function definition for tool calling
        type:
          $ref: '#/components/schemas/ChatFunctionToolOneOf0Type'
      required:
        - function
        - type
      title: ChatFunctionTool0
    DatetimeServerToolParameters:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      title: DatetimeServerToolParameters
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolParameters'
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
    WebSearchEngineEnum:
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
      title: WebSearchEngineEnum
    SearchQualityLevel:
      type: string
      enum:
        - low
        - medium
        - high
      description: >-
        How much context to retrieve per result. Defaults to medium (15000
        chars). Only applies when using the Exa engine; ignored with native
        provider search.
      title: SearchQualityLevel
    WebSearchUserLocationServerToolType:
      type: string
      enum:
        - approximate
      title: WebSearchUserLocationServerToolType
    WebSearchUserLocationServerTool:
      type: object
      properties:
        city:
          type: string
        country:
          type: string
        region:
          type: string
        timezone:
          type: string
        type:
          $ref: '#/components/schemas/WebSearchUserLocationServerToolType'
      description: Approximate user location for location-biased results.
      title: WebSearchUserLocationServerTool
    WebSearchConfig:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: integer
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
      title: WebSearchConfig
    OpenRouterWebSearchServerToolType:
      type: string
      enum:
        - openrouter:web_search
      title: OpenRouterWebSearchServerToolType
    OpenRouterWebSearchServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
        type:
          $ref: '#/components/schemas/OpenRouterWebSearchServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches the web for current
        information
      title: OpenRouterWebSearchServerTool
    ChatWebSearchShorthandType:
      type: string
      enum:
        - web_search
        - web_search_preview
        - web_search_preview_2025_03_11
        - web_search_2025_08_26
      title: ChatWebSearchShorthandType
    ChatWebSearchShorthand:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: >-
            Limit search results to these domains. Supported by Exa, Parallel,
            and most native providers (Anthropic, OpenAI, xAI). Not supported
            with Firecrawl or Perplexity.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Parallel, Anthropic, and xAI. Not supported with Firecrawl, OpenAI
            (silently ignored), or Perplexity.
        max_results:
          type: integer
          description: >-
            Maximum number of search results to return per search call. Defaults
            to 5. Applies to Exa, Firecrawl, and Parallel engines; ignored with
            native provider search.
        max_total_results:
          type: integer
          description: >-
            Maximum total number of search results across all search calls in a
            single request. Once this limit is reached, the tool will stop
            returning new results. Useful for controlling cost and context size
            in agentic loops.
        parameters:
          $ref: '#/components/schemas/WebSearchConfig'
        search_context_size:
          $ref: '#/components/schemas/SearchQualityLevel'
        type:
          $ref: '#/components/schemas/ChatWebSearchShorthandType'
        user_location:
          $ref: '#/components/schemas/WebSearchUserLocationServerTool'
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
        - $ref: '#/components/schemas/OpenRouterWebSearchServerTool'
        - $ref: '#/components/schemas/ChatWebSearchShorthand'
      description: >-
        Tool definition for function calling (regular function or OpenRouter
        built-in server tool)
      title: ChatFunctionTool
    TraceConfig:
      type: object
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
      description: >-
        Metadata for observability and tracing. Known keys (trace_id,
        trace_name, span_name, generation_name, parent_span_id) have special
        handling. Additional keys are passed through as custom metadata to
        configured broadcast destinations.
      title: TraceConfig
    ChatRequest:
      type: object
      properties:
        cache_control:
          $ref: '#/components/schemas/ChatRequestCacheControl'
        debug:
          $ref: '#/components/schemas/ChatDebugOptions'
        frequency_penalty:
          type: number
          format: double
          description: Frequency penalty (-2.0 to 2.0)
        image_config:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ChatRequestImageConfig'
          description: >-
            Provider-specific image configuration options. Keys and values vary
            by model/provider. See
            https://openrouter.ai/docs/guides/overview/multimodal/image-generation
            for more details.
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
        max_completion_tokens:
          type: integer
          description: Maximum tokens in completion
        max_tokens:
          type: integer
          description: >-
            Maximum tokens (deprecated, use max_completion_tokens). Note: some
            providers enforce a minimum of 16.
        messages:
          type: array
          items:
            $ref: '#/components/schemas/ChatMessages'
          description: List of messages for the conversation
        metadata:
          type: object
          additionalProperties:
            type: string
          description: >-
            Key-value pairs for additional object information (max 16 pairs, 64
            char keys, 512 char values)
        modalities:
          type: array
          items:
            $ref: '#/components/schemas/ChatRequestModalitiesItems'
          description: >-
            Output modalities for the response. Supported values are "text",
            "image", and "audio".
        model:
          $ref: '#/components/schemas/ModelName'
        models:
          $ref: '#/components/schemas/ChatModelNames'
        parallel_tool_calls:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to enable parallel function calling during tool use. When
            true, the model may generate multiple tool calls in a single
            response.
        plugins:
          type: array
          items:
            $ref: '#/components/schemas/ChatRequestPluginsItems'
          description: >-
            Plugins you want to enable for this request, including their
            settings.
        presence_penalty:
          type: number
          format: double
          description: Presence penalty (-2.0 to 2.0)
        provider:
          $ref: '#/components/schemas/ProviderPreferences'
        reasoning:
          $ref: '#/components/schemas/ChatRequestReasoning'
          description: Configuration options for reasoning models
        response_format:
          $ref: '#/components/schemas/ChatRequestResponseFormat'
          description: Response format configuration
        route:
          description: Any type
        seed:
          type: integer
          description: Random seed for deterministic outputs
        service_tier:
          oneOf:
            - $ref: '#/components/schemas/ChatRequestServiceTier'
            - type: 'null'
          description: The service tier to use for processing this request.
        session_id:
          type: string
          description: >-
            A unique identifier for grouping related requests (e.g., a
            conversation or agent workflow) for observability. If provided in
            both the request body and the x-session-id header, the body value
            takes precedence. Maximum of 256 characters.
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
        tool_choice:
          $ref: '#/components/schemas/ChatToolChoice'
        tools:
          type: array
          items:
            $ref: '#/components/schemas/ChatFunctionTool'
          description: Available tools for function calling
        top_logprobs:
          type: integer
          description: Number of top log probabilities to return (0-20)
        top_p:
          type: number
          format: double
          description: Nucleus sampling parameter (0-1)
        trace:
          $ref: '#/components/schemas/TraceConfig'
        user:
          type: string
          description: Unique user identifier
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
    ChatTokenLogprobTopLogprobsItems:
      type: object
      properties:
        bytes:
          type:
            - array
            - 'null'
          items:
            type: integer
        logprob:
          type: number
          format: double
        token:
          type: string
      required:
        - bytes
        - logprob
        - token
      title: ChatTokenLogprobTopLogprobsItems
    ChatTokenLogprob:
      type: object
      properties:
        bytes:
          type:
            - array
            - 'null'
          items:
            type: integer
          description: UTF-8 bytes of the token
        logprob:
          type: number
          format: double
          description: Log probability of the token
        token:
          type: string
          description: The token
        top_logprobs:
          type: array
          items:
            $ref: '#/components/schemas/ChatTokenLogprobTopLogprobsItems'
          description: Top alternative tokens with probabilities
      required:
        - bytes
        - logprob
        - token
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
          $ref: '#/components/schemas/ChatFinishReasonEnum'
        index:
          type: integer
          description: Choice index
        logprobs:
          $ref: '#/components/schemas/ChatTokenLogprobs'
        message:
          $ref: '#/components/schemas/ChatAssistantMessage'
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
        accepted_prediction_tokens:
          type: integer
          description: Accepted prediction tokens
        audio_tokens:
          type: integer
          description: Tokens used for audio output
        reasoning_tokens:
          type: integer
          description: Tokens used for reasoning
        rejected_prediction_tokens:
          type: integer
          description: Rejected prediction tokens
      description: Detailed completion token usage
      title: ChatUsageCompletionTokensDetails
    ChatUsagePromptTokensDetails:
      type: object
      properties:
        audio_tokens:
          type: integer
          description: Audio input tokens
        cache_write_tokens:
          type: integer
          description: >-
            Tokens written to cache. Only returned for models with explicit
            caching and cache write pricing.
        cached_tokens:
          type: integer
          description: Cached prompt tokens
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
        completion_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ChatUsageCompletionTokensDetails'
            - type: 'null'
          description: Detailed completion token usage
        prompt_tokens:
          type: integer
          description: Number of tokens in the prompt
        prompt_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ChatUsagePromptTokensDetails'
            - type: 'null'
          description: Detailed prompt token usage
        total_tokens:
          type: integer
          description: Total number of tokens
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      description: Token usage statistics
      title: ChatUsage
    ChatResult:
      type: object
      properties:
        choices:
          type: array
          items:
            $ref: '#/components/schemas/ChatChoice'
          description: List of completion choices
        created:
          type: integer
          description: Unix timestamp of creation
        id:
          type: string
          description: Unique completion identifier
        model:
          type: string
          description: Model used for completion
        object:
          $ref: '#/components/schemas/ChatResultObject'
        service_tier:
          type:
            - string
            - 'null'
          description: The service tier used by the upstream provider for this request
        system_fingerprint:
          type:
            - string
            - 'null'
          description: System fingerprint
        usage:
          $ref: '#/components/schemas/ChatUsage'
      required:
        - choices
        - created
        - id
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
            "content": "You are a helpful assistant.",
            "role": "system"
        },
        {
            "content": "What is the capital of France?",
            "role": "user"
        }
    ],
    "max_tokens": 150,
    "model": "openai/gpt-4",
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
  body: '{"messages":[{"content":"You are a helpful assistant.","role":"system"},{"content":"What is the capital of France?","role":"user"}],"max_tokens":150,"model":"openai/gpt-4","temperature":0.7}'
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

	payload := strings.NewReader("{\n  \"messages\": [\n    {\n      \"content\": \"You are a helpful assistant.\",\n      \"role\": \"system\"\n    },\n    {\n      \"content\": \"What is the capital of France?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}")

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
request.body = "{\n  \"messages\": [\n    {\n      \"content\": \"You are a helpful assistant.\",\n      \"role\": \"system\"\n    },\n    {\n      \"content\": \"What is the capital of France?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/chat/completions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"messages\": [\n    {\n      \"content\": \"You are a helpful assistant.\",\n      \"role\": \"system\"\n    },\n    {\n      \"content\": \"What is the capital of France?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}")
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
      "content": "You are a helpful assistant.",
      "role": "system"
    },
    {
      "content": "What is the capital of France?",
      "role": "user"
    }
  ],
  "max_tokens": 150,
  "model": "openai/gpt-4",
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
request.AddParameter("application/json", "{\n  \"messages\": [\n    {\n      \"content\": \"You are a helpful assistant.\",\n      \"role\": \"system\"\n    },\n    {\n      \"content\": \"What is the capital of France?\",\n      \"role\": \"user\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}", ParameterType.RequestBody);
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
      "content": "You are a helpful assistant.",
      "role": "system"
    ],
    [
      "content": "What is the capital of France?",
      "role": "user"
    ]
  ],
  "max_tokens": 150,
  "model": "openai/gpt-4",
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