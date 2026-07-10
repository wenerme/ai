## Retrieve run step

`beta.threads.runs.steps.retrieve(strstep_id, StepRetrieveParams**kwargs)  -> RunStep`

**get** `/threads/{thread_id}/runs/{run_id}/steps/{step_id}`

Retrieve run step

### Parameters

- `thread_id: str`

- `run_id: str`

- `step_id: str`

- `include: Optional[List[RunStepInclude]]`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Returns

- `class RunStep: …`

  Represents a step in execution of a run.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `assistant_id: str`

    The ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) associated with the run step.

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step was cancelled.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step completed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the run step was created.

  - `expired_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step expired. A step is considered expired if the parent run is expired.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the run step failed.

  - `last_error: Optional[LastError]`

    The last error associated with this run step. Will be `null` if there are no errors.

    - `code: Literal["server_error", "rate_limit_exceeded"]`

      One of `server_error` or `rate_limit_exceeded`.

      - `"server_error"`

      - `"rate_limit_exceeded"`

    - `message: str`

      A human-readable description of the error.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.run.step"]`

    The object type, which is always `thread.run.step`.

    - `"thread.run.step"`

  - `run_id: str`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) that this run step is a part of.

  - `status: Literal["in_progress", "cancelled", "failed", 2 more]`

    The status of the run step, which can be either `in_progress`, `cancelled`, `failed`, `completed`, or `expired`.

    - `"in_progress"`

    - `"cancelled"`

    - `"failed"`

    - `"completed"`

    - `"expired"`

  - `step_details: StepDetails`

    The details of the run step.

    - `class MessageCreationStepDetails: …`

      Details of the message creation by the run step.

      - `message_creation: MessageCreation`

        - `message_id: str`

          The ID of the message that was created by this run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

    - `class ToolCallsStepDetails: …`

      Details of the tool call.

      - `tool_calls: List[object]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

  - `thread_id: str`

    The ID of the [thread](https://platform.openai.com/docs/api-reference/threads) that was run.

  - `type: Literal["message_creation", "tool_calls"]`

    The type of run step, which can be either `message_creation` or `tool_calls`.

    - `"message_creation"`

    - `"tool_calls"`

  - `usage: Optional[Usage]`

    Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`.

    - `completion_tokens: int`

      Number of completion tokens used over the course of the run step.

    - `prompt_tokens: int`

      Number of prompt tokens used over the course of the run step.

    - `total_tokens: int`

      Total number of tokens used (prompt + completion).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run_step = client.beta.threads.runs.steps.retrieve(
    step_id="step_id",
    thread_id="thread_id",
    run_id="run_id",
)
print(run_step.id)
```

#### Response

```json
{
  "id": "id",
  "assistant_id": "assistant_id",
  "cancelled_at": 0,
  "completed_at": 0,
  "created_at": 0,
  "expired_at": 0,
  "failed_at": 0,
  "last_error": {
    "code": "server_error",
    "message": "message"
  },
  "metadata": {
    "foo": "string"
  },
  "object": "thread.run.step",
  "run_id": "run_id",
  "status": "in_progress",
  "step_details": {
    "message_creation": {
      "message_id": "message_id"
    },
    "type": "message_creation"
  },
  "thread_id": "thread_id",
  "type": "message_creation",
  "usage": {
    "completion_tokens": 0,
    "prompt_tokens": 0,
    "total_tokens": 0
  }
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

run_step = client.beta.threads.runs.steps.retrieve(
    thread_id="thread_abc123",
    run_id="run_abc123",
    step_id="step_abc123"
)

print(run_step)
```

#### Response

```json
{
  "id": "step_abc123",
  "object": "thread.run.step",
  "created_at": 1699063291,
  "run_id": "run_abc123",
  "assistant_id": "asst_abc123",
  "thread_id": "thread_abc123",
  "type": "message_creation",
  "status": "completed",
  "cancelled_at": null,
  "completed_at": 1699063291,
  "expired_at": null,
  "failed_at": null,
  "last_error": null,
  "step_details": {
    "type": "message_creation",
    "message_creation": {
      "message_id": "msg_abc123"
    }
  },
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 456,
    "total_tokens": 579
  }
}
```
