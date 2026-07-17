> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk add members to a workspace

> Add multiple organization members to a workspace. Members are assigned the same role they hold in the organization. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /workspaces/{id}/members/add
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
  - description: beta.responses endpoints
    name: beta.responses
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /workspaces/{id}/members/add:
    post:
      tags:
        - Workspaces
      summary: Bulk add members to a workspace
      description: >-
        Add multiple organization members to a workspace. Members are assigned
        the same role they hold in the organization. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: bulkAddWorkspaceMembers
      parameters:
        - description: The workspace ID (UUID) or slug
          in: path
          name: id
          required: true
          schema:
            description: The workspace ID (UUID) or slug
            example: production
            minLength: 1
            type: string
      requestBody:
        content:
          application/json:
            example:
              user_ids:
                - user_abc123
                - user_def456
            schema:
              $ref: '#/components/schemas/BulkAddWorkspaceMembersRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                added_count: 1
                data:
                  - created_at: '2025-08-24T10:30:00Z'
                    id: 660e8400-e29b-41d4-a716-446655440000
                    role: member
                    user_id: user_abc123
                    workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/BulkAddWorkspaceMembersResponse'
          description: Members added successfully
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
        '403':
          content:
            application/json:
              example:
                error:
                  code: 403
                  message: Only management keys can perform this operation
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
          description: Forbidden - Authentication successful but insufficient permissions
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
    BulkAddWorkspaceMembersRequest:
      example:
        user_ids:
          - user_abc123
          - user_def456
      properties:
        user_ids:
          description: >-
            List of user IDs to add to the workspace. Members are assigned the
            same role they hold in the organization.
          example:
            - user_abc123
            - user_def456
          items:
            type: string
          maxItems: 100
          minItems: 1
          type: array
      required:
        - user_ids
      type: object
    BulkAddWorkspaceMembersResponse:
      example:
        added_count: 1
        data:
          - created_at: '2025-08-24T10:30:00Z'
            id: 660e8400-e29b-41d4-a716-446655440000
            role: member
            user_id: user_abc123
            workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        added_count:
          description: Number of workspace memberships created or updated
          example: 2
          type: integer
        data:
          description: List of added workspace memberships
          items:
            $ref: '#/components/schemas/WorkspaceMember'
          type: array
      required:
        - data
        - added_count
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
    WorkspaceMember:
      example:
        created_at: '2025-08-24T10:30:00Z'
        id: 660e8400-e29b-41d4-a716-446655440000
        role: member
        user_id: user_abc123
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        created_at:
          description: ISO 8601 timestamp of when the membership was created
          example: '2025-08-24T10:30:00Z'
          type: string
        id:
          description: Unique identifier for the workspace membership
          example: 660e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
        role:
          description: Role of the member in the workspace
          enum:
            - admin
            - member
          example: member
          type: string
        user_id:
          description: Clerk user ID of the member
          example: user_abc123
          type: string
        workspace_id:
          description: ID of the workspace
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - workspace_id
        - user_id
        - role
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