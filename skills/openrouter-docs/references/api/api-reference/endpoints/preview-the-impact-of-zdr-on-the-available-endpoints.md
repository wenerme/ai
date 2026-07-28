> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Preview the impact of ZDR on the available endpoints



## OpenAPI

````yaml /openapi/openapi.yaml get /endpoints/zdr
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
  - description: responses endpoints
    name: responses
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /endpoints/zdr:
    get:
      tags:
        - Endpoints
      summary: Preview the impact of ZDR on the available endpoints
      operationId: listEndpointsZdr
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - context_length: 8192
                    latency_last_30m:
                      p50: 0.25
                      p75: 0.35
                      p90: 0.48
                      p99: 0.85
                    max_completion_tokens: 4096
                    max_prompt_tokens: 8192
                    model_id: openai/gpt-4
                    model_name: GPT-4
                    name: 'OpenAI: GPT-4'
                    pricing:
                      completion: '0.00006'
                      image: '0'
                      prompt: '0.00003'
                      request: '0'
                    provider_name: OpenAI
                    quantization: fp16
                    status: 0
                    supported_parameters:
                      - temperature
                      - top_p
                      - max_tokens
                    supports_implicit_caching: true
                    tag: openai
                    throughput_last_30m:
                      p50: 45.2
                      p75: 38.5
                      p90: 28.3
                      p99: 15.1
                    uptime_last_1d: 99.8
                    uptime_last_30m: 99.5
                    uptime_last_5m: 100
              schema:
                example:
                  data:
                    - context_length: 8192
                      latency_last_30m:
                        p50: 0.25
                        p75: 0.35
                        p90: 0.48
                        p99: 0.85
                      max_completion_tokens: 4096
                      max_prompt_tokens: 8192
                      model_id: openai/gpt-4
                      model_name: GPT-4
                      name: 'OpenAI: GPT-4'
                      pricing:
                        completion: '0.00006'
                        image: '0'
                        prompt: '0.00003'
                        request: '0'
                      provider_name: OpenAI
                      quantization: fp16
                      status: 0
                      supported_parameters:
                        - temperature
                        - top_p
                        - max_tokens
                      supports_implicit_caching: true
                      tag: openai
                      throughput_last_30m:
                        p50: 45.2
                        p75: 38.5
                        p90: 28.3
                        p99: 15.1
                      uptime_last_1d: 99.8
                      uptime_last_30m: 99.5
                      uptime_last_5m: 100
                properties:
                  data:
                    items:
                      $ref: '#/components/schemas/PublicEndpoint'
                    type: array
                required:
                  - data
                type: object
          description: Returns a list of endpoints
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
    PublicEndpoint:
      description: Information about a specific model endpoint
      example:
        context_length: 8192
        latency_last_30m:
          p50: 0.25
          p75: 0.35
          p90: 0.48
          p99: 0.85
        max_completion_tokens: 4096
        max_prompt_tokens: 8192
        model_id: openai/gpt-4
        model_name: GPT-4
        name: 'OpenAI: GPT-4'
        pricing:
          completion: '0.00006'
          image: '0'
          prompt: '0.00003'
          request: '0'
        provider_name: OpenAI
        quantization: fp16
        status: 0
        supported_parameters:
          - temperature
          - top_p
          - max_tokens
        supports_implicit_caching: true
        tag: openai
        throughput_last_30m:
          p50: 45.2
          p75: 38.5
          p90: 28.3
          p99: 15.1
        uptime_last_1d: 99.8
        uptime_last_30m: 99.5
        uptime_last_5m: 100
      properties:
        context_length:
          type: integer
        latency_last_30m:
          $ref: '#/components/schemas/PercentileStats'
        max_completion_tokens:
          type:
            - integer
            - 'null'
        max_prompt_tokens:
          type:
            - integer
            - 'null'
        model_id:
          description: The unique identifier for the model (permaslug)
          example: openai/gpt-4
          type: string
        model_name:
          type: string
        name:
          type: string
        pricing:
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
                Fractional discount applied to this endpoint's pricing; the
                price is multiplied by (1 - discount) (0 = no discount, 1 =
                free)
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
                Price per cache-write token, in USD per token. For providers
                with multiple cache TTLs (e.g. Anthropic), this is the default
                (5-minute) cache-write rate.
              type: string
            input_cache_write_1h:
              description: >-
                Price per 1-hour cache-write token, in USD per token. Only
                present for providers that price an extended (1-hour) cache TTL
                separately, such as Anthropic.
              type: string
            internal_reasoning:
              description: Price in USD per internal reasoning token
              type: string
            overrides:
              description: >-
                Conditional overrides of the base pricing (e.g. long-context or
                time-based pricing). An entry applies when all of its condition
                fields (e.g. min_prompt_tokens, or the utc_start/utc_end time
                window) match the request; among applicable entries, later
                entries win per key; price keys absent from an entry inherit the
                base price. The top-level pricing keys always reflect the price
                that applies under default conditions.
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
        provider_name:
          $ref: '#/components/schemas/ProviderName'
        quantization:
          anyOf:
            - $ref: '#/components/schemas/Quantization'
            - type: 'null'
        status:
          $ref: '#/components/schemas/EndpointStatus'
        supported_parameters:
          items:
            $ref: '#/components/schemas/Parameter'
          type: array
        supports_implicit_caching:
          type: boolean
        tag:
          type: string
        throughput_last_30m:
          allOf:
            - $ref: '#/components/schemas/PercentileStats'
            - description: >-
                Throughput percentiles in tokens per second over the last 30
                minutes. Throughput measures output token generation speed. Only
                visible when authenticated with an API key or cookie; returns
                null for unauthenticated requests.
        uptime_last_1d:
          description: >-
            Uptime percentage over the last 1 day, calculated as successful
            requests / (successful + error requests) * 100. Rate-limited
            requests are excluded. Returns null if insufficient data.
          format: double
          type:
            - number
            - 'null'
        uptime_last_30m:
          format: double
          type:
            - number
            - 'null'
        uptime_last_5m:
          description: >-
            Uptime percentage over the last 5 minutes, calculated as successful
            requests / (successful + error requests) * 100. Rate-limited
            requests are excluded. Returns null if insufficient data.
          format: double
          type:
            - number
            - 'null'
      required:
        - name
        - model_id
        - model_name
        - context_length
        - pricing
        - provider_name
        - tag
        - quantization
        - max_completion_tokens
        - max_prompt_tokens
        - supported_parameters
        - uptime_last_30m
        - uptime_last_5m
        - uptime_last_1d
        - supports_implicit_caching
        - latency_last_30m
        - throughput_last_30m
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
    PercentileStats:
      description: >-
        Latency percentiles in milliseconds over the last 30 minutes. Latency
        measures time to first token. Only visible when authenticated with an
        API key or cookie; returns null for unauthenticated requests.
      example:
        p50: 25.5
        p75: 35.2
        p90: 48.7
        p99: 85.3
      properties:
        p50:
          description: Median (50th percentile)
          example: 25.5
          format: double
          type: number
        p75:
          description: 75th percentile
          example: 35.2
          format: double
          type: number
        p90:
          description: 90th percentile
          example: 48.7
          format: double
          type: number
        p99:
          description: 99th percentile
          example: 85.3
          format: double
          type: number
      required:
        - p50
        - p75
        - p90
        - p99
      type:
        - object
        - 'null'
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
    EndpointStatus:
      enum:
        - 0
        - -1
        - -2
        - -3
        - -5
        - -10
      example: 0
      type: integer
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````