> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Exchange a workload identity token

> RFC 8693 token exchange. Presents a JWT from an issuer your organization trusts (Settings → Workload identity) and receives a short-lived OpenRouter access token that acts as the API key the matching federation policy targets.



## OpenAPI

````yaml /openapi/openapi.yaml post /oauth/token
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
  /oauth/token:
    post:
      tags:
        - OAuth
      summary: Exchange a workload identity token
      description: >-
        RFC 8693 token exchange. Presents a JWT from an issuer your organization
        trusts (Settings → Workload identity) and receives a short-lived
        OpenRouter access token that acts as the API key the matching federation
        policy targets.
      operationId: createOauthToken
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/TokenExchangeRequest'
        required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenExchangeResponse'
          description: Access token issued
        '400':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthErrorResponse'
          description: >-
            Malformed request, unsupported grant, or the subject token was not
            accepted
        '429':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthErrorResponse'
          description: Rate limited
        '500':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthErrorResponse'
          description: The token could not be issued
        '503':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthErrorResponse'
          description: The issuer’s discovery document or JWKS could not be fetched
components:
  schemas:
    TokenExchangeRequest:
      description: >-
        RFC 8693 token exchange request body
        (application/x-www-form-urlencoded).
      example:
        federation_policy_id: 4b2f7d1e-8c3a-4e5f-9a6b-1c2d3e4f5a6b
        grant_type: urn:ietf:params:oauth:grant-type:token-exchange
        subject_token: <jwt from your identity provider>
        subject_token_type: urn:ietf:params:oauth:token-type:jwt
      properties:
        federation_policy_id:
          description: >-
            The federation policy to evaluate, from Settings → Workload
            identity. Binds the exchange to one organization.
          example: 4b2f7d1e-8c3a-4e5f-9a6b-1c2d3e4f5a6b
          format: uuid
          type: string
        grant_type:
          description: Must be `urn:ietf:params:oauth:grant-type:token-exchange`.
          enum:
            - urn:ietf:params:oauth:grant-type:token-exchange
          example: urn:ietf:params:oauth:grant-type:token-exchange
          type: string
        requested_token_type:
          description: >-
            Optional; when present must be
            `urn:ietf:params:oauth:token-type:access_token`.
          enum:
            - urn:ietf:params:oauth:token-type:access_token
          example: urn:ietf:params:oauth:token-type:access_token
          type: string
        scope:
          description: Optional; only `inference` is available.
          enum:
            - inference
          example: inference
          type: string
        subject_token:
          description: The JWT issued by your identity provider.
          example: <jwt from your identity provider>
          maxLength: 16384
          minLength: 1
          type: string
        subject_token_type:
          description: Must be `urn:ietf:params:oauth:token-type:jwt`.
          enum:
            - urn:ietf:params:oauth:token-type:jwt
          example: urn:ietf:params:oauth:token-type:jwt
          type: string
      required:
        - grant_type
        - subject_token
        - federation_policy_id
        - subject_token_type
      type: object
    TokenExchangeResponse:
      description: RFC 8693 token exchange response.
      example:
        access_token: <short-lived openrouter access token jwt>
        expires_in: 900
        issued_token_type: urn:ietf:params:oauth:token-type:access_token
        scope: inference
        token_type: Bearer
      properties:
        access_token:
          description: >-
            A short-lived JWT to send as `Authorization: Bearer` to the
            inference API.
          example: <short-lived openrouter access token jwt>
          type: string
        expires_in:
          description: >-
            Seconds until the access token expires: at most 15 minutes, and
            never later than the subject token expires.
          example: 900
          type: integer
        issued_token_type:
          enum:
            - urn:ietf:params:oauth:token-type:access_token
          example: urn:ietf:params:oauth:token-type:access_token
          type: string
        scope:
          example: inference
          type: string
        token_type:
          enum:
            - Bearer
          example: Bearer
          type: string
      required:
        - access_token
        - issued_token_type
        - token_type
        - expires_in
        - scope
      type: object
    OAuthErrorResponse:
      description: RFC 6749 §5.2 error response.
      example:
        error: invalid_grant
        error_description: The subject token was not accepted.
      properties:
        error:
          enum:
            - invalid_request
            - invalid_grant
            - unsupported_grant_type
            - invalid_scope
            - server_error
            - temporarily_unavailable
          type: string
        error_description:
          type: string
      required:
        - error
        - error_description
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````