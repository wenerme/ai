# Steps

## List

`beta.threads.runs.steps.list(strrun_id, StepListParams**kwargs)  -> SyncCursorPage[RunStep]`

**get** `/threads/{thread_id}/runs/{run_id}/steps`

Returns a list of run steps belonging to a run.

### Parameters

- `thread_id: str`

- `run_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `include: Optional[List[RunStepInclude]]`

  A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

  See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

  - `"step_details.tool_calls[*].file_search.results[*].content"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

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

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

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
page = client.beta.threads.runs.steps.list(
    run_id="run_id",
    thread_id="thread_id",
)
page = page.data[0]
print(page.id)
```

## Retrieve

`beta.threads.runs.steps.retrieve(strstep_id, StepRetrieveParams**kwargs)  -> RunStep`

**get** `/threads/{thread_id}/runs/{run_id}/steps/{step_id}`

Retrieves a run step.

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

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

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

## Domain Types

### Code Interpreter Logs

- `class CodeInterpreterLogs: …`

  Text output from the Code Interpreter tool call as part of a run step.

  - `index: int`

    The index of the output in the outputs array.

  - `type: Literal["logs"]`

    Always `logs`.

    - `"logs"`

  - `logs: Optional[str]`

    The text output from the Code Interpreter tool call.

### Code Interpreter Output Image

- `class CodeInterpreterOutputImage: …`

  - `index: int`

    The index of the output in the outputs array.

  - `type: Literal["image"]`

    Always `image`.

    - `"image"`

  - `image: Optional[Image]`

    - `file_id: Optional[str]`

      The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

### Code Interpreter Tool Call

- `class CodeInterpreterToolCall: …`

  Details of the Code Interpreter tool call the run step was involved in.

  - `id: str`

    The ID of the tool call.

  - `code_interpreter: CodeInterpreter`

    The Code Interpreter tool call definition.

    - `input: str`

      The input to the Code Interpreter tool call.

    - `outputs: List[CodeInterpreterOutput]`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `class CodeInterpreterOutputLogs: …`

        Text output from the Code Interpreter tool call as part of a run step.

        - `logs: str`

          The text output from the Code Interpreter tool call.

        - `type: Literal["logs"]`

          Always `logs`.

          - `"logs"`

      - `class CodeInterpreterOutputImage: …`

        - `image: CodeInterpreterOutputImageImage`

          - `file_id: str`

            The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

        - `type: Literal["image"]`

          Always `image`.

          - `"image"`

  - `type: Literal["code_interpreter"]`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

### Code Interpreter Tool Call Delta

- `class CodeInterpreterToolCallDelta: …`

  Details of the Code Interpreter tool call the run step was involved in.

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["code_interpreter"]`

    The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

    - `"code_interpreter"`

  - `id: Optional[str]`

    The ID of the tool call.

  - `code_interpreter: Optional[CodeInterpreter]`

    The Code Interpreter tool call definition.

    - `input: Optional[str]`

      The input to the Code Interpreter tool call.

    - `outputs: Optional[List[CodeInterpreterOutput]]`

      The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

      - `class CodeInterpreterLogs: …`

        Text output from the Code Interpreter tool call as part of a run step.

        - `index: int`

          The index of the output in the outputs array.

        - `type: Literal["logs"]`

          Always `logs`.

          - `"logs"`

        - `logs: Optional[str]`

          The text output from the Code Interpreter tool call.

      - `class CodeInterpreterOutputImage: …`

        - `index: int`

          The index of the output in the outputs array.

        - `type: Literal["image"]`

          Always `image`.

          - `"image"`

        - `image: Optional[Image]`

          - `file_id: Optional[str]`

            The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

### File Search Tool Call

- `class FileSearchToolCall: …`

  - `id: str`

    The ID of the tool call object.

  - `file_search: FileSearch`

    For now, this is always going to be an empty object.

    - `ranking_options: Optional[FileSearchRankingOptions]`

      The ranking options for the file search.

      - `ranker: Literal["auto", "default_2024_08_21"]`

        The ranker to use for the file search. If not specified will use the `auto` ranker.

        - `"auto"`

        - `"default_2024_08_21"`

      - `score_threshold: float`

        The score threshold for the file search. All values must be a floating point number between 0 and 1.

    - `results: Optional[List[FileSearchResult]]`

      The results of the file search.

      - `file_id: str`

        The ID of the file that result was found in.

      - `file_name: str`

        The name of the file that result was found in.

      - `score: float`

        The score of the result. All values must be a floating point number between 0 and 1.

      - `content: Optional[List[FileSearchResultContent]]`

        The content of the result that was found. The content is only included if requested via the include query parameter.

        - `text: Optional[str]`

          The text content of the file.

        - `type: Optional[Literal["text"]]`

          The type of the content.

          - `"text"`

  - `type: Literal["file_search"]`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

### File Search Tool Call Delta

- `class FileSearchToolCallDelta: …`

  - `file_search: object`

    For now, this is always going to be an empty object.

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["file_search"]`

    The type of tool call. This is always going to be `file_search` for this type of tool call.

    - `"file_search"`

  - `id: Optional[str]`

    The ID of the tool call object.

### Function Tool Call

- `class FunctionToolCall: …`

  - `id: str`

    The ID of the tool call object.

  - `function: Function`

    The definition of the function that was called.

    - `arguments: str`

      The arguments passed to the function.

    - `name: str`

      The name of the function.

    - `output: Optional[str]`

      The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

  - `type: Literal["function"]`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

### Function Tool Call Delta

- `class FunctionToolCallDelta: …`

  - `index: int`

    The index of the tool call in the tool calls array.

  - `type: Literal["function"]`

    The type of tool call. This is always going to be `function` for this type of tool call.

    - `"function"`

  - `id: Optional[str]`

    The ID of the tool call object.

  - `function: Optional[Function]`

    The definition of the function that was called.

    - `arguments: Optional[str]`

      The arguments passed to the function.

    - `name: Optional[str]`

      The name of the function.

    - `output: Optional[str]`

      The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Message Creation Step Details

- `class MessageCreationStepDetails: …`

  Details of the message creation by the run step.

  - `message_creation: MessageCreation`

    - `message_id: str`

      The ID of the message that was created by this run step.

  - `type: Literal["message_creation"]`

    Always `message_creation`.

    - `"message_creation"`

### Run Step

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

      - `tool_calls: List[ToolCall]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCall: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `id: str`

            The ID of the tool call.

          - `code_interpreter: CodeInterpreter`

            The Code Interpreter tool call definition.

            - `input: str`

              The input to the Code Interpreter tool call.

            - `outputs: List[CodeInterpreterOutput]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterOutputLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `logs: str`

                  The text output from the Code Interpreter tool call.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

              - `class CodeInterpreterOutputImage: …`

                - `image: CodeInterpreterOutputImageImage`

                  - `file_id: str`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

        - `class FileSearchToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `file_search: FileSearch`

            For now, this is always going to be an empty object.

            - `ranking_options: Optional[FileSearchRankingOptions]`

              The ranking options for the file search.

              - `ranker: Literal["auto", "default_2024_08_21"]`

                The ranker to use for the file search. If not specified will use the `auto` ranker.

                - `"auto"`

                - `"default_2024_08_21"`

              - `score_threshold: float`

                The score threshold for the file search. All values must be a floating point number between 0 and 1.

            - `results: Optional[List[FileSearchResult]]`

              The results of the file search.

              - `file_id: str`

                The ID of the file that result was found in.

              - `file_name: str`

                The name of the file that result was found in.

              - `score: float`

                The score of the result. All values must be a floating point number between 0 and 1.

              - `content: Optional[List[FileSearchResultContent]]`

                The content of the result that was found. The content is only included if requested via the include query parameter.

                - `text: Optional[str]`

                  The text content of the file.

                - `type: Optional[Literal["text"]]`

                  The type of the content.

                  - `"text"`

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

        - `class FunctionToolCall: …`

          - `id: str`

            The ID of the tool call object.

          - `function: Function`

            The definition of the function that was called.

            - `arguments: str`

              The arguments passed to the function.

            - `name: str`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

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

### Run Step Delta

- `class RunStepDelta: …`

  The delta containing the fields that have changed on the run step.

  - `step_details: Optional[StepDetails]`

    The details of the run step.

    - `class RunStepDeltaMessageDelta: …`

      Details of the message creation by the run step.

      - `type: Literal["message_creation"]`

        Always `message_creation`.

        - `"message_creation"`

      - `message_creation: Optional[MessageCreation]`

        - `message_id: Optional[str]`

          The ID of the message that was created by this run step.

    - `class ToolCallDeltaObject: …`

      Details of the tool call.

      - `type: Literal["tool_calls"]`

        Always `tool_calls`.

        - `"tool_calls"`

      - `tool_calls: Optional[List[ToolCallDelta]]`

        An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

        - `class CodeInterpreterToolCallDelta: …`

          Details of the Code Interpreter tool call the run step was involved in.

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["code_interpreter"]`

            The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

            - `"code_interpreter"`

          - `id: Optional[str]`

            The ID of the tool call.

          - `code_interpreter: Optional[CodeInterpreter]`

            The Code Interpreter tool call definition.

            - `input: Optional[str]`

              The input to the Code Interpreter tool call.

            - `outputs: Optional[List[CodeInterpreterOutput]]`

              The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

              - `class CodeInterpreterLogs: …`

                Text output from the Code Interpreter tool call as part of a run step.

                - `index: int`

                  The index of the output in the outputs array.

                - `type: Literal["logs"]`

                  Always `logs`.

                  - `"logs"`

                - `logs: Optional[str]`

                  The text output from the Code Interpreter tool call.

              - `class CodeInterpreterOutputImage: …`

                - `index: int`

                  The index of the output in the outputs array.

                - `type: Literal["image"]`

                  Always `image`.

                  - `"image"`

                - `image: Optional[Image]`

                  - `file_id: Optional[str]`

                    The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

        - `class FileSearchToolCallDelta: …`

          - `file_search: object`

            For now, this is always going to be an empty object.

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["file_search"]`

            The type of tool call. This is always going to be `file_search` for this type of tool call.

            - `"file_search"`

          - `id: Optional[str]`

            The ID of the tool call object.

        - `class FunctionToolCallDelta: …`

          - `index: int`

            The index of the tool call in the tool calls array.

          - `type: Literal["function"]`

            The type of tool call. This is always going to be `function` for this type of tool call.

            - `"function"`

          - `id: Optional[str]`

            The ID of the tool call object.

          - `function: Optional[Function]`

            The definition of the function that was called.

            - `arguments: Optional[str]`

              The arguments passed to the function.

            - `name: Optional[str]`

              The name of the function.

            - `output: Optional[str]`

              The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Run Step Delta Event

- `class RunStepDeltaEvent: …`

  Represents a run step delta i.e. any changed fields on a run step during streaming.

  - `id: str`

    The identifier of the run step, which can be referenced in API endpoints.

  - `delta: RunStepDelta`

    The delta containing the fields that have changed on the run step.

    - `step_details: Optional[StepDetails]`

      The details of the run step.

      - `class RunStepDeltaMessageDelta: …`

        Details of the message creation by the run step.

        - `type: Literal["message_creation"]`

          Always `message_creation`.

          - `"message_creation"`

        - `message_creation: Optional[MessageCreation]`

          - `message_id: Optional[str]`

            The ID of the message that was created by this run step.

      - `class ToolCallDeltaObject: …`

        Details of the tool call.

        - `type: Literal["tool_calls"]`

          Always `tool_calls`.

          - `"tool_calls"`

        - `tool_calls: Optional[List[ToolCallDelta]]`

          An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

          - `class CodeInterpreterToolCallDelta: …`

            Details of the Code Interpreter tool call the run step was involved in.

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["code_interpreter"]`

              The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

              - `"code_interpreter"`

            - `id: Optional[str]`

              The ID of the tool call.

            - `code_interpreter: Optional[CodeInterpreter]`

              The Code Interpreter tool call definition.

              - `input: Optional[str]`

                The input to the Code Interpreter tool call.

              - `outputs: Optional[List[CodeInterpreterOutput]]`

                The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

                - `class CodeInterpreterLogs: …`

                  Text output from the Code Interpreter tool call as part of a run step.

                  - `index: int`

                    The index of the output in the outputs array.

                  - `type: Literal["logs"]`

                    Always `logs`.

                    - `"logs"`

                  - `logs: Optional[str]`

                    The text output from the Code Interpreter tool call.

                - `class CodeInterpreterOutputImage: …`

                  - `index: int`

                    The index of the output in the outputs array.

                  - `type: Literal["image"]`

                    Always `image`.

                    - `"image"`

                  - `image: Optional[Image]`

                    - `file_id: Optional[str]`

                      The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

          - `class FileSearchToolCallDelta: …`

            - `file_search: object`

              For now, this is always going to be an empty object.

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["file_search"]`

              The type of tool call. This is always going to be `file_search` for this type of tool call.

              - `"file_search"`

            - `id: Optional[str]`

              The ID of the tool call object.

          - `class FunctionToolCallDelta: …`

            - `index: int`

              The index of the tool call in the tool calls array.

            - `type: Literal["function"]`

              The type of tool call. This is always going to be `function` for this type of tool call.

              - `"function"`

            - `id: Optional[str]`

              The ID of the tool call object.

            - `function: Optional[Function]`

              The definition of the function that was called.

              - `arguments: Optional[str]`

                The arguments passed to the function.

              - `name: Optional[str]`

                The name of the function.

              - `output: Optional[str]`

                The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

  - `object: Literal["thread.run.step.delta"]`

    The object type, which is always `thread.run.step.delta`.

    - `"thread.run.step.delta"`

### Run Step Delta Message Delta

- `class RunStepDeltaMessageDelta: …`

  Details of the message creation by the run step.

  - `type: Literal["message_creation"]`

    Always `message_creation`.

    - `"message_creation"`

  - `message_creation: Optional[MessageCreation]`

    - `message_id: Optional[str]`

      The ID of the message that was created by this run step.

### Run Step Include

- `Literal["step_details.tool_calls[*].file_search.results[*].content"]`

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Tool Call

- `ToolCall`

  Details of the Code Interpreter tool call the run step was involved in.

  - `class CodeInterpreterToolCall: …`

    Details of the Code Interpreter tool call the run step was involved in.

    - `id: str`

      The ID of the tool call.

    - `code_interpreter: CodeInterpreter`

      The Code Interpreter tool call definition.

      - `input: str`

        The input to the Code Interpreter tool call.

      - `outputs: List[CodeInterpreterOutput]`

        The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

        - `class CodeInterpreterOutputLogs: …`

          Text output from the Code Interpreter tool call as part of a run step.

          - `logs: str`

            The text output from the Code Interpreter tool call.

          - `type: Literal["logs"]`

            Always `logs`.

            - `"logs"`

        - `class CodeInterpreterOutputImage: …`

          - `image: CodeInterpreterOutputImageImage`

            - `file_id: str`

              The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

          - `type: Literal["image"]`

            Always `image`.

            - `"image"`

    - `type: Literal["code_interpreter"]`

      The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

      - `"code_interpreter"`

  - `class FileSearchToolCall: …`

    - `id: str`

      The ID of the tool call object.

    - `file_search: FileSearch`

      For now, this is always going to be an empty object.

      - `ranking_options: Optional[FileSearchRankingOptions]`

        The ranking options for the file search.

        - `ranker: Literal["auto", "default_2024_08_21"]`

          The ranker to use for the file search. If not specified will use the `auto` ranker.

          - `"auto"`

          - `"default_2024_08_21"`

        - `score_threshold: float`

          The score threshold for the file search. All values must be a floating point number between 0 and 1.

      - `results: Optional[List[FileSearchResult]]`

        The results of the file search.

        - `file_id: str`

          The ID of the file that result was found in.

        - `file_name: str`

          The name of the file that result was found in.

        - `score: float`

          The score of the result. All values must be a floating point number between 0 and 1.

        - `content: Optional[List[FileSearchResultContent]]`

          The content of the result that was found. The content is only included if requested via the include query parameter.

          - `text: Optional[str]`

            The text content of the file.

          - `type: Optional[Literal["text"]]`

            The type of the content.

            - `"text"`

    - `type: Literal["file_search"]`

      The type of tool call. This is always going to be `file_search` for this type of tool call.

      - `"file_search"`

  - `class FunctionToolCall: …`

    - `id: str`

      The ID of the tool call object.

    - `function: Function`

      The definition of the function that was called.

      - `arguments: str`

        The arguments passed to the function.

      - `name: str`

        The name of the function.

      - `output: Optional[str]`

        The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

    - `type: Literal["function"]`

      The type of tool call. This is always going to be `function` for this type of tool call.

      - `"function"`

### Tool Call Delta

- `ToolCallDelta`

  Details of the Code Interpreter tool call the run step was involved in.

  - `class CodeInterpreterToolCallDelta: …`

    Details of the Code Interpreter tool call the run step was involved in.

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["code_interpreter"]`

      The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

      - `"code_interpreter"`

    - `id: Optional[str]`

      The ID of the tool call.

    - `code_interpreter: Optional[CodeInterpreter]`

      The Code Interpreter tool call definition.

      - `input: Optional[str]`

        The input to the Code Interpreter tool call.

      - `outputs: Optional[List[CodeInterpreterOutput]]`

        The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

        - `class CodeInterpreterLogs: …`

          Text output from the Code Interpreter tool call as part of a run step.

          - `index: int`

            The index of the output in the outputs array.

          - `type: Literal["logs"]`

            Always `logs`.

            - `"logs"`

          - `logs: Optional[str]`

            The text output from the Code Interpreter tool call.

        - `class CodeInterpreterOutputImage: …`

          - `index: int`

            The index of the output in the outputs array.

          - `type: Literal["image"]`

            Always `image`.

            - `"image"`

          - `image: Optional[Image]`

            - `file_id: Optional[str]`

              The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

  - `class FileSearchToolCallDelta: …`

    - `file_search: object`

      For now, this is always going to be an empty object.

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["file_search"]`

      The type of tool call. This is always going to be `file_search` for this type of tool call.

      - `"file_search"`

    - `id: Optional[str]`

      The ID of the tool call object.

  - `class FunctionToolCallDelta: …`

    - `index: int`

      The index of the tool call in the tool calls array.

    - `type: Literal["function"]`

      The type of tool call. This is always going to be `function` for this type of tool call.

      - `"function"`

    - `id: Optional[str]`

      The ID of the tool call object.

    - `function: Optional[Function]`

      The definition of the function that was called.

      - `arguments: Optional[str]`

        The arguments passed to the function.

      - `name: Optional[str]`

        The name of the function.

      - `output: Optional[str]`

        The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Tool Call Delta Object

- `class ToolCallDeltaObject: …`

  Details of the tool call.

  - `type: Literal["tool_calls"]`

    Always `tool_calls`.

    - `"tool_calls"`

  - `tool_calls: Optional[List[ToolCallDelta]]`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterToolCallDelta: …`

      Details of the Code Interpreter tool call the run step was involved in.

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["code_interpreter"]`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

      - `id: Optional[str]`

        The ID of the tool call.

      - `code_interpreter: Optional[CodeInterpreter]`

        The Code Interpreter tool call definition.

        - `input: Optional[str]`

          The input to the Code Interpreter tool call.

        - `outputs: Optional[List[CodeInterpreterOutput]]`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `class CodeInterpreterLogs: …`

            Text output from the Code Interpreter tool call as part of a run step.

            - `index: int`

              The index of the output in the outputs array.

            - `type: Literal["logs"]`

              Always `logs`.

              - `"logs"`

            - `logs: Optional[str]`

              The text output from the Code Interpreter tool call.

          - `class CodeInterpreterOutputImage: …`

            - `index: int`

              The index of the output in the outputs array.

            - `type: Literal["image"]`

              Always `image`.

              - `"image"`

            - `image: Optional[Image]`

              - `file_id: Optional[str]`

                The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

    - `class FileSearchToolCallDelta: …`

      - `file_search: object`

        For now, this is always going to be an empty object.

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["file_search"]`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

      - `id: Optional[str]`

        The ID of the tool call object.

    - `class FunctionToolCallDelta: …`

      - `index: int`

        The index of the tool call in the tool calls array.

      - `type: Literal["function"]`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

      - `id: Optional[str]`

        The ID of the tool call object.

      - `function: Optional[Function]`

        The definition of the function that was called.

        - `arguments: Optional[str]`

          The arguments passed to the function.

        - `name: Optional[str]`

          The name of the function.

        - `output: Optional[str]`

          The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

### Tool Calls Step Details

- `class ToolCallsStepDetails: …`

  Details of the tool call.

  - `tool_calls: List[ToolCall]`

    An array of tool calls the run step was involved in. These can be associated with one of three types of tools: `code_interpreter`, `file_search`, or `function`.

    - `class CodeInterpreterToolCall: …`

      Details of the Code Interpreter tool call the run step was involved in.

      - `id: str`

        The ID of the tool call.

      - `code_interpreter: CodeInterpreter`

        The Code Interpreter tool call definition.

        - `input: str`

          The input to the Code Interpreter tool call.

        - `outputs: List[CodeInterpreterOutput]`

          The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (`logs`) or images (`image`). Each of these are represented by a different object type.

          - `class CodeInterpreterOutputLogs: …`

            Text output from the Code Interpreter tool call as part of a run step.

            - `logs: str`

              The text output from the Code Interpreter tool call.

            - `type: Literal["logs"]`

              Always `logs`.

              - `"logs"`

          - `class CodeInterpreterOutputImage: …`

            - `image: CodeInterpreterOutputImageImage`

              - `file_id: str`

                The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

            - `type: Literal["image"]`

              Always `image`.

              - `"image"`

      - `type: Literal["code_interpreter"]`

        The type of tool call. This is always going to be `code_interpreter` for this type of tool call.

        - `"code_interpreter"`

    - `class FileSearchToolCall: …`

      - `id: str`

        The ID of the tool call object.

      - `file_search: FileSearch`

        For now, this is always going to be an empty object.

        - `ranking_options: Optional[FileSearchRankingOptions]`

          The ranking options for the file search.

          - `ranker: Literal["auto", "default_2024_08_21"]`

            The ranker to use for the file search. If not specified will use the `auto` ranker.

            - `"auto"`

            - `"default_2024_08_21"`

          - `score_threshold: float`

            The score threshold for the file search. All values must be a floating point number between 0 and 1.

        - `results: Optional[List[FileSearchResult]]`

          The results of the file search.

          - `file_id: str`

            The ID of the file that result was found in.

          - `file_name: str`

            The name of the file that result was found in.

          - `score: float`

            The score of the result. All values must be a floating point number between 0 and 1.

          - `content: Optional[List[FileSearchResultContent]]`

            The content of the result that was found. The content is only included if requested via the include query parameter.

            - `text: Optional[str]`

              The text content of the file.

            - `type: Optional[Literal["text"]]`

              The type of the content.

              - `"text"`

      - `type: Literal["file_search"]`

        The type of tool call. This is always going to be `file_search` for this type of tool call.

        - `"file_search"`

    - `class FunctionToolCall: …`

      - `id: str`

        The ID of the tool call object.

      - `function: Function`

        The definition of the function that was called.

        - `arguments: str`

          The arguments passed to the function.

        - `name: str`

          The name of the function.

        - `output: Optional[str]`

          The output of the function. This will be `null` if the outputs have not been [submitted](https://platform.openai.com/docs/api-reference/runs/submitToolOutputs) yet.

      - `type: Literal["function"]`

        The type of tool call. This is always going to be `function` for this type of tool call.

        - `"function"`

  - `type: Literal["tool_calls"]`

    Always `tool_calls`.

    - `"tool_calls"`
