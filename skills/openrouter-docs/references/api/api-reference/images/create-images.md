> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Generate an image

POST https://openrouter.ai/api/v1/images
Content-Type: application/json

Generates an image from a text prompt via the image generation router

Reference: https://openrouter.ai/docs/api/api-reference/images/create-images

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /images:
    post:
      operationId: create-images
      summary: Generate an image
      description: Generates an image from a text prompt via the image generation router
      tags:
        - subpackage_images
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Image generation response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ImageGenerationResponse'
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '402':
          description: Payment Required - Insufficient credits or quota to complete request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
        '403':
          description: Forbidden - Authentication successful but insufficient permissions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
        '502':
          description: Bad Gateway - Provider/upstream API failure
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ImageGenerationRequest'
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    ImageGenerationRequestAspectRatio:
      type: string
      enum:
        - '1:1'
        - '1:2'
        - '1:4'
        - '1:8'
        - '2:1'
        - '2:3'
        - '3:2'
        - '3:4'
        - '4:1'
        - '4:3'
        - '4:5'
        - '5:4'
        - '8:1'
        - '9:16'
        - '16:9'
        - '9:19.5'
        - 19.5:9
        - '9:20'
        - '20:9'
        - '9:21'
        - '21:9'
        - auto
      description: >-
        Normalized aspect ratio of the generated image. Providers clamp to their
        supported subset.
      title: ImageGenerationRequestAspectRatio
    ImageGenerationRequestBackground:
      type: string
      enum:
        - auto
        - transparent
        - opaque
      description: >-
        Background treatment. `transparent` requires an output_format that
        supports alpha (png or webp).
      title: ImageGenerationRequestBackground
    InputReferenceDiscriminatorMappingImageUrlImageUrl:
      type: object
      properties:
        url:
          type: string
      required:
        - url
      title: InputReferenceDiscriminatorMappingImageUrlImageUrl
    ContentPartImage:
      type: object
      properties:
        image_url:
          $ref: >-
            #/components/schemas/InputReferenceDiscriminatorMappingImageUrlImageUrl
      required:
        - image_url
      title: ContentPartImage
    ImageGenerationRequestOutputFormat:
      type: string
      enum:
        - png
        - jpeg
        - webp
      description: Encoding of the returned image bytes.
      title: ImageGenerationRequestOutputFormat
    ImageGenerationRequestProviderOptions:
      type: object
      properties:
        01ai:
          type: object
          additionalProperties:
            description: Any type
        ai21:
          type: object
          additionalProperties:
            description: Any type
        aion-labs:
          type: object
          additionalProperties:
            description: Any type
        akashml:
          type: object
          additionalProperties:
            description: Any type
        alibaba:
          type: object
          additionalProperties:
            description: Any type
        amazon-bedrock:
          type: object
          additionalProperties:
            description: Any type
        amazon-nova:
          type: object
          additionalProperties:
            description: Any type
        ambient:
          type: object
          additionalProperties:
            description: Any type
        anthropic:
          type: object
          additionalProperties:
            description: Any type
        anyscale:
          type: object
          additionalProperties:
            description: Any type
        arcee-ai:
          type: object
          additionalProperties:
            description: Any type
        atlas-cloud:
          type: object
          additionalProperties:
            description: Any type
        atoma:
          type: object
          additionalProperties:
            description: Any type
        avian:
          type: object
          additionalProperties:
            description: Any type
        azure:
          type: object
          additionalProperties:
            description: Any type
        baidu:
          type: object
          additionalProperties:
            description: Any type
        baseten:
          type: object
          additionalProperties:
            description: Any type
        black-forest-labs:
          type: object
          additionalProperties:
            description: Any type
        byteplus:
          type: object
          additionalProperties:
            description: Any type
        centml:
          type: object
          additionalProperties:
            description: Any type
        cerebras:
          type: object
          additionalProperties:
            description: Any type
        chutes:
          type: object
          additionalProperties:
            description: Any type
        cirrascale:
          type: object
          additionalProperties:
            description: Any type
        clarifai:
          type: object
          additionalProperties:
            description: Any type
        cloudflare:
          type: object
          additionalProperties:
            description: Any type
        cohere:
          type: object
          additionalProperties:
            description: Any type
        crofai:
          type: object
          additionalProperties:
            description: Any type
        crucible:
          type: object
          additionalProperties:
            description: Any type
        crusoe:
          type: object
          additionalProperties:
            description: Any type
        darkbloom:
          type: object
          additionalProperties:
            description: Any type
        decart:
          type: object
          additionalProperties:
            description: Any type
        deepinfra:
          type: object
          additionalProperties:
            description: Any type
        deepseek:
          type: object
          additionalProperties:
            description: Any type
        dekallm:
          type: object
          additionalProperties:
            description: Any type
        digitalocean:
          type: object
          additionalProperties:
            description: Any type
        enfer:
          type: object
          additionalProperties:
            description: Any type
        fake-provider:
          type: object
          additionalProperties:
            description: Any type
        featherless:
          type: object
          additionalProperties:
            description: Any type
        fireworks:
          type: object
          additionalProperties:
            description: Any type
        friendli:
          type: object
          additionalProperties:
            description: Any type
        gmicloud:
          type: object
          additionalProperties:
            description: Any type
        google-ai-studio:
          type: object
          additionalProperties:
            description: Any type
        google-vertex:
          type: object
          additionalProperties:
            description: Any type
        gopomelo:
          type: object
          additionalProperties:
            description: Any type
        groq:
          type: object
          additionalProperties:
            description: Any type
        huggingface:
          type: object
          additionalProperties:
            description: Any type
        hyperbolic:
          type: object
          additionalProperties:
            description: Any type
        hyperbolic-quantized:
          type: object
          additionalProperties:
            description: Any type
        inception:
          type: object
          additionalProperties:
            description: Any type
        inceptron:
          type: object
          additionalProperties:
            description: Any type
        inference-net:
          type: object
          additionalProperties:
            description: Any type
        infermatic:
          type: object
          additionalProperties:
            description: Any type
        inflection:
          type: object
          additionalProperties:
            description: Any type
        inocloud:
          type: object
          additionalProperties:
            description: Any type
        io-net:
          type: object
          additionalProperties:
            description: Any type
        ionstream:
          type: object
          additionalProperties:
            description: Any type
        klusterai:
          type: object
          additionalProperties:
            description: Any type
        lambda:
          type: object
          additionalProperties:
            description: Any type
        lepton:
          type: object
          additionalProperties:
            description: Any type
        liquid:
          type: object
          additionalProperties:
            description: Any type
        lynn:
          type: object
          additionalProperties:
            description: Any type
        lynn-private:
          type: object
          additionalProperties:
            description: Any type
        mancer:
          type: object
          additionalProperties:
            description: Any type
        mancer-old:
          type: object
          additionalProperties:
            description: Any type
        mara:
          type: object
          additionalProperties:
            description: Any type
        meta:
          type: object
          additionalProperties:
            description: Any type
        minimax:
          type: object
          additionalProperties:
            description: Any type
        mistral:
          type: object
          additionalProperties:
            description: Any type
        modal:
          type: object
          additionalProperties:
            description: Any type
        modelrun:
          type: object
          additionalProperties:
            description: Any type
        modular:
          type: object
          additionalProperties:
            description: Any type
        moonshotai:
          type: object
          additionalProperties:
            description: Any type
        morph:
          type: object
          additionalProperties:
            description: Any type
        ncompass:
          type: object
          additionalProperties:
            description: Any type
        nebius:
          type: object
          additionalProperties:
            description: Any type
        nex-agi:
          type: object
          additionalProperties:
            description: Any type
        nextbit:
          type: object
          additionalProperties:
            description: Any type
        nineteen:
          type: object
          additionalProperties:
            description: Any type
        novita:
          type: object
          additionalProperties:
            description: Any type
        nvidia:
          type: object
          additionalProperties:
            description: Any type
        octoai:
          type: object
          additionalProperties:
            description: Any type
        open-inference:
          type: object
          additionalProperties:
            description: Any type
        openai:
          type: object
          additionalProperties:
            description: Any type
        parasail:
          type: object
          additionalProperties:
            description: Any type
        perceptron:
          type: object
          additionalProperties:
            description: Any type
        perplexity:
          type: object
          additionalProperties:
            description: Any type
        phala:
          type: object
          additionalProperties:
            description: Any type
        poolside:
          type: object
          additionalProperties:
            description: Any type
        recraft:
          type: object
          additionalProperties:
            description: Any type
        recursal:
          type: object
          additionalProperties:
            description: Any type
        reflection:
          type: object
          additionalProperties:
            description: Any type
        reka:
          type: object
          additionalProperties:
            description: Any type
        relace:
          type: object
          additionalProperties:
            description: Any type
        replicate:
          type: object
          additionalProperties:
            description: Any type
        sambanova:
          type: object
          additionalProperties:
            description: Any type
        sambanova-cloaked:
          type: object
          additionalProperties:
            description: Any type
        seed:
          type: object
          additionalProperties:
            description: Any type
        sf-compute:
          type: object
          additionalProperties:
            description: Any type
        siliconflow:
          type: object
          additionalProperties:
            description: Any type
        sourceful:
          type: object
          additionalProperties:
            description: Any type
        stealth:
          type: object
          additionalProperties:
            description: Any type
        stepfun:
          type: object
          additionalProperties:
            description: Any type
        streamlake:
          type: object
          additionalProperties:
            description: Any type
        switchpoint:
          type: object
          additionalProperties:
            description: Any type
        targon:
          type: object
          additionalProperties:
            description: Any type
        together:
          type: object
          additionalProperties:
            description: Any type
        together-lite:
          type: object
          additionalProperties:
            description: Any type
        ubicloud:
          type: object
          additionalProperties:
            description: Any type
        upstage:
          type: object
          additionalProperties:
            description: Any type
        venice:
          type: object
          additionalProperties:
            description: Any type
        wafer:
          type: object
          additionalProperties:
            description: Any type
        wandb:
          type: object
          additionalProperties:
            description: Any type
        xai:
          type: object
          additionalProperties:
            description: Any type
        xiaomi:
          type: object
          additionalProperties:
            description: Any type
        z-ai:
          type: object
          additionalProperties:
            description: Any type
      description: >-
        Provider-specific options keyed by provider slug. Only options for the
        matched provider are forwarded; the rest are ignored. Unrecognized keys
        are silently dropped.
      title: ImageGenerationRequestProviderOptions
    ImageGenerationRequestProvider:
      type: object
      properties:
        options:
          $ref: '#/components/schemas/ImageGenerationRequestProviderOptions'
      description: Provider-specific passthrough configuration
      title: ImageGenerationRequestProvider
    ImageGenerationRequestQuality:
      type: string
      enum:
        - auto
        - low
        - medium
        - high
      description: Rendering quality. Providers without a quality knob ignore this.
      title: ImageGenerationRequestQuality
    ImageGenerationRequestResolution:
      type: string
      enum:
        - '512'
        - 1K
        - 2K
        - 4K
      description: >-
        Normalized resolution tier of the generated image. Concrete pixel
        dimensions are derived per-provider.
      title: ImageGenerationRequestResolution
    ImageGenerationRequest:
      type: object
      properties:
        aspect_ratio:
          $ref: '#/components/schemas/ImageGenerationRequestAspectRatio'
          description: >-
            Normalized aspect ratio of the generated image. Providers clamp to
            their supported subset.
        background:
          $ref: '#/components/schemas/ImageGenerationRequestBackground'
          description: >-
            Background treatment. `transparent` requires an output_format that
            supports alpha (png or webp).
        input_references:
          type: array
          items:
            $ref: '#/components/schemas/ContentPartImage'
          description: >-
            Reference images to guide image-to-image generation, as base64 data
            URLs or HTTP(S) URLs.
        model:
          type: string
          description: The image generation model to use
        'n':
          type: integer
          description: >-
            Number of images to generate (1-10). Providers that only support
            single-image generation reject n > 1.
        output_compression:
          type: integer
          description: >-
            Compression level (0-100) for webp/jpeg output. Ignored for png and
            by providers without a compression knob.
        output_format:
          $ref: '#/components/schemas/ImageGenerationRequestOutputFormat'
          description: Encoding of the returned image bytes.
        prompt:
          type: string
          description: Text description of the desired image
        provider:
          $ref: '#/components/schemas/ImageGenerationRequestProvider'
          description: Provider-specific passthrough configuration
        quality:
          $ref: '#/components/schemas/ImageGenerationRequestQuality'
          description: Rendering quality. Providers without a quality knob ignore this.
        resolution:
          $ref: '#/components/schemas/ImageGenerationRequestResolution'
          description: >-
            Normalized resolution tier of the generated image. Concrete pixel
            dimensions are derived per-provider.
        seed:
          type: integer
          description: >-
            If specified, the generation will sample deterministically, such
            that repeated requests with the same seed and parameters should
            return the same result. Determinism is not guaranteed for all
            providers.
        size:
          type: string
          description: >-
            Optional. A convenience shorthand for output dimensions — pass a
            tier ("2K", "4K") or explicit pixels ("2048x2048") and we normalize
            it to the right dimensions for the chosen provider. Interchangeable
            with resolution + aspect_ratio; use those directly for enumerated,
            per-model discoverable values. Conflicting size +
            resolution/aspect_ratio is rejected.
        stream:
          type: boolean
          description: >-
            If true, partial images are streamed as SSE events as they become
            available. Only supported by providers with native streaming
            (currently OpenAI). Non-streaming providers ignore this flag and
            return a buffered response.
      required:
        - model
        - prompt
      description: Image generation request input
      title: ImageGenerationRequest
    ImageGenerationResponseDataItems:
      type: object
      properties:
        b64_json:
          type: string
          description: Base64-encoded image bytes
      required:
        - b64_json
      title: ImageGenerationResponseDataItems
    ImageGenerationUsageCompletionTokensDetails:
      type: object
      properties:
        audio_tokens:
          type:
            - integer
            - 'null'
          description: Tokens generated by the model for audio output.
        image_tokens:
          type:
            - integer
            - 'null'
          description: Tokens generated by the model for image output.
        reasoning_tokens:
          type:
            - integer
            - 'null'
          description: Tokens generated by the model for reasoning.
      title: ImageGenerationUsageCompletionTokensDetails
    CostDetails:
      type: object
      properties:
        upstream_inference_completions_cost:
          type: number
          format: double
        upstream_inference_cost:
          type:
            - number
            - 'null'
          format: double
        upstream_inference_prompt_cost:
          type: number
          format: double
      required:
        - upstream_inference_completions_cost
        - upstream_inference_prompt_cost
      description: Breakdown of upstream inference costs
      title: CostDetails
    AnthropicIterationCacheCreation:
      type: object
      properties:
        ephemeral_1h_input_tokens:
          type: integer
        ephemeral_5m_input_tokens:
          type: integer
      title: AnthropicIterationCacheCreation
    AnthropicCompactionUsageIterationType:
      type: string
      enum:
        - compaction
      title: AnthropicCompactionUsageIterationType
    AnthropicCompactionUsageIteration:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        type:
          $ref: '#/components/schemas/AnthropicCompactionUsageIterationType'
      required:
        - type
      title: AnthropicCompactionUsageIteration
    AnthropicMessageUsageIterationType:
      type: string
      enum:
        - message
      title: AnthropicMessageUsageIterationType
    AnthropicMessageUsageIteration:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        model:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicMessageUsageIterationType'
      required:
        - type
      title: AnthropicMessageUsageIteration
    AnthropicAdvisorMessageUsageIterationType:
      type: string
      enum:
        - advisor_message
      title: AnthropicAdvisorMessageUsageIterationType
    AnthropicAdvisorMessageUsageIteration:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        model:
          type: string
        type:
          $ref: '#/components/schemas/AnthropicAdvisorMessageUsageIterationType'
      required:
        - model
        - type
      title: AnthropicAdvisorMessageUsageIteration
    AnthropicUnknownUsageIteration:
      type: object
      properties:
        cache_creation:
          $ref: '#/components/schemas/AnthropicIterationCacheCreation'
        cache_creation_input_tokens:
          type: integer
        cache_read_input_tokens:
          type: integer
        input_tokens:
          type: integer
        output_tokens:
          type: integer
        type:
          type: string
      required:
        - type
      title: AnthropicUnknownUsageIteration
    AnthropicUsageIteration:
      oneOf:
        - $ref: '#/components/schemas/AnthropicCompactionUsageIteration'
        - $ref: '#/components/schemas/AnthropicMessageUsageIteration'
        - $ref: '#/components/schemas/AnthropicAdvisorMessageUsageIteration'
        - $ref: '#/components/schemas/AnthropicUnknownUsageIteration'
      title: AnthropicUsageIteration
    ImageGenerationUsagePromptTokensDetails:
      type: object
      properties:
        audio_tokens:
          type:
            - integer
            - 'null'
          description: Tokens used for input audio.
        cache_write_tokens:
          type:
            - integer
            - 'null'
          description: >-
            Tokens written to cache. Only returned for models with explicit
            caching and cache write pricing.
        cached_tokens:
          type:
            - integer
            - 'null'
          description: Tokens cached by the endpoint.
        file_tokens:
          type:
            - integer
            - 'null'
          description: Tokens used for input files/documents.
        video_tokens:
          type:
            - integer
            - 'null'
          description: Tokens used for input video.
      description: Breakdown of tokens used in the prompt.
      title: ImageGenerationUsagePromptTokensDetails
    ImageGenerationUsageServerToolUse:
      type: object
      properties:
        tool_calls_executed:
          type:
            - integer
            - 'null'
          description: >-
            Number of OpenRouter server tool calls that executed and produced a
            result.
        tool_calls_requested:
          type:
            - integer
            - 'null'
          description: >-
            Total number of OpenRouter server-orchestrated tool calls the model
            requested, across all tool types. Provider-native tools (e.g. native
            web search) are not counted here.
        web_search_requests:
          type:
            - integer
            - 'null'
          description: >-
            Number of web searches performed by server-side tools. For
            server-orchestrated tool calls a web search is also counted in
            tool_calls_requested; provider-native web search may report
            web_search_requests only. Do not sum the two.
      description: Usage for server-side tool execution (e.g., web search)
      title: ImageGenerationUsageServerToolUse
    AnthropicSpeed:
      type: string
      enum:
        - fast
        - standard
      title: AnthropicSpeed
    ImageGenerationUsage:
      type: object
      properties:
        completion_tokens:
          type: integer
          description: The tokens generated
        completion_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ImageGenerationUsageCompletionTokensDetails'
            - type: 'null'
        cost:
          type:
            - number
            - 'null'
          format: double
          description: Cost of the completion
        cost_details:
          $ref: '#/components/schemas/CostDetails'
        is_byok:
          type: boolean
          description: Whether a request was made using a Bring Your Own Key configuration
        iterations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/AnthropicUsageIteration'
        prompt_tokens:
          type: integer
          description: Including images, input audio, and tools if any
        prompt_tokens_details:
          oneOf:
            - $ref: '#/components/schemas/ImageGenerationUsagePromptTokensDetails'
            - type: 'null'
          description: Breakdown of tokens used in the prompt.
        server_tool_use:
          oneOf:
            - $ref: '#/components/schemas/ImageGenerationUsageServerToolUse'
            - type: 'null'
          description: Usage for server-side tool execution (e.g., web search)
        service_tier:
          type:
            - string
            - 'null'
          description: The service tier used by the upstream provider for this request
        speed:
          $ref: '#/components/schemas/AnthropicSpeed'
        total_tokens:
          type: integer
          description: Sum of the above two fields
      required:
        - completion_tokens
        - prompt_tokens
        - total_tokens
      description: Token and cost usage for the image generation request, when available
      title: ImageGenerationUsage
    ImageGenerationResponse:
      type: object
      properties:
        created:
          type: integer
          description: Unix timestamp (seconds) when the image was generated
        data:
          type: array
          items:
            $ref: '#/components/schemas/ImageGenerationResponseDataItems'
          description: Generated images
        usage:
          $ref: '#/components/schemas/ImageGenerationUsage'
      required:
        - created
        - data
      description: Image generation response
      title: ImageGenerationResponse
    BadRequestResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadRequestResponse
      title: BadRequestResponseErrorData
    BadRequestResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
    UnauthorizedResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    PaymentRequiredResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for PaymentRequiredResponse
      title: PaymentRequiredResponseErrorData
    PaymentRequiredResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
    ForbiddenResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for ForbiddenResponse
      title: ForbiddenResponseErrorData
    ForbiddenResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
    NotFoundResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Not Found - Resource does not exist
      title: NotFoundResponse
    TooManyRequestsResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
    BadGatewayResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadGatewayResponse
      title: BadGatewayResponseErrorData
    BadGatewayResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Gateway - Provider/upstream API failure
      title: BadGatewayResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## Examples



**Request**

```json
{
  "model": "bytedance-seed/seedream-4.5",
  "prompt": "a red panda astronaut floating in space, studio lighting"
}
```

**Response**

```json
{
  "created": 1748372400,
  "data": [
    {
      "b64_json": "<base64-encoded-image>"
    }
  ],
  "usage": {
    "completion_tokens": 4175,
    "prompt_tokens": 0,
    "total_tokens": 4175,
    "cost": 0.04
  }
}
```

**SDK Code**

```python Images_createImages_example
import requests

url = "https://openrouter.ai/api/v1/images"

payload = {
    "model": "bytedance-seed/seedream-4.5",
    "prompt": "a red panda astronaut floating in space, studio lighting"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Images_createImages_example
const url = 'https://openrouter.ai/api/v1/images';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"bytedance-seed/seedream-4.5","prompt":"a red panda astronaut floating in space, studio lighting"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Images_createImages_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/images"

	payload := strings.NewReader("{\n  \"model\": \"bytedance-seed/seedream-4.5\",\n  \"prompt\": \"a red panda astronaut floating in space, studio lighting\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Images_createImages_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/images")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"model\": \"bytedance-seed/seedream-4.5\",\n  \"prompt\": \"a red panda astronaut floating in space, studio lighting\"\n}"

response = http.request(request)
puts response.read_body
```

```java Images_createImages_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/images")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"model\": \"bytedance-seed/seedream-4.5\",\n  \"prompt\": \"a red panda astronaut floating in space, studio lighting\"\n}")
  .asString();
```

```php Images_createImages_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/images', [
  'body' => '{
  "model": "bytedance-seed/seedream-4.5",
  "prompt": "a red panda astronaut floating in space, studio lighting"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Images_createImages_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/images");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"model\": \"bytedance-seed/seedream-4.5\",\n  \"prompt\": \"a red panda astronaut floating in space, studio lighting\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Images_createImages_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "model": "bytedance-seed/seedream-4.5",
  "prompt": "a red panda astronaut floating in space, studio lighting"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/images")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```