> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update a BYOK provider credential

> Update an existing bring-your-own-key (BYOK) provider credential by its `id`. Include the `key` field to rotate the raw provider API key in-place (the previous key material is overwritten). Use `allowed_api_key_hashes` to restrict the credential to specific OpenRouter API keys (`null` clears the restriction). [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml patch /byok/{id}
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
  /byok/{id}:
    patch:
      tags:
        - BYOK
      summary: Update a BYOK provider credential
      description: >-
        Update an existing bring-your-own-key (BYOK) provider credential by its
        `id`. Include the `key` field to rotate the raw provider API key
        in-place (the previous key material is overwritten). Use
        `allowed_api_key_hashes` to restrict the credential to specific
        OpenRouter API keys (`null` clears the restriction). [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      operationId: updateBYOKKey
      parameters:
        - description: The BYOK credential ID (UUID).
          in: path
          name: id
          required: true
          schema:
            description: The BYOK credential ID (UUID).
            example: 11111111-2222-3333-4444-555555555555
            format: uuid
            type: string
      requestBody:
        content:
          application/json:
            example:
              disabled: false
              name: Updated OpenAI Key
            schema:
              $ref: '#/components/schemas/UpdateBYOKKeyRequest'
        required: true
      responses:
        '200':
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
                  name: Updated OpenAI Key
                  provider: openai
                  sort_order: 0
                  workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/UpdateBYOKKeyResponse'
          description: BYOK credential updated successfully
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
    UpdateBYOKKeyRequest:
      example:
        disabled: false
        name: Updated OpenAI Key
      properties:
        allowed_api_key_hashes:
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            that may use this credential. `null` clears the restriction. Must
            contain at least one hash if provided. Hashes that do not belong to
            your account return a 400.
          example:
            - f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943
          items:
            pattern: ^[a-f0-9]{64}$
            type: string
          maxItems: 100
          minItems: 1
          type:
            - array
            - 'null'
        allowed_models:
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          type:
            - array
            - 'null'
        allowed_user_ids:
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          type:
            - array
            - 'null'
        disabled:
          description: Whether this credential is disabled.
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
            A new raw provider API key to rotate the credential in-place. The
            previous key material is overwritten and the masked label is
            regenerated. Encrypted at rest and never returned in API responses.
          example: sk-proj-newkey456...
          minLength: 1
          type: string
        name:
          description: Optional human-readable name for the credential.
          example: Updated OpenAI Key
          maxLength: 255
          type:
            - string
            - 'null'
      type: object
    UpdateBYOKKeyResponse:
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
          name: Updated OpenAI Key
          provider: openai
          sort_order: 0
          workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/BYOKKey'
            - description: The updated BYOK credential.
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
          type:
            - array
            - 'null'
        allowed_models:
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          type:
            - array
            - 'null'
        allowed_user_ids:
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
          example: null
          items:
            type: string
          maxItems: 100
          type:
            - array
            - 'null'
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
          type:
            - string
            - 'null'
        provider:
          $ref: '#/components/schemas/BYOKProviderSlug'
        sort_order:
          description: >-
            Position within the provider — credentials are tried in ascending
            sort order.
          example: 0
          type: integer
        workspace_id:
          description: >-
            The workspace this credential is scoped to, or `null` when it is
            global — usable across every workspace in the account. A `null`
            value does not mean the default workspace.
          example: 550e8400-e29b-41d4-a716-446655440000
          format: uuid
          type:
            - string
            - 'null'
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
        - coreweave
        - cosine
        - crusoe
        - darkbloom
        - databricks
        - decart
        - deepgram
        - deepinfra
        - deepseek
        - dekallm
        - digitalocean
        - featherless
        - fireworks
        - fish-audio
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
        - krea
        - liquid
        - makora
        - mancer
        - mara
        - meta
        - minimax
        - mistral
        - modal
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
        - ollama
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
        - runway
        - sail-research
        - sakana
        - sakana-ai
        - sambanova
        - seed
        - siliconflow
        - sourceful
        - stepfun
        - streamlake
        - switchpoint
        - tencent
        - tenstorrent
        - thinkingmachines
        - together
        - upstage
        - venice
        - wafer
        - wandb
        - wandb-legacy
        - xai
        - xiaomi
        - z-ai
      example: openai
      type: string
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````