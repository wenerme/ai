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
