# Steps

## List

`client.beta.threads.runs.steps.list(stringrunID, StepListParamsparams, RequestOptionsoptions?): CursorPage<RunStep>`

**get** `/threads/{thread_id}/runs/{run_id}/steps`

Returns a list of run steps belonging to a run.

### Parameters

- `runID: string`

- `params: StepListParams`

  - `thread_id: string`

    Path param: The ID of the thread the run and run steps belong to.

  - `after?: string`

    Query param: A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    Query param: A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `include?: Array<RunStepInclude>`

    Query param: A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

    See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

    - `"step_details.tool_calls[*].file_search.results[*].content"`

  - `limit?: number`

    Query param: A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Query param: Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `RunStep`

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

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const runStep of client.beta.threads.runs.steps.list('run_id', {
  thread_id: 'thread_id',
})) {
  console.log(runStep.id);
}
```

## Retrieve

`client.beta.threads.runs.steps.retrieve(stringstepID, StepRetrieveParamsparams, RequestOptionsoptions?): RunStep`

**get** `/threads/{thread_id}/runs/{run_id}/steps/{step_id}`

Retrieves a run step.

### Parameters

- `stepID: string`

- `params: StepRetrieveParams`

  - `thread_id: string`

    Path param: The ID of the thread to which the run and run step belongs.

  - `run_id: string`

    Path param: The ID of the run to which the run step belongs.

  - `include?: Array<RunStepInclude>`

    Query param: A list of additional fields to include in the response. Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.

    See the [file search tool documentation](https://platform.openai.com/docs/assistants/tools/file-search#customizing-file-search-settings) for more information.

    - `"step_details.tool_calls[*].file_search.results[*].content"`

### Returns

- `RunStep`

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

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const runStep = await client.beta.threads.runs.steps.retrieve('step_id', {
  thread_id: 'thread_id',
  run_id: 'run_id',
});

console.log(runStep.id);
```

## Domain Types

### Code Interpreter Logs

- `CodeInterpreterLogs`

  Text output from the Code Interpreter tool call as part of a run step.

  - `index: number`

    The index of the output in the outputs array.

  - `type: "logs"`

    Always `logs`.

    - `"logs"`

  - `logs?: string`

    The text output from the Code Interpreter tool call.

### Code Interpreter Output Image

- `CodeInterpreterOutputImage`

  - `index: number`

    The index of the output in the outputs array.

  - `type: "image"`

    Always `image`.

    - `"image"`

  - `image?: Image`

    - `file_id?: string`

      The [file](https://platform.openai.com/docs/api-reference/files) ID of the image.

### Code Interpreter Tool Call

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

### Code Interpreter Tool Call Delta

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

### File Search Tool Call

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

### File Search Tool Call Delta

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

### Function Tool Call

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

### Function Tool Call Delta

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

### Message Creation Step Details

- `MessageCreationStepDetails`

  Details of the message creation by the run step.

  - `message_creation: MessageCreation`

    - `message_id: string`

      The ID of the message that was created by this run step.

  - `type: "message_creation"`

    Always `message_creation`.

    - `"message_creation"`

### Run Step

- `RunStep`

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

### Run Step Delta

- `RunStepDelta`

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

### Run Step Delta Event

- `RunStepDeltaEvent`

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

### Run Step Delta Message Delta

- `RunStepDeltaMessageDelta`

  Details of the message creation by the run step.

  - `type: "message_creation"`

    Always `message_creation`.

    - `"message_creation"`

  - `message_creation?: MessageCreation`

    - `message_id?: string`

      The ID of the message that was created by this run step.

### Run Step Include

- `RunStepInclude = "step_details.tool_calls[*].file_search.results[*].content"`

  - `"step_details.tool_calls[*].file_search.results[*].content"`

### Tool Call

- `ToolCall = CodeInterpreterToolCall | FileSearchToolCall | FunctionToolCall`

  Details of the Code Interpreter tool call the run step was involved in.

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

### Tool Call Delta

- `ToolCallDelta = CodeInterpreterToolCallDelta | FileSearchToolCallDelta | FunctionToolCallDelta`

  Details of the Code Interpreter tool call the run step was involved in.

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

### Tool Call Delta Object

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

### Tool Calls Step Details

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
