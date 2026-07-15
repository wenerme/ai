> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create transcription

> Transcribes audio into text. Accepts base64-encoded audio input as JSON or an OpenAI-style multipart/form-data file upload, and returns the transcribed text.



## OpenAPI

````yaml /openapi/openapi.yaml post /audio/transcriptions
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
  /audio/transcriptions:
    post:
      tags:
        - STT
      summary: Create transcription
      description: >-
        Transcribes audio into text. Accepts base64-encoded audio input as JSON
        or an OpenAI-style multipart/form-data file upload, and returns the
        transcribed text.
      operationId: createAudioTranscriptions
      requestBody:
        content:
          application/json:
            example:
              input_audio:
                data: UklGRiQA...
                format: wav
              language: en
              model: openai/whisper-large-v3
            schema:
              $ref: '#/components/schemas/STTRequest'
          multipart/form-data:
            example:
              file: audio.wav
              language: en
              model: openai/whisper-large-v3
            schema:
              properties:
                file:
                  description: >-
                    The audio file to transcribe. The format is derived from the
                    filename extension or the file part content type. Max 25 MB;
                    send larger files as base64 JSON via input_audio.
                  format: binary
                  type: string
                language:
                  description: The language of the input audio (ISO-639-1).
                  type: string
                model:
                  description: The model to use for transcription.
                  type: string
                response_format:
                  description: >-
                    The response format. "json" (default) returns { text, usage
                    }; "verbose_json" additionally returns task, language,
                    duration, and segment-level timestamps (OpenAI-compatible
                    providers only).
                  enum:
                    - json
                    - verbose_json
                  type: string
                temperature:
                  description: The sampling temperature.
                  type: number
                timestamp_granularities[]:
                  description: >-
                    Timestamp detail levels to include when response_format is
                    "verbose_json". "word" additionally returns word-level
                    timestamps in the words array.
                  items:
                    enum:
                      - word
                      - segment
                    type: string
                  type: array
              required:
                - file
                - model
              type: object
        required: true
      responses:
        '200':
          content:
            application/json:
              example:
                text: Hello, this is a test of OpenAI speech-to-text transcription.
                usage:
                  cost: 0.000508
                  input_tokens: 83
                  output_tokens: 30
                  seconds: 9.2
                  total_tokens: 113
              schema:
                $ref: '#/components/schemas/STTResponse'
          description: Transcription result
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
        '402':
          content:
            application/json:
              example:
                error:
                  code: 402
                  message: >-
                    Insufficient credits. Add more using
                    https://openrouter.ai/credits
              schema:
                $ref: '#/components/schemas/PaymentRequiredResponse'
          description: Payment Required - Insufficient credits or quota to complete request
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
        '429':
          content:
            application/json:
              example:
                error:
                  code: 429
                  message: Rate limit exceeded
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
          description: Too Many Requests - Rate limit exceeded
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
        '502':
          content:
            application/json:
              example:
                error:
                  code: 502
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/BadGatewayResponse'
          description: Bad Gateway - Provider/upstream API failure
        '503':
          content:
            application/json:
              example:
                error:
                  code: 503
                  message: Service temporarily unavailable
              schema:
                $ref: '#/components/schemas/ServiceUnavailableResponse'
          description: Service Unavailable - Service temporarily unavailable
        '524':
          content:
            application/json:
              example:
                error:
                  code: 524
                  message: Request timed out. Please try again later.
              schema:
                $ref: '#/components/schemas/EdgeNetworkTimeoutResponse'
          description: Infrastructure Timeout - Provider request timed out at edge network
        '529':
          content:
            application/json:
              example:
                error:
                  code: 529
                  message: Provider returned error
              schema:
                $ref: '#/components/schemas/ProviderOverloadedResponse'
          description: Provider Overloaded - Provider is temporarily overloaded
components:
  schemas:
    STTRequest:
      description: >-
        Speech-to-text request input. Accepts a JSON body with input_audio
        containing base64-encoded audio.
      example:
        input_audio:
          data: UklGRiQA...
          format: wav
        language: en
        model: openai/whisper-large-v3
      properties:
        input_audio:
          $ref: '#/components/schemas/STTInputAudio'
        language:
          description: >-
            ISO-639-1 language code (e.g., "en", "ja"). Auto-detected if
            omitted.
          example: en
          type: string
        model:
          description: STT model identifier
          example: openai/whisper-large-v3
          type: string
        provider:
          description: Provider-specific passthrough configuration
          properties:
            options:
              $ref: '#/components/schemas/ProviderOptions'
          type: object
        response_format:
          description: >-
            Output format. "json" (default) returns { text, usage }.
            "verbose_json" additionally returns task, language, duration, and
            segment-level timestamps; only supported by OpenAI-compatible
            providers.
          enum:
            - json
            - verbose_json
          example: json
          type: string
        temperature:
          description: Sampling temperature for transcription
          example: 0
          format: double
          type: number
        timestamp_granularities:
          description: >-
            Timestamp detail levels to include when response_format is
            "verbose_json". "segment" returns segment-level timestamps; "word"
            additionally returns word-level timestamps in the words array.
            Ignored unless response_format is "verbose_json".
          example:
            - segment
          items:
            $ref: '#/components/schemas/STTTimestampGranularity'
          type: array
      required:
        - model
        - input_audio
      type: object
    STTResponse:
      description: STT response containing transcribed text and optional usage statistics
      example:
        text: Hello, this is a test of OpenAI speech-to-text transcription.
        usage:
          cost: 0.000508
          input_tokens: 83
          output_tokens: 30
          seconds: 9.2
          total_tokens: 113
      properties:
        duration:
          description: >-
            Duration of the input audio in seconds, present when response_format
            is verbose_json
          example: 9.2
          format: double
          type: number
        language:
          description: >-
            Detected or forced language, present when response_format is
            verbose_json
          example: english
          type: string
        segments:
          description: >-
            Timestamped transcript segments, present when response_format is
            verbose_json
          items:
            $ref: '#/components/schemas/STTSegment'
          type: array
        task:
          description: The task performed, present when response_format is verbose_json
          example: transcribe
          type: string
        text:
          description: The transcribed text
          example: >-
            Hello, this is a test of OpenAI speech-to-text transcription. The
            weather is sunny today and the temperature is around 72 degrees.
          type: string
        usage:
          $ref: '#/components/schemas/STTUsage'
        words:
          description: >-
            Timestamped words, present when the provider returns word-level
            timestamps
          items:
            $ref: '#/components/schemas/STTWord'
          type: array
      required:
        - text
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
    PaymentRequiredResponse:
      description: Payment Required - Insufficient credits or quota to complete request
      example:
        error:
          code: 402
          message: Insufficient credits. Add more using https://openrouter.ai/credits
      properties:
        error:
          $ref: '#/components/schemas/PaymentRequiredResponseErrorData'
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
    TooManyRequestsResponse:
      description: Too Many Requests - Rate limit exceeded
      example:
        error:
          code: 429
          message: Rate limit exceeded
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
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
    BadGatewayResponse:
      description: Bad Gateway - Provider/upstream API failure
      example:
        error:
          code: 502
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/BadGatewayResponseErrorData'
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
    ServiceUnavailableResponse:
      description: Service Unavailable - Service temporarily unavailable
      example:
        error:
          code: 503
          message: Service temporarily unavailable
      properties:
        error:
          $ref: '#/components/schemas/ServiceUnavailableResponseErrorData'
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
    EdgeNetworkTimeoutResponse:
      description: Infrastructure Timeout - Provider request timed out at edge network
      example:
        error:
          code: 524
          message: Request timed out. Please try again later.
      properties:
        error:
          $ref: '#/components/schemas/EdgeNetworkTimeoutResponseErrorData'
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
    ProviderOverloadedResponse:
      description: Provider Overloaded - Provider is temporarily overloaded
      example:
        error:
          code: 529
          message: Provider returned error
      properties:
        error:
          $ref: '#/components/schemas/ProviderOverloadedResponseErrorData'
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
    STTInputAudio:
      description: Base64-encoded audio to transcribe
      example:
        data: UklGRiQA...
        format: wav
      properties:
        data:
          description: Base64-encoded audio data (raw bytes, not a data URI)
          type: string
        format:
          description: >-
            Audio format (e.g., wav, mp3, flac, m4a, ogg, webm, aac). Supported
            formats vary by provider.
          type: string
      required:
        - data
        - format
      type: object
    ProviderOptions:
      description: >-
        Provider-specific options keyed by provider slug. Only options for the
        matched provider are forwarded; the rest are ignored. Unrecognized keys
        are silently dropped.
      example:
        openai:
          max_tokens: 1000
      properties:
        01ai:
          additionalProperties:
            nullable: true
          type: object
        ai21:
          additionalProperties:
            nullable: true
          type: object
        aion-labs:
          additionalProperties:
            nullable: true
          type: object
        akashml:
          additionalProperties:
            nullable: true
          type: object
        alibaba:
          additionalProperties:
            nullable: true
          type: object
        amazon-bedrock:
          additionalProperties:
            nullable: true
          type: object
        amazon-nova:
          additionalProperties:
            nullable: true
          type: object
        ambient:
          additionalProperties:
            nullable: true
          type: object
        anthropic:
          additionalProperties:
            nullable: true
          type: object
        anyscale:
          additionalProperties:
            nullable: true
          type: object
        arcee-ai:
          additionalProperties:
            nullable: true
          type: object
        atlas-cloud:
          additionalProperties:
            nullable: true
          type: object
        atoma:
          additionalProperties:
            nullable: true
          type: object
        avian:
          additionalProperties:
            nullable: true
          type: object
        azure:
          additionalProperties:
            nullable: true
          type: object
        baidu:
          additionalProperties:
            nullable: true
          type: object
        baseten:
          additionalProperties:
            nullable: true
          type: object
        black-forest-labs:
          additionalProperties:
            nullable: true
          type: object
        byteplus:
          additionalProperties:
            nullable: true
          type: object
        centml:
          additionalProperties:
            nullable: true
          type: object
        cerebras:
          additionalProperties:
            nullable: true
          type: object
        chutes:
          additionalProperties:
            nullable: true
          type: object
        cirrascale:
          additionalProperties:
            nullable: true
          type: object
        clarifai:
          additionalProperties:
            nullable: true
          type: object
        cloudflare:
          additionalProperties:
            nullable: true
          type: object
        cohere:
          additionalProperties:
            nullable: true
          type: object
        crofai:
          additionalProperties:
            nullable: true
          type: object
        crucible:
          additionalProperties:
            nullable: true
          type: object
        crusoe:
          additionalProperties:
            nullable: true
          type: object
        darkbloom:
          additionalProperties:
            nullable: true
          type: object
        decart:
          additionalProperties:
            nullable: true
          type: object
        deepgram:
          additionalProperties:
            nullable: true
          type: object
        deepinfra:
          additionalProperties:
            nullable: true
          type: object
        deepseek:
          additionalProperties:
            nullable: true
          type: object
        dekallm:
          additionalProperties:
            nullable: true
          type: object
        digitalocean:
          additionalProperties:
            nullable: true
          type: object
        enfer:
          additionalProperties:
            nullable: true
          type: object
        fake-provider:
          additionalProperties:
            nullable: true
          type: object
        featherless:
          additionalProperties:
            nullable: true
          type: object
        fireworks:
          additionalProperties:
            nullable: true
          type: object
        friendli:
          additionalProperties:
            nullable: true
          type: object
        gmicloud:
          additionalProperties:
            nullable: true
          type: object
        google-ai-studio:
          additionalProperties:
            nullable: true
          type: object
        google-vertex:
          additionalProperties:
            nullable: true
          type: object
        gopomelo:
          additionalProperties:
            nullable: true
          type: object
        groq:
          additionalProperties:
            nullable: true
          type: object
        heygen:
          additionalProperties:
            nullable: true
          type: object
        huggingface:
          additionalProperties:
            nullable: true
          type: object
        hyperbolic:
          additionalProperties:
            nullable: true
          type: object
        hyperbolic-quantized:
          additionalProperties:
            nullable: true
          type: object
        inception:
          additionalProperties:
            nullable: true
          type: object
        inceptron:
          additionalProperties:
            nullable: true
          type: object
        inferact-vllm:
          additionalProperties:
            nullable: true
          type: object
        inference-net:
          additionalProperties:
            nullable: true
          type: object
        infermatic:
          additionalProperties:
            nullable: true
          type: object
        inflection:
          additionalProperties:
            nullable: true
          type: object
        inocloud:
          additionalProperties:
            nullable: true
          type: object
        io-net:
          additionalProperties:
            nullable: true
          type: object
        ionstream:
          additionalProperties:
            nullable: true
          type: object
        klusterai:
          additionalProperties:
            nullable: true
          type: object
        lambda:
          additionalProperties:
            nullable: true
          type: object
        lepton:
          additionalProperties:
            nullable: true
          type: object
        liquid:
          additionalProperties:
            nullable: true
          type: object
        lynn:
          additionalProperties:
            nullable: true
          type: object
        lynn-private:
          additionalProperties:
            nullable: true
          type: object
        mancer:
          additionalProperties:
            nullable: true
          type: object
        mancer-old:
          additionalProperties:
            nullable: true
          type: object
        mara:
          additionalProperties:
            nullable: true
          type: object
        meta:
          additionalProperties:
            nullable: true
          type: object
        minimax:
          additionalProperties:
            nullable: true
          type: object
        mistral:
          additionalProperties:
            nullable: true
          type: object
        modal:
          additionalProperties:
            nullable: true
          type: object
        modelrun:
          additionalProperties:
            nullable: true
          type: object
        modular:
          additionalProperties:
            nullable: true
          type: object
        moonshotai:
          additionalProperties:
            nullable: true
          type: object
        morph:
          additionalProperties:
            nullable: true
          type: object
        ncompass:
          additionalProperties:
            nullable: true
          type: object
        nebius:
          additionalProperties:
            nullable: true
          type: object
        nex-agi:
          additionalProperties:
            nullable: true
          type: object
        nextbit:
          additionalProperties:
            nullable: true
          type: object
        nineteen:
          additionalProperties:
            nullable: true
          type: object
        novita:
          additionalProperties:
            nullable: true
          type: object
        nvidia:
          additionalProperties:
            nullable: true
          type: object
        octoai:
          additionalProperties:
            nullable: true
          type: object
        open-inference:
          additionalProperties:
            nullable: true
          type: object
        openai:
          additionalProperties:
            nullable: true
          type: object
        parasail:
          additionalProperties:
            nullable: true
          type: object
        perceptron:
          additionalProperties:
            nullable: true
          type: object
        perplexity:
          additionalProperties:
            nullable: true
          type: object
        phala:
          additionalProperties:
            nullable: true
          type: object
        poolside:
          additionalProperties:
            nullable: true
          type: object
        quiver:
          additionalProperties:
            nullable: true
          type: object
        recraft:
          additionalProperties:
            nullable: true
          type: object
        recursal:
          additionalProperties:
            nullable: true
          type: object
        reflection:
          additionalProperties:
            nullable: true
          type: object
        reka:
          additionalProperties:
            nullable: true
          type: object
        relace:
          additionalProperties:
            nullable: true
          type: object
        replicate:
          additionalProperties:
            nullable: true
          type: object
        sail-research:
          additionalProperties:
            nullable: true
          type: object
        sakana:
          additionalProperties:
            nullable: true
          type: object
        sambanova:
          additionalProperties:
            nullable: true
          type: object
        sambanova-cloaked:
          additionalProperties:
            nullable: true
          type: object
        seed:
          additionalProperties:
            nullable: true
          type: object
        sf-compute:
          additionalProperties:
            nullable: true
          type: object
        siliconflow:
          additionalProperties:
            nullable: true
          type: object
        sourceful:
          additionalProperties:
            nullable: true
          type: object
        stealth:
          additionalProperties:
            nullable: true
          type: object
        stepfun:
          additionalProperties:
            nullable: true
          type: object
        streamlake:
          additionalProperties:
            nullable: true
          type: object
        switchpoint:
          additionalProperties:
            nullable: true
          type: object
        targon:
          additionalProperties:
            nullable: true
          type: object
        tenstorrent:
          additionalProperties:
            nullable: true
          type: object
        together:
          additionalProperties:
            nullable: true
          type: object
        together-lite:
          additionalProperties:
            nullable: true
          type: object
        ubicloud:
          additionalProperties:
            nullable: true
          type: object
        upstage:
          additionalProperties:
            nullable: true
          type: object
        venice:
          additionalProperties:
            nullable: true
          type: object
        wafer:
          additionalProperties:
            nullable: true
          type: object
        wandb:
          additionalProperties:
            nullable: true
          type: object
        xai:
          additionalProperties:
            nullable: true
          type: object
        xiaomi:
          additionalProperties:
            nullable: true
          type: object
        z-ai:
          additionalProperties:
            nullable: true
          type: object
      type: object
    STTTimestampGranularity:
      description: A timestamp detail level for verbose_json transcription responses.
      enum:
        - word
        - segment
      example: word
      type: string
    STTSegment:
      description: >-
        A timestamped transcript segment, returned when response_format is
        verbose_json
      example:
        avg_logprob: -0.28
        compression_ratio: 1.13
        end: 3.2
        id: 0
        no_speech_prob: 0.01
        seek: 0
        start: 0
        temperature: 0
        text: Hello there.
        tokens:
          - 50364
          - 2425
          - 456
      properties:
        avg_logprob:
          description: Average log probability of the segment
          format: double
          type: number
        compression_ratio:
          description: Compression ratio of the segment
          format: double
          type: number
        end:
          description: Segment end time in seconds
          example: 3.2
          format: double
          type: number
        id:
          description: Segment index within the transcript
          example: 0
          type: integer
        no_speech_prob:
          description: Probability the segment contains no speech
          format: double
          type: number
        seek:
          description: Seek offset of the segment
          example: 0
          type: integer
        start:
          description: Segment start time in seconds
          example: 0
          format: double
          type: number
        temperature:
          description: Temperature used for the segment
          format: double
          type: number
        text:
          description: Transcribed text of the segment
          example: Hello there.
          type: string
        tokens:
          description: Token IDs of the segment
          items:
            type: integer
          type: array
      required:
        - id
        - start
        - end
        - text
      type: object
    STTUsage:
      description: Aggregated usage statistics for the request
      example:
        cost: 0.000508
        input_tokens: 83
        output_tokens: 30
        seconds: 9.2
        total_tokens: 113
      properties:
        cost:
          description: Total cost of the request in USD
          example: 0.000508
          format: double
          type: number
        input_tokens:
          description: Number of input tokens billed for this request
          example: 83
          type: integer
        output_tokens:
          description: Number of output tokens generated
          example: 30
          type: integer
        seconds:
          description: Duration of the input audio in seconds
          example: 9.2
          format: double
          type: number
        total_tokens:
          description: Total number of tokens used (input + output)
          example: 113
          type: integer
      type: object
    STTWord:
      description: >-
        A timestamped word, returned when the provider includes word-level
        timestamps
      example:
        end: 0.4
        start: 0
        word: Hello
      properties:
        end:
          description: Word end time in seconds
          example: 0.4
          format: double
          type: number
        start:
          description: Word start time in seconds
          example: 0
          format: double
          type: number
        word:
          description: The transcribed word
          example: Hello
          type: string
      required:
        - word
        - start
        - end
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
    PaymentRequiredResponseErrorData:
      description: Error data for PaymentRequiredResponse
      example:
        code: 402
        message: Insufficient credits. Add more using https://openrouter.ai/credits
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
          additionalProperties:
            nullable: true
          nullable: true
          type: object
      required:
        - code
        - message
      type: object
    TooManyRequestsResponseErrorData:
      description: Error data for TooManyRequestsResponse
      example:
        code: 429
        message: Rate limit exceeded
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
    BadGatewayResponseErrorData:
      description: Error data for BadGatewayResponse
      example:
        code: 502
        message: Provider returned error
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
    ServiceUnavailableResponseErrorData:
      description: Error data for ServiceUnavailableResponse
      example:
        code: 503
        message: Service temporarily unavailable
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
    EdgeNetworkTimeoutResponseErrorData:
      description: Error data for EdgeNetworkTimeoutResponse
      example:
        code: 524
        message: Request timed out. Please try again later.
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
    ProviderOverloadedResponseErrorData:
      description: Error data for ProviderOverloadedResponse
      example:
        code: 529
        message: Provider returned error
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