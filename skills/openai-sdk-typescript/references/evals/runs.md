# Runs

## List

`client.evals.runs.list(stringevalID, RunListParamsquery?, RequestOptionsoptions?): CursorPage<RunListResponse>`

**get** `/evals/{eval_id}/runs`

Get a list of runs for an evaluation.

### Parameters

- `evalID: string`

- `query: RunListParams`

  - `after?: string`

    Identifier for the last run from the previous pagination request.

  - `limit?: number`

    Number of runs to retrieve.

  - `order?: "asc" | "desc"`

    Sort order for runs by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

  - `status?: "queued" | "in_progress" | "completed" | 2 more`

    Filter runs by status. One of `queued` | `in_progress` | `failed` | `completed` | `canceled`.

    - `"queued"`

    - `"in_progress"`

    - `"completed"`

    - `"canceled"`

    - `"failed"`

### Returns

- `RunListResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 3 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const runListResponse of client.evals.runs.list('eval_id')) {
  console.log(runListResponse.id);
}
```

## Create

`client.evals.runs.create(stringevalID, RunCreateParamsbody, RequestOptionsoptions?): RunCreateResponse`

**post** `/evals/{eval_id}/runs`

Kicks off a new run for a given evaluation, specifying the data source, and what model configuration to use to test. The datasource will be validated against the schema specified in the config of the evaluation.

### Parameters

- `evalID: string`

- `body: RunCreateParams`

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | CreateEvalResponsesRunDataSource`

    Details about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `CreateEvalResponsesRunDataSource`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 3 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name?: string`

    The name of the run.

### Returns

- `RunCreateResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 3 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.create('eval_id', {
  data_source: {
    source: { content: [{ item: { foo: 'bar' } }], type: 'file_content' },
    type: 'jsonl',
  },
});

console.log(run.id);
```

## Retrieve

`client.evals.runs.retrieve(stringrunID, RunRetrieveParamsparams, RequestOptionsoptions?): RunRetrieveResponse`

**get** `/evals/{eval_id}/runs/{run_id}`

Get an evaluation run by ID.

### Parameters

- `runID: string`

- `params: RunRetrieveParams`

  - `eval_id: string`

    The ID of the evaluation to retrieve runs for.

### Returns

- `RunRetrieveResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 3 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.retrieve('run_id', { eval_id: 'eval_id' });

console.log(run.id);
```

## Cancel

`client.evals.runs.cancel(stringrunID, RunCancelParamsparams, RequestOptionsoptions?): RunCancelResponse`

**post** `/evals/{eval_id}/runs/{run_id}`

Cancel an ongoing evaluation run.

### Parameters

- `runID: string`

- `params: RunCancelParams`

  - `eval_id: string`

    The ID of the evaluation whose run you want to cancel.

### Returns

- `RunCancelResponse`

  A schema representing an evaluation run.

  - `id: string`

    Unique identifier for the evaluation run.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `data_source: CreateEvalJSONLRunDataSource | CreateEvalCompletionsRunDataSource | Responses`

    Information about the run's data source.

    - `CreateEvalJSONLRunDataSource`

      A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

      - `source: FileContent | FileID`

        Determines what populates the `item` namespace in the data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

      - `type: "jsonl"`

        The type of data source. Always `jsonl`.

        - `"jsonl"`

    - `CreateEvalCompletionsRunDataSource`

      A CompletionsRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | StoredCompletions`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `StoredCompletions`

          A StoredCompletionsRunDataSource configuration describing a set of filters

          - `type: "stored_completions"`

            The type of source. Always `stored_completions`.

            - `"stored_completions"`

          - `created_after?: number | null`

            An optional Unix timestamp to filter items created after this time.

          - `created_before?: number | null`

            An optional Unix timestamp to filter items created before this time.

          - `limit?: number | null`

            An optional maximum number of items to return.

          - `metadata?: Metadata | null`

            Set of 16 key-value pairs that can be attached to an object. This can be
            useful for storing additional information about the object in a structured
            format, and querying for objects via API or the dashboard.

            Keys are strings with a maximum length of 64 characters. Values are strings
            with a maximum length of 512 characters.

          - `model?: string | null`

            An optional model to filter by (e.g., 'gpt-4o').

      - `type: "completions"`

        The type of run data source. Always `completions`.

        - `"completions"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<EasyInputMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `EasyInputMessage`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputMessageContentList`

                Text, image, or audio input to the model, used to generate a response.
                Can also contain previous assistant responses.

                - `string`

                - `ResponseInputMessageContentList = Array<ResponseInputContent>`

                  A list of one or many input items to the model, containing different content
                  types.

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `ResponseInputImage`

                    An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                    - `detail: "low" | "high" | "auto" | "original"`

                      The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                      - `"low"`

                      - `"high"`

                      - `"auto"`

                      - `"original"`

                    - `type: "input_image"`

                      The type of the input item. Always `input_image`.

                      - `"input_image"`

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `image_url?: string | null`

                      The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

                  - `ResponseInputFile`

                    A file input to the model.

                    - `type: "input_file"`

                      The type of the input item. Always `input_file`.

                      - `"input_file"`

                    - `file_data?: string`

                      The content of the file to be sent to the model.

                    - `file_id?: string | null`

                      The ID of the file to be sent to the model.

                    - `file_url?: string`

                      The URL of the file to be sent to the model.

                    - `filename?: string`

                      The name of the file to be sent to the model.

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `phase?: "commentary" | "final_answer" | null`

                Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
                For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
                phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

                - `"commentary"`

                - `"final_answer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `tools?: Array<ChatCompletionFunctionTool>`

          A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

    - `Responses`

      A ResponsesRunDataSource object describing a model sampling configuration.

      - `source: FileContent | FileID | Responses`

        Determines what populates the `item` namespace in this run's data source.

        - `FileContent`

          - `content: Array<Content>`

            The content of the jsonl file.

            - `item: Record<string, unknown>`

            - `sample?: Record<string, unknown>`

          - `type: "file_content"`

            The type of jsonl source. Always `file_content`.

            - `"file_content"`

        - `FileID`

          - `id: string`

            The identifier of the file.

          - `type: "file_id"`

            The type of jsonl source. Always `file_id`.

            - `"file_id"`

        - `Responses`

          A EvalResponsesSource object describing a run data source configuration.

          - `type: "responses"`

            The type of run data source. Always `responses`.

            - `"responses"`

          - `created_after?: number | null`

            Only include items created after this timestamp (inclusive). This is a query parameter used to select responses.

          - `created_before?: number | null`

            Only include items created before this timestamp (inclusive). This is a query parameter used to select responses.

          - `instructions_search?: string | null`

            Optional string to search the 'instructions' field. This is a query parameter used to select responses.

          - `metadata?: unknown`

            Metadata filter for the responses. This is a query parameter used to select responses.

          - `model?: string | null`

            The name of the model to find responses for. This is a query parameter used to select responses.

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

          - `temperature?: number | null`

            Sampling temperature. This is a query parameter used to select responses.

          - `tools?: Array<string> | null`

            List of tool names. This is a query parameter used to select responses.

          - `top_p?: number | null`

            Nucleus sampling parameter. This is a query parameter used to select responses.

          - `users?: Array<string> | null`

            List of user identifiers. This is a query parameter used to select responses.

      - `type: "responses"`

        The type of run data source. Always `responses`.

        - `"responses"`

      - `input_messages?: Template | ItemReference`

        Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

        - `Template`

          - `template: Array<ChatMessage | EvalItem>`

            A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

            - `ChatMessage`

              - `content: string`

                The content of the message.

              - `role: string`

                The role of the message (e.g. "system", "assistant", "user").

            - `EvalItem`

              A message input to the model with a role indicating instruction following
              hierarchy. Instructions given with the `developer` or `system` role take
              precedence over instructions given with the `user` role. Messages with the
              `assistant` role are presumed to have been generated by the model in previous
              interactions.

              - `content: string | ResponseInputText | OutputText | 3 more`

                Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

                - `string`

                - `ResponseInputText`

                  A text input to the model.

                  - `text: string`

                    The text input to the model.

                  - `type: "input_text"`

                    The type of the input item. Always `input_text`.

                    - `"input_text"`

                - `OutputText`

                  A text output from the model.

                  - `text: string`

                    The text output from the model.

                  - `type: "output_text"`

                    The type of the output text. Always `output_text`.

                    - `"output_text"`

                - `InputImage`

                  An image input block used within EvalItem content arrays.

                  - `image_url: string`

                    The URL of the image input.

                  - `type: "input_image"`

                    The type of the image input. Always `input_image`.

                    - `"input_image"`

                  - `detail?: string`

                    The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                - `ResponseInputAudio`

                  An audio input to the model.

                  - `input_audio: InputAudio`

                    - `data: string`

                      Base64-encoded audio data.

                    - `format: "mp3" | "wav"`

                      The format of the audio data. Currently supported formats are `mp3` and
                      `wav`.

                      - `"mp3"`

                      - `"wav"`

                  - `type: "input_audio"`

                    The type of the input item. Always `input_audio`.

                    - `"input_audio"`

                - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

                  A list of inputs, each of which may be either an input text, output text, input
                  image, or input audio object.

                  - `string`

                  - `ResponseInputText`

                    A text input to the model.

                    - `text: string`

                      The text input to the model.

                    - `type: "input_text"`

                      The type of the input item. Always `input_text`.

                      - `"input_text"`

                  - `OutputText`

                    A text output from the model.

                    - `text: string`

                      The text output from the model.

                    - `type: "output_text"`

                      The type of the output text. Always `output_text`.

                      - `"output_text"`

                  - `InputImage`

                    An image input block used within EvalItem content arrays.

                    - `image_url: string`

                      The URL of the image input.

                    - `type: "input_image"`

                      The type of the image input. Always `input_image`.

                      - `"input_image"`

                    - `detail?: string`

                      The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

                  - `ResponseInputAudio`

                    An audio input to the model.

                    - `input_audio: InputAudio`

                      - `data: string`

                        Base64-encoded audio data.

                      - `format: "mp3" | "wav"`

                        The format of the audio data. Currently supported formats are `mp3` and
                        `wav`.

                        - `"mp3"`

                        - `"wav"`

                    - `type: "input_audio"`

                      The type of the input item. Always `input_audio`.

                      - `"input_audio"`

              - `role: "user" | "assistant" | "system" | "developer"`

                The role of the message input. One of `user`, `assistant`, `system`, or
                `developer`.

                - `"user"`

                - `"assistant"`

                - `"system"`

                - `"developer"`

              - `type?: "message"`

                The type of the message input. Always `message`.

                - `"message"`

          - `type: "template"`

            The type of input messages. Always `template`.

            - `"template"`

        - `ItemReference`

          - `item_reference: string`

            A reference to a variable in the `item` namespace. Ie, "item.name"

          - `type: "item_reference"`

            The type of input messages. Always `item_reference`.

            - `"item_reference"`

      - `model?: string`

        The name of the model to use for generating completions (e.g. "o3-mini").

      - `sampling_params?: SamplingParams`

        - `max_completion_tokens?: number`

          The maximum number of tokens in the generated output.

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

        - `seed?: number`

          A seed value to initialize the randomness, during sampling.

        - `temperature?: number`

          A higher temperature increases randomness in the outputs.

        - `text?: Text`

          Configuration options for a text response from the model. Can be plain
          text or structured JSON data. Learn more:

          - [Text inputs and outputs](https://platform.openai.com/docs/guides/text)
          - [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)

          - `format?: ResponseFormatTextConfig`

            An object specifying the format that the model must output.

            Configuring `{ "type": "json_schema" }` enables Structured Outputs,
            which ensures the model will match your supplied JSON schema. Learn more in the
            [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

            The default format is `{ "type": "text" }` with no additional options.

            **Not recommended for gpt-4o and newer models:**

            Setting to `{ "type": "json_object" }` enables the older JSON mode, which
            ensures the message the model generates is valid JSON. Using `json_schema`
            is preferred for models that support it.

            - `ResponseFormatText`

              Default response format. Used to generate text responses.

              - `type: "text"`

                The type of response format being defined. Always `text`.

                - `"text"`

            - `ResponseFormatTextJSONSchemaConfig`

              JSON Schema response format. Used to generate structured JSON responses.
              Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

              - `name: string`

                The name of the response format. Must be a-z, A-Z, 0-9, or contain
                underscores and dashes, with a maximum length of 64.

              - `schema: Record<string, unknown>`

                The schema for the response format, described as a JSON Schema object.
                Learn how to build JSON schemas [here](https://json-schema.org/).

              - `type: "json_schema"`

                The type of response format being defined. Always `json_schema`.

                - `"json_schema"`

              - `description?: string`

                A description of what the response format is for, used by the model to
                determine how to respond in the format.

              - `strict?: boolean | null`

                Whether to enable strict schema adherence when generating the output.
                If set to true, the model will always follow the exact schema defined
                in the `schema` field. Only a subset of JSON Schema is supported when
                `strict` is `true`. To learn more, read the [Structured Outputs
                guide](https://platform.openai.com/docs/guides/structured-outputs).

            - `ResponseFormatJSONObject`

              JSON object response format. An older method of generating JSON responses.
              Using `json_schema` is recommended for models that support it. Note that the
              model will not generate JSON without a system or user message instructing it
              to do so.

              - `type: "json_object"`

                The type of response format being defined. Always `json_object`.

                - `"json_object"`

        - `tools?: Array<Tool>`

          An array of tools the model may call while generating a response. You
          can specify which tool to use by setting the `tool_choice` parameter.

          The two categories of tools you can provide the model are:

          - **Built-in tools**: Tools that are provided by OpenAI that extend the
            model's capabilities, like [web search](https://platform.openai.com/docs/guides/tools-web-search)
            or [file search](https://platform.openai.com/docs/guides/tools-file-search). Learn more about
            [built-in tools](https://platform.openai.com/docs/guides/tools).
          - **Function calls (custom tools)**: Functions that are defined by you,
            enabling the model to call your own code. Learn more about
            [function calling](https://platform.openai.com/docs/guides/function-calling).

          - `FunctionTool`

            Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

            - `name: string`

              The name of the function to call.

            - `parameters: Record<string, unknown> | null`

              A JSON schema object describing the parameters of the function.

            - `strict: boolean | null`

              Whether to enforce strict parameter validation. Default `true`.

            - `type: "function"`

              The type of the function tool. Always `function`.

              - `"function"`

            - `defer_loading?: boolean`

              Whether this function is deferred and loaded via tool search.

            - `description?: string | null`

              A description of the function. Used by the model to determine whether or not to call the function.

          - `FileSearchTool`

            A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

            - `type: "file_search"`

              The type of the file search tool. Always `file_search`.

              - `"file_search"`

            - `vector_store_ids: Array<string>`

              The IDs of the vector stores to search.

            - `filters?: ComparisonFilter | CompoundFilter | null`

              A filter to apply.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `CompoundFilter`

                Combine multiple filters using `and` or `or`.

                - `filters: Array<ComparisonFilter | unknown>`

                  Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

                  - `ComparisonFilter`

                    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                    - `key: string`

                      The key to compare against the value.

                    - `type: "eq" | "ne" | "gt" | 3 more`

                      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                      - `eq`: equals
                      - `ne`: not equal
                      - `gt`: greater than
                      - `gte`: greater than or equal
                      - `lt`: less than
                      - `lte`: less than or equal
                      - `in`: in
                      - `nin`: not in

                      - `"eq"`

                      - `"ne"`

                      - `"gt"`

                      - `"gte"`

                      - `"lt"`

                      - `"lte"`

                    - `value: string | number | boolean | Array<string | number>`

                      The value to compare against the attribute key; supports string, number, or boolean types.

                      - `string`

                      - `number`

                      - `boolean`

                      - `Array<string | number>`

                        - `string`

                        - `number`

                  - `unknown`

                - `type: "and" | "or"`

                  Type of operation: `and` or `or`.

                  - `"and"`

                  - `"or"`

            - `max_num_results?: number`

              The maximum number of results to return. This number should be between 1 and 50 inclusive.

            - `ranking_options?: RankingOptions`

              Ranking options for search.

              - `hybrid_search?: HybridSearch`

                Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

                - `embedding_weight: number`

                  The weight of the embedding in the reciprocal ranking fusion.

                - `text_weight: number`

                  The weight of the text in the reciprocal ranking fusion.

              - `ranker?: "auto" | "default-2024-11-15"`

                The ranker to use for the file search.

                - `"auto"`

                - `"default-2024-11-15"`

              - `score_threshold?: number`

                The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

          - `ComputerTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `type: "computer"`

              The type of the computer tool. Always `computer`.

              - `"computer"`

          - `ComputerUsePreviewTool`

            A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

            - `display_height: number`

              The height of the computer display.

            - `display_width: number`

              The width of the computer display.

            - `environment: "windows" | "mac" | "linux" | 2 more`

              The type of computer environment to control.

              - `"windows"`

              - `"mac"`

              - `"linux"`

              - `"ubuntu"`

              - `"browser"`

            - `type: "computer_use_preview"`

              The type of the computer use tool. Always `computer_use_preview`.

              - `"computer_use_preview"`

          - `WebSearchTool`

            Search the Internet for sources related to the prompt. Learn more about the
            [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search" | "web_search_2025_08_26"`

              The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

              - `"web_search"`

              - `"web_search_2025_08_26"`

            - `filters?: Filters | null`

              Filters for the search.

              - `allowed_domains?: Array<string> | null`

                Allowed domains for the search. If not provided, all domains are allowed.
                Subdomains of the provided domains are allowed as well.

                Example: `["pubmed.ncbi.nlm.nih.gov"]`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The approximate location of the user.

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

              - `type?: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

          - `Mcp`

            Give the model access to additional tools via remote Model Context Protocol
            (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

            - `server_label: string`

              A label for this MCP server, used to identify it in tool calls.

            - `type: "mcp"`

              The type of the MCP tool. Always `mcp`.

              - `"mcp"`

            - `allowed_tools?: Array<string> | McpToolFilter | null`

              List of allowed tool names or a filter object.

              - `Array<string>`

              - `McpToolFilter`

                A filter object to specify which tools are allowed.

                - `read_only?: boolean`

                  Indicates whether or not a tool modifies data or is read-only. If an
                  MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                  it will match this filter.

                - `tool_names?: Array<string>`

                  List of allowed tool names.

            - `authorization?: string`

              An OAuth access token that can be used with a remote MCP server, either
              with a custom MCP server URL or a service connector. Your application
              must handle the OAuth authorization flow and provide the token here.

            - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

              Identifier for service connectors, like those available in ChatGPT. One of
              `server_url` or `connector_id` must be provided. Learn more about service
              connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

              Currently supported `connector_id` values are:

              - Dropbox: `connector_dropbox`
              - Gmail: `connector_gmail`
              - Google Calendar: `connector_googlecalendar`
              - Google Drive: `connector_googledrive`
              - Microsoft Teams: `connector_microsoftteams`
              - Outlook Calendar: `connector_outlookcalendar`
              - Outlook Email: `connector_outlookemail`
              - SharePoint: `connector_sharepoint`

              - `"connector_dropbox"`

              - `"connector_gmail"`

              - `"connector_googlecalendar"`

              - `"connector_googledrive"`

              - `"connector_microsoftteams"`

              - `"connector_outlookcalendar"`

              - `"connector_outlookemail"`

              - `"connector_sharepoint"`

            - `defer_loading?: boolean`

              Whether this MCP tool is deferred and discovered via tool search.

            - `headers?: Record<string, string> | null`

              Optional HTTP headers to send to the MCP server. Use for authentication
              or other purposes.

            - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

              Specify which of the MCP server's tools require approval.

              - `McpToolApprovalFilter`

                Specify which of the MCP server's tools require approval. Can be
                `always`, `never`, or a filter object associated with tools
                that require approval.

                - `always?: Always`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

                - `never?: Never`

                  A filter object to specify which tools are allowed.

                  - `read_only?: boolean`

                    Indicates whether or not a tool modifies data or is read-only. If an
                    MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                    it will match this filter.

                  - `tool_names?: Array<string>`

                    List of allowed tool names.

              - `"always" | "never"`

                - `"always"`

                - `"never"`

            - `server_description?: string`

              Optional description of the MCP server, used to provide more context.

            - `server_url?: string`

              The URL for the MCP server. One of `server_url` or `connector_id` must be
              provided.

          - `CodeInterpreter`

            A tool that runs Python code to help generate a response to a prompt.

            - `container: string | CodeInterpreterToolAuto`

              The code interpreter container. Can be a container ID or an object that
              specifies uploaded file IDs to make available to your code, along with an
              optional `memory_limit` setting.

              - `string`

              - `CodeInterpreterToolAuto`

                Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

                - `type: "auto"`

                  Always `auto`.

                  - `"auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the code interpreter container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

            - `type: "code_interpreter"`

              The type of the code interpreter tool. Always `code_interpreter`.

              - `"code_interpreter"`

          - `ImageGeneration`

            A tool that generates images using the GPT image models.

            - `type: "image_generation"`

              The type of the image generation tool. Always `image_generation`.

              - `"image_generation"`

            - `action?: "generate" | "edit" | "auto"`

              Whether to generate a new image or edit an existing image. Default: `auto`.

              - `"generate"`

              - `"edit"`

              - `"auto"`

            - `background?: "transparent" | "opaque" | "auto"`

              Background type for the generated image. One of `transparent`,
              `opaque`, or `auto`. Default: `auto`.

              - `"transparent"`

              - `"opaque"`

              - `"auto"`

            - `input_fidelity?: "high" | "low" | null`

              Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

              - `"high"`

              - `"low"`

            - `input_image_mask?: InputImageMask`

              Optional mask for inpainting. Contains `image_url`
              (string, optional) and `file_id` (string, optional).

              - `file_id?: string`

                File ID for the mask image.

              - `image_url?: string`

                Base64-encoded mask image.

            - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

              The image generation model to use. Default: `gpt-image-1`.

              - `(string & {})`

              - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

                - `"gpt-image-1"`

                - `"gpt-image-1-mini"`

                - `"gpt-image-1.5"`

            - `moderation?: "auto" | "low"`

              Moderation level for the generated image. Default: `auto`.

              - `"auto"`

              - `"low"`

            - `output_compression?: number`

              Compression level for the output image. Default: 100.

            - `output_format?: "png" | "webp" | "jpeg"`

              The output format of the generated image. One of `png`, `webp`, or
              `jpeg`. Default: `png`.

              - `"png"`

              - `"webp"`

              - `"jpeg"`

            - `partial_images?: number`

              Number of partial images to generate in streaming mode, from 0 (default value) to 3.

            - `quality?: "low" | "medium" | "high" | "auto"`

              The quality of the generated image. One of `low`, `medium`, `high`,
              or `auto`. Default: `auto`.

              - `"low"`

              - `"medium"`

              - `"high"`

              - `"auto"`

            - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

              The size of the generated image. One of `1024x1024`, `1024x1536`,
              `1536x1024`, or `auto`. Default: `auto`.

              - `"1024x1024"`

              - `"1024x1536"`

              - `"1536x1024"`

              - `"auto"`

          - `LocalShell`

            A tool that allows the model to execute shell commands in a local environment.

            - `type: "local_shell"`

              The type of the local shell tool. Always `local_shell`.

              - `"local_shell"`

          - `FunctionShellTool`

            A tool that allows the model to execute shell commands.

            - `type: "shell"`

              The type of the shell tool. Always `shell`.

              - `"shell"`

            - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

              - `ContainerAuto`

                - `type: "container_auto"`

                  Automatically creates a container for this request

                  - `"container_auto"`

                - `file_ids?: Array<string>`

                  An optional list of uploaded files to make available to your code.

                - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

                  The memory limit for the container.

                  - `"1g"`

                  - `"4g"`

                  - `"16g"`

                  - `"64g"`

                - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

                  Network access policy for the container.

                  - `ContainerNetworkPolicyDisabled`

                    - `type: "disabled"`

                      Disable outbound network access. Always `disabled`.

                      - `"disabled"`

                  - `ContainerNetworkPolicyAllowlist`

                    - `allowed_domains: Array<string>`

                      A list of allowed domains when type is `allowlist`.

                    - `type: "allowlist"`

                      Allow outbound network access only to specified domains. Always `allowlist`.

                      - `"allowlist"`

                    - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                      Optional domain-scoped secrets for allowlisted domains.

                      - `domain: string`

                        The domain associated with the secret.

                      - `name: string`

                        The name of the secret to inject for the domain.

                      - `value: string`

                        The secret value to inject for the domain.

                - `skills?: Array<SkillReference | InlineSkill>`

                  An optional list of skills referenced by id or inline data.

                  - `SkillReference`

                    - `skill_id: string`

                      The ID of the referenced skill.

                    - `type: "skill_reference"`

                      References a skill created with the /v1/skills endpoint.

                      - `"skill_reference"`

                    - `version?: string`

                      Optional skill version. Use a positive integer or 'latest'. Omit for default.

                  - `InlineSkill`

                    - `description: string`

                      The description of the skill.

                    - `name: string`

                      The name of the skill.

                    - `source: InlineSkillSource`

                      Inline skill payload

                      - `data: string`

                        Base64-encoded skill zip bundle.

                      - `media_type: "application/zip"`

                        The media type of the inline skill payload. Must be `application/zip`.

                        - `"application/zip"`

                      - `type: "base64"`

                        The type of the inline skill source. Must be `base64`.

                        - `"base64"`

                    - `type: "inline"`

                      Defines an inline skill for this request.

                      - `"inline"`

              - `LocalEnvironment`

                - `type: "local"`

                  Use a local computer environment.

                  - `"local"`

                - `skills?: Array<LocalSkill>`

                  An optional list of skills.

                  - `description: string`

                    The description of the skill.

                  - `name: string`

                    The name of the skill.

                  - `path: string`

                    The path to the directory containing the skill.

              - `ContainerReference`

                - `container_id: string`

                  The ID of the referenced container.

                - `type: "container_reference"`

                  References a container created with the /v1/containers endpoint

                  - `"container_reference"`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

          - `NamespaceTool`

            Groups function/custom tools under a shared namespace.

            - `description: string`

              A description of the namespace shown to the model.

            - `name: string`

              The namespace name used in tool calls (for example, `crm`).

            - `tools: Array<Function | CustomTool>`

              The function/custom tools available inside this namespace.

              - `Function`

                - `name: string`

                - `type: "function"`

                  - `"function"`

                - `defer_loading?: boolean`

                  Whether this function should be deferred and discovered via tool search.

                - `description?: string | null`

                - `parameters?: unknown`

                - `strict?: boolean | null`

              - `CustomTool`

                A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

                - `name: string`

                  The name of the custom tool, used to identify it in tool calls.

                - `type: "custom"`

                  The type of the custom tool. Always `custom`.

                  - `"custom"`

                - `defer_loading?: boolean`

                  Whether this tool should be deferred and discovered via tool search.

                - `description?: string`

                  Optional description of the custom tool, used to provide more context.

                - `format?: CustomToolInputFormat`

                  The input format for the custom tool. Default is unconstrained text.

                  - `Text`

                    Unconstrained free-form text.

                    - `type: "text"`

                      Unconstrained text format. Always `text`.

                      - `"text"`

                  - `Grammar`

                    A grammar defined by the user.

                    - `definition: string`

                      The grammar definition.

                    - `syntax: "lark" | "regex"`

                      The syntax of the grammar definition. One of `lark` or `regex`.

                      - `"lark"`

                      - `"regex"`

                    - `type: "grammar"`

                      Grammar format. Always `grammar`.

                      - `"grammar"`

            - `type: "namespace"`

              The type of the tool. Always `namespace`.

              - `"namespace"`

          - `ToolSearchTool`

            Hosted or BYOT tool search configuration for deferred tools.

            - `type: "tool_search"`

              The type of the tool. Always `tool_search`.

              - `"tool_search"`

            - `description?: string | null`

              Description shown to the model for a client-executed tool search tool.

            - `execution?: "server" | "client"`

              Whether tool search is executed by the server or by the client.

              - `"server"`

              - `"client"`

            - `parameters?: unknown`

              Parameter schema for a client-executed tool search tool.

          - `WebSearchPreviewTool`

            This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

            - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

              The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

              - `"web_search_preview"`

              - `"web_search_preview_2025_03_11"`

            - `search_content_types?: Array<"text" | "image">`

              - `"text"`

              - `"image"`

            - `search_context_size?: "low" | "medium" | "high"`

              High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

              - `"low"`

              - `"medium"`

              - `"high"`

            - `user_location?: UserLocation | null`

              The user's location.

              - `type: "approximate"`

                The type of location approximation. Always `approximate`.

                - `"approximate"`

              - `city?: string | null`

                Free text input for the city of the user, e.g. `San Francisco`.

              - `country?: string | null`

                The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

              - `region?: string | null`

                Free text input for the region of the user, e.g. `California`.

              - `timezone?: string | null`

                The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `ApplyPatchTool`

            Allows the assistant to create, delete, or update files using unified diffs.

            - `type: "apply_patch"`

              The type of the tool. Always `apply_patch`.

              - `"apply_patch"`

        - `top_p?: number`

          An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `eval_id: string`

    The identifier of the associated evaluation.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that is evaluated, if applicable.

  - `name: string`

    The name of the evaluation run.

  - `object: "eval.run"`

    The type of the object. Always "eval.run".

    - `"eval.run"`

  - `per_model_usage: Array<PerModelUsage>`

    Usage statistics for each model during the evaluation run.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `invocation_count: number`

      The number of invocations.

    - `model_name: string`

      The name of the model.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

  - `per_testing_criteria_results: Array<PerTestingCriteriaResult>`

    Results per testing criteria applied during the evaluation run.

    - `failed: number`

      Number of tests failed for this criteria.

    - `passed: number`

      Number of tests passed for this criteria.

    - `testing_criteria: string`

      A description of the testing criteria.

  - `report_url: string`

    The URL to the rendered evaluation run report on the UI dashboard.

  - `result_counts: ResultCounts`

    Counters summarizing the outcomes of the evaluation run.

    - `errored: number`

      Number of output items that resulted in an error.

    - `failed: number`

      Number of output items that failed to pass the evaluation.

    - `passed: number`

      Number of output items that passed the evaluation.

    - `total: number`

      Total number of executed output items.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.evals.runs.cancel('run_id', { eval_id: 'eval_id' });

console.log(response.id);
```

## Delete

`client.evals.runs.delete(stringrunID, RunDeleteParamsparams, RequestOptionsoptions?): RunDeleteResponse`

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Parameters

- `runID: string`

- `params: RunDeleteParams`

  - `eval_id: string`

    The ID of the evaluation to delete the run from.

### Returns

- `RunDeleteResponse`

  - `deleted?: boolean`

  - `object?: string`

  - `run_id?: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const run = await client.evals.runs.delete('run_id', { eval_id: 'eval_id' });

console.log(run.run_id);
```

## Domain Types

### Create Eval Completions Run Data Source

- `CreateEvalCompletionsRunDataSource`

  A CompletionsRunDataSource object describing a model sampling configuration.

  - `source: FileContent | FileID | StoredCompletions`

    Determines what populates the `item` namespace in this run's data source.

    - `FileContent`

      - `content: Array<Content>`

        The content of the jsonl file.

        - `item: Record<string, unknown>`

        - `sample?: Record<string, unknown>`

      - `type: "file_content"`

        The type of jsonl source. Always `file_content`.

        - `"file_content"`

    - `FileID`

      - `id: string`

        The identifier of the file.

      - `type: "file_id"`

        The type of jsonl source. Always `file_id`.

        - `"file_id"`

    - `StoredCompletions`

      A StoredCompletionsRunDataSource configuration describing a set of filters

      - `type: "stored_completions"`

        The type of source. Always `stored_completions`.

        - `"stored_completions"`

      - `created_after?: number | null`

        An optional Unix timestamp to filter items created after this time.

      - `created_before?: number | null`

        An optional Unix timestamp to filter items created before this time.

      - `limit?: number | null`

        An optional maximum number of items to return.

      - `metadata?: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model?: string | null`

        An optional model to filter by (e.g., 'gpt-4o').

  - `type: "completions"`

    The type of run data source. Always `completions`.

    - `"completions"`

  - `input_messages?: Template | ItemReference`

    Used when sampling from a model. Dictates the structure of the messages passed into the model. Can either be a reference to a prebuilt trajectory (ie, `item.input_trajectory`), or a template with variable references to the `item` namespace.

    - `Template`

      - `template: Array<EasyInputMessage | EvalItem>`

        A list of chat messages forming the prompt or context. May include variable references to the `item` namespace, ie {{item.name}}.

        - `EasyInputMessage`

          A message input to the model with a role indicating instruction following
          hierarchy. Instructions given with the `developer` or `system` role take
          precedence over instructions given with the `user` role. Messages with the
          `assistant` role are presumed to have been generated by the model in previous
          interactions.

          - `content: string | ResponseInputMessageContentList`

            Text, image, or audio input to the model, used to generate a response.
            Can also contain previous assistant responses.

            - `string`

            - `ResponseInputMessageContentList = Array<ResponseInputContent>`

              A list of one or many input items to the model, containing different content
              types.

              - `ResponseInputText`

                A text input to the model.

                - `text: string`

                  The text input to the model.

                - `type: "input_text"`

                  The type of the input item. Always `input_text`.

                  - `"input_text"`

              - `ResponseInputImage`

                An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

                - `detail: "low" | "high" | "auto" | "original"`

                  The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

                  - `"low"`

                  - `"high"`

                  - `"auto"`

                  - `"original"`

                - `type: "input_image"`

                  The type of the input item. Always `input_image`.

                  - `"input_image"`

                - `file_id?: string | null`

                  The ID of the file to be sent to the model.

                - `image_url?: string | null`

                  The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

              - `ResponseInputFile`

                A file input to the model.

                - `type: "input_file"`

                  The type of the input item. Always `input_file`.

                  - `"input_file"`

                - `file_data?: string`

                  The content of the file to be sent to the model.

                - `file_id?: string | null`

                  The ID of the file to be sent to the model.

                - `file_url?: string`

                  The URL of the file to be sent to the model.

                - `filename?: string`

                  The name of the file to be sent to the model.

          - `role: "user" | "assistant" | "system" | "developer"`

            The role of the message input. One of `user`, `assistant`, `system`, or
            `developer`.

            - `"user"`

            - `"assistant"`

            - `"system"`

            - `"developer"`

          - `phase?: "commentary" | "final_answer" | null`

            Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
            For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
            phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

            - `"commentary"`

            - `"final_answer"`

          - `type?: "message"`

            The type of the message input. Always `message`.

            - `"message"`

        - `EvalItem`

          A message input to the model with a role indicating instruction following
          hierarchy. Instructions given with the `developer` or `system` role take
          precedence over instructions given with the `user` role. Messages with the
          `assistant` role are presumed to have been generated by the model in previous
          interactions.

          - `content: string | ResponseInputText | OutputText | 3 more`

            Inputs to the model - can contain template strings. Supports text, output text, input images, and input audio, either as a single item or an array of items.

            - `string`

            - `ResponseInputText`

              A text input to the model.

              - `text: string`

                The text input to the model.

              - `type: "input_text"`

                The type of the input item. Always `input_text`.

                - `"input_text"`

            - `OutputText`

              A text output from the model.

              - `text: string`

                The text output from the model.

              - `type: "output_text"`

                The type of the output text. Always `output_text`.

                - `"output_text"`

            - `InputImage`

              An image input block used within EvalItem content arrays.

              - `image_url: string`

                The URL of the image input.

              - `type: "input_image"`

                The type of the image input. Always `input_image`.

                - `"input_image"`

              - `detail?: string`

                The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `ResponseInputAudio`

              An audio input to the model.

              - `input_audio: InputAudio`

                - `data: string`

                  Base64-encoded audio data.

                - `format: "mp3" | "wav"`

                  The format of the audio data. Currently supported formats are `mp3` and
                  `wav`.

                  - `"mp3"`

                  - `"wav"`

              - `type: "input_audio"`

                The type of the input item. Always `input_audio`.

                - `"input_audio"`

            - `GraderInputs = Array<string | ResponseInputText | OutputText | 2 more>`

              A list of inputs, each of which may be either an input text, output text, input
              image, or input audio object.

              - `string`

              - `ResponseInputText`

                A text input to the model.

                - `text: string`

                  The text input to the model.

                - `type: "input_text"`

                  The type of the input item. Always `input_text`.

                  - `"input_text"`

              - `OutputText`

                A text output from the model.

                - `text: string`

                  The text output from the model.

                - `type: "output_text"`

                  The type of the output text. Always `output_text`.

                  - `"output_text"`

              - `InputImage`

                An image input block used within EvalItem content arrays.

                - `image_url: string`

                  The URL of the image input.

                - `type: "input_image"`

                  The type of the image input. Always `input_image`.

                  - `"input_image"`

                - `detail?: string`

                  The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

              - `ResponseInputAudio`

                An audio input to the model.

                - `input_audio: InputAudio`

                  - `data: string`

                    Base64-encoded audio data.

                  - `format: "mp3" | "wav"`

                    The format of the audio data. Currently supported formats are `mp3` and
                    `wav`.

                    - `"mp3"`

                    - `"wav"`

                - `type: "input_audio"`

                  The type of the input item. Always `input_audio`.

                  - `"input_audio"`

          - `role: "user" | "assistant" | "system" | "developer"`

            The role of the message input. One of `user`, `assistant`, `system`, or
            `developer`.

            - `"user"`

            - `"assistant"`

            - `"system"`

            - `"developer"`

          - `type?: "message"`

            The type of the message input. Always `message`.

            - `"message"`

      - `type: "template"`

        The type of input messages. Always `template`.

        - `"template"`

    - `ItemReference`

      - `item_reference: string`

        A reference to a variable in the `item` namespace. Ie, "item.input_trajectory"

      - `type: "item_reference"`

        The type of input messages. Always `item_reference`.

        - `"item_reference"`

  - `model?: string`

    The name of the model to use for generating completions (e.g. "o3-mini").

  - `sampling_params?: SamplingParams`

    - `max_completion_tokens?: number`

      The maximum number of tokens in the generated output.

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

    - `seed?: number`

      A seed value to initialize the randomness, during sampling.

    - `temperature?: number`

      A higher temperature increases randomness in the outputs.

    - `tools?: Array<ChatCompletionFunctionTool>`

      A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.

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

    - `top_p?: number`

      An alternative to temperature for nucleus sampling; 1.0 includes all tokens.

### Create Eval JSONL Run Data Source

- `CreateEvalJSONLRunDataSource`

  A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

  - `source: FileContent | FileID`

    Determines what populates the `item` namespace in the data source.

    - `FileContent`

      - `content: Array<Content>`

        The content of the jsonl file.

        - `item: Record<string, unknown>`

        - `sample?: Record<string, unknown>`

      - `type: "file_content"`

        The type of jsonl source. Always `file_content`.

        - `"file_content"`

    - `FileID`

      - `id: string`

        The identifier of the file.

      - `type: "file_id"`

        The type of jsonl source. Always `file_id`.

        - `"file_id"`

  - `type: "jsonl"`

    The type of data source. Always `jsonl`.

    - `"jsonl"`

### Eval API Error

- `EvalAPIError`

  An object representing an error response from the Eval API.

  - `code: string`

    The error code.

  - `message: string`

    The error message.

# Output Items

## List

`client.evals.runs.outputItems.list(stringrunID, OutputItemListParamsparams, RequestOptionsoptions?): CursorPage<OutputItemListResponse>`

**get** `/evals/{eval_id}/runs/{run_id}/output_items`

Get a list of output items for an evaluation run.

### Parameters

- `runID: string`

- `params: OutputItemListParams`

  - `eval_id: string`

    Path param: The ID of the evaluation to retrieve runs for.

  - `after?: string`

    Query param: Identifier for the last output item from the previous pagination request.

  - `limit?: number`

    Query param: Number of output items to retrieve.

  - `order?: "asc" | "desc"`

    Query param: Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

    - `"asc"`

    - `"desc"`

  - `status?: "fail" | "pass"`

    Query param: Filter output items by status. Use `failed` to filter by failed output
    items or `pass` to filter by passed output items.

    - `"fail"`

    - `"pass"`

### Returns

- `OutputItemListResponse`

  A schema representing an evaluation run output item.

  - `id: string`

    Unique identifier for the evaluation run output item.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Record<string, unknown>`

    Details of the input data source item.

  - `datasource_item_id: number`

    The identifier for the data source item.

  - `eval_id: string`

    The identifier of the evaluation group.

  - `object: "eval.run.output_item"`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: Array<Result>`

    A list of grader results for this output item.

    - `name: string`

      The name of the grader.

    - `passed: boolean`

      Whether the grader considered the output a pass.

    - `score: number`

      The numeric score produced by the grader.

    - `sample?: Record<string, unknown> | null`

      Optional sample or intermediate data produced by the grader.

    - `type?: string`

      The grader type (for example, "string-check-grader").

  - `run_id: string`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: string`

        The error code.

      - `message: string`

        The error message.

    - `finish_reason: string`

      The reason why the sample generation was finished.

    - `input: Array<Input>`

      An array of input messages.

      - `content: string`

        The content of the message.

      - `role: string`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: number`

      The maximum number of tokens allowed for completion.

    - `model: string`

      The model used for generating the sample.

    - `output: Array<Output>`

      An array of output messages.

      - `content?: string`

        The content of the message.

      - `role?: string`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: number`

      The seed used for generating the sample.

    - `temperature: number`

      The sampling temperature used.

    - `top_p: number`

      The top_p value used for sampling.

    - `usage: Usage`

      Token usage details for the sample.

      - `cached_tokens: number`

        The number of tokens retrieved from cache.

      - `completion_tokens: number`

        The number of completion tokens generated.

      - `prompt_tokens: number`

        The number of prompt tokens used.

      - `total_tokens: number`

        The total number of tokens used.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const outputItemListResponse of client.evals.runs.outputItems.list('run_id', {
  eval_id: 'eval_id',
})) {
  console.log(outputItemListResponse.id);
}
```

## Retrieve

`client.evals.runs.outputItems.retrieve(stringoutputItemID, OutputItemRetrieveParamsparams, RequestOptionsoptions?): OutputItemRetrieveResponse`

**get** `/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}`

Get an evaluation run output item by ID.

### Parameters

- `outputItemID: string`

- `params: OutputItemRetrieveParams`

  - `eval_id: string`

    The ID of the evaluation to retrieve runs for.

  - `run_id: string`

    The ID of the run to retrieve.

### Returns

- `OutputItemRetrieveResponse`

  A schema representing an evaluation run output item.

  - `id: string`

    Unique identifier for the evaluation run output item.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Record<string, unknown>`

    Details of the input data source item.

  - `datasource_item_id: number`

    The identifier for the data source item.

  - `eval_id: string`

    The identifier of the evaluation group.

  - `object: "eval.run.output_item"`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: Array<Result>`

    A list of grader results for this output item.

    - `name: string`

      The name of the grader.

    - `passed: boolean`

      Whether the grader considered the output a pass.

    - `score: number`

      The numeric score produced by the grader.

    - `sample?: Record<string, unknown> | null`

      Optional sample or intermediate data produced by the grader.

    - `type?: string`

      The grader type (for example, "string-check-grader").

  - `run_id: string`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: string`

        The error code.

      - `message: string`

        The error message.

    - `finish_reason: string`

      The reason why the sample generation was finished.

    - `input: Array<Input>`

      An array of input messages.

      - `content: string`

        The content of the message.

      - `role: string`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: number`

      The maximum number of tokens allowed for completion.

    - `model: string`

      The model used for generating the sample.

    - `output: Array<Output>`

      An array of output messages.

      - `content?: string`

        The content of the message.

      - `role?: string`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: number`

      The seed used for generating the sample.

    - `temperature: number`

      The sampling temperature used.

    - `top_p: number`

      The top_p value used for sampling.

    - `usage: Usage`

      Token usage details for the sample.

      - `cached_tokens: number`

        The number of tokens retrieved from cache.

      - `completion_tokens: number`

        The number of completion tokens generated.

      - `prompt_tokens: number`

        The number of prompt tokens used.

      - `total_tokens: number`

        The total number of tokens used.

  - `status: string`

    The status of the evaluation run.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const outputItem = await client.evals.runs.outputItems.retrieve('output_item_id', {
  eval_id: 'eval_id',
  run_id: 'run_id',
});

console.log(outputItem.id);
```
