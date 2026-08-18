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
  - description: >-
      Public OpenRouter usage datasets. Data returned by these endpoints is
      licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/):
      reuse and republish it, including commercially, with attribution to
      OpenRouter.
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
  - description: SCIM endpoints
    name: SCIM
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
            providers that support them (including BytePlus Seedance generation
            2 and newer); other providers use image references and ignore the
            rest.
          items:
            $ref: '#/components/schemas/InputReference'
          type: array
        model:
          type: string
        prompt:
          description: >-
            Text prompt describing the video to generate. Optional for models
            that support generating a video from image input alone; required by
            all other models.
          example: A serene mountain landscape at sunset
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
            - 768p
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
        frame_type: first_frame
        image_url:
          url: https://example.com/image.png
        type: image_url
    InputReference:
      description: >-
        A reference asset used to guide video generation. Image references are
        supported by all providers; audio and video references are only honored
        by providers that support them (including BytePlus Seedance generation 2
        and newer).
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
        amazon-bedrock/claude-on-aws:
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
        anthropic/2:
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
        databricks:
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
        thinkingmachines:
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
          type:
            - number
            - 'null'
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