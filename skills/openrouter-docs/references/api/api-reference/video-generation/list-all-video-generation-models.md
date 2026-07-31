> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List all video generation models

> Returns a list of all available video generation models and their properties



## OpenAPI

````yaml /openapi/openapi.yaml get /videos/models
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
  /videos/models:
    get:
      tags:
        - Video Generation
      summary: List all video generation models
      description: >-
        Returns a list of all available video generation models and their
        properties
      operationId: listVideosModels
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - allowed_passthrough_parameters: []
                    canonical_slug: google/veo-3.1
                    created: 1700000000
                    description: Google video generation model
                    generate_audio: true
                    id: google/veo-3.1
                    name: Veo 3.1
                    pricing_skus:
                      generate: '0.50'
                    seed: null
                    supported_aspect_ratios:
                      - '16:9'
                    supported_durations:
                      - 5
                      - 8
                    supported_frame_images:
                      - first_frame
                      - last_frame
                    supported_resolutions:
                      - 720p
                    supported_sizes: null
              schema:
                $ref: '#/components/schemas/VideoModelsListResponse'
          description: Returns a list of video generation models
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
    VideoModelsListResponse:
      example:
        data:
          - allowed_passthrough_parameters: []
            canonical_slug: google/veo-3.1
            created: 1700000000
            description: Google video generation model
            generate_audio: true
            id: google/veo-3.1
            name: Veo 3.1
            pricing_skus:
              generate: '0.50'
            seed: null
            supported_aspect_ratios:
              - '16:9'
            supported_durations:
              - 5
              - 8
            supported_frame_images:
              - first_frame
              - last_frame
            supported_resolutions:
              - 720p
            supported_sizes: null
      properties:
        data:
          items:
            $ref: '#/components/schemas/VideoModel'
          type: array
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
    VideoModel:
      example:
        allowed_passthrough_parameters: []
        canonical_slug: google/veo-3.1
        created: 1700000000
        description: Google video generation model
        generate_audio: true
        id: google/veo-3.1
        name: Veo 3.1
        pricing_skus:
          generate: '0.50'
        seed: null
        supported_aspect_ratios:
          - '16:9'
        supported_durations:
          - 5
          - 8
        supported_frame_images:
          - first_frame
          - last_frame
        supported_resolutions:
          - 720p
        supported_sizes: null
      properties:
        allowed_passthrough_parameters:
          description: >-
            List of parameters that are allowed to be passed through to the
            provider
          items:
            type: string
          type: array
        canonical_slug:
          description: Canonical slug for the model
          example: openai/gpt-4
          type: string
        created:
          description: Unix timestamp of when the model was created
          example: 1692901234
          type: integer
        description:
          description: Description of the model
          example: >-
            GPT-4 is a large multimodal model that can solve difficult problems
            with greater accuracy.
          type: string
        generate_audio:
          description: Whether the model supports generating audio alongside video
          type:
            - boolean
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
        name:
          description: Display name of the model
          example: GPT-4
          type: string
        pricing_skus:
          additionalProperties:
            type: string
          description: Pricing SKUs with provider prefix stripped, values as strings
          type:
            - object
            - 'null'
        seed:
          description: >-
            Whether the model supports deterministic generation via seed
            parameter
          type:
            - boolean
            - 'null'
        supported_aspect_ratios:
          description: Supported output aspect ratios
          items:
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
            type: string
          type:
            - array
            - 'null'
        supported_durations:
          description: Supported video durations in seconds
          items:
            type: integer
          type:
            - array
            - 'null'
        supported_frame_images:
          description: Supported frame image types (e.g. first_frame, last_frame)
          items:
            enum:
              - first_frame
              - last_frame
            type: string
          type:
            - array
            - 'null'
        supported_resolutions:
          description: Supported output resolutions
          items:
            enum:
              - 480p
              - 720p
              - 768p
              - 1080p
              - 1K
              - 2K
              - 4K
            type: string
          type:
            - array
            - 'null'
        supported_sizes:
          description: Supported output sizes (width x height)
          items:
            enum:
              - 480x480
              - 480x640
              - 480x720
              - 480x854
              - 480x1120
              - 640x480
              - 720x480
              - 720x720
              - 720x960
              - 720x1080
              - 720x1280
              - 720x1680
              - 768x768
              - 768x1024
              - 768x1152
              - 768x1366
              - 768x1792
              - 854x480
              - 960x720
              - 1024x768
              - 1080x720
              - 1080x1080
              - 1080x1440
              - 1080x1620
              - 1080x1920
              - 1080x2520
              - 1120x480
              - 1152x768
              - 1280x720
              - 1366x768
              - 1440x1080
              - 1440x1440
              - 1440x1920
              - 1440x2160
              - 1440x2560
              - 1440x3360
              - 1620x1080
              - 1680x720
              - 1792x768
              - 1920x1080
              - 1920x1440
              - 2160x1440
              - 2160x2160
              - 2160x2880
              - 2160x3240
              - 2160x3840
              - 2160x5040
              - 2520x1080
              - 2560x1440
              - 2880x2160
              - 3240x2160
              - 3360x1440
              - 3840x2160
              - 5040x2160
            type: string
          type:
            - array
            - 'null'
      required:
        - id
        - canonical_slug
        - name
        - created
        - supported_resolutions
        - supported_aspect_ratios
        - supported_sizes
        - supported_durations
        - supported_frame_images
        - generate_audio
        - seed
        - allowed_passthrough_parameters
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