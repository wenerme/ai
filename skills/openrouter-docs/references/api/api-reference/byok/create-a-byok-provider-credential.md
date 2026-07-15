> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a BYOK provider credential

> Create a new bring-your-own-key (BYOK) provider credential. The raw key is encrypted at rest and never returned in API responses. Defaults to the authenticated entity's default workspace; use the `workspace_id` body field to scope to a different workspace. Treat the raw key as write-only; it is never returned after creation. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml post /byok
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
  /byok:
    post:
      tags:
        - BYOK
      summary: Create a BYOK provider credential
      description: >-
        Create a new bring-your-own-key (BYOK) provider credential. The raw key
        is encrypted at rest and never returned in API responses. Defaults to
        the authenticated entity's default workspace; use the `workspace_id`
        body field to scope to a different workspace. Treat the raw key as
        write-only; it is never returned after creation. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: createBYOKKey
      requestBody:
        content:
          application/json:
            example:
              key: sk-proj-abc123...
              name: Production OpenAI Key
              provider: openai
            schema:
              $ref: '#/components/schemas/CreateBYOKKeyRequest'
        required: true
      responses:
        '201':
          content:
            application/json:
              example:
                data:
                  allowed_api_key_hashes: null
                  allowed_models: null
                  allowed_user_ids: null
                  created_at: '2025-08-24T10:30:00Z'
                  disabled: false
                  id: 11111111-2222-3333-4444-555555555555
                  is_fallback: false
                  label: sk-...AbCd
                  name: Production OpenAI Key
                  provider: openai
                  sort_order: 0
                  workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/CreateBYOKKeyResponse'
          description: BYOK credential created successfully
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
    CreateBYOKKeyRequest:
      example:
        key: sk-proj-abc123...
        name: Production OpenAI Key
        provider: openai
      properties:
        allowed_models:
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          nullable: true
          type: array
        allowed_user_ids:
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          nullable: true
          type: array
        disabled:
          description: Whether this credential should be created in a disabled state.
          example: false
          type: boolean
        is_fallback:
          description: >-
            Whether this credential is treated as a fallback — used only after
            non-fallback keys for the same provider have been tried.
          example: false
          type: boolean
        key:
          description: >-
            The raw provider API key or credential. This value is encrypted at
            rest and never returned in API responses.
          example: sk-proj-abc123...
          minLength: 1
          type: string
        name:
          description: Optional human-readable name for the credential.
          example: Production OpenAI Key
          maxLength: 255
          nullable: true
          type: string
        provider:
          $ref: '#/components/schemas/BYOKProviderSlug'
        workspace_id:
          description: >-
            Optional workspace ID. Defaults to the authenticated entity's
            default workspace.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - provider
        - key
      type: object
    CreateBYOKKeyResponse:
      example:
        data:
          allowed_api_key_hashes: null
          allowed_models: null
          allowed_user_ids: null
          created_at: '2025-08-24T10:30:00Z'
          disabled: false
          id: 11111111-2222-3333-4444-555555555555
          is_fallback: false
          label: sk-...AbCd
          name: Production OpenAI Key
          provider: openai
          sort_order: 0
          workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/BYOKKey'
            - description: The created BYOK credential.
      required:
        - data
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
        user_id:
          nullable: true
          type: string
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
        user_id:
          nullable: true
          type: string
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
        user_id:
          nullable: true
          type: string
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
        user_id:
          nullable: true
          type: string
      required:
        - error
      type: object
    BYOKProviderSlug:
      description: >-
        The upstream provider this credential authenticates against, as a
        lowercase slug (e.g. `openai`, `anthropic`, `amazon-bedrock`).
      enum:
        - ai21
        - aion-labs
        - akashml
        - alibaba
        - amazon-bedrock
        - amazon-nova
        - ambient
        - anthropic
        - arcee-ai
        - atlas-cloud
        - avian
        - azure
        - baidu
        - baseten
        - black-forest-labs
        - byteplus
        - cerebras
        - chutes
        - cirrascale
        - clarifai
        - cloudflare
        - cohere
        - crusoe
        - darkbloom
        - decart
        - deepgram
        - deepinfra
        - deepseek
        - dekallm
        - digitalocean
        - featherless
        - fireworks
        - friendli
        - gmicloud
        - google-ai-studio
        - google-vertex
        - groq
        - heygen
        - inception
        - inceptron
        - inferact-vllm
        - inference-net
        - infermatic
        - inflection
        - io-net
        - ionstream
        - liquid
        - mancer
        - mara
        - meta
        - minimax
        - mistral
        - modelrun
        - modular
        - moonshotai
        - morph
        - ncompass
        - nebius
        - nex-agi
        - nextbit
        - novita
        - nvidia
        - open-inference
        - openai
        - parasail
        - perceptron
        - perplexity
        - phala
        - poolside
        - quiver
        - recraft
        - reka
        - relace
        - sail-research
        - sakana
        - sambanova
        - seed
        - siliconflow
        - sourceful
        - stepfun
        - streamlake
        - switchpoint
        - tenstorrent
        - together
        - upstage
        - venice
        - wafer
        - wandb
        - xai
        - xiaomi
        - z-ai
      example: openai
      type: string
    BYOKKey:
      example:
        allowed_api_key_hashes: null
        allowed_models: null
        allowed_user_ids: null
        created_at: '2025-08-24T10:30:00Z'
        disabled: false
        id: 11111111-2222-3333-4444-555555555555
        is_fallback: false
        label: sk-...AbCd
        name: Production OpenAI Key
        provider: openai
        sort_order: 0
        workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        allowed_api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            that may use this credential. `null` means no restriction.
          example:
            - f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
          items:
            type: string
          maxItems: 100
          nullable: true
          type: array
        allowed_models:
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          nullable: true
          type: array
        allowed_user_ids:
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          nullable: true
          type: array
        created_at:
          description: ISO timestamp of when the credential was created.
          example: '2025-08-24T10:30:00Z'
          type: string
        disabled:
          description: Whether this credential is currently disabled.
          example: false
          type: boolean
        id:
          description: Stable public identifier for this BYOK credential.
          example: 11111111-2222-3333-4444-555555555555
          format: uuid
          type: string
        is_fallback:
          description: >-
            Whether this credential is treated as a fallback — used only after
            non-fallback keys for the same provider have been tried.
          example: false
          type: boolean
        label:
          description: >-
            Short masked snippet of the key (e.g. the first/last few characters)
            used to identify it in the UI.
          example: sk-...AbCd
          type: string
        name:
          description: Optional human-readable name for the credential.
          example: Production OpenAI Key
          nullable: true
          type: string
        provider:
          $ref: '#/components/schemas/BYOKProviderSlug'
        sort_order:
          description: >-
            Position within the provider — credentials are tried in ascending
            sort order.
          example: 0
          type: integer
        workspace_id:
          description: ID of the workspace this credential belongs to.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type: string
      required:
        - id
        - provider
        - workspace_id
        - label
        - disabled
        - is_fallback
        - allowed_models
        - allowed_api_key_hashes
        - allowed_user_ids
        - sort_order
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
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