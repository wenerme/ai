> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List endpoints for an image model

> Returns the full per-endpoint records for an image model: each endpoint's definitive supported parameters, pricing, and passthrough allowlist.



## OpenAPI

````yaml /openapi/openapi.yaml get /images/models/{author}/{slug}/endpoints
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
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /images/models/{author}/{slug}/endpoints:
    get:
      tags:
        - Images
      summary: List endpoints for an image model
      description: >-
        Returns the full per-endpoint records for an image model: each
        endpoint's definitive supported parameters, pricing, and passthrough
        allowlist.
      operationId: listImageModelEndpoints
      parameters:
        - description: Model author/organization
          in: path
          name: author
          required: true
          schema:
            description: Model author/organization
            example: bytedance-seed
            type: string
        - description: Model slug
          in: path
          name: slug
          required: true
          schema:
            description: Model slug
            example: seedream-4.5
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                endpoints:
                  - allowed_passthrough_parameters: []
                    pricing:
                      - billable: output_image
                        cost_usd: 0.05
                        unit: image
                    provider_name: Bytedance
                    provider_slug: bytedance
                    provider_tag: bytedance
                    supported_parameters:
                      resolution:
                        type: enum
                        values:
                          - 1K
                          - 2K
                          - 4K
                    supports_streaming: false
                id: bytedance-seed/seedream-4.5
              schema:
                $ref: '#/components/schemas/ImageModelEndpointsResponse'
          description: The full per-endpoint records for an image model
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
    ImageModelEndpointsResponse:
      description: The full per-endpoint records for an image model.
      example:
        endpoints:
          - allowed_passthrough_parameters: []
            pricing:
              - billable: output_image
                cost_usd: 0.05
                unit: image
            provider_name: Bytedance
            provider_slug: bytedance
            provider_tag: bytedance
            supported_parameters:
              resolution:
                type: enum
                values:
                  - 1K
                  - 2K
                  - 4K
            supports_streaming: false
        id: bytedance-seed/seedream-4.5
      properties:
        endpoints:
          items:
            $ref: '#/components/schemas/ImageEndpoint'
          type: array
        id:
          description: Model slug
          example: bytedance-seed/seedream-4.5
          type: string
      required:
        - id
        - endpoints
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
    ImageEndpoint:
      description: An endpoint that serves a given image model.
      example:
        allowed_passthrough_parameters: []
        pricing:
          - billable: output_image
            cost_usd: 0.05
            unit: image
        provider_name: Bytedance
        provider_slug: bytedance
        provider_tag: bytedance
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
        allowed_passthrough_parameters:
          description: >-
            Provider-specific options accepted under
            provider.options[provider_slug].
          example: []
          items:
            type: string
          type: array
        pricing:
          description: Billable pricing lines for this endpoint.
          example:
            - billable: output_image
              cost_usd: 0.05
              unit: image
          items:
            $ref: '#/components/schemas/ImagePricingEntry'
          type: array
        provider_name:
          description: Provider display name
          example: Bytedance
          type: string
        provider_slug:
          description: Provider slug
          example: bytedance
          type: string
        provider_tag:
          description: Provider tag for request-side selection
          example: bytedance
          type:
            - string
            - 'null'
        supported_parameters:
          allOf:
            - $ref: '#/components/schemas/SupportedParameters'
            - description: >-
                The definitive set of parameters this endpoint accepts for this
                model.
        supports_streaming:
          description: >-
            Whether this endpoint supports native SSE streaming (`stream: true`
            in the request).
          example: false
          type: boolean
      required:
        - provider_name
        - provider_slug
        - provider_tag
        - supported_parameters
        - allowed_passthrough_parameters
        - supports_streaming
        - pricing
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
    ImagePricingEntry:
      description: One billable pricing line for an image provider.
      example:
        billable: output_image
        cost_usd: 0.05
        unit: image
      properties:
        billable:
          enum:
            - output_image
            - input_image
            - input_font
            - input_reference
            - input_text
          type: string
        cost_usd:
          format: double
          type: number
        unit:
          enum:
            - image
            - megapixel
            - token
          type: string
        variant:
          type: string
      required:
        - billable
        - unit
        - cost_usd
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