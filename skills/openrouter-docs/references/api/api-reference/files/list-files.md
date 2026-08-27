> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List files

> Lists files belonging to the workspace of the authenticating API key.



## OpenAPI

````yaml /openapi/openapi.yaml get /files
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
  /files:
    get:
      tags:
        - Files
      summary: List files
      description: Lists files belonging to the workspace of the authenticating API key.
      operationId: listFiles
      parameters:
        - description: Maximum number of files to return (1–1000).
          in: query
          name: limit
          required: false
          schema:
            description: Maximum number of files to return (1–1000).
            example: 100
            maximum: 1000
            minimum: 1
            type: integer
        - description: Opaque pagination cursor from a previous response.
          in: query
          name: cursor
          required: false
          schema:
            description: Opaque pagination cursor from a previous response.
            example: eyJjdXJzb3IiOiJvcl9maWxlXzAxMUNOaGE4aUNKY1Uxd1hOUjZxNFY4dyJ9
            type: string
        - description: >-
            Workspace to scope the request to. Defaults to the caller’s default
            workspace.
          in: query
          name: workspace_id
          required: false
          schema:
            description: >-
              Workspace to scope the request to. Defaults to the caller’s
              default workspace.
            example: a103d8b6-42f0-4e50-9a3c-bf41e2c3c1a7
            format: uuid
            type: string
        - description: >-
            Store or read this file on the named provider using your own API key
            for it. Omit to use OpenRouter storage.
          example: openai
          in: query
          name: provider
          required: false
          schema:
            $ref: '#/components/schemas/FileProvider'
        - description: 'OpenAI-style forward cursor: the id to list after.'
          in: query
          name: after
          required: false
          schema:
            description: 'OpenAI-style forward cursor: the id to list after.'
            example: or_file_011CNha8iCJcU1wXNR6q4V8w
            type: string
        - description: 'Anthropic-style forward cursor: the id to list after.'
          in: query
          name: after_id
          required: false
          schema:
            description: 'Anthropic-style forward cursor: the id to list after.'
            example: or_file_011CNha8iCJcU1wXNR6q4V8w
            type: string
        - description: Anthropic-style reverse cursor. Not supported by OpenRouter storage.
          in: query
          name: before_id
          required: false
          schema:
            description: >-
              Anthropic-style reverse cursor. Not supported by OpenRouter
              storage.
            example: or_file_011CNha8iCJcU1wXNR6q4V8w
            type: string
        - description: Sort direction. Only `asc` is supported by OpenRouter storage.
          in: query
          name: order
          required: false
          schema:
            description: Sort direction. Only `asc` is supported by OpenRouter storage.
            enum:
              - asc
              - desc
            example: asc
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                cursor: null
                data:
                  - created_at: '2025-01-01T00:00:00Z'
                    downloadable: false
                    filename: document.pdf
                    id: or_file_011CNha8iCJcU1wXNR6q4V8w
                    mime_type: application/pdf
                    size_bytes: 1024000
                    type: file
                first_id: or_file_011CNha8iCJcU1wXNR6q4V8w
                has_more: false
                last_id: or_file_011CNha8iCJcU1wXNR6q4V8w
              schema:
                $ref: '#/components/schemas/FileListResponse'
          description: A page of files.
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
        '502':
          content:
            application/json:
              example:
                error:
                  code: 502
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
          description: Bad Gateway - Provider/upstream API failure
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
    FileProvider:
      description: >-
        Store or read this file on the named provider using your own API key for
        it. Omit to use OpenRouter storage.
      enum:
        - openai
        - anthropic
      example: openai
      type: string
    FileListResponse:
      description: A page of files, in the negotiated shape.
      discriminator:
        mapping:
          anthropic:
            $ref: '#/components/schemas/AnthropicFileList'
          openai:
            $ref: '#/components/schemas/OpenAIFileList'
          openrouter:
            $ref: '#/components/schemas/OpenRouterFileList'
        propertyName: _shape
      example:
        _shape: openrouter
        cursor: null
        data: []
        first_id: null
        has_more: false
        last_id: null
      oneOf:
        - $ref: '#/components/schemas/OpenRouterFileList'
        - $ref: '#/components/schemas/OpenAIFileList'
        - $ref: '#/components/schemas/AnthropicFileList'
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
    AnthropicFileList:
      description: A page of files in Anthropic's shape.
      example:
        _shape: anthropic
        data: []
        first_id: null
        has_more: false
        last_id: null
      properties:
        _shape:
          enum:
            - anthropic
          type: string
        data:
          items:
            $ref: '#/components/schemas/AnthropicFile'
          type: array
        first_id:
          type:
            - string
            - 'null'
        has_more:
          type: boolean
        last_id:
          type:
            - string
            - 'null'
      required:
        - _shape
        - data
        - has_more
        - first_id
        - last_id
      type: object
    OpenAIFileList:
      description: A page of files in OpenAI's shape.
      example:
        _shape: openai
        data: []
        first_id: null
        has_more: false
        last_id: null
        object: list
      properties:
        _shape:
          enum:
            - openai
          type: string
        data:
          items:
            $ref: '#/components/schemas/OpenAIFile'
          type: array
        first_id:
          type:
            - string
            - 'null'
        has_more:
          type: boolean
        last_id:
          type:
            - string
            - 'null'
        object:
          enum:
            - list
          type: string
      required:
        - _shape
        - object
        - data
        - has_more
        - first_id
        - last_id
      type: object
    OpenRouterFileList:
      description: A page of files in the OpenRouter shape.
      example:
        _shape: openrouter
        cursor: null
        data: []
        first_id: null
        has_more: false
        last_id: null
      properties:
        _shape:
          enum:
            - openrouter
          type: string
        cursor:
          description: >-
            Opaque cursor for the next page; null when there are no more
            results.
          type:
            - string
            - 'null'
        data:
          items:
            $ref: '#/components/schemas/OpenRouterFile'
          type: array
        first_id:
          type:
            - string
            - 'null'
        has_more:
          type: boolean
        last_id:
          type:
            - string
            - 'null'
      required:
        - _shape
        - data
        - has_more
        - first_id
        - last_id
        - cursor
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````