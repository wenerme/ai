> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user activity grouped by endpoint

> Returns user activity data grouped by endpoint for the last 30 (completed) UTC days. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /activity
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
  /activity:
    get:
      tags:
        - Analytics
      summary: Get user activity grouped by endpoint
      description: >-
        Returns user activity data grouped by endpoint for the last 30
        (completed) UTC days. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: getUserActivity
      parameters:
        - description: Filter by a single UTC date in the last 30 days (YYYY-MM-DD format).
          in: query
          name: date
          required: false
          schema:
            description: >-
              Filter by a single UTC date in the last 30 days (YYYY-MM-DD
              format).
            example: '2025-08-24'
            type: string
        - description: >-
            Filter by API key hash (SHA-256 hex string, as returned by the keys
            API).
          in: query
          name: api_key_hash
          required: false
          schema:
            description: >-
              Filter by API key hash (SHA-256 hex string, as returned by the
              keys API).
            example: abc123def456...
            type: string
        - description: >-
            Filter by org member user ID. Only applicable for organization
            accounts.
          in: query
          name: user_id
          required: false
          schema:
            description: >-
              Filter by org member user ID. Only applicable for organization
              accounts.
            example: user_abc123
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - byok_usage_inference: 0.012
                    completion_tokens: 125
                    date: '2025-08-24'
                    endpoint_id: 550e8400-e29b-41d4-a716-446655440000
                    model: openai/gpt-4.1
                    model_permaslug: openai/gpt-4.1-2025-04-14
                    prompt_tokens: 50
                    provider_name: OpenAI
                    reasoning_tokens: 25
                    requests: 5
                    usage: 0.015
              schema:
                $ref: '#/components/schemas/ActivityResponse'
          description: Returns user activity data grouped by endpoint
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
    ActivityResponse:
      example:
        data:
          - byok_usage_inference: 0.012
            completion_tokens: 125
            date: '2025-08-24'
            endpoint_id: 550e8400-e29b-41d4-a716-446655440000
            model: openai/gpt-4.1
            model_permaslug: openai/gpt-4.1-2025-04-14
            prompt_tokens: 50
            provider_name: OpenAI
            reasoning_tokens: 25
            requests: 5
            usage: 0.015
      properties:
        data:
          description: List of activity items
          items:
            $ref: '#/components/schemas/ActivityItem'
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
    ActivityItem:
      example:
        byok_usage_inference: 0.012
        completion_tokens: 125
        date: '2025-08-24'
        endpoint_id: 550e8400-e29b-41d4-a716-446655440000
        model: openai/gpt-4.1
        model_permaslug: openai/gpt-4.1-2025-04-14
        prompt_tokens: 50
        provider_name: OpenAI
        reasoning_tokens: 25
        requests: 5
        usage: 0.015
      properties:
        byok_usage_inference:
          description: BYOK inference cost in USD (external credits spent)
          example: 0.012
          format: double
          type: number
        completion_tokens:
          description: Total completion tokens generated
          example: 125
          type: integer
        date:
          description: Date of the activity (YYYY-MM-DD format)
          example: '2025-08-24'
          type: string
        endpoint_id:
          description: Unique identifier for the endpoint
          example: 550e8400-e29b-41d4-a716-446655440000
          type: string
        model:
          description: Model slug (e.g., "openai/gpt-4.1")
          example: openai/gpt-4.1
          type: string
        model_permaslug:
          description: Model permaslug (e.g., "openai/gpt-4.1-2025-04-14")
          example: openai/gpt-4.1-2025-04-14
          type: string
        prompt_tokens:
          description: Total prompt tokens used
          example: 50
          type: integer
        provider_name:
          description: Name of the provider serving this endpoint
          example: OpenAI
          type: string
        reasoning_tokens:
          description: Total reasoning tokens used
          example: 25
          type: integer
        requests:
          description: Number of requests made
          example: 5
          type: integer
        usage:
          description: Total cost in USD (OpenRouter credits spent)
          example: 0.015
          format: double
          type: number
      required:
        - date
        - model
        - model_permaslug
        - endpoint_id
        - provider_name
        - usage
        - byok_usage_inference
        - requests
        - prompt_tokens
        - completion_tokens
        - reasoning_tokens
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