> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a workspace

> Create a new workspace for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /workspaces
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
  /workspaces:
    post:
      tags:
        - Workspaces
      summary: Create a workspace
      description: >-
        Create a new workspace for the authenticated user. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: createWorkspace
      requestBody:
        content:
          application/json:
            example:
              default_image_model: openai/dall-e-3
              default_provider_sort: price
              default_text_model: openai/gpt-4o
              description: Production environment workspace
              name: Production
              slug: production
            schema:
              $ref: '#/components/schemas/CreateWorkspaceRequest'
        required: true
      responses:
        '201':
          content:
            application/json:
              example:
                data:
                  created_at: '2025-08-24T10:30:00Z'
                  created_by: user_abc123
                  default_guardrail_id: 595d5849-7e86-51fd-a7c0-705c34e4afff
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
                  updated_at: null
              schema:
                $ref: '#/components/schemas/CreateWorkspaceResponse'
          description: Workspace created successfully
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
    CreateWorkspaceRequest:
      example:
        default_image_model: openai/dall-e-3
        default_provider_sort: price
        default_text_model: openai/gpt-4o
        description: Production environment workspace
        name: Production
        slug: production
      properties:
        default_image_model:
          description: Default image model for this workspace
          example: openai/dall-e-3
          type:
            - string
            - 'null'
        default_provider_sort:
          description: >-
            Default provider sort preference (price, throughput, latency,
            exacto)
          example: price
          type:
            - string
            - 'null'
        default_text_model:
          description: Default text model for this workspace
          example: openai/gpt-4o
          type:
            - string
            - 'null'
        description:
          description: Description of the workspace
          example: Production environment workspace
          maxLength: 500
          type:
            - string
            - 'null'
        io_logging_api_key_ids:
          description: Optional array of API key IDs to filter I/O logging
          example: null
          items:
            type: integer
          type:
            - array
            - 'null'
        io_logging_sampling_rate:
          description: Sampling rate for I/O logging (0.0001-1)
          example: 1
          format: double
          type: number
        is_data_discount_logging_enabled:
          description: Whether data discount logging is enabled
          example: true
          type: boolean
        is_observability_broadcast_enabled:
          description: Whether broadcast is enabled
          example: false
          type: boolean
        is_observability_io_logging_enabled:
          description: Whether private logging is enabled
          example: false
          type: boolean
        name:
          description: Name for the new workspace
          example: Production
          maxLength: 100
          minLength: 1
          type: string
        slug:
          description: >-
            URL-friendly slug (lowercase alphanumeric segments separated by
            single hyphens, no leading/trailing hyphens)
          example: production
          maxLength: 50
          minLength: 1
          pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$
          type: string
      required:
        - name
        - slug
      type: object
    CreateWorkspaceResponse:
      example:
        data:
          created_at: '2025-08-24T10:30:00Z'
          created_by: user_abc123
          default_guardrail_id: 595d5849-7e86-51fd-a7c0-705c34e4afff
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
          updated_at: null
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/Workspace'
            - description: The created workspace
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
    Workspace:
      example:
        created_at: '2025-08-24T10:30:00Z'
        created_by: user_abc123
        default_guardrail_id: 595d5849-7e86-51fd-a7c0-705c34e4afff
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
          type:
            - string
            - 'null'
        default_guardrail_id:
          description: >-
            Deterministic ID of the workspace's implicitly-created default
            guardrail
          example: 595d5849-7e86-51fd-a7c0-705c34e4afff
          format: uuid
          type: string
        default_image_model:
          description: Default image model for this workspace
          example: openai/dall-e-3
          type:
            - string
            - 'null'
        default_provider_sort:
          description: >-
            Default provider sort preference (price, throughput, latency,
            exacto)
          example: price
          type:
            - string
            - 'null'
        default_text_model:
          description: Default text model for this workspace
          example: openai/gpt-4o
          type:
            - string
            - 'null'
        description:
          description: Description of the workspace
          example: Production environment workspace
          type:
            - string
            - 'null'
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
          type:
            - array
            - 'null'
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
          type:
            - string
            - 'null'
      required:
        - id
        - default_guardrail_id
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