> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Top apps by token usage

> Returns the top public apps on OpenRouter ranked by token usage inside the requested
date window, matching the public apps marketplace on openrouter.ai/apps. Token totals
are `prompt_tokens + completion_tokens`; hidden and private apps are excluded and
traffic from related app aliases is merged into the canonical visible app.

`sort=popular` (default) ranks by total token volume inside the window.
`sort=trending` ranks by absolute excess token growth: window volume minus the average
volume of the three equal-length periods immediately preceding the window. Apps with
no excess growth are omitted, so `trending` may return fewer than `limit` rows.

Filter with `category` (marketplace category group, e.g. `coding`) or `subcategory`
(e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page with `offset` —
`rank` stays absolute, so the first row of `offset=50` is `rank: 51`.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/apps), as of {as_of}."

Token counts come from each upstream provider's own tokenizer, so a token attributed
to one app is not directly comparable to a token attributed to another app whose
traffic flows through a different provider.

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse and republish with attribution to OpenRouter.



## OpenAPI

````yaml /openapi/openapi.yaml get /datasets/app-rankings
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
  /datasets/app-rankings:
    get:
      tags:
        - Datasets
      summary: Top apps by token usage
      description: >-
        Returns the top public apps on OpenRouter ranked by token usage inside
        the requested

        date window, matching the public apps marketplace on openrouter.ai/apps.
        Token totals

        are `prompt_tokens + completion_tokens`; hidden and private apps are
        excluded and

        traffic from related app aliases is merged into the canonical visible
        app.


        `sort=popular` (default) ranks by total token volume inside the window.

        `sort=trending` ranks by absolute excess token growth: window volume
        minus the average

        volume of the three equal-length periods immediately preceding the
        window. Apps with

        no excess growth are omitted, so `trending` may return fewer than
        `limit` rows.


        Filter with `category` (marketplace category group, e.g. `coding`) or
        `subcategory`

        (e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page
        with `offset` —

        `rank` stays absolute, so the first row of `offset=50` is `rank: 51`.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this dataset, OpenRouter must be cited as:

        "Source: OpenRouter (openrouter.ai/apps), as of {as_of}."


        Token counts come from each upstream provider's own tokenizer, so a
        token attributed

        to one app is not directly comparable to a token attributed to another
        app whose

        traffic flows through a different provider.


        Licensed under [CC BY
        4.0](https://creativecommons.org/licenses/by/4.0/): reuse and republish
        with attribution to OpenRouter.
      operationId: getAppRankings
      parameters:
        - description: >-
            Marketplace category group to filter by (e.g. `coding`). Only apps
            tagged with a subcategory inside this group are returned. Mutually
            combinable with `subcategory` — when both are supplied the
            `subcategory` must belong to the `category` group.
          in: query
          name: category
          required: false
          schema:
            description: >-
              Marketplace category group to filter by (e.g. `coding`). Only apps
              tagged with a subcategory inside this group are returned. Mutually
              combinable with `subcategory` — when both are supplied the
              `subcategory` must belong to the `category` group.
            enum:
              - coding
              - creative
              - productivity
              - entertainment
            example: coding
            type: string
        - description: >-
            Marketplace subcategory to filter by (e.g. `cli-agent`). Takes
            precedence over `category` for the actual filter; when `category` is
            also supplied the pair must be consistent.
          in: query
          name: subcategory
          required: false
          schema:
            description: >-
              Marketplace subcategory to filter by (e.g. `cli-agent`). Takes
              precedence over `category` for the actual filter; when `category`
              is also supplied the pair must be consistent.
            enum:
              - cli-agent
              - ide-extension
              - cloud-agent
              - programming-app
              - native-app-builder
              - creative-writing
              - video-gen
              - image-gen
              - audio-gen
              - roleplay
              - game
              - writing-assistant
              - general-chat
              - personal-agent
              - legal
            example: cli-agent
            type: string
        - description: >-
            `popular` ranks apps by total token volume inside the date window.
            `trending` ranks apps by absolute excess token growth: window volume
            minus the average volume of the three equal-length periods
            immediately preceding the window. Apps with no excess growth are
            omitted from `trending` results.
          in: query
          name: sort
          required: false
          schema:
            default: popular
            description: >-
              `popular` ranks apps by total token volume inside the date window.
              `trending` ranks apps by absolute excess token growth: window
              volume minus the average volume of the three equal-length periods
              immediately preceding the window. Apps with no excess growth are
              omitted from `trending` results.
            enum:
              - popular
              - trending
            example: popular
            type: string
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
        - description: Maximum number of apps to return (1-100). Defaults to 50.
          in: query
          name: limit
          required: false
          schema:
            default: 50
            description: Maximum number of apps to return (1-100). Defaults to 50.
            example: 50
            maximum: 100
            minimum: 1
            type: integer
        - description: >-
            Number of ranked apps to skip before the first returned row (0-100).
            Defaults to 0. `rank` stays absolute, so the first row of
            `offset=50` is `rank: 51`.
          in: query
          name: offset
          required: false
          schema:
            default: 0
            description: >-
              Number of ranked apps to skip before the first returned row
              (0-100). Defaults to 0. `rank` stays absolute, so the first row of
              `offset=50` is `rank: 51`.
            example: 0
            maximum: 100
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
                  - app_id: 12345
                    app_name: Cline
                    rank: 1
                    total_requests: 4321
                    total_tokens: '12345678'
                  - app_id: 67890
                    app_name: Roo Code
                    rank: 2
                    total_requests: 2109
                    total_tokens: '9876543'
                meta:
                  as_of: '2026-05-12T02:00:00Z'
                  end_date: '2026-05-11'
                  start_date: '2026-04-12'
                  version: v1
              schema:
                $ref: '#/components/schemas/AppRankingsResponse'
          description: >-
            Apps ranked per the requested `sort`, re-numbered 1..N. `popular`
            sorts by `total_tokens` descending; `trending` sorts by absolute
            excess token growth descending and may return fewer than `limit`
            rows.
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
    AppRankingsResponse:
      example:
        data:
          - app_id: 12345
            app_name: Cline
            rank: 1
            total_requests: 4321
            total_tokens: '12345678'
          - app_id: 67890
            app_name: Roo Code
            rank: 2
            total_requests: 2109
            total_tokens: '9876543'
        meta:
          as_of: '2026-05-12T02:00:00.000Z'
          end_date: '2026-05-11'
          start_date: '2026-04-12'
          version: v1
      properties:
        data:
          description: >-
            Apps ranked per the requested `sort`, re-numbered 1..N after
            category filtering. `popular` sorts by `total_tokens` descending;
            `trending` sorts by absolute excess token growth descending and may
            return fewer than `limit` rows when few apps are growing.
          items:
            $ref: '#/components/schemas/AppRankingsItem'
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
    AppRankingsItem:
      example:
        app_id: 12345
        app_name: Cline
        rank: 1
        total_requests: 4321
        total_tokens: '12345678'
      properties:
        app_id:
          description: Stable numeric identifier of the app on OpenRouter.
          example: 12345
          type: integer
        app_name:
          description: Public display name of the app.
          example: Cline
          type: string
        rank:
          description: >-
            1-based position of the app within this response, per the requested
            `sort`.
          example: 1
          type: integer
        total_requests:
          description: Number of requests attributed to the app inside the date window.
          example: 4321
          type: integer
        total_tokens:
          description: >-
            Sum of `prompt_tokens + completion_tokens` attributed to the app
            inside the date window, returned as a decimal string so 64-bit
            values are not truncated.
          example: '12345678'
          type: string
      required:
        - rank
        - app_id
        - app_name
        - total_tokens
        - total_requests
      type: object
    RankingsDailyMeta:
      example:
        as_of: '2026-05-12T02:00:00.000Z'
        end_date: '2026-05-11'
        start_date: '2026-04-12'
        version: v1
      properties:
        as_of:
          description: >-
            ISO-8601 timestamp of when the response was generated. Reflects
            data-freshness because the underlying materialized view continuously
            ingests upstream events.
          example: '2026-05-12T02:00:00.000Z'
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