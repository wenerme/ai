> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete an intern secret

> Deletes a secret stored for one intern. Returns 204 with no body on success and 404 when the secret does not exist in the selected scope. Writes return 503 while vault writes are disabled for the caller. The scope is selected by the API key: workspace routes act on the key's active workspace and intern routes act on one intern inside that workspace. There is no default workspace and no fallback to another scope. Every vault route, including reads, requires access to the Intern API programme and returns 404 outside it. Requests on regional hostnames such as `eu.openrouter.ai` are refused. [API key](/docs/api-reference/authentication) required.



## OpenAPI

````yaml /openapi/openapi.yaml delete /vault/interns/{internId}/secrets/{name}
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
  - description: Alpha feature endpoints for Decisions (questions and answers) requests
    name: alpha.decisions
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /vault/interns/{internId}/secrets/{name}:
    delete:
      tags:
        - Vault
      summary: Delete an intern secret
      description: >-
        Deletes a secret stored for one intern. Returns 204 with no body on
        success and 404 when the secret does not exist in the selected scope.
        Writes return 503 while vault writes are disabled for the caller. The
        scope is selected by the API key: workspace routes act on the key's
        active workspace and intern routes act on one intern inside that
        workspace. There is no default workspace and no fallback to another
        scope. Every vault route, including reads, requires access to the Intern
        API programme and returns 404 outside it. Requests on regional hostnames
        such as `eu.openrouter.ai` are refused. [API
        key](/docs/api-reference/authentication) required.
      operationId: deleteInternVaultSecret
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
      responses:
        '204':
          description: Secret deleted. The response has no body.
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