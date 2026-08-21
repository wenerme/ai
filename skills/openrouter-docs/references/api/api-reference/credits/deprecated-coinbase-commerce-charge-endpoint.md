> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Deprecated Coinbase Commerce charge endpoint

> Deprecated. The Coinbase APIs used by this endpoint have been deprecated, so Coinbase Commerce charges have been removed. Use the web credits purchase flow instead.



## OpenAPI

````yaml /openapi/openapi.yaml post /credits/coinbase
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
  /credits/coinbase:
    post:
      tags:
        - Credits
      summary: Deprecated Coinbase Commerce charge endpoint
      description: >-
        Deprecated. The Coinbase APIs used by this endpoint have been
        deprecated, so Coinbase Commerce charges have been removed. Use the web
        credits purchase flow instead.
      operationId: createCoinbaseCharge
      responses:
        '200':
          description: This endpoint is deprecated and will never return a 200 response.
        '410':
          content:
            application/json:
              example:
                error:
                  code: 410
                  message: >-
                    The Coinbase APIs used by this endpoint have been
                    deprecated, so the Coinbase Commerce credits API has been
                    removed. Use the web credits purchase flow instead.
              schema:
                $ref: '#/components/schemas/GoneResponse'
          description: Gone - Endpoint has been permanently removed or deprecated
      deprecated: true
      security: []
components:
  schemas:
    GoneResponse:
      description: Gone - Endpoint has been permanently removed or deprecated
      example:
        error:
          code: 410
          message: >-
            The Coinbase APIs used by this endpoint have been deprecated, so the
            Coinbase Commerce credits API has been removed. Use the web credits
            purchase flow instead.
      properties:
        error:
          $ref: '#/components/schemas/GoneResponseErrorData'
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
    GoneResponseErrorData:
      description: Error data for GoneResponse
      example:
        code: 410
        message: >-
          The Coinbase APIs used by this endpoint have been deprecated, so the
          Coinbase Commerce credits API has been removed. Use the web credits
          purchase flow instead.
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