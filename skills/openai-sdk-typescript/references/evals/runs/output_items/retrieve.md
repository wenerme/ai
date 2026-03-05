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
