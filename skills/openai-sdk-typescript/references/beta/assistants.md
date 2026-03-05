# Assistants

## List

`client.beta.assistants.list(AssistantListParamsquery?, RequestOptionsoptions?): CursorPage<Assistant>`

**get** `/assistants`

Returns a list of assistants.

### Parameters

- `query: AssistantListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `Assistant`

  Represents an `assistant` that can call the model and use tools.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: string | null`

    The name of the assistant. The maximum length is 256 characters.

  - `object: "assistant"`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const assistant of client.beta.assistants.list()) {
  console.log(assistant.id);
}
```

## Create

`client.beta.assistants.create(AssistantCreateParamsbody, RequestOptionsoptions?): Assistant`

**post** `/assistants`

Create an assistant with a model and instructions.

### Parameters

- `body: AssistantCreateParams`

  - `model: (string & {}) | ChatModel`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

    - `(string & {})`

    - `ChatModel = "gpt-5.2" | "gpt-5.2-2025-12-11" | "gpt-5.2-chat-latest" | 69 more`

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

  - `description?: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions?: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name?: string | null`

    The name of the assistant. The maximum length is 256 characters.

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

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

      - `vector_stores?: Array<VectorStore>`

        A helper to create a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) with file_ids and attach it to this assistant. There can be a maximum of 1 vector store attached to the assistant.

        - `chunking_strategy?: Auto | Static`

          The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

          - `Auto`

            The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

            - `type: "auto"`

              Always `auto`.

              - `"auto"`

          - `Static`

            - `static: Static`

              - `chunk_overlap_tokens: number`

                The number of tokens that overlap between chunks. The default value is `400`.

                Note that the overlap must not exceed half of `max_chunk_size_tokens`.

              - `max_chunk_size_tokens: number`

                The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

            - `type: "static"`

              Always `static`.

              - `"static"`

        - `file_ids?: Array<string>`

          A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.

        - `metadata?: Metadata | null`

          Set of 16 key-value pairs that can be attached to an object. This can be
          useful for storing additional information about the object in a structured
          format, and querying for objects via API or the dashboard.

          Keys are strings with a maximum length of 64 characters. Values are strings
          with a maximum length of 512 characters.

  - `tools?: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Returns

- `Assistant`

  Represents an `assistant` that can call the model and use tools.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: string | null`

    The name of the assistant. The maximum length is 256 characters.

  - `object: "assistant"`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const assistant = await client.beta.assistants.create({ model: 'gpt-4o' });

console.log(assistant.id);
```

## Retrieve

`client.beta.assistants.retrieve(stringassistantID, RequestOptionsoptions?): Assistant`

**get** `/assistants/{assistant_id}`

Retrieves an assistant.

### Parameters

- `assistantID: string`

### Returns

- `Assistant`

  Represents an `assistant` that can call the model and use tools.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: string | null`

    The name of the assistant. The maximum length is 256 characters.

  - `object: "assistant"`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const assistant = await client.beta.assistants.retrieve('assistant_id');

console.log(assistant.id);
```

## Update

`client.beta.assistants.update(stringassistantID, AssistantUpdateParamsbody, RequestOptionsoptions?): Assistant`

**post** `/assistants/{assistant_id}`

Modifies an assistant.

### Parameters

- `assistantID: string`

- `body: AssistantUpdateParams`

  - `description?: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions?: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata?: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model?: (string & {}) | "gpt-5" | "gpt-5-mini" | "gpt-5-nano" | 39 more`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

    - `(string & {})`

    - `"gpt-5" | "gpt-5-mini" | "gpt-5-nano" | 39 more`

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

  - `name?: string | null`

    The name of the assistant. The maximum length is 256 characters.

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

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        Overrides the list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        Overrides the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `tools?: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Returns

- `Assistant`

  Represents an `assistant` that can call the model and use tools.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: string | null`

    The name of the assistant. The maximum length is 256 characters.

  - `object: "assistant"`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const assistant = await client.beta.assistants.update('assistant_id');

console.log(assistant.id);
```

## Delete

`client.beta.assistants.delete(stringassistantID, RequestOptionsoptions?): AssistantDeleted`

**delete** `/assistants/{assistant_id}`

Delete an assistant.

### Parameters

- `assistantID: string`

### Returns

- `AssistantDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "assistant.deleted"`

    - `"assistant.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const assistantDeleted = await client.beta.assistants.delete('assistant_id');

console.log(assistantDeleted.id);
```

## Domain Types

### Assistant

- `Assistant`

  Represents an `assistant` that can call the model and use tools.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: string | null`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: string | null`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: string`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: string | null`

    The name of the assistant. The maximum length is 256 characters.

  - `object: "assistant"`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: Array<AssistantTool>`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `CodeInterpreterTool`

      - `type: "code_interpreter"`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `FileSearchTool`

      - `type: "file_search"`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search?: FileSearch`

        Overrides for the file search tool.

        - `max_num_results?: number`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options?: RankingOptions`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: number`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker?: "auto" | "default_2024_08_21"`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `FunctionTool`

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

        The type of tool being defined: `function`

        - `"function"`

  - `response_format?: AssistantResponseFormatOption | null`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `"auto"`

      - `"auto"`

    - `ResponseFormatText`

      Default response format. Used to generate text responses.

      - `type: "text"`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `ResponseFormatJSONObject`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: "json_object"`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

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

  - `temperature?: number | null`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources?: ToolResources | null`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter?: CodeInterpreter`

      - `file_ids?: Array<string>`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search?: FileSearch`

      - `vector_store_ids?: Array<string>`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p?: number | null`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Assistant Deleted

- `AssistantDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "assistant.deleted"`

    - `"assistant.deleted"`

### Assistant Stream Event

- `AssistantStreamEvent = ThreadCreated | ThreadRunCreated | ThreadRunQueued | 21 more`

  Represents an event emitted when streaming a Run.

  Each event in a server-sent events stream has an `event` and `data` property:

  ```
  event: thread.created
  data: {"id": "thread_123", "object": "thread", ...}
  ```

  We emit events whenever a new object is created, transitions to a new state, or is being
  streamed in parts (deltas). For example, we emit `thread.run.created` when a new run
  is created, `thread.run.completed` when a run completes, and so on. When an Assistant chooses
  to create a message during a run, we emit a `thread.message.created event`, a
  `thread.message.in_progress` event, many `thread.message.delta` events, and finally a
  `thread.message.completed` event.

  We may add additional events over time, so we recommend handling unknown events gracefully
  in your code. See the [Assistants API quickstart](https://platform.openai.com/docs/assistants/overview) to learn how to
  integrate the Assistants API with streaming.

  - `ThreadCreated`

    Occurs when a new [thread](https://platform.openai.com/docs/api-reference/threads/object) is created.

    - `data: Thread`

      Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the thread was created.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread"`

        The object type, which is always `thread`.

        - `"thread"`

      - `tool_resources: ToolResources | null`

        A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

        - `code_interpreter?: CodeInterpreter`

          - `file_ids?: Array<string>`

            A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

        - `file_search?: FileSearch`

          - `vector_store_ids?: Array<string>`

            The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

    - `event: "thread.created"`

      - `"thread.created"`

    - `enabled?: boolean`

      Whether to enable input audio transcription.

  - `ThreadRunCreated`

    Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.created"`

      - `"thread.run.created"`

  - `ThreadRunQueued`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `queued` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.queued"`

      - `"thread.run.queued"`

  - `ThreadRunInProgress`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to an `in_progress` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.in_progress"`

      - `"thread.run.in_progress"`

  - `ThreadRunRequiresAction`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `requires_action` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.requires_action"`

      - `"thread.run.requires_action"`

  - `ThreadRunCompleted`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is completed.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.completed"`

      - `"thread.run.completed"`

  - `ThreadRunIncomplete`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) ends with status `incomplete`.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.incomplete"`

      - `"thread.run.incomplete"`

  - `ThreadRunFailed`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) fails.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.failed"`

      - `"thread.run.failed"`

  - `ThreadRunCancelling`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `cancelling` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.cancelling"`

      - `"thread.run.cancelling"`

  - `ThreadRunCancelled`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is cancelled.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.cancelled"`

      - `"thread.run.cancelled"`

  - `ThreadRunExpired`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) expires.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.expired"`

      - `"thread.run.expired"`

  - `ThreadRunStepCreated`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.created"`

      - `"thread.run.step.created"`

  - `ThreadRunStepInProgress`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) moves to an `in_progress` state.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.in_progress"`

      - `"thread.run.step.in_progress"`

  - `ThreadRunStepDelta`

    Occurs when parts of a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) are being streamed.

    - `data: RunStepDeltaEvent`

      Represents a run step delta i.e. any changed fields on a run step during streaming.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `delta: RunStepDelta`

        The delta containing the fields that have changed on the run step.

        - `step_details?: RunStepDeltaMessageDelta | ToolCallDeltaObject`

          The details of the run step.

          - `RunStepDeltaMessageDelta`

            Details of the message creation by the run step.

            - `type: "message_creation"`

              Always `message_creation`.

              - `"message_creation"`

            - `message_creation?: MessageCreation`

              - `message_id?: string`

                The ID of the message that was created by this run step.

          - `ToolCallDeltaObject`

            Details of the tool call.

            - `type: "tool_calls"`

              Always `tool_calls`.

              - `"tool_calls"`

            - `tool_calls?: Array<ToolCallDelta>`

              An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

              - `CodeInterpreterToolCallDelta`

                Details of the Code Interpreter tool call the run step was involved in.

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "code_interpreter"`

                  The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                  - `"code_interpreter"`

                - `id?: string`

                  The ID of the tool call.

                - `code_interpreter?: CodeInterpreter`

                  The Code Interpreter tool call definition.

                  - `input?: string`

                    The input to the Code Interpreter tool call.

                  - `outputs?: Array<CodeInterpreterLogs | CodeInterpreterOutputImage>`

                    The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                    - `CodeInterpreterLogs`

                      Text output from the Code Interpreter tool call as part of a run step.

                      - `index: number`

                        The index of the output in the outputs array.

                      - `type: "logs"`

                        Always `logs`.

                        - `"logs"`

                      - `logs?: string`

                        The text output from the Code Interpreter tool call.

                    - `CodeInterpreterOutputImage`

                      - `index: number`

                        The index of the output in the outputs array.

                      - `type: "image"`

                        Always `image`.

                        - `"image"`

                      - `image?: Image`

                        - `file_id?: string`

                          The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

              - `FileSearchToolCallDelta`

                - `file_search: unknown`

                  For now, this is always going to be an empty object.

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "file_search"`

                  The type of tool call. This is always going to be `file_search` for this type of tool call.

                  - `"file_search"`

                - `id?: string`

                  The ID of the tool call object.

              - `FunctionToolCallDelta`

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "function"`

                  The type of tool call. This is always going to be `function` for this type of tool call.

                  - `"function"`

                - `id?: string`

                  The ID of the tool call object.

                - `function?: Function`

                  The definition of the function that was called.

                  - `arguments?: string`

                    The arguments passed to the function.

                  - `name?: string`

                    The name of the function.

                  - `output?: string | null`

                    The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `object: "thread.run.step.delta"`

        The object type, which is always `thread.run.step.delta`.

        - `"thread.run.step.delta"`

    - `event: "thread.run.step.delta"`

      - `"thread.run.step.delta"`

  - `ThreadRunStepCompleted`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is completed.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.completed"`

      - `"thread.run.step.completed"`

  - `ThreadRunStepFailed`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) fails.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.failed"`

      - `"thread.run.step.failed"`

  - `ThreadRunStepCancelled`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is cancelled.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.cancelled"`

      - `"thread.run.step.cancelled"`

  - `ThreadRunStepExpired`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) expires.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.expired"`

      - `"thread.run.step.expired"`

  - `ThreadMessageCreated`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.created"`

      - `"thread.message.created"`

  - `ThreadMessageInProgress`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) moves to an `in_progress` state.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.in_progress"`

      - `"thread.message.in_progress"`

  - `ThreadMessageDelta`

    Occurs when parts of a [Message](https://platform.openai.com/docs/api-reference/messages/object) are being streamed.

    - `data: MessageDeltaEvent`

      Represents a message delta i.e. any changed fields on a message during streaming.

      - `id: string`

        The identifier of the message, which can be referenced in API endpoints.

      - `delta: MessageDelta`

        The delta containing the fields that have changed on the Message.

        - `content?: Array<MessageContentDelta>`

          The content of the message in array of text and/or images.

          - `ImageFileDeltaBlock`

            References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "image_file"`

              Always `image_file`.

              - `"image_file"`

            - `image_file?: ImageFileDelta`

              - `detail?: "auto" | "low" | "high"`

                Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `file_id?: string`

                The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `TextDeltaBlock`

            The text content that is part of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "text"`

              Always `text`.

              - `"text"`

            - `text?: TextDelta`

              - `annotations?: Array<AnnotationDelta>`

                - `FileCitationDeltaAnnotation`

                  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                  - `index: number`

                    The index of the annotation in the text content part.

                  - `type: "file_citation"`

                    Always `file_citation`.

                    - `"file_citation"`

                  - `end_index?: number`

                  - `file_citation?: FileCitation`

                    - `file_id?: string`

                      The ID of the specific File the citation is from.

                    - `quote?: string`

                      The specific quote in the file.

                  - `start_index?: number`

                  - `text?: string`

                    The text in the message content that needs to be replaced.

                - `FilePathDeltaAnnotation`

                  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                  - `index: number`

                    The index of the annotation in the text content part.

                  - `type: "file_path"`

                    Always `file_path`.

                    - `"file_path"`

                  - `end_index?: number`

                  - `file_path?: FilePath`

                    - `file_id?: string`

                      The ID of the file that was generated.

                  - `start_index?: number`

                  - `text?: string`

                    The text in the message content that needs to be replaced.

              - `value?: string`

                The data that makes up the text.

          - `RefusalDeltaBlock`

            The refusal content that is part of a message.

            - `index: number`

              The index of the refusal part in the message.

            - `type: "refusal"`

              Always `refusal`.

              - `"refusal"`

            - `refusal?: string`

          - `ImageURLDeltaBlock`

            References an image URL in the content of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "image_url"`

              Always `image_url`.

              - `"image_url"`

            - `image_url?: ImageURLDelta`

              - `detail?: "auto" | "low" | "high"`

                Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `url?: string`

                The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `role?: "user" | "assistant"`

          The entity that produced the message. One of `user` or `assistant`.

          - `"user"`

          - `"assistant"`

      - `object: "thread.message.delta"`

        The object type, which is always `thread.message.delta`.

        - `"thread.message.delta"`

    - `event: "thread.message.delta"`

      - `"thread.message.delta"`

  - `ThreadMessageCompleted`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.completed"`

      - `"thread.message.completed"`

  - `ThreadMessageIncomplete`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) ends before it is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.incomplete"`

      - `"thread.message.incomplete"`

  - `ErrorEvent`

    Occurs when an [error](https://platform.openai.com/docs/guides/error-codes#api-errors) occurs. This can happen due to an internal server error or a timeout.

    - `data: ErrorObject`

      - `code: string | null`

      - `message: string`

      - `param: string | null`

      - `type: string`

    - `event: "error"`

      - `"error"`

### Assistant Tool

- `AssistantTool = CodeInterpreterTool | FileSearchTool | FunctionTool`

  - `CodeInterpreterTool`

    - `type: "code_interpreter"`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `FileSearchTool`

    - `type: "file_search"`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search?: FileSearch`

      Overrides for the file search tool.

      - `max_num_results?: number`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options?: RankingOptions`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: number`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker?: "auto" | "default_2024_08_21"`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `FunctionTool`

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

      The type of tool being defined: `function`

      - `"function"`

### Code Interpreter Tool

- `CodeInterpreterTool`

  - `type: "code_interpreter"`

    The type of tool being defined: `code_interpreter`

    - `"code_interpreter"`

### File Search Tool

- `FileSearchTool`

  - `type: "file_search"`

    The type of tool being defined: `file_search`

    - `"file_search"`

  - `file_search?: FileSearch`

    Overrides for the file search tool.

    - `max_num_results?: number`

      The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

      Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

    - `ranking_options?: RankingOptions`

      The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

      See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `score_threshold: number`

        The score threshold for the file search. All values must be a floating point number between 0 and 1.

      - `ranker?: "auto" | "default_2024_08_21"`

        The ranker to use for the file search. If not specified will use the `auto` ranker.

        - `"auto"`

        - `"default_2024_08_21"`

### Function Tool

- `FunctionTool`

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

    The type of tool being defined: `function`

    - `"function"`

### Message Stream Event

- `MessageStreamEvent = ThreadMessageCreated | ThreadMessageInProgress | ThreadMessageDelta | 2 more`

  Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

  - `ThreadMessageCreated`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is created.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.created"`

      - `"thread.message.created"`

  - `ThreadMessageInProgress`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) moves to an `in_progress` state.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.in_progress"`

      - `"thread.message.in_progress"`

  - `ThreadMessageDelta`

    Occurs when parts of a [Message](https://platform.openai.com/docs/api-reference/messages/object) are being streamed.

    - `data: MessageDeltaEvent`

      Represents a message delta i.e. any changed fields on a message during streaming.

      - `id: string`

        The identifier of the message, which can be referenced in API endpoints.

      - `delta: MessageDelta`

        The delta containing the fields that have changed on the Message.

        - `content?: Array<MessageContentDelta>`

          The content of the message in array of text and/or images.

          - `ImageFileDeltaBlock`

            References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "image_file"`

              Always `image_file`.

              - `"image_file"`

            - `image_file?: ImageFileDelta`

              - `detail?: "auto" | "low" | "high"`

                Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `file_id?: string`

                The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

          - `TextDeltaBlock`

            The text content that is part of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "text"`

              Always `text`.

              - `"text"`

            - `text?: TextDelta`

              - `annotations?: Array<AnnotationDelta>`

                - `FileCitationDeltaAnnotation`

                  A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                  - `index: number`

                    The index of the annotation in the text content part.

                  - `type: "file_citation"`

                    Always `file_citation`.

                    - `"file_citation"`

                  - `end_index?: number`

                  - `file_citation?: FileCitation`

                    - `file_id?: string`

                      The ID of the specific File the citation is from.

                    - `quote?: string`

                      The specific quote in the file.

                  - `start_index?: number`

                  - `text?: string`

                    The text in the message content that needs to be replaced.

                - `FilePathDeltaAnnotation`

                  A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                  - `index: number`

                    The index of the annotation in the text content part.

                  - `type: "file_path"`

                    Always `file_path`.

                    - `"file_path"`

                  - `end_index?: number`

                  - `file_path?: FilePath`

                    - `file_id?: string`

                      The ID of the file that was generated.

                  - `start_index?: number`

                  - `text?: string`

                    The text in the message content that needs to be replaced.

              - `value?: string`

                The data that makes up the text.

          - `RefusalDeltaBlock`

            The refusal content that is part of a message.

            - `index: number`

              The index of the refusal part in the message.

            - `type: "refusal"`

              Always `refusal`.

              - `"refusal"`

            - `refusal?: string`

          - `ImageURLDeltaBlock`

            References an image URL in the content of a message.

            - `index: number`

              The index of the content part in the message.

            - `type: "image_url"`

              Always `image_url`.

              - `"image_url"`

            - `image_url?: ImageURLDelta`

              - `detail?: "auto" | "low" | "high"`

                Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`.

                - `"auto"`

                - `"low"`

                - `"high"`

              - `url?: string`

                The URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

        - `role?: "user" | "assistant"`

          The entity that produced the message. One of `user` or `assistant`.

          - `"user"`

          - `"assistant"`

      - `object: "thread.message.delta"`

        The object type, which is always `thread.message.delta`.

        - `"thread.message.delta"`

    - `event: "thread.message.delta"`

      - `"thread.message.delta"`

  - `ThreadMessageCompleted`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.completed"`

      - `"thread.message.completed"`

  - `ThreadMessageIncomplete`

    Occurs when a [message](https://platform.openai.com/docs/api-reference/messages/object) ends before it is completed.

    - `data: Message`

      Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string | null`

        If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

      - `attachments: Array<Attachment> | null`

        A list of files attached to the message, and the tools they were added to.

        - `file_id?: string`

          The ID of the file to attach to the message.

        - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

          The tools to add this file to.

          - `CodeInterpreterTool`

            - `type: "code_interpreter"`

              The type of tool being defined: `code_interpreter`

              - `"code_interpreter"`

          - `AssistantToolsFileSearchTypeOnly`

            - `type: "file_search"`

              The type of tool being defined: `file_search`

              - `"file_search"`

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the message was completed.

      - `content: Array<MessageContent>`

        The content of the message in array of text and/or images.

        - `ImageFileContentBlock`

          References an image [File](https://platform.openai.com/docs/api-reference/files) in the content of a message.

          - `image_file: ImageFile`

            - `file_id: string`

              The [File](https://platform.openai.com/docs/api-reference/files) ID of the image in the message content. Set `purpose="vision"` when uploading the File if you need to later display the file content.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image if specified by the user. `low` uses fewer tokens, you can opt in to high resolution using `high`.

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_file"`

            Always `image_file`.

            - `"image_file"`

        - `ImageURLContentBlock`

          References an image URL in the content of a message.

          - `image_url: ImageURL`

            - `url: string`

              The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.

            - `detail?: "auto" | "low" | "high"`

              Specifies the detail level of the image. `low` uses fewer tokens, you can opt in to high resolution using `high`. Default value is `auto`

              - `"auto"`

              - `"low"`

              - `"high"`

          - `type: "image_url"`

            The type of the content part.

            - `"image_url"`

        - `TextContentBlock`

          The text content that is part of a message.

          - `text: Text`

            - `annotations: Array<Annotation>`

              - `FileCitationAnnotation`

                A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the "file_search" tool to search files.

                - `end_index: number`

                - `file_citation: FileCitation`

                  - `file_id: string`

                    The ID of the specific File the citation is from.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_citation"`

                  Always `file_citation`.

                  - `"file_citation"`

              - `FilePathAnnotation`

                A URL for the file that's generated when the assistant used the `code_interpreter` tool to generate a file.

                - `end_index: number`

                - `file_path: FilePath`

                  - `file_id: string`

                    The ID of the file that was generated.

                - `start_index: number`

                - `text: string`

                  The text in the message content that needs to be replaced.

                - `type: "file_path"`

                  Always `file_path`.

                  - `"file_path"`

            - `value: string`

              The data that makes up the text.

          - `type: "text"`

            Always `text`.

            - `"text"`

        - `RefusalContentBlock`

          The refusal content generated by the assistant.

          - `refusal: string`

          - `type: "refusal"`

            Always `refusal`.

            - `"refusal"`

      - `created_at: number`

        The Unix timestamp (in seconds) for when the message was created.

      - `incomplete_at: number | null`

        The Unix timestamp (in seconds) for when the message was marked as incomplete.

      - `incomplete_details: IncompleteDetails | null`

        On an incomplete message, details about why the message is incomplete.

        - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

          The reason the message is incomplete.

          - `"content_filter"`

          - `"max_tokens"`

          - `"run_cancelled"`

          - `"run_expired"`

          - `"run_failed"`

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.message"`

        The object type, which is always `thread.message`.

        - `"thread.message"`

      - `role: "user" | "assistant"`

        The entity that produced the message. One of `user` or `assistant`.

        - `"user"`

        - `"assistant"`

      - `run_id: string | null`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

      - `status: "in_progress" | "incomplete" | "completed"`

        The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

        - `"in_progress"`

        - `"incomplete"`

        - `"completed"`

      - `thread_id: string`

        The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

    - `event: "thread.message.incomplete"`

      - `"thread.message.incomplete"`

### Run Step Stream Event

- `RunStepStreamEvent = ThreadRunStepCreated | ThreadRunStepInProgress | ThreadRunStepDelta | 4 more`

  Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

  - `ThreadRunStepCreated`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is created.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.created"`

      - `"thread.run.step.created"`

  - `ThreadRunStepInProgress`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) moves to an `in_progress` state.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.in_progress"`

      - `"thread.run.step.in_progress"`

  - `ThreadRunStepDelta`

    Occurs when parts of a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) are being streamed.

    - `data: RunStepDeltaEvent`

      Represents a run step delta i.e. any changed fields on a run step during streaming.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `delta: RunStepDelta`

        The delta containing the fields that have changed on the run step.

        - `step_details?: RunStepDeltaMessageDelta | ToolCallDeltaObject`

          The details of the run step.

          - `RunStepDeltaMessageDelta`

            Details of the message creation by the run step.

            - `type: "message_creation"`

              Always `message_creation`.

              - `"message_creation"`

            - `message_creation?: MessageCreation`

              - `message_id?: string`

                The ID of the message that was created by this run step.

          - `ToolCallDeltaObject`

            Details of the tool call.

            - `type: "tool_calls"`

              Always `tool_calls`.

              - `"tool_calls"`

            - `tool_calls?: Array<ToolCallDelta>`

              An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

              - `CodeInterpreterToolCallDelta`

                Details of the Code Interpreter tool call the run step was involved in.

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "code_interpreter"`

                  The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                  - `"code_interpreter"`

                - `id?: string`

                  The ID of the tool call.

                - `code_interpreter?: CodeInterpreter`

                  The Code Interpreter tool call definition.

                  - `input?: string`

                    The input to the Code Interpreter tool call.

                  - `outputs?: Array<CodeInterpreterLogs | CodeInterpreterOutputImage>`

                    The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                    - `CodeInterpreterLogs`

                      Text output from the Code Interpreter tool call as part of a run step.

                      - `index: number`

                        The index of the output in the outputs array.

                      - `type: "logs"`

                        Always `logs`.

                        - `"logs"`

                      - `logs?: string`

                        The text output from the Code Interpreter tool call.

                    - `CodeInterpreterOutputImage`

                      - `index: number`

                        The index of the output in the outputs array.

                      - `type: "image"`

                        Always `image`.

                        - `"image"`

                      - `image?: Image`

                        - `file_id?: string`

                          The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

              - `FileSearchToolCallDelta`

                - `file_search: unknown`

                  For now, this is always going to be an empty object.

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "file_search"`

                  The type of tool call. This is always going to be `file_search` for this type of tool call.

                  - `"file_search"`

                - `id?: string`

                  The ID of the tool call object.

              - `FunctionToolCallDelta`

                - `index: number`

                  The index of the tool call in the tool calls array.

                - `type: "function"`

                  The type of tool call. This is always going to be `function` for this type of tool call.

                  - `"function"`

                - `id?: string`

                  The ID of the tool call object.

                - `function?: Function`

                  The definition of the function that was called.

                  - `arguments?: string`

                    The arguments passed to the function.

                  - `name?: string`

                    The name of the function.

                  - `output?: string | null`

                    The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `object: "thread.run.step.delta"`

        The object type, which is always `thread.run.step.delta`.

        - `"thread.run.step.delta"`

    - `event: "thread.run.step.delta"`

      - `"thread.run.step.delta"`

  - `ThreadRunStepCompleted`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is completed.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.completed"`

      - `"thread.run.step.completed"`

  - `ThreadRunStepFailed`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) fails.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.failed"`

      - `"thread.run.step.failed"`

  - `ThreadRunStepCancelled`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) is cancelled.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.cancelled"`

      - `"thread.run.step.cancelled"`

  - `ThreadRunStepExpired`

    Occurs when a [run step](https://platform.openai.com/docs/api-reference/run-steps/step-object) expires.

    - `data: RunStep`

      Represents a step in execution of a run.

      - `id: string`

        The identifier of the run step, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run step was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run step completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run step was created.

      - `expired_at: number | null`

        The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run step failed.

      - `last_error: LastError | null`

        The last error associated with this run step. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded"`

          One of `server_error` or `rate_limit_exceeded`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

        - `message: string`

          A human-readable description of the error.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `object: "thread.run.step"`

        The object type, which is always `thread.run.step`.

        - `"thread.run.step"`

      - `run_id: string`

        The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

      - `status: "in_progress" | "cancelled" | "failed" | 2 more`

        The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

        - `"in_progress"`

        - `"cancelled"`

        - `"failed"`

        - `"completed"`

        - `"expired"`

      - `step_details: MessageCreationStepDetails | ToolCallsStepDetails`

        The details of the run step.

        - `MessageCreationStepDetails`

          Details of the message creation by the run step.

          - `message_creation: MessageCreation`

            - `message_id: string`

              The ID of the message that was created by this run step.

          - `type: "message_creation"`

            Always `message_creation`.

            - `"message_creation"`

        - `ToolCallsStepDetails`

          Details of the tool call.

          - `tool_calls: Array<ToolCall>`

            An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

            - `CodeInterpreterToolCall`

              Details of the Code Interpreter tool call the run step was involved in.

              - `id: string`

                The ID of the tool call.

              - `code_interpreter: CodeInterpreter`

                The Code Interpreter tool call definition.

                - `input: string`

                  The input to the Code Interpreter tool call.

                - `outputs: Array<Logs | Image>`

                  The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                  - `Logs`

                    Text output from the Code Interpreter tool call as part of a run step.

                    - `logs: string`

                      The text output from the Code Interpreter tool call.

                    - `type: "logs"`

                      Always `logs`.

                      - `"logs"`

                  - `Image`

                    - `image: Image`

                      - `file_id: string`

                        The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                    - `type: "image"`

                      Always `image`.

                      - `"image"`

              - `type: "code_interpreter"`

                The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

                - `"code_interpreter"`

            - `FileSearchToolCall`

              - `id: string`

                The ID of the tool call object.

              - `file_search: FileSearch`

                For now, this is always going to be an empty object.

                - `ranking_options?: RankingOptions`

                  The ranking options for the file search.

                  - `ranker: "auto" | "default_2024_08_21"`

                    The ranker to use for the file search. If not specified will use the `auto` ranker.

                    - `"auto"`

                    - `"default_2024_08_21"`

                  - `score_threshold: number`

                    The score threshold for the file search. All values must be a floating point number between 0 and 1.

                - `results?: Array<Result>`

                  The results of the file search.

                  - `file_id: string`

                    The ID of the file that result was found in.

                  - `file_name: string`

                    The name of the file that result was found in.

                  - `score: number`

                    The score of the result. All values must be a floating point number between 0 and 1.

                  - `content?: Array<Content>`

                    The content of the result that was found. The content is only included if requested via the include query parameter.

                    - `text?: string`

                      The text content of the file.

                    - `type?: "text"`

                      The type of the content.

                      - `"text"`

              - `type: "file_search"`

                The type of tool call. This is always going to be `file_search` for this type of tool call.

                - `"file_search"`

            - `FunctionToolCall`

              - `id: string`

                The ID of the tool call object.

              - `function: Function`

                The definition of the function that was called.

                - `arguments: string`

                  The arguments passed to the function.

                - `name: string`

                  The name of the function.

                - `output: string | null`

                  The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

              - `type: "function"`

                The type of tool call. This is always going to be `function` for this type of tool call.

                - `"function"`

          - `type: "tool_calls"`

            Always `tool_calls`.

            - `"tool_calls"`

      - `thread_id: string`

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

      - `type: "message_creation" | "tool_calls"`

        The type of run step, which can be either `message_creation` or `tool_calls`.

        - `"message_creation"`

        - `"tool_calls"`

      - `usage: Usage | null`

        Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run step.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run step.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

    - `event: "thread.run.step.expired"`

      - `"thread.run.step.expired"`

### Run Stream Event

- `RunStreamEvent = ThreadRunCreated | ThreadRunQueued | ThreadRunInProgress | 7 more`

  Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

  - `ThreadRunCreated`

    Occurs when a new [run](https://platform.openai.com/docs/api-reference/runs/object) is created.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.created"`

      - `"thread.run.created"`

  - `ThreadRunQueued`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `queued` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.queued"`

      - `"thread.run.queued"`

  - `ThreadRunInProgress`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to an `in_progress` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.in_progress"`

      - `"thread.run.in_progress"`

  - `ThreadRunRequiresAction`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `requires_action` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.requires_action"`

      - `"thread.run.requires_action"`

  - `ThreadRunCompleted`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is completed.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.completed"`

      - `"thread.run.completed"`

  - `ThreadRunIncomplete`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) ends with status `incomplete`.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.incomplete"`

      - `"thread.run.incomplete"`

  - `ThreadRunFailed`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) fails.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.failed"`

      - `"thread.run.failed"`

  - `ThreadRunCancelling`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) moves to a `cancelling` status.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.cancelling"`

      - `"thread.run.cancelling"`

  - `ThreadRunCancelled`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) is cancelled.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.cancelled"`

      - `"thread.run.cancelled"`

  - `ThreadRunExpired`

    Occurs when a [run](https://platform.openai.com/docs/api-reference/runs/object) expires.

    - `data: Run`

      Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

      - `id: string`

        The identifier, which can be referenced in API endpoints.

      - `assistant_id: string`

        The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

      - `cancelled_at: number | null`

        The Unix timestamp (in seconds) for when the run was cancelled.

      - `completed_at: number | null`

        The Unix timestamp (in seconds) for when the run was completed.

      - `created_at: number`

        The Unix timestamp (in seconds) for when the run was created.

      - `expires_at: number | null`

        The Unix timestamp (in seconds) for when the run will expire.

      - `failed_at: number | null`

        The Unix timestamp (in seconds) for when the run failed.

      - `incomplete_details: IncompleteDetails | null`

        Details on why the run is incomplete. Will be `null` if the run is not incomplete.

        - `reason?: "max_completion_tokens" | "max_prompt_tokens"`

          The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

          - `"max_completion_tokens"`

          - `"max_prompt_tokens"`

      - `instructions: string`

        The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `last_error: LastError | null`

        The last error associated with this run. Will be `null` if there are no errors.

        - `code: "server_error" | "rate_limit_exceeded" | "invalid_prompt"`

          One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

          - `"server_error"`

          - `"rate_limit_exceeded"`

          - `"invalid_prompt"`

        - `message: string`

          A human-readable description of the error.

      - `max_completion_tokens: number | null`

        The maximum number of completion tokens specified to have been used over the course of the run.

      - `max_prompt_tokens: number | null`

        The maximum number of prompt tokens specified to have been used over the course of the run.

      - `metadata: Metadata | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

      - `model: string`

        The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

      - `object: "thread.run"`

        The object type, which is always `thread.run`.

        - `"thread.run"`

      - `parallel_tool_calls: boolean`

        Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

      - `required_action: RequiredAction | null`

        Details on the action required to continue the run. Will be `null` if no action is required.

        - `submit_tool_outputs: SubmitToolOutputs`

          Details on the tool outputs needed for this run to continue.

          - `tool_calls: Array<RequiredActionFunctionToolCall>`

            A list of the relevant tool calls.

            - `id: string`

              The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

            - `function: Function`

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

      - `response_format: AssistantResponseFormatOption | null`

        Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

        Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

        Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

        **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

        - `"auto"`

          - `"auto"`

        - `ResponseFormatText`

          Default response format. Used to generate text responses.

          - `type: "text"`

            The type of response format being defined. Always `text`.

            - `"text"`

        - `ResponseFormatJSONObject`

          JSON object response format. An older method of generating JSON responses.
          Using `json_schema` is recommended for models that support it. Note that the
          model will not generate JSON without a system or user message instructing it
          to do so.

          - `type: "json_object"`

            The type of response format being defined. Always `json_object`.

            - `"json_object"`

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

      - `started_at: number | null`

        The Unix timestamp (in seconds) for when the run was started.

      - `status: RunStatus`

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

        The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

      - `tool_choice: AssistantToolChoiceOption | null`

        Controls which (if any) tool is called by the model.
        `none` means the model will not call any tools and instead generates a message.
        `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
        `required` means the model must call one or more tools before responding to the user.
        Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

        - `"none" | "auto" | "required"`

          - `"none"`

          - `"auto"`

          - `"required"`

        - `AssistantToolChoice`

          Specifies a tool the model should use. Use to force the model to call a specific tool.

          - `type: "function" | "code_interpreter" | "file_search"`

            The type of the tool. If type is `function`, the function name must be set

            - `"function"`

            - `"code_interpreter"`

            - `"file_search"`

          - `function?: AssistantToolChoiceFunction`

            - `name: string`

              The name of the function to call.

      - `tools: Array<AssistantTool>`

        The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

        - `CodeInterpreterTool`

          - `type: "code_interpreter"`

            The type of tool being defined: `code_interpreter`

            - `"code_interpreter"`

        - `FileSearchTool`

          - `type: "file_search"`

            The type of tool being defined: `file_search`

            - `"file_search"`

          - `file_search?: FileSearch`

            Overrides for the file search tool.

            - `max_num_results?: number`

              The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

              Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

            - `ranking_options?: RankingOptions`

              The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

              See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

              - `score_threshold: number`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

              - `ranker?: "auto" | "default_2024_08_21"`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

        - `FunctionTool`

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

            The type of tool being defined: `function`

            - `"function"`

      - `truncation_strategy: TruncationStrategy | null`

        Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

        - `type: "auto" | "last_messages"`

          The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

          - `"auto"`

          - `"last_messages"`

        - `last_messages?: number | null`

          The number of most recent messages from the thread when constructing the context for the run.

      - `usage: Usage | null`

        Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

        - `completion_tokens: number`

          Number of completion tokens used over the course of the run.

        - `prompt_tokens: number`

          Number of prompt tokens used over the course of the run.

        - `total_tokens: number`

          Total number of tokens used (prompt + completion).

      - `temperature?: number | null`

        The sampling temperature used for this run. If not set, defaults to 1.

      - `top_p?: number | null`

        The nucleus sampling value used for this run. If not set, defaults to 1.

    - `event: "thread.run.expired"`

      - `"thread.run.expired"`

### Thread Stream Event

- `ThreadStreamEvent`

  Occurs when a new [thread](https://platform.openai.com/docs/api-reference/threads/object) is created.

  - `data: Thread`

    Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

    - `id: string`

      The identifier, which can be referenced in API endpoints.

    - `created_at: number`

      The Unix timestamp (in seconds) for when the thread was created.

    - `metadata: Metadata | null`

      Set of 16 key-value pairs that can be attached to an object. This can be
      useful for storing additional information about the object in a structured
      format, and querying for objects via API or the dashboard.

      Keys are strings with a maximum length of 64 characters. Values are strings
      with a maximum length of 512 characters.

    - `object: "thread"`

      The object type, which is always `thread`.

      - `"thread"`

    - `tool_resources: ToolResources | null`

      A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

      - `code_interpreter?: CodeInterpreter`

        - `file_ids?: Array<string>`

          A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

      - `file_search?: FileSearch`

        - `vector_store_ids?: Array<string>`

          The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

  - `event: "thread.created"`

    - `"thread.created"`

  - `enabled?: boolean`

    Whether to enable input audio transcription.
