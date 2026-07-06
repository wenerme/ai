> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List image generation models

> Lists every image generation model with its top-level supported-parameter superset and a URL to its full per-endpoint records.



## OpenAPI

````yaml /openapi/openapi.yaml get /images/models
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
  /images/models:
    get:
      tags:
        - Images
      summary: List image generation models
      description: >-
        Lists every image generation model with its top-level
        supported-parameter superset and a URL to its full per-endpoint records.
      operationId: listImageModels
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - architecture:
                      input_modalities:
                        - text
                      output_modalities:
                        - image
                    created: 1692901234
                    description: A text-to-image model.
                    endpoints: >-
                      /api/v1/images/models/bytedance-seed/seedream-4.5/endpoints
                    id: bytedance-seed/seedream-4.5
                    name: Seedream 4.5
                    supported_parameters:
                      resolution:
                        type: enum
                        values:
                          - 1K
                          - 2K
                          - 4K
                    supports_streaming: false
              schema:
                $ref: '#/components/schemas/ImageModelsListResponse'
          description: List of image generation models
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
    ImageModelsListResponse:
      description: List of image generation models.
      example:
        data:
          - architecture:
              input_modalities:
                - text
              output_modalities:
                - image
            created: 1692901234
            description: A text-to-image model.
            endpoints: /api/v1/images/models/bytedance-seed/seedream-4.5/endpoints
            id: bytedance-seed/seedream-4.5
            name: Seedream 4.5
            supported_parameters:
              resolution:
                type: enum
                values:
                  - 1K
                  - 2K
                  - 4K
            supports_streaming: false
      properties:
        data:
          items:
            $ref: '#/components/schemas/ImageModelListItem'
          type: array
      required:
        - data
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
    ImageModelListItem:
      description: A single image model in the discovery listing.
      example:
        architecture:
          input_modalities:
            - text
            - image
          output_modalities:
            - image
        created: 1692901234
        description: A text-to-image model.
        endpoints: /api/v1/images/models/bytedance-seed/seedream-4.5/endpoints
        id: bytedance-seed/seedream-4.5
        name: Seedream 4.5
        supported_parameters:
          resolution:
            type: enum
            values:
              - 1K
              - 2K
              - 4K
          seed:
            type: boolean
        supports_streaming: false
      properties:
        architecture:
          $ref: '#/components/schemas/ImageModelArchitecture'
        created:
          description: Unix timestamp (seconds) of when the model was created
          example: 1692901234
          type: integer
        description:
          example: A text-to-image model.
          type: string
        endpoints:
          description: Relative URL to the full per-endpoint records for this model
          example: /api/v1/images/models/bytedance-seed/seedream-4.5/endpoints
          type: string
        id:
          description: Model slug
          example: bytedance-seed/seedream-4.5
          type: string
        name:
          description: Display name
          example: Seedream 4.5
          type: string
        supported_parameters:
          $ref: '#/components/schemas/SupportedParameters'
        supports_streaming:
          description: >-
            Whether any endpoint of this model supports native SSE streaming on
            the dedicated Image API (i.e. `stream: true` in the request). OR
            across endpoints.
          example: false
          type: boolean
      required:
        - id
        - name
        - description
        - created
        - architecture
        - supported_parameters
        - supports_streaming
        - endpoints
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
    ImageModelArchitecture:
      example:
        input_modalities:
          - text
          - image
        output_modalities:
          - image
      properties:
        input_modalities:
          description: Supported input modalities
          items:
            $ref: '#/components/schemas/InputModality'
          type: array
        output_modalities:
          description: Supported output modalities
          items:
            $ref: '#/components/schemas/ImageOutputModality'
          type: array
      required:
        - input_modalities
        - output_modalities
      type: object
    SupportedParameters:
      additionalProperties:
        $ref: '#/components/schemas/CapabilityDescriptor'
      description: >-
        Union of supported parameters across every endpoint of this model.
        Coarse discovery aid; the definitive per-endpoint set is behind the
        endpoints URL.
      example:
        output_compression:
          max: 100
          min: 0
          type: range
        resolution:
          type: enum
          values:
            - 1K
            - 2K
            - 4K
        seed:
          type: boolean
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
    ImageOutputModality:
      enum:
        - text
        - image
        - embeddings
        - audio
        - video
        - rerank
        - speech
        - transcription
      example: image
      type: string
    CapabilityDescriptor:
      description: A typed descriptor for one supported request parameter.
      discriminator:
        mapping:
          boolean:
            $ref: '#/components/schemas/BooleanCapability'
          enum:
            $ref: '#/components/schemas/EnumCapability'
          range:
            $ref: '#/components/schemas/RangeCapability'
        propertyName: type
      example:
        type: enum
        values:
          - 1K
          - 2K
          - 4K
      oneOf:
        - $ref: '#/components/schemas/EnumCapability'
        - $ref: '#/components/schemas/RangeCapability'
        - $ref: '#/components/schemas/BooleanCapability'
    BooleanCapability:
      description: A supported-or-not flag. Present means the parameter is accepted.
      example:
        type: boolean
      properties:
        type:
          enum:
            - boolean
          type: string
      required:
        - type
      type: object
    EnumCapability:
      description: A parameter that accepts one of a discrete set of string values.
      example:
        type: enum
        values:
          - 1K
          - 2K
          - 4K
      properties:
        type:
          enum:
            - enum
          type: string
        values:
          items:
            type: string
          type: array
      required:
        - type
        - values
      type: object
    RangeCapability:
      description: A parameter that accepts any value within an inclusive numeric range.
      example:
        max: 100
        min: 0
        type: range
      properties:
        max:
          type: number
        min:
          type: number
        type:
          enum:
            - range
          type: string
      required:
        - type
        - min
        - max
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````