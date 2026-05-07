> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

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
        - name: X-OpenRouter-Experimental-Metadata
          in: header
          description: >-
            Opt-in to surface routing metadata on the response under
            `openrouter_metadata`. Defaults to `disabled`.
          required: false
          schema:
            $ref: '#/components/schemas/MetadataLevel'
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
        '403':
          description: Forbidden - Authentication successful but insufficient permissions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
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
    MetadataLevel:
      type: string
      enum:
        - disabled
        - enabled
      description: >-
        Opt-in level for surfacing routing metadata on the response under
        `openrouter_metadata`.
      title: MetadataLevel
    AnthropicCacheControlTtl:
      type: string
      enum:
        - 5m
        - 1h
      title: AnthropicCacheControlTtl
    ChatRequestCacheControlType:
      type: string
      enum:
        - ephemeral
      title: ChatRequestCacheControlType
    ChatRequestCacheControl:
      type: object
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          $ref: '#/components/schemas/ChatRequestCacheControlType'
      required:
        - type
      description: >-
        Enable automatic prompt caching. When set, the system automatically
        applies cache breakpoints to the last cacheable block in the request.
        Currently supported for Anthropic Claude models.
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
    ImageConfig:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: array
          items:
            description: Any type
      title: ImageConfig
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
    ChatContentItemsDiscriminatorMappingFileFile:
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
      title: ChatContentItemsDiscriminatorMappingFileFile
    ChatContentItemsDiscriminatorMappingImageUrlImageUrlDetail:
      type: string
      enum:
        - auto
        - low
        - high
      description: Image detail level for vision models
      title: ChatContentItemsDiscriminatorMappingImageUrlImageUrlDetail
    ChatContentItemsDiscriminatorMappingImageUrlImageUrl:
      type: object
      properties:
        detail:
          $ref: >-
            #/components/schemas/ChatContentItemsDiscriminatorMappingImageUrlImageUrlDetail
          description: Image detail level for vision models
        url:
          type: string
          description: 'URL of the image (data: URLs supported)'
      required:
        - url
      title: ChatContentItemsDiscriminatorMappingImageUrlImageUrl
    ChatContentItemsDiscriminatorMappingInputAudioInputAudio:
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
      title: ChatContentItemsDiscriminatorMappingInputAudioInputAudio
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
    ChatContentCacheControlType:
      type: string
      enum:
        - ephemeral
      title: ChatContentCacheControlType
    ChatContentCacheControl:
      type: object
      properties:
        ttl:
          $ref: '#/components/schemas/AnthropicCacheControlTtl'
        type:
          $ref: '#/components/schemas/ChatContentCacheControlType'
      required:
        - type
      description: Cache control for the content part
      title: ChatContentCacheControl
    ChatContentTextType:
      type: string
      enum:
        - text
      title: ChatContentTextType
    ChatContentVideoType:
      type: string
      enum:
        - video_url
      title: ChatContentVideoType
    ChatContentItems:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - file
              description: 'Discriminator value: file'
            file:
              $ref: >-
                #/components/schemas/ChatContentItemsDiscriminatorMappingFileFile
          required:
            - type
            - file
          description: File content part for document processing
        - type: object
          properties:
            type:
              type: string
              enum:
                - image_url
              description: 'Discriminator value: image_url'
            image_url:
              $ref: >-
                #/components/schemas/ChatContentItemsDiscriminatorMappingImageUrlImageUrl
          required:
            - type
            - image_url
          description: Image content part for vision models
        - type: object
          properties:
            type:
              type: string
              enum:
                - input_audio
              description: 'Discriminator value: input_audio'
            input_audio:
              $ref: >-
                #/components/schemas/ChatContentItemsDiscriminatorMappingInputAudioInputAudio
          required:
            - type
            - input_audio
          description: Audio input content part. Supported audio formats vary by provider.
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/LegacyChatContentVideoType'
            video_url:
              $ref: '#/components/schemas/ChatContentVideoInput'
          required:
            - type
            - video_url
          description: Video input content part (legacy format - deprecated)
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ChatContentTextType'
            cache_control:
              $ref: '#/components/schemas/ChatContentCacheControl'
            text:
              type: string
          required:
            - type
            - text
          description: Text content part
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ChatContentVideoType'
            video_url:
              $ref: '#/components/schemas/ChatContentVideoInput'
          required:
            - type
            - video_url
          description: Video input content part
      discriminator:
        propertyName: type
      description: Content part for chat completion messages
      title: ChatContentItems
    ChatMessagesDiscriminatorMappingAssistantContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentItems'
      title: ChatMessagesDiscriminatorMappingAssistantContent1
    ChatMessagesDiscriminatorMappingAssistantContent:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/ChatMessagesDiscriminatorMappingAssistantContent1
        - description: Any type
      description: Assistant message content
      title: ChatMessagesDiscriminatorMappingAssistantContent
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
    ReasoningDetailUnion:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - reasoning.encrypted
              description: 'Discriminator value: reasoning.encrypted'
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
          required:
            - type
            - data
          description: Reasoning detail encrypted schema
        - type: object
          properties:
            type:
              type: string
              enum:
                - reasoning.summary
              description: 'Discriminator value: reasoning.summary'
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
          required:
            - type
            - summary
          description: Reasoning detail summary schema
        - type: object
          properties:
            type:
              type: string
              enum:
                - reasoning.text
              description: 'Discriminator value: reasoning.text'
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
          required:
            - type
          description: Reasoning detail text schema
      discriminator:
        propertyName: type
      description: Reasoning detail union schema
      title: ReasoningDetailUnion
    ChatReasoningDetails:
      type: array
      items:
        $ref: '#/components/schemas/ReasoningDetailUnion'
      description: Reasoning details for extended thinking models
      title: ChatReasoningDetails
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
    ChatMessagesDiscriminatorMappingDeveloperContent1:
      type: array
      items:
        $ref: '#/components/schemas/ChatContentText'
      title: ChatMessagesDiscriminatorMappingDeveloperContent1
    ChatMessagesDiscriminatorMappingDeveloperContent:
      oneOf:
        - type: string
        - $ref: >-
            #/components/schemas/ChatMessagesDiscriminatorMappingDeveloperContent1
      description: Developer message content
      title: ChatMessagesDiscriminatorMappingDeveloperContent
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
    ChatMessages:
      oneOf:
        - type: object
          properties:
            role:
              type: string
              enum:
                - assistant
              description: 'Discriminator value: assistant'
            audio:
              $ref: '#/components/schemas/ChatAudioOutput'
            content:
              $ref: >-
                #/components/schemas/ChatMessagesDiscriminatorMappingAssistantContent
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
            tool_calls:
              type: array
              items:
                $ref: '#/components/schemas/ChatToolCall'
              description: Tool calls made by the assistant
          required:
            - role
          description: Assistant message for requests and responses
        - type: object
          properties:
            role:
              type: string
              enum:
                - developer
              description: 'Discriminator value: developer'
            content:
              $ref: >-
                #/components/schemas/ChatMessagesDiscriminatorMappingDeveloperContent
              description: Developer message content
            name:
              type: string
              description: Optional name for the developer message
          required:
            - role
            - content
          description: Developer message
        - type: object
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
        - type: object
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
        - type: object
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
      discriminator:
        propertyName: role
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
    ChatModelNames:
      type: array
      items:
        $ref: '#/components/schemas/ModelName'
      description: Models to use for completion
      title: ChatModelNames
    ContextCompressionEngine:
      type: string
      enum:
        - middle-out
      description: The compression engine to use. Defaults to "middle-out".
      title: ContextCompressionEngine
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
    WebSearchPluginUserLocationType:
      type: string
      enum:
        - approximate
      title: WebSearchPluginUserLocationType
    WebSearchPluginUserLocation:
      type: object
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
          $ref: '#/components/schemas/WebSearchPluginUserLocationType'
      required:
        - type
      description: >-
        Approximate user location for location-biased search results. Passed
        through to native providers that support it (e.g. Anthropic).
      title: WebSearchPluginUserLocation
    ChatRequestPluginsItems:
      oneOf:
        - type: object
          properties:
            id:
              type: string
              enum:
                - auto-router
              description: 'Discriminator value: auto-router'
            allowed_models:
              type: array
              items:
                type: string
              description: >-
                List of model patterns to filter which models the auto-router
                can route between. Supports wildcards (e.g., "anthropic/*"
                matches all Anthropic models). When not specified, uses the
                default supported models list.
            enabled:
              type: boolean
              description: >-
                Set to false to disable the auto-router plugin for this request.
                Defaults to true.
          required:
            - id
          description: auto-router variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - context-compression
              description: 'Discriminator value: context-compression'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the context-compression plugin for this
                request. Defaults to true.
            engine:
              $ref: '#/components/schemas/ContextCompressionEngine'
          required:
            - id
          description: context-compression variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - file-parser
              description: 'Discriminator value: file-parser'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the file-parser plugin for this request.
                Defaults to true.
            pdf:
              $ref: '#/components/schemas/PDFParserOptions'
          required:
            - id
          description: file-parser variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - moderation
              description: 'Discriminator value: moderation'
          required:
            - id
          description: moderation variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - pareto-router
              description: 'Discriminator value: pareto-router'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the pareto-router plugin for this
                request. Defaults to true.
            min_coding_score:
              type: number
              format: double
              description: >-
                Minimum desired coding score between 0 and 1, where 1 is best.
                Higher values select from stronger coding models (sourced from
                Artificial Analysis coding percentiles). Maps internally to one
                of three tiers (low, medium, high). Omit to use the router
                default tier.
          required:
            - id
          description: pareto-router variant
        - type: object
          properties:
            id:
              type: string
              enum:
                - response-healing
              description: 'Discriminator value: response-healing'
            enabled:
              type: boolean
              description: >-
                Set to false to disable the response-healing plugin for this
                request. Defaults to true.
          required:
            - id
          description: response-healing variant
        - type: object
          properties:
            id:
              $ref: '#/components/schemas/WebSearchPluginId'
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
            max_uses:
              type: integer
              description: >-
                Maximum number of times the model can invoke web search in a
                single turn. Passed through to native providers that support it
                (e.g. Anthropic).
            search_prompt:
              type: string
            user_location:
              $ref: '#/components/schemas/WebSearchPluginUserLocation'
          required:
            - id
          description: web variant
      discriminator:
        propertyName: id
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
        - Crusoe
        - DeepInfra
        - DeepSeek
        - DekaLLM
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
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    ProviderPreferencesMaxPrice:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/BigNumberUnion'
        image:
          $ref: '#/components/schemas/BigNumberUnion'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/BigNumberUnion'
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
    FormatJsonObjectConfigType:
      type: string
      enum:
        - json_object
      title: FormatJsonObjectConfigType
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
    ChatRequestResponseFormat:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - grammar
              description: 'Discriminator value: grammar'
            grammar:
              type: string
              description: Custom grammar for text generation
          required:
            - type
            - grammar
          description: Custom grammar response format
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/FormatJsonObjectConfigType'
          required:
            - type
          description: JSON object response format
        - type: object
          properties:
            type:
              type: string
              enum:
                - json_schema
              description: 'Discriminator value: json_schema'
            json_schema:
              $ref: '#/components/schemas/ChatJsonSchemaConfig'
          required:
            - type
            - json_schema
          description: JSON Schema response format for structured outputs
        - type: object
          properties:
            type:
              type: string
              enum:
                - python
              description: 'Discriminator value: python'
          required:
            - type
          description: Python code response format
        - type: object
          properties:
            type:
              type: string
              enum:
                - text
              description: 'Discriminator value: text'
          required:
            - type
          description: Default text response format
      discriminator:
        propertyName: type
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
    DatetimeServerToolConfig:
      type: object
      properties:
        timezone:
          type: string
          description: IANA timezone name (e.g. "America/New_York"). Defaults to UTC.
      description: Configuration for the openrouter:datetime server tool
      title: DatetimeServerToolConfig
    DatetimeServerToolType:
      type: string
      enum:
        - openrouter:datetime
      title: DatetimeServerToolType
    DatetimeServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/DatetimeServerToolConfig'
        type:
          $ref: '#/components/schemas/DatetimeServerToolType'
      required:
        - type
      description: 'OpenRouter built-in server tool: returns the current date and time'
      title: DatetimeServerTool
    ImageGenerationServerToolConfig:
      type: object
      properties:
        model:
          type: string
          description: >-
            Which image generation model to use (e.g. "openai/gpt-5-image").
            Defaults to "openai/gpt-5-image".
      description: >-
        Configuration for the openrouter:image_generation server tool. Accepts
        all image_config params (aspect_ratio, quality, size, background,
        output_format, output_compression, moderation, etc.) plus a model field.
      title: ImageGenerationServerToolConfig
    ImageGenerationServerToolOpenRouterType:
      type: string
      enum:
        - openrouter:image_generation
      title: ImageGenerationServerToolOpenRouterType
    ImageGenerationServerTool_OpenRouter:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/ImageGenerationServerToolConfig'
        type:
          $ref: '#/components/schemas/ImageGenerationServerToolOpenRouterType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: generates images from text prompts
        using an image generation model
      title: ImageGenerationServerTool_OpenRouter
    SearchModelsServerToolConfig:
      type: object
      properties:
        max_results:
          type: integer
          description: Maximum number of models to return. Defaults to 5, max 20.
      description: Configuration for the openrouter:experimental__search_models server tool
      title: SearchModelsServerToolConfig
    ChatSearchModelsServerToolType:
      type: string
      enum:
        - openrouter:experimental__search_models
      title: ChatSearchModelsServerToolType
    ChatSearchModelsServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/SearchModelsServerToolConfig'
        type:
          $ref: '#/components/schemas/ChatSearchModelsServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: searches and filters AI models
        available on OpenRouter
      title: ChatSearchModelsServerTool
    WebFetchEngineEnum:
      type: string
      enum:
        - auto
        - native
        - openrouter
        - firecrawl
        - exa
      description: >-
        Which fetch engine to use. "auto" (default) uses native if the provider
        supports it, otherwise Exa. "native" forces the provider's built-in
        fetch. "exa" uses Exa Contents API (supports BYOK). "openrouter" uses
        direct HTTP fetch. "firecrawl" uses Firecrawl scrape (requires BYOK).
      title: WebFetchEngineEnum
    WebFetchServerToolConfig:
      type: object
      properties:
        allowed_domains:
          type: array
          items:
            type: string
          description: Only fetch from these domains.
        blocked_domains:
          type: array
          items:
            type: string
          description: Never fetch from these domains.
        engine:
          $ref: '#/components/schemas/WebFetchEngineEnum'
        max_content_tokens:
          type: integer
          description: >-
            Maximum content length in approximate tokens. Content exceeding this
            limit is truncated.
        max_uses:
          type: integer
          description: >-
            Maximum number of web fetches per request. Once exceeded, the tool
            returns an error.
      description: Configuration for the openrouter:web_fetch server tool
      title: WebFetchServerToolConfig
    WebFetchServerToolType:
      type: string
      enum:
        - openrouter:web_fetch
      title: WebFetchServerToolType
    WebFetchServerTool:
      type: object
      properties:
        parameters:
          $ref: '#/components/schemas/WebFetchServerToolConfig'
        type:
          $ref: '#/components/schemas/WebFetchServerToolType'
      required:
        - type
      description: >-
        OpenRouter built-in server tool: fetches full content from a URL (web
        page or PDF)
      title: WebFetchServerTool
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
        chars). Applies to Exa and Parallel engines; ignored with native
        provider search and Firecrawl.
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
            Limit search results to these domains. Supported by Exa, Firecrawl,
            Parallel, and most native providers (Anthropic, OpenAI, xAI). Not
            supported with Perplexity. Cannot be used with excluded_domains.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Firecrawl, Parallel, Anthropic, and xAI. Not supported with OpenAI
            (silently ignored) or Perplexity. Cannot be used with
            allowed_domains.
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
            Limit search results to these domains. Supported by Exa, Firecrawl,
            Parallel, and most native providers (Anthropic, OpenAI, xAI). Not
            supported with Perplexity. Cannot be used with excluded_domains.
        engine:
          $ref: '#/components/schemas/WebSearchEngineEnum'
        excluded_domains:
          type: array
          items:
            type: string
          description: >-
            Exclude search results from these domains. Supported by Exa,
            Firecrawl, Parallel, Anthropic, and xAI. Not supported with OpenAI
            (silently ignored) or Perplexity. Cannot be used with
            allowed_domains.
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
        - $ref: '#/components/schemas/ImageGenerationServerTool_OpenRouter'
        - $ref: '#/components/schemas/ChatSearchModelsServerTool'
        - $ref: '#/components/schemas/WebFetchServerTool'
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
          type:
            - number
            - 'null'
          format: double
          description: Frequency penalty (-2.0 to 2.0)
        image_config:
          $ref: '#/components/schemas/ImageConfig'
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
          type:
            - integer
            - 'null'
          description: Maximum tokens in completion
        max_tokens:
          type:
            - integer
            - 'null'
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
          type:
            - number
            - 'null'
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
          type:
            - integer
            - 'null'
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
          type:
            - number
            - 'null'
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
          type:
            - integer
            - 'null'
          description: Number of top log probabilities to return (0-20)
        top_p:
          type:
            - number
            - 'null'
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
    ChatAssistantMessage:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/ChatAudioOutput'
        content:
          $ref: >-
            #/components/schemas/ChatMessagesDiscriminatorMappingAssistantContent
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
        tool_calls:
          type: array
          items:
            $ref: '#/components/schemas/ChatToolCall'
          description: Tool calls made by the assistant
      description: Assistant message for requests and responses
      title: ChatAssistantMessage
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
    RouterAttempt:
      type: object
      properties:
        model:
          type: string
        provider:
          type: string
        status:
          type: integer
      required:
        - model
        - provider
        - status
      title: RouterAttempt
    EndpointInfo:
      type: object
      properties:
        model:
          type: string
        provider:
          type: string
        selected:
          type: boolean
      required:
        - model
        - provider
        - selected
      title: EndpointInfo
    EndpointsMetadata:
      type: object
      properties:
        available:
          type: array
          items:
            $ref: '#/components/schemas/EndpointInfo'
        total:
          type: integer
      required:
        - available
        - total
      title: EndpointsMetadata
    RouterParams:
      type: object
      properties:
        quality_floor:
          type: number
          format: double
        throughput_floor:
          type: number
          format: double
        version_group:
          type: string
      title: RouterParams
    PipelineStageType:
      type: string
      enum:
        - guardrail
        - plugin
        - server_tools
        - response_healing
        - context_compression
      description: >-
        Categorical kind of a pipeline stage. Multiple plugins can share a type
        (e.g. all guardrail-level plugins emit `guardrail`); the `name` field
        disambiguates which plugin emitted it.
      title: PipelineStageType
    PipelineStage:
      type: object
      properties:
        cost_usd:
          type:
            - number
            - 'null'
          format: double
        data:
          type: object
          additionalProperties:
            description: Any type
        guardrail_id:
          type: string
        guardrail_scope:
          type: string
        name:
          type: string
        type:
          $ref: '#/components/schemas/PipelineStageType'
      required:
        - name
        - type
      title: PipelineStage
    RoutingStrategy:
      type: string
      enum:
        - direct
        - auto
        - free
        - latest
        - alias
        - fallback
        - pareto
        - bodybuilder
      title: RoutingStrategy
    OpenRouterMetadata:
      type: object
      properties:
        attempt:
          type: integer
        attempts:
          type: array
          items:
            $ref: '#/components/schemas/RouterAttempt'
        endpoints:
          $ref: '#/components/schemas/EndpointsMetadata'
        is_byok:
          type: boolean
        params:
          $ref: '#/components/schemas/RouterParams'
        pipeline:
          type: array
          items:
            $ref: '#/components/schemas/PipelineStage'
        region:
          type:
            - string
            - 'null'
        requested:
          type: string
        strategy:
          $ref: '#/components/schemas/RoutingStrategy'
        summary:
          type: string
      required:
        - attempt
        - endpoints
        - is_byok
        - region
        - requested
        - strategy
        - summary
      title: OpenRouterMetadata
    ChatUsageCompletionTokensDetails:
      type: object
      properties:
        accepted_prediction_tokens:
          type:
            - integer
            - 'null'
          description: Accepted prediction tokens
        audio_tokens:
          type:
            - integer
            - 'null'
          description: Tokens used for audio output
        reasoning_tokens:
          type:
            - integer
            - 'null'
          description: Tokens used for reasoning
        rejected_prediction_tokens:
          type:
            - integer
            - 'null'
          description: Rejected prediction tokens
      description: Detailed completion token usage
      title: ChatUsageCompletionTokensDetails
    CostDetails:
      type: object
      properties:
        upstream_inference_completions_cost:
          type: number
          format: double
        upstream_inference_cost:
          type:
            - number
            - 'null'
          format: double
        upstream_inference_prompt_cost:
          type: number
          format: double
      required:
        - upstream_inference_completions_cost
        - upstream_inference_prompt_cost
      description: Breakdown of upstream inference costs
      title: CostDetails
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
        cost:
          type:
            - number
            - 'null'
          format: double
          description: Cost of the completion
        cost_details:
          $ref: '#/components/schemas/CostDetails'
        is_byok:
          type: boolean
          description: Whether a request was made using a Bring Your Own Key configuration
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
        openrouter_metadata:
          $ref: '#/components/schemas/OpenRouterMetadata'
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
    ForbiddenResponseErrorData:
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
      description: Error data for ForbiddenResponse
      title: ForbiddenResponseErrorData
    ForbiddenResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
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

```python Chat_sendChatCompletionRequest_example
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
    "max_tokens": 150,
    "model": "openai/gpt-4",
    "temperature": 0.7
}
headers = {
    "X-OpenRouter-Experimental-Metadata": "enabled",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Chat_sendChatCompletionRequest_example
const url = 'https://openrouter.ai/api/v1/chat/completions';
const options = {
  method: 'POST',
  headers: {
    'X-OpenRouter-Experimental-Metadata': 'enabled',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"messages":[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":"What is the capital of France?"}],"max_tokens":150,"model":"openai/gpt-4","temperature":0.7}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Chat_sendChatCompletionRequest_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/chat/completions"

	payload := strings.NewReader("{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("X-OpenRouter-Experimental-Metadata", "enabled")
	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Chat_sendChatCompletionRequest_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/chat/completions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["X-OpenRouter-Experimental-Metadata"] = 'enabled'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}"

response = http.request(request)
puts response.read_body
```

```java Chat_sendChatCompletionRequest_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/chat/completions")
  .header("X-OpenRouter-Experimental-Metadata", "enabled")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}")
  .asString();
```

```php Chat_sendChatCompletionRequest_example
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
  "max_tokens": 150,
  "model": "openai/gpt-4",
  "temperature": 0.7
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'X-OpenRouter-Experimental-Metadata' => 'enabled',
  ],
]);

echo $response->getBody();
```

```csharp Chat_sendChatCompletionRequest_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/chat/completions");
var request = new RestRequest(Method.POST);
request.AddHeader("X-OpenRouter-Experimental-Metadata", "enabled");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"messages\": [\n    {\n      \"role\": \"system\",\n      \"content\": \"You are a helpful assistant.\"\n    },\n    {\n      \"role\": \"user\",\n      \"content\": \"What is the capital of France?\"\n    }\n  ],\n  \"max_tokens\": 150,\n  \"model\": \"openai/gpt-4\",\n  \"temperature\": 0.7\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Chat_sendChatCompletionRequest_example
import Foundation

let headers = [
  "X-OpenRouter-Experimental-Metadata": "enabled",
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