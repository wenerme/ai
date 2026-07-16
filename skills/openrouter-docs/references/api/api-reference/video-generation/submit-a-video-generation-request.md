> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Submit a video generation request

> Submits a video generation request and returns a polling URL to check status



## OpenAPI

````yaml /openapi/openapi.yaml post /videos
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
  /videos:
    post:
      tags:
        - Video Generation
      summary: Submit a video generation request
      description: >-
        Submits a video generation request and returns a polling URL to check
        status
      operationId: createVideos
      requestBody:
        content:
          application/json:
            example:
              aspect_ratio: '16:9'
              duration: 8
              model: google/veo-3.1
              prompt: A serene mountain landscape at sunset
              resolution: 720p
            schema:
              $ref: '#/components/schemas/VideoGenerationRequest'
        required: true
      responses:
        '202':
          content:
            application/json:
              example:
                generation_id: gen-xyz789
                id: job-abc123
                polling_url: /api/v1/videos/job-abc123
                status: pending
              schema:
                $ref: '#/components/schemas/VideoGenerationResponse'
          description: Video generation request accepted
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
components:
  schemas:
    VideoGenerationRequest:
      example:
        aspect_ratio: '16:9'
        duration: 8
        model: google/veo-3.1
        prompt: A serene mountain landscape at sunset
        resolution: 720p
      properties:
        aspect_ratio:
          description: Aspect ratio of the generated video
          enum:
            - '16:9'
            - '9:16'
            - '1:1'
            - '4:3'
            - '3:4'
            - '3:2'
            - '2:3'
            - '21:9'
            - '9:21'
          example: '16:9'
          type: string
        callback_url:
          description: >-
            URL to receive a webhook notification when the video generation job
            completes. Overrides the workspace-level default callback URL if
            set. Must be HTTPS.
          example: https://example.com/webhook
          format: uri
          type: string
        duration:
          description: Duration of the generated video in seconds
          example: 8
          minimum: 1
          type: integer
        frame_images:
          description: >-
            Images to use as the first and/or last frame of the generated video.
            Each image must specify a frame_type of first_frame or last_frame.
          items:
            $ref: '#/components/schemas/FrameImage'
          type: array
        generate_audio:
          description: >-
            Whether to generate audio alongside the video. Defaults to the
            endpoint's generate_audio capability flag, false if not set.
          example: true
          type: boolean
        input_references:
          description: >-
            Reference assets to guide video generation. Accepts image, audio,
            and video references. Audio and video references are only honored by
            providers that support them (currently BytePlus Seedance 2.0); other
            providers use image references and ignore the rest.
          items:
            $ref: '#/components/schemas/InputReference'
          type: array
        model:
          type: string
        prompt:
          type: string
        provider:
          description: Provider-specific passthrough configuration
          properties:
            options:
              allOf:
                - $ref: '#/components/schemas/ProviderOptions'
                - example:
                    google-vertex:
                      output_config:
                        effort: low
          type: object
        resolution:
          description: Resolution of the generated video
          enum:
            - 480p
            - 720p
            - 1080p
            - 1K
            - 2K
            - 4K
          example: 720p
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
            Exact pixel dimensions of the generated video in "WIDTHxHEIGHT"
            format (e.g. "1280x720"). Interchangeable with resolution +
            aspect_ratio.
          example: 1280x720
          type: string
      required:
        - prompt
        - model
      type: object
    VideoGenerationResponse:
      example:
        generation_id: gen-xyz789
        id: job-abc123
        polling_url: /api/v1/videos/job-abc123
        status: pending
      properties:
        error:
          type: string
        generation_id:
          description: >-
            The generation ID associated with this video generation job.
            Available once the job has been processed.
          type: string
        id:
          type: string
        polling_url:
          type: string
        status:
          enum:
            - pending
            - in_progress
            - completed
            - failed
            - cancelled
            - expired
          type: string
        unsigned_urls:
          items:
            type: string
          type: array
        usage:
          $ref: '#/components/schemas/VideoGenerationUsage'
      required:
        - id
        - polling_url
        - status
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
    FrameImage:
      allOf:
        - $ref: '#/components/schemas/ContentPartImage'
        - properties:
            frame_type:
              description: >-
                Whether this image represents the first or last frame of the
                video
              enum:
                - first_frame
                - last_frame
              example: first_frame
              type: string
          required:
            - frame_type
          type: object
      example:
        image_url:
          url: https://example.com/image.png
        type: image_url
    InputReference:
      description: >-
        A reference asset used to guide video generation. Image references are
        supported by all providers; audio and video references are only honored
        by providers that support them (currently BytePlus Seedance 2.0).
      discriminator:
        mapping:
          audio_url:
            $ref: '#/components/schemas/ContentPartAudio'
          image_url:
            $ref: '#/components/schemas/ContentPartImage'
          video_url:
            $ref: '#/components/schemas/ContentPartVideo'
        propertyName: type
      example:
        image_url:
          url: https://example.com/image.png
        type: image_url
      oneOf:
        - $ref: '#/components/schemas/ContentPartImage'
        - $ref: '#/components/schemas/ContentPartAudio'
        - $ref: '#/components/schemas/ContentPartVideo'
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
        krea:
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
        sail-research:
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
    VideoGenerationUsage:
      description: >-
        Usage and cost information for the video generation. Available once the
        job has completed.
      example:
        cost: 0.5
        is_byok: false
      properties:
        cost:
          description: The cost of the video generation in USD.
          format: double
          nullable: true
          type: number
        is_byok:
          description: >-
            Whether the request was made using a Bring Your Own Key
            configuration.
          type: boolean
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
    ContentPartAudio:
      example:
        audio_url:
          url: https://example.com/audio.mp3
        type: audio_url
      properties:
        audio_url:
          properties:
            url:
              type: string
          required:
            - url
          type: object
        type:
          enum:
            - audio_url
          type: string
      required:
        - type
        - audio_url
      type: object
    ContentPartVideo:
      example:
        type: video_url
        video_url:
          url: https://example.com/clip.mp4
      properties:
        type:
          enum:
            - video_url
          type: string
        video_url:
          properties:
            url:
              type: string
          required:
            - url
          type: object
      required:
        - type
        - video_url
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````