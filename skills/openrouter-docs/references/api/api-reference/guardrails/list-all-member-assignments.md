> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List all member assignments

> List all organization member guardrail assignments for the authenticated user. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /guardrails/assignments/members
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
  /guardrails/assignments/members:
    get:
      tags:
        - Guardrails
      summary: List all member assignments
      description: >-
        List all organization member guardrail assignments for the authenticated
        user. [Management key](/docs/guides/overview/auth/management-api-keys)
        required.
      operationId: listMemberAssignments
      parameters:
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
                    organization_id: org_xyz789
                    user_id: user_abc123
                total_count: 1
              schema:
                $ref: '#/components/schemas/ListMemberAssignmentsResponse'
          description: List of member assignments
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
    ListMemberAssignmentsResponse:
      example:
        data:
          - assigned_by: user_abc123
            created_at: '2025-08-24T10:30:00Z'
            guardrail_id: 550e8400-e29b-41d4-a716-446655440001
            id: 550e8400-e29b-41d4-a716-446655440000
            organization_id: org_xyz789
            user_id: user_abc123
        total_count: 1
      properties:
        data:
          description: List of member assignments
          items:
            $ref: '#/components/schemas/MemberAssignment'
          type: array
        total_count:
          description: Total number of member assignments
          example: 10
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
    MemberAssignment:
      example:
        assigned_by: user_abc123
        created_at: '2025-08-24T10:30:00Z'
        guardrail_id: 550e8400-e29b-41d4-a716-446655440001
        id: 550e8400-e29b-41d4-a716-446655440000
        organization_id: org_xyz789
        user_id: user_abc123
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
        organization_id:
          description: Organization ID
          example: org_xyz789
          type: string
        user_id:
          description: Clerk user ID of the assigned member
          example: user_abc123
          type: string
      required:
        - id
        - user_id
        - organization_id
        - guardrail_id
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