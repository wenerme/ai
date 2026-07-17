> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get stored prompt and completion content for a generation



## OpenAPI

````yaml /openapi/openapi.yaml get /generation/content
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
  /generation/content:
    get:
      tags:
        - Generations
      summary: Get stored prompt and completion content for a generation
      operationId: listGenerationContent
      parameters:
        - description: The generation ID
          in: query
          name: id
          required: true
          schema:
            description: The generation ID
            example: gen-1234567890
            minLength: 1
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  input:
                    messages:
                      - content: What is the meaning of life?
                        role: user
                  output:
                    completion: The meaning of life is a philosophical question...
                    reasoning: null
              schema:
                $ref: '#/components/schemas/GenerationContentResponse'
          description: Returns the stored prompt and completion content
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
        '524':
          content:
            application/json:
              example:
                error:
                  code: 524
                  message: Request timed out. Please try again later.
              schema:
                $ref: '#/components/schemas/EdgeNetworkTimeoutResponse'
          description: Infrastructure Timeout - Provider request timed out at edge network
        '529':
          content:
            application/json:
              example:
                error:
                  code: 529
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/ProviderOverloadedResponse'
          description: Provider Overloaded - Provider is temporarily overloaded
components:
  schemas:
    GenerationContentResponse:
      description: Stored prompt and completion content for a generation
      example:
        data:
          input:
            messages:
              - content: What is the meaning of life?
                role: user
          output:
            completion: The meaning of life is a philosophical question...
            reasoning: null
      properties:
        data:
          $ref: '#/components/schemas/GenerationContentData'
      required:
        - data
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
    EdgeNetworkTimeoutResponse:
      description: Infrastructure Timeout - Provider request timed out at edge network
      example:
        error:
          code: 524
          message: Request timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/EdgeNetworkTimeoutResponseErrorData'
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
    ProviderOverloadedResponse:
      description: Provider Overloaded - Provider is temporarily overloaded
      example:
        error:
          code: 529
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/ProviderOverloadedResponseErrorData'
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
    GenerationContentData:
      description: Stored prompt and completion content
      example:
        input:
          messages:
            - content: What is the meaning of life?
              role: user
        output:
          completion: The meaning of life is a philosophical question...
          reasoning: null
      properties:
        input:
          anyOf:
            - properties:
                prompt:
                  example: What is the meaning of life?
                  type: string
              required:
                - prompt
              type: object
            - properties:
                messages:
                  example:
                    - content: What is the meaning of life?
                      role: user
                  items: {}
                  type: array
              required:
                - messages
              type: object
          description: >-
            The input to the generation — either a prompt string or an array of
            messages
        output:
          description: The output from the generation
          properties:
            completion:
              description: The completion output
              example: The meaning of life is a philosophical question...
              type:
                - string
                - 'null'
            reasoning:
              description: Reasoning/thinking output, if any
              example: null
              type:
                - string
                - 'null'
          required:
            - reasoning
            - completion
          type: object
      required:
        - input
        - output
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
    EdgeNetworkTimeoutResponseErrorData:
      description: Error data for EdgeNetworkTimeoutResponse
      example:
        code: 524
        message: Request timed out. Please try again later.
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
    ProviderOverloadedResponseErrorData:
      description: Error data for ProviderOverloadedResponse
      example:
        code: 529
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
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````