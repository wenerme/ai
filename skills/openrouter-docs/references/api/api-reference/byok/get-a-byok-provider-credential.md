> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get a BYOK provider credential

> Get a single bring-your-own-key (BYOK) provider credential by its `id`. [Management key](/docs/guides/overview/auth/management-api-keys) required.



## OpenAPI

````yaml /openapi/openapi.yaml get /byok/{id}
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
  - description: >-
      Create, inspect, update, provision, suspend and delete OpenRouter interns
      through an API key, and talk to them: the chat route streams
      OpenAI-compatible completions from one intern, pausing as an
      `openrouter.provide_input` tool call when the intern needs your permission
      or an answer. Available to interns programme members; other callers
      receive 404. See https://openrouter.ai/docs/guides/ori/intern-chat.
    name: Interns
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
  - description: >-
      Management endpoints for SCIM group-to-workspace mappings, authenticated
      with a management key. These are not the SCIM 2.0 connector endpoints for
      your identity provider. In your identity provider, enter the SCIM endpoint
      URL shown when you enable provisioning under Settings > Members > SCIM
      Mappings. See
      https://openrouter.ai/docs/guides/features/scim-mappings#set-up-provisioning.
    name: SCIM
  - description: Speech-to-text endpoints
    name: STT
    x-displayName: Transcriptions
  - description: >-
      System One endpoints for models such as Jev, compatible with the TypeSafe
      SDKs. See https://openrouter.ai/docs/guides/community/typesafe-sdk.
    name: SystemOne
    x-displayName: System One
  - description: Text-to-speech endpoints
    name: TTS
    x-displayName: Speech
  - description: >-
      Store host-bound secrets for a workspace or for one intern. Scope is
      selected by the API key. Responses return metadata only, never secret
      values. See https://openrouter.ai/docs/guides/ori/vault.
    name: Vault
  - description: Video Generation endpoints
    name: Video Generation
  - description: Workspaces endpoints
    name: Workspaces
  - description: Alpha feature endpoints for Decisions requests
    name: alpha.decisions
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /byok/{id}:
    get:
      tags:
        - BYOK
      summary: Get a BYOK provider credential
      description: >-
        Get a single bring-your-own-key (BYOK) provider credential by its `id`.
        [Management key](/docs/guides/overview/auth/management-api-keys)
        required.
      operationId: getBYOKKey
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
                  declared_zdr: null
                  disabled: false
                  id: 11111111-2222-3333-4444-555555555555
                  is_byok_only: false
                  is_fallback: false
                  is_required: false
                  label: sk-...AbCd
                  name: Production OpenAI Key
                  provider: openai
                  sort_order: 0
                  workspace_id: 550e8400-e29b-41d4-a716-446655440000
              schema:
                $ref: '#/components/schemas/GetBYOKKeyResponse'
          description: BYOK credential details
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
    GetBYOKKeyResponse:
      example:
        data:
          allowed_api_key_hashes: null
          allowed_models: null
          allowed_user_ids: null
          created_at: '2025-08-24T10:30:00Z'
          declared_zdr: null
          disabled: false
          id: 11111111-2222-3333-4444-555555555555
          is_byok_only: false
          is_fallback: false
          is_required: false
          label: sk-...AbCd
          name: Production OpenAI Key
          provider: openai
          sort_order: 0
          workspace_id: 550e8400-e29b-41d4-a716-446655440000
      properties:
        data:
          allOf:
            - $ref: '#/components/schemas/BYOKKey'
            - description: The BYOK credential.
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
        declared_zdr: null
        disabled: false
        id: 11111111-2222-3333-4444-555555555555
        is_byok_only: false
        is_fallback: false
        is_required: false
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
        declared_zdr:
          description: >-
            Your declaration of whether the upstream provider account behind
            this credential has zero data retention (ZDR). `null` inherits
            OpenRouter's data policy for the provider's endpoint; `true`
            declares the account ZDR so requests that require ZDR may route to
            this credential even when the shared endpoint retains data; `false`
            declares it non-ZDR so such requests never route to it.
            Self-declared and not verified by OpenRouter.
          example: null
          type:
            - boolean
            - 'null'
        disabled:
          description: Whether this credential is currently disabled.
          example: false
          type: boolean
        id:
          description: Stable public identifier for this BYOK credential.
          example: 11111111-2222-3333-4444-555555555555
          format: uuid
          type: string
        is_byok_only:
          description: >-
            Whether OpenRouter's shared endpoints on this provider are removed
            for every model, including models outside `allowed_models` and after
            all of your keys for the provider fail. The provider is skipped
            instead of spending OpenRouter credits. Only valid on non-fallback
            credentials.
          example: false
          type: boolean
        is_fallback:
          description: >-
            Whether this credential is treated as a fallback — used only after
            non-fallback keys for the same provider have been tried. Cannot be
            combined with `is_byok_only`.
          example: false
          type: boolean
        is_required:
          description: >-
            Whether OpenRouter's shared endpoints on this provider are removed
            for the models this credential applies to (its `allowed_models`, or
            every model when `null`). Requests for those models run only on your
            keys; models outside the allowlist may still fall back to shared
            capacity on this provider.
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
        - is_required
        - is_byok_only
        - declared_zdr
        - allowed_models
        - allowed_api_key_hashes
        - allowed_user_ids
        - sort_order
        - created_at
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
        - amazon-bedrock/claude-on-aws
        - amazon-nova
        - ambient
        - anthropic
        - anthropic/2
        - arcee-ai
        - assemblyai
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
        - claude-on-aws
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
        - near-ai
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
        - primeintellect
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
        - typesafe
        - unbiased
        - upstage
        - venice
        - voyageai
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