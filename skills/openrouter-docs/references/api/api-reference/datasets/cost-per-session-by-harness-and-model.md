> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Cost per session by harness and model

> Returns weekly refreshed, aggregated cost-per-session cells for the published harnesses.
Sessions are never pooled across apps. Medians are of per-session USD spend, and
privacy-preserving aggregation never exposes clerk_user_id values or per-session rows.

Filter by `app_slug`, `model`, or `turn_range`. Filtering by `model` alone works across apps
for harness-vs-harness comparison at a fixed model. Results refresh weekly and include the source snapshot
window in `meta`.

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse and republish with attribution to OpenRouter.



## OpenAPI

````yaml /openapi/openapi.yaml get /datasets/session-cost
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
  /datasets/session-cost:
    get:
      tags:
        - Datasets
      summary: Cost per session by harness and model
      description: >-
        Returns weekly refreshed, aggregated cost-per-session cells for the
        published harnesses.

        Sessions are never pooled across apps. Medians are of per-session USD
        spend, and

        privacy-preserving aggregation never exposes clerk_user_id values or
        per-session rows.


        Filter by `app_slug`, `model`, or `turn_range`. Filtering by `model`
        alone works across apps

        for harness-vs-harness comparison at a fixed model. Results refresh
        weekly and include the source snapshot

        window in `meta`.


        Licensed under [CC BY
        4.0](https://creativecommons.org/licenses/by/4.0/): reuse and republish
        with attribution to OpenRouter.
      operationId: getSessionCost
      parameters:
        - description: Filter to one published harness slug.
          in: query
          name: app_slug
          required: false
          schema:
            description: Filter to one published harness slug.
            example: hermes-agent
            type: string
        - description: Exact model permaslug filter. Works across all harness apps.
          in: query
          name: model
          required: false
          schema:
            description: Exact model permaslug filter. Works across all harness apps.
            example: anthropic/claude-4.8-opus
            type: string
        - description: Filter by the inclusive number of turns in a session.
          in: query
          name: turn_range
          required: false
          schema:
            description: Filter by the inclusive number of turns in a session.
            enum:
              - 1-turn
              - 2-9-turns
              - 10-49-turns
              - 50-plus-turns
            example: 10-49-turns
            type: string
        - description: Maximum number of cells to return (1-500). Defaults to 100.
          in: query
          name: limit
          required: false
          schema:
            default: 100
            description: Maximum number of cells to return (1-500). Defaults to 100.
            example: 100
            maximum: 500
            minimum: 1
            type: integer
        - description: Number of sorted cells to skip (0-5000). Defaults to 0.
          in: query
          name: offset
          required: false
          schema:
            default: 0
            description: Number of sorted cells to skip (0-5000). Defaults to 0.
            example: 0
            maximum: 5000
            minimum: 0
            type:
              - integer
              - 'null'
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - app_name: Hermes Agent
                    app_slug: hermes-agent
                    median_session_cost_usd: 1.74
                    model_permaslug: anthropic/claude-4.8-opus
                    turn_range: 10-49-turns
                meta:
                  as_of: '2026-05-12T02:00:00.000Z'
                  version: v1
                  window_days: 30
                  window_end_date: '2026-05-11'
              schema:
                $ref: '#/components/schemas/SessionCostResponse'
          description: Aggregated cost-per-session cells for the requested filters.
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
    SessionCostResponse:
      properties:
        data:
          items:
            $ref: '#/components/schemas/SessionCostItem'
          type: array
        meta:
          $ref: '#/components/schemas/SessionCostMeta'
      required:
        - data
        - meta
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
    SessionCostItem:
      properties:
        app_name:
          description: Published harness display label.
          example: Hermes Agent
          type: string
        app_slug:
          description: Stable public slug of the harness.
          example: hermes-agent
          type: string
        median_session_cost_usd:
          description: Median USD spend per sampled session.
          example: 1.74
          format: double
          type: number
        model_permaslug:
          description: Exact model permaslug.
          example: anthropic/claude-4.8-opus
          type: string
        turn_range:
          description: Inclusive session turn-count range.
          enum:
            - 1-turn
            - 2-9-turns
            - 10-49-turns
            - 50-plus-turns
          example: 10-49-turns
          type: string
      required:
        - app_slug
        - app_name
        - turn_range
        - model_permaslug
        - median_session_cost_usd
      type: object
    SessionCostMeta:
      properties:
        as_of:
          description: ISO-8601 timestamp when the response was generated.
          example: '2026-05-12T02:00:00.000Z'
          type: string
        version:
          description: Dataset version.
          enum:
            - v1
          type: string
        window_days:
          description: >-
            Number of days in the weekly session sample window, or null when no
            snapshot is published.
          example: 30
          type:
            - integer
            - 'null'
        window_end_date:
          description: >-
            UTC date of the final day in the session sample window, or null when
            no snapshot is published.
          example: '2026-05-11'
          type:
            - string
            - 'null'
      required:
        - as_of
        - version
        - window_days
        - window_end_date
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