> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Query analytics data

> Execute an analytics query with specified metrics, dimensions, filters, and time range. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /analytics/query
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
  /analytics/query:
    post:
      tags:
        - beta.Analytics
      summary: Query analytics data
      description: >-
        Execute an analytics query with specified metrics, dimensions, filters,
        and time range. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: queryAnalytics
      requestBody:
        content:
          application/json:
            example:
              dimensions:
                - model
              granularity: day
              limit: 100
              metrics:
                - request_count
              time_range:
                end: '2025-01-08T00:00:00Z'
                start: '2025-01-01T00:00:00Z'
            schema:
              properties:
                classifier_dimensions:
                  description: >-
                    Group results by custom classifier tags, breaking down
                    metrics by the specified dimension values. Requires an
                    active classifier on the workspace.
                  properties:
                    classifier_id:
                      description: UUID of the classifier whose tags to group by.
                      example: 550e8400-e29b-41d4-a716-446655440000
                      format: uuid
                      type: string
                    dimension_names:
                      items:
                        description: >-
                          Classifier dimension name (snake_case identifier).
                          When exactly one name is provided, the response uses
                          it as the column key; with multiple names or none, the
                          response uses
                          `clf_dimension_name`/`clf_dimension_value` columns.
                        example: department
                        type: string
                      maxItems: 10
                      type: array
                    include_nulls:
                      description: >-
                        When true, also include generations that have no tag
                        from this classifier. Defaults to false, which returns
                        only classified generations.
                      type: boolean
                  required:
                    - classifier_id
                  type: object
                classifier_filters:
                  description: >-
                    Filter results to generations with specific classifier tag
                    values. Can be combined with classifier_dimensions (must use
                    the same classifier_id) or used independently with standard
                    dimensions.
                  properties:
                    classifier_id:
                      description: >-
                        UUID of the classifier whose tags to filter by. Must
                        match classifier_dimensions.classifier_id when both are
                        specified.
                      example: 550e8400-e29b-41d4-a716-446655440000
                      format: uuid
                      type: string
                    filters:
                      items:
                        properties:
                          field:
                            description: >-
                              Classifier dimension name to filter on (snake_case
                              identifier, e.g. "department", "work_type").
                            example: department
                            type: string
                          operator:
                            description: >-
                              Filter operator. Only equality/set operators are
                              supported (eq, neq, in, not_in) — ordered
                              comparisons are not available because
                              classification values are strings.
                            example: eq
                            type: string
                          value:
                            anyOf:
                              - type: string
                              - format: double
                                type: number
                              - items:
                                  anyOf:
                                    - type: string
                                    - format: double
                                      type: number
                                type: array
                            description: >-
                              Filter value. Use a scalar (string or number) for
                              eq/neq, or an array for in/not_in.
                            example: Engineering
                        required:
                          - field
                          - operator
                          - value
                        type: object
                      maxItems: 10
                      minItems: 1
                      type: array
                  required:
                    - classifier_id
                    - filters
                  type: object
                dimensions:
                  items:
                    description: >-
                      Dimension to group by (up to 2). Use the /meta endpoint
                      for available dimensions.
                    example: model
                    type: string
                  maxItems: 2
                  type: array
                filters:
                  items:
                    properties:
                      field:
                        description: >-
                          Dimension to filter on. Use the /meta endpoint for
                          available dimensions.
                        example: model
                        type: string
                      operator:
                        description: Filter operator
                        example: eq
                        type: string
                      value:
                        anyOf:
                          - type: string
                          - format: double
                            type: number
                          - items:
                              anyOf:
                                - type: string
                                - format: double
                                  type: number
                            type: array
                        description: >-
                          Filter value (scalar or array depending on operator).
                          Several dimensions are enriched in responses (returned
                          as human-readable labels), but filters must use the
                          underlying ID: `api_key_id` — numeric ID (from
                          generation metadata) or key hash (64-char hex from GET
                          /api/v1/keys, resolved server-side); `user` — Clerk
                          user ID (e.g. "user_abc123"), not the display name;
                          `workspace` — workspace UUID, not the workspace name;
                          `app` — numeric app ID, not the app title; `model` —
                          permaslug (e.g. "openai/gpt-4o"), not the display
                          name. Other dimensions (provider, origin, country,
                          etc.) are not enriched and accept the value as
                          returned.
                    required:
                      - field
                      - operator
                      - value
                    type: object
                  maxItems: 20
                  type: array
                granularity:
                  description: Time granularity
                  example: day
                  type: string
                group_limit:
                  description: >-
                    Maximum rows per distinct combination of dimensions. When
                    omitted on time-series queries (granularity + dimensions),
                    auto-computed to avoid truncating time windows. Explicit
                    values override the default and may truncate time buckets if
                    set lower than the number of buckets in the range. Ignored
                    when no dimensions are specified.
                  example: 100
                  type: integer
                limit:
                  description: >-
                    Maximum total rows returned. Defaults to 1000. On
                    time-series queries with dimensions and no explicit
                    group_limit, the server may raise this to accommodate the
                    expected number of unique time-bucket/dimension
                    combinations.
                  type: integer
                metrics:
                  items:
                    description: Metric name
                    example: request_count
                    type: string
                  minItems: 1
                  type: array
                order_by:
                  properties:
                    direction:
                      enum:
                        - asc
                        - desc
                      type: string
                    field:
                      description: >-
                        Field to order by: a metric included in `metrics` (or
                        "request_count", which may be ordered by without being
                        requested), a requested dimension, or "date".
                      example: request_count
                      type: string
                  required:
                    - field
                    - direction
                  type: object
                time_range:
                  properties:
                    end:
                      format: date-time
                      type: string
                    start:
                      format: date-time
                      type: string
                  required:
                    - start
                    - end
                  type: object
              required:
                - metrics
              type: object
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  data:
                    - date__day: '2025-01-01T00:00:00.000Z'
                      request_count: 1500
                  metadata:
                    query_time_ms: 42
                    row_count: 1
                    truncated: false
              schema:
                properties:
                  data:
                    properties:
                      cachedAt:
                        format: double
                        type: number
                      data:
                        items:
                          description: A row of analytics data with metric/dimension values
                          type: object
                        type: array
                      metadata:
                        properties:
                          query_time_ms:
                            format: double
                            type: number
                          row_count:
                            type: integer
                          truncated:
                            type: boolean
                        required:
                          - query_time_ms
                          - row_count
                          - truncated
                        type: object
                      warnings:
                        description: >-
                          Warnings about filter resolution issues (e.g.
                          unresolvable api_key_id hashes). The query still runs
                          normally; these inform the caller that some filter
                          values could not be resolved.
                        items:
                          type: string
                        type: array
                    required:
                      - data
                      - metadata
                    type: object
                required:
                  - data
                type: object
          description: Analytics query results
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
        '408':
          content:
            application/json:
              example:
                error:
                  code: 408
                  message: Operation timed out. Please try again later.
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
          description: Request Timeout - Operation exceeded time limit
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
    RequestTimeoutResponse:
      description: Request Timeout - Operation exceeded time limit
      example:
        error:
          code: 408
          message: Operation timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
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
    RequestTimeoutResponseErrorData:
      description: Error data for RequestTimeoutResponse
      example:
        code: 408
        message: Operation timed out. Please try again later.
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