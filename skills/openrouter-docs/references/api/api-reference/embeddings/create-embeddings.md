> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Submit an embedding request

POST https://openrouter.ai/api/v1/embeddings
Content-Type: application/json

Submits an embedding request to the embeddings router

Reference: https://openrouter.ai/docs/api/api-reference/embeddings/create-embeddings

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /embeddings:
    post:
      operationId: create-embeddings
      summary: Submit an embedding request
      description: Submits an embedding request to the embeddings router
      tags:
        - subpackage_embeddings
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Embedding response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Embeddings_createEmbeddings_Response_200'
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
        '503':
          description: Service Unavailable - Service temporarily unavailable
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
      requestBody:
        description: Embeddings request input
        content:
          application/json:
            schema:
              type: object
              properties:
                dimensions:
                  type: integer
                  description: The number of dimensions for the output embeddings
                encoding_format:
                  $ref: >-
                    #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaEncodingFormat
                  description: The format of the output embeddings
                input:
                  $ref: >-
                    #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput
                  description: Text, token, or multimodal input(s) to embed
                input_type:
                  type: string
                  description: The type of input (e.g. search_query, search_document)
                model:
                  type: string
                  description: The model to use for embeddings
                provider:
                  $ref: >-
                    #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProvider
                user:
                  type: string
                  description: A unique identifier for the end-user
              required:
                - input
                - model
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaEncodingFormat:
      type: string
      enum:
        - float
        - base64
      description: The format of the output embeddings
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaEncodingFormat
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf0Type:
      type: string
      enum:
        - text
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf0Type
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems0:
      type: object
      properties:
        text:
          type: string
        type:
          $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf0Type
      required:
        - text
        - type
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems0
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1ImageUrl:
      type: object
      properties:
        url:
          type: string
      required:
        - url
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1ImageUrl
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1Type:
      type: string
      enum:
        - image_url
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1Type
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems1:
      type: object
      properties:
        image_url:
          $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1ImageUrl
        type:
          $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItemsOneOf1Type
      required:
        - image_url
        - type
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems1
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems:
      oneOf:
        - $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems0
        - $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems1
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4Items:
      type: object
      properties:
        content:
          type: array
          items:
            $ref: >-
              #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4ItemsContentItems
      required:
        - content
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4Items
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput4:
      type: array
      items:
        $ref: >-
          #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInputOneOf4Items
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput4
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput:
      oneOf:
        - type: string
        - type: array
          items:
            type: string
        - type: array
          items:
            type: number
            format: double
        - type: array
          items:
            type: array
            items:
              type: number
              format: double
        - $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput4
      description: Text, token, or multimodal input(s) to embed
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaInput
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderDataCollection:
      type: string
      enum:
        - deny
        - allow
      description: >-
        Data collection setting. If no available model provider meets the
        requirement, your request will return an error.

        - allow: (default) allow providers which store user data non-transiently
        and may train on it


        - deny: use only providers which do not collect user data.
      title: >-
        EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderDataCollection
    ProviderName:
      type: string
      enum:
        - AkashML
        - AI21
        - AionLabs
        - Alibaba
        - Ambient
        - Baidu
        - Amazon Bedrock
        - Amazon Nova
        - Anthropic
        - Arcee AI
        - AtlasCloud
        - Avian
        - Azure
        - BaseTen
        - BytePlus
        - Black Forest Labs
        - Cerebras
        - Chutes
        - Cirrascale
        - Clarifai
        - Cloudflare
        - Cohere
        - Crusoe
        - DeepInfra
        - DeepSeek
        - DekaLLM
        - Featherless
        - Fireworks
        - Friendli
        - GMICloud
        - Google
        - Google AI Studio
        - Groq
        - Hyperbolic
        - Inception
        - Inceptron
        - InferenceNet
        - Ionstream
        - Infermatic
        - Io Net
        - Inflection
        - Liquid
        - Mara
        - Mancer 2
        - Minimax
        - ModelRun
        - Mistral
        - Modular
        - Moonshot AI
        - Morph
        - NCompass
        - Nebius
        - Nex AGI
        - NextBit
        - Novita
        - Nvidia
        - OpenAI
        - OpenInference
        - Parasail
        - Poolside
        - Perceptron
        - Perplexity
        - Phala
        - Recraft
        - Reka
        - Relace
        - SambaNova
        - Seed
        - SiliconFlow
        - Sourceful
        - StepFun
        - Stealth
        - StreamLake
        - Switchpoint
        - Together
        - Upstage
        - Venice
        - WandB
        - Xiaomi
        - xAI
        - Z.AI
        - FakeProvider
      title: ProviderName
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderIgnoreItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderIgnoreItems
    BigNumberUnion:
      type: string
      description: Price per million prompt tokens
      title: BigNumberUnion
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderMaxPrice:
      type: object
      properties:
        audio:
          $ref: '#/components/schemas/BigNumberUnion'
        completion:
          $ref: '#/components/schemas/BigNumberUnion'
        image:
          $ref: '#/components/schemas/BigNumberUnion'
        prompt:
          $ref: '#/components/schemas/BigNumberUnion'
        request:
          $ref: '#/components/schemas/BigNumberUnion'
      description: >-
        The object specifying the maximum price you want to pay for this
        request. USD price per million tokens, for prompt and completion.
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderMaxPrice
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOnlyItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOnlyItems
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOrderItems:
      oneOf:
        - $ref: '#/components/schemas/ProviderName'
        - type: string
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOrderItems
    PercentileLatencyCutoffs:
      type: object
      properties:
        p50:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p50 latency (seconds)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p75 latency (seconds)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p90 latency (seconds)
        p99:
          type:
            - number
            - 'null'
          format: double
          description: Maximum p99 latency (seconds)
      description: >-
        Percentile-based latency cutoffs. All specified cutoffs must be met for
        an endpoint to be preferred.
      title: PercentileLatencyCutoffs
    PreferredMaxLatency:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileLatencyCutoffs'
        - description: Any type
      description: >-
        Preferred maximum latency (in seconds). Can be a number (applies to p50)
        or an object with percentile-specific cutoffs. Endpoints above the
        threshold(s) may still be used, but are deprioritized in routing. When
        using fallback models, this may cause a fallback model to be used
        instead of the primary model if it meets the threshold.
      title: PreferredMaxLatency
    PercentileThroughputCutoffs:
      type: object
      properties:
        p50:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p50 throughput (tokens/sec)
        p75:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p75 throughput (tokens/sec)
        p90:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p90 throughput (tokens/sec)
        p99:
          type:
            - number
            - 'null'
          format: double
          description: Minimum p99 throughput (tokens/sec)
      description: >-
        Percentile-based throughput cutoffs. All specified cutoffs must be met
        for an endpoint to be preferred.
      title: PercentileThroughputCutoffs
    PreferredMinThroughput:
      oneOf:
        - type: number
          format: double
        - $ref: '#/components/schemas/PercentileThroughputCutoffs'
        - description: Any type
      description: >-
        Preferred minimum throughput (in tokens per second). Can be a number
        (applies to p50) or an object with percentile-specific cutoffs.
        Endpoints below the threshold(s) may still be used, but are
        deprioritized in routing. When using fallback models, this may cause a
        fallback model to be used instead of the primary model if it meets the
        threshold.
      title: PreferredMinThroughput
    Quantization:
      type: string
      enum:
        - int4
        - int8
        - fp4
        - fp6
        - fp8
        - fp16
        - bf16
        - fp32
        - unknown
      title: Quantization
    ProviderSort:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSort
    ProviderSortConfigBy:
      type: string
      enum:
        - price
        - throughput
        - latency
        - exacto
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfigBy
    ProviderSortConfigPartition:
      type: string
      enum:
        - model
        - none
      description: >-
        Partitioning strategy for sorting: "model" (default) groups endpoints by
        model before sorting (fallback models remain fallbacks), "none" sorts
        all endpoints together regardless of model.
      title: ProviderSortConfigPartition
    ProviderSortConfig:
      type: object
      properties:
        by:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigBy'
            - type: 'null'
          description: The provider sorting strategy (price, throughput, latency)
        partition:
          oneOf:
            - $ref: '#/components/schemas/ProviderSortConfigPartition'
            - type: 'null'
          description: >-
            Partitioning strategy for sorting: "model" (default) groups
            endpoints by model before sorting (fallback models remain
            fallbacks), "none" sorts all endpoints together regardless of model.
      description: The provider sorting strategy (price, throughput, latency)
      title: ProviderSortConfig
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderSort:
      oneOf:
        - $ref: '#/components/schemas/ProviderSort'
        - $ref: '#/components/schemas/ProviderSortConfig'
        - description: Any type
      description: >-
        The sorting strategy to use for this request, if "order" is not
        specified. When set, no load balancing is performed.
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderSort
    EmbeddingsPostRequestBodyContentApplicationJsonSchemaProvider:
      type: object
      properties:
        allow_fallbacks:
          type:
            - boolean
            - 'null'
          description: >
            Whether to allow backup providers to serve requests

            - true: (default) when the primary provider (or your custom
            providers in "order") is unavailable, use the next best provider.

            - false: use only the primary/custom provider, and return the
            upstream error if it's unavailable.
        data_collection:
          oneOf:
            - $ref: >-
                #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderDataCollection
            - type: 'null'
          description: >-
            Data collection setting. If no available model provider meets the
            requirement, your request will return an error.

            - allow: (default) allow providers which store user data
            non-transiently and may train on it


            - deny: use only providers which do not collect user data.
        enforce_distillable_text:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only models that allow text
            distillation. When true, only models where the author has allowed
            distillation will be used.
        ignore:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderIgnoreItems
          description: >-
            List of provider slugs to ignore. If provided, this list is merged
            with your account-wide ignored provider settings for this request.
        max_price:
          $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderMaxPrice
          description: >-
            The object specifying the maximum price you want to pay for this
            request. USD price per million tokens, for prompt and completion.
        only:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOnlyItems
          description: >-
            List of provider slugs to allow. If provided, this list is merged
            with your account-wide allowed provider settings for this request.
        order:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderOrderItems
          description: >-
            An ordered list of provider slugs. The router will attempt to use
            the first provider in the subset of this list that supports your
            requested model, and fall back to the next if it is unavailable. If
            no providers are available, the request will fail with an error
            message.
        preferred_max_latency:
          $ref: '#/components/schemas/PreferredMaxLatency'
        preferred_min_throughput:
          $ref: '#/components/schemas/PreferredMinThroughput'
        quantizations:
          type:
            - array
            - 'null'
          items:
            $ref: '#/components/schemas/Quantization'
          description: A list of quantization levels to filter the provider by.
        require_parameters:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to filter providers to only those that support the
            parameters you've provided. If this setting is omitted or set to
            false, then providers will receive only the parameters they support,
            and ignore the rest.
        sort:
          $ref: >-
            #/components/schemas/EmbeddingsPostRequestBodyContentApplicationJsonSchemaProviderSort
          description: >-
            The sorting strategy to use for this request, if "order" is not
            specified. When set, no load balancing is performed.
        zdr:
          type:
            - boolean
            - 'null'
          description: >-
            Whether to restrict routing to only ZDR (Zero Data Retention)
            endpoints. When true, only endpoints that do not retain prompts will
            be used.
      description: Provider routing preferences for the request.
      title: EmbeddingsPostRequestBodyContentApplicationJsonSchemaProvider
    EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsEmbedding:
      oneOf:
        - type: array
          items:
            type: number
            format: double
        - type: string
      description: Embedding vector as an array of floats or a base64 string
      title: EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsEmbedding
    EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsObject:
      type: string
      enum:
        - embedding
      title: EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsObject
    EmbeddingsPostResponsesContentApplicationJsonSchemaDataItems:
      type: object
      properties:
        embedding:
          $ref: >-
            #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsEmbedding
          description: Embedding vector as an array of floats or a base64 string
        index:
          type: integer
          description: Index of the embedding in the input list
        object:
          $ref: >-
            #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaDataItemsObject
      required:
        - embedding
        - object
      description: A single embedding object
      title: EmbeddingsPostResponsesContentApplicationJsonSchemaDataItems
    EmbeddingsPostResponsesContentApplicationJsonSchemaObject:
      type: string
      enum:
        - list
      title: EmbeddingsPostResponsesContentApplicationJsonSchemaObject
    EmbeddingsPostResponsesContentApplicationJsonSchemaUsagePromptTokensDetails:
      type: object
      properties:
        audio_tokens:
          type: integer
          description: Number of audio tokens in the input
        image_tokens:
          type: integer
          description: Number of image tokens in the input
        text_tokens:
          type: integer
          description: Number of text tokens in the input
        video_tokens:
          type: integer
          description: Number of video tokens in the input
      description: >-
        Per-modality token breakdown. Only present when the input contains 2+
        modalities (e.g. text + image) and the upstream provider returns
        modality-level usage data. Only non-zero modality counts are included.
      title: >-
        EmbeddingsPostResponsesContentApplicationJsonSchemaUsagePromptTokensDetails
    EmbeddingsPostResponsesContentApplicationJsonSchemaUsage:
      type: object
      properties:
        cost:
          type: number
          format: double
          description: Cost of the request in credits
        prompt_tokens:
          type: integer
          description: Number of tokens in the input
        prompt_tokens_details:
          $ref: >-
            #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaUsagePromptTokensDetails
          description: >-
            Per-modality token breakdown. Only present when the input contains
            2+ modalities (e.g. text + image) and the upstream provider returns
            modality-level usage data. Only non-zero modality counts are
            included.
        total_tokens:
          type: integer
          description: Total number of tokens used
      required:
        - prompt_tokens
        - total_tokens
      description: Token usage statistics
      title: EmbeddingsPostResponsesContentApplicationJsonSchemaUsage
    Embeddings_createEmbeddings_Response_200:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: >-
              #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaDataItems
          description: List of embedding objects
        id:
          type: string
          description: Unique identifier for the embeddings response
        model:
          type: string
          description: The model used for embeddings
        object:
          $ref: >-
            #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaObject
        usage:
          $ref: >-
            #/components/schemas/EmbeddingsPostResponsesContentApplicationJsonSchemaUsage
          description: Token usage statistics
      required:
        - data
        - model
        - object
      description: Embeddings response containing embedding vectors
      title: Embeddings_createEmbeddings_Response_200
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
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Payment Required - Insufficient credits or quota to complete request
      title: PaymentRequiredResponse
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
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Gateway - Provider/upstream API failure
      title: BadGatewayResponse
    ServiceUnavailableResponseErrorData:
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
      description: Error data for ServiceUnavailableResponse
      title: ServiceUnavailableResponseErrorData
    ServiceUnavailableResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Service Unavailable - Service temporarily unavailable
      title: ServiceUnavailableResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/embeddings"

payload = {
    "input": "The quick brown fox jumps over the lazy dog",
    "model": "openai/text-embedding-3-small",
    "dimensions": 1536
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/embeddings';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"input":"The quick brown fox jumps over the lazy dog","model":"openai/text-embedding-3-small","dimensions":1536}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/embeddings"

	payload := strings.NewReader("{\n  \"input\": \"The quick brown fox jumps over the lazy dog\",\n  \"model\": \"openai/text-embedding-3-small\",\n  \"dimensions\": 1536\n}")

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

```ruby
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/embeddings")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"input\": \"The quick brown fox jumps over the lazy dog\",\n  \"model\": \"openai/text-embedding-3-small\",\n  \"dimensions\": 1536\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/embeddings")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"input\": \"The quick brown fox jumps over the lazy dog\",\n  \"model\": \"openai/text-embedding-3-small\",\n  \"dimensions\": 1536\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/embeddings', [
  'body' => '{
  "input": "The quick brown fox jumps over the lazy dog",
  "model": "openai/text-embedding-3-small",
  "dimensions": 1536
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/embeddings");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"input\": \"The quick brown fox jumps over the lazy dog\",\n  \"model\": \"openai/text-embedding-3-small\",\n  \"dimensions\": 1536\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "input": "The quick brown fox jumps over the lazy dog",
  "model": "openai/text-embedding-3-small",
  "dimensions": 1536
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/embeddings")! as URL,
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