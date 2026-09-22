> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Store an intern secret

> Creates or replaces a secret stored for one intern. The value is encrypted at rest and released only to the exact hostnames in `hosts`. The response carries metadata only. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/api-reference/authentication) required.



## OpenAPI

````yaml /openapi/openapi.yaml put /vault/interns/{internId}/secrets/{name}
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
  /vault/interns/{internId}/secrets/{name}:
    put:
      tags:
        - Vault
      summary: Store an intern secret
      description: >-
        Creates or replaces a secret stored for one intern. The value is
        encrypted at rest and released only to the exact hostnames in `hosts`.
        The response carries metadata only. Writes return 503 while vault writes
        are disabled for the caller. The scope is selected by the API key:
        workspace routes act on the key's active workspace and intern routes act
        on one intern inside that workspace. There is no default workspace and
        no fallback to another scope. Every vault route, including reads,
        requires access to the Intern API programme and returns 404 outside it.
        Requests on regional hostnames such as `eu.openrouter.ai` are refused.
        [API key](/docs/api-reference/authentication) required.
      operationId: storeInternVaultSecret
      parameters:
        - description: UUID of an intern in the workspace selected by the API key.
          in: path
          name: internId
          required: true
          schema:
            description: UUID of an intern in the workspace selected by the API key.
            example: 7c9e6679-7425-40de-944b-e07fc1f90ae7
            format: uuid
            type: string
        - description: >-
            Secret name. Lowercase letters, digits and single underscores,
            starting with a letter and not ending with an underscore, 1 to 255
            characters.
          in: path
          name: name
          required: true
          schema:
            description: >-
              Secret name. Lowercase letters, digits and single underscores,
              starting with a letter and not ending with an underscore, 1 to 255
              characters.
            example: github_token
            maxLength: 255
            minLength: 1
            pattern: ^(?!.*__)[a-z]([a-z0-9_]*[a-z0-9])?$
            type: string
      requestBody:
        content:
          application/json:
            example:
              hosts:
                - api.github.com
              value: ghp_exampleTokenValue
            schema:
              $ref: '#/components/schemas/VaultSecretWriteRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  created_at: '2026-09-15T17:44:00.000Z'
                  fingerprint: >-
                    sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                  hosts:
                    - api.github.com
                  name: github_token
              schema:
                $ref: '#/components/schemas/VaultSecretResponse'
          description: Metadata for the stored secret.
        '400':
          content:
            application/json:
              examples:
                invalid-vault-request:
                  summary: Invalid vault request
                  value:
                    error:
                      code: 400
                      message: Invalid vault request
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
          description: >-
            Bad Request - The secret name, path, query or JSON body failed
            validation. The vault returns 400 for a malformed request as well.
        '401':
          content:
            application/json:
              examples:
                invalid-or-missing-api-key:
                  summary: Invalid or missing API key
                  value:
                    error:
                      code: 401
                      message: Invalid or missing API key
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
          description: >-
            Unauthorized - Missing or unknown API key. Provisioning keys cannot
            call vault routes.
        '403':
          content:
            application/json:
              examples:
                regional-hostname:
                  summary: Regional hostname
                  value:
                    error:
                      code: 403
                      message: >-
                        The Intern API does not support regional data residency
                        yet. Please use the global endpoint at openrouter.ai.
                workspace-scope-unavailable:
                  summary: Workspace scope unavailable
                  value:
                    error:
                      code: 403
                      message: Vault scope is unavailable
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
          description: >-
            Forbidden - The key has no usable workspace scope, or the request
            arrived on a regional hostname.
        '404':
          content:
            application/json:
              examples:
                not-found:
                  summary: Not found
                  value:
                    error:
                      code: 404
                      message: Not found
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
          description: >-
            Not Found - The intern is not in the selected workspace, the secret
            does not exist in the selected scope, or the caller is outside the
            intern programme.
        '408':
          content:
            application/json:
              examples:
                body-timed-out:
                  summary: Body timed out
                  value:
                    error:
                      code: 408
                      message: Request body timed out
                route-deadline:
                  summary: Route deadline
                  value:
                    error:
                      code: 408
                      message: Vault request timed out
              schema:
                $ref: '#/components/schemas/RequestTimeoutResponse'
          description: >-
            Request Timeout - The route deadline passed before the request
            completed, or the request body stopped arriving.
        '409':
          content:
            application/json:
              examples:
                transfer-in-progress:
                  summary: Transfer in progress
                  value:
                    error:
                      code: 409
                      message: Vault request conflicts with existing secrets
              schema:
                $ref: '#/components/schemas/ConflictResponse'
          description: >-
            Conflict - The intern is being transferred to another workspace and
            its vault has not moved yet. Retry once the transfer finishes.
        '413':
          content:
            application/json:
              examples:
                body-too-large:
                  summary: Body too large
                  value:
                    error:
                      code: 413
                      message: Request body too large
              schema:
                $ref: '#/components/schemas/PayloadTooLargeResponse'
          description: Payload Too Large - The JSON body exceeds 425000 bytes.
        '429':
          content:
            application/json:
              examples:
                rate-limited:
                  summary: Rate limited
                  value:
                    error:
                      code: 429
                      message: Too many vault requests
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
          description: Too Many Requests - The vault rate limit was reached.
        '500':
          content:
            application/json:
              examples:
                internal-error:
                  summary: Internal error
                  value:
                    error:
                      code: 500
                      message: Internal Server Error
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
          description: Internal Server Error - Scope lookup failed.
        '502':
          content:
            application/json:
              examples:
                invalid-vault-response:
                  summary: Invalid vault response
                  value:
                    error:
                      code: 502
                      message: Invalid vault response
                vault-request-failed:
                  summary: Vault request failed
                  value:
                    error:
                      code: 502
                      message: Vault request failed
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
          description: >-
            Bad Gateway - The vault could not be reached or returned an
            unexpected response.
        '503':
          content:
            application/json:
              examples:
                vault-unavailable:
                  summary: Vault unavailable
                  value:
                    error:
                      code: 503
                      message: Vault service is unavailable
                writes-disabled:
                  summary: Writes disabled
                  value:
                    error:
                      code: 503
                      message: Vault writes are not enabled
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
          description: >-
            Service Unavailable - Vault writes are disabled for the caller, or
            the vault is not configured.
        '504':
          content:
            application/json:
              examples:
                vault-timed-out:
                  summary: Vault timed out
                  value:
                    error:
                      code: 504
                      message: Vault request timed out
              schema:
                $ref: '#/components/schemas/GatewayTimeoutResponse'
          description: Gateway Timeout - The vault did not answer in time.
      security:
        - apiKey: []
components:
  schemas:
    VaultSecretWriteRequest:
      additionalProperties: false
      description: Secret value and the exact hostnames it may be released to.
      example:
        hosts:
          - api.github.com
        value: ghp_exampleTokenValue
      properties:
        hosts:
          description: >-
            Exact DNS hostnames the secret may be sent to, 1 to 100 entries.
            Each entry is lowercased and a trailing dot is removed, so
            `API.Example.com.` is stored as `api.example.com`. Schemes, ports,
            paths, wildcards and empty values are rejected. Duplicates after
            normalization are collapsed. Matching is exact: a secret bound to
            `api.example.com` is never released to `example.com` or any other
            hostname.
          items:
            maxLength: 254
            type: string
          maxItems: 100
          minItems: 1
          type: array
        value:
          description: >-
            Secret value, 1 to 65536 characters. It is encrypted at rest and
            never returned.
          maxLength: 65536
          minLength: 1
          type: string
      required:
        - value
        - hosts
      type: object
    VaultSecretResponse:
      additionalProperties: false
      description: Metadata for the stored secret.
      example:
        data:
          created_at: '2026-09-15T17:44:00.000Z'
          fingerprint: >-
            sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
          hosts:
            - api.github.com
          name: github_token
      properties:
        data:
          $ref: '#/components/schemas/VaultSecret'
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
    ForbiddenResponse:
      description: Forbidden - Authentication successful but insufficient permissions
      example:
        error:
          code: 403
          message: Only management keys can perform this operation
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
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
    RequestTimeoutResponse:
      description: Request Timeout - Operation exceeded time limit
      example:
        error:
          code: 408
          message: Operation timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/RequestTimeoutResponseErrorData'
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
    PayloadTooLargeResponse:
      description: Payload Too Large - Request payload exceeds size limits
      example:
        error:
          code: 413
          message: Request payload too large
      properties:
        error:
          $ref: '#/components/schemas/PayloadTooLargeResponseErrorData'
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
    BadGatewayResponse:
      description: Bad Gateway - Provider/upstream API failure
      example:
        error:
          code: 502
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
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
    ServiceUnavailableResponse:
      description: Service Unavailable - Service temporarily unavailable
      example:
        error:
          code: 503
          message: Service temporarily unavailable
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
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
    GatewayTimeoutResponse:
      description: Gateway Timeout - Provider did not respond before the upstream deadline
      example:
        error:
          code: 504
          message: The operation was aborted due to timeout
      properties:
        error:
          $ref: '#/components/schemas/GatewayTimeoutResponseErrorData'
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
    VaultSecret:
      additionalProperties: false
      description: >-
        Metadata for one stored secret. The secret value is never returned.
        `fingerprint` is an HMAC-SHA-256 of the value keyed with that vault's
        own data key, so it is comparable only within one vault: equal
        fingerprints in one vault mean equal values, and rewriting the same
        value keeps its fingerprint. The same value stored in two vaults (for
        example a workspace secret and its intern copy) carries different
        fingerprints, so comparing fingerprints across vaults cannot show that a
        copy matches or that a rotation propagated. `hosts` and `fingerprint`
        are `null` only for legacy rows written before host binding was
        required; storing the secret again assigns hosts.
      example:
        created_at: '2026-09-15T17:44:00.000Z'
        fingerprint: >-
          sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
        hosts:
          - api.github.com
        name: github_token
      properties:
        created_at:
          format: date-time
          type: string
        fingerprint:
          pattern: ^sha256:[a-f0-9]{64}$
          type:
            - string
            - 'null'
        hosts:
          items:
            maxLength: 254
            type: string
          maxItems: 100
          minItems: 1
          type:
            - array
            - 'null'
        name:
          maxLength: 255
          minLength: 1
          pattern: ^(?!.*__)[a-z]([a-z0-9_]*[a-z0-9])?$
          type: string
      required:
        - name
        - hosts
        - fingerprint
        - created_at
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
    ForbiddenResponseErrorData:
      description: Error data for ForbiddenResponse
      example:
        code: 403
        message: Only management keys can perform this operation
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
    RequestTimeoutResponseErrorData:
      description: Error data for RequestTimeoutResponse
      example:
        code: 408
        message: Operation timed out. Please try again later.
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
    PayloadTooLargeResponseErrorData:
      description: Error data for PayloadTooLargeResponse
      example:
        code: 413
        message: Request payload too large
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
    BadGatewayResponseErrorData:
      description: Error data for BadGatewayResponse
      example:
        code: 502
        message: Provider returned error
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
    ServiceUnavailableResponseErrorData:
      description: Error data for ServiceUnavailableResponse
      example:
        code: 503
        message: Service temporarily unavailable
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
    GatewayTimeoutResponseErrorData:
      description: Error data for GatewayTimeoutResponse
      example:
        code: 504
        message: The operation was aborted due to timeout
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