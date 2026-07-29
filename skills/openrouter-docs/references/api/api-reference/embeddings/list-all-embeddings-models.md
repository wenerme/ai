> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List all embeddings models

> Returns a list of all available embeddings models and their properties



## OpenAPI

````yaml /openapi/openapi.yaml get /embeddings/models
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
  - description: OpenAI-compatible Responses API endpoints
    name: Responses
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
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /embeddings/models:
    get:
      tags:
        - Embeddings
      summary: List all embeddings models
      description: Returns a list of all available embeddings models and their properties
      operationId: listEmbeddingsModels
      parameters:
        - description: >-
            Number of records to skip for pagination. When both offset and limit
            are omitted, the full list is returned
          in: query
          name: offset
          required: false
          schema:
            default: 0
            description: >-
              Number of records to skip for pagination. When both offset and
              limit are omitted, the full list is returned
            example: 0
            minimum: 0
            type:
              - integer
              - 'null'
        - description: >-
            Maximum number of records to return (max 1000). When both offset and
            limit are omitted, the full list is returned
          in: query
          name: limit
          required: false
          schema:
            default: 500
            description: >-
              Maximum number of records to return (max 1000). When both offset
              and limit are omitted, the full list is returned
            example: 500
            maximum: 1000
            minimum: 1
            type: integer
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - architecture:
                      input_modalities:
                        - text
                      instruct_type: null
                      modality: text->text
                      output_modalities:
                        - embeddings
                      tokenizer: GPT
                    canonical_slug: openai/text-embedding-3-small
                    context_length: 8192
                    created: 1692901234
                    default_parameters: null
                    description: OpenAI text embedding model optimized for performance.
                    expiration_date: null
                    id: openai/text-embedding-3-small
                    knowledge_cutoff: null
                    links:
                      details: /api/v1/models/openai/text-embedding-3-small/endpoints
                    name: Text Embedding 3 Small
                    per_request_limits: null
                    pricing:
                      completion: '0'
                      image: '0'
                      prompt: '0.00000002'
                      request: '0'
                    supported_parameters: []
                    supported_voices: null
                    top_provider:
                      context_length: 8192
                      is_moderated: false
                      max_completion_tokens: null
              schema:
                $ref: '#/components/schemas/ModelsListResponse'
          description: Returns a list of embeddings models
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
components:
  schemas:
    ModelsListResponse:
      description: List of available models
      example:
        data:
          - architecture:
              input_modalities:
                - text
              instruct_type: chatml
              modality: text->text
              output_modalities:
                - text
              tokenizer: GPT
            canonical_slug: openai/gpt-4
            context_length: 8192
            created: 1692901234
            default_parameters: null
            description: >-
              GPT-4 is a large multimodal model that can solve difficult
              problems with greater accuracy.
            expiration_date: null
            id: openai/gpt-4
            knowledge_cutoff: null
            links:
              details: /api/v1/models/openai/gpt-4/endpoints
            name: GPT-4
            per_request_limits: null
            pricing:
              completion: '0.00006'
              image: '0'
              prompt: '0.00003'
              request: '0'
            supported_parameters:
              - temperature
              - top_p
              - max_tokens
              - frequency_penalty
              - presence_penalty
            supported_voices: null
            top_provider:
              context_length: 8192
              is_moderated: true
              max_completion_tokens: 4096
        links:
          next: /api/v1/models?offset=500&limit=500
        total_count: 150
      properties:
        data:
          $ref: '#/components/schemas/ModelsListResponseData'
        links:
          description: Pagination links
          properties:
            next:
              description: >-
                URL for the next page of results, or null if this is the last
                page
              example: /api/v1/models?offset=500&limit=500
              type:
                - string
                - 'null'
          required:
            - next
          type: object
        total_count:
          description: Total number of models matching the query
          example: 150
          type: integer
      required:
        - data
        - total_count
        - links
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
    ModelsListResponseData:
      description: List of available models
      example:
        - architecture:
            input_modalities:
              - text
            instruct_type: chatml
            modality: text->text
            output_modalities:
              - text
            tokenizer: GPT
          canonical_slug: openai/gpt-4
          context_length: 8192
          created: 1692901234
          default_parameters: null
          description: >-
            GPT-4 is a large multimodal model that can solve difficult problems
            with greater accuracy.
          expiration_date: null
          id: openai/gpt-4
          knowledge_cutoff: null
          links:
            details: /api/v1/models/openai/gpt-4/endpoints
          name: GPT-4
          per_request_limits: null
          pricing:
            completion: '0.00006'
            image: '0'
            prompt: '0.00003'
            request: '0'
          supported_parameters:
            - temperature
            - top_p
            - max_tokens
          supported_voices: null
          top_provider:
            context_length: 8192
            is_moderated: true
            max_completion_tokens: 4096
      items:
        $ref: '#/components/schemas/Model'
      type: array
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
    Model:
      description: Information about an AI model available on OpenRouter
      example:
        architecture:
          input_modalities:
            - text
          instruct_type: chatml
          modality: text->text
          output_modalities:
            - text
          tokenizer: GPT
        canonical_slug: openai/gpt-4
        context_length: 8192
        created: 1692901234
        default_parameters: null
        description: >-
          GPT-4 is a large multimodal model that can solve difficult problems
          with greater accuracy.
        expiration_date: null
        id: openai/gpt-4
        knowledge_cutoff: null
        links:
          details: /api/v1/models/openai/gpt-5.4/endpoints
        name: GPT-4
        per_request_limits: null
        pricing:
          completion: '0.00006'
          image: '0'
          prompt: '0.00003'
          request: '0'
        reasoning:
          default_effort: medium
          default_enabled: true
          mandatory: false
          supported_efforts:
            - high
            - medium
            - low
            - minimal
        supported_parameters:
          - temperature
          - top_p
          - max_tokens
        supported_voices: null
        top_provider:
          context_length: 8192
          is_moderated: true
          max_completion_tokens: 4096
      properties:
        architecture:
          $ref: '#/components/schemas/ModelArchitecture'
        benchmarks:
          $ref: '#/components/schemas/ModelBenchmarks'
        canonical_slug:
          description: Canonical slug for the model
          example: openai/gpt-4
          type: string
        context_length:
          description: Maximum context length in tokens
          example: 8192
          type:
            - integer
            - 'null'
        created:
          description: Unix timestamp of when the model was created
          example: 1692901234
          type: integer
        default_parameters:
          $ref: '#/components/schemas/DefaultParameters'
        description:
          description: Description of the model
          example: >-
            GPT-4 is a large multimodal model that can solve difficult problems
            with greater accuracy.
          type: string
        expiration_date:
          description: >-
            The date after which the model may be removed. ISO 8601 date string
            (YYYY-MM-DD) or null if no expiration.
          example: '2025-06-01'
          type:
            - string
            - 'null'
        hugging_face_id:
          description: Hugging Face model identifier, if applicable
          example: microsoft/DialoGPT-medium
          type:
            - string
            - 'null'
        id:
          description: Unique identifier for the model
          example: openai/gpt-4
          type: string
        knowledge_cutoff:
          description: >-
            The date up to which the model was trained on data. ISO 8601 date
            string (YYYY-MM-DD) or null if unknown.
          example: '2024-10-01'
          type:
            - string
            - 'null'
        links:
          $ref: '#/components/schemas/ModelLinks'
        name:
          description: Display name of the model
          example: GPT-4
          type: string
        per_request_limits:
          $ref: '#/components/schemas/PerRequestLimits'
        pricing:
          $ref: '#/components/schemas/PublicPricing'
        reasoning:
          $ref: '#/components/schemas/ModelReasoning'
        supported_parameters:
          description: List of supported parameters for this model
          items:
            $ref: '#/components/schemas/Parameter'
          type: array
        supported_voices:
          description: >-
            List of supported voice identifiers for TTS models. Null for non-TTS
            models.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        top_provider:
          $ref: '#/components/schemas/TopProviderInfo'
      required:
        - id
        - canonical_slug
        - name
        - created
        - pricing
        - context_length
        - architecture
        - top_provider
        - per_request_limits
        - supported_parameters
        - default_parameters
        - supported_voices
        - links
      type: object
    ModelArchitecture:
      description: Model architecture information
      example:
        input_modalities:
          - text
        instruct_type: chatml
        modality: text->text
        output_modalities:
          - text
        tokenizer: GPT
      properties:
        input_modalities:
          description: Supported input modalities
          items:
            $ref: '#/components/schemas/InputModality'
          type: array
        instruct_type:
          $ref: '#/components/schemas/InstructType'
        modality:
          description: Primary modality of the model
          example: text->text
          type:
            - string
            - 'null'
        output_modalities:
          description: Supported output modalities
          items:
            $ref: '#/components/schemas/OutputModality'
          type: array
        tokenizer:
          $ref: '#/components/schemas/ModelGroup'
      required:
        - modality
        - input_modalities
        - output_modalities
      type: object
    ModelBenchmarks:
      description: >-
        Third-party benchmark rankings for this model. Omitted when no benchmark
        data is available.
      example:
        artificial_analysis:
          agentic_index: 55.8
          coding_index: 63.2
          intelligence_index: 71.4
        design_arena:
          - arena: models
            category: website
            elo: 1385.2
            rank: 5
            win_rate: 62.5
      properties:
        artificial_analysis:
          $ref: '#/components/schemas/AABenchmarkEntry'
        design_arena:
          description: Design Arena ELO rankings across arena+category pairs.
          example:
            - arena: models
              category: website
              elo: 1385.2
              rank: 5
              win_rate: 62.5
          items:
            $ref: '#/components/schemas/DABenchmarkEntry'
          type: array
      required:
        - design_arena
      type: object
    DefaultParameters:
      additionalProperties: false
      description: Default parameters for this model
      example:
        frequency_penalty: 0
        presence_penalty: 0
        repetition_penalty: 1
        temperature: 0.7
        top_k: 0
        top_p: 0.9
      properties:
        frequency_penalty:
          format: double
          type:
            - number
            - 'null'
        presence_penalty:
          format: double
          type:
            - number
            - 'null'
        repetition_penalty:
          format: double
          type:
            - number
            - 'null'
        temperature:
          format: double
          type:
            - number
            - 'null'
        top_k:
          type:
            - integer
            - 'null'
        top_p:
          format: double
          type:
            - number
            - 'null'
      type:
        - object
        - 'null'
    ModelLinks:
      description: Related API endpoints and resources for this model.
      example:
        details: /api/v1/models/openai/gpt-5.4/endpoints
      properties:
        details:
          description: URL for the model details/endpoints API
          example: /api/v1/models/openai/gpt-5.4/endpoints
          type: string
      required:
        - details
      type: object
    PerRequestLimits:
      description: Per-request token limits
      example:
        completion_tokens: 1000
        prompt_tokens: 1000
      properties:
        completion_tokens:
          description: Maximum completion tokens per request
          example: 1000
          type: number
        prompt_tokens:
          description: Maximum prompt tokens per request
          example: 1000
          type: number
      required:
        - prompt_tokens
        - completion_tokens
      type:
        - object
        - 'null'
    PublicPricing:
      description: Pricing information for the model
      example:
        completion: '0.00006'
        image: '0'
        prompt: '0.00003'
        request: '0'
      properties:
        audio:
          description: Price in USD per audio input token
          type: string
        audio_output:
          description: Price in USD per audio output token
          type: string
        completion:
          description: Price in USD per token for completion (output) generation
          type: string
        discount:
          description: >-
            Fractional discount applied to this endpoint's pricing; the price is
            multiplied by (1 - discount) (0 = no discount, 1 = free)
          format: double
          type: number
        image:
          description: Price in USD per input image
          type: string
        image_output:
          description: Price in USD per output image
          type: string
        image_token:
          description: Price in USD per image token
          type: string
        input_audio_cache:
          description: Price in USD per cached audio input token
          type: string
        input_cache_read:
          description: Price in USD per cached input token (read)
          type: string
        input_cache_write:
          description: >-
            Price per cache-write token, in USD per token. For providers with
            multiple cache TTLs (e.g. Anthropic), this is the default (5-minute)
            cache-write rate.
          type: string
        input_cache_write_1h:
          description: >-
            Price per 1-hour cache-write token, in USD per token. Only present
            for providers that price an extended (1-hour) cache TTL separately,
            such as Anthropic.
          type: string
        internal_reasoning:
          description: Price in USD per internal reasoning token
          type: string
        overrides:
          description: >-
            Conditional overrides of the base pricing (e.g. long-context or
            time-based pricing). An entry applies when all of its condition
            fields (e.g. min_prompt_tokens, or the utc_start/utc_end time
            window) match the request; among applicable entries, later entries
            win per key; price keys absent from an entry inherit the base price.
            The top-level pricing keys always reflect the price that applies
            under default conditions.
          items:
            $ref: '#/components/schemas/PricingOverride'
          type: array
        prompt:
          description: Price in USD per token for prompt (input) processing
          type: string
        request:
          description: Price in USD per request
          type: string
        web_search:
          description: Price in USD per web search
          type: string
      required:
        - prompt
        - completion
      type: object
    ModelReasoning:
      description: >-
        Reasoning effort configuration. Omitted for non-reasoning models and
        dynamic router models.
      example:
        default_effort: medium
        default_enabled: true
        mandatory: false
        supported_efforts:
          - high
          - medium
          - low
          - minimal
      properties:
        default_effort:
          allOf:
            - $ref: '#/components/schemas/ReasoningEffort'
            - description: >-
                Default reasoning effort when the client enables reasoning
                without specifying effort. Maps to `reasoning.effort` in chat
                requests. When `"none"`, prefer omitting effort unless the user
                explicitly disables reasoning.
        default_enabled:
          description: >-
            Default reasoning enabled state when the client does not set
            `reasoning.enabled`.
          type: boolean
        mandatory:
          description: >-
            When true, reasoning cannot be disabled and effort "none" is
            rejected.
          type: boolean
        supported_efforts:
          description: >-
            Allowed reasoning effort values for this model, in descending effort
            order (highest first). Null means no allowlist — all gateway effort
            values are accepted.
          items:
            $ref: '#/components/schemas/ReasoningEffort'
          type:
            - array
            - 'null'
        supports_max_tokens:
          description: >-
            Present and `true` when the model accepts `reasoning.max_tokens` in
            requests (Anthropic-style) instead of or in addition to
            `reasoning.effort`. Omitted otherwise.
          type: boolean
      required:
        - mandatory
      type: object
    Parameter:
      enum:
        - temperature
        - top_p
        - top_k
        - min_p
        - top_a
        - frequency_penalty
        - presence_penalty
        - repetition_penalty
        - max_tokens
        - max_completion_tokens
        - logit_bias
        - logprobs
        - top_logprobs
        - prediction
        - seed
        - response_format
        - structured_outputs
        - stop
        - tools
        - tool_choice
        - parallel_tool_calls
        - include_reasoning
        - reasoning
        - reasoning_effort
        - web_search_options
        - verbosity
      example: temperature
      type: string
    TopProviderInfo:
      description: Information about the top provider for this model
      example:
        context_length: 8192
        is_moderated: true
        max_completion_tokens: 4096
      properties:
        context_length:
          description: Context length from the top provider
          example: 8192
          type:
            - integer
            - 'null'
        is_moderated:
          description: Whether the top provider moderates content
          example: true
          type: boolean
        max_completion_tokens:
          description: Maximum completion tokens from the top provider
          example: 4096
          type:
            - integer
            - 'null'
      required:
        - is_moderated
      type: object
    InputModality:
      enum:
        - text
        - image
        - file
        - audio
        - video
      example: text
      type: string
    InstructType:
      description: Instruction format type
      enum:
        - none
        - airoboros
        - alpaca
        - alpaca-modif
        - chatml
        - claude
        - code-llama
        - gemma
        - llama2
        - llama3
        - mistral
        - nemotron
        - neural
        - openchat
        - phi3
        - rwkv
        - vicuna
        - zephyr
        - deepseek-r1
        - deepseek-v3.1
        - qwq
        - qwen3
        - null
      example: chatml
      type:
        - string
        - 'null'
    OutputModality:
      enum:
        - text
        - image
        - embeddings
        - audio
        - video
        - rerank
        - speech
        - transcription
      example: text
      type: string
    ModelGroup:
      description: Tokenizer type used by the model
      enum:
        - Router
        - Media
        - Other
        - GPT
        - Claude
        - Gemini
        - Gemma
        - Grok
        - Cohere
        - Nova
        - Qwen
        - Yi
        - DeepSeek
        - Mistral
        - Llama2
        - Llama3
        - Llama4
        - PaLM
        - RWKV
        - Qwen3
      example: GPT
      type: string
    AABenchmarkEntry:
      description: Artificial Analysis benchmark index scores.
      example:
        agentic_index: 55.8
        coding_index: 63.2
        intelligence_index: 71.4
      properties:
        agentic_index:
          description: Artificial Analysis Agentic Index score
          example: 55.8
          format: double
          type:
            - number
            - 'null'
        coding_index:
          description: Artificial Analysis Coding Index score
          example: 63.2
          format: double
          type:
            - number
            - 'null'
        intelligence_index:
          description: Artificial Analysis Intelligence Index score
          example: 71.4
          format: double
          type:
            - number
            - 'null'
      required:
        - intelligence_index
        - coding_index
        - agentic_index
      type: object
    DABenchmarkEntry:
      description: A single Design Arena benchmark entry for a specific arena+category
      example:
        arena: models
        category: website
        elo: 1385.2
        rank: 5
        win_rate: 62.5
      properties:
        arena:
          description: Arena type (e.g. models, builders, agents)
          example: models
          type: string
        category:
          description: Category within the arena (e.g. website, gamedev, uicomponent)
          example: website
          type: string
        elo:
          description: ELO rating from head-to-head arena battles
          example: 1385.2
          format: double
          type: number
        rank:
          description: >-
            Rank position within this arena+category among models available on
            OpenRouter (1 = highest ELO)
          example: 5
          type: integer
        win_rate:
          description: Win rate percentage in arena battles
          example: 62.5
          format: double
          type: number
      required:
        - arena
        - category
        - elo
        - win_rate
        - rank
      type: object
    PricingOverride:
      description: >-
        A conditional override of the base pricing. An entry applies only when
        all of its condition fields (e.g. min_prompt_tokens, or the
        utc_start/utc_end time window) match the request; among applicable
        entries, later entries win per price key; price keys absent from an
        entry inherit the base price.
      example:
        completion: '0.00002'
        min_prompt_tokens: 200000
        prompt: '0.000005'
      properties:
        audio:
          description: Overridden price in USD per audio input token
          type: string
        completion:
          description: Overridden price in USD per token for completion (output) generation
          type: string
        input_audio_cache:
          description: Overridden price in USD per cached audio input token
          type: string
        input_cache_read:
          description: Overridden price in USD per cached input token (read)
          type: string
        input_cache_write:
          description: Overridden price in USD per cache-write token
          type: string
        input_cache_write_1h:
          description: Overridden price in USD per 1-hour cache-write token
          type: string
        min_prompt_tokens:
          description: >-
            Condition: the entry applies when the total prompt tokens of a
            request are strictly greater than this threshold
          format: double
          type: number
        prompt:
          description: Overridden price in USD per token for prompt (input) processing
          type: string
        utc_end:
          description: >-
            Condition: exclusive end of a daily UTC time window as an HHMM clock
            number (e.g. 400 = 04:00)
          format: double
          type: number
        utc_start:
          description: >-
            Condition: inclusive start of a daily UTC time window as an HHMM
            clock number (e.g. 100 = 01:00, 1030 = 10:30). The entry applies
            while the current UTC time is inside the half-open window
            [utc_start, utc_end), which may wrap past midnight (utc_start >
            utc_end).
          format: double
          type: number
      type: object
    ReasoningEffort:
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````