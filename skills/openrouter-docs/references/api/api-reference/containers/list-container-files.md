> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List container files

> Lists the files in a container, in lexicographic path order. The container id is the canonical id returned in bash/shell tool results; a restarted session is a separate container with its own id. Paginate with `limit` and `after` (pass the previous page’s `last_id`); `has_more: true` always means the next page is fetchable that way.



## OpenAPI

````yaml /openapi/openapi.yaml get /containers/{container_id}/files
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
  /containers/{container_id}/files:
    get:
      tags:
        - Containers
      summary: List container files
      description: >-
        Lists the files in a container, in lexicographic path order. The
        container id is the canonical id returned in bash/shell tool results; a
        restarted session is a separate container with its own id. Paginate with
        `limit` and `after` (pass the previous page’s `last_id`); `has_more:
        true` always means the next page is fetchable that way.
      operationId: listContainerFiles
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
        - description: >-
            Maximum number of files to return (1-1000). Defaults to 100 when
            absent.
          in: query
          name: limit
          required: false
          schema:
            default: 100
            description: >-
              Maximum number of files to return (1-1000). Defaults to 100 when
              absent.
            example: 100
            maximum: 1000
            minimum: 1
            type: integer
        - description: >-
            Forward cursor: a container file id from a previous page (typically
            `last_id`); listing resumes strictly after that file.
          in: query
          name: after
          required: false
          schema:
            description: >-
              Forward cursor: a container file id from a previous page
              (typically `last_id`); listing resumes strictly after that file.
            example: cfile_b3V0L3JlcG9ydC5jc3Y
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - bytes: 123
                    container_id: sess_abc123
                    created_at: 1755640000
                    id: cfile_b3V0L3JlcG9ydC5jc3Y
                    object: container.file
                    path: out/report.csv
                    source: assistant
                first_id: cfile_b3V0L3JlcG9ydC5jc3Y
                has_more: false
                last_id: cfile_b3V0L3JlcG9ydC5jc3Y
                object: list
              schema:
                $ref: '#/components/schemas/ContainerFileListResponse'
          description: The files in the container.
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
    ContainerFileListResponse:
      properties:
        data:
          items:
            $ref: '#/components/schemas/ContainerFile'
          type: array
        first_id:
          example: cfile_b3V0L3JlcG9ydC5jc3Y
          type:
            - string
            - 'null'
        has_more:
          description: True when another page can be fetched by passing `after=last_id`.
          example: false
          type: boolean
        last_id:
          example: cfile_b3V0L3JlcG9ydC5jc3Y
          type:
            - string
            - 'null'
        object:
          enum:
            - list
          example: list
          type: string
      required:
        - object
        - data
        - first_id
        - last_id
        - has_more
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
    ContainerFile:
      properties:
        bytes:
          description: File size in bytes.
          example: 123
          type: integer
        container_id:
          description: >-
            The container the file belongs to — echoes the `container_id` path
            parameter (OpenAI field name).
          example: sess_abc123
          type: string
        created_at:
          description: Unix timestamp (seconds) when the file was last synced.
          example: 1755640000
          type: integer
        id:
          description: 'Container file id: `cfile_` + base64url of the file path.'
          example: cfile_b3V0L3JlcG9ydC5jc3Y
          type: string
        object:
          enum:
            - container.file
          example: container.file
          type: string
        path:
          description: Container-relative file path.
          example: out/report.csv
          type: string
        source:
          description: Container files are always produced by the assistant sandbox.
          enum:
            - assistant
          example: assistant
          type: string
      required:
        - id
        - object
        - container_id
        - bytes
        - created_at
        - path
        - source
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