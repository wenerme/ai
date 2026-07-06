> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get available analytics metrics and dimensions

> Returns the available metrics, dimensions, filter operators, and granularities for the analytics query endpoint. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /analytics/meta
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
  /analytics/meta:
    get:
      tags:
        - beta.Analytics
      summary: Get available analytics metrics and dimensions
      description: >-
        Returns the available metrics, dimensions, filter operators, and
        granularities for the analytics query endpoint. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: getAnalyticsMeta
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  dimensions:
                    - display_label: Model
                      name: model
                  granularities:
                    - display_label: Day
                      name: day
                  metrics:
                    - display_format: number
                      display_label: Request Count
                      is_rate: false
                      name: request_count
                  operators:
                    - name: eq
                      value_type: scalar
              schema:
                properties:
                  data:
                    properties:
                      dimensions:
                        items:
                          properties:
                            display_label:
                              description: Human-readable label
                              example: Model
                              type: string
                            name:
                              description: Dimension identifier used in query requests
                              example: model
                              type: string
                          required:
                            - name
                            - display_label
                          type: object
                        type: array
                      granularities:
                        items:
                          properties:
                            display_label:
                              description: Human-readable label
                              example: Day
                              type: string
                            name:
                              description: Granularity identifier
                              enum:
                                - minute
                                - hour
                                - day
                                - week
                                - month
                              example: day
                              type: string
                          required:
                            - name
                            - display_label
                          type: object
                        type: array
                      metrics:
                        items:
                          properties:
                            display_format:
                              description: >-
                                How this metric value should be formatted for
                                display (e.g. percent → multiply by 100 and
                                append %, currency → prefix with $)
                              enum:
                                - number
                                - currency
                                - percent
                                - latency
                                - throughput
                              example: number
                              type: string
                            display_label:
                              description: Human-readable label
                              example: Request Count
                              type: string
                            is_rate:
                              description: >-
                                Whether this metric is a rate/ratio (averaged,
                                not summed)
                              type: boolean
                            name:
                              description: Metric identifier used in query requests
                              example: request_count
                              type: string
                          required:
                            - name
                            - display_label
                            - is_rate
                            - display_format
                          type: object
                        type: array
                      operators:
                        items:
                          properties:
                            name:
                              description: Operator identifier used in filter definitions
                              enum:
                                - eq
                                - neq
                                - in
                                - not_in
                                - gt
                                - gte
                                - lt
                                - lte
                              example: eq
                              type: string
                            value_type:
                              description: >-
                                Whether the operator expects a single value or
                                an array
                              enum:
                                - scalar
                                - array
                              type: string
                          required:
                            - name
                            - value_type
                          type: object
                        type: array
                    required:
                      - metrics
                      - dimensions
                      - operators
                      - granularities
                    type: object
                required:
                  - data
                type: object
          description: Returns analytics query metadata
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