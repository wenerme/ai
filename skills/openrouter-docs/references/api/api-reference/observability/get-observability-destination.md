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
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingArizeConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingArizeConfig
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
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingBraintrustConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingBraintrustConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingClickhouseConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingClickhouseConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingDatadogConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingDatadogConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingGrafanaConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingGrafanaConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangfuseConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangfuseConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangsmithConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangsmithConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfigRegion:
      type: string
      enum:
        - us
        - eu
      default: us
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfigRegion
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfig:
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
          $ref: >-
            #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfigRegion
      required:
        - licenseKey
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingOpikConfig:
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
      title: UpdateObservabilityDestinationResponseDataDiscriminatorMappingOpikConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingOtelCollectorConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingOtelCollectorConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingPosthogConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingPosthogConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingRampConfig:
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
      title: UpdateObservabilityDestinationResponseDataDiscriminatorMappingRampConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingS3Config:
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
      title: UpdateObservabilityDestinationResponseDataDiscriminatorMappingS3Config
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingSentryConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingSentryConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingSnowflakeConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingSnowflakeConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingWeaveConfig:
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
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingWeaveConfig
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfigMethod:
      type: string
      enum:
        - POST
        - PUT
      default: POST
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfigMethod
    UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfig:
      type: object
      properties:
        headers:
          type: object
          additionalProperties:
            type: string
        method:
          $ref: >-
            #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfigMethod
        url:
          type: string
      required:
        - url
      title: >-
        UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfig
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingArizeConfig
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingBraintrustConfig
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingClickhouseConfig
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingDatadogConfig
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
              type: string
              enum:
                - grafana
              description: 'Discriminator value: grafana'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingGrafanaConfig
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
              type: string
              enum:
                - langfuse
              description: 'Discriminator value: langfuse'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangfuseConfig
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
              type: string
              enum:
                - langsmith
              description: 'Discriminator value: langsmith'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingLangsmithConfig
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
              type: string
              enum:
                - newrelic
              description: 'Discriminator value: newrelic'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingNewrelicConfig
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
              type: string
              enum:
                - opik
              description: 'Discriminator value: opik'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingOpikConfig
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
              type: string
              enum:
                - otel-collector
              description: 'Discriminator value: otel-collector'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingOtelCollectorConfig
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
              type: string
              enum:
                - posthog
              description: 'Discriminator value: posthog'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingPosthogConfig
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
              type: string
              enum:
                - ramp
              description: 'Discriminator value: ramp'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingRampConfig
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
              type: string
              enum:
                - s3
              description: 'Discriminator value: s3'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingS3Config
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
              type: string
              enum:
                - sentry
              description: 'Discriminator value: sentry'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingSentryConfig
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
              type: string
              enum:
                - snowflake
              description: 'Discriminator value: snowflake'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingSnowflakeConfig
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
              type: string
              enum:
                - weave
              description: 'Discriminator value: weave'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingWeaveConfig
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
              type: string
              enum:
                - webhook
              description: 'Discriminator value: webhook'
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
                #/components/schemas/UpdateObservabilityDestinationResponseDataDiscriminatorMappingWebhookConfig
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