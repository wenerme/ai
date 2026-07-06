> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Task classification market share

> Returns the market-share breakdown of OpenRouter traffic by task classification
(e.g. code generation, web search, summarization) over a trailing time window.

Each classification reports its share of classified sampled requests (`usage_share`)
and classified sampled token volume (`token_share`) as fractions between 0 and 1.
The unclassified `other` bucket is excluded. Absolute volumes are not exposed
because the underlying data is sampled.

Each classification also includes a `models` array listing the top models by
request volume within that classification, with their within-tag usage and token shares.

Classifications are grouped into macro-categories (Code, Data, Agent, General)
with aggregate shares provided for each.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this data, cite as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."



## OpenAPI

````yaml /openapi/openapi.yaml get /classifications/task
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
  /classifications/task:
    get:
      tags:
        - Classifications
      summary: Task classification market share
      description: >-
        Returns the market-share breakdown of OpenRouter traffic by task
        classification

        (e.g. code generation, web search, summarization) over a trailing time
        window.


        Each classification reports its share of classified sampled requests
        (`usage_share`)

        and classified sampled token volume (`token_share`) as fractions between
        0 and 1.

        The unclassified `other` bucket is excluded. Absolute volumes are not
        exposed

        because the underlying data is sampled.


        Each classification also includes a `models` array listing the top
        models by

        request volume within that classification, with their within-tag usage
        and token shares.


        Classifications are grouped into macro-categories (Code, Data, Agent,
        General)

        with aggregate shares provided for each.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this data, cite as:

        "Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."
      operationId: getTaskClassifications
      parameters:
        - description: >-
            Trailing time window for the classification data. Currently only
            `7d` (trailing 7 days) is supported.
          in: query
          name: window
          required: false
          schema:
            default: 7d
            description: >-
              Trailing time window for the classification data. Currently only
              `7d` (trailing 7 days) is supported.
            enum:
              - 7d
            example: 7d
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  as_of: '2026-06-17'
                  classifications:
                    - category_token_share: 0.48
                      category_usage_share: 0.51
                      display_name: Code Generation
                      macro_category: code
                      models:
                        - id: openai/gpt-4.1-mini
                          tag_token_share: 0.75
                          tag_usage_share: 0.55
                      tag: code:general_impl
                      token_share: 0.31
                      usage_share: 0.23
                  macro_categories:
                    - key: code
                      label: Code
                      token_share: 0.52
                      usage_share: 0.45
                  window_days: 7
              schema:
                $ref: '#/components/schemas/TaskClassificationResponse'
          description: >-
            Task classification market-share data for the requested trailing
            window.
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
    TaskClassificationResponse:
      example:
        data:
          as_of: '2026-06-17'
          classifications:
            - category_token_share: 0.48
              category_usage_share: 0.51
              display_name: Code Generation
              macro_category: code
              models:
                - id: openai/gpt-4.1-mini
                  tag_token_share: 0.75
                  tag_usage_share: 0.55
              tag: code:general_impl
              token_share: 0.31
              usage_share: 0.23
          macro_categories:
            - key: code
              label: Code
              token_share: 0.52
              usage_share: 0.45
          window_days: 7
      properties:
        data:
          properties:
            as_of:
              description: >-
                UTC date (YYYY-MM-DD) of the window upper bound (yesterday).
                Data is exclusive of the current incomplete UTC day. This is the
                expected latest date in the snapshot; it does not confirm data
                presence for that date.
              example: '2026-06-17'
              type: string
            classifications:
              description: >-
                Per-task classification market-share data, sorted by usage_share
                descending.
              items:
                $ref: '#/components/schemas/TaskClassificationItem'
              type: array
            macro_categories:
              description: >-
                Aggregate market-share data per macro-category (code, data,
                agent, general).
              items:
                $ref: '#/components/schemas/TaskClassificationMacroCategory'
              type: array
            window_days:
              description: Number of trailing days covered by this snapshot.
              example: 7
              type: integer
          required:
            - window_days
            - as_of
            - classifications
            - macro_categories
          type: object
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
    TaskClassificationItem:
      example:
        category_token_share: 0.48
        category_usage_share: 0.51
        display_name: Code Generation
        macro_category: code
        models:
          - id: openai/gpt-4.1-mini
            tag_token_share: 0.75
            tag_usage_share: 0.55
          - id: anthropic/claude-sonnet-4
            tag_token_share: 0.12
            tag_usage_share: 0.2
        tag: code:general_impl
        token_share: 0.31
        usage_share: 0.23
      properties:
        category_token_share:
          description: >-
            Fraction of this classification's token volume within its
            macro-category (0–1). Sums to 1 across all classifications sharing
            the same `macro_category`.
          example: 0.48
          format: double
          type: number
        category_usage_share:
          description: >-
            Fraction of this classification's usage within its macro-category
            (0–1). Sums to 1 across all classifications sharing the same
            `macro_category`.
          example: 0.51
          format: double
          type: number
        display_name:
          description: Human-readable label for the classification.
          example: Code Generation
          type: string
        macro_category:
          description: >-
            Coarse grouping derived from the tag prefix: `code`, `data`,
            `agent`, or `general`.
          example: code
          type: string
        models:
          description: >-
            Top models for this classification by request volume, sorted
            descending. Each entry reports the model's share of this
            classification's requests and tokens.
          items:
            $ref: '#/components/schemas/TaskClassificationModel'
          type: array
        tag:
          description: >-
            Classification tag identifier (e.g. `code:general_impl`,
            `agent:web_search`).
          example: code:general_impl
          type: string
        token_share:
          description: >-
            Fraction of classified sampled token volume (prompt + completion)
            attributed to this classification (0–1). The unclassified `other`
            bucket is excluded from the denominator.
          example: 0.31
          format: double
          type: number
        usage_share:
          description: >-
            Fraction of classified sampled requests attributed to this
            classification (0–1). The unclassified `other` bucket is excluded
            from the denominator.
          example: 0.23
          format: double
          type: number
      required:
        - tag
        - display_name
        - macro_category
        - usage_share
        - token_share
        - category_usage_share
        - category_token_share
        - models
      type: object
    TaskClassificationMacroCategory:
      example:
        key: code
        label: Code
        token_share: 0.52
        usage_share: 0.45
      properties:
        key:
          description: Macro-category identifier.
          example: code
          type: string
        label:
          description: Human-readable label for the macro-category.
          example: Code
          type: string
        token_share:
          description: >-
            Combined token share of all classifications in this macro-category
            (0–1).
          example: 0.52
          format: double
          type: number
        usage_share:
          description: >-
            Combined usage share of all classifications in this macro-category
            (0–1).
          example: 0.45
          format: double
          type: number
      required:
        - key
        - label
        - usage_share
        - token_share
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
    TaskClassificationModel:
      example:
        id: openai/gpt-4.1-mini
        tag_token_share: 0.75
        tag_usage_share: 0.55
      properties:
        id:
          description: Model identifier (permaslug).
          example: openai/gpt-4.1-mini
          type: string
        tag_token_share:
          description: >-
            Fraction of this classification's sampled token volume attributed to
            this model (0–1). Sums to ≤1 across the returned models (only top-N
            are included and unattributed requests are excluded).
          example: 0.75
          format: double
          type: number
        tag_usage_share:
          description: >-
            Fraction of this classification's sampled requests attributed to
            this model (0–1). Sums to ≤1 across the returned models (only top-N
            are included and unattributed requests are excluded).
          example: 0.55
          format: double
          type: number
      required:
        - id
        - tag_usage_share
        - tag_token_share
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````