> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List API keys

> List all API keys for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /keys
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
  /keys:
    get:
      tags:
        - API Keys
      summary: List API keys
      description: >-
        List all API keys for the authenticated user. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: list
      parameters:
        - description: Whether to include disabled API keys in the response
          in: query
          name: include_disabled
          required: false
          schema:
            description: Whether to include disabled API keys in the response
            example: 'false'
            type: string
            x-openrouter-type: boolean
        - description: Number of API keys to skip for pagination
          in: query
          name: offset
          required: false
          schema:
            description: Number of API keys to skip for pagination
            example: 0
            minimum: 0
            nullable: true
            type: integer
        - description: >-
            Filter API keys by workspace ID. By default, keys in the default
            workspace are returned.
          in: query
          name: workspace_id
          required: false
          schema:
            description: >-
              Filter API keys by workspace ID. By default, keys in the default
              workspace are returned.
            example: 0df9e665-d932-5740-b2c7-b52af166bc11
            format: uuid
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - byok_usage: 17.38
                    byok_usage_daily: 17.38
                    byok_usage_monthly: 17.38
                    byok_usage_weekly: 17.38
                    created_at: '2025-08-24T10:30:00Z'
                    creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
                    disabled: false
                    expires_at: '2027-12-31T23:59:59Z'
                    hash: >-
                      f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
                    include_byok_in_limit: false
                    label: Production API Key
                    limit: 100
                    limit_remaining: 74.5
                    limit_reset: monthly
                    name: My Production Key
                    updated_at: '2025-08-24T15:45:00Z'
                    usage: 25.5
                    usage_daily: 25.5
                    usage_monthly: 25.5
                    usage_weekly: 25.5
                    workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
              schema:
                example:
                  data:
                    - byok_usage: 17.38
                      byok_usage_daily: 17.38
                      byok_usage_monthly: 17.38
                      byok_usage_weekly: 17.38
                      created_at: '2025-08-24T10:30:00Z'
                      creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
                      disabled: false
                      expires_at: '2027-12-31T23:59:59Z'
                      hash: >-
                        f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
                      include_byok_in_limit: false
                      label: Production API Key
                      limit: 100
                      limit_remaining: 74.5
                      limit_reset: monthly
                      name: My Production Key
                      updated_at: '2025-08-24T15:45:00Z'
                      usage: 25.5
                      usage_daily: 25.5
                      usage_monthly: 25.5
                      usage_weekly: 25.5
                      workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
                properties:
                  data:
                    description: List of API keys
                    items:
                      example:
                        byok_usage: 17.38
                        byok_usage_daily: 17.38
                        byok_usage_monthly: 17.38
                        byok_usage_weekly: 17.38
                        created_at: '2025-08-24T10:30:00Z'
                        creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
                        disabled: false
                        expires_at: '2027-12-31T23:59:59Z'
                        hash: >-
                          f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
                        include_byok_in_limit: false
                        label: sk-or-v1-0e6...1c96
                        limit: 100
                        limit_remaining: 74.5
                        limit_reset: monthly
                        name: My Production Key
                        updated_at: '2025-08-24T15:45:00Z'
                        usage: 25.5
                        usage_daily: 25.5
                        usage_monthly: 25.5
                        usage_weekly: 25.5
                        workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
                      properties:
                        byok_usage:
                          description: Total external BYOK usage (in USD) for the API key
                          example: 17.38
                          format: double
                          type: number
                        byok_usage_daily:
                          description: External BYOK usage (in USD) for the current UTC day
                          example: 17.38
                          format: double
                          type: number
                        byok_usage_monthly:
                          description: External BYOK usage (in USD) for current UTC month
                          example: 17.38
                          format: double
                          type: number
                        byok_usage_weekly:
                          description: >-
                            External BYOK usage (in USD) for the current UTC
                            week (Monday-Sunday)
                          example: 17.38
                          format: double
                          type: number
                        created_at:
                          description: ISO 8601 timestamp of when the API key was created
                          example: '2025-08-24T10:30:00Z'
                          type: string
                        creator_user_id:
                          description: >-
                            The user ID of the key creator. For
                            organization-owned keys, this is the member who
                            created the key. For individual users, this is the
                            user's own ID.
                          example: user_2dHFtVWx2n56w6HkM0000000000
                          nullable: true
                          type: string
                        disabled:
                          description: Whether the API key is disabled
                          example: false
                          type: boolean
                        expires_at:
                          description: >-
                            ISO 8601 UTC timestamp when the API key expires, or
                            null if no expiration
                          example: '2027-12-31T23:59:59Z'
                          format: date-time
                          nullable: true
                          type: string
                        hash:
                          description: Unique hash identifier for the API key
                          example: >-
                            f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
                          type: string
                        include_byok_in_limit:
                          description: >-
                            Whether to include external BYOK usage in the credit
                            limit
                          example: false
                          type: boolean
                        label:
                          description: Human-readable label for the API key
                          example: sk-or-v1-0e6...1c96
                          type: string
                        limit:
                          description: Spending limit for the API key in USD
                          example: 100
                          format: double
                          nullable: true
                          type: number
                        limit_remaining:
                          description: Remaining spending limit in USD
                          example: 74.5
                          format: double
                          nullable: true
                          type: number
                        limit_reset:
                          description: Type of limit reset for the API key
                          example: monthly
                          nullable: true
                          type: string
                        name:
                          description: Name of the API key
                          example: My Production Key
                          type: string
                        updated_at:
                          description: >-
                            ISO 8601 timestamp of when the API key was last
                            updated
                          example: '2025-08-24T15:45:00Z'
                          nullable: true
                          type: string
                        usage:
                          description: >-
                            Total OpenRouter credit usage (in USD) for the API
                            key
                          example: 25.5
                          format: double
                          type: number
                        usage_daily:
                          description: >-
                            OpenRouter credit usage (in USD) for the current UTC
                            day
                          example: 25.5
                          format: double
                          type: number
                        usage_monthly:
                          description: >-
                            OpenRouter credit usage (in USD) for the current UTC
                            month
                          example: 25.5
                          format: double
                          type: number
                        usage_weekly:
                          description: >-
                            OpenRouter credit usage (in USD) for the current UTC
                            week (Monday-Sunday)
                          example: 25.5
                          format: double
                          type: number
                        workspace_id:
                          description: The workspace ID this API key belongs to.
                          example: 0df9e665-d932-5740-b2c7-b52af166bc11
                          type: string
                      required:
                        - hash
                        - name
                        - label
                        - disabled
                        - limit
                        - limit_remaining
                        - limit_reset
                        - include_byok_in_limit
                        - usage
                        - usage_daily
                        - usage_weekly
                        - usage_monthly
                        - byok_usage
                        - byok_usage_daily
                        - byok_usage_weekly
                        - byok_usage_monthly
                        - created_at
                        - updated_at
                        - creator_user_id
                        - workspace_id
                      type: object
                    type: array
                required:
                  - data
                type: object
          description: List of API keys
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````