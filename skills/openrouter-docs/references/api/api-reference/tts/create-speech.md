> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create speech

> Synthesizes audio from the input text. Returns a raw audio bytestream in the requested format (e.g. mp3, pcm, wav).



## OpenAPI

````yaml /openapi/openapi.yaml post /audio/speech
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
  /audio/speech:
    post:
      tags:
        - TTS
      summary: Create speech
      description: >-
        Synthesizes audio from the input text. Returns a raw audio bytestream in
        the requested format (e.g. mp3, pcm, wav).
      operationId: createAudioSpeech
      requestBody:
        content:
          application/json:
            example:
              input: Hello world
              model: mistralai/voxtral-mini-tts-2603
              response_format: pcm
              speed: 1
              voice: en_paul_neutral
            schema:
              $ref: '#/components/schemas/SpeechRequest'
        required: true
      responses:
        '200':
          content:
            audio/*:
              schema:
                description: >-
                  Raw audio bytestream. Content-Type varies by requested format
                  (audio/mpeg for mp3, audio/pcm for pcm — 16-bit
                  little-endian).
                example: <binary audio data>
                format: binary
                type: string
          description: Audio bytes stream
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
    SpeechRequest:
      description: Text-to-speech request input
      example:
        input: Hello world
        model: mistralai/voxtral-mini-tts-2603
        response_format: pcm
        speed: 1
        voice: en_paul_neutral
      properties:
        input:
          description: Text to synthesize
          example: Hello world
          type: string
        model:
          description: TTS model identifier
          example: mistralai/voxtral-mini-tts-2603
          type: string
        provider:
          description: Provider-specific passthrough configuration
          properties:
            options:
              $ref: '#/components/schemas/ProviderOptions'
          type: object
        response_format:
          default: pcm
          description: Audio output format
          enum:
            - mp3
            - pcm
          example: pcm
          type: string
        speed:
          description: >-
            Playback speed multiplier. Only used by models that support it (e.g.
            OpenAI TTS). Ignored by other providers.
          example: 1
          format: double
          type: number
        voice:
          description: Voice identifier (provider-specific).
          example: en_paul_neutral
          type: string
      required:
        - model
        - input
        - voice
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
    ProviderOptions:
      description: >-
        Provider-specific options keyed by provider slug. Only options for the
        matched provider are forwarded; the rest are ignored. Unrecognized keys
        are silently dropped.
      example:
        openai:
          max_tokens: 1000
      properties:
        01ai:
          additionalProperties: {}
          type: object
        ai21:
          additionalProperties: {}
          type: object
        aion-labs:
          additionalProperties: {}
          type: object
        akashml:
          additionalProperties: {}
          type: object
        alibaba:
          additionalProperties: {}
          type: object
        amazon-bedrock:
          additionalProperties: {}
          type: object
        amazon-nova:
          additionalProperties: {}
          type: object
        ambient:
          additionalProperties: {}
          type: object
        anthropic:
          additionalProperties: {}
          type: object
        anyscale:
          additionalProperties: {}
          type: object
        arcee-ai:
          additionalProperties: {}
          type: object
        atlas-cloud:
          additionalProperties: {}
          type: object
        atoma:
          additionalProperties: {}
          type: object
        avian:
          additionalProperties: {}
          type: object
        azure:
          additionalProperties: {}
          type: object
        baidu:
          additionalProperties: {}
          type: object
        baseten:
          additionalProperties: {}
          type: object
        black-forest-labs:
          additionalProperties: {}
          type: object
        byteplus:
          additionalProperties: {}
          type: object
        centml:
          additionalProperties: {}
          type: object
        cerebras:
          additionalProperties: {}
          type: object
        chutes:
          additionalProperties: {}
          type: object
        cirrascale:
          additionalProperties: {}
          type: object
        clarifai:
          additionalProperties: {}
          type: object
        claude-on-aws:
          additionalProperties: {}
          type: object
        cloudflare:
          additionalProperties: {}
          type: object
        cohere:
          additionalProperties: {}
          type: object
        coreweave:
          additionalProperties: {}
          type: object
        crofai:
          additionalProperties: {}
          type: object
        crucible:
          additionalProperties: {}
          type: object
        crusoe:
          additionalProperties: {}
          type: object
        darkbloom:
          additionalProperties: {}
          type: object
        decart:
          additionalProperties: {}
          type: object
        deepgram:
          additionalProperties: {}
          type: object
        deepinfra:
          additionalProperties: {}
          type: object
        deepseek:
          additionalProperties: {}
          type: object
        dekallm:
          additionalProperties: {}
          type: object
        digitalocean:
          additionalProperties: {}
          type: object
        enfer:
          additionalProperties: {}
          type: object
        fake-provider:
          additionalProperties: {}
          type: object
        featherless:
          additionalProperties: {}
          type: object
        fireworks:
          additionalProperties: {}
          type: object
        fish-audio:
          additionalProperties: {}
          type: object
        friendli:
          additionalProperties: {}
          type: object
        gmicloud:
          additionalProperties: {}
          type: object
        google-ai-studio:
          additionalProperties: {}
          type: object
        google-vertex:
          additionalProperties: {}
          type: object
        gopomelo:
          additionalProperties: {}
          type: object
        groq:
          additionalProperties: {}
          type: object
        heygen:
          additionalProperties: {}
          type: object
        huggingface:
          additionalProperties: {}
          type: object
        hyperbolic:
          additionalProperties: {}
          type: object
        hyperbolic-quantized:
          additionalProperties: {}
          type: object
        inception:
          additionalProperties: {}
          type: object
        inceptron:
          additionalProperties: {}
          type: object
        inferact-vllm:
          additionalProperties: {}
          type: object
        inference-net:
          additionalProperties: {}
          type: object
        infermatic:
          additionalProperties: {}
          type: object
        inflection:
          additionalProperties: {}
          type: object
        inocloud:
          additionalProperties: {}
          type: object
        io-net:
          additionalProperties: {}
          type: object
        ionstream:
          additionalProperties: {}
          type: object
        klusterai:
          additionalProperties: {}
          type: object
        krea:
          additionalProperties: {}
          type: object
        lambda:
          additionalProperties: {}
          type: object
        lepton:
          additionalProperties: {}
          type: object
        liquid:
          additionalProperties: {}
          type: object
        lynn:
          additionalProperties: {}
          type: object
        lynn-private:
          additionalProperties: {}
          type: object
        mancer:
          additionalProperties: {}
          type: object
        mancer-old:
          additionalProperties: {}
          type: object
        mara:
          additionalProperties: {}
          type: object
        meta:
          additionalProperties: {}
          type: object
        minimax:
          additionalProperties: {}
          type: object
        mistral:
          additionalProperties: {}
          type: object
        modal:
          additionalProperties: {}
          type: object
        modelrun:
          additionalProperties: {}
          type: object
        modular:
          additionalProperties: {}
          type: object
        moonshotai:
          additionalProperties: {}
          type: object
        morph:
          additionalProperties: {}
          type: object
        ncompass:
          additionalProperties: {}
          type: object
        nebius:
          additionalProperties: {}
          type: object
        nex-agi:
          additionalProperties: {}
          type: object
        nextbit:
          additionalProperties: {}
          type: object
        nineteen:
          additionalProperties: {}
          type: object
        novita:
          additionalProperties: {}
          type: object
        nvidia:
          additionalProperties: {}
          type: object
        octoai:
          additionalProperties: {}
          type: object
        open-inference:
          additionalProperties: {}
          type: object
        openai:
          additionalProperties: {}
          type: object
        parasail:
          additionalProperties: {}
          type: object
        perceptron:
          additionalProperties: {}
          type: object
        perplexity:
          additionalProperties: {}
          type: object
        phala:
          additionalProperties: {}
          type: object
        poolside:
          additionalProperties: {}
          type: object
        quiver:
          additionalProperties: {}
          type: object
        recraft:
          additionalProperties: {}
          type: object
        recursal:
          additionalProperties: {}
          type: object
        reflection:
          additionalProperties: {}
          type: object
        reka:
          additionalProperties: {}
          type: object
        relace:
          additionalProperties: {}
          type: object
        replicate:
          additionalProperties: {}
          type: object
        runway:
          additionalProperties: {}
          type: object
        sail-research:
          additionalProperties: {}
          type: object
        sakana:
          additionalProperties: {}
          type: object
        sakana-ai:
          additionalProperties: {}
          type: object
        sambanova:
          additionalProperties: {}
          type: object
        sambanova-cloaked:
          additionalProperties: {}
          type: object
        seed:
          additionalProperties: {}
          type: object
        sf-compute:
          additionalProperties: {}
          type: object
        siliconflow:
          additionalProperties: {}
          type: object
        sourceful:
          additionalProperties: {}
          type: object
        stealth:
          additionalProperties: {}
          type: object
        stepfun:
          additionalProperties: {}
          type: object
        streamlake:
          additionalProperties: {}
          type: object
        switchpoint:
          additionalProperties: {}
          type: object
        targon:
          additionalProperties: {}
          type: object
        tencent:
          additionalProperties: {}
          type: object
        tenstorrent:
          additionalProperties: {}
          type: object
        together:
          additionalProperties: {}
          type: object
        together-lite:
          additionalProperties: {}
          type: object
        ubicloud:
          additionalProperties: {}
          type: object
        upstage:
          additionalProperties: {}
          type: object
        venice:
          additionalProperties: {}
          type: object
        voyageai:
          additionalProperties: {}
          type: object
        wafer:
          additionalProperties: {}
          type: object
        wandb:
          additionalProperties: {}
          type: object
        wandb-legacy:
          additionalProperties: {}
          type: object
        xai:
          additionalProperties: {}
          type: object
        xiaomi:
          additionalProperties: {}
          type: object
        z-ai:
          additionalProperties: {}
          type: object
      type: object
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
          additionalProperties: {}
          type:
            - object
            - 'null'
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
          additionalProperties: {}
          type:
            - object
            - 'null'
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
          additionalProperties: {}
          type:
            - object
            - 'null'
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