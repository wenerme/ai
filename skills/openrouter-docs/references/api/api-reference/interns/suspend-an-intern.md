> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Suspend an intern

> Stops the intern runtime while keeping its disk and configuration for a later provision call. This operation takes no request body. A body carrying any field is refused with 400 rather than ignored. The API key selects the caller, workspace and visible interns. There is no default workspace fallback. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/api-reference/authentication) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /interns/{internId}/suspend
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
  - description: >-
      System One endpoints for models such as Jev, compatible with the TypeSafe
      SDKs. See https://openrouter.ai/docs/guides/community/typesafe-sdk.
    name: SystemOne
    x-displayName: System One
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
  - description: Alpha feature endpoints for Decisions requests
    name: alpha.decisions
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /interns/{internId}/suspend:
    post:
      tags:
        - Interns
      summary: Suspend an intern
      description: >-
        Stops the intern runtime while keeping its disk and configuration for a
        later provision call. This operation takes no request body. A body
        carrying any field is refused with 400 rather than ignored. The API key
        selects the caller, workspace and visible interns. There is no default
        workspace fallback. Requests on regional hostnames such as
        `eu.openrouter.ai` are refused. [API
        key](/docs/api-reference/authentication) required.
      operationId: suspendIntern
      parameters:
        - description: ID of an intern visible to the authenticated API key.
          in: path
          name: internId
          required: true
          schema:
            description: ID of an intern visible to the authenticated API key.
            example: 7c9e6679-7425-40de-944b-e07fc1f90ae7
            minLength: 1
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                suspended: true
              schema:
                $ref: '#/components/schemas/SuspendInternResponse'
          description: Intern suspended.
        '400':
          content:
            application/json:
              example:
                error:
                  code: 400
                  message: Invalid request body
                  metadata:
                    reason: invalid_body
                    retryable: false
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
                  code: 404
                  message: Intern not found
                  metadata:
                    reason: not_found
                    retryable: false
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
                  message: Operation timed out after 10s. Please try again later.
                  metadata:
                    reason: timeout
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The request exceeded its route deadline. The deadline quoted in the
            message is the route's own, so it differs between operations.
        '409':
          content:
            application/json:
              example:
                error:
                  code: 409
                  message: The intern is not in a state that allows this operation
                  metadata:
                    reason: intern_busy
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The intern is not in a state that allows this operation.
        '413':
          content:
            application/json:
              example:
                error:
                  code: 413
                  message: Request body exceeds 1048576 bytes
                  metadata:
                    reason: payload_too_large
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The request body is larger than 1048576 bytes.
        '415':
          content:
            application/json:
              example:
                error:
                  code: 415
                  message: Request body must be sent as application/json
                  metadata:
                    reason: unsupported_media_type
                    retryable: false
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The request body is non-empty and its Content-Type is not
            application/json.
        '500':
          content:
            application/json:
              example:
                error:
                  code: 500
                  message: The request could not be completed
                  metadata:
                    reason: internal_error
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: >-
            The request could not be completed. `metadata.reason` says whether
            to try again: `internal_error` is a transient failure and carries
            `metadata.retryable: true`, so the same request may be sent again,
            while `configuration_error` carries `retryable: false` because the
            next attempt reads the same missing binding or unusable stored
            credential.
        '502':
          content:
            application/json:
              example:
                error:
                  code: 502
                  message: The intern service could not be reached, retry the request
                  metadata:
                    reason: upstream_unavailable
                    retryable: true
              schema:
                $ref: '#/components/schemas/InternLifecycleError'
          description: The intern service could not accept the operation.
      security:
        - apiKey: []
components:
  schemas:
    SuspendInternResponse:
      additionalProperties: false
      properties:
        suspended:
          const: true
          type: boolean
      required:
        - suspended
      type: object
    InternLifecycleError:
      additionalProperties: false
      description: Intern lifecycle request failure.
      example:
        error:
          code: 404
          message: Intern not found
          metadata:
            reason: not_found
            retryable: false
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
            metadata:
              additionalProperties: false
              properties:
                reason:
                  type: string
                retryable:
                  type: boolean
              required:
                - reason
                - retryable
              type: object
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