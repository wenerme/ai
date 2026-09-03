> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenRouter access token signing keys

> RFC 7517 JWK Set containing the public keys OpenRouter signs access tokens with.



## OpenAPI

````yaml /openapi/openapi.yaml get /oauth/jwks
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
  /oauth/jwks:
    get:
      tags:
        - OAuth
      summary: OpenRouter access token signing keys
      description: >-
        RFC 7517 JWK Set containing the public keys OpenRouter signs access
        tokens with.
      operationId: listOauthJwks
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthJwks'
          description: JWK Set
        '500':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
          description: Signing keys are not configured
components:
  schemas:
    OAuthJwks:
      description: RFC 7517 JWK Set of the keys OpenRouter signs access tokens with.
      example:
        keys:
          - alg: ES256
            crv: P-256
            kid: or-2026-09
            kty: EC
            use: sig
            x: f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU
            'y': x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0
      properties:
        keys:
          items:
            additionalProperties: false
            properties:
              alg:
                enum:
                  - ES256
                type: string
              crv:
                enum:
                  - P-256
                type: string
              kid:
                minLength: 1
                type: string
              kty:
                enum:
                  - EC
                type: string
              use:
                enum:
                  - sig
                type: string
              x:
                pattern: ^[A-Za-z0-9_-]+$
                type: string
              'y':
                pattern: ^[A-Za-z0-9_-]+$
                type: string
            required:
              - kty
              - crv
              - kid
              - x
              - 'y'
              - alg
              - use
            type: object
          minItems: 1
          type: array
      required:
        - keys
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