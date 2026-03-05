# Runs

## List

**get** `/threads/{thread_id}/runs`

Returns a list of runs belonging to a thread.

### Path Parameters

- `thread_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Run`

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/threads/{thread_id}/runs`

Create a run.

### Path Parameters

- `thread_id: string`

### Query Parameters

- `include: optional array of RunStepInclude`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Body Parameters

- `assistant_id: string`

  The ID of the [assistant](/docs/api-reference/assistants) to use to execute this run.

- `additional_instructions: optional string`

  Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.

- `additional_messages: optional array of object { content, role, attachments, metadata }`

  Adds additional messages to the thread before creating the run.

  - `content: string or array of ImageFileContentBlock or ImageURLContentBlock or TextContentBlockParam`

    The text contents of the message.

    - `TextContent = string`

      The text contents of the message.

    - `ArrayOfContentParts = array of ImageFileContentBlock or ImageURLContentBlock or TextContentBlockParam`

      An array of content parts with a defined type, each can be of type `text` or images can be passed with `image_url` or `image_file`. Image types are only supported on [Vision-compatible models](/docs/models).

      - `ImageFileContentBlock = object { image_file, type }`

        References an image [File](/docs/api-reference/files) in the content of a message.

        - `image_file: ImageFile`

          - `file_id: string`

            The [File](/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `detail: optional "auto" or "low" or "high"`

            Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: "image_file"`

          Always `image_file`.

          - `"image_file"`

      - `ImageURLContentBlock = object { image_url, type }`

        References an image URL in the content of a message.

        - `image_url: ImageURL`

          - `url: string`

            The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

          - `detail: optional "auto" or "low" or "high"`

            Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

            - `"auto"`

            - `"low"`

            - `"high"`

        - `type: "image_url"`

          The type of the content part.

          - `"image_url"`

      - `TextContentBlockParam = object { text, type }`

        The text content that is part of a message.

        - `text: string`

          Text content to be sent to the model

        - `type: "text"`

          Always `text`.

          - `"text"`

  - `role: "user" or "assistant"`

    The role of the entity that is creating the message. Allowed values include:

    - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
    - `assistant`: Indicates the message is generated by the assistant. Use this value to insert messages from the assistant into the conversation.

    - `"user"`

    - `"assistant"`

  - `attachments: optional array of object { file_id, tools }`

    A list of files attached to the message, and the tools they should be added to.

    - `file_id: optional string`

      The ID of the file to attach to the message.

    - `tools: optional array of CodeInterpreterTool or object { type }`

      The tools to add this file to.

      - `CodeInterpreterTool = object { type }`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `FileSearchTool = object { type }`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `metadata: optional Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

- `instructions: optional string`

  Overrides the [instructions](/docs/api-reference/assistants/createAssistant) of the assistant. This is useful for modifying the behavior on a per-run basis.

- `max_completion_tokens: optional number`

  The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `max_prompt_tokens: optional number`

  The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.

- `metadata: optional Metadata`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `model: optional string or "gpt-5" or "gpt-5-mini" or "gpt-5-nano" or 39 more`

  The ID of the [Model](/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.

  - `UnionMember0 = string`

  - `AssistantSupportedModels = "gpt-5" or "gpt-5-mini" or "gpt-5-nano" or 39 more`

    The ID of the [Model](/docs/api-reference/models) to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.

    - `"gpt-5"`

    - `"gpt-5-mini"`

    - `"gpt-5-nano"`

    - `"gpt-5-2025-08-07"`

    - `"gpt-5-mini-2025-08-07"`

    - `"gpt-5-nano-2025-08-07"`

    - `"gpt-4.1"`

    - `"gpt-4.1-mini"`

    - `"gpt-4.1-nano"`

    - `"gpt-4.1-2025-04-14"`

    - `"gpt-4.1-mini-2025-04-14"`

    - `"gpt-4.1-nano-2025-04-14"`

    - `"o3-mini"`

    - `"o3-mini-2025-01-31"`

    - `"o1"`

    - `"o1-2024-12-17"`

    - `"gpt-4o"`

    - `"gpt-4o-2024-11-20"`

    - `"gpt-4o-2024-08-06"`

    - `"gpt-4o-2024-05-13"`

    - `"gpt-4o-mini"`

    - `"gpt-4o-mini-2024-07-18"`

    - `"gpt-4.5-preview"`

    - `"gpt-4.5-preview-2025-02-27"`

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

    - `"gpt-3.5-turbo-0613"`

    - `"gpt-3.5-turbo-1106"`

    - `"gpt-3.5-turbo-0125"`

    - `"gpt-3.5-turbo-16k-0613"`

- `parallel_tool_calls: optional boolean`

  Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

- `reasoning_effort: optional ReasoningEffort`

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

- `response_format: optional AssistantResponseFormatOption`

  Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `UnionMember0 = "auto"`

    `auto` is the default value

    - `"auto"`

  - `ResponseFormatText = object { type }`

    Default response format. Used to generate text responses.

    - `type: "text"`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `ResponseFormatJSONObject = object { type }`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: "json_object"`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `ResponseFormatJSONSchema = object { json_schema, type }`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](/docs/guides/structured-outputs).

    - `json_schema: object { name, description, schema, strict }`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: string`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: optional string`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: optional map[unknown]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: optional boolean`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](/docs/guides/structured-outputs).

    - `type: "json_schema"`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `stream: optional boolean`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

- `temperature: optional number`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `tool_choice: optional AssistantToolChoiceOption`

  Controls which (if any) tool is called by the model.
  `none` means the model will not call any tools and instead generates a message.
  `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
  `required` means the model must call one or more tools before responding to the user.
  Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

  - `UnionMember0 = "none" or "auto" or "required"`

    `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

    - `"none"`

    - `"auto"`

    - `"required"`

  - `AssistantToolChoice = object { type, function }`

    Specifies a tool the model should use. Use to force the model to call a specific tool.

    - `type: "function" or "code_interpreter" or "file_search"`

      The type of the tool. If type is `function`, the function name must be set

      - `"function"`

      - `"code_interpreter"`

      - `"file_search"`

    - `function: optional AssistantToolChoiceFunction`

      - `name: string`

        The name of the function to call.

- `tools: optional array of CodeInterpreterTool or FileSearchTool or FunctionTool`

  Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.

  - `CodeInterpreterTool = object { type }`

    - `type: "code_interpreter"`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `FileSearchTool = object { type, file_search }`

    - `type: "file_search"`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: optional object { max_num_results, ranking_options }`

      Overrides for the file search tool.

      - `max_num_results: optional number`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: optional object { score_threshold, ranker }`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: number`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: optional "auto" or "default_2024_08_21"`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `FunctionTool = object { function, type }`

    - `function: FunctionDefinition`

      - `name: string`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: optional string`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: optional FunctionParameters`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: optional boolean`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

    - `type: "function"`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: optional number`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

- `truncation_strategy: optional object { type, last_messages }`

  Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

  - `type: "auto" or "last_messages"`

    The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

    - `"auto"`

    - `"last_messages"`

  - `last_messages: optional number`

    The number of most recent messages from the thread when constructing the context for the run.

### Returns

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "assistant_id": "assistant_id",
          "temperature": 1,
          "top_p": 1
        }'
```

## Retrieve

**get** `/threads/{thread_id}/runs/{run_id}`

Retrieves a run.

### Path Parameters

- `thread_id: string`

- `run_id: string`

### Returns

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update

**post** `/threads/{thread_id}/runs/{run_id}`

Modifies a run.

### Path Parameters

- `thread_id: string`

- `run_id: string`

### Body Parameters

- `metadata: optional Metadata`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

### Returns

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

## Submit Tool Outputs

**post** `/threads/{thread_id}/runs/{run_id}/submit_tool_outputs`

When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they're all completed. All outputs must be submitted in a single request.

### Path Parameters

- `thread_id: string`

- `run_id: string`

### Body Parameters

- `tool_outputs: array of object { output, tool_call_id }`

  A list of tools for which the outputs are being submitted.

  - `output: optional string`

    The output of the tool call to be submitted to continue the run.

  - `tool_call_id: optional string`

    The ID of the tool call in the `required_action` object within the run object the output is being submitted for.

- `stream: optional boolean`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

### Returns

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID/submit_tool_outputs \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "tool_outputs": [
            {}
          ]
        }'
```

## Cancel

**post** `/threads/{thread_id}/runs/{run_id}/cancel`

Cancels a run that is `in_progress`.

### Path Parameters

- `thread_id: string`

- `run_id: string`

### Returns

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID/cancel \
    -X POST \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Required Action Function Tool Call

- `RequiredActionFunctionToolCall = object { id, function, type }`

  Tool call objects

  - `id: string`

    The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

  - `function: object { arguments, name }`

    The function definition.

    - `arguments: string`

      The arguments that the model expects you to pass to the function.

    - `name: string`

      The name of the function.

  - `type: "function"`

    The type of tool call the output is required for. For now, this is always `function`.

    - `"function"`

### Run

- `Run = object { id, assistant_id, cancelled_at, 24 more }`

  Represents an execution run on a [thread](/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: object { reason }`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: optional "max_completion_tokens" or "max_prompt_tokens"`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: string`

    The instructions that the [assistant](/docs/api-reference/assistants) used for this run.

  - `last_error: object { code, message }`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded" or "invalid_prompt"`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: string`

      A human-readable description of the error.

  - `max_completion_tokens: number`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: number`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    The model that the [assistant](/docs/api-reference/assistants) used for this run.

  - `object: "thread.run"`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: boolean`

    Whether to enable [parallel function calling](/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: object { submit_tool_outputs, type }`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: object { tool_calls }`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: array of RequiredActionFunctionToolCall`

        A list of the relevant tool calls.

        - `id: string`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: object { arguments, name }`

          The function definition.

          - `arguments: string`

            The arguments that the model expects you to pass to the function.

          - `name: string`

            The name of the function.

        - `type: "function"`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: "submit_tool_outputs"`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

  - `response_format: AssistantResponseFormatOption`

    Specifies the format that the model must output. Compatible with [GPT-4o](/docs/models#gpt-4o), [GPT-4 Turbo](/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `UnionMember0 = "auto"`

      `auto` is the default value

      - `"auto"`

    - `ResponseFormatText = object { type }`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject = object { type }`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `ResponseFormatJSONSchema = object { json_schema, type }`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](/docs/guides/structured-outputs).

      - `json_schema: object { name, description, schema, strict }`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: string`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: optional map[unknown]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](/docs/guides/structured-outputs).

      - `type: "json_schema"`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `started_at: number`

    The Unix timestamp (in seconds) for when the run was started.

  - `status: "queued" or "in_progress" or "requires_action" or 6 more`

    The status of the run, which can be either `queued`, `in_progress`, `requires_action`, `cancelling`, `cancelled`, `failed`, `completed`, `incomplete`, or `expired`.

    - `"queued"`

    - `"in_progress"`

    - `"requires_action"`

    - `"cancelling"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"incomplete"`

    - `"expired"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: AssistantToolChoiceOption`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `UnionMember0 = "none" or "auto" or "required"`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `AssistantToolChoice = object { type, function }`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: "function" or "code_interpreter" or "file_search"`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: optional AssistantToolChoiceFunction`

        - `name: string`

          The name of the function to call.

  - `tools: array of CodeInterpreterTool or FileSearchTool or FunctionTool`

    The list of tools that the [assistant](/docs/api-reference/assistants) used for this run.

    - `CodeInterpreterTool = object { type }`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool = object { type, file_search }`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: optional object { max_num_results, ranking_options }`

        Overrides for the file search tool.

        - `max_num_results: optional number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: optional object { score_threshold, ranker }`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: optional "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool = object { function, type }`

      - `function: FunctionDefinition`

        - `name: string`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: optional string`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: optional FunctionParameters`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: optional boolean`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](/docs/guides/function-calling).

      - `type: "function"`

        The type of tool being defined: `function`

        - `"function"`

  - `truncation_strategy: object { type, last_messages }`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: "auto" or "last_messages"`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: optional number`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

  - `temperature: optional number`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: optional number`

    The nucleus sampling value used for this run. If not set, defaults to 1.

# Steps

## List

**get** `/threads/{thread_id}/runs/{run_id}/steps`

Returns a list of run steps belonging to a run.

### Path Parameters

- `thread_id: string`

- `run_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `include: optional array of RunStepInclude`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of RunStep`

  - `id: string`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: number`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: object { code, message }`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded"`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: string`

      A human-readable description of the error.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.run.step"`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: string`

    The ID of the [run](/docs/api-reference/runs) that this run step is a part of.

  - `status: "in_progress" or "cancelled" or "failed" or 2 more`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: MessageCreationStepDetails or ToolCallsStepDetails`

    The details of the run step.

    - `MessageCreationStepDetails = object { message_creation, type }`

      Details of the message creation by the run step.

      - `message_creation: object { message_id }`

        - `message_id: string`

          The ID of the message that was created by this run step.

      - `type: "message_creation"`

        Always `message_creation`.

        - `"message_creation"`

    - `ToolCallsStepDetails = object { tool_calls, type }`

      Details of the tool call.

      - `tool_calls: array of CodeInterpreterToolCall or FileSearchToolCall or FunctionToolCall`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `CodeInterpreterToolCall = object { id, code_interpreter, type }`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: string`

            The ID of the tool call.

          - `code_interpreter: object { input, outputs }`

            The Code Interpreter tool call definition.

            - `input: string`

              The input to the Code Interpreter tool call.

            - `outputs: array of object { logs, type }  or object { image, type }`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `CodeInterpreterLogOutput = object { logs, type }`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: string`

                  The text output from the Code Interpreter tool call.

                - `type: "logs"`

                  Always `logs`.

                  - `"logs"`

              - `CodeInterpreterImageOutput = object { image, type }`

                - `image: object { file_id }`

                  - `file_id: string`

                    The [file](/docs/api-reference/files) ID of the image.

                - `type: "image"`

                  Always `image`.

                  - `"image"`

          - `type: "code_interpreter"`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `FileSearchToolCall = object { id, file_search, type }`

          - `id: string`

            The ID of the tool call object.

          - `file_search: object { ranking_options, results }`

            For now, this is always going to be an empty object.

            - `ranking_options: optional object { ranker, score_threshold }`

              The ranking options for the file search.

              - `ranker: "auto" or "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: optional array of object { file_id, file_name, score, content }`

              The results of the file search.

              - `file_id: string`

                The ID of the file that result was found in.

              - `file_name: string`

                The name of the file that result was found in.

              - `score: number`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: optional array of object { text, type }`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: optional string`

                  The text content of the file.

                - `type: optional "text"`

                  The type of the content.

                  - `"text"`

          - `type: "file_search"`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `FunctionToolCall = object { id, function, type }`

          - `id: string`

            The ID of the tool call object.

          - `function: object { arguments, name, output }`

            The definition of the function that was called.

            - `arguments: string`

              The arguments passed to the function.

            - `name: string`

              The name of the function.

            - `output: string`

              The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: "function"`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: "tool_calls"`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was run.

  - `type: "message_creation" or "tool_calls"`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID/steps \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve

**get** `/threads/{thread_id}/runs/{run_id}/steps/{step_id}`

Retrieves a run step.

### Path Parameters

- `thread_id: string`

- `run_id: string`

- `step_id: string`

### Query Parameters

- `include: optional array of RunStepInclude`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Returns

- `RunStep = object { id, assistant_id, cancelled_at, 13 more }`

  Represents a step in execution of a run.

  - `id: string`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: number`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: object { code, message }`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded"`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: string`

      A human-readable description of the error.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.run.step"`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: string`

    The ID of the [run](/docs/api-reference/runs) that this run step is a part of.

  - `status: "in_progress" or "cancelled" or "failed" or 2 more`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: MessageCreationStepDetails or ToolCallsStepDetails`

    The details of the run step.

    - `MessageCreationStepDetails = object { message_creation, type }`

      Details of the message creation by the run step.

      - `message_creation: object { message_id }`

        - `message_id: string`

          The ID of the message that was created by this run step.

      - `type: "message_creation"`

        Always `message_creation`.

        - `"message_creation"`

    - `ToolCallsStepDetails = object { tool_calls, type }`

      Details of the tool call.

      - `tool_calls: array of CodeInterpreterToolCall or FileSearchToolCall or FunctionToolCall`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `CodeInterpreterToolCall = object { id, code_interpreter, type }`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: string`

            The ID of the tool call.

          - `code_interpreter: object { input, outputs }`

            The Code Interpreter tool call definition.

            - `input: string`

              The input to the Code Interpreter tool call.

            - `outputs: array of object { logs, type }  or object { image, type }`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `CodeInterpreterLogOutput = object { logs, type }`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: string`

                  The text output from the Code Interpreter tool call.

                - `type: "logs"`

                  Always `logs`.

                  - `"logs"`

              - `CodeInterpreterImageOutput = object { image, type }`

                - `image: object { file_id }`

                  - `file_id: string`

                    The [file](/docs/api-reference/files) ID of the image.

                - `type: "image"`

                  Always `image`.

                  - `"image"`

          - `type: "code_interpreter"`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `FileSearchToolCall = object { id, file_search, type }`

          - `id: string`

            The ID of the tool call object.

          - `file_search: object { ranking_options, results }`

            For now, this is always going to be an empty object.

            - `ranking_options: optional object { ranker, score_threshold }`

              The ranking options for the file search.

              - `ranker: "auto" or "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: optional array of object { file_id, file_name, score, content }`

              The results of the file search.

              - `file_id: string`

                The ID of the file that result was found in.

              - `file_name: string`

                The name of the file that result was found in.

              - `score: number`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: optional array of object { text, type }`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: optional string`

                  The text content of the file.

                - `type: optional "text"`

                  The type of the content.

                  - `"text"`

          - `type: "file_search"`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `FunctionToolCall = object { id, function, type }`

          - `id: string`

            The ID of the tool call object.

          - `function: object { arguments, name, output }`

            The definition of the function that was called.

            - `arguments: string`

              The arguments passed to the function.

            - `name: string`

              The name of the function.

            - `output: string`

              The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: "function"`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: "tool_calls"`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was run.

  - `type: "message_creation" or "tool_calls"`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/runs/$RUN_ID/steps/$STEP_ID \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Code Interpreter Logs

- `CodeInterpreterLogs = object { index, type, logs }`

  Text output from the Code Interpreter tool call as part of a run step.

  - `index: number`

    The index of the output in the outputs array.

  - `type: "logs"`

    Always `logs`.

    - `"logs"`

  - `logs: optional string`

    The text output from the Code Interpreter tool call.

### Code Interpreter Output Image

- `CodeInterpreterOutputImage = object { index, type, image }`

  - `index: number`

    The index of the output in the outputs array.

  - `type: "image"`

    Always `image`.

    - `"image"`

  - `image: optional object { file_id }`

    - `file_id: optional string`

      The [file](/docs/api-reference/files) ID of the image.

### Code Interpreter Tool Call

- `CodeInterpreterToolCall = object { id, code_interpreter, type }`

  Details of the Code Interpreter tool call the run step was involved in.

  - `id: string`

    The ID of the tool call.

  - `code_interpreter: object { input, outputs }`

    The Code Interpreter tool call definition.

    - `input: string`

      The input to the Code Interpreter tool call.

    - `outputs: array of object { logs, type }  or object { image, type }`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `CodeInterpreterLogOutput = object { logs, type }`

        Text output from the Code Interpreter tool call as part of a run step.

        - `logs: string`

          The text output from the Code Interpreter tool call.

        - `type: "logs"`

          Always `logs`.

          - `"logs"`

      - `CodeInterpreterImageOutput = object { image, type }`

        - `image: object { file_id }`

          - `file_id: string`

            The [file](/docs/api-reference/files) ID of the image.

        - `type: "image"`

          Always `image`.

          - `"image"`

  - `type: "code_interpreter"`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

### Code Interpreter Tool Call Delta

- `CodeInterpreterToolCallDelta = object { index, type, id, code_interpreter }`

  Details of the Code Interpreter tool call the run step was involved in.

  - `index: number`

    The index of the tool call in the tool calls array.

  - `type: "code_interpreter"`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

  - `id: optional string`

    The ID of the tool call.

  - `code_interpreter: optional object { input, outputs }`

    The Code Interpreter tool call definition.

    - `input: optional string`

      The input to the Code Interpreter tool call.

    - `outputs: optional array of CodeInterpreterLogs or CodeInterpreterOutputImage`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `CodeInterpreterLogs = object { index, type, logs }`

        Text output from the Code Interpreter tool call as part of a run step.

        - `index: number`

          The index of the output in the outputs array.

        - `type: "logs"`

          Always `logs`.

          - `"logs"`

        - `logs: optional string`

          The text output from the Code Interpreter tool call.

      - `CodeInterpreterOutputImage = object { index, type, image }`

        - `index: number`

          The index of the output in the outputs array.

        - `type: "image"`

          Always `image`.

          - `"image"`

        - `image: optional object { file_id }`

          - `file_id: optional string`

            The [file](/docs/api-reference/files) ID of the image.

### File Search Tool Call

- `FileSearchToolCall = object { id, file_search, type }`

  - `id: string`

    The ID of the tool call object.

  - `file_search: object { ranking_options, results }`

    For now, this is always going to be an empty object.

    - `ranking_options: optional object { ranker, score_threshold }`

      The ranking options for the file search.

      - `ranker: "auto" or "default_2024_08_21"`

        The ranker to use for the file search. If not specified will use the `auto` ranker.

        - `"auto"`

        - `"default_2024_08_21"`

      - `score_threshold: number`

        The score threshold for the file search. All values must be a floating point number between 0 and 1.

    - `results: optional array of object { file_id, file_name, score, content }`

      The results of the file search.

      - `file_id: string`

        The ID of the file that result was found in.

      - `file_name: string`

        The name of the file that result was found in.

      - `score: number`

        The score of the result. All values must be a floating point number between 0 and 1.

      - `content: optional array of object { text, type }`

        The content of the result that was found. The content is only included if requested via the include query parameter.

        - `text: optional string`

          The text content of the file.

        - `type: optional "text"`

          The type of the content.

          - `"text"`

  - `type: "file_search"`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

### File Search Tool Call Delta

- `FileSearchToolCallDelta = object { file_search, index, type, id }`

  - `file_search: unknown`

    For now, this is always going to be an empty object.

  - `index: number`

    The index of the tool call in the tool calls array.

  - `type: "file_search"`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

  - `id: optional string`

    The ID of the tool call object.

### Function Tool Call

- `FunctionToolCall = object { id, function, type }`

  - `id: string`

    The ID of the tool call object.

  - `function: object { arguments, name, output }`

    The definition of the function that was called.

    - `arguments: string`

      The arguments passed to the function.

    - `name: string`

      The name of the function.

    - `output: string`

      The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

  - `type: "function"`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

### Function Tool Call Delta

- `FunctionToolCallDelta = object { index, type, id, function }`

  - `index: number`

    The index of the tool call in the tool calls array.

  - `type: "function"`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

  - `id: optional string`

    The ID of the tool call object.

  - `function: optional object { arguments, name, output }`

    The definition of the function that was called.

    - `arguments: optional string`

      The arguments passed to the function.

    - `name: optional string`

      The name of the function.

    - `output: optional string`

      The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

### Message Creation Step Details

- `MessageCreationStepDetails = object { message_creation, type }`

  Details of the message creation by the run step.

  - `message_creation: object { message_id }`

    - `message_id: string`

      The ID of the message that was created by this run step.

  - `type: "message_creation"`

    Always `message_creation`.

    - `"message_creation"`

### Run Step

- `RunStep = object { id, assistant_id, cancelled_at, 13 more }`

  Represents a step in execution of a run.

  - `id: string`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: string`

    The ID of the [assistant](/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: number`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: number`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: number`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: number`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: object { code, message }`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: "server_error" or "rate_limit_exceeded"`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: string`

      A human-readable description of the error.

  - `metadata: Metadata`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.run.step"`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: string`

    The ID of the [run](/docs/api-reference/runs) that this run step is a part of.

  - `status: "in_progress" or "cancelled" or "failed" or 2 more`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: MessageCreationStepDetails or ToolCallsStepDetails`

    The details of the run step.

    - `MessageCreationStepDetails = object { message_creation, type }`

      Details of the message creation by the run step.

      - `message_creation: object { message_id }`

        - `message_id: string`

          The ID of the message that was created by this run step.

      - `type: "message_creation"`

        Always `message_creation`.

        - `"message_creation"`

    - `ToolCallsStepDetails = object { tool_calls, type }`

      Details of the tool call.

      - `tool_calls: array of CodeInterpreterToolCall or FileSearchToolCall or FunctionToolCall`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `CodeInterpreterToolCall = object { id, code_interpreter, type }`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: string`

            The ID of the tool call.

          - `code_interpreter: object { input, outputs }`

            The Code Interpreter tool call definition.

            - `input: string`

              The input to the Code Interpreter tool call.

            - `outputs: array of object { logs, type }  or object { image, type }`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `CodeInterpreterLogOutput = object { logs, type }`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: string`

                  The text output from the Code Interpreter tool call.

                - `type: "logs"`

                  Always `logs`.

                  - `"logs"`

              - `CodeInterpreterImageOutput = object { image, type }`

                - `image: object { file_id }`

                  - `file_id: string`

                    The [file](/docs/api-reference/files) ID of the image.

                - `type: "image"`

                  Always `image`.

                  - `"image"`

          - `type: "code_interpreter"`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `FileSearchToolCall = object { id, file_search, type }`

          - `id: string`

            The ID of the tool call object.

          - `file_search: object { ranking_options, results }`

            For now, this is always going to be an empty object.

            - `ranking_options: optional object { ranker, score_threshold }`

              The ranking options for the file search.

              - `ranker: "auto" or "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: optional array of object { file_id, file_name, score, content }`

              The results of the file search.

              - `file_id: string`

                The ID of the file that result was found in.

              - `file_name: string`

                The name of the file that result was found in.

              - `score: number`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: optional array of object { text, type }`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: optional string`

                  The text content of the file.

                - `type: optional "text"`

                  The type of the content.

                  - `"text"`

          - `type: "file_search"`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `FunctionToolCall = object { id, function, type }`

          - `id: string`

            The ID of the tool call object.

          - `function: object { arguments, name, output }`

            The definition of the function that was called.

            - `arguments: string`

              The arguments passed to the function.

            - `name: string`

              The name of the function.

            - `output: string`

              The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: "function"`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

      - `type: "tool_calls"`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: string`

    The ID of the [thread](/docs/api-reference/threads) that was run.

  - `type: "message_creation" or "tool_calls"`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: object { completion_tokens, prompt_tokens, total_tokens }`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: number`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: number`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: number`

      Total number of tokens used (prompt + completion).

### Run Step Delta Event

- `RunStepDeltaEvent = object { id, delta, object }`

  Represents a run step delta i.e. any changed fields on a run step during streaming.

  - `id: string`

    The identifier of the run step, which can be referenced in API endpoints.

  - `delta: object { step_details }`

    The delta containing the fields that have changed on the run step.

    - `step_details: optional RunStepDeltaMessageDelta or ToolCallDeltaObject`

      The details of the run step.

      - `RunStepDeltaMessageDelta = object { type, message_creation }`

        Details of the message creation by the run step.

        - `type: "message_creation"`

          Always `message_creation`.

          - `"message_creation"`

        - `message_creation: optional object { message_id }`

          - `message_id: optional string`

            The ID of the message that was created by this run step.

      - `ToolCallDeltaObject = object { type, tool_calls }`

        Details of the tool call.

        - `type: "tool_calls"`

          Always `tool_calls`.

          - `"tool_calls"`

        - `tool_calls: optional array of CodeInterpreterToolCallDelta or FileSearchToolCallDelta or FunctionToolCallDelta`

          An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

          - `CodeInterpreterToolCallDelta = object { index, type, id, code_interpreter }`

            Details of the Code Interpreter tool call the run step was involved in.

            - `index: number`

              The index of the tool call in the tool calls array.

            - `type: "code_interpreter"`

              The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

              - `"code_interpreter"`

            - `id: optional string`

              The ID of the tool call.

            - `code_interpreter: optional object { input, outputs }`

              The Code Interpreter tool call definition.

              - `input: optional string`

                The input to the Code Interpreter tool call.

              - `outputs: optional array of CodeInterpreterLogs or CodeInterpreterOutputImage`

                The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                - `CodeInterpreterLogs = object { index, type, logs }`

                  Text output from the Code Interpreter tool call as part of a run step.

                  - `index: number`

                    The index of the output in the outputs array.

                  - `type: "logs"`

                    Always `logs`.

                    - `"logs"`

                  - `logs: optional string`

                    The text output from the Code Interpreter tool call.

                - `CodeInterpreterOutputImage = object { index, type, image }`

                  - `index: number`

                    The index of the output in the outputs array.

                  - `type: "image"`

                    Always `image`.

                    - `"image"`

                  - `image: optional object { file_id }`

                    - `file_id: optional string`

                      The [file](/docs/api-reference/files) ID of the image.

          - `FileSearchToolCallDelta = object { file_search, index, type, id }`

            - `file_search: unknown`

              For now, this is always going to be an empty object.

            - `index: number`

              The index of the tool call in the tool calls array.

            - `type: "file_search"`

              The type of tool call. This is always going to be `file_search` for this type of tool call.

              - `"file_search"`

            - `id: optional string`

              The ID of the tool call object.

          - `FunctionToolCallDelta = object { index, type, id, function }`

            - `index: number`

              The index of the tool call in the tool calls array.

            - `type: "function"`

              The type of tool call. This is always going to be `function` for this type of tool call.

              - `"function"`

            - `id: optional string`

              The ID of the tool call object.

            - `function: optional object { arguments, name, output }`

              The definition of the function that was called.

              - `arguments: optional string`

                The arguments passed to the function.

              - `name: optional string`

                The name of the function.

              - `output: optional string`

                The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

  - `object: "thread.run.step.delta"`

    The object type, which is always `thread.run.step.delta`.

    - `"thread.run.step.delta"`

### Run Step Delta Message Delta

- `RunStepDeltaMessageDelta = object { type, message_creation }`

  Details of the message creation by the run step.

  - `type: "message_creation"`

    Always `message_creation`.

    - `"message_creation"`

  - `message_creation: optional object { message_id }`

    - `message_id: optional string`

      The ID of the message that was created by this run step.

### Run Step Include

- `RunStepInclude = "step_details.tool_calls[*].file_search.results[*].content"`

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Tool Call Delta Object

- `ToolCallDeltaObject = object { type, tool_calls }`

  Details of the tool call.

  - `type: "tool_calls"`

    Always `tool_calls`.

    - `"tool_calls"`

  - `tool_calls: optional array of CodeInterpreterToolCallDelta or FileSearchToolCallDelta or FunctionToolCallDelta`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterToolCallDelta = object { index, type, id, code_interpreter }`

      Details of the Code Interpreter tool call the run step was involved in.

      - `index: number`

        The index of the tool call in the tool calls array.

      - `type: "code_interpreter"`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

      - `id: optional string`

        The ID of the tool call.

      - `code_interpreter: optional object { input, outputs }`

        The Code Interpreter tool call definition.

        - `input: optional string`

          The input to the Code Interpreter tool call.

        - `outputs: optional array of CodeInterpreterLogs or CodeInterpreterOutputImage`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `CodeInterpreterLogs = object { index, type, logs }`

            Text output from the Code Interpreter tool call as part of a run step.

            - `index: number`

              The index of the output in the outputs array.

            - `type: "logs"`

              Always `logs`.

              - `"logs"`

            - `logs: optional string`

              The text output from the Code Interpreter tool call.

          - `CodeInterpreterOutputImage = object { index, type, image }`

            - `index: number`

              The index of the output in the outputs array.

            - `type: "image"`

              Always `image`.

              - `"image"`

            - `image: optional object { file_id }`

              - `file_id: optional string`

                The [file](/docs/api-reference/files) ID of the image.

    - `FileSearchToolCallDelta = object { file_search, index, type, id }`

      - `file_search: unknown`

        For now, this is always going to be an empty object.

      - `index: number`

        The index of the tool call in the tool calls array.

      - `type: "file_search"`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

      - `id: optional string`

        The ID of the tool call object.

    - `FunctionToolCallDelta = object { index, type, id, function }`

      - `index: number`

        The index of the tool call in the tool calls array.

      - `type: "function"`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

      - `id: optional string`

        The ID of the tool call object.

      - `function: optional object { arguments, name, output }`

        The definition of the function that was called.

        - `arguments: optional string`

          The arguments passed to the function.

        - `name: optional string`

          The name of the function.

        - `output: optional string`

          The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

### Tool Calls Step Details

- `ToolCallsStepDetails = object { tool_calls, type }`

  Details of the tool call.

  - `tool_calls: array of CodeInterpreterToolCall or FileSearchToolCall or FunctionToolCall`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterToolCall = object { id, code_interpreter, type }`

      Details of the Code Interpreter tool call the run step was involved in.

      - `id: string`

        The ID of the tool call.

      - `code_interpreter: object { input, outputs }`

        The Code Interpreter tool call definition.

        - `input: string`

          The input to the Code Interpreter tool call.

        - `outputs: array of object { logs, type }  or object { image, type }`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `CodeInterpreterLogOutput = object { logs, type }`

            Text output from the Code Interpreter tool call as part of a run step.

            - `logs: string`

              The text output from the Code Interpreter tool call.

            - `type: "logs"`

              Always `logs`.

              - `"logs"`

          - `CodeInterpreterImageOutput = object { image, type }`

            - `image: object { file_id }`

              - `file_id: string`

                The [file](/docs/api-reference/files) ID of the image.

            - `type: "image"`

              Always `image`.

              - `"image"`

      - `type: "code_interpreter"`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

    - `FileSearchToolCall = object { id, file_search, type }`

      - `id: string`

        The ID of the tool call object.

      - `file_search: object { ranking_options, results }`

        For now, this is always going to be an empty object.

        - `ranking_options: optional object { ranker, score_threshold }`

          The ranking options for the file search.

          - `ranker: "auto" or "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `results: optional array of object { file_id, file_name, score, content }`

          The results of the file search.

          - `file_id: string`

            The ID of the file that result was found in.

          - `file_name: string`

            The name of the file that result was found in.

          - `score: number`

            The score of the result. All values must be a floating point number between 0 and 1.

          - `content: optional array of object { text, type }`

            The content of the result that was found. The content is only included if requested via the include query parameter.

            - `text: optional string`

              The text content of the file.

            - `type: optional "text"`

              The type of the content.

              - `"text"`

      - `type: "file_search"`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

    - `FunctionToolCall = object { id, function, type }`

      - `id: string`

        The ID of the tool call object.

      - `function: object { arguments, name, output }`

        The definition of the function that was called.

        - `arguments: string`

          The arguments passed to the function.

        - `name: string`

          The name of the function.

        - `output: string`

          The output of the function. This will be `null` if the outputs have not been [submitted](/docs/api-reference/runs/submitToolOutputs) yet.

      - `type: "function"`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

  - `type: "tool_calls"`

    Always `tool_calls`.

    - `"tool_calls"`
