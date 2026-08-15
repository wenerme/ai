> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Exchange authorization code for API key

> Exchange an authorization code from the PKCE flow for a user-controlled API key



## OpenAPI

````yaml /openapi/openapi.yaml post /auth/keys
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
  - description: beta.Analytics endpoints
    name: beta.Analytics
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /auth/keys:
    post:
      tags:
        - OAuth
      summary: Exchange authorization code for API key
      description: >-
        Exchange an authorization code from the PKCE flow for a user-controlled
        API key
      operationId: exchangeAuthCodeForAPIKey
      requestBody:
        content:
          application/json:
            example:
              code: auth_code_abc123def456
              code_challenge_method: S256
              code_verifier: dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
            schema:
              example:
                code: auth_code_abc123def456
                code_challenge_method: S256
                code_verifier: dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
              properties:
                code:
                  description: The authorization code received from the OAuth redirect
                  example: auth_code_abc123def456
                  type: string
                code_challenge_method:
                  description: The method used to generate the code challenge
                  enum:
                    - S256
                    - plain
                    - null
                  example: S256
                  type:
                    - string
                    - 'null'
                code_verifier:
                  description: >-
                    The code verifier if code_challenge was used in the
                    authorization request
                  example: dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
                  type: string
              required:
                - code
              type: object
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                key: >-
                  OPENROUTER_API_KEY_EXAMPLE
                user_id: user_2yOPcMpKoQhcd4bVgSMlELRaIah
              schema:
                example:
                  key: >-
                    OPENROUTER_API_KEY_EXAMPLE
                  user_id: user_2yOPcMpKoQhcd4bVgSMlELRaIah
                properties:
                  key:
                    description: The API key to use for OpenRouter requests
                    example: >-
                      OPENROUTER_API_KEY_EXAMPLE
                    type: string
                  user_id:
                    description: User ID associated with the API key
                    example: user_2yOPcMpKoQhcd4bVgSMlELRaIah
                    type:
                      - string
                      - 'null'
                required:
                  - key
                  - user_id
                type: object
          description: Successfully exchanged code for an API key
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