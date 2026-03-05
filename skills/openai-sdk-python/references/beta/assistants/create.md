## Create

`beta.assistants.create(AssistantCreateParams**kwargs)  -> Assistant`

**post** `/assistants`

Create an assistant with a model and instructions.

### Parameters

- `model: Union[str, ChatModel]`

  ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `str`

  - `Literal["gpt-5.2", "gpt-5.2-2025-12-11", "gpt-5.2-chat-latest", 69 more]`

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

- `description: Optional[str]`

  The description of the assistant. The maximum length is 512 characters.

- `instructions: Optional[str]`

  The system instructions that the assistant uses. The maximum length is 256,000 characters.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  The name of the assistant. The maximum length is 256 characters.

- `reasoning_effort: Optional[ReasoningEffort]`

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

- `response_format: Optional[AssistantResponseFormatOptionParam]`

  Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

  Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

  Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

  **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

  - `Literal["auto"]`

    `auto` is the default value

    - `"auto"`

  - `class ResponseFormatText: …`

    Default response format. Used to generate text responses.

    - `type: Literal["text"]`

      The type of response format being defined. Always `text`.

      - `"text"`

  - `class ResponseFormatJSONObject: …`

    JSON object response format. An older method of generating JSON responses.
    Using `json_schema` is recommended for models that support it. Note that the
    model will not generate JSON without a system or user message instructing it
    to do so.

    - `type: Literal["json_object"]`

      The type of response format being defined. Always `json_object`.

      - `"json_object"`

  - `class ResponseFormatJSONSchema: …`

    JSON Schema response format. Used to generate structured JSON responses.
    Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

    - `json_schema: JSONSchema`

      Structured Outputs configuration options, including a JSON Schema.

      - `name: str`

        The name of the response format. Must be a-z, A-Z, 0-9, or contain
        underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the response format is for, used by the model to
        determine how to respond in the format.

      - `schema: Optional[Dict[str, object]]`

        The schema for the response format, described as a JSON Schema object.
        Learn how to build JSON schemas [here](https://json-schema.org/).

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the output.
        If set to true, the model will always follow the exact schema defined
        in the `schema` field. Only a subset of JSON Schema is supported when
        `strict` is `true`. To learn more, read the [Structured Outputs
        guide](https://platform.openai.com/docs/guides/structured-outputs).

    - `type: Literal["json_schema"]`

      The type of response format being defined. Always `json_schema`.

      - `"json_schema"`

- `temperature: Optional[float]`

  What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

- `tool_resources: Optional[ToolResources]`

  A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

  - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

    - `file_ids: Optional[SequenceNotStr[str]]`

      A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

  - `file_search: Optional[ToolResourcesFileSearch]`

    - `vector_store_ids: Optional[SequenceNotStr[str]]`

      The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

    - `vector_stores: Optional[Iterable[ToolResourcesFileSearchVectorStore]]`

      A helper to create a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) with file_ids and attach it to this assistant. There can be a maximum of 1 vector store attached to the assistant.

      - `chunking_strategy: Optional[ToolResourcesFileSearchVectorStoreChunkingStrategy]`

        The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyAuto: …`

          The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

          - `type: Literal["auto"]`

            Always `auto`.

            - `"auto"`

        - `class ToolResourcesFileSearchVectorStoreChunkingStrategyStatic: …`

          - `static: ToolResourcesFileSearchVectorStoreChunkingStrategyStaticStatic`

            - `chunk_overlap_tokens: int`

              The number of tokens that overlap between chunks. The default value is `400`.

              Note that the overlap must not exceed half of `max_chunk_size_tokens`.

            - `max_chunk_size_tokens: int`

              The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

          - `type: Literal["static"]`

            Always `static`.

            - `"static"`

      - `file_ids: Optional[SequenceNotStr[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs to add to the vector store. There can be a maximum of 10000 files in a vector store.

      - `metadata: Optional[Metadata]`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard.

        Keys are strings with a maximum length of 64 characters. Values are strings
        with a maximum length of 512 characters.

- `tools: Optional[Iterable[AssistantToolParam]]`

  A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

  - `class CodeInterpreterTool: …`

    - `type: Literal["code_interpreter"]`

      The type of tool being defined: `code_interpreter`

      - `"code_interpreter"`

  - `class FileSearchTool: …`

    - `type: Literal["file_search"]`

      The type of tool being defined: `file_search`

      - `"file_search"`

    - `file_search: Optional[FileSearch]`

      Overrides for the file search tool.

      - `max_num_results: Optional[int]`

        The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

        Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

        See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

  - `class FunctionTool: …`

    - `function: FunctionDefinition`

      - `name: str`

        The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

      - `description: Optional[str]`

        A description of what the function does, used by the model to choose when and how to call the function.

      - `parameters: Optional[FunctionParameters]`

        The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

        Omitting `parameters` defines a function with an empty parameter list.

      - `strict: Optional[bool]`

        Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

    - `type: Literal["function"]`

      The type of tool being defined: `function`

      - `"function"`

- `top_p: Optional[float]`

  An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

  We generally recommend altering this or temperature but not both.

### Returns

- `class Assistant: …`

  Represents an `assistant` that can call the model and use tools.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the assistant was created.

  - `description: Optional[str]`

    The description of the assistant. The maximum length is 512 characters.

  - `instructions: Optional[str]`

    The system instructions that the assistant uses. The maximum length is 256,000 characters.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    ID of the model to use. You can use the [List models](https://platform.openai.com/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](https://platform.openai.com/docs/models) for descriptions of them.

  - `name: Optional[str]`

    The name of the assistant. The maximum length is 256 characters.

  - `object: Literal["assistant"]`

    The object type, which is always `assistant`.

    - `"assistant"`

  - `tools: List[AssistantTool]`

    A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant. Tools can be of types `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterTool: …`

      - `type: Literal["code_interpreter"]`

        The type of tool being defined: `code_interpreter`

        - `"code_interpreter"`

    - `class FileSearchTool: …`

      - `type: Literal["file_search"]`

        The type of tool being defined: `file_search`

        - `"file_search"`

      - `file_search: Optional[FileSearch]`

        Overrides for the file search tool.

        - `max_num_results: Optional[int]`

          The maximum number of results the file search tool should output. The default is 20 for `gpt-4*` models and 5 for `gpt-3.5-turbo`. This number should be between 1 and 50 inclusive.

          Note that the file search tool may output fewer than `max_num_results` results. See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search. If not specified, the file search tool will use the `auto` ranker and a score_threshold of 0.

          See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

          - `ranker: Optional[Literal["auto", "default_2024_08_21"]]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

    - `class FunctionTool: …`

      - `function: FunctionDefinition`

        - `name: str`

          The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the function does, used by the model to choose when and how to call the function.

        - `parameters: Optional[FunctionParameters]`

          The parameters the functions accepts, described as a JSON Schema object. See the [guide](https://platform.openai.com/docs/guides/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.

          Omitting `parameters` defines a function with an empty parameter list.

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the `parameters` field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn more about Structured Outputs in the [function calling guide](https://platform.openai.com/docs/guides/function-calling).

      - `type: Literal["function"]`

        The type of tool being defined: `function`

        - `"function"`

  - `response_format: Optional[AssistantResponseFormatOption]`

    Specifies the format that the model must output. Compatible with [GPT-4o](https://platform.openai.com/docs/models#gpt-4o), [GPT-4 Turbo](https://platform.openai.com/docs/models#gpt-4-turbo-and-gpt-4), and all GPT-3.5 Turbo models since `gpt-3.5-turbo-1106`.

    Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. Learn more in the [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).

    Setting to `{ "type": "json_object" }` enables JSON mode, which ensures the message the model generates is valid JSON.

    **Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message. Without this, the model may generate an unending stream of whitespace until the generation reaches the token limit, resulting in a long-running and seemingly "stuck" request. Also note that the message content may be partially cut off if `finish_reason="length"`, which indicates the generation exceeded `max_tokens` or the conversation exceeded the max context length.

    - `Literal["auto"]`

      `auto` is the default value

      - `"auto"`

    - `class ResponseFormatText: …`

      Default response format. Used to generate text responses.

      - `type: Literal["text"]`

        The type of response format being defined. Always `text`.

        - `"text"`

    - `class ResponseFormatJSONObject: …`

      JSON object response format. An older method of generating JSON responses.
      Using `json_schema` is recommended for models that support it. Note that the
      model will not generate JSON without a system or user message instructing it
      to do so.

      - `type: Literal["json_object"]`

        The type of response format being defined. Always `json_object`.

        - `"json_object"`

    - `class ResponseFormatJSONSchema: …`

      JSON Schema response format. Used to generate structured JSON responses.
      Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

      - `json_schema: JSONSchema`

        Structured Outputs configuration options, including a JSON Schema.

        - `name: str`

          The name of the response format. Must be a-z, A-Z, 0-9, or contain
          underscores and dashes, with a maximum length of 64.

        - `description: Optional[str]`

          A description of what the response format is for, used by the model to
          determine how to respond in the format.

        - `schema: Optional[Dict[str, object]]`

          The schema for the response format, described as a JSON Schema object.
          Learn how to build JSON schemas [here](https://json-schema.org/).

        - `strict: Optional[bool]`

          Whether to enable strict schema adherence when generating the output.
          If set to true, the model will always follow the exact schema defined
          in the `schema` field. Only a subset of JSON Schema is supported when
          `strict` is `true`. To learn more, read the [Structured Outputs
          guide](https://platform.openai.com/docs/guides/structured-outputs).

      - `type: Literal["json_schema"]`

        The type of response format being defined. Always `json_schema`.

        - `"json_schema"`

  - `temperature: Optional[float]`

    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are used by the assistant's tools. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter`` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this assistant. There can be a maximum of 1 vector store attached to the assistant.

  - `top_p: Optional[float]`

    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

    We generally recommend altering this or temperature but not both.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant = client.beta.assistants.create(
    model="gpt-4o",
)
print(assistant.id)
```
