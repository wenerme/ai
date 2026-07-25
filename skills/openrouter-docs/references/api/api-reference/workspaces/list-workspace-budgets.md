> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List workspace budgets

> List all budgets configured for a workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /workspaces/{id}/budgets
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
  /workspaces/{id}/budgets:
    get:
      tags:
        - Workspaces
      summary: List workspace budgets
      description: >-
        List all budgets configured for a workspace. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: listWorkspaceBudgets
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
                  - created_at: '2025-08-24T10:30:00Z'
                    id: 770e8400-e29b-41d4-a716-446655440000
                    limit_usd: 100
                    reset_interval: monthly
                    updated_at: '2025-08-24T15:45:00Z'
                    workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/ListWorkspaceBudgetsResponse'
          description: Budgets retrieved successfully
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
    ListWorkspaceBudgetsResponse:
      example:
        data:
          - created_at: '2025-08-24T10:30:00Z'
            id: 770e8400-e29b-41d4-a716-446655440000
            limit_usd: 100
            reset_interval: monthly
            updated_at: '2025-08-24T15:45:00Z'
            workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        data:
          description: List of budgets configured for the workspace
          items:
            $ref: '#/components/schemas/WorkspaceBudget'
          type: array
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
    WorkspaceBudget:
      example:
        created_at: '2025-08-24T10:30:00Z'
        id: 770e8400-e29b-41d4-a716-446655440000
        limit_usd: 100
        reset_interval: monthly
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        created_at:
          description: ISO 8601 timestamp of when the budget was created
          example: '2025-08-24T10:30:00Z'
          type: string
        id:
          description: Unique identifier for the budget
          example: 770e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
        limit_usd:
          description: Spending limit in USD for this interval
          example: 100
          format: double
          type: number
        reset_interval:
          description: >-
            Interval at which spend resets. Null means a lifetime (one-time)
            budget.
          enum:
            - daily
            - weekly
            - monthly
            - null
          example: monthly
          type:
            - string
            - 'null'
        updated_at:
          description: ISO 8601 timestamp of when the budget was last updated
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace the budget belongs to
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - limit_usd
        - reset_interval
        - created_at
        - updated_at
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````