# Completions

## Create

`client.chat.completions.create(ChatCompletionCreateParamsbody, RequestOptionsoptions?): ChatCompletion | Stream<ChatCompletionChunk>`

**post** `/chat/completions`

**Starting a new project?** We recommend trying [Responses](https://platform.openai.com/docs/api-reference/responses)
to take advantage of the latest OpenAI platform features. Compare
[Chat Completions with Responses](https://platform.openai.com/docs/guides/responses-vs-chat-completions?api-mode=responses).

---

Creates a model response for the given chat conversation. Learn more in the
[text generation](https://platform.openai.com/docs/guides/text-generation), [vision](https://platform.openai.com/docs/guides/vision),
and [audio](https://platform.openai.com/docs/guides/audio) guides.

Parameter support can differ depending on the model used to generate the
response, particularly for newer reasoning models. Parameters that are only
supported for reasoning models are noted below. For the current state of
unsupported parameters in reasoning models,
[refer to the reasoning guide](https://platform.openai.com/docs/guides/reasoning).

Returns a chat completion object, or a streamed sequence of chat completion
chunk objects if the request is streamed.

### Parameters

- `ChatCompletionCreateParams = ChatCompletionCreateParamsNonStreaming | ChatCompletionCreateParamsStreaming`

  - `ChatCompletionCreateParamsBase`

    - `messages: Array<ChatCompletionMessageParam>`

      A list of messages comprising the conversation so far. Depending on the
      [model](https://platform.openai.com/docs/models) you use, different message types (modalities) are
      supported, like [text](https://platform.openai.com/docs/guides/text-generation),
      [images](https://platform.openai.com/docs/guides/vision), and [audio](https://platform.openai.com/docs/guides/audio).

      - `ChatCompletionDeveloperMessageParam`

        Developer-provided instructions that the model should follow, regardless of
        messages sent by the user. With o1 models and newer, `developer` messages
        replace the previous `system` messages.

        - `content: string | Array<ChatCompletionContentPartText>`

          The contents of the developer message.

          - `string`

          - `Array<ChatCompletionContentPartText>`

            - `text: string`

              The text content.

            - `type: "text"`

              The type of the content part.

              - `"text"`

        - `role: "developer"`

          The role of the messages author, in this case `developer`.

          - `"developer"`

        - `name?: string`

          An optional name for the participant. Provides the model information to differentiate between participants of the same role.

      - `ChatCompletionSystemMessageParam`

        Developer-provided instructions that the model should follow, regardless of
        messages sent by the user. With o1 models and newer, use `developer` messages
        for this purpose instead.

        - `content: string | Array<ChatCompletionContentPartText>`

          The contents of the system message.

          - `string`

          - `Array<ChatCompletionContentPartText>`

            - `text: string`

              The text content.

            - `type: "text"`

              The type of the content part.

              - `"text"`

        - `role: "system"`

          The role of the messages author, in this case `system`.

          - `"system"`

        - `name?: string`

          An optional name for the participant. Provides the model information to differentiate between participants of the same role.

      - `ChatCompletionUserMessageParam`

        Messages sent by an end user, containing prompts or additional context
        information.

        - `content: string | Array<ChatCompletionContentPart>`

          The contents of the user message.

          - `string`

          - `Array<ChatCompletionContentPart>`

            - `ChatCompletionContentPartText`

              Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

              - `text: string`

                The text content.

              - `type: "text"`

                The type of the content part.

                - `"text"`

            - `ChatCompletionContentPartImage`

              Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

              - `image_url: ImageURL`

                - `url: string`

                  Either a URL of the image or the base64 encoded image data.

                - `detail?: "auto" | "low" | "high"`

                  Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

                  - `"auto"`

                  - `"low"`

                  - `"high"`

              - `type: "image_url"`

                The type of the content part.

                - `"image_url"`

            - `ChatCompletionContentPartInputAudio`

              Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

              - `input_audio: InputAudio`

                - `data: string`

                  Base64 encoded audio data.

                - `format: "wav" | "mp3"`

                  The format of the encoded audio data. Currently supports "wav" and "mp3".

                  - `"wav"`

                  - `"mp3"`

              - `type: "input_audio"`

                The type of the content part. Always `input_audio`.

                - `"input_audio"`

            - `File`

              Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

              - `file: File`

                - `file_data?: string`

                  The base64 encoded file data, used when passing the file to the model
                  as a string.

                - `file_id?: string`

                  The ID of an uploaded file to use as input.

                - `filename?: string`

                  The name of the file, used when passing the file to the model as a
                  string.

              - `type: "file"`

                The type of the content part. Always `file`.

                - `"file"`

        - `role: "user"`

          The role of the messages author, in this case `user`.

          - `"user"`

        - `name?: string`

          An optional name for the participant. Provides the model information to differentiate between participants of the same role.

      - `ChatCompletionAssistantMessageParam`

        Messages sent by the model in response to user messages.

        - `role: "assistant"`

          The role of the messages author, in this case `assistant`.

          - `"assistant"`

        - `audio?: Audio | null`

          Data about a previous audio response from the model.
          [Learn more](https://platform.openai.com/docs/guides/audio).

          - `id: string`

            Unique identifier for a previous audio response from the model.

        - `content?: string | Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal> | null`

          The contents of the assistant message. Required unless `tool_calls` or `function_call` is specified.

          - `string`

          - `Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal>`

            - `ChatCompletionContentPartText`

              Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

              - `text: string`

                The text content.

              - `type: "text"`

                The type of the content part.

                - `"text"`

            - `ChatCompletionContentPartRefusal`

              - `refusal: string`

                The refusal message generated by the model.

              - `type: "refusal"`

                The type of the content part.

                - `"refusal"`

        - `function_call?: FunctionCall | null`

          Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

          - `arguments: string`

            The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

          - `name: string`

            The name of the function to call.

        - `name?: string`

          An optional name for the participant. Provides the model information to differentiate between participants of the same role.

        - `refusal?: string | null`

          The refusal message by the assistant.

        - `tool_calls?: Array<ChatCompletionMessageToolCall>`

          The tool calls generated by the model, such as function calls.

          - `ChatCompletionMessageFunctionToolCall`

            A call to a function tool created by the model.

            - `id: string`

              The ID of the tool call.

            - `function: Function`

              The function that the model called.

              - `arguments: string`

                The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

              - `name: string`

                The name of the function to call.

            - `type: "function"`

              The type of the tool. Currently, only `function` is supported.

              - `"function"`

          - `ChatCompletionMessageCustomToolCall`

            A call to a custom tool created by the model.

            - `id: string`

              The ID of the tool call.

            - `custom: Custom`

              The custom tool that the model called.

              - `input: string`

                The input for the custom tool call generated by the model.

              - `name: string`

                The name of the custom tool to call.

            - `type: "custom"`

              The type of the tool. Always `custom`.

              - `"custom"`

      - `ChatCompletionToolMessageParam`

        - `content: string | Array<ChatCompletionContentPartText>`

          The contents of the tool message.

          - `string`

          - `Array<ChatCompletionContentPartText>`

            - `text: string`

              The text content.

            - `type: "text"`

              The type of the content part.

              - `"text"`

        - `role: "tool"`

          The role of the messages author, in this case `tool`.

          - `"tool"`

        - `tool_call_id: string`

          Tool call that this message is responding to.

      - `ChatCompletionFunctionMessageParam`

        - `content: string | null`

          The contents of the function message.

        - `name: string`

          The name of the function to call.

        - `role: "function"`

          The role of the messages author, in this case `function`.

          - `"function"`

    - `model: (string & {}) | ChatModel`

      Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI
      offers a wide range of models with different capabilities, performance
      characteristics, and price points. Refer to the [model guide](https://platform.openai.com/docs/models)
      to browse and compare available models.

      - `(string & {})`

      - `ChatModel = "gpt-5.4" | "gpt-5.3-chat-latest" | "gpt-5.2" | 71 more`

        - `"gpt-5.4"`

        - `"gpt-5.3-chat-latest"`

        - `"gpt-5.2"`

        - `"gpt-5.2-2025-12-11"`

        - `"gpt-5.2-chat-latest"`

        - `"gpt-5.2-pro"`

        - `"gpt-5.2-pro-2025-12-11"`

        - `"gpt-5.1"`

        - `"gpt-5.1-2025-11-13"`

        - `"gpt-5.1-codex"`

        - `"gpt-5.1-mini"`

        - `"gpt-5.1-chat-latest"`

        - `"gpt-5"`

        - `"gpt-5-mini"`

        - `"gpt-5-nano"`

        - `"gpt-5-2025-08-07"`

        - `"gpt-5-mini-2025-08-07"`

        - `"gpt-5-nano-2025-08-07"`

        - `"gpt-5-chat-latest"`

        - `"gpt-4.1"`

        - `"gpt-4.1-mini"`

        - `"gpt-4.1-nano"`

        - `"gpt-4.1-2025-04-14"`

        - `"gpt-4.1-mini-2025-04-14"`

        - `"gpt-4.1-nano-2025-04-14"`

        - `"o4-mini"`

        - `"o4-mini-2025-04-16"`

        - `"o3"`

        - `"o3-2025-04-16"`

        - `"o3-mini"`

        - `"o3-mini-2025-01-31"`

        - `"o1"`

        - `"o1-2024-12-17"`

        - `"o1-preview"`

        - `"o1-preview-2024-09-12"`

        - `"o1-mini"`

        - `"o1-mini-2024-09-12"`

        - `"gpt-4o"`

        - `"gpt-4o-2024-11-20"`

        - `"gpt-4o-2024-08-06"`

        - `"gpt-4o-2024-05-13"`

        - `"gpt-4o-audio-preview"`

        - `"gpt-4o-audio-preview-2024-10-01"`

        - `"gpt-4o-audio-preview-2024-12-17"`

        - `"gpt-4o-audio-preview-2025-06-03"`

        - `"gpt-4o-mini-audio-preview"`

        - `"gpt-4o-mini-audio-preview-2024-12-17"`

        - `"gpt-4o-search-preview"`

        - `"gpt-4o-mini-search-preview"`

        - `"gpt-4o-search-preview-2025-03-11"`

        - `"gpt-4o-mini-search-preview-2025-03-11"`

        - `"chatgpt-4o-latest"`

        - `"codex-mini-latest"`

        - `"gpt-4o-mini"`

        - `"gpt-4o-mini-2024-07-18"`

        - `"gpt-4-turbo"`

        - `"gpt-4-turbo-2024-04-09"`

        - `"gpt-4-0125-preview"`

        - `"gpt-4-turbo-preview"`

        - `"gpt-4-1106-preview"`

        - `"gpt-4-vision-preview"`

        - `"gpt-4"`

        - `"gpt-4-0314"`

        - `"gpt-4-0613"`

        - `"gpt-4-32k"`

        - `"gpt-4-32k-0314"`

        - `"gpt-4-32k-0613"`

        - `"gpt-3.5-turbo"`

        - `"gpt-3.5-turbo-16k"`

        - `"gpt-3.5-turbo-0301"`

        - `"gpt-3.5-turbo-0613"`

        - `"gpt-3.5-turbo-1106"`

        - `"gpt-3.5-turbo-0125"`

        - `"gpt-3.5-turbo-16k-0613"`

    - `audio?: ChatCompletionAudioParam | null`

      Parameters for audio output. Required when audio output is requested with
      `modalities: ["audio"]`. [Learn more](https://platform.openai.com/docs/guides/audio).

      - `format: "wav" | "aac" | "mp3" | 3 more`

        Specifies the output audio format. Must be one of `wav`, `mp3`, `flac`,
        `opus`, or `pcm16`.

        - `"wav"`

        - `"aac"`

        - `"mp3"`

        - `"flac"`

        - `"opus"`

        - `"pcm16"`

      - `voice: (string & {}) | "alloy" | "ash" | "ballad" | 7 more`

        The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, `shimmer`, `marin`, and `cedar`.

        - `(string & {})`

        - `"alloy" | "ash" | "ballad" | 7 more`

          - `"alloy"`

          - `"ash"`

          - `"ballad"`

          - `"coral"`

          - `"echo"`

          - `"sage"`

          - `"shimmer"`

          - `"verse"`

          - `"marin"`

          - `"cedar"`

    - `frequency_penalty?: number | null`

      Number between -2.0 and 2.0. Positive values penalize new tokens based on
      their existing frequency in the text so far, decreasing the model's
      likelihood to repeat the same line verbatim.

    - `function_call?: "none" | "auto" | ChatCompletionFunctionCallOption`

      Deprecated in favor of `tool_choice`.

      Controls which (if any) function is called by the model.

      `none` means the model will not call a function and instead generates a
      message.

      `auto` means the model can pick between generating a message or calling a
      function.

      Specifying a particular function via `{"name": "my_function"}` forces the
      model to call that function.

      `none` is the default when no functions are present. `auto` is the default
      if functions are present.

      - `"none" | "auto"`

        - `"none"`

        - `"auto"`

      - `ChatCompletionFunctionCallOption`

        Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.

        - `name: string`

          The name of the function to call.

    - `functions?: Array<Function>`

      Deprecated in favor of `tools`.

      A list of functions the model may generate JSON inputs for.

      - `name: string`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description?: string`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters?: FunctionParameters`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

    - `logit_bias?: Record<string, number> | null`

      Modify the likelihood of specified tokens appearing in the completion.

      Accepts a JSON object that maps tokens (specified by their token ID in the
      tokenizer) to an associated bias value from -100 to 100. Mathematically,
      the bias is added to the logits generated by the model prior to sampling.
      The exact effect will vary per model, but values between -1 and 1 should
      decrease or increase likelihood of selection; values like -100 or 100
      should result in a ban or exclusive selection of the relevant token.

    - `logprobs?: boolean | null`

      Whether to return log probabilities of the output tokens or not. If true,
      returns the log probabilities of each output token returned in the
      `content` of `message`.

    - `max_completion_tokens?: number | null`

      An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and [reasoning tokens](https://platform.openai.com/docs/guides/reasoning).

    - `max_tokens?: number | null`

      The maximum number of [tokens](/tokenizer) that can be generated in the
      chat completion. This value can be used to control
      [costs](https://openai.com/api/pricing/) for text generated via API.

      This value is now deprecated in favor of `max_completion_tokens`, and is
      not compatible with [o-series models](https://platform.openai.com/docs/guides/reasoning).

    - `metadata?: Metadata | null`

      Set of 16 key-value pairs that can be attached to an object. This can be
      useful for storing additional information about the object in a structured
      format, and querying for objects via API or the dashboard.

      Keys are strings with a maximum length of 64 characters. Values are strings
      with a maximum length of 512 characters.

    - `modalities?: Array<"text" | "audio"> | null`

      Output types that you would like the model to generate.
      Most models are capable of generating text, which is the default:

      `["text"]`

      The `gpt-4o-audio-preview` model can also be used to
      [generate audio](https://platform.openai.com/docs/guides/audio). To request that this model generate
      both text and audio responses, you can use:

      `["text", "audio"]`

      - `"text"`

      - `"audio"`

    - `n?: number | null`

      How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep `n` as `1` to minimize costs.

    - `parallel_tool_calls?: boolean`

      Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

    - `prediction?: ChatCompletionPredictionContent | null`

      Static predicted output content, such as the content of a text file that is
      being regenerated.

      - `content: string | Array<ChatCompletionContentPartText>`

        The content that should be matched when generating a model response.
        If generated tokens would match this content, the entire model response
        can be returned much more quickly.

        - `string`

        - `Array<ChatCompletionContentPartText>`

          - `text: string`

            The text content.

          - `type: "text"`

            The type of the content part.

            - `"text"`

      - `type: "content"`

        The type of the predicted content you want to provide. This type is
        currently always `content`.

        - `"content"`

    - `presence_penalty?: number | null`

      Number between -2.0 and 2.0. Positive values penalize new tokens based on
      whether they appear in the text so far, increasing the model's likelihood
      to talk about new topics.

    - `prompt_cache_key?: string`

      Used by OpenAI to cache responses for similar requests to optimize your cache hit rates. Replaces the `user` field. [Learn more](https://platform.openai.com/docs/guides/prompt-caching).

    - `prompt_cache_retention?: "in-memory" | "24h" | null`

      The retention policy for the prompt cache. Set to `24h` to enable extended prompt caching, which keeps cached prefixes active for longer, up to a maximum of 24 hours. [Learn more](https://platform.openai.com/docs/guides/prompt-caching#prompt-cache-retention).

      - `"in-memory"`

      - `"24h"`

    - `reasoning_effort?: ReasoningEffort | null`

      Constrains effort on reasoning for
      [reasoning models](https://platform.openai.com/docs/guides/reasoning).
      Currently supported values are `none`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Reducing
      reasoning effort can result in faster responses and fewer tokens used
      on reasoning in a response.

      - `gpt-5.1` defaults to `none`, which does not perform reasoning. The supported reasoning values for `gpt-5.1` are `none`, `low`, `medium`, and `high`. Tool calls are supported for all reasoning values in gpt-5.1.
      - All models before `gpt-5.1` default to `medium` reasoning effort, and do not support `none`.
      - The `gpt-5-pro` model defaults to (and only supports) `high` reasoning effort.
      - `xhigh` is supported for all models after `gpt-5.1-codex-max`.

      - `"none"`

      - `"minimal"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"xhigh"`

    - `response_format?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject`

      An object specifying the format that the model must output.

      Setting to `{ "type": "json_schema", "json_schema": {...} }` enables
      Structured Outputs which ensures the model will match your supplied JSON
      schema. Learn more in the [Structured Outputs
      guide](https://platform.openai.com/docs/guides/structured-outputs).

      Setting to `{ "type": "json_object" }` enables the older JSON mode, which
      ensures the message the model generates is valid JSON. Using `json_schema`
      is preferred for models that support it.

      - `ResponseFormatText`

        Default response format. Used to generate text responses.

        - `type: "text"`

          The type of response format being defined. Always `text`.

          - `"text"`

      - `ResponseFormatJSONSchema`

        JSON Schema response format. Used to generate structured JSON responses.
        Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

        - `json_schema: JSONSchema`

          Structured Outputs configuration options, including a JSON Schema.

          - `name: string`

            The name of the response format. Must be a-z, A-Z, 0-9, or contain
            underscores and dashes, with a maximum length of 64.

          - `description?: string`

            A description of what the response format is for, used by the model to
            determine how to respond in the format.

          - `schema?: Record<string, unknown>`

            The schema for the response format, described as a JSON Schema object.
            Learn how to build JSON schemas [here](https://json-schema.org/).

          - `strict?: boolean | null`

            Whether to enable strict schema adherence when generating the output.
            If set to true, the model will always follow the exact schema defined
            in the `schema` field. Only a subset of JSON Schema is supported when
            `strict` is `true`. To learn more, read the [Structured Outputs
            guide](https://platform.openai.com/docs/guides/structured-outputs).

        - `type: "json_schema"`

          The type of response format being defined. Always `json_schema`.

          - `"json_schema"`

      - `ResponseFormatJSONObject`

        JSON object response format. An older method of generating JSON responses.
        Using `json_schema` is recommended for models that support it. Note that the
        model will not generate JSON without a system or user message instructing it
        to do so.

        - `type: "json_object"`

          The type of response format being defined. Always `json_object`.

          - `"json_object"`

    - `safety_identifier?: string`

      A stable identifier used to help detect users of your application that may be violating OpenAI's usage policies.
      The IDs should be a string that uniquely identifies each user, with a maximum length of 64 characters. We recommend hashing their username or email address, in order to avoid sending us any identifying information. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#safety-identifiers).

    - `seed?: number | null`

      This feature is in Beta.
      If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result.
      Determinism is not guaranteed, and you should refer to the `system_fingerprint` response parameter to monitor changes in the backend.

    - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

      Specifies the processing type used for serving the request.

      - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
      - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
      - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
      - When not set, the default behavior is 'auto'.

      When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

      - `"auto"`

      - `"default"`

      - `"flex"`

      - `"scale"`

      - `"priority"`

    - `stop?: string | null | Array<string>`

      Not supported with latest reasoning models `o3` and `o4-mini`.

      Up to 4 sequences where the API will stop generating further tokens. The
      returned text will not contain the stop sequence.

      - `string | null`

      - `Array<string>`

    - `store?: boolean | null`

      Whether or not to store the output of this chat completion request for
      use in our [model distillation](https://platform.openai.com/docs/guides/distillation) or
      [evals](https://platform.openai.com/docs/guides/evals) products.

      Supports text and image inputs. Note: image inputs over 8MB will be dropped.

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
      for more information, along with the [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
      guide for more information on how to handle the streaming events.

      - `false`

    - `stream_options?: ChatCompletionStreamOptions | null`

      Options for streaming response. Only set this when you set `stream: true`.

      - `include_obfuscation?: boolean`

        When true, stream obfuscation will be enabled. Stream obfuscation adds
        random characters to an `obfuscation` field on streaming delta events to
        normalize payload sizes as a mitigation to certain side-channel attacks.
        These obfuscation fields are included by default, but add a small amount
        of overhead to the data stream. You can set `include_obfuscation` to
        false to optimize for bandwidth if you trust the network links between
        your application and the OpenAI API.

      - `include_usage?: boolean`

        If set, an additional chunk will be streamed before the `data: [DONE]`
        message. The `usage` field on this chunk shows the token usage statistics
        for the entire request, and the `choices` field will always be an empty
        array.

        All other chunks will also include a `usage` field, but with a null
        value. **NOTE:** If the stream is interrupted, you may not receive the
        final usage chunk which contains the total token usage for the request.

    - `temperature?: number | null`

      What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
      We generally recommend altering this or `top_p` but not both.

    - `tool_choice?: ChatCompletionToolChoiceOption`

      Controls which (if any) tool is called by the model.
      `none` means the model will not call any tool and instead generates a message.
      `auto` means the model can pick between generating a message or calling one or more tools.
      `required` means the model must call one or more tools.
      Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

      `none` is the default when no tools are present. `auto` is the default if tools are present.

      - `"none" | "auto" | "required"`

        - `"none"`

        - `"auto"`

        - `"required"`

      - `ChatCompletionAllowedToolChoice`

        Constrains the tools available to the model to a pre-defined set.

        - `allowed_tools: ChatCompletionAllowedTools`

          Constrains the tools available to the model to a pre-defined set.

          - `mode: "auto" | "required"`

            Constrains the tools available to the model to a pre-defined set.

            `auto` allows the model to pick from among the allowed tools and generate a
            message.

            `required` requires the model to call one or more of the allowed tools.

            - `"auto"`

            - `"required"`

          - `tools: Array<Record<string, unknown>>`

            A list of tool definitions that the model should be allowed to call.

            For the Chat Completions API, the list of tool definitions might look like:

            ```json
            [
              { "type": "function", "function": { "name": "get_weather" } },
              { "type": "function", "function": { "name": "get_time" } }
            ]
            ```

        - `type: "allowed_tools"`

          Allowed tool configuration type. Always `allowed_tools`.

          - `"allowed_tools"`

      - `ChatCompletionNamedToolChoice`

        Specifies a tool the model should use. Use to force the model to call a specific function.

        - `function: Function`

          - `name: string`

            The name of the function to call.

        - `type: "function"`

          For function calling, the type is always `function`.

          - `"function"`

      - `ChatCompletionNamedToolChoiceCustom`

        Specifies a tool the model should use. Use to force the model to call a specific custom tool.

        - `custom: Custom`

          - `name: string`

            The name of the custom tool to call.

        - `type: "custom"`

          For custom tool calling, the type is always `custom`.

          - `"custom"`

    - `tools?: Array<ChatCompletionTool>`

      A list of tools the model may call. You can provide either
      [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools) or
      [function tools](https://platform.openai.com/docs/guides/function-calling).

      - `ChatCompletionFunctionTool`

        A function tool that can be used to generate a response.

        - `function: FunctionDefinition`

          - `name: string`

            The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

          - `description?: string`

            A description of what the function does, used by the model to choose when and how to call the function.

          - `parameters?: FunctionParameters`

            The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

            Omitting `parameters` defines a function with an empty parameter list.

          - `strict?: boolean | null`

            Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

        - `type: "function"`

          The type of the tool. Currently, only `function` is supported.

          - `"function"`

      - `ChatCompletionCustomTool`

        A custom tool that processes input using a specified format.

        - `custom: Custom`

          Properties of the custom tool.

          - `name: string`

            The name of the custom tool, used to identify it in tool calls.

          - `description?: string`

            Optional description of the custom tool, used to provide more context.

          - `format?: Text | Grammar`

            The input format for the custom tool. Default is unconstrained text.

            - `Text`

              Unconstrained free-form text.

              - `type: "text"`

                Unconstrained text format. Always `text`.

                - `"text"`

            - `Grammar`

              A grammar defined by the user.

              - `grammar: Grammar`

                Your chosen grammar.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

              - `type: "grammar"`

                Grammar format. Always `grammar`.

                - `"grammar"`

        - `type: "custom"`

          The type of the custom tool. Always `custom`.

          - `"custom"`

    - `top_logprobs?: number | null`

      An integer between 0 and 20 specifying the number of most likely tokens to
      return at each token position, each with an associated log probability.
      `logprobs` must be set to `true` if this parameter is used.

    - `top_p?: number | null`

      An alternative to sampling with temperature, called nucleus sampling,
      where the model considers the results of the tokens with top_p probability
      mass. So 0.1 means only the tokens comprising the top 10% probability mass
      are considered.

      We generally recommend altering this or `temperature` but not both.

    - `user?: string`

      This field is being replaced by `safety_identifier` and `prompt_cache_key`. Use `prompt_cache_key` instead to maintain caching optimizations.
      A stable identifier for your end-users.
      Used to boost cache hit rates by better bucketing similar requests and  to help OpenAI detect and prevent abuse. [Learn more](https://platform.openai.com/docs/guides/safety-best-practices#safety-identifiers).

    - `verbosity?: "low" | "medium" | "high" | null`

      Constrains the verbosity of the model's response. Lower values will result in
      more concise responses, while higher values will result in more verbose responses.
      Currently supported values are `low`, `medium`, and `high`.

      - `"low"`

      - `"medium"`

      - `"high"`

    - `web_search_options?: WebSearchOptions`

      This tool searches the web for relevant results to use in a response.
      Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

      - `search_context_size?: "low" | "medium" | "high"`

        High level guidance for the amount of context window space to use for the
        search. One of `low`, `medium`, or `high`. `medium` is the default.

        - `"low"`

        - `"medium"`

        - `"high"`

      - `user_location?: UserLocation | null`

        Approximate location parameters for the search.

        - `approximate: Approximate`

          Approximate location parameters for the search.

          - `city?: string`

            Free text input for the city of the user, e.g. `San Francisco`.

          - `country?: string`

            The two-letter
            [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user,
            e.g. `US`.

          - `region?: string`

            Free text input for the region of the user, e.g. `California`.

          - `timezone?: string`

            The [IANA timezone](https://timeapi.io/documentation/iana-timezones)
            of the user, e.g. `America/Los_Angeles`.

        - `type: "approximate"`

          The type of location approximation. Always `approximate`.

          - `"approximate"`

  - `ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase`

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
      for more information, along with the [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
      guide for more information on how to handle the streaming events.

      - `false`

  - `ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase`

    - `stream?: false | null`

      If set to true, the model response data will be streamed to the client
      as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
      See the [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
      for more information, along with the [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
      guide for more information on how to handle the streaming events.

      - `false`

### Returns

- `ChatCompletion`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: string`

    A unique identifier for the chat completion.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: string | null`

        The contents of the message.

      - `refusal: string | null`

        The refusal message generated by the model.

      - `role: "assistant"`

        The role of the author of this message.

        - `"assistant"`

      - `annotations?: Array<Annotation>`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: "url_citation"`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: URLCitation`

          A URL citation when using web search.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `url: string`

            The URL of the web resource.

      - `audio?: ChatCompletionAudio | null`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: string`

          Unique identifier for this audio response.

        - `data: string`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: number`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: string`

          Transcript of the audio generated by the model.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `tool_calls?: Array<ChatCompletionMessageToolCall>`

        The tool calls generated by the model, such as function calls.

        - `ChatCompletionMessageFunctionToolCall`

          A call to a function tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: string`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: string`

              The name of the function to call.

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `ChatCompletionMessageCustomToolCall`

          A call to a custom tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: string`

              The input for the custom tool call generated by the model.

            - `name: string`

              The name of the custom tool to call.

          - `type: "custom"`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: string`

    The model used for the chat completion.

  - `object: "chat.completion"`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage`

    Usage statistics for the completion request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatCompletion = await client.chat.completions.create({
  messages: [{ content: 'string', role: 'developer' }],
  model: 'gpt-5.4',
});

console.log(chatCompletion);
```

## List

`client.chat.completions.list(ChatCompletionListParamsquery?, RequestOptionsoptions?): CursorPage<ChatCompletion>`

**get** `/chat/completions`

List stored Chat Completions. Only Chat Completions that have been stored
with the `store` parameter set to `true` will be returned.

### Parameters

- `query: ChatCompletionListParams`

  - `after?: string`

    Identifier for the last chat completion from the previous pagination request.

  - `limit?: number`

    Number of Chat Completions to retrieve.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model?: string`

    The model used to generate the Chat Completions.

  - `order?: "asc" | "desc"`

    Sort order for Chat Completions by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

### Returns

- `ChatCompletion`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: string`

    A unique identifier for the chat completion.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: string | null`

        The contents of the message.

      - `refusal: string | null`

        The refusal message generated by the model.

      - `role: "assistant"`

        The role of the author of this message.

        - `"assistant"`

      - `annotations?: Array<Annotation>`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: "url_citation"`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: URLCitation`

          A URL citation when using web search.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `url: string`

            The URL of the web resource.

      - `audio?: ChatCompletionAudio | null`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: string`

          Unique identifier for this audio response.

        - `data: string`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: number`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: string`

          Transcript of the audio generated by the model.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `tool_calls?: Array<ChatCompletionMessageToolCall>`

        The tool calls generated by the model, such as function calls.

        - `ChatCompletionMessageFunctionToolCall`

          A call to a function tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: string`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: string`

              The name of the function to call.

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `ChatCompletionMessageCustomToolCall`

          A call to a custom tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: string`

              The input for the custom tool call generated by the model.

            - `name: string`

              The name of the custom tool to call.

          - `type: "custom"`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: string`

    The model used for the chat completion.

  - `object: "chat.completion"`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage`

    Usage statistics for the completion request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const chatCompletion of client.chat.completions.list()) {
  console.log(chatCompletion.id);
}
```

## Retrieve

`client.chat.completions.retrieve(stringcompletionID, RequestOptionsoptions?): ChatCompletion`

**get** `/chat/completions/{completion_id}`

Get a stored chat completion. Only Chat Completions that have been created
with the `store` parameter set to `true` will be returned.

### Parameters

- `completionID: string`

### Returns

- `ChatCompletion`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: string`

    A unique identifier for the chat completion.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: string | null`

        The contents of the message.

      - `refusal: string | null`

        The refusal message generated by the model.

      - `role: "assistant"`

        The role of the author of this message.

        - `"assistant"`

      - `annotations?: Array<Annotation>`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: "url_citation"`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: URLCitation`

          A URL citation when using web search.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `url: string`

            The URL of the web resource.

      - `audio?: ChatCompletionAudio | null`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: string`

          Unique identifier for this audio response.

        - `data: string`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: number`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: string`

          Transcript of the audio generated by the model.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `tool_calls?: Array<ChatCompletionMessageToolCall>`

        The tool calls generated by the model, such as function calls.

        - `ChatCompletionMessageFunctionToolCall`

          A call to a function tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: string`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: string`

              The name of the function to call.

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `ChatCompletionMessageCustomToolCall`

          A call to a custom tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: string`

              The input for the custom tool call generated by the model.

            - `name: string`

              The name of the custom tool to call.

          - `type: "custom"`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: string`

    The model used for the chat completion.

  - `object: "chat.completion"`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage`

    Usage statistics for the completion request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatCompletion = await client.chat.completions.retrieve('completion_id');

console.log(chatCompletion.id);
```

## Update

`client.chat.completions.update(stringcompletionID, ChatCompletionUpdateParamsbody, RequestOptionsoptions?): ChatCompletion`

**post** `/chat/completions/{completion_id}`

Modify a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be modified. Currently,
the only supported modification is to update the `metadata` field.

### Parameters

- `completionID: string`

- `body: ChatCompletionUpdateParams`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

### Returns

- `ChatCompletion`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: string`

    A unique identifier for the chat completion.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: string | null`

        The contents of the message.

      - `refusal: string | null`

        The refusal message generated by the model.

      - `role: "assistant"`

        The role of the author of this message.

        - `"assistant"`

      - `annotations?: Array<Annotation>`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: "url_citation"`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: URLCitation`

          A URL citation when using web search.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `url: string`

            The URL of the web resource.

      - `audio?: ChatCompletionAudio | null`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: string`

          Unique identifier for this audio response.

        - `data: string`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: number`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: string`

          Transcript of the audio generated by the model.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `tool_calls?: Array<ChatCompletionMessageToolCall>`

        The tool calls generated by the model, such as function calls.

        - `ChatCompletionMessageFunctionToolCall`

          A call to a function tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: string`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: string`

              The name of the function to call.

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `ChatCompletionMessageCustomToolCall`

          A call to a custom tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: string`

              The input for the custom tool call generated by the model.

            - `name: string`

              The name of the custom tool to call.

          - `type: "custom"`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: string`

    The model used for the chat completion.

  - `object: "chat.completion"`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage`

    Usage statistics for the completion request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatCompletion = await client.chat.completions.update('completion_id', {
  metadata: { foo: 'string' },
});

console.log(chatCompletion.id);
```

## Delete

`client.chat.completions.delete(stringcompletionID, RequestOptionsoptions?): ChatCompletionDeleted`

**delete** `/chat/completions/{completion_id}`

Delete a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be deleted.

### Parameters

- `completionID: string`

### Returns

- `ChatCompletionDeleted`

  - `id: string`

    The ID of the chat completion that was deleted.

  - `deleted: boolean`

    Whether the chat completion was deleted.

  - `object: "chat.completion.deleted"`

    The type of object being deleted.

    - `"chat.completion.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatCompletionDeleted = await client.chat.completions.delete('completion_id');

console.log(chatCompletionDeleted.id);
```

## Domain Types

### Chat Completion

- `ChatCompletion`

  Represents a chat completion response returned by model, based on the provided input.

  - `id: string`

    A unique identifier for the chat completion.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can be more than one if `n` is greater than 1.

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

    - `message: ChatCompletionMessage`

      A chat completion message generated by the model.

      - `content: string | null`

        The contents of the message.

      - `refusal: string | null`

        The refusal message generated by the model.

      - `role: "assistant"`

        The role of the author of this message.

        - `"assistant"`

      - `annotations?: Array<Annotation>`

        Annotations for the message, when applicable, as when using the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

        - `type: "url_citation"`

          The type of the URL citation. Always `url_citation`.

          - `"url_citation"`

        - `url_citation: URLCitation`

          A URL citation when using web search.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `url: string`

            The URL of the web resource.

      - `audio?: ChatCompletionAudio | null`

        If the audio output modality is requested, this object contains data
        about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

        - `id: string`

          Unique identifier for this audio response.

        - `data: string`

          Base64 encoded audio bytes generated by the model, in the format
          specified in the request.

        - `expires_at: number`

          The Unix timestamp (in seconds) for when this audio response will
          no longer be accessible on the server for use in multi-turn
          conversations.

        - `transcript: string`

          Transcript of the audio generated by the model.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `tool_calls?: Array<ChatCompletionMessageToolCall>`

        The tool calls generated by the model, such as function calls.

        - `ChatCompletionMessageFunctionToolCall`

          A call to a function tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `function: Function`

            The function that the model called.

            - `arguments: string`

              The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

            - `name: string`

              The name of the function to call.

          - `type: "function"`

            The type of the tool. Currently, only `function` is supported.

            - `"function"`

        - `ChatCompletionMessageCustomToolCall`

          A call to a custom tool created by the model.

          - `id: string`

            The ID of the tool call.

          - `custom: Custom`

            The custom tool that the model called.

            - `input: string`

              The input for the custom tool call generated by the model.

            - `name: string`

              The name of the custom tool to call.

          - `type: "custom"`

            The type of the tool. Always `custom`.

            - `"custom"`

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created.

  - `model: string`

    The model used for the chat completion.

  - `object: "chat.completion"`

    The object type, which is always `chat.completion`.

    - `"chat.completion"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.

    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage`

    Usage statistics for the completion request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Chat Completion Allowed Tool Choice

- `ChatCompletionAllowedToolChoice`

  Constrains the tools available to the model to a pre-defined set.

  - `allowed_tools: ChatCompletionAllowedTools`

    Constrains the tools available to the model to a pre-defined set.

    - `mode: "auto" | "required"`

      Constrains the tools available to the model to a pre-defined set.

      `auto` allows the model to pick from among the allowed tools and generate a
      message.

      `required` requires the model to call one or more of the allowed tools.

      - `"auto"`

      - `"required"`

    - `tools: Array<Record<string, unknown>>`

      A list of tool definitions that the model should be allowed to call.

      For the Chat Completions API, the list of tool definitions might look like:

      ```json
      [
        { "type": "function", "function": { "name": "get_weather" } },
        { "type": "function", "function": { "name": "get_time" } }
      ]
      ```

  - `type: "allowed_tools"`

    Allowed tool configuration type. Always `allowed_tools`.

    - `"allowed_tools"`

### Chat Completion Assistant Message Param

- `ChatCompletionAssistantMessageParam`

  Messages sent by the model in response to user messages.

  - `role: "assistant"`

    The role of the messages author, in this case `assistant`.

    - `"assistant"`

  - `audio?: Audio | null`

    Data about a previous audio response from the model.
    [Learn more](https://platform.openai.com/docs/guides/audio).

    - `id: string`

      Unique identifier for a previous audio response from the model.

  - `content?: string | Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal> | null`

    The contents of the assistant message. Required unless `tool_calls` or `function_call` is specified.

    - `string`

    - `Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal>`

      - `ChatCompletionContentPartText`

        Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

        - `text: string`

          The text content.

        - `type: "text"`

          The type of the content part.

          - `"text"`

      - `ChatCompletionContentPartRefusal`

        - `refusal: string`

          The refusal message generated by the model.

        - `type: "refusal"`

          The type of the content part.

          - `"refusal"`

  - `function_call?: FunctionCall | null`

    Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

    - `arguments: string`

      The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

    - `name: string`

      The name of the function to call.

  - `name?: string`

    An optional name for the participant. Provides the model information to differentiate between participants of the same role.

  - `refusal?: string | null`

    The refusal message by the assistant.

  - `tool_calls?: Array<ChatCompletionMessageToolCall>`

    The tool calls generated by the model, such as function calls.

    - `ChatCompletionMessageFunctionToolCall`

      A call to a function tool created by the model.

      - `id: string`

        The ID of the tool call.

      - `function: Function`

        The function that the model called.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `type: "function"`

        The type of the tool. Currently, only `function` is supported.

        - `"function"`

    - `ChatCompletionMessageCustomToolCall`

      A call to a custom tool created by the model.

      - `id: string`

        The ID of the tool call.

      - `custom: Custom`

        The custom tool that the model called.

        - `input: string`

          The input for the custom tool call generated by the model.

        - `name: string`

          The name of the custom tool to call.

      - `type: "custom"`

        The type of the tool. Always `custom`.

        - `"custom"`

### Chat Completion Audio

- `ChatCompletionAudio`

  If the audio output modality is requested, this object contains data
  about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

  - `id: string`

    Unique identifier for this audio response.

  - `data: string`

    Base64 encoded audio bytes generated by the model, in the format
    specified in the request.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when this audio response will
    no longer be accessible on the server for use in multi-turn
    conversations.

  - `transcript: string`

    Transcript of the audio generated by the model.

### Chat Completion Audio Param

- `ChatCompletionAudioParam`

  Parameters for audio output. Required when audio output is requested with
  `modalities: ["audio"]`. [Learn more](https://platform.openai.com/docs/guides/audio).

  - `format: "wav" | "aac" | "mp3" | 3 more`

    Specifies the output audio format. Must be one of `wav`, `mp3`, `flac`,
    `opus`, or `pcm16`.

    - `"wav"`

    - `"aac"`

    - `"mp3"`

    - `"flac"`

    - `"opus"`

    - `"pcm16"`

  - `voice: (string & {}) | "alloy" | "ash" | "ballad" | 7 more`

    The voice the model uses to respond. Supported built-in voices are `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, `shimmer`, `marin`, and `cedar`.

    - `(string & {})`

    - `"alloy" | "ash" | "ballad" | 7 more`

      - `"alloy"`

      - `"ash"`

      - `"ballad"`

      - `"coral"`

      - `"echo"`

      - `"sage"`

      - `"shimmer"`

      - `"verse"`

      - `"marin"`

      - `"cedar"`

### Chat Completion Chunk

- `ChatCompletionChunk`

  Represents a streamed chunk of a chat completion response returned
  by the model, based on the provided input.
  [Learn more](https://platform.openai.com/docs/guides/streaming-responses).

  - `id: string`

    A unique identifier for the chat completion. Each chunk has the same ID.

  - `choices: Array<Choice>`

    A list of chat completion choices. Can contain more than one elements if `n` is greater than 1. Can also be empty for the
    last chunk if you set `stream_options: {"include_usage": true}`.

    - `delta: Delta`

      A chat completion delta generated by streamed model responses.

      - `content?: string | null`

        The contents of the chunk message.

      - `function_call?: FunctionCall`

        Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

        - `arguments?: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name?: string`

          The name of the function to call.

      - `refusal?: string | null`

        The refusal message generated by the model.

      - `role?: "developer" | "system" | "user" | 2 more`

        The role of the author of this message.

        - `"developer"`

        - `"system"`

        - `"user"`

        - `"assistant"`

        - `"tool"`

      - `tool_calls?: Array<ToolCall>`

        - `index: number`

        - `id?: string`

          The ID of the tool call.

        - `function?: Function`

          - `arguments?: string`

            The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

          - `name?: string`

            The name of the function to call.

        - `type?: "function"`

          The type of the tool. Currently, only `function` is supported.

          - `"function"`

    - `finish_reason: "stop" | "length" | "tool_calls" | 2 more | null`

      The reason the model stopped generating tokens. This will be `stop` if the model hit a natural stop point or a provided stop sequence,
      `length` if the maximum number of tokens specified in the request was reached,
      `content_filter` if content was omitted due to a flag from our content filters,
      `tool_calls` if the model called a tool, or `function_call` (deprecated) if the model called a function.

      - `"stop"`

      - `"length"`

      - `"tool_calls"`

      - `"content_filter"`

      - `"function_call"`

    - `index: number`

      The index of the choice in the list of choices.

    - `logprobs?: Logprobs | null`

      Log probability information for the choice.

      - `content: Array<ChatCompletionTokenLogprob> | null`

        A list of message content tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

      - `refusal: Array<ChatCompletionTokenLogprob> | null`

        A list of message refusal tokens with log probability information.

        - `token: string`

          The token.

        - `bytes: Array<number> | null`

          A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

        - `logprob: number`

          The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

        - `top_logprobs: Array<TopLogprob>`

          List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

          - `token: string`

            The token.

          - `bytes: Array<number> | null`

            A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

          - `logprob: number`

            The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

  - `created: number`

    The Unix timestamp (in seconds) of when the chat completion was created. Each chunk has the same timestamp.

  - `model: string`

    The model to generate the completion.

  - `object: "chat.completion.chunk"`

    The object type, which is always `chat.completion.chunk`.

    - `"chat.completion.chunk"`

  - `service_tier?: "auto" | "default" | "flex" | 2 more | null`

    Specifies the processing type used for serving the request.

    - If set to 'auto', then the request will be processed with the service tier configured in the Project settings. Unless otherwise configured, the Project will use 'default'.
    - If set to 'default', then the request will be processed with the standard pricing and performance for the selected model.
    - If set to '[flex](https://platform.openai.com/docs/guides/flex-processing)' or '[priority](https://openai.com/api-priority-processing/)', then the request will be processed with the corresponding service tier.
    - When not set, the default behavior is 'auto'.

    When the `service_tier` parameter is set, the response body will include the `service_tier` value based on the processing mode actually used to serve the request. This response value may be different from the value set in the parameter.

    - `"auto"`

    - `"default"`

    - `"flex"`

    - `"scale"`

    - `"priority"`

  - `system_fingerprint?: string`

    This fingerprint represents the backend configuration that the model runs with.
    Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that might impact determinism.

  - `usage?: CompletionUsage | null`

    An optional field that will only be present when you set
    `stream_options: {"include_usage": true}` in your request. When present, it
    contains a null value **except for the last chunk** which contains the
    token usage statistics for the entire request.

    **NOTE:** If the stream is interrupted or cancelled, you may not
    receive the final usage chunk which contains the total token usage for
    the request.

    - `completion_tokens: number`

      Number of tokens in the generated completion.

    - `prompt_tokens: number`

      Number of tokens in the prompt.

    - `total_tokens: number`

      Total number of tokens used in the request (prompt + completion).

    - `completion_tokens_details?: CompletionTokensDetails`

      Breakdown of tokens used in a completion.

      - `accepted_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that appeared in the completion.

      - `audio_tokens?: number`

        Audio input tokens generated by the model.

      - `reasoning_tokens?: number`

        Tokens generated by the model for reasoning.

      - `rejected_prediction_tokens?: number`

        When using Predicted Outputs, the number of tokens in the
        prediction that did not appear in the completion. However, like
        reasoning tokens, these tokens are still counted in the total
        completion tokens for purposes of billing, output, and context window
        limits.

    - `prompt_tokens_details?: PromptTokensDetails`

      Breakdown of tokens used in the prompt.

      - `audio_tokens?: number`

        Audio input tokens present in the prompt.

      - `cached_tokens?: number`

        Cached tokens present in the prompt.

### Chat Completion Content Part

- `ChatCompletionContentPart = ChatCompletionContentPartText | ChatCompletionContentPartImage | ChatCompletionContentPartInputAudio | File`

  Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

  - `ChatCompletionContentPartText`

    Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

    - `text: string`

      The text content.

    - `type: "text"`

      The type of the content part.

      - `"text"`

  - `ChatCompletionContentPartImage`

    Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

    - `image_url: ImageURL`

      - `url: string`

        Either a URL of the image or the base64 encoded image data.

      - `detail?: "auto" | "low" | "high"`

        Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

        - `"auto"`

        - `"low"`

        - `"high"`

    - `type: "image_url"`

      The type of the content part.

      - `"image_url"`

  - `ChatCompletionContentPartInputAudio`

    Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

    - `input_audio: InputAudio`

      - `data: string`

        Base64 encoded audio data.

      - `format: "wav" | "mp3"`

        The format of the encoded audio data. Currently supports "wav" and "mp3".

        - `"wav"`

        - `"mp3"`

    - `type: "input_audio"`

      The type of the content part. Always `input_audio`.

      - `"input_audio"`

  - `File`

    Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

    - `file: File`

      - `file_data?: string`

        The base64 encoded file data, used when passing the file to the model
        as a string.

      - `file_id?: string`

        The ID of an uploaded file to use as input.

      - `filename?: string`

        The name of the file, used when passing the file to the model as a
        string.

    - `type: "file"`

      The type of the content part. Always `file`.

      - `"file"`

### Chat Completion Content Part Image

- `ChatCompletionContentPartImage`

  Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

  - `image_url: ImageURL`

    - `url: string`

      Either a URL of the image or the base64 encoded image data.

    - `detail?: "auto" | "low" | "high"`

      Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

      - `"auto"`

      - `"low"`

      - `"high"`

  - `type: "image_url"`

    The type of the content part.

    - `"image_url"`

### Chat Completion Content Part Input Audio

- `ChatCompletionContentPartInputAudio`

  Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

  - `input_audio: InputAudio`

    - `data: string`

      Base64 encoded audio data.

    - `format: "wav" | "mp3"`

      The format of the encoded audio data. Currently supports "wav" and "mp3".

      - `"wav"`

      - `"mp3"`

  - `type: "input_audio"`

    The type of the content part. Always `input_audio`.

    - `"input_audio"`

### Chat Completion Content Part Refusal

- `ChatCompletionContentPartRefusal`

  - `refusal: string`

    The refusal message generated by the model.

  - `type: "refusal"`

    The type of the content part.

    - `"refusal"`

### Chat Completion Content Part Text

- `ChatCompletionContentPartText`

  Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

  - `text: string`

    The text content.

  - `type: "text"`

    The type of the content part.

    - `"text"`

### Chat Completion Custom Tool

- `ChatCompletionCustomTool`

  A custom tool that processes input using a specified format.

  - `custom: Custom`

    Properties of the custom tool.

    - `name: string`

      The name of the custom tool, used to identify it in tool calls.

    - `description?: string`

      Optional description of the custom tool, used to provide more context.

    - `format?: Text | Grammar`

      The input format for the custom tool. Default is unconstrained text.

      - `Text`

        Unconstrained free-form text.

        - `type: "text"`

          Unconstrained text format. Always `text`.

          - `"text"`

      - `Grammar`

        A grammar defined by the user.

        - `grammar: Grammar`

          Your chosen grammar.

          - `definition: string`

            The grammar definition.

          - `syntax: "lark" | "regex"`

            The syntax of the grammar definition. One of `lark` or `regex`.

            - `"lark"`

            - `"regex"`

        - `type: "grammar"`

          Grammar format. Always `grammar`.

          - `"grammar"`

  - `type: "custom"`

    The type of the custom tool. Always `custom`.

    - `"custom"`

### Chat Completion Deleted

- `ChatCompletionDeleted`

  - `id: string`

    The ID of the chat completion that was deleted.

  - `deleted: boolean`

    Whether the chat completion was deleted.

  - `object: "chat.completion.deleted"`

    The type of object being deleted.

    - `"chat.completion.deleted"`

### Chat Completion Developer Message Param

- `ChatCompletionDeveloperMessageParam`

  Developer-provided instructions that the model should follow, regardless of
  messages sent by the user. With o1 models and newer, `developer` messages
  replace the previous `system` messages.

  - `content: string | Array<ChatCompletionContentPartText>`

    The contents of the developer message.

    - `string`

    - `Array<ChatCompletionContentPartText>`

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

  - `role: "developer"`

    The role of the messages author, in this case `developer`.

    - `"developer"`

  - `name?: string`

    An optional name for the participant. Provides the model information to differentiate between participants of the same role.

### Chat Completion Function Call Option

- `ChatCompletionFunctionCallOption`

  Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.

  - `name: string`

    The name of the function to call.

### Chat Completion Function Message Param

- `ChatCompletionFunctionMessageParam`

  - `content: string | null`

    The contents of the function message.

  - `name: string`

    The name of the function to call.

  - `role: "function"`

    The role of the messages author, in this case `function`.

    - `"function"`

### Chat Completion Function Tool

- `ChatCompletionFunctionTool`

  A function tool that can be used to generate a response.

  - `function: FunctionDefinition`

    - `name: string`

      The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

    - `description?: string`

      A description of what the function does, used by the model to choose when and how to call the function.

    - `parameters?: FunctionParameters`

      The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

      Omitting `parameters` defines a function with an empty parameter list.

    - `strict?: boolean | null`

      Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

  - `type: "function"`

    The type of the tool. Currently, only `function` is supported.

    - `"function"`

### Chat Completion Message

- `ChatCompletionMessage`

  A chat completion message generated by the model.

  - `content: string | null`

    The contents of the message.

  - `refusal: string | null`

    The refusal message generated by the model.

  - `role: "assistant"`

    The role of the author of this message.

    - `"assistant"`

  - `annotations?: Array<Annotation>`

    Annotations for the message, when applicable, as when using the
    [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

    - `type: "url_citation"`

      The type of the URL citation. Always `url_citation`.

      - `"url_citation"`

    - `url_citation: URLCitation`

      A URL citation when using web search.

      - `end_index: number`

        The index of the last character of the URL citation in the message.

      - `start_index: number`

        The index of the first character of the URL citation in the message.

      - `title: string`

        The title of the web resource.

      - `url: string`

        The URL of the web resource.

  - `audio?: ChatCompletionAudio | null`

    If the audio output modality is requested, this object contains data
    about the audio response from the model. [Learn more](https://platform.openai.com/docs/guides/audio).

    - `id: string`

      Unique identifier for this audio response.

    - `data: string`

      Base64 encoded audio bytes generated by the model, in the format
      specified in the request.

    - `expires_at: number`

      The Unix timestamp (in seconds) for when this audio response will
      no longer be accessible on the server for use in multi-turn
      conversations.

    - `transcript: string`

      Transcript of the audio generated by the model.

  - `function_call?: FunctionCall`

    Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

    - `arguments: string`

      The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

    - `name: string`

      The name of the function to call.

  - `tool_calls?: Array<ChatCompletionMessageToolCall>`

    The tool calls generated by the model, such as function calls.

    - `ChatCompletionMessageFunctionToolCall`

      A call to a function tool created by the model.

      - `id: string`

        The ID of the tool call.

      - `function: Function`

        The function that the model called.

        - `arguments: string`

          The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

        - `name: string`

          The name of the function to call.

      - `type: "function"`

        The type of the tool. Currently, only `function` is supported.

        - `"function"`

    - `ChatCompletionMessageCustomToolCall`

      A call to a custom tool created by the model.

      - `id: string`

        The ID of the tool call.

      - `custom: Custom`

        The custom tool that the model called.

        - `input: string`

          The input for the custom tool call generated by the model.

        - `name: string`

          The name of the custom tool to call.

      - `type: "custom"`

        The type of the tool. Always `custom`.

        - `"custom"`

### Chat Completion Message Custom Tool Call

- `ChatCompletionMessageCustomToolCall`

  A call to a custom tool created by the model.

  - `id: string`

    The ID of the tool call.

  - `custom: Custom`

    The custom tool that the model called.

    - `input: string`

      The input for the custom tool call generated by the model.

    - `name: string`

      The name of the custom tool to call.

  - `type: "custom"`

    The type of the tool. Always `custom`.

    - `"custom"`

### Chat Completion Message Function Tool Call

- `ChatCompletionMessageFunctionToolCall`

  A call to a function tool created by the model.

  - `id: string`

    The ID of the tool call.

  - `function: Function`

    The function that the model called.

    - `arguments: string`

      The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

    - `name: string`

      The name of the function to call.

  - `type: "function"`

    The type of the tool. Currently, only `function` is supported.

    - `"function"`

### Chat Completion Message Param

- `ChatCompletionMessageParam = ChatCompletionDeveloperMessageParam | ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam | 3 more`

  Developer-provided instructions that the model should follow, regardless of
  messages sent by the user. With o1 models and newer, `developer` messages
  replace the previous `system` messages.

  - `ChatCompletionDeveloperMessageParam`

    Developer-provided instructions that the model should follow, regardless of
    messages sent by the user. With o1 models and newer, `developer` messages
    replace the previous `system` messages.

    - `content: string | Array<ChatCompletionContentPartText>`

      The contents of the developer message.

      - `string`

      - `Array<ChatCompletionContentPartText>`

        - `text: string`

          The text content.

        - `type: "text"`

          The type of the content part.

          - `"text"`

    - `role: "developer"`

      The role of the messages author, in this case `developer`.

      - `"developer"`

    - `name?: string`

      An optional name for the participant. Provides the model information to differentiate between participants of the same role.

  - `ChatCompletionSystemMessageParam`

    Developer-provided instructions that the model should follow, regardless of
    messages sent by the user. With o1 models and newer, use `developer` messages
    for this purpose instead.

    - `content: string | Array<ChatCompletionContentPartText>`

      The contents of the system message.

      - `string`

      - `Array<ChatCompletionContentPartText>`

        - `text: string`

          The text content.

        - `type: "text"`

          The type of the content part.

          - `"text"`

    - `role: "system"`

      The role of the messages author, in this case `system`.

      - `"system"`

    - `name?: string`

      An optional name for the participant. Provides the model information to differentiate between participants of the same role.

  - `ChatCompletionUserMessageParam`

    Messages sent by an end user, containing prompts or additional context
    information.

    - `content: string | Array<ChatCompletionContentPart>`

      The contents of the user message.

      - `string`

      - `Array<ChatCompletionContentPart>`

        - `ChatCompletionContentPartText`

          Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

          - `text: string`

            The text content.

          - `type: "text"`

            The type of the content part.

            - `"text"`

        - `ChatCompletionContentPartImage`

          Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

          - `image_url: ImageURL`

            - `url: string`

              Either a URL of the image or the base64 encoded image data.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `ChatCompletionContentPartInputAudio`

          Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

          - `input_audio: InputAudio`

            - `data: string`

              Base64 encoded audio data.

            - `format: "wav" | "mp3"`

              The format of the encoded audio data. Currently supports "wav" and "mp3".

              - `"wav"`

              - `"mp3"`

          - `type: "input_audio"`

            The type of the content part. Always `input_audio`.

            - `"input_audio"`

        - `File`

          Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

          - `file: File`

            - `file_data?: string`

              The base64 encoded file data, used when passing the file to the model
              as a string.

            - `file_id?: string`

              The ID of an uploaded file to use as input.

            - `filename?: string`

              The name of the file, used when passing the file to the model as a
              string.

          - `type: "file"`

            The type of the content part. Always `file`.

            - `"file"`

    - `role: "user"`

      The role of the messages author, in this case `user`.

      - `"user"`

    - `name?: string`

      An optional name for the participant. Provides the model information to differentiate between participants of the same role.

  - `ChatCompletionAssistantMessageParam`

    Messages sent by the model in response to user messages.

    - `role: "assistant"`

      The role of the messages author, in this case `assistant`.

      - `"assistant"`

    - `audio?: Audio | null`

      Data about a previous audio response from the model.
      [Learn more](https://platform.openai.com/docs/guides/audio).

      - `id: string`

        Unique identifier for a previous audio response from the model.

    - `content?: string | Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal> | null`

      The contents of the assistant message. Required unless `tool_calls` or `function_call` is specified.

      - `string`

      - `Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal>`

        - `ChatCompletionContentPartText`

          Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

          - `text: string`

            The text content.

          - `type: "text"`

            The type of the content part.

            - `"text"`

        - `ChatCompletionContentPartRefusal`

          - `refusal: string`

            The refusal message generated by the model.

          - `type: "refusal"`

            The type of the content part.

            - `"refusal"`

    - `function_call?: FunctionCall | null`

      Deprecated and replaced by `tool_calls`. The name and arguments of a function that should be called, as generated by the model.

      - `arguments: string`

        The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

      - `name: string`

        The name of the function to call.

    - `name?: string`

      An optional name for the participant. Provides the model information to differentiate between participants of the same role.

    - `refusal?: string | null`

      The refusal message by the assistant.

    - `tool_calls?: Array<ChatCompletionMessageToolCall>`

      The tool calls generated by the model, such as function calls.

      - `ChatCompletionMessageFunctionToolCall`

        A call to a function tool created by the model.

        - `id: string`

          The ID of the tool call.

        - `function: Function`

          The function that the model called.

          - `arguments: string`

            The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

          - `name: string`

            The name of the function to call.

        - `type: "function"`

          The type of the tool. Currently, only `function` is supported.

          - `"function"`

      - `ChatCompletionMessageCustomToolCall`

        A call to a custom tool created by the model.

        - `id: string`

          The ID of the tool call.

        - `custom: Custom`

          The custom tool that the model called.

          - `input: string`

            The input for the custom tool call generated by the model.

          - `name: string`

            The name of the custom tool to call.

        - `type: "custom"`

          The type of the tool. Always `custom`.

          - `"custom"`

  - `ChatCompletionToolMessageParam`

    - `content: string | Array<ChatCompletionContentPartText>`

      The contents of the tool message.

      - `string`

      - `Array<ChatCompletionContentPartText>`

        - `text: string`

          The text content.

        - `type: "text"`

          The type of the content part.

          - `"text"`

    - `role: "tool"`

      The role of the messages author, in this case `tool`.

      - `"tool"`

    - `tool_call_id: string`

      Tool call that this message is responding to.

  - `ChatCompletionFunctionMessageParam`

    - `content: string | null`

      The contents of the function message.

    - `name: string`

      The name of the function to call.

    - `role: "function"`

      The role of the messages author, in this case `function`.

      - `"function"`

### Chat Completion Message Tool Call

- `ChatCompletionMessageToolCall = ChatCompletionMessageFunctionToolCall | ChatCompletionMessageCustomToolCall`

  A call to a function tool created by the model.

  - `ChatCompletionMessageFunctionToolCall`

    A call to a function tool created by the model.

    - `id: string`

      The ID of the tool call.

    - `function: Function`

      The function that the model called.

      - `arguments: string`

        The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.

      - `name: string`

        The name of the function to call.

    - `type: "function"`

      The type of the tool. Currently, only `function` is supported.

      - `"function"`

  - `ChatCompletionMessageCustomToolCall`

    A call to a custom tool created by the model.

    - `id: string`

      The ID of the tool call.

    - `custom: Custom`

      The custom tool that the model called.

      - `input: string`

        The input for the custom tool call generated by the model.

      - `name: string`

        The name of the custom tool to call.

    - `type: "custom"`

      The type of the tool. Always `custom`.

      - `"custom"`

### Chat Completion Modality

- `ChatCompletionModality = "text" | "audio"`

  - `"text"`

  - `"audio"`

### Chat Completion Named Tool Choice

- `ChatCompletionNamedToolChoice`

  Specifies a tool the model should use. Use to force the model to call a specific function.

  - `function: Function`

    - `name: string`

      The name of the function to call.

  - `type: "function"`

    For function calling, the type is always `function`.

    - `"function"`

### Chat Completion Named Tool Choice Custom

- `ChatCompletionNamedToolChoiceCustom`

  Specifies a tool the model should use. Use to force the model to call a specific custom tool.

  - `custom: Custom`

    - `name: string`

      The name of the custom tool to call.

  - `type: "custom"`

    For custom tool calling, the type is always `custom`.

    - `"custom"`

### Chat Completion Prediction Content

- `ChatCompletionPredictionContent`

  Static predicted output content, such as the content of a text file that is
  being regenerated.

  - `content: string | Array<ChatCompletionContentPartText>`

    The content that should be matched when generating a model response.
    If generated tokens would match this content, the entire model response
    can be returned much more quickly.

    - `string`

    - `Array<ChatCompletionContentPartText>`

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

  - `type: "content"`

    The type of the predicted content you want to provide. This type is
    currently always `content`.

    - `"content"`

### Chat Completion Role

- `ChatCompletionRole = "developer" | "system" | "user" | 3 more`

  The role of the author of a message

  - `"developer"`

  - `"system"`

  - `"user"`

  - `"assistant"`

  - `"tool"`

  - `"function"`

### Chat Completion Store Message

- `ChatCompletionStoreMessage extends ChatCompletionMessage`

  A chat completion message generated by the model.

  - `id: string`

    The identifier of the chat message.

  - `content_parts?: Array<ChatCompletionContentPartText | ChatCompletionContentPartImage> | null`

    If a content parts array was provided, this is an array of `text` and `image_url` parts.
    Otherwise, null.

    - `ChatCompletionContentPartText`

      Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

    - `ChatCompletionContentPartImage`

      Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

      - `image_url: ImageURL`

        - `url: string`

          Either a URL of the image or the base64 encoded image data.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

### Chat Completion Stream Options

- `ChatCompletionStreamOptions`

  Options for streaming response. Only set this when you set `stream: true`.

  - `include_obfuscation?: boolean`

    When true, stream obfuscation will be enabled. Stream obfuscation adds
    random characters to an `obfuscation` field on streaming delta events to
    normalize payload sizes as a mitigation to certain side-channel attacks.
    These obfuscation fields are included by default, but add a small amount
    of overhead to the data stream. You can set `include_obfuscation` to
    false to optimize for bandwidth if you trust the network links between
    your application and the OpenAI API.

  - `include_usage?: boolean`

    If set, an additional chunk will be streamed before the `data: [DONE]`
    message. The `usage` field on this chunk shows the token usage statistics
    for the entire request, and the `choices` field will always be an empty
    array.

    All other chunks will also include a `usage` field, but with a null
    value. **NOTE:** If the stream is interrupted, you may not receive the
    final usage chunk which contains the total token usage for the request.

### Chat Completion System Message Param

- `ChatCompletionSystemMessageParam`

  Developer-provided instructions that the model should follow, regardless of
  messages sent by the user. With o1 models and newer, use `developer` messages
  for this purpose instead.

  - `content: string | Array<ChatCompletionContentPartText>`

    The contents of the system message.

    - `string`

    - `Array<ChatCompletionContentPartText>`

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

  - `role: "system"`

    The role of the messages author, in this case `system`.

    - `"system"`

  - `name?: string`

    An optional name for the participant. Provides the model information to differentiate between participants of the same role.

### Chat Completion Token Logprob

- `ChatCompletionTokenLogprob`

  - `token: string`

    The token.

  - `bytes: Array<number> | null`

    A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

  - `logprob: number`

    The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

  - `top_logprobs: Array<TopLogprob>`

    List of the most likely tokens and their log probability, at this token position. In rare cases, there may be fewer than the number of requested `top_logprobs` returned.

    - `token: string`

      The token.

    - `bytes: Array<number> | null`

      A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be `null` if there is no bytes representation for the token.

    - `logprob: number`

      The log probability of this token, if it is within the top 20 most likely tokens. Otherwise, the value `-9999.0` is used to signify that the token is very unlikely.

### Chat Completion Tool

- `ChatCompletionTool = ChatCompletionFunctionTool | ChatCompletionCustomTool`

  A function tool that can be used to generate a response.

  - `ChatCompletionFunctionTool`

    A function tool that can be used to generate a response.

    - `function: FunctionDefinition`

      - `name: string`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description?: string`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters?: FunctionParameters`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict?: boolean | null`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: "function"`

      The type of the tool. Currently, only `function` is supported.

      - `"function"`

  - `ChatCompletionCustomTool`

    A custom tool that processes input using a specified format.

    - `custom: Custom`

      Properties of the custom tool.

      - `name: string`

        The name of the custom tool, used to identify it in tool calls.

      - `description?: string`

        Optional description of the custom tool, used to provide more context.

      - `format?: Text | Grammar`

        The input format for the custom tool. Default is unconstrained text.

        - `Text`

          Unconstrained free-form text.

          - `type: "text"`

            Unconstrained text format. Always `text`.

            - `"text"`

        - `Grammar`

          A grammar defined by the user.

          - `grammar: Grammar`

            Your chosen grammar.

            - `definition: string`

              The grammar definition.

            - `syntax: "lark" | "regex"`

              The syntax of the grammar definition. One of `lark` or `regex`.

              - `"lark"`

              - `"regex"`

          - `type: "grammar"`

            Grammar format. Always `grammar`.

            - `"grammar"`

    - `type: "custom"`

      The type of the custom tool. Always `custom`.

      - `"custom"`

### Chat Completion Tool Choice Option

- `ChatCompletionToolChoiceOption = "none" | "auto" | "required" | ChatCompletionAllowedToolChoice | ChatCompletionNamedToolChoice | ChatCompletionNamedToolChoiceCustom`

  Controls which (if any) tool is called by the model.
  `none` means the model will not call any tool and instead generates a message.
  `auto` means the model can pick between generating a message or calling one or more tools.
  `required` means the model must call one or more tools.
  Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

  `none` is the default when no tools are present. `auto` is the default if tools are present.

  - `"none" | "auto" | "required"`

    - `"none"`

    - `"auto"`

    - `"required"`

  - `ChatCompletionAllowedToolChoice`

    Constrains the tools available to the model to a pre-defined set.

    - `allowed_tools: ChatCompletionAllowedTools`

      Constrains the tools available to the model to a pre-defined set.

      - `mode: "auto" | "required"`

        Constrains the tools available to the model to a pre-defined set.

        `auto` allows the model to pick from among the allowed tools and generate a
        message.

        `required` requires the model to call one or more of the allowed tools.

        - `"auto"`

        - `"required"`

      - `tools: Array<Record<string, unknown>>`

        A list of tool definitions that the model should be allowed to call.

        For the Chat Completions API, the list of tool definitions might look like:

        ```json
        [
          { "type": "function", "function": { "name": "get_weather" } },
          { "type": "function", "function": { "name": "get_time" } }
        ]
        ```

    - `type: "allowed_tools"`

      Allowed tool configuration type. Always `allowed_tools`.

      - `"allowed_tools"`

  - `ChatCompletionNamedToolChoice`

    Specifies a tool the model should use. Use to force the model to call a specific function.

    - `function: Function`

      - `name: string`

        The name of the function to call.

    - `type: "function"`

      For function calling, the type is always `function`.

      - `"function"`

  - `ChatCompletionNamedToolChoiceCustom`

    Specifies a tool the model should use. Use to force the model to call a specific custom tool.

    - `custom: Custom`

      - `name: string`

        The name of the custom tool to call.

    - `type: "custom"`

      For custom tool calling, the type is always `custom`.

      - `"custom"`

### Chat Completion Tool Message Param

- `ChatCompletionToolMessageParam`

  - `content: string | Array<ChatCompletionContentPartText>`

    The contents of the tool message.

    - `string`

    - `Array<ChatCompletionContentPartText>`

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

  - `role: "tool"`

    The role of the messages author, in this case `tool`.

    - `"tool"`

  - `tool_call_id: string`

    Tool call that this message is responding to.

### Chat Completion User Message Param

- `ChatCompletionUserMessageParam`

  Messages sent by an end user, containing prompts or additional context
  information.

  - `content: string | Array<ChatCompletionContentPart>`

    The contents of the user message.

    - `string`

    - `Array<ChatCompletionContentPart>`

      - `ChatCompletionContentPartText`

        Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

        - `text: string`

          The text content.

        - `type: "text"`

          The type of the content part.

          - `"text"`

      - `ChatCompletionContentPartImage`

        Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

        - `image_url: ImageURL`

          - `url: string`

            Either a URL of the image or the base64 encoded image data.

          - `detail?: "auto" | "low" | "high"`

            Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: "image_url"`

          The type of the content part.

          - `"image_url"`

      - `ChatCompletionContentPartInputAudio`

        Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

        - `input_audio: InputAudio`

          - `data: string`

            Base64 encoded audio data.

          - `format: "wav" | "mp3"`

            The format of the encoded audio data. Currently supports "wav" and "mp3".

            - `"wav"`

            - `"mp3"`

        - `type: "input_audio"`

          The type of the content part. Always `input_audio`.

          - `"input_audio"`

      - `File`

        Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

        - `file: File`

          - `file_data?: string`

            The base64 encoded file data, used when passing the file to the model
            as a string.

          - `file_id?: string`

            The ID of an uploaded file to use as input.

          - `filename?: string`

            The name of the file, used when passing the file to the model as a
            string.

        - `type: "file"`

          The type of the content part. Always `file`.

          - `"file"`

  - `role: "user"`

    The role of the messages author, in this case `user`.

    - `"user"`

  - `name?: string`

    An optional name for the participant. Provides the model information to differentiate between participants of the same role.

### Chat Completion Allowed Tools

- `ChatCompletionAllowedTools`

  Constrains the tools available to the model to a pre-defined set.

  - `mode: "auto" | "required"`

    Constrains the tools available to the model to a pre-defined set.

    `auto` allows the model to pick from among the allowed tools and generate a
    message.

    `required` requires the model to call one or more of the allowed tools.

    - `"auto"`

    - `"required"`

  - `tools: Array<Record<string, unknown>>`

    A list of tool definitions that the model should be allowed to call.

    For the Chat Completions API, the list of tool definitions might look like:

    ```json
    [
      { "type": "function", "function": { "name": "get_weather" } },
      { "type": "function", "function": { "name": "get_time" } }
    ]
    ```

# Messages

## List

`client.chat.completions.messages.list(stringcompletionID, MessageListParamsquery?, RequestOptionsoptions?): CursorPage<ChatCompletionStoreMessage>`

**get** `/chat/completions/{completion_id}/messages`

Get the messages in a stored chat completion. Only Chat Completions that
have been created with the `store` parameter set to `true` will be
returned.

### Parameters

- `completionID: string`

- `query: MessageListParams`

  - `after?: string`

    Identifier for the last message from the previous pagination request.

  - `limit?: number`

    Number of messages to retrieve.

  - `order?: "asc" | "desc"`

    Sort order for messages by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

### Returns

- `ChatCompletionStoreMessage extends ChatCompletionMessage`

  A chat completion message generated by the model.

  - `id: string`

    The identifier of the chat message.

  - `content_parts?: Array<ChatCompletionContentPartText | ChatCompletionContentPartImage> | null`

    If a content parts array was provided, this is an array of `text` and `image_url` parts.
    Otherwise, null.

    - `ChatCompletionContentPartText`

      Learn about [text inputs](https://platform.openai.com/docs/guides/text-generation).

      - `text: string`

        The text content.

      - `type: "text"`

        The type of the content part.

        - `"text"`

    - `ChatCompletionContentPartImage`

      Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

      - `image_url: ImageURL`

        - `url: string`

          Either a URL of the image or the base64 encoded image data.

        - `detail?: "auto" | "low" | "high"`

          Specifies the detail level of the image. Learn more in the [Vision guide](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding).

          - `"auto"`

          - `"low"`

          - `"high"`

      - `type: "image_url"`

        The type of the content part.

        - `"image_url"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const chatCompletionStoreMessage of client.chat.completions.messages.list(
  'completion_id',
)) {
  console.log(chatCompletionStoreMessage);
}
```
