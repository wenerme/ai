> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get a preset

> Retrieves a preset by its slug with its currently designated version inline.



## OpenAPI

````yaml /openapi/openapi.yaml get /presets/{slug}
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
  /presets/{slug}:
    get:
      tags:
        - Presets
      summary: Get a preset
      description: >-
        Retrieves a preset by its slug with its currently designated version
        inline.
      operationId: getPreset
      parameters:
        - description: URL-safe slug identifying the preset.
          in: path
          name: slug
          required: true
          schema:
            description: URL-safe slug identifying the preset.
            example: my-preset
            minLength: 1
            type: string
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  created_at: '2026-04-20T10:00:00Z'
                  creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
                  description: null
                  designated_version:
                    config:
                      model: openai/gpt-4o
                      temperature: 0.7
                    created_at: '2026-04-20T10:00:00Z'
                    creator_id: user_2dHFtVWx2n56w6HkM0000000000
                    id: 550e8400-e29b-41d4-a716-446655440000
                    preset_id: 650e8400-e29b-41d4-a716-446655440001
                    system_prompt: You are a helpful assistant.
                    updated_at: '2026-04-20T10:00:00Z'
                    version: 1
                  designated_version_id: 550e8400-e29b-41d4-a716-446655440000
                  id: 650e8400-e29b-41d4-a716-446655440001
                  name: my-preset
                  slug: my-preset
                  status: active
                  status_updated_at: null
                  updated_at: '2026-04-20T10:00:00Z'
                  workspace_id: 750e8400-e29b-41d4-a716-446655440002
              schema:
                $ref: '#/components/schemas/GetPresetResponse'
          description: Preset with its designated version.
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
      security:
        - apiKey: []
components:
  schemas:
    GetPresetResponse:
      description: A preset with its currently designated version.
      example:
        data:
          created_at: '2026-04-20T10:00:00Z'
          creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
          description: null
          designated_version:
            config:
              model: openai/gpt-4o
              temperature: 0.7
            created_at: '2026-04-20T10:00:00Z'
            creator_id: user_2dHFtVWx2n56w6HkM0000000000
            id: 550e8400-e29b-41d4-a716-446655440000
            preset_id: 650e8400-e29b-41d4-a716-446655440001
            system_prompt: You are a helpful assistant.
            updated_at: '2026-04-20T10:00:00Z'
            version: 1
          designated_version_id: 550e8400-e29b-41d4-a716-446655440000
          id: 650e8400-e29b-41d4-a716-446655440001
          name: my-preset
          slug: my-preset
          status: active
          status_updated_at: null
          updated_at: '2026-04-20T10:00:00Z'
          workspace_id: 750e8400-e29b-41d4-a716-446655440002
      properties:
        data:
          $ref: '#/components/schemas/PresetWithDesignatedVersion'
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
    PresetWithDesignatedVersion:
      allOf:
        - $ref: '#/components/schemas/Preset'
        - properties:
            designated_version:
              $ref: '#/components/schemas/PresetDesignatedVersion'
          required:
            - designated_version
          type: object
      description: A preset with its currently designated version.
      example:
        created_at: '2026-04-20T10:00:00Z'
        creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
        description: null
        designated_version:
          config:
            model: openai/gpt-4o
            temperature: 0.7
          created_at: '2026-04-20T10:00:00Z'
          creator_id: user_2dHFtVWx2n56w6HkM0000000000
          id: 550e8400-e29b-41d4-a716-446655440000
          preset_id: 650e8400-e29b-41d4-a716-446655440001
          system_prompt: You are a helpful assistant.
          updated_at: '2026-04-20T10:00:00Z'
          version: 1
        designated_version_id: 550e8400-e29b-41d4-a716-446655440000
        id: 650e8400-e29b-41d4-a716-446655440001
        name: my-preset
        slug: my-preset
        status: active
        status_updated_at: null
        updated_at: '2026-04-20T10:00:00Z'
        workspace_id: 750e8400-e29b-41d4-a716-446655440002
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
    Preset:
      description: A preset without version details.
      example:
        created_at: '2026-04-20T10:00:00Z'
        creator_user_id: user_2dHFtVWx2n56w6HkM0000000000
        description: null
        designated_version_id: 550e8400-e29b-41d4-a716-446655440000
        id: 650e8400-e29b-41d4-a716-446655440001
        name: my-preset
        slug: my-preset
        status: active
        status_updated_at: null
        updated_at: '2026-04-20T10:00:00Z'
        workspace_id: 750e8400-e29b-41d4-a716-446655440002
      properties:
        created_at:
          type: string
        creator_user_id:
          type:
            - string
            - 'null'
        description:
          type:
            - string
            - 'null'
        designated_version_id:
          type:
            - string
            - 'null'
        id:
          type: string
        name:
          type: string
        slug:
          type: string
        status:
          $ref: '#/components/schemas/PresetStatus'
        status_updated_at:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        workspace_id:
          type:
            - string
            - 'null'
      required:
        - id
        - creator_user_id
        - workspace_id
        - name
        - slug
        - description
        - status
        - designated_version_id
        - created_at
        - updated_at
        - status_updated_at
      type: object
    PresetDesignatedVersion:
      description: >-
        A specific version of a preset, containing config and optional system
        prompt.
      example:
        config:
          model: openai/gpt-4o
          temperature: 0.7
        created_at: '2026-04-20T10:00:00Z'
        creator_id: user_2dHFtVWx2n56w6HkM0000000000
        id: 550e8400-e29b-41d4-a716-446655440000
        preset_id: 650e8400-e29b-41d4-a716-446655440001
        system_prompt: You are a helpful assistant.
        updated_at: '2026-04-20T10:00:00Z'
        version: 1
      properties:
        config:
          additionalProperties: {}
          type: object
        created_at:
          type: string
        creator_id:
          type: string
        id:
          type: string
        preset_id:
          type: string
        system_prompt:
          type:
            - string
            - 'null'
        updated_at:
          type: string
        version:
          type: integer
      required:
        - id
        - preset_id
        - creator_id
        - version
        - system_prompt
        - config
        - created_at
        - updated_at
      type:
        - object
        - 'null'
    PresetStatus:
      description: The status of a preset.
      enum:
        - active
        - disabled
        - archived
      example: active
      type: string
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````