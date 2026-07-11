> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate an image

> Generates an image from a text prompt via the image generation router



## OpenAPI

````yaml /openapi/openapi.yaml post /images
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
  /images:
    post:
      tags:
        - Images
      summary: Generate an image
      description: Generates an image from a text prompt via the image generation router
      operationId: createImages
      requestBody:
        content:
          application/json:
            example:
              model: bytedance-seed/seedream-4.5
              prompt: a red panda astronaut floating in space, studio lighting
            schema:
              $ref: '#/components/schemas/ImageGenerationRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                created: 1748372400
                data:
                  - b64_json: <base64-encoded-image>
                usage:
                  completion_tokens: 4175
                  cost: 0.04
                  prompt_tokens: 0
                  total_tokens: 4175
              schema:
                $ref: '#/components/schemas/ImageGenerationResponse'
            text/event-stream:
              example:
                data:
                  b64_json: <base64-encoded-partial-image>
                  partial_image_index: 0
                  type: image_generation.partial_image
              schema:
                $ref: '#/components/schemas/ImageStreamingResponse'
              x-speakeasy-sse-sentinel: '[DONE]'
          description: Image generation response
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
    ImageGenerationRequest:
      description: Image generation request input
      example:
        model: bytedance-seed/seedream-4.5
        prompt: a red panda astronaut floating in space, studio lighting
      properties:
        aspect_ratio:
          description: >-
            Normalized aspect ratio of the generated image. Providers clamp to
            their supported subset.
          enum:
            - '1:1'
            - '1:2'
            - '1:4'
            - '1:8'
            - '2:1'
            - '2:3'
            - '3:2'
            - '3:4'
            - '4:1'
            - '4:3'
            - '4:5'
            - '5:4'
            - '8:1'
            - '9:16'
            - '16:9'
            - '9:19.5'
            - 19.5:9
            - '9:20'
            - '20:9'
            - '9:21'
            - '21:9'
            - auto
          example: '16:9'
          type: string
        background:
          description: >-
            Background treatment. `transparent` requires an output_format that
            supports alpha (png or webp).
          enum:
            - auto
            - transparent
            - opaque
          example: auto
          type: string
        input_references:
          description: >-
            Reference images to guide image-to-image generation, as base64 data
            URLs or HTTP(S) URLs.
          items:
            $ref: '#/components/schemas/ContentPartImage'
          maxItems: 16
          type: array
        model:
          description: The image generation model to use
          example: bytedance-seed/seedream-4.5
          type: string
        'n':
          description: >-
            Number of images to generate (1-10). Providers that only support
            single-image generation reject n > 1.
          example: 1
          type: integer
        output_compression:
          description: >-
            Compression level (0-100) for webp/jpeg output. Ignored for png and
            by providers without a compression knob.
          example: 100
          type: integer
        output_format:
          description: >-
            Encoding of the returned image bytes. Most models produce raster
            formats (png, jpeg, webp). SVG is supported by vectorization models
            (e.g. Quiver) — the SVG markup is UTF-8 base64-encoded in
            `b64_json`.
          enum:
            - png
            - jpeg
            - webp
            - svg
          example: png
          type: string
        prompt:
          description: Text description of the desired image
          example: a red panda astronaut floating in space, studio lighting
          minLength: 1
          type: string
        provider:
          description: Provider-specific passthrough configuration
          properties:
            options:
              allOf:
                - $ref: '#/components/schemas/ProviderOptions'
                - example:
                    black-forest-labs:
                      guidance: 3
                      steps: 40
          type: object
        quality:
          description: Rendering quality. Providers without a quality knob ignore this.
          enum:
            - auto
            - low
            - medium
            - high
          example: high
          type: string
        resolution:
          description: >-
            Normalized resolution tier of the generated image. Concrete pixel
            dimensions are derived per-provider.
          enum:
            - '512'
            - 1K
            - 2K
            - 4K
          example: 2K
          type: string
        seed:
          description: >-
            If specified, the generation will sample deterministically, such
            that repeated requests with the same seed and parameters should
            return the same result. Determinism is not guaranteed for all
            providers.
          type: integer
        size:
          description: >-
            Optional. A convenience shorthand for output dimensions — pass a
            tier ("2K", "4K") or explicit pixels ("2048x2048") and we normalize
            it to the right dimensions for the chosen provider. A tier size is
            equivalent to setting `resolution` and combines with `aspect_ratio`.
            An explicit pixel size is authoritative: a mismatched `resolution`
            or `aspect_ratio` alongside it is rejected with a 400.
          example: 2K
          type: string
        stream:
          description: >-
            If true, partial images are streamed as SSE events as they become
            available. Only supported by providers with native streaming
            (currently OpenAI). Non-streaming providers ignore this flag and
            return a buffered response.
          type: boolean
      required:
        - model
        - prompt
      type: object
    ImageGenerationResponse:
      description: Image generation response
      example:
        created: 1748372400
        data:
          - b64_json: <base64-encoded-image>
        usage:
          completion_tokens: 4175
          cost: 0.04
          prompt_tokens: 0
          total_tokens: 4175
      properties:
        created:
          description: Unix timestamp (seconds) when the image was generated
          example: 1748372400
          type: integer
        data:
          description: Generated images
          items:
            properties:
              b64_json:
                description: Base64-encoded image bytes
                type: string
              media_type:
                description: >-
                  Media type (MIME type) of the image, e.g. `image/png`,
                  `image/jpeg`, `image/webp`, `image/svg+xml`. May be omitted if
                  the format could not be determined.
                example: image/png
                type: string
            required:
              - b64_json
            type: object
          type: array
        usage:
          $ref: '#/components/schemas/ImageGenerationUsage'
      required:
        - created
        - data
      type: object
    ImageStreamingResponse:
      example:
        data:
          b64_json: <base64-encoded-partial-image>
          partial_image_index: 0
          type: image_generation.partial_image
      properties:
        data:
          anyOf:
            - $ref: '#/components/schemas/ImageGenPartialImageEvent'
            - $ref: '#/components/schemas/ImageGenTextChunkEvent'
            - $ref: '#/components/schemas/ImageGenCompletedEvent'
            - $ref: '#/components/schemas/ImageGenStreamErrorEvent'
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
    ContentPartImage:
      example:
        image_url:
          url: https://example.com/image.png
        type: image_url
      properties:
        image_url:
          properties:
            url:
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
          additionalProperties:
            nullable: true
          type: object
        ai21:
          additionalProperties:
            nullable: true
          type: object
        aion-labs:
          additionalProperties:
            nullable: true
          type: object
        akashml:
          additionalProperties:
            nullable: true
          type: object
        alibaba:
          additionalProperties:
            nullable: true
          type: object
        amazon-bedrock:
          additionalProperties:
            nullable: true
          type: object
        amazon-nova:
          additionalProperties:
            nullable: true
          type: object
        ambient:
          additionalProperties:
            nullable: true
          type: object
        anthropic:
          additionalProperties:
            nullable: true
          type: object
        anyscale:
          additionalProperties:
            nullable: true
          type: object
        arcee-ai:
          additionalProperties:
            nullable: true
          type: object
        atlas-cloud:
          additionalProperties:
            nullable: true
          type: object
        atoma:
          additionalProperties:
            nullable: true
          type: object
        avian:
          additionalProperties:
            nullable: true
          type: object
        azure:
          additionalProperties:
            nullable: true
          type: object
        baidu:
          additionalProperties:
            nullable: true
          type: object
        baseten:
          additionalProperties:
            nullable: true
          type: object
        black-forest-labs:
          additionalProperties:
            nullable: true
          type: object
        byteplus:
          additionalProperties:
            nullable: true
          type: object
        centml:
          additionalProperties:
            nullable: true
          type: object
        cerebras:
          additionalProperties:
            nullable: true
          type: object
        chutes:
          additionalProperties:
            nullable: true
          type: object
        cirrascale:
          additionalProperties:
            nullable: true
          type: object
        clarifai:
          additionalProperties:
            nullable: true
          type: object
        cloudflare:
          additionalProperties:
            nullable: true
          type: object
        cohere:
          additionalProperties:
            nullable: true
          type: object
        crofai:
          additionalProperties:
            nullable: true
          type: object
        crucible:
          additionalProperties:
            nullable: true
          type: object
        crusoe:
          additionalProperties:
            nullable: true
          type: object
        darkbloom:
          additionalProperties:
            nullable: true
          type: object
        decart:
          additionalProperties:
            nullable: true
          type: object
        deepgram:
          additionalProperties:
            nullable: true
          type: object
        deepinfra:
          additionalProperties:
            nullable: true
          type: object
        deepseek:
          additionalProperties:
            nullable: true
          type: object
        dekallm:
          additionalProperties:
            nullable: true
          type: object
        digitalocean:
          additionalProperties:
            nullable: true
          type: object
        enfer:
          additionalProperties:
            nullable: true
          type: object
        fake-provider:
          additionalProperties:
            nullable: true
          type: object
        featherless:
          additionalProperties:
            nullable: true
          type: object
        fireworks:
          additionalProperties:
            nullable: true
          type: object
        friendli:
          additionalProperties:
            nullable: true
          type: object
        gmicloud:
          additionalProperties:
            nullable: true
          type: object
        google-ai-studio:
          additionalProperties:
            nullable: true
          type: object
        google-vertex:
          additionalProperties:
            nullable: true
          type: object
        gopomelo:
          additionalProperties:
            nullable: true
          type: object
        groq:
          additionalProperties:
            nullable: true
          type: object
        heygen:
          additionalProperties:
            nullable: true
          type: object
        huggingface:
          additionalProperties:
            nullable: true
          type: object
        hyperbolic:
          additionalProperties:
            nullable: true
          type: object
        hyperbolic-quantized:
          additionalProperties:
            nullable: true
          type: object
        inception:
          additionalProperties:
            nullable: true
          type: object
        inceptron:
          additionalProperties:
            nullable: true
          type: object
        inferact-vllm:
          additionalProperties:
            nullable: true
          type: object
        inference-net:
          additionalProperties:
            nullable: true
          type: object
        infermatic:
          additionalProperties:
            nullable: true
          type: object
        inflection:
          additionalProperties:
            nullable: true
          type: object
        inocloud:
          additionalProperties:
            nullable: true
          type: object
        io-net:
          additionalProperties:
            nullable: true
          type: object
        ionstream:
          additionalProperties:
            nullable: true
          type: object
        klusterai:
          additionalProperties:
            nullable: true
          type: object
        lambda:
          additionalProperties:
            nullable: true
          type: object
        lepton:
          additionalProperties:
            nullable: true
          type: object
        liquid:
          additionalProperties:
            nullable: true
          type: object
        lynn:
          additionalProperties:
            nullable: true
          type: object
        lynn-private:
          additionalProperties:
            nullable: true
          type: object
        mancer:
          additionalProperties:
            nullable: true
          type: object
        mancer-old:
          additionalProperties:
            nullable: true
          type: object
        mara:
          additionalProperties:
            nullable: true
          type: object
        meta:
          additionalProperties:
            nullable: true
          type: object
        minimax:
          additionalProperties:
            nullable: true
          type: object
        mistral:
          additionalProperties:
            nullable: true
          type: object
        modal:
          additionalProperties:
            nullable: true
          type: object
        modelrun:
          additionalProperties:
            nullable: true
          type: object
        modular:
          additionalProperties:
            nullable: true
          type: object
        moonshotai:
          additionalProperties:
            nullable: true
          type: object
        morph:
          additionalProperties:
            nullable: true
          type: object
        ncompass:
          additionalProperties:
            nullable: true
          type: object
        nebius:
          additionalProperties:
            nullable: true
          type: object
        nex-agi:
          additionalProperties:
            nullable: true
          type: object
        nextbit:
          additionalProperties:
            nullable: true
          type: object
        nineteen:
          additionalProperties:
            nullable: true
          type: object
        novita:
          additionalProperties:
            nullable: true
          type: object
        nvidia:
          additionalProperties:
            nullable: true
          type: object
        octoai:
          additionalProperties:
            nullable: true
          type: object
        open-inference:
          additionalProperties:
            nullable: true
          type: object
        openai:
          additionalProperties:
            nullable: true
          type: object
        parasail:
          additionalProperties:
            nullable: true
          type: object
        perceptron:
          additionalProperties:
            nullable: true
          type: object
        perplexity:
          additionalProperties:
            nullable: true
          type: object
        phala:
          additionalProperties:
            nullable: true
          type: object
        poolside:
          additionalProperties:
            nullable: true
          type: object
        quiver:
          additionalProperties:
            nullable: true
          type: object
        recraft:
          additionalProperties:
            nullable: true
          type: object
        recursal:
          additionalProperties:
            nullable: true
          type: object
        reflection:
          additionalProperties:
            nullable: true
          type: object
        reka:
          additionalProperties:
            nullable: true
          type: object
        relace:
          additionalProperties:
            nullable: true
          type: object
        replicate:
          additionalProperties:
            nullable: true
          type: object
        sakana:
          additionalProperties:
            nullable: true
          type: object
        sambanova:
          additionalProperties:
            nullable: true
          type: object
        sambanova-cloaked:
          additionalProperties:
            nullable: true
          type: object
        seed:
          additionalProperties:
            nullable: true
          type: object
        sf-compute:
          additionalProperties:
            nullable: true
          type: object
        siliconflow:
          additionalProperties:
            nullable: true
          type: object
        sourceful:
          additionalProperties:
            nullable: true
          type: object
        stealth:
          additionalProperties:
            nullable: true
          type: object
        stepfun:
          additionalProperties:
            nullable: true
          type: object
        streamlake:
          additionalProperties:
            nullable: true
          type: object
        switchpoint:
          additionalProperties:
            nullable: true
          type: object
        targon:
          additionalProperties:
            nullable: true
          type: object
        tenstorrent:
          additionalProperties:
            nullable: true
          type: object
        together:
          additionalProperties:
            nullable: true
          type: object
        together-lite:
          additionalProperties:
            nullable: true
          type: object
        ubicloud:
          additionalProperties:
            nullable: true
          type: object
        upstage:
          additionalProperties:
            nullable: true
          type: object
        venice:
          additionalProperties:
            nullable: true
          type: object
        wafer:
          additionalProperties:
            nullable: true
          type: object
        wandb:
          additionalProperties:
            nullable: true
          type: object
        xai:
          additionalProperties:
            nullable: true
          type: object
        xiaomi:
          additionalProperties:
            nullable: true
          type: object
        z-ai:
          additionalProperties:
            nullable: true
          type: object
      type: object
    ImageGenerationUsage:
      description: Token and cost usage for the image generation request, when available
      example:
        completion_tokens: 4175
        cost: 0.04
        prompt_tokens: 0
        total_tokens: 4175
      properties:
        completion_tokens:
          description: The tokens generated
          type: integer
        completion_tokens_details:
          nullable: true
          properties:
            audio_tokens:
              description: Tokens generated by the model for audio output.
              nullable: true
              type: integer
            image_tokens:
              description: Tokens generated by the model for image output.
              nullable: true
              type: integer
            reasoning_tokens:
              description: Tokens generated by the model for reasoning.
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
        iterations:
          items:
            $ref: '#/components/schemas/AnthropicUsageIteration'
          nullable: true
          type: array
        prompt_tokens:
          description: Including images, input audio, and tools if any
          type: integer
        prompt_tokens_details:
          description: Breakdown of tokens used in the prompt.
          nullable: true
          properties:
            audio_tokens:
              description: Tokens used for input audio.
              nullable: true
              type: integer
            cache_write_tokens:
              description: >-
                Tokens written to cache. Only returned for models with explicit
                caching and cache write pricing.
              nullable: true
              type: integer
            cached_tokens:
              description: Tokens cached by the endpoint.
              nullable: true
              type: integer
            file_tokens:
              description: Tokens used for input files/documents.
              nullable: true
              type: integer
            video_tokens:
              description: Tokens used for input video.
              nullable: true
              type: integer
          type: object
        server_tool_use:
          description: Usage for server-side tool execution (e.g., web search)
          nullable: true
          properties:
            tool_calls_executed:
              description: >-
                Number of OpenRouter server tool calls that executed and
                produced a result.
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
        service_tier:
          description: The service tier used by the upstream provider for this request
          nullable: true
          type: string
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
        total_tokens:
          description: Sum of the above two fields
          type: integer
      required:
        - prompt_tokens
        - completion_tokens
        - total_tokens
      type: object
    ImageGenPartialImageEvent:
      description: >-
        Emitted when a partial image becomes available during streaming
        generation
      example:
        b64_json: <base64-encoded-partial-image>
        partial_image_index: 0
        type: image_generation.partial_image
      properties:
        b64_json:
          description: Base64-encoded partial image data
          type: string
        partial_image_index:
          description: 0-based index indicating which partial image this is in the sequence
          type: integer
        type:
          description: The event type
          enum:
            - image_generation.partial_image
          type: string
      required:
        - type
        - partial_image_index
        - b64_json
      type: object
    ImageGenTextChunkEvent:
      description: >-
        Emitted when a text chunk becomes available during streaming generation
        of text-based formats (e.g. SVG)
      example:
        phase: content
        text: <svg xmlns="http://www.w3.org/2000/svg">
        type: image_generation.text_chunk
      properties:
        phase:
          description: >-
            The generation phase this chunk belongs to. `content` is the
            renderable output; `reasoning` and `draft` are intermediate provider
            phases.
          enum:
            - content
            - reasoning
            - draft
          type: string
        text:
          description: >-
            A text fragment of the image being generated (e.g. partial SVG
            markup)
          type: string
        type:
          description: The event type
          enum:
            - image_generation.text_chunk
          type: string
      required:
        - type
        - text
        - phase
      type: object
    ImageGenCompletedEvent:
      description: Emitted when generation completes and the final image is available
      example:
        b64_json: <base64-encoded-final-image>
        created: 1748372400
        type: image_generation.completed
        usage:
          completion_tokens: 4175
          cost: 0.04
          prompt_tokens: 0
          total_tokens: 4175
      properties:
        b64_json:
          description: Base64-encoded final image data
          type: string
        created:
          description: Unix timestamp (seconds) when the image was generated
          type: integer
        media_type:
          description: >-
            Media type (MIME type) of the image, e.g. `image/png`, `image/jpeg`,
            `image/webp`, `image/svg+xml`. May be omitted if the format could
            not be determined.
          example: image/png
          type: string
        type:
          description: The event type
          enum:
            - image_generation.completed
          type: string
        usage:
          $ref: '#/components/schemas/ImageGenerationUsage'
      required:
        - type
        - b64_json
        - created
      type: object
    ImageGenStreamErrorEvent:
      description: Emitted when streaming generation fails after the SSE response starts
      example:
        error:
          code: upstream_error
          message: The upstream provider returned an error
          param: null
          type: provider_error
        type: error
      properties:
        error:
          description: Provider error details
          properties:
            code:
              description: Provider error code, when supplied
              nullable: true
              type: string
            message:
              description: Provider error message
              type: string
            param:
              description: Request parameter associated with the error, when supplied
              nullable: true
              type: string
            type:
              description: Provider error type, when supplied
              nullable: true
              type: string
          required:
            - message
          type: object
        type:
          description: The event type
          enum:
            - error
          type: string
      required:
        - type
        - error
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
    AnthropicSpeed:
      enum:
        - fast
        - standard
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````