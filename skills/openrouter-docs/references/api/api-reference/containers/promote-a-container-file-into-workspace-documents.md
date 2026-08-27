> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Promote a container file into workspace documents

> Copies a file from the container's sandbox prefix into the workspace's durable document storage, so it outlives the container. Returns the new document in the Files API shape, with a durable file id in the documents namespace. The copy counts against the workspace's storage quota exactly like an upload.



## OpenAPI

````yaml /openapi/openapi.yaml post /containers/{container_id}/files/{file_id}/promote
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
  /containers/{container_id}/files/{file_id}/promote:
    post:
      tags:
        - Containers
      summary: Promote a container file into workspace documents
      description: >-
        Copies a file from the container's sandbox prefix into the workspace's
        durable document storage, so it outlives the container. Returns the new
        document in the Files API shape, with a durable file id in the documents
        namespace. The copy counts against the workspace's storage quota exactly
        like an upload.
      operationId: promoteContainerFile
      parameters:
        - description: >-
            The canonical container id, exactly as returned in a bash/shell tool
            result — a restarted session has its own `-r<nonce>`-suffixed id. A
            session-derived id is always `sess_` + the sanitized session key,
            which is not necessarily the raw session id that was sent.
          in: path
          name: container_id
          required: true
          schema:
            description: >-
              The canonical container id, exactly as returned in a bash/shell
              tool result — a restarted session has its own `-r<nonce>`-suffixed
              id. A session-derived id is always `sess_` + the sanitized session
              key, which is not necessarily the raw session id that was sent.
            example: sess_abc123
            type: string
        - description: Container file id (`cfile_` + base64url of the file path).
          in: path
          name: file_id
          required: true
          schema:
            description: Container file id (`cfile_` + base64url of the file path).
            example: cfile_b3V0L3JlcG9ydC5jc3Y
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                _shape: openrouter
                created_at: '2026-08-23T00:00:00Z'
                downloadable: false
                filename: out/report.csv
                id: or_file_011CNha8iCJcU1wXNR6q4V8w
                mime_type: text/csv
                size_bytes: 123
                type: file
              schema:
                $ref: '#/components/schemas/FileResponse'
          description: The promoted file, as a workspace document.
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
        '413':
          content:
            application/json:
              example:
                error:
                  code: 413
                  message: Request payload too large
              schema:
                $ref: '#/components/schemas/PayloadTooLargeResponse'
          description: Payload Too Large - Request payload exceeds size limits
        '429':
          content:
            application/json:
              example:
                error:
                  code: 429
                  message: Rate limit exceeded
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
          description: Too Many Requests - Rate limit exceeded
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
        '503':
          content:
            application/json:
              example:
                error:
                  code: 503
                  message: Service temporarily unavailable
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
          description: Service Unavailable - Service temporarily unavailable
components:
  schemas:
    FileResponse:
      description: >-
        A stored file. The shape is negotiated per request — see the endpoint
        description.
      discriminator:
        mapping:
          anthropic:
            $ref: '#/components/schemas/AnthropicFile'
          openai:
            $ref: '#/components/schemas/OpenAIFile'
          openrouter:
            $ref: '#/components/schemas/OpenRouterFile'
        propertyName: _shape
      example:
        _shape: openrouter
        created_at: '2025-01-01T00:00:00Z'
        downloadable: false
        filename: document.pdf
        id: or_file_011CNha8iCJcU1wXNR6q4V8w
        mime_type: application/pdf
        size_bytes: 1024000
        type: file
      oneOf:
        - $ref: '#/components/schemas/OpenRouterFile'
        - $ref: '#/components/schemas/OpenAIFile'
        - $ref: '#/components/schemas/AnthropicFile'
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
    AnthropicFile:
      description: A stored file in Anthropic's Files API shape.
      example:
        _shape: anthropic
        created_at: '2025-01-01T00:00:00Z'
        downloadable: false
        filename: document.pdf
        id: or_file_011CNha8iCJcU1wXNR6q4V8w
        mime_type: application/pdf
        size_bytes: 1024000
        type: file
      properties:
        _shape:
          enum:
            - anthropic
          type: string
        created_at:
          type: string
        downloadable:
          type: boolean
        filename:
          type: string
        id:
          type: string
        mime_type:
          type: string
        size_bytes:
          type: integer
        type:
          enum:
            - file
          type: string
      required:
        - _shape
        - id
        - type
        - filename
        - mime_type
        - size_bytes
        - created_at
        - downloadable
      type: object
    OpenAIFile:
      description: A stored file in OpenAI's Files API shape.
      example:
        _shape: openai
        bytes: 1024000
        created_at: 1735689600
        filename: document.pdf
        id: or_file_011CNha8iCJcU1wXNR6q4V8w
        object: file
        purpose: user_data
        status: processed
      properties:
        _shape:
          enum:
            - openai
          type: string
        bytes:
          type: integer
        created_at:
          type: integer
        filename:
          type: string
        id:
          type: string
        object:
          enum:
            - file
          type: string
        purpose:
          enum:
            - assistants
            - batch
            - fine-tune
            - vision
            - user_data
            - evals
            - assistants_output
            - batch_output
            - fine-tune-results
          type: string
        status:
          enum:
            - processed
          type: string
      required:
        - _shape
        - id
        - object
        - bytes
        - created_at
        - filename
        - purpose
        - status
      type: object
    OpenRouterFile:
      description: >-
        A stored file in the OpenRouter superset shape: Anthropic-shaped, plus
        OpenRouter-only fields.
      example:
        _shape: openrouter
        created_at: '2025-01-01T00:00:00Z'
        downloadable: false
        filename: document.pdf
        id: or_file_011CNha8iCJcU1wXNR6q4V8w
        mime_type: application/pdf
        size_bytes: 1024000
        type: file
      properties:
        _shape:
          enum:
            - openrouter
          type: string
        created_at:
          type: string
        downloadable:
          type: boolean
        filename:
          type: string
        id:
          type: string
        mime_type:
          type: string
        size_bytes:
          type: integer
        type:
          enum:
            - file
          type: string
      required:
        - _shape
        - id
        - type
        - filename
        - mime_type
        - size_bytes
        - created_at
        - downloadable
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````