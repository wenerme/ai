## List

**get** `/evals/{eval_id}/runs/{run_id}/output_items`

Get a list of output items for an evaluation run.

### Path Parameters

- `eval_id: string`

- `run_id: string`

### Query Parameters

- `after: optional string`

  Identifier for the last output item from the previous pagination request.

- `limit: optional number`

  Number of output items to retrieve.

- `order: optional "asc" or "desc"`

  Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

- `status: optional "fail" or "pass"`

  Filter output items by status. Use `failed` to filter by failed output
  items or `pass` to filter by passed output items.

  - `"fail"`

  - `"pass"`

### Returns

- `data: array of object { id, created_at, datasource_item, 7 more }`

  An array of eval run output item objects.

  - `id: string`

    Unique identifier for the evaluation run output item.

  - `created_at: number`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: map[unknown]`

    Details of the input data source item.

  - `datasource_item_id: number`

    The identifier for the data source item.

  - `eval_id: string`

    The identifier of the evaluation group.

  - `object: "eval.run.output_item"`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: array of object { name, passed, score, 2 more }`

    A list of grader results for this output item.

    - `name: string`

      The name of the grader.

    - `passed: boolean`

      Whether the grader considered the output a pass.

    - `score: number`

      The numeric score produced by the grader.

    - `sample: optional map[unknown]`

      Optional sample or intermediate data produced by the grader.

    - `type: optional string`

      The grader type (for example, "string-check-grader").

  - `run_id: string`

    The identifier of the evaluation run associated with this output item.

  - `sample: object { error, finish_reason, input, 7 more }`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: string`

        The error code.

      - `message: string`

        The error message.

    - `finish_reason: string`

      The reason why the sample generation was finished.

    - `input: array of object { content, role }`

      An array of input messages.

      - `content: string`

        The content of the message.

      - `role: string`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: number`

      The maximum number of tokens allowed for completion.

    - `model: string`

      The model used for generating the sample.

    - `output: array of object { content, role }`

      An array of output messages.

      - `content: optional string`

        The content of the message.

      - `role: optional string`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: number`

      The seed used for generating the sample.

    - `temperature: number`

      The sampling temperature used.

    - `top_p: number`

      The top_p value used for sampling.

    - `usage: object { cached_tokens, completion_tokens, prompt_tokens, total_tokens }`

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

- `first_id: string`

  The identifier of the first eval run output item in the data array.

- `has_more: boolean`

  Indicates whether there are more eval run output items available.

- `last_id: string`

  The identifier of the last eval run output item in the data array.

- `object: "list"`

  The type of this object. It is always set to "list".

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/evals/$EVAL_ID/runs/$RUN_ID/output_items \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
