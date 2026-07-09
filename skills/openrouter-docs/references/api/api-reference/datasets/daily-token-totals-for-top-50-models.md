> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Daily token totals for top 50 models

> Returns the top 50 public models per day by total token usage on OpenRouter, plus a
single aggregated `other` row per day that sums every model outside that top 50.
Token totals are `prompt_tokens + completion_tokens`, matching the public rankings
chart on openrouter.ai/rankings.

Each row is a distinct `(date, model_permaslug)` pair. The `other` row uses the
reserved permaslug `other` and is always returned last within its date, so callers
can compute `top-50 traffic / total daily traffic` without a second request.

Optional filters slice the dataset. `period` (`day`/`week`/`month`) sets the time
grain. `modality` and `context_bucket` narrow the exact dataset by output/input
modality (or tool-calling activity) and request context length. `category` and
`language_type` instead read a sampled, upsampled dataset whose `total_tokens` are
weekly-grain estimates — they cannot be combined with each other or with the exact
filters, and reject `period=day` with a 400.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."

Token counts come from each upstream provider's own tokenizer (Anthropic counts
are as reported by Anthropic, OpenAI counts are as reported by OpenAI, etc.), so
a token in one row is not directly comparable to a token in another row from a
different provider.



## OpenAPI

````yaml /openapi/openapi.yaml get /datasets/rankings-daily
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
  /datasets/rankings-daily:
    get:
      tags:
        - Datasets
      summary: Daily token totals for top 50 models
      description: >-
        Returns the top 50 public models per day by total token usage on
        OpenRouter, plus a

        single aggregated `other` row per day that sums every model outside that
        top 50.

        Token totals are `prompt_tokens + completion_tokens`, matching the
        public rankings

        chart on openrouter.ai/rankings.


        Each row is a distinct `(date, model_permaslug)` pair. The `other` row
        uses the

        reserved permaslug `other` and is always returned last within its date,
        so callers

        can compute `top-50 traffic / total daily traffic` without a second
        request.


        Optional filters slice the dataset. `period` (`day`/`week`/`month`) sets
        the time

        grain. `modality` and `context_bucket` narrow the exact dataset by
        output/input

        modality (or tool-calling activity) and request context length.
        `category` and

        `language_type` instead read a sampled, upsampled dataset whose
        `total_tokens` are

        weekly-grain estimates — they cannot be combined with each other or with
        the exact

        filters, and reject `period=day` with a 400.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this dataset, OpenRouter must be cited as:

        "Source: OpenRouter (openrouter.ai/rankings), as of {as_of}."


        Token counts come from each upstream provider's own tokenizer (Anthropic
        counts

        are as reported by Anthropic, OpenAI counts are as reported by OpenAI,
        etc.), so

        a token in one row is not directly comparable to a token in another row
        from a

        different provider.
      operationId: getRankingsDaily
      parameters:
        - description: >-
            Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            30 days before `end_date`. The dataset begins at 2025-01-01; earlier
            values are clamped forward to that floor and the resolved value is
            echoed in `meta.start_date`.
          in: query
          name: start_date
          required: false
          schema:
            description: >-
              Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults
              to 30 days before `end_date`. The dataset begins at 2025-01-01;
              earlier values are clamped forward to that floor and the resolved
              value is echoed in `meta.start_date`.
            example: '2026-04-12'
            pattern: ^\d{4}-\d{2}-\d{2}$
            type: string
        - description: >-
            End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            the most recent completed UTC day. Must be on or after 2025-01-01;
            earlier values are rejected with a 400.
          in: query
          name: end_date
          required: false
          schema:
            description: >-
              End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
              the most recent completed UTC day. Must be on or after 2025-01-01;
              earlier values are rejected with a 400.
            example: '2026-05-11'
            pattern: ^\d{4}-\d{2}-\d{2}$
            type: string
        - description: >-
            Time grain of each row. `day` (default) returns the per-UTC-day
            series; `week` buckets by ISO week start; `month` buckets by month
            start. With `category` or `language_type` only `week` (default) and
            `month` are available — `day` is rejected with a 400 because those
            datasets are aggregated weekly. For those sampled datasets
            `period=month` buckets each week by its week-start month, so totals
            are approximate at month boundaries.
          in: query
          name: period
          required: false
          schema:
            description: >-
              Time grain of each row. `day` (default) returns the per-UTC-day
              series; `week` buckets by ISO week start; `month` buckets by month
              start. With `category` or `language_type` only `week` (default)
              and `month` are available — `day` is rejected with a 400 because
              those datasets are aggregated weekly. For those sampled datasets
              `period=month` buckets each week by its week-start month, so
              totals are approximate at month boundaries.
            enum:
              - day
              - week
              - month
            example: day
            type: string
        - description: >-
            Restrict to models for a modality surface: `text` / `image_output`
            match output modality, `image` / `audio` match input modality, and
            `tool_calling` keeps only rows that recorded at least one tool call.
            Exact dataset — cannot be combined with `category` or
            `language_type`.
          in: query
          name: modality
          required: false
          schema:
            description: >-
              Restrict to models for a modality surface: `text` / `image_output`
              match output modality, `image` / `audio` match input modality, and
              `tool_calling` keeps only rows that recorded at least one tool
              call. Exact dataset — cannot be combined with `category` or
              `language_type`.
            enum:
              - text
              - image
              - image_output
              - audio
              - tool_calling
            example: text
            type: string
        - description: >-
            Restrict to requests whose context length falls in this bucket
            (`1K`, `10K`, `100K`, `1M`, or `10M`). Exact dataset — cannot be
            combined with `category` or `language_type`.
          in: query
          name: context_bucket
          required: false
          schema:
            description: >-
              Restrict to requests whose context length falls in this bucket
              (`1K`, `10K`, `100K`, `1M`, or `10M`). Exact dataset — cannot be
              combined with `category` or `language_type`.
            enum:
              - 1K
              - 10K
              - 100K
              - 1M
              - 10M
            example: 100K
            type: string
        - description: >-
            Restrict to a use-case category (e.g. `programming`, `roleplay`).
            Sourced from a sampled, upsampled dataset, so `total_tokens` is an
            estimate and is aggregated weekly (the trailing weekly bucket may
            include traffic past `end_date`). Cannot be combined with
            `modality`, `context_bucket`, or `language_type`.
          in: query
          name: category
          required: false
          schema:
            description: >-
              Restrict to a use-case category (e.g. `programming`, `roleplay`).
              Sourced from a sampled, upsampled dataset, so `total_tokens` is an
              estimate and is aggregated weekly (the trailing weekly bucket may
              include traffic past `end_date`). Cannot be combined with
              `modality`, `context_bucket`, or `language_type`.
            enum:
              - programming
              - roleplay
              - marketing
              - marketing/seo
              - technology
              - science
              - translation
              - legal
              - finance
              - health
              - trivia
              - academia
            example: programming
            type: string
        - description: >-
            Restrict to natural-language or programming-language tagged
            activity. Sourced from a sampled, upsampled dataset, so
            `total_tokens` is an estimate and is aggregated weekly (the trailing
            weekly bucket may include traffic past `end_date`). Cannot be
            combined with `modality`, `context_bucket`, or `category`.
          in: query
          name: language_type
          required: false
          schema:
            description: >-
              Restrict to natural-language or programming-language tagged
              activity. Sourced from a sampled, upsampled dataset, so
              `total_tokens` is an estimate and is aggregated weekly (the
              trailing weekly bucket may include traffic past `end_date`).
              Cannot be combined with `modality`, `context_bucket`, or
              `category`.
            enum:
              - natural
              - programming
            example: natural
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - date: '2026-05-11'
                    model_permaslug: openai/gpt-4o-2024-05-13
                    total_tokens: '12345678'
                  - date: '2026-05-11'
                    model_permaslug: anthropic/claude-3.5-sonnet-20241022
                    total_tokens: '9876543'
                  - date: '2026-05-11'
                    model_permaslug: other
                    total_tokens: '4321098'
                meta:
                  as_of: '2026-05-12T02:00:00Z'
                  end_date: '2026-05-11'
                  start_date: '2026-04-12'
                  version: v1
              schema:
                $ref: '#/components/schemas/RankingsDailyResponse'
          description: >-
            Up to 51 rows per day — the top 50 public models by `total_tokens`
            plus a single aggregated `other` row covering every model outside
            that top 50. Sorted by `date` ascending, then by `total_tokens`
            descending, with `other` pinned last within its date.
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
    RankingsDailyResponse:
      example:
        data:
          - date: '2026-05-11'
            model_permaslug: openai/gpt-4o-2024-05-13
            total_tokens: '12345678'
          - date: '2026-05-11'
            model_permaslug: anthropic/claude-3.5-sonnet-20241022
            total_tokens: '9876543'
        meta:
          as_of: '2026-05-12T02:00:00Z'
          end_date: '2026-05-11'
          start_date: '2026-04-12'
          version: v1
      properties:
        data:
          description: >-
            Up to 51 rows per day — the top 50 public models by `total_tokens`
            for each UTC calendar date in the window, plus one aggregated
            `other` row summing every model outside that top 50 (omitted when
            the long tail is empty). Rows are sorted by `date` ascending, then
            by `total_tokens` descending, with `other` pinned last within its
            date. Ties between real models break alphabetically on
            `model_permaslug` so the order is stable across requests.
          items:
            $ref: '#/components/schemas/RankingsDailyItem'
          type: array
        meta:
          $ref: '#/components/schemas/RankingsDailyMeta'
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
    RankingsDailyItem:
      example:
        date: '2026-05-11'
        model_permaslug: openai/gpt-4o-2024-05-13
        total_tokens: '12345678'
      properties:
        date:
          description: UTC calendar date the row is aggregated over (YYYY-MM-DD).
          example: '2026-05-11'
          type: string
        model_permaslug:
          description: >-
            Model variant permaslug (e.g. `openai/gpt-4o-2024-05-13`,
            `openai/gpt-4o-2024-05-13:free`). Non-default variants include a
            `:variant` suffix and are ranked as their own entry. The reserved
            value `other` denotes the aggregated row covering every model
            outside the daily top 50 for that date — always sorted last within
            its date.
          example: openai/gpt-4o-2024-05-13
          type: string
        total_tokens:
          description: >-
            Sum of `prompt_tokens + completion_tokens` for the day, returned as
            a decimal string so 64-bit values are not truncated.
          example: '12345678'
          type: string
      required:
        - date
        - model_permaslug
        - total_tokens
      type: object
    RankingsDailyMeta:
      example:
        as_of: '2026-05-12T02:00:00Z'
        end_date: '2026-05-11'
        start_date: '2026-04-12'
        version: v1
      properties:
        as_of:
          description: >-
            ISO-8601 timestamp of when the response was generated. Reflects
            data-freshness because the underlying materialized view continuously
            ingests upstream events.
          example: '2026-05-12T02:00:00Z'
          type: string
        end_date:
          description: Resolved end of the date window (UTC, inclusive).
          example: '2026-05-11'
          type: string
        start_date:
          description: Resolved start of the date window (UTC, inclusive).
          example: '2026-04-12'
          type: string
        version:
          description: >-
            Dataset version. Field names and grain are stable for the life of
            `v1`.
          enum:
            - v1
          type: string
      required:
        - as_of
        - version
        - start_date
        - end_date
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````