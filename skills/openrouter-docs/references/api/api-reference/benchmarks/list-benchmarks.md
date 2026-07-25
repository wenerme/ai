> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List Benchmarks

> Unified benchmark endpoint that aggregates scores from multiple benchmark sources (Artificial Analysis, Design Arena). Filter by source to reproduce the exact shapes from the legacy per-source endpoints, or use task_type to find models suited for specific workloads. Authenticate with any valid OpenRouter API key. Rate-limited to 30 requests/minute per key and 500 requests/day per account.



## OpenAPI

````yaml /openapi/openapi.yaml get /benchmarks
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
  /benchmarks:
    get:
      tags:
        - Benchmarks
      summary: List Benchmarks
      description: >-
        Unified benchmark endpoint that aggregates scores from multiple
        benchmark sources (Artificial Analysis, Design Arena). Filter by source
        to reproduce the exact shapes from the legacy per-source endpoints, or
        use task_type to find models suited for specific workloads. Authenticate
        with any valid OpenRouter API key. Rate-limited to 30 requests/minute
        per key and 500 requests/day per account.
      operationId: getBenchmarks
      parameters:
        - description: >-
            Benchmark source to query. Determines the shape of the returned
            items. When omitted, returns results from all sources.
          in: query
          name: source
          required: false
          schema:
            description: >-
              Benchmark source to query. Determines the shape of the returned
              items. When omitted, returns results from all sources.
            enum:
              - artificial-analysis
              - design-arena
            example: artificial-analysis
            type: string
        - description: >-
            Filter results by task type. For Artificial Analysis, maps to the
            corresponding index. For Design Arena, maps to the matching
            category.
          in: query
          name: task_type
          required: false
          schema:
            description: >-
              Filter results by task type. For Artificial Analysis, maps to the
              corresponding index. For Design Arena, maps to the matching
              category.
            enum:
              - coding
              - intelligence
              - agentic
            example: coding
            type: string
        - description: >-
            Design Arena only: arena to query. Defaults to `models` when source
            is `design-arena`.
          in: query
          name: arena
          required: false
          schema:
            description: >-
              Design Arena only: arena to query. Defaults to `models` when
              source is `design-arena`.
            enum:
              - models
              - builders
              - agents
            example: models
            type: string
        - description: >-
            Design Arena only: category within the arena (e.g. `codecategories`,
            `uicomponent`, `gamedev`, `3d`, `dataviz`, `image`, `video`, `svg`).
            When omitted, returns all categories.
          in: query
          name: category
          required: false
          schema:
            description: >-
              Design Arena only: category within the arena (e.g.
              `codecategories`, `uicomponent`, `gamedev`, `3d`, `dataviz`,
              `image`, `video`, `svg`). When omitted, returns all categories.
            example: codecategories
            type: string
        - description: >-
            Maximum number of items to return. When omitted, all matching
            results are returned.
          in: query
          name: max_results
          required: false
          schema:
            description: >-
              Maximum number of items to return. When omitted, all matching
              results are returned.
            example: 50
            minimum: 1
            type: integer
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - agentic_index: 58.3
                    coding_index: 65.8
                    display_name: GPT-4o
                    intelligence_index: 71.2
                    model_permaslug: openai/gpt-4o
                    pricing:
                      completion: '0.00001'
                      prompt: '0.0000025'
                    source: artificial-analysis
                meta:
                  as_of: '2026-06-03T12:00:00Z'
                  citation: null
                  model_count: 1
                  source: null
                  source_url: null
                  task_type: null
                  version: v1
              schema:
                $ref: '#/components/schemas/UnifiedBenchmarksResponse'
          description: >-
            Benchmark results filtered by the specified source and optional task
            type.
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
    UnifiedBenchmarksResponse:
      example:
        data:
          - agentic_index: 58.3
            coding_index: 65.8
            display_name: GPT-4o
            intelligence_index: 71.2
            model_permaslug: openai/gpt-4o
            pricing:
              completion: '0.00001'
              prompt: '0.0000025'
            source: artificial-analysis
        meta:
          as_of: '2026-06-03T12:00:00Z'
          citation: null
          model_count: 1
          source: null
          source_url: null
          task_type: null
          version: v1
      properties:
        data:
          items:
            discriminator:
              mapping:
                artificial-analysis:
                  $ref: '#/components/schemas/UnifiedBenchmarksAAItem'
                design-arena:
                  $ref: '#/components/schemas/UnifiedBenchmarksDAItem'
              propertyName: source
            oneOf:
              - $ref: '#/components/schemas/UnifiedBenchmarksAAItem'
              - $ref: '#/components/schemas/UnifiedBenchmarksDAItem'
          type: array
        meta:
          $ref: '#/components/schemas/UnifiedBenchmarksMeta'
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
    UnifiedBenchmarksAAItem:
      example:
        agentic_index: 58.3
        coding_index: 65.8
        display_name: GPT-4o
        intelligence_index: 71.2
        model_permaslug: openai/gpt-4o
        pricing:
          completion: '0.00001'
          prompt: '0.0000025'
        source: artificial-analysis
      properties:
        agentic_index:
          description: Artificial Analysis Agentic Index composite score. Higher is better.
          example: 58.3
          format: double
          type:
            - number
            - 'null'
        coding_index:
          description: Artificial Analysis Coding Index composite score. Higher is better.
          example: 65.8
          format: double
          type:
            - number
            - 'null'
        display_name:
          description: Model name as listed on Artificial Analysis.
          example: GPT-4o
          type: string
        intelligence_index:
          description: >-
            Artificial Analysis Intelligence Index composite score. Higher is
            better.
          example: 71.2
          format: double
          type:
            - number
            - 'null'
        model_permaslug:
          description: Stable OpenRouter model identifier.
          example: openai/gpt-4o
          type: string
        pricing:
          $ref: '#/components/schemas/UnifiedBenchmarkPricing'
        source:
          description: Benchmark source discriminator.
          enum:
            - artificial-analysis
          type: string
      required:
        - source
        - model_permaslug
        - display_name
        - intelligence_index
        - coding_index
        - agentic_index
        - pricing
      type: object
    UnifiedBenchmarksDAItem:
      example:
        arena: models
        avg_generation_time_ms: 3200
        category: codecategories
        display_name: Claude Sonnet 4
        elo: 1423
        model_permaslug: anthropic/claude-sonnet-4
        pricing:
          completion: '0.000015'
          prompt: '0.000003'
        source: design-arena
        tournament_stats:
          first_place: 12
          fourth_place: 2
          second_place: 8
          third_place: 5
          total: 27
        win_rate: 72
      properties:
        arena:
          description: Arena this ranking belongs to.
          example: models
          type: string
        avg_generation_time_ms:
          description: Average generation time in milliseconds.
          example: 3200
          format: double
          type:
            - number
            - 'null'
        category:
          description: Category within the arena.
          example: codecategories
          type: string
        display_name:
          description: Human-readable model name from Design Arena.
          example: Claude Sonnet 4
          type: string
        elo:
          description: ELO rating from head-to-head arena battles.
          example: 1423
          format: double
          type: number
        model_permaslug:
          description: >-
            Stable OpenRouter model identifier when mapped; otherwise the
            upstream Design Arena model id.
          example: anthropic/claude-sonnet-4
          type: string
        pricing:
          $ref: '#/components/schemas/UnifiedBenchmarkPricing'
        source:
          description: Benchmark source discriminator.
          enum:
            - design-arena
          type: string
        tournament_stats:
          description: Placement distribution from tournament matches.
          properties:
            first_place:
              type:
                - integer
                - 'null'
            fourth_place:
              type:
                - integer
                - 'null'
            second_place:
              type:
                - integer
                - 'null'
            third_place:
              type:
                - integer
                - 'null'
            total:
              type:
                - integer
                - 'null'
          required:
            - first_place
            - second_place
            - third_place
            - fourth_place
            - total
          type: object
        win_rate:
          description: Win rate as a percentage (0–100).
          example: 72
          format: double
          type: number
      required:
        - source
        - model_permaslug
        - display_name
        - arena
        - category
        - elo
        - win_rate
        - avg_generation_time_ms
        - tournament_stats
        - pricing
      type: object
    UnifiedBenchmarksMeta:
      example:
        as_of: '2026-06-03T12:00:00Z'
        citation: >-
          Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter
          (openrouter.ai/rankings).
        model_count: 50
        source: artificial-analysis
        source_url: https://artificialanalysis.ai
        task_type: null
        version: v1
      properties:
        as_of:
          description: ISO-8601 timestamp of when this data was last updated.
          example: '2026-06-03T12:00:00Z'
          type: string
        citation:
          description: >-
            Required attribution when republishing this data, or null when
            results span multiple sources (attribute each item individually by
            its `source` discriminator).
          example: >-
            Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter
            (openrouter.ai/rankings).
          type:
            - string
            - 'null'
        model_count:
          description: Number of unique models in the response.
          type: integer
        source:
          description: The source filter applied, or null when all sources are returned.
          enum:
            - artificial-analysis
            - design-arena
            - null
          example: artificial-analysis
          type:
            - string
            - 'null'
        source_url:
          description: >-
            URL of the upstream data source, or null when results span multiple
            sources.
          example: https://artificialanalysis.ai
          type:
            - string
            - 'null'
        task_type:
          description: The task_type filter applied, or null if showing all.
          type:
            - string
            - 'null'
        version:
          description: Dataset version.
          enum:
            - v1
          type: string
      required:
        - as_of
        - version
        - source
        - source_url
        - citation
        - model_count
        - task_type
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
    UnifiedBenchmarkPricing:
      description: >-
        OpenRouter pricing per token for this model. Null if pricing is
        unavailable.
      example:
        completion: '0.000015'
        prompt: '0.000003'
      properties:
        completion:
          description: Cost per output token (USD, decimal string).
          example: '0.000015'
          type: string
        prompt:
          description: Cost per input token (USD, decimal string).
          example: '0.000003'
          type: string
      required:
        - prompt
        - completion
      type:
        - object
        - 'null'
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````