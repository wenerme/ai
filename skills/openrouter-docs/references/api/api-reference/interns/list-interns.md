> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List interns

> Lists interns visible to the authenticated key, newest first. Filter by workspace and one or more lifecycle statuses. The API key selects the caller, workspace and visible interns. There is no default workspace fallback. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/api-reference/authentication) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /interns
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
  - description: Containers endpoints
    name: Containers
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
  - description: >-
      Create, inspect, update, provision, suspend and delete OpenRouter interns
      through an API key, and talk to them: the chat route streams
      OpenAI-compatible completions from one intern, pausing as an
      `openrouter.provide_input` tool call when the intern needs your permission
      or an answer. Available to interns programme members; other callers
      receive 404. See https://openrouter.ai/docs/guides/ori/intern-chat.
    name: Interns
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
  - description: >-
      Management endpoints for SCIM group-to-workspace mappings, authenticated
      with a management key. These are not the SCIM 2.0 connector endpoints for
      your identity provider. In your identity provider, enter the SCIM endpoint
      URL shown when you enable provisioning under Settings > Members > SCIM
      Mappings. See
      https://openrouter.ai/docs/guides/features/scim-mappings#set-up-provisioning.
    name: SCIM
  - description: Speech-to-text endpoints
    name: STT
    x-displayName: Transcriptions
  - description: Text-to-speech endpoints
    name: TTS
    x-displayName: Speech
  - description: >-
      Store host-bound secrets for a workspace or for one intern. Scope is
      selected by the API key. Responses return metadata only, never secret
      values. See https://openrouter.ai/docs/guides/ori/vault.
    name: Vault
  - description: Video Generation endpoints
    name: Video Generation
  - description: Workspaces endpoints
    name: Workspaces
  - description: Alpha feature endpoints for Decisions (questions and answers) requests
    name: alpha.decisions
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /interns:
    get:
      tags:
        - Interns
      summary: List interns
      description: >-
        Lists interns visible to the authenticated key, newest first. Filter by
        workspace and one or more lifecycle statuses. The API key selects the
        caller, workspace and visible interns. There is no default workspace
        fallback. Requests on regional hostnames such as `eu.openrouter.ai` are
        refused. [API key](/docs/api-reference/authentication) required.
      operationId: listInterns
      parameters:
        - description: Maximum number of interns to return, from 1 through 500.
          in: query
          name: limit
          required: false
          schema:
            description: Maximum number of interns to return, from 1 through 500.
            example: 50
            maximum: 500
            minimum: 1
            type: integer
        - description: Comma-separated lifecycle statuses to include.
          explode: false
          in: query
          name: status
          required: false
          schema:
            description: Comma-separated lifecycle statuses to include.
            example:
              - queued
              - running
            items:
              enum:
                - awaiting_slack_install
                - queued
                - provisioning
                - running
                - failed
                - stopped
                - destroying
                - destroy_failed
              type: string
            type: array
          style: form
        - description: >-
            Only return interns in this workspace. It must match the API key
            workspace.
          in: query
          name: workspace_id
          required: false
          schema:
            description: >-
              Only return interns in this workspace. It must match the API key
              workspace.
            example: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
            format: uuid
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - attached_vault_id: null
                    created_at: '2026-09-16T08:30:00.000Z'
                    description: Researches customer questions
                    hostname: research-assistant.openrouter.ai
                    id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
                    instructions: null
                    last_failure_message: null
                    model: openai/gpt-5.4
                    name: research-assistant
                    progress: null
                    status: running
                    updated_at: '2026-09-16T08:45:00.000Z'
                    vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
                    workspace_id: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
                has_more: false
              schema:
                $ref: '#/components/schemas/InternListResponse'
          description: Interns matching the filters.
        '400':
          content:
            application/json:
              example:
                error:
                  code: invalid_body
                  message: Invalid list query
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The list filters are invalid.
        '401':
          content:
            application/json:
              example:
                error:
                  code: 401
                  message: Invalid or missing API key
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: Missing, unknown or provisioning API key.
        '403':
          content:
            application/json:
              example:
                error:
                  code: 403
                  message: Forbidden
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The key owner no longer has access, or the request used a regional
            hostname.
        '404':
          content:
            application/json:
              example:
                error:
                  code: not_found
                  message: Intern not found
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The caller is outside the Intern API programme, the intern is
            hidden, or lifecycle writes are disabled.
        '408':
          content:
            application/json:
              example:
                error:
                  code: 408
                  message: Request timed out
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The request exceeded its route deadline.
        '500':
          content:
            application/json:
              example:
                error:
                  code: internal_error
                  message: The request could not be completed
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The request could not be completed.
      security:
        - apiKey: []
components:
  schemas:
    InternListResponse:
      additionalProperties: false
      description: Interns visible to the authenticated API key.
      example:
        data:
          - attached_vault_id: null
            created_at: '2026-09-16T08:30:00.000Z'
            description: Researches customer questions
            hostname: research-assistant.openrouter.ai
            id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
            instructions: null
            last_failure_message: null
            model: openai/gpt-5.4
            name: research-assistant
            progress: null
            status: running
            updated_at: '2026-09-16T08:45:00.000Z'
            vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
            workspace_id: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
        has_more: false
      properties:
        data:
          items:
            $ref: '#/components/schemas/Intern'
          type: array
        has_more:
          description: True when more interns match the current filters.
          type: boolean
      required:
        - data
        - has_more
      type: object
    InternLifecycleError:
      additionalProperties: false
      description: Intern lifecycle request failure.
      example:
        error:
          code: not_found
          message: Intern not found
      properties:
        error:
          additionalProperties: false
          properties:
            code:
              anyOf:
                - type: string
                - type: integer
            message:
              type: string
          required:
            - code
            - message
          type: object
      required:
        - error
      type: object
    Intern:
      description: Public lifecycle state and settings for one intern.
      example:
        attached_vault_id: null
        created_at: '2026-09-16T08:30:00.000Z'
        description: Researches customer questions
        hostname: research-assistant.openrouter.ai
        id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
        instructions: null
        last_failure_message: null
        model: openai/gpt-5.4
        name: research-assistant
        progress: null
        status: running
        updated_at: '2026-09-16T08:45:00.000Z'
        vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
        workspace_id: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
      properties:
        attached_vault_id:
          description: >-
            Vault the intern borrows from another intern, or null when it
            borrows none.
          type:
            - string
            - 'null'
        created_at:
          description: ISO 8601 creation time.
          type: string
        description:
          description: Free-form description.
          type:
            - string
            - 'null'
        hostname:
          description: >-
            Public hostname the intern is reachable at, or null until
            provisioning has assigned one.
          type:
            - string
            - 'null'
        id:
          description: Intern id.
          type: string
        instructions:
          description: Standing instructions the intern boots with.
          type:
            - string
            - 'null'
        last_failure_message:
          description: Why the last provisioning attempt failed, when status is failed.
          type:
            - string
            - 'null'
        model:
          description: >-
            OpenRouter model slug the intern runs, or null for the workspace
            default.
          type:
            - string
            - 'null'
        name:
          description: Intern name, unique per creator within a workspace.
          type: string
        progress:
          description: Active provisioning step, or null once provisioning has settled.
          properties:
            step_label:
              description: Human-readable label of the active provisioning step.
              type: string
            step_number:
              description: One-based index of the active step.
              type: integer
            total_steps:
              description: Number of provisioning steps.
              type: integer
          required:
            - step_label
            - step_number
            - total_steps
          type:
            - object
            - 'null'
        status:
          description: Lifecycle status.
          enum:
            - awaiting_slack_install
            - queued
            - provisioning
            - running
            - failed
            - stopped
            - destroying
            - destroy_failed
          type: string
        updated_at:
          description: ISO 8601 last update time.
          type: string
        vault_id:
          description: Vault the intern owns, or null before it has been created.
          type:
            - string
            - 'null'
        workspace_id:
          description: Workspace that owns the intern and scopes its secrets.
          type: string
      required:
        - id
        - name
        - description
        - instructions
        - model
        - status
        - last_failure_message
        - progress
        - hostname
        - workspace_id
        - vault_id
        - attached_vault_id
        - created_at
        - updated_at
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````