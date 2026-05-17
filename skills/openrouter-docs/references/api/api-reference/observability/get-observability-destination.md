> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get an observability destination

GET https://openrouter.ai/api/v1/observability/destinations/{id}

Fetch a single observability destination by its UUID. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/observability/get-observability-destination

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /observability/destinations/{id}:
    get:
      operationId: get-observability-destination
      summary: Get an observability destination
      description: >-
        Fetch a single observability destination by its UUID. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_observability
      parameters:
        - name: id
          in: path
          description: The destination ID (UUID).
          required: true
          schema:
            type: string
            format: uuid
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: The observability destination
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetObservabilityDestinationResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    ObservabilityDestinationDiscriminatorMappingArizeConfig:
      type: object
      properties:
        apiKey:
          type: string
        baseUrl:
          type: string
          default: https://otlp.arize.com
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        modelId:
          type: string
        spaceKey:
          type: string
      required:
        - apiKey
        - modelId
        - spaceKey
      title: ObservabilityDestinationDiscriminatorMappingArizeConfig
    ObservabilityFilterRulesConfigGroupsItemsLogic:
      type: string
      enum:
        - and
        - or
      default: and
      title: ObservabilityFilterRulesConfigGroupsItemsLogic
    ObservabilityFilterRulesConfigGroupsItemsRulesItemsField:
      type: string
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
      title: ObservabilityFilterRulesConfigGroupsItemsRulesItemsField
    ObservabilityFilterRulesConfigGroupsItemsRulesItemsOperator:
      type: string
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
      title: ObservabilityFilterRulesConfigGroupsItemsRulesItemsOperator
    ObservabilityFilterRulesConfigGroupsItemsRulesItemsValue:
      oneOf:
        - type: string
        - type: number
          format: double
      title: ObservabilityFilterRulesConfigGroupsItemsRulesItemsValue
    ObservabilityFilterRulesConfigGroupsItemsRulesItems:
      type: object
      properties:
        field:
          $ref: >-
            #/components/schemas/ObservabilityFilterRulesConfigGroupsItemsRulesItemsField
        operator:
          $ref: >-
            #/components/schemas/ObservabilityFilterRulesConfigGroupsItemsRulesItemsOperator
        value:
          $ref: >-
            #/components/schemas/ObservabilityFilterRulesConfigGroupsItemsRulesItemsValue
      required:
        - field
        - operator
      title: ObservabilityFilterRulesConfigGroupsItemsRulesItems
    ObservabilityFilterRulesConfigGroupsItems:
      type: object
      properties:
        logic:
          $ref: '#/components/schemas/ObservabilityFilterRulesConfigGroupsItemsLogic'
        rules:
          type: array
          items:
            $ref: >-
              #/components/schemas/ObservabilityFilterRulesConfigGroupsItemsRulesItems
      required:
        - rules
      title: ObservabilityFilterRulesConfigGroupsItems
    ObservabilityFilterRulesConfig:
      type: object
      properties:
        enabled:
          type: boolean
          default: true
        groups:
          type: array
          items:
            $ref: '#/components/schemas/ObservabilityFilterRulesConfigGroupsItems'
      required:
        - groups
      description: Optional structured filter rules controlling which events are forwarded.
      title: ObservabilityFilterRulesConfig
    ObservabilityDestinationDiscriminatorMappingBraintrustConfig:
      type: object
      properties:
        apiKey:
          type: string
        baseUrl:
          type: string
          default: https://api.braintrust.dev
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        projectId:
          type: string
      required:
        - apiKey
        - projectId
      title: ObservabilityDestinationDiscriminatorMappingBraintrustConfig
    ObservabilityDestinationDiscriminatorMappingClickhouseConfig:
      type: object
      properties:
        database:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        host:
          type: string
        password:
          type: string
        table:
          type: string
          default: OPENROUTER_TRACES
        username:
          type: string
          description: >-
            If you have not set a specific username in ClickHouse, simply type
            in 'default' below.
      required:
        - database
        - host
        - password
        - username
      title: ObservabilityDestinationDiscriminatorMappingClickhouseConfig
    ObservabilityDestinationDiscriminatorMappingDatadogConfig:
      type: object
      properties:
        apiKey:
          type: string
          description: 'Datadog API key must have LLM Observability permissions. Create at: '
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        mlApp:
          type: string
          description: Name to identify your application in Datadog LLM Observability
        url:
          type: string
          default: https://api.us5.datadoghq.com
          description: >-
            Datadog API URL for your region (e.g., https://api.datadoghq.com,
            https://api.us3.datadoghq.com, https://api.datadoghq.eu)
      required:
        - apiKey
        - mlApp
      title: ObservabilityDestinationDiscriminatorMappingDatadogConfig
    ObservabilityGrafanaDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
        baseUrl:
          type: string
          default: https://otlp-gateway-prod-us-west-0.grafana.net
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        instanceId:
          type: string
      required:
        - apiKey
        - instanceId
      title: ObservabilityGrafanaDestinationConfig
    ObservabilityGrafanaDestinationType:
      type: string
      enum:
        - grafana
      title: ObservabilityGrafanaDestinationType
    ObservabilityLangfuseDestinationConfig:
      type: object
      properties:
        baseUrl:
          type: string
          default: https://us.cloud.langfuse.com
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        publicKey:
          type: string
        secretKey:
          type: string
      required:
        - publicKey
        - secretKey
      title: ObservabilityLangfuseDestinationConfig
    ObservabilityLangfuseDestinationType:
      type: string
      enum:
        - langfuse
      title: ObservabilityLangfuseDestinationType
    ObservabilityLangsmithDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
        endpoint:
          type: string
          default: https://api.smith.langchain.com
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        project:
          type: string
          default: main
          description: >-
            The name for this project, such as pr-openrouter-demo. Defaults to
            "main" if not set.
        workspaceId:
          type: string
          description: >-
            Required for org-scoped API keys. Find this in your LangSmith
            workspace settings.
      required:
        - apiKey
      title: ObservabilityLangsmithDestinationConfig
    ObservabilityLangsmithDestinationType:
      type: string
      enum:
        - langsmith
      title: ObservabilityLangsmithDestinationType
    ObservabilityNewrelicDestinationConfigRegion:
      type: string
      enum:
        - us
        - eu
      default: us
      title: ObservabilityNewrelicDestinationConfigRegion
    ObservabilityNewrelicDestinationConfig:
      type: object
      properties:
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        licenseKey:
          type: string
        region:
          $ref: '#/components/schemas/ObservabilityNewrelicDestinationConfigRegion'
      required:
        - licenseKey
      title: ObservabilityNewrelicDestinationConfig
    ObservabilityNewrelicDestinationType:
      type: string
      enum:
        - newrelic
      title: ObservabilityNewrelicDestinationType
    ObservabilityOpikDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        projectName:
          type: string
        workspace:
          type: string
      required:
        - apiKey
        - projectName
        - workspace
      title: ObservabilityOpikDestinationConfig
    ObservabilityOpikDestinationType:
      type: string
      enum:
        - opik
      title: ObservabilityOpikDestinationType
    ObservabilityOtelCollectorDestinationConfig:
      type: object
      properties:
        endpoint:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
          description: >-
            Custom HTTP headers as a JSON object. For Axiom, use
            {"Authorization": "Bearer xaat-xxx", "X-Axiom-Dataset":
            "your-dataset"}
      required:
        - endpoint
      title: ObservabilityOtelCollectorDestinationConfig
    ObservabilityOtelCollectorDestinationType:
      type: string
      enum:
        - otel-collector
      title: ObservabilityOtelCollectorDestinationType
    ObservabilityPosthogDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
        endpoint:
          type: string
          default: https://us.i.posthog.com
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
      required:
        - apiKey
      title: ObservabilityPosthogDestinationConfig
    ObservabilityPosthogDestinationType:
      type: string
      enum:
        - posthog
      title: ObservabilityPosthogDestinationType
    ObservabilityRampDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
          description: Generate this in your Ramp integration settings.
        baseUrl:
          type: string
          default: https://api.ramp.com/developer/v1/ai-usage/openrouter
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to Ramp.
      required:
        - apiKey
      title: ObservabilityRampDestinationConfig
    ObservabilityRampDestinationType:
      type: string
      enum:
        - ramp
      title: ObservabilityRampDestinationType
    ObservabilityS3DestinationConfig:
      type: object
      properties:
        accessKeyId:
          type: string
        bucketName:
          type: string
        endpoint:
          type: string
          format: uri
          description: >-
            Only for S3-compatible services like Cloudflare R2
            (https://account-id.r2.cloudflarestorage.com) or MinIO. Leave blank
            for standard AWS S3.
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        pathTemplate:
          type: string
          default: '{prefix}/{date}'
          description: >-
            Template for S3 object path. The filename
            ({traceId}-{timestamp}.json) is automatically appended. Available
            variables: {prefix}, {date}, {year}, {month}, {day}, {apiKeyName}
        prefix:
          type: string
          default: openrouter-traces
        region:
          type: string
        secretAccessKey:
          type: string
        sessionToken:
          type: string
      required:
        - accessKeyId
        - bucketName
        - secretAccessKey
      title: ObservabilityS3DestinationConfig
    ObservabilityS3DestinationType:
      type: string
      enum:
        - s3
      title: ObservabilityS3DestinationType
    ObservabilitySentryDestinationConfig:
      type: object
      properties:
        dsn:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        otlpEndpoint:
          type: string
      required:
        - dsn
        - otlpEndpoint
      title: ObservabilitySentryDestinationConfig
    ObservabilitySentryDestinationType:
      type: string
      enum:
        - sentry
      title: ObservabilitySentryDestinationType
    ObservabilitySnowflakeDestinationConfig:
      type: object
      properties:
        account:
          type: string
        database:
          type: string
          default: SNOWFLAKE_LEARNING_DB
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        schema:
          type: string
          default: PUBLIC
        table:
          type: string
          default: OPENROUTER_TRACES
        token:
          type: string
        warehouse:
          type: string
          default: COMPUTE_WH
      required:
        - account
        - token
      title: ObservabilitySnowflakeDestinationConfig
    ObservabilitySnowflakeDestinationType:
      type: string
      enum:
        - snowflake
      title: ObservabilitySnowflakeDestinationType
    ObservabilityWeaveDestinationConfig:
      type: object
      properties:
        apiKey:
          type: string
        baseUrl:
          type: string
          default: https://trace.wandb.ai
        entity:
          type: string
        headers:
          type: object
          additionalProperties:
            type: string
          description: Custom HTTP headers to include in requests to this destination.
        project:
          type: string
      required:
        - apiKey
        - entity
        - project
      title: ObservabilityWeaveDestinationConfig
    ObservabilityWeaveDestinationType:
      type: string
      enum:
        - weave
      title: ObservabilityWeaveDestinationType
    ObservabilityWebhookDestinationConfigMethod:
      type: string
      enum:
        - POST
        - PUT
      default: POST
      title: ObservabilityWebhookDestinationConfigMethod
    ObservabilityWebhookDestinationConfig:
      type: object
      properties:
        headers:
          type: object
          additionalProperties:
            type: string
        method:
          $ref: '#/components/schemas/ObservabilityWebhookDestinationConfigMethod'
        url:
          type: string
      required:
        - url
      title: ObservabilityWebhookDestinationConfig
    ObservabilityWebhookDestinationType:
      type: string
      enum:
        - webhook
      title: ObservabilityWebhookDestinationType
    GetObservabilityDestinationResponseData:
      oneOf:
        - type: object
          properties:
            type:
              type: string
              enum:
                - arize
              description: 'Discriminator value: arize'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: >-
                #/components/schemas/ObservabilityDestinationDiscriminatorMappingArizeConfig
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: arize variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - braintrust
              description: 'Discriminator value: braintrust'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: >-
                #/components/schemas/ObservabilityDestinationDiscriminatorMappingBraintrustConfig
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: braintrust variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - clickhouse
              description: 'Discriminator value: clickhouse'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: >-
                #/components/schemas/ObservabilityDestinationDiscriminatorMappingClickhouseConfig
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: clickhouse variant
        - type: object
          properties:
            type:
              type: string
              enum:
                - datadog
              description: 'Discriminator value: datadog'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: >-
                #/components/schemas/ObservabilityDestinationDiscriminatorMappingDatadogConfig
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: datadog variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityGrafanaDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityGrafanaDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: grafana variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityLangfuseDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityLangfuseDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: langfuse variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityLangsmithDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityLangsmithDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: langsmith variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityNewrelicDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityNewrelicDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: newrelic variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityOpikDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityOpikDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: opik variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityOtelCollectorDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityOtelCollectorDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: otel-collector variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityPosthogDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityPosthogDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: posthog variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityRampDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityRampDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: ramp variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityS3DestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityS3DestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: s3 variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilitySentryDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilitySentryDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: sentry variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilitySnowflakeDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilitySnowflakeDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: snowflake variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityWeaveDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityWeaveDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: weave variant
        - type: object
          properties:
            type:
              $ref: '#/components/schemas/ObservabilityWebhookDestinationType'
            api_key_hashes:
              type:
                - array
                - 'null'
              items:
                type: string
              description: >-
                Optional allowlist of OpenRouter API key hashes
                (`api_keys.hash`) whose traffic is forwarded to this
                destination. `null` means all keys.
            config:
              $ref: '#/components/schemas/ObservabilityWebhookDestinationConfig'
            created_at:
              type: string
              description: ISO timestamp of when the destination was created.
            enabled:
              type: boolean
              description: Whether this destination is currently enabled.
            filter_rules:
              $ref: '#/components/schemas/ObservabilityFilterRulesConfig'
            id:
              type: string
              format: uuid
              description: Stable public identifier for this destination.
            name:
              type:
                - string
                - 'null'
              description: Human-readable name for the destination.
            privacy_mode:
              type: boolean
              description: >-
                When true, request/response bodies are not forwarded to this
                destination — only metadata.
            sampling_rate:
              type: number
              format: double
              description: >-
                Sampling rate for events sent to this destination, between 0 and
                1 (1 = 100%).
            updated_at:
              type: string
              description: ISO timestamp of when the destination was last updated.
            workspace_id:
              type: string
              format: uuid
              description: ID of the workspace this destination belongs to.
          required:
            - type
            - api_key_hashes
            - config
            - created_at
            - enabled
            - filter_rules
            - id
            - name
            - privacy_mode
            - sampling_rate
            - updated_at
            - workspace_id
          description: webhook variant
      discriminator:
        propertyName: type
      description: The observability destination.
      title: GetObservabilityDestinationResponseData
    GetObservabilityDestinationResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/GetObservabilityDestinationResponseData'
      required:
        - data
      title: GetObservabilityDestinationResponse
    UnauthorizedResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    NotFoundResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Not Found - Resource does not exist
      title: NotFoundResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python Observability_getObservabilityDestination_example
import requests

url = "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Observability_getObservabilityDestination_example
const url = 'https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Observability_getObservabilityDestination_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Observability_getObservabilityDestination_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Observability_getObservabilityDestination_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Observability_getObservabilityDestination_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Observability_getObservabilityDestination_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Observability_getObservabilityDestination_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/observability/destinations/99999999-aaaa-bbbb-cccc-dddddddddddd")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```