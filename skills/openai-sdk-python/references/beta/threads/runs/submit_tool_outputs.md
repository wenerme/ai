## Submit tool outputs to run

`beta.threads.runs.submit_tool_outputs(strrun_id, RunSubmitToolOutputsParams**kwargs)  -> Run`

**post** `/threads/{thread_id}/runs/{run_id}/submit_tool_outputs`

When a run has the `status: "requires_action"` and `required_action.type` is `submit_tool_outputs`, this endpoint can be used to submit the outputs from the tool calls once they're all completed. All outputs must be submitted in a single request.

### Parameters

- `thread_id: str`

- `run_id: str`

- `tool_outputs: Iterable[ToolOutput]`

  A list of tools for which the outputs are being submitted.

  - `output: Optional[str]`

    The output of the tool call to be submitted to continue the run.

  - `tool_call_id: Optional[str]`

    The ID of the tool call in the `required_action` object within the run object the output is being submitted for.

- `stream: Optional[Literal[false]]`

  If `true`, returns a stream of events that happen during the Run as server-sent events, terminating when the Run enters a terminal state with a `data: [DONE]` message.

  - `false`

### Returns

- `class Run: …`

  Represents an execution run on a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for execution of this run.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run was completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run was created.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run failed.

  - `incomplete_details: Optional[IncompleteDetails]`

    Details on why the run is incomplete. Will be `null` if the run is not incomplete.

    - `reason: Optional[Literal["max_completion_tokens", "max_prompt_tokens"]]`

      The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run.

      - `"max_completion_tokens"`

      - `"max_prompt_tokens"`

  - `instructions: str`

    The instructions that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `last_error: Optional[LastError]`

    The last error associated with this run. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded", "invalid_prompt"]`

      One of `server_error`, `rate_limit_exceeded`, or `invalid_prompt`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

      - `"invalid_prompt"`

    - `message: str`

      A human-readable description of the error.

  - `max_completion_tokens: Optional[int]`

    The maximum number of completion tokens specified to have been used over the course of the run.

  - `max_prompt_tokens: Optional[int]`

    The maximum number of prompt tokens specified to have been used over the course of the run.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: str`

    The model that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

  - `object: Literal["thread.run"]`

    The object type, which is always `thread.run`.

    - `"thread.run"`

  - `parallel_tool_calls: bool`

    Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling#configuring-parallel-function-calling) during tool use.

  - `required_action: Optional[RequiredAction]`

    Details on the action required to continue the run. Will be `null` if no action is required.

    - `submit_tool_outputs: RequiredActionSubmitToolOutputs`

      Details on the tool outputs needed for this run to continue.

      - `tool_calls: List[RequiredActionFunctionToolCall]`

        A list of the relevant tool calls.

        - `id: str`

          The ID of the tool call. This ID must be referenced when you submit the tool outputs in using the [Submit tool outputs to run](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) endpoint.

        - `function: Function`

          The function definition.

          - `arguments: str`

            The arguments that the model expects you to pass to the function.

          - `name: str`

            The name of the function.

        - `type: Literal["function"]`

          The type of tool call the output is required for. For now, this is always `function`.

          - `"function"`

    - `type: Literal["submit_tool_outputs"]`

      For now, this is always `submit_tool_outputs`.

      - `"submit_tool_outputs"`

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

  - `started_at: Optional[int]`

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

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was executed on as a part of this run.

  - `tool_choice: Optional[AssistantToolChoiceOption]`

    Controls which (if any) tool is called by the model.
    `none` means the model will not call any tools and instead generates a message.
    `auto` is the default value and means the model can pick between generating a message or calling one or more tools.
    `required` means the model must call one or more tools before responding to the user.
    Specifying a particular tool like `{"type": "file_search"}` or `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool.

    - `Literal["none", "auto", "required"]`

      `none` means the model will not call any tools and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools before responding to the user.

      - `"none"`

      - `"auto"`

      - `"required"`

    - `class AssistantToolChoice: …`

      Specifies a tool the model should use. Use to force the model to call a specific tool.

      - `type: Literal["function", "code_interpreter", "file_search"]`

        The type of the tool. If type is `function`, the function name must be set

        - `"function"`

        - `"code_interpreter"`

        - `"file_search"`

      - `function: Optional[AssistantToolChoiceFunction]`

        - `name: str`

          The name of the function to call.

  - `tools: List[AssistantTool]`

    The list of tools that the [assistant](https://platform.openai.com/docs/api-reference/assistants) used for this run.

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

  - `truncation_strategy: Optional[TruncationStrategy]`

    Controls for how a thread will be truncated prior to the run. Use this to control the initial context window of the run.

    - `type: Literal["auto", "last_messages"]`

      The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will be truncated to the n most recent messages in the thread. When set to `auto`, messages in the middle of the thread will be dropped to fit the context length of the model, `max_prompt_tokens`.

      - `"auto"`

      - `"last_messages"`

    - `last_messages: Optional[int]`

      The number of most recent messages from the thread when constructing the context for the run.

  - `usage: Optional[Usage]`

    Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.).

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

  - `temperature: Optional[float]`

    The sampling temperature used for this run. If not set, defaults to 1.

  - `top_p: Optional[float]`

    The nucleus sampling value used for this run. If not set, defaults to 1.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
for run in client.beta.threads.runs.submit_tool_outputs(
    run_id="run_id",
    thread_id="thread_id",
    tool_outputs=[{}],
):
  print(run)
```

#### Response

```json
{
  "id": "id",
  "assistant_id": "assistant_id",
  "cancelled_at": 0,
  "completed_at": 0,
  "created_at": 0,
  "expires_at": 0,
  "failed_at": 0,
  "incomplete_details": {
    "reason": "max_completion_tokens"
  },
  "instructions": "instructions",
  "last_error": {
    "code": "server_error",
    "message": "message"
  },
  "max_completion_tokens": 256,
  "max_prompt_tokens": 256,
  "metadata": {
    "foo": "string"
  },
  "model": "model",
  "object": "thread.run",
  "parallel_tool_calls": true,
  "required_action": {
    "submit_tool_outputs": {
      "tool_calls": [
        {
          "id": "id",
          "function": {
            "arguments": "arguments",
            "name": "name"
          },
          "type": "function"
        }
      ]
    },
    "type": "submit_tool_outputs"
  },
  "response_format": "auto",
  "started_at": 0,
  "status": "queued",
  "thread_id": "thread_id",
  "tool_choice": "none",
  "tools": [
    {
      "type": "code_interpreter"
    }
  ],
  "truncation_strategy": {
    "type": "auto",
    "last_messages": 1
  },
  "usage": {
    "completion_tokens": 0,
    "prompt_tokens": 0,
    "total_tokens": 0
  },
  "temperature": 0,
  "top_p": 0
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

run = client.beta.threads.runs.submit_tool_outputs(
  thread_id="thread_123",
  run_id="run_123",
  tool_outputs=[
    {
      "tool_call_id": "call_001",
      "output": "70 degrees and sunny."
    }
  ]
)

print(run)
```

#### Response

```json
{
  "id": "run_123",
  "object": "thread.run",
  "created_at": 1699075592,
  "assistant_id": "asst_123",
  "thread_id": "thread_123",
  "status": "queued",
  "started_at": 1699075592,
  "expires_at": 1699076192,
  "cancelled_at": null,
  "failed_at": null,
  "completed_at": null,
  "last_error": null,
  "model": "gpt-4o",
  "instructions": null,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "metadata": {},
  "usage": null,
  "temperature": 1.0,
  "top_p": 1.0,
  "max_prompt_tokens": 1000,
  "max_completion_tokens": 1000,
  "truncation_strategy": {
    "type": "auto",
    "last_messages": null
  },
  "response_format": "auto",
  "tool_choice": "auto",
  "parallel_tool_calls": true
}
```

### Streaming

```python
from openai import OpenAI
client = OpenAI()

stream = client.beta.threads.runs.submit_tool_outputs(
  thread_id="thread_123",
  run_id="run_123",
  tool_outputs=[
    {
      "tool_call_id": "call_001",
      "output": "70 degrees and sunny."
    }
  ],
  stream=True
)

for event in stream:
  print(event)
```

#### Response

```json
event: thread.run.step.completed
data: {"id":"step_001","object":"thread.run.step","created_at":1710352449,"run_id":"run_123","assistant_id":"asst_123","thread_id":"thread_123","type":"tool_calls","status":"completed","cancelled_at":null,"completed_at":1710352475,"expires_at":1710353047,"failed_at":null,"last_error":null,"step_details":{"type":"tool_calls","tool_calls":[{"id":"call_iWr0kQ2EaYMaxNdl0v3KYkx7","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\":\"San Francisco, CA\",\"unit\":\"fahrenheit\"}","output":"70 degrees and sunny."}}]},"usage":{"prompt_tokens":291,"completion_tokens":24,"total_tokens":315}}

event: thread.run.queued
data: {"id":"run_123","object":"thread.run","created_at":1710352447,"assistant_id":"asst_123","thread_id":"thread_123","status":"queued","started_at":1710352448,"expires_at":1710353047,"cancelled_at":null,"failed_at":null,"completed_at":null,"required_action":null,"last_error":null,"model":"gpt-4o","instructions":null,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather in a given location","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and state, e.g. San Francisco, CA"},"unit":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location"]}}}],"metadata":{},"temperature":1.0,"top_p":1.0,"max_completion_tokens":null,"max_prompt_tokens":null,"truncation_strategy":{"type":"auto","last_messages":null},"incomplete_details":null,"usage":null,"response_format":"auto","tool_choice":"auto","parallel_tool_calls":true}}

event: thread.run.in_progress
data: {"id":"run_123","object":"thread.run","created_at":1710352447,"assistant_id":"asst_123","thread_id":"thread_123","status":"in_progress","started_at":1710352475,"expires_at":1710353047,"cancelled_at":null,"failed_at":null,"completed_at":null,"required_action":null,"last_error":null,"model":"gpt-4o","instructions":null,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather in a given location","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and state, e.g. San Francisco, CA"},"unit":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location"]}}}],"metadata":{},"temperature":1.0,"top_p":1.0,"max_completion_tokens":null,"max_prompt_tokens":null,"truncation_strategy":{"type":"auto","last_messages":null},"incomplete_details":null,"usage":null,"response_format":"auto","tool_choice":"auto","parallel_tool_calls":true}}

event: thread.run.step.created
data: {"id":"step_002","object":"thread.run.step","created_at":1710352476,"run_id":"run_123","assistant_id":"asst_123","thread_id":"thread_123","type":"message_creation","status":"in_progress","cancelled_at":null,"completed_at":null,"expires_at":1710353047,"failed_at":null,"last_error":null,"step_details":{"type":"message_creation","message_creation":{"message_id":"msg_002"}},"usage":null}

event: thread.run.step.in_progress
data: {"id":"step_002","object":"thread.run.step","created_at":1710352476,"run_id":"run_123","assistant_id":"asst_123","thread_id":"thread_123","type":"message_creation","status":"in_progress","cancelled_at":null,"completed_at":null,"expires_at":1710353047,"failed_at":null,"last_error":null,"step_details":{"type":"message_creation","message_creation":{"message_id":"msg_002"}},"usage":null}

event: thread.message.created
data: {"id":"msg_002","object":"thread.message","created_at":1710352476,"assistant_id":"asst_123","thread_id":"thread_123","run_id":"run_123","status":"in_progress","incomplete_details":null,"incomplete_at":null,"completed_at":null,"role":"assistant","content":[],"metadata":{}}

event: thread.message.in_progress
data: {"id":"msg_002","object":"thread.message","created_at":1710352476,"assistant_id":"asst_123","thread_id":"thread_123","run_id":"run_123","status":"in_progress","incomplete_details":null,"incomplete_at":null,"completed_at":null,"role":"assistant","content":[],"metadata":{}}

event: thread.message.delta
data: {"id":"msg_002","object":"thread.message.delta","delta":{"content":[{"index":0,"type":"text","text":{"value":"The","annotations":[]}}]}}

event: thread.message.delta
data: {"id":"msg_002","object":"thread.message.delta","delta":{"content":[{"index":0,"type":"text","text":{"value":" current"}}]}}

event: thread.message.delta
data: {"id":"msg_002","object":"thread.message.delta","delta":{"content":[{"index":0,"type":"text","text":{"value":" weather"}}]}}

...

event: thread.message.delta
data: {"id":"msg_002","object":"thread.message.delta","delta":{"content":[{"index":0,"type":"text","text":{"value":" sunny"}}]}}

event: thread.message.delta
data: {"id":"msg_002","object":"thread.message.delta","delta":{"content":[{"index":0,"type":"text","text":{"value":"."}}]}}

event: thread.message.completed
data: {"id":"msg_002","object":"thread.message","created_at":1710352476,"assistant_id":"asst_123","thread_id":"thread_123","run_id":"run_123","status":"completed","incomplete_details":null,"incomplete_at":null,"completed_at":1710352477,"role":"assistant","content":[{"type":"text","text":{"value":"The current weather in San Francisco, CA is 70 degrees Fahrenheit and sunny.","annotations":[]}}],"metadata":{}}

event: thread.run.step.completed
data: {"id":"step_002","object":"thread.run.step","created_at":1710352476,"run_id":"run_123","assistant_id":"asst_123","thread_id":"thread_123","type":"message_creation","status":"completed","cancelled_at":null,"completed_at":1710352477,"expires_at":1710353047,"failed_at":null,"last_error":null,"step_details":{"type":"message_creation","message_creation":{"message_id":"msg_002"}},"usage":{"prompt_tokens":329,"completion_tokens":18,"total_tokens":347}}

event: thread.run.completed
data: {"id":"run_123","object":"thread.run","created_at":1710352447,"assistant_id":"asst_123","thread_id":"thread_123","status":"completed","started_at":1710352475,"expires_at":null,"cancelled_at":null,"failed_at":null,"completed_at":1710352477,"required_action":null,"last_error":null,"model":"gpt-4o","instructions":null,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather in a given location","parameters":{"type":"object","properties":{"location":{"type":"string","description":"The city and state, e.g. San Francisco, CA"},"unit":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location"]}}}],"metadata":{},"temperature":1.0,"top_p":1.0,"max_completion_tokens":null,"max_prompt_tokens":null,"truncation_strategy":{"type":"auto","last_messages":null},"incomplete_details":null,"usage":{"prompt_tokens":20,"completion_tokens":11,"total_tokens":31},"response_format":"auto","tool_choice":"auto","parallel_tool_calls":true}}

event: done
data: [DONE]
```
