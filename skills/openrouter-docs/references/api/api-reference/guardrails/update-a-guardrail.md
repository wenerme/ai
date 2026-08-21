> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update a guardrail

> Update an existing guardrail, or materialize an unconfigured workspace default guardrail. Collection fields use replace semantics: send the full desired set on every update. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml patch /guardrails/{id}
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
  /guardrails/{id}:
    patch:
      tags:
        - Guardrails
      summary: Update a guardrail
      description: >-
        Update an existing guardrail, or materialize an unconfigured workspace
        default guardrail. Collection fields use replace semantics: send the
        full desired set on every update. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: updateGuardrail
      parameters:
        - description: The unique identifier of the guardrail to update
          in: path
          name: id
          required: true
          schema:
            description: The unique identifier of the guardrail to update
            example: 550e8400-e29b-41d4-a716-446655440000
            format: uuid
            type: string
      requestBody:
        content:
          application/json:
            example:
              description: Updated description
              limit_usd: 75
              name: Updated Guardrail Name
              reset_interval: weekly
            schema:
              $ref: '#/components/schemas/UpdateGuardrailRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  allowed_models: null
                  allowed_providers:
                    - openai
                  created_at: '2025-08-24T10:30:00Z'
                  description: Updated description
                  enforce_zdr: null
                  enforce_zdr_anthropic: true
                  enforce_zdr_google: true
                  enforce_zdr_openai: true
                  enforce_zdr_other: true
                  enforce_zdr_xai: true
                  id: 550e8400-e29b-41d4-a716-446655440000
                  ignored_models: null
                  ignored_providers: null
                  include_byok_in_budgets: true
                  limit_usd: 75
                  name: Updated Guardrail Name
                  reset_interval: weekly
                  updated_at: '2025-08-24T16:00:00Z'
                  workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
              schema:
                $ref: '#/components/schemas/UpdateGuardrailResponse'
          description: Guardrail updated successfully
        '400':
          content:
            application/json:
              example:
                error:
                  code: 400
                  message: Invalid request parameters
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
          description: >-
            Invalid request, or an attempt to change a workspace default
            guardrail's name (which is derived from its workspace and not
            editable).
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
    UpdateGuardrailRequest:
      example:
        description: Updated description
        limit_usd: 75
        name: Updated Guardrail Name
        reset_interval: weekly
      properties:
        allowed_models:
          description: Array of model identifiers (slug or canonical_slug accepted)
          example:
            - openai/gpt-5.2
          items:
            type: string
          minItems: 1
          type:
            - array
            - 'null'
        allowed_providers:
          description: New list of allowed provider IDs
          example:
            - openai
            - anthropic
            - deepseek
          items:
            type: string
          minItems: 1
          type:
            - array
            - 'null'
        content_filter_builtins:
          description: >-
            Builtin content filters to apply. Set to null to remove. Every
            builtin slug supports "block", "redact", and the detect-only "flag"
            action.
          example:
            - action: block
              slug: regex-prompt-injection
          items:
            $ref: '#/components/schemas/ContentFilterBuiltinEntryInput'
          type:
            - array
            - 'null'
        content_filters:
          description: Custom regex content filters to apply. Set to null to remove.
          example: null
          items:
            $ref: '#/components/schemas/ContentFilterEntry'
          type:
            - array
            - 'null'
        description:
          description: New description for the guardrail
          example: Updated description
          maxLength: 1000
          type:
            - string
            - 'null'
        enable_free_model_publication:
          description: Whether this guardrail allows free endpoints that publish prompts.
          example: false
          type:
            - boolean
            - 'null'
        enable_free_model_training:
          description: >-
            Whether this guardrail allows free endpoints that train on request
            data.
          example: true
          type:
            - boolean
            - 'null'
        enable_paid_model_training:
          description: >-
            Whether this guardrail allows paid endpoints that train on request
            data.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr:
          deprecated: true
          description: >-
            Deprecated. Use enforce_zdr_anthropic, enforce_zdr_openai,
            enforce_zdr_google, enforce_zdr_xai, and enforce_zdr_other instead.
            When provided, its value is copied into any of those per-provider
            fields that are not explicitly specified on the request.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr_anthropic:
          description: >-
            Whether to enforce zero data retention for Anthropic models. Falls
            back to enforce_zdr when not provided.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr_google:
          description: >-
            Whether to enforce zero data retention for Google models. Falls back
            to enforce_zdr when not provided.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr_openai:
          description: >-
            Whether to enforce zero data retention for OpenAI models. Falls back
            to enforce_zdr when not provided.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr_other:
          description: >-
            Whether to enforce zero data retention for models that are not from
            Anthropic, OpenAI, Google, or xAI. Falls back to enforce_zdr when
            not provided.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr_xai:
          description: >-
            Whether to enforce zero data retention for xAI models. Falls back to
            enforce_zdr when not provided.
          example: true
          type:
            - boolean
            - 'null'
        ignored_models:
          description: >-
            Array of model identifiers to exclude from routing (slug or
            canonical_slug accepted)
          example:
            - openai/gpt-4o-mini
          items:
            type: string
          minItems: 1
          type:
            - array
            - 'null'
        ignored_providers:
          description: List of provider IDs to exclude from routing
          example:
            - azure
          items:
            type: string
          minItems: 1
          type:
            - array
            - 'null'
        include_byok_in_budgets:
          description: >-
            Whether BYOK (bring-your-own-key) inference spend counts toward this
            guardrail's limit_usd, in addition to OpenRouter credit spend. Omit
            to leave unchanged.
          example: true
          type: boolean
        limit_usd:
          description: New spending limit in USD
          example: 75
          format: double
          type:
            - number
            - 'null'
        name:
          description: New name for the guardrail
          example: Updated Guardrail Name
          maxLength: 200
          minLength: 1
          type: string
        reset_interval:
          $ref: '#/components/schemas/GuardrailInterval'
      type: object
    UpdateGuardrailResponse:
      example:
        data:
          allowed_models: null
          allowed_providers:
            - openai
          content_filter_builtins:
            - action: redact
              label: '[EMAIL]'
              slug: email
          content_filters: null
          created_at: '2025-08-24T10:30:00Z'
          description: Updated description
          enforce_zdr: null
          enforce_zdr_anthropic: true
          enforce_zdr_google: true
          enforce_zdr_openai: true
          enforce_zdr_other: true
          enforce_zdr_xai: true
          id: 550e8400-e29b-41d4-a716-446655440000
          ignored_models: null
          ignored_providers: null
          include_byok_in_budgets: true
          limit_usd: 75
          name: Updated Guardrail Name
          reset_interval: weekly
          updated_at: '2025-08-24T16:00:00Z'
          workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/Guardrail'
            - description: The updated guardrail
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
    ContentFilterBuiltinEntryInput:
      description: >-
        A builtin content filter entry for create/update requests. Labels are
        system-assigned and cannot be set by the caller.
      example:
        action: redact
        slug: email
      properties:
        action:
          $ref: '#/components/schemas/ContentFilterBuiltinAction'
        label:
          deprecated: true
          description: >-
            Deprecated: labels are system-assigned and cannot be set by the
            caller. Accepted for backward compatibility but silently ignored.
          maxLength: 100
          type: string
        scan_scope:
          $ref: '#/components/schemas/PromptInjectionScanScope'
        slug:
          $ref: '#/components/schemas/ContentFilterBuiltinSlug'
      required:
        - slug
        - action
      type: object
    ContentFilterEntry:
      description: >-
        A custom regex content filter that scans request messages for matching
        patterns.
      example:
        action: redact
        label: '[API_KEY]'
        pattern: \b(sk-[a-zA-Z0-9]{48})\b
      properties:
        action:
          $ref: '#/components/schemas/ContentFilterAction'
        label:
          description: Optional label used in redaction placeholders or error messages
          example: '[API_KEY]'
          maxLength: 100
          type:
            - string
            - 'null'
        pattern:
          description: A regex pattern to match against request content
          example: \b(sk-[a-zA-Z0-9]{48})\b
          minLength: 1
          type: string
      required:
        - pattern
        - action
      type: object
    GuardrailInterval:
      description: Interval at which the limit resets (daily, weekly, monthly)
      enum:
        - daily
        - weekly
        - monthly
        - null
      example: monthly
      type:
        - string
        - 'null'
    Guardrail:
      example:
        allowed_models: null
        allowed_providers:
          - openai
          - anthropic
          - google
        content_filter_builtins:
          - action: redact
            label: '[EMAIL]'
            slug: email
        content_filters: null
        created_at: '2025-08-24T10:30:00Z'
        description: Guardrail for production environment
        enable_free_model_publication: false
        enable_free_model_training: true
        enable_paid_model_training: true
        enforce_zdr: null
        enforce_zdr_anthropic: true
        enforce_zdr_google: false
        enforce_zdr_openai: true
        enforce_zdr_other: false
        enforce_zdr_xai: false
        id: 550e8400-e29b-41d4-a716-446655440000
        ignored_models: null
        ignored_providers: null
        include_byok_in_budgets: false
        limit_usd: 100
        name: Production Guardrail
        reset_interval: monthly
        updated_at: '2025-08-24T15:45:00Z'
        workspace_id: 0df9e665-d932-5740-b2c7-b52af166bc11
      properties:
        allowed_models:
          description: Array of model canonical_slugs (immutable identifiers)
          example:
            - openai/gpt-5.2-20251211
            - anthropic/claude-4.5-opus-20251124
            - deepseek/deepseek-r1-0528:free
          items:
            type: string
          type:
            - array
            - 'null'
        allowed_providers:
          description: List of allowed provider IDs
          example:
            - openai
            - anthropic
            - google
          items:
            type: string
          type:
            - array
            - 'null'
        content_filter_builtins:
          description: >-
            Builtin content filters applied to requests. Includes PII detectors
            and the regex-based prompt injection detector.
          example:
            - action: redact
              label: '[EMAIL]'
              slug: email
          items:
            $ref: '#/components/schemas/ContentFilterBuiltinEntry'
          type:
            - array
            - 'null'
        content_filters:
          description: Custom regex content filters applied to request messages
          example:
            - action: redact
              label: '[API_KEY]'
              pattern: \b(sk-[a-zA-Z0-9]{48})\b
          items:
            $ref: '#/components/schemas/ContentFilterEntry'
          type:
            - array
            - 'null'
        created_at:
          description: ISO 8601 timestamp of when the guardrail was created
          example: '2025-08-24T10:30:00Z'
          type: string
        description:
          description: Description of the guardrail
          example: Guardrail for production environment
          type:
            - string
            - 'null'
        enable_free_model_publication:
          description: Whether this guardrail allows free endpoints that publish prompts.
          example: false
          type:
            - boolean
            - 'null'
        enable_free_model_training:
          description: >-
            Whether this guardrail allows free endpoints that train on request
            data.
          example: true
          type:
            - boolean
            - 'null'
        enable_paid_model_training:
          description: >-
            Whether this guardrail allows paid endpoints that train on request
            data.
          example: true
          type:
            - boolean
            - 'null'
        enforce_zdr:
          deprecated: true
          description: >-
            Deprecated. Use enforce_zdr_anthropic, enforce_zdr_openai,
            enforce_zdr_google, enforce_zdr_xai, and enforce_zdr_other instead.
            When provided, its value is copied into any of those per-provider
            fields that are not explicitly specified on the request.
          example: false
          type:
            - boolean
            - 'null'
        enforce_zdr_anthropic:
          description: >-
            Whether to enforce zero data retention for Anthropic models. Falls
            back to enforce_zdr when not provided.
          example: false
          type:
            - boolean
            - 'null'
        enforce_zdr_google:
          description: >-
            Whether to enforce zero data retention for Google models. Falls back
            to enforce_zdr when not provided.
          example: false
          type:
            - boolean
            - 'null'
        enforce_zdr_openai:
          description: >-
            Whether to enforce zero data retention for OpenAI models. Falls back
            to enforce_zdr when not provided.
          example: false
          type:
            - boolean
            - 'null'
        enforce_zdr_other:
          description: >-
            Whether to enforce zero data retention for models that are not from
            Anthropic, OpenAI, Google, or xAI. Falls back to enforce_zdr when
            not provided.
          example: false
          type:
            - boolean
            - 'null'
        enforce_zdr_xai:
          description: >-
            Whether to enforce zero data retention for xAI models. Falls back to
            enforce_zdr when not provided.
          example: false
          type:
            - boolean
            - 'null'
        id:
          description: Unique identifier for the guardrail
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
        ignored_models:
          description: Array of model canonical_slugs to exclude from routing
          example:
            - openai/gpt-4o-mini-2024-07-18
          items:
            type: string
          type:
            - array
            - 'null'
        ignored_providers:
          description: List of provider IDs to exclude from routing
          example:
            - azure
          items:
            type: string
          type:
            - array
            - 'null'
        include_byok_in_budgets:
          description: >-
            Whether BYOK (bring-your-own-key) inference spend counts toward this
            guardrail's limit_usd, in addition to OpenRouter credit spend.
          example: false
          type: boolean
        limit_usd:
          description: Spending limit in USD
          example: 100
          format: double
          type:
            - number
            - 'null'
        name:
          description: Name of the guardrail
          example: Production Guardrail
          type: string
        reset_interval:
          $ref: '#/components/schemas/GuardrailInterval'
        updated_at:
          description: ISO 8601 timestamp of when the guardrail was last updated
          example: '2025-08-24T15:45:00Z'
          type:
            - string
            - 'null'
        workspace_id:
          description: >-
            The workspace this guardrail belongs to, or `null` for an unscoped
            legacy guardrail predating workspaces. Workspace membership
            organizes the guardrail; it does not apply the guardrail to the
            workspace's traffic. A `null` value does not mean the default
            workspace, and does not apply the guardrail across every workspace.
          example: 0df9e665-d932-5740-b2c7-b52af166bc11
          type:
            - string
            - 'null'
      required:
        - id
        - name
        - include_byok_in_budgets
        - created_at
        - workspace_id
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
    ContentFilterBuiltinAction:
      description: Action taken when the builtin filter triggers
      enum:
        - redact
        - block
        - flag
      example: block
      type: string
    PromptInjectionScanScope:
      description: >-
        Which message roles to scan for prompt injection. Only applies to the
        regex-prompt-injection builtin. Defaults to all_messages.
      enum:
        - user_only
        - all_messages
      example: user_only
      type: string
    ContentFilterBuiltinSlug:
      description: The builtin filter identifier
      enum:
        - email
        - phone
        - ssn
        - credit-card
        - ip-address
        - person-name
        - address
        - regex-prompt-injection
      example: regex-prompt-injection
      type: string
    ContentFilterAction:
      description: Action taken when the pattern matches
      enum:
        - redact
        - block
        - flag
      example: block
      type: string
    ContentFilterBuiltinEntry:
      description: >-
        A builtin content filter entry. Builtin filters include PII detectors
        and the regex-based prompt injection detector.
      example:
        action: redact
        label: '[EMAIL]'
        slug: email
      properties:
        action:
          $ref: '#/components/schemas/ContentFilterBuiltinAction'
        label:
          description: >-
            Read-only, system-assigned redaction placeholder derived from the
            slug (e.g. "[EMAIL]", "[PHONE]"). Not settable by the caller.
          example: '[EMAIL]'
          maxLength: 100
          type: string
        scan_scope:
          $ref: '#/components/schemas/PromptInjectionScanScope'
        slug:
          $ref: '#/components/schemas/ContentFilterBuiltinSlug'
      required:
        - slug
        - action
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````