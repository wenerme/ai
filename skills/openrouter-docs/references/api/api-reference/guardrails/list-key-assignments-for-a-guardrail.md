> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List key assignments for a guardrail

> List all API key assignments for a specific guardrail. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /guardrails/{id}/assignments/keys
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
  /guardrails/{id}/assignments/keys:
    get:
      tags:
        - Guardrails
      summary: List key assignments for a guardrail
      description: >-
        List all API key assignments for a specific guardrail. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: listGuardrailKeyAssignments
      parameters:
        - description: The unique identifier of the guardrail
          in: path
          name: id
          required: true
          schema:
            description: The unique identifier of the guardrail
            example: 550e8400-e29b-41d4-a716-446655440000
            format: uuid
            type: string
        - description: Number of records to skip for pagination
          in: query
          name: offset
          required: false
          schema:
            default: 0
            description: Number of records to skip for pagination
            example: 0
            minimum: 0
            type:
              - integer
              - 'null'
        - description: Maximum number of records to return (max 100)
          in: query
          name: limit
          required: false
          schema:
            default: 50
            description: Maximum number of records to return (max 100)
            example: 50
            maximum: 100
            minimum: 1
            type: integer
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - assigned_by: user_abc123
                    created_at: '2025-08-24T10:30:00Z'
                    guardrail_id: 550e8400-e29b-41d4-a716-446655440001
                    id: 550e8400-e29b-41d4-a716-446655440000
                    key_hash: >-
                      c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93
                    key_label: prod-key
                    key_name: Production Key
                total_count: 1
              schema:
                $ref: '#/components/schemas/ListKeyAssignmentsResponse'
          description: List of key assignments
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
    ListKeyAssignmentsResponse:
      example:
        data:
          - assigned_by: user_abc123
            created_at: '2025-08-24T10:30:00Z'
            guardrail_id: 550e8400-e29b-41d4-a716-446655440001
            id: 550e8400-e29b-41d4-a716-446655440000
            key_hash: c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93
            key_label: prod-key
            key_name: Production Key
        total_count: 1
      properties:
        data:
          description: List of key assignments
          items:
            $ref: '#/components/schemas/KeyAssignment'
          type: array
        total_count:
          description: Total number of key assignments for this guardrail
          example: 25
          type: integer
      required:
        - data
        - total_count
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
    KeyAssignment:
      example:
        assigned_by: user_abc123
        created_at: '2025-08-24T10:30:00Z'
        guardrail_id: 550e8400-e29b-41d4-a716-446655440001
        id: 550e8400-e29b-41d4-a716-446655440000
        key_hash: c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93
        key_label: prod-key
        key_name: Production Key
      properties:
        assigned_by:
          description: User ID of who made the assignment
          example: user_abc123
          type:
            - string
            - 'null'
        created_at:
          description: ISO 8601 timestamp of when the assignment was created
          example: '2025-08-24T10:30:00Z'
          type: string
        guardrail_id:
          description: ID of the guardrail
          example: 550e8400-e29b-41d4-a716-446655440001
          format: uuid
          type: string
        id:
          description: Unique identifier for the assignment
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
        key_hash:
          description: Hash of the assigned API key
          example: c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93
          type: string
        key_label:
          description: Label of the API key
          example: prod-key
          type: string
        key_name:
          description: Name of the API key
          example: Production Key
          type: string
      required:
        - id
        - key_hash
        - guardrail_id
        - key_name
        - key_label
        - assigned_by
        - created_at
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````