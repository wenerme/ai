> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update an observability destination

> Update an existing observability destination. Only the fields provided in the request body are updated. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml patch /observability/destinations/{id}
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
  /observability/destinations/{id}:
    patch:
      tags:
        - Observability
      summary: Update an observability destination
      description: >-
        Update an existing observability destination. Only the fields provided
        in the request body are updated. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: updateObservabilityDestination
      parameters:
        - description: The destination ID (UUID).
          in: path
          name: id
          required: true
          schema:
            description: The destination ID (UUID).
            example: 99999999-aaaa-bbbb-cccc-dddddddddddd
            format: uuid
            type: string
      requestBody:
        content:
          application/json:
            example:
              enabled: false
              name: Updated Langfuse
            schema:
              $ref: '#/components/schemas/UpdateObservabilityDestinationRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  api_key_hashes: null
                  config:
                    baseUrl: https://us.cloud.langfuse.com
                    publicKey: pk-l...EfGh
                    secretKey: sk-l...AbCd
                  created_at: '2025-08-24T10:30:00Z'
                  enabled: true
                  filter_rules: null
                  id: 99999999-aaaa-bbbb-cccc-dddddddddddd
                  name: Production Langfuse
                  privacy_mode: false
                  sampling_rate: 1
                  type: langfuse
                  updated_at: '2025-08-24T15:45:00Z'
                  workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/UpdateObservabilityDestinationResponse'
          description: Destination updated successfully
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
        '409':
          content:
            application/json:
              example:
                error:
                  code: 409
                  message: Resource conflict. Please try again later.
              schema:
                $ref: '#/components/schemas/ConflictResponse'
          description: Conflict - Resource conflict or concurrent modification
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
    UpdateObservabilityDestinationRequest:
      example:
        enabled: false
        name: Updated Langfuse
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes. `null` clears the
            filter (all keys). Omitting leaves the current value. Must contain
            at least one hash if provided.
          example: null
          items:
            type: string
          minItems: 1
          type:
            - array
            - 'null'
        config:
          additionalProperties: {}
          description: >-
            Provider-specific configuration fields to update. Masked values are
            ignored; unset fields keep their current value.
          example:
            baseUrl: https://us.cloud.langfuse.com
            publicKey: pk-l...EfGh
            secretKey: sk-l...AbCd
          type: object
        enabled:
          description: Whether the destination is enabled.
          example: true
          type: boolean
        filter_rules:
          allOf:
            - $ref: '#/components/schemas/ObservabilityFilterRulesConfigNullable'
            - description: >-
                Optional structured filter rules. `null` clears the rules.
                Omitting keeps the current value.
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type: string
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded — only
            metadata.
          example: false
          type: boolean
        sampling_rate:
          description: Sampling rate between 0.0001 and 1 (1 = 100%).
          example: 1
          format: double
          type: number
      type: object
    UpdateObservabilityDestinationResponse:
      example:
        data:
          api_key_hashes: null
          config:
            baseUrl: https://us.cloud.langfuse.com
            publicKey: pk-l...EfGh
            secretKey: sk-l...AbCd
          created_at: '2025-08-24T10:30:00Z'
          enabled: true
          filter_rules: null
          id: 99999999-aaaa-bbbb-cccc-dddddddddddd
          name: Production Langfuse
          privacy_mode: false
          sampling_rate: 1
          type: langfuse
          updated_at: '2025-08-24T15:45:00Z'
          workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/ObservabilityDestination'
            - description: The updated observability destination.
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
    ConflictResponse:
      description: Conflict - Resource conflict or concurrent modification
      example:
        error:
          code: 409
          message: Resource conflict. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/ConflictResponseErrorData'
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
    ObservabilityFilterRulesConfigNullable:
      description: Optional structured filter rules controlling which events are forwarded.
      example: null
      properties:
        enabled:
          default: true
          type: boolean
        groups:
          items:
            $ref: '#/components/schemas/ObservabilityFilterRuleGroup'
          type: array
      required:
        - groups
      type:
        - object
        - 'null'
    ObservabilityDestination:
      discriminator:
        mapping:
          arize:
            $ref: '#/components/schemas/ObservabilityArizeDestination'
          braintrust:
            $ref: '#/components/schemas/ObservabilityBraintrustDestination'
          clickhouse:
            $ref: '#/components/schemas/ObservabilityClickhouseDestination'
          datadog:
            $ref: '#/components/schemas/ObservabilityDatadogDestination'
          grafana:
            $ref: '#/components/schemas/ObservabilityGrafanaDestination'
          langfuse:
            $ref: '#/components/schemas/ObservabilityLangfuseDestination'
          langsmith:
            $ref: '#/components/schemas/ObservabilityLangsmithDestination'
          newrelic:
            $ref: '#/components/schemas/ObservabilityNewrelicDestination'
          opik:
            $ref: '#/components/schemas/ObservabilityOpikDestination'
          otel-collector:
            $ref: '#/components/schemas/ObservabilityOtelCollectorDestination'
          posthog:
            $ref: '#/components/schemas/ObservabilityPosthogDestination'
          ramp:
            $ref: '#/components/schemas/ObservabilityRampDestination'
          s3:
            $ref: '#/components/schemas/ObservabilityS3Destination'
          sentry:
            $ref: '#/components/schemas/ObservabilitySentryDestination'
          snowflake:
            $ref: '#/components/schemas/ObservabilitySnowflakeDestination'
          weave:
            $ref: '#/components/schemas/ObservabilityWeaveDestination'
          webhook:
            $ref: '#/components/schemas/ObservabilityWebhookDestination'
        propertyName: type
      example:
        api_key_hashes: null
        config:
          baseUrl: https://us.cloud.langfuse.com
          publicKey: pk-l...EfGh
          secretKey: sk-l...AbCd
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Langfuse
        privacy_mode: false
        sampling_rate: 1
        type: langfuse
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      oneOf:
        - $ref: '#/components/schemas/ObservabilityArizeDestination'
        - $ref: '#/components/schemas/ObservabilityBraintrustDestination'
        - $ref: '#/components/schemas/ObservabilityClickhouseDestination'
        - $ref: '#/components/schemas/ObservabilityDatadogDestination'
        - $ref: '#/components/schemas/ObservabilityGrafanaDestination'
        - $ref: '#/components/schemas/ObservabilityLangfuseDestination'
        - $ref: '#/components/schemas/ObservabilityLangsmithDestination'
        - $ref: '#/components/schemas/ObservabilityNewrelicDestination'
        - $ref: '#/components/schemas/ObservabilityOpikDestination'
        - $ref: '#/components/schemas/ObservabilityOtelCollectorDestination'
        - $ref: '#/components/schemas/ObservabilityPosthogDestination'
        - $ref: '#/components/schemas/ObservabilityRampDestination'
        - $ref: '#/components/schemas/ObservabilityS3Destination'
        - $ref: '#/components/schemas/ObservabilitySentryDestination'
        - $ref: '#/components/schemas/ObservabilitySnowflakeDestination'
        - $ref: '#/components/schemas/ObservabilityWeaveDestination'
        - $ref: '#/components/schemas/ObservabilityWebhookDestination'
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
    ConflictResponseErrorData:
      description: Error data for ConflictResponse
      example:
        code: 409
        message: Resource conflict. Please try again later.
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
    ObservabilityFilterRuleGroup:
      example:
        logic: and
        rules:
          - field: model
            operator: equals
            value: openai/gpt-4o
      properties:
        logic:
          default: and
          enum:
            - and
            - or
          type: string
        rules:
          items:
            properties:
              field:
                enum:
                  - model
                  - provider
                  - session_id
                  - user_id
                  - api_key_name
                  - finish_reason
                  - input
                  - output
                  - total_cost
                  - total_tokens
                  - prompt_tokens
                  - completion_tokens
                type: string
              operator:
                enum:
                  - equals
                  - not_equals
                  - contains
                  - not_contains
                  - regex
                  - starts_with
                  - ends_with
                  - gt
                  - lt
                  - gte
                  - lte
                  - exists
                  - not_exists
                type: string
              value:
                anyOf:
                  - type: string
                  - type: number
            required:
              - field
              - operator
            type: object
          type: array
      required:
        - rules
      type: object
    ObservabilityArizeDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: arize_...AbCd
          baseUrl: https://otlp.arize.com
          modelId: openrouter-prod
          spaceKey: space_...EfGh
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Arize
        privacy_mode: false
        sampling_rate: 1
        type: arize
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            baseUrl:
              default: https://otlp.arize.com
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            modelId:
              description: The name of the tracing project in Arize AX
              minLength: 1
              type: string
            spaceKey:
              minLength: 1
              type: string
          required:
            - apiKey
            - spaceKey
            - modelId
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - arize
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityBraintrustDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: sk-...AbCd
          baseUrl: https://api.braintrust.dev
          projectId: proj_...
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Braintrust
        privacy_mode: false
        sampling_rate: 1
        type: braintrust
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            baseUrl:
              default: https://api.braintrust.dev
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            projectId:
              minLength: 1
              type: string
          required:
            - apiKey
            - projectId
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - braintrust
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityClickhouseDestination:
      example:
        api_key_hashes: null
        config:
          database: analytics
          host: https://clickhouse.example.com:8123
          password: '********'
          table: OPENROUTER_TRACES
          username: default
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production ClickHouse
        privacy_mode: false
        sampling_rate: 1
        type: clickhouse
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            database:
              minLength: 1
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            host:
              minLength: 1
              type: string
            password:
              minLength: 1
              type: string
            table:
              default: OPENROUTER_TRACES
              type: string
            username:
              description: >-
                If you have not set a specific username in ClickHouse, simply
                type in 'default' below.
              minLength: 1
              type: string
          required:
            - host
            - database
            - username
            - password
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - clickhouse
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityDatadogDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: '************...AbCd'
          mlApp: my-llm-app
          url: https://api.us5.datadoghq.com
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Datadog
        privacy_mode: false
        sampling_rate: 1
        type: datadog
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              description: >-
                Datadog API key must have LLM Observability permissions. Create
                at: 
              minLength: 1
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            mlApp:
              description: Name to identify your application in Datadog LLM Observability
              minLength: 1
              type: string
            url:
              default: https://api.us5.datadoghq.com
              description: >-
                Datadog API URL for your region (e.g.,
                https://api.datadoghq.com, https://api.us3.datadoghq.com,
                https://api.datadoghq.eu)
              type: string
          required:
            - apiKey
            - mlApp
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - datadog
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityGrafanaDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: glc_...AbCd
          baseUrl: https://otlp-gateway-prod-us-west-0.grafana.net
          instanceId: '123456'
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Grafana
        privacy_mode: false
        sampling_rate: 1
        type: grafana
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            baseUrl:
              default: https://otlp-gateway-prod-us-west-0.grafana.net
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            instanceId:
              minLength: 1
              type: string
          required:
            - apiKey
            - instanceId
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - grafana
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityLangfuseDestination:
      example:
        api_key_hashes: null
        config:
          baseUrl: https://us.cloud.langfuse.com
          publicKey: pk-l...EfGh
          secretKey: sk-l...AbCd
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Langfuse
        privacy_mode: false
        sampling_rate: 1
        type: langfuse
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            baseUrl:
              default: https://us.cloud.langfuse.com
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            publicKey:
              minLength: 1
              type: string
            secretKey:
              minLength: 1
              type: string
          required:
            - secretKey
            - publicKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - langfuse
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityLangsmithDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: lsv2_...AbCd
          endpoint: https://api.smith.langchain.com
          project: main
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production LangSmith
        privacy_mode: false
        sampling_rate: 1
        type: langsmith
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            endpoint:
              default: https://api.smith.langchain.com
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            project:
              default: main
              description: >-
                The name for this project, such as pr-openrouter-demo. Defaults
                to "main" if not set.
              minLength: 1
              type: string
            workspaceId:
              description: >-
                Required for org-scoped API keys. Find this in your LangSmith
                workspace settings.
              type: string
          required:
            - apiKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - langsmith
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityNewrelicDestination:
      example:
        api_key_hashes: null
        config:
          licenseKey: '****...AbCd'
          region: us
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production New Relic
        privacy_mode: false
        sampling_rate: 1
        type: newrelic
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            licenseKey:
              minLength: 1
              type: string
            region:
              default: us
              enum:
                - us
                - eu
              type: string
          required:
            - licenseKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - newrelic
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityOpikDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: '****...AbCd'
          projectName: openrouter-prod
          workspace: my-workspace
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Opik
        privacy_mode: false
        sampling_rate: 1
        type: opik
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            projectName:
              minLength: 1
              type: string
            workspace:
              minLength: 1
              type: string
          required:
            - apiKey
            - workspace
            - projectName
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - opik
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityOtelCollectorDestination:
      example:
        api_key_hashes: null
        config:
          endpoint: https://otel.example.com:4318
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production OTel Collector
        privacy_mode: false
        sampling_rate: 1
        type: otel-collector
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            endpoint:
              type: string
            headers:
              additionalProperties:
                type: string
              description: >-
                Custom HTTP headers as a JSON object. For Axiom, use
                {"Authorization": "Bearer xaat-xxx", "X-Axiom-Dataset":
                "your-dataset"}
              type: object
          required:
            - endpoint
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - otel-collector
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityPosthogDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: phc_...AbCd
          endpoint: https://us.i.posthog.com
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production PostHog
        privacy_mode: false
        sampling_rate: 1
        type: posthog
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            endpoint:
              default: https://us.i.posthog.com
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
          required:
            - apiKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - posthog
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityRampDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: rmp_...AbCd
          baseUrl: https://api.ramp.com/developer/v1/ai-usage/openrouter
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Ramp
        privacy_mode: false
        sampling_rate: 1
        type: ramp
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              description: Generate this in your Ramp integration settings.
              minLength: 1
              type: string
            baseUrl:
              default: https://api.ramp.com/developer/v1/ai-usage/openrouter
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to Ramp.
              type: object
          required:
            - apiKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - ramp
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityS3Destination:
      example:
        api_key_hashes: null
        config:
          accessKeyId: AKIA...AbCd
          bucketName: openrouter-traces
          secretAccessKey: '****...EfGh'
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production S3
        privacy_mode: false
        sampling_rate: 1
        type: s3
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            accessKeyId:
              minLength: 1
              type: string
            bucketName:
              minLength: 1
              type: string
            endpoint:
              description: >-
                Only for S3-compatible services like Cloudflare R2
                (https://account-id.r2.cloudflarestorage.com) or MinIO. Leave
                blank for standard AWS S3.
              format: uri
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            pathTemplate:
              default: '{prefix}/{date}'
              description: >-
                Template for S3 object path. The filename
                ({traceId}-{timestamp}.json) is automatically appended.
                Available variables: {prefix}, {date}, {year}, {month}, {day},
                {apiKeyName}
              type: string
            prefix:
              default: openrouter-traces
              type: string
            region:
              type: string
            secretAccessKey:
              minLength: 1
              type: string
            sessionToken:
              type: string
          required:
            - bucketName
            - accessKeyId
            - secretAccessKey
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - s3
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilitySentryDestination:
      example:
        api_key_hashes: null
        config:
          dsn: https://abc123@o0.ingest.sentry.io/0
          otlpEndpoint: https://o0.ingest.sentry.io/api/0/otlp
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Sentry
        privacy_mode: false
        sampling_rate: 1
        type: sentry
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            dsn:
              minLength: 1
              pattern: ^https:\/\/([^:@]+)(?::[^@]*)?@([^/]+)(?:\/[^/]+)*\/(\d+)\/?$
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            otlpEndpoint:
              type: string
          required:
            - otlpEndpoint
            - dsn
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - sentry
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilitySnowflakeDestination:
      example:
        api_key_hashes: null
        config:
          account: xy12345.us-east-1
          token: '****...AbCd'
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Snowflake
        privacy_mode: false
        sampling_rate: 1
        type: snowflake
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            account:
              minLength: 1
              type: string
            database:
              default: SNOWFLAKE_LEARNING_DB
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            schema:
              default: PUBLIC
              type: string
            table:
              default: OPENROUTER_TRACES
              type: string
            token:
              minLength: 1
              type: string
            warehouse:
              default: COMPUTE_WH
              type: string
          required:
            - account
            - token
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - snowflake
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityWeaveDestination:
      example:
        api_key_hashes: null
        config:
          apiKey: '****...AbCd'
          baseUrl: https://trace.wandb.ai
          entity: my-team
          project: openrouter-prod
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Weave
        privacy_mode: false
        sampling_rate: 1
        type: weave
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            apiKey:
              minLength: 1
              type: string
            baseUrl:
              default: https://trace.wandb.ai
              type: string
            entity:
              minLength: 1
              type: string
            headers:
              additionalProperties:
                type: string
              description: Custom HTTP headers to include in requests to this destination.
              type: object
            project:
              minLength: 1
              type: string
          required:
            - apiKey
            - entity
            - project
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - weave
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityWebhookDestination:
      example:
        api_key_hashes: null
        config:
          url: https://example.com/openrouter-events
        created_at: '2025-08-24T10:30:00Z'
        enabled: true
        filter_rules: null
        id: 99999999-aaaa-bbbb-cccc-dddddddddddd
        name: Production Webhook
        privacy_mode: false
        sampling_rate: 1
        type: webhook
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            whose traffic is forwarded to this destination. `null` means all
            keys.
          example: null
          items:
            type: string
          type:
            - array
            - 'null'
        config:
          properties:
            headers:
              additionalProperties:
                type: string
              type: object
            method:
              default: POST
              enum:
                - POST
                - PUT
              type: string
            url:
              type: string
          required:
            - url
          type: object
        created_at:
          description: ISO timestamp of when the destination was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        enabled:
          description: Whether this destination is currently enabled.
          example: true
          type: boolean
        filter_rules:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
        id:
          description: Stable public identifier for this destination.
          example: 99999999-aaaa-bbbb-cccc-dddddddddddd
          format: uuid
          type: string
        name:
          description: Human-readable name for the destination.
          example: Production Langfuse
          type:
            - string
            - 'null'
        privacy_mode:
          description: >-
            When true, request/response bodies are not forwarded to this
            destination — only metadata.
          example: false
          type: boolean
        sampling_rate:
          description: >-
            Sampling rate for events sent to this destination, between 0.0001
            and 1 (1 = 100%).
          example: 1
          format: double
          type: number
        type:
          enum:
            - webhook
          type: string
        updated_at:
          description: ISO timestamp of when the destination was last updated.
          example: '2025-08-24T15:45:00Z'
          type: string
        workspace_id:
          description: ID of the workspace this destination belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - name
        - enabled
        - privacy_mode
        - sampling_rate
        - api_key_hashes
        - filter_rules
        - created_at
        - updated_at
        - type
        - config
      type: object
    ObservabilityFilterRulesConfig:
      description: Optional structured filter rules controlling which events are forwarded.
      example: null
      properties:
        enabled:
          default: true
          type: boolean
        groups:
          items:
            $ref: '#/components/schemas/ObservabilityFilterRuleGroup'
          type: array
      required:
        - groups
      type:
        - object
        - 'null'
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````