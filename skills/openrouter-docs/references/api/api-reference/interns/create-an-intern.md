> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create an intern

> Creates an intern in an explicit workspace. The operation also creates its private vault. It can start provisioning immediately or wait for a later provision call. A retry with the same idempotency key and body resumes unfinished work. The request body is capped at 1048576 bytes and a larger body is refused with 413. The API key selects the caller, workspace and visible interns. There is no default workspace fallback. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/api-reference/authentication) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /interns
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
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /interns:
    post:
      tags:
        - Interns
      summary: Create an intern
      description: >-
        Creates an intern in an explicit workspace. The operation also creates
        its private vault. It can start provisioning immediately or wait for a
        later provision call. A retry with the same idempotency key and body
        resumes unfinished work. The request body is capped at 1048576 bytes and
        a larger body is refused with 413. The API key selects the caller,
        workspace and visible interns. There is no default workspace fallback.
        Requests on regional hostnames such as `eu.openrouter.ai` are refused.
        [API key](/docs/api-reference/authentication) required.
      operationId: createIntern
      parameters:
        - description: >-
            Key that makes retries resume the same create operation. Without
            one, the server derives a stable key from the request body.
          in: header
          name: Idempotency-Key
          required: false
          schema:
            description: >-
              Key that makes retries resume the same create operation. Without
              one, the server derives a stable key from the request body.
            example: create-research-assistant-2026-09-16
            minLength: 1
            type: string
      requestBody:
        content:
          application/json:
            example:
              name: research-assistant
              provision: true
              workspace_id: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
            schema:
              $ref: '#/components/schemas/CreateInternRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                attached_vault_id: null
                createdAt: '2026-09-16T08:30:00.000Z'
                description: Researches customer questions
                hostname: research-assistant.openrouter.ai
                id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
                instructions: null
                lastFailureMessage: null
                model: openai/gpt-5.4
                name: research-assistant
                progress: null
                status: running
                updatedAt: '2026-09-16T08:45:00.000Z'
                vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
                workspaceId: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
              schema:
                $ref: '#/components/schemas/Intern'
          description: A completed create operation was replayed.
        '201':
          content:
            application/json:
              example:
                attached_vault_id: null
                createdAt: '2026-09-16T08:30:00.000Z'
                description: Researches customer questions
                hostname: research-assistant.openrouter.ai
                id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
                instructions: null
                lastFailureMessage: null
                model: openai/gpt-5.4
                name: research-assistant
                progress: null
                status: running
                updatedAt: '2026-09-16T08:45:00.000Z'
                vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
                workspaceId: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
              schema:
                $ref: '#/components/schemas/Intern'
          description: Intern created.
        '400':
          content:
            application/json:
              example:
                error:
                  code: invalid_body
                  message: Invalid request body
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The request body is invalid.
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
                  code: no_acting_user
                  message: >-
                    This key acts as the organization and has no member to own a
                    new intern
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The key acts as an organization and has no member who can own the
            intern, or regional access is refused.
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
        '409':
          content:
            application/json:
              example:
                error:
                  code: idempotency_key_reused
                  message: >-
                    This Idempotency-Key was already used with a different
                    request
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The idempotency key was reused, the member reached the intern limit,
            or the requested vault cannot be attached.
        '413':
          content:
            application/json:
              example:
                error:
                  code: payload_too_large
                  message: Request body exceeds 1048576 bytes
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The request body is larger than 1048576 bytes.
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
        '502':
          content:
            application/json:
              example:
                error:
                  code: upstream_unavailable
                  message: >-
                    The intern was created but setup is not ready yet, retry the
                    request
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The vault or provisioner did not complete a recoverable create step.
            Retry the same request.
      security:
        - apiKey: []
components:
  schemas:
    CreateInternRequest:
      additionalProperties: false
      description: Settings for a new intern in an explicit workspace.
      example:
        name: research-assistant
        provision: true
        workspace_id: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
      properties:
        description:
          description: Free-form description, or null.
          maxLength: 2000
          type:
            - string
            - 'null'
        instructions:
          description: Standing instructions the intern boots with, or null.
          maxLength: 100000
          type:
            - string
            - 'null'
        name:
          description: Intern name, unique per creator within the workspace.
          maxLength: 17
          minLength: 2
          pattern: ^[a-z][a-z0-9]*(-[a-z0-9]+)*$
          type: string
        provision:
          default: false
          description: Start provisioning during this create operation. Defaults to false.
          type: boolean
        vault_id:
          description: >-
            Vault owned by another intern in this workspace to attach as a
            borrowed vault.
          format: uuid
          type: string
        workspace_id:
          description: >-
            Workspace that will own the intern. It must match the API key
            workspace.
          format: uuid
          type: string
      required:
        - name
        - workspace_id
      type: object
    Intern:
      description: Public lifecycle state and settings for one intern.
      example:
        attached_vault_id: null
        createdAt: '2026-09-16T08:30:00.000Z'
        description: Researches customer questions
        hostname: research-assistant.openrouter.ai
        id: 7c9e6679-7425-40de-944b-e07fc1f90ae7
        instructions: null
        lastFailureMessage: null
        model: openai/gpt-5.4
        name: research-assistant
        progress: null
        status: running
        updatedAt: '2026-09-16T08:45:00.000Z'
        vault_id: b431c59d-6eed-41ac-bc89-9a89be79a121
        workspaceId: 89f9f5b2-3f89-4eaf-83ca-5ceae149e8bb
      properties:
        attached_vault_id:
          description: >-
            Vault the intern borrows from another intern, or null when it
            borrows none.
          type:
            - string
            - 'null'
        createdAt:
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
        lastFailureMessage:
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
            stepLabel:
              description: Human-readable label of the active provisioning step.
              type: string
            stepNumber:
              description: One-based index of the active step.
              type: integer
            totalSteps:
              description: Number of provisioning steps.
              type: integer
          required:
            - stepLabel
            - stepNumber
            - totalSteps
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
        updatedAt:
          description: ISO 8601 last update time.
          type: string
        vault_id:
          description: Vault the intern owns, or null before it has been created.
          type:
            - string
            - 'null'
        workspaceId:
          description: Workspace that owns the intern and scopes its secrets.
          type: string
      required:
        - id
        - name
        - description
        - instructions
        - model
        - status
        - lastFailureMessage
        - progress
        - hostname
        - workspaceId
        - vault_id
        - attached_vault_id
        - createdAt
        - updatedAt
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````