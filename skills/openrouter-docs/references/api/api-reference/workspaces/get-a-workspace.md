> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get a workspace

> Get a single workspace by ID or slug. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /workspaces/{id}
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
  /workspaces/{id}:
    get:
      tags:
        - Workspaces
      summary: Get a workspace
      description: >-
        Get a single workspace by ID or slug. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: getWorkspace
      parameters:
        - description: The workspace ID (UUID) or slug
          in: path
          name: id
          required: true
          schema:
            description: The workspace ID (UUID) or slug
            example: production
            minLength: 1
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  created_at: '2025-08-24T10:30:00Z'
                  created_by: user_abc123
                  default_image_model: openai/dall-e-3
                  default_provider_sort: price
                  default_text_model: openai/gpt-4o
                  description: Production environment workspace
                  id: 550e8400-e29b-41d4-a716-446655440000
                  io_logging_api_key_ids: null
                  io_logging_sampling_rate: 1
                  is_data_discount_logging_enabled: true
                  is_observability_broadcast_enabled: false
                  is_observability_io_logging_enabled: false
                  name: Production
                  slug: production
                  updated_at: '2025-08-24T15:45:00Z'
              schema:
                $ref: '#/components/schemas/GetWorkspaceResponse'
          description: Workspace details
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
    GetWorkspaceResponse:
      example:
        data:
          created_at: '2025-08-24T10:30:00Z'
          created_by: user_abc123
          default_image_model: openai/dall-e-3
          default_provider_sort: price
          default_text_model: openai/gpt-4o
          description: Production environment workspace
          id: 550e8400-e29b-41d4-a716-446655440000
          io_logging_api_key_ids: null
          io_logging_sampling_rate: 1
          is_data_discount_logging_enabled: true
          is_observability_broadcast_enabled: false
          is_observability_io_logging_enabled: false
          name: Production
          slug: production
          updated_at: '2025-08-24T15:45:00Z'
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/Workspace'
            - description: The workspace
      required:
        - data
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
    Workspace:
      example:
        created_at: '2025-08-24T10:30:00Z'
        created_by: user_abc123
        default_image_model: openai/dall-e-3
        default_provider_sort: price
        default_text_model: openai/gpt-4o
        description: Production environment workspace
        id: 550e8400-e29b-41d4-a716-446655440000
        io_logging_api_key_ids: null
        io_logging_sampling_rate: 1
        is_data_discount_logging_enabled: true
        is_observability_broadcast_enabled: false
        is_observability_io_logging_enabled: false
        name: Production
        slug: production
        updated_at: '2025-08-24T15:45:00Z'
      properties:
        created_at:
          description: ISO 8601 timestamp of when the workspace was created
          example: '2025-08-24T10:30:00Z'
          type: string
        created_by:
          description: User ID of the workspace creator
          example: user_abc123
          nullable: true
          type: string
        default_image_model:
          description: Default image model for this workspace
          example: openai/dall-e-3
          nullable: true
          type: string
        default_provider_sort:
          description: >-
            Default provider sort preference (price, throughput, latency,
            exacto)
          example: price
          nullable: true
          type: string
        default_text_model:
          description: Default text model for this workspace
          example: openai/gpt-4o
          nullable: true
          type: string
        description:
          description: Description of the workspace
          example: Production environment workspace
          nullable: true
          type: string
        id:
          description: Unique identifier for the workspace
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
        io_logging_api_key_ids:
          description: >-
            Optional array of API key IDs to filter I/O logging. Null means all
            keys are logged.
          example: null
          items:
            type: integer
          nullable: true
          type: array
        io_logging_sampling_rate:
          description: >-
            Sampling rate for I/O logging (0.0001-1). 1 means 100% of requests
            are logged.
          example: 1
          format: double
          type: number
        is_data_discount_logging_enabled:
          description: Whether data discount logging is enabled for this workspace
          example: true
          type: boolean
        is_observability_broadcast_enabled:
          description: Whether broadcast is enabled for this workspace
          example: false
          type: boolean
        is_observability_io_logging_enabled:
          description: Whether private logging is enabled for this workspace
          example: false
          type: boolean
        name:
          description: Name of the workspace
          example: Production
          type: string
        slug:
          description: URL-friendly slug for the workspace
          example: production
          type: string
        updated_at:
          description: ISO 8601 timestamp of when the workspace was last updated
          example: '2025-08-24T15:45:00Z'
          nullable: true
          type: string
      required:
        - id
        - name
        - slug
        - description
        - default_text_model
        - default_image_model
        - default_provider_sort
        - is_observability_io_logging_enabled
        - is_observability_broadcast_enabled
        - is_data_discount_logging_enabled
        - io_logging_sampling_rate
        - io_logging_api_key_ids
        - created_at
        - updated_at
        - created_by
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````