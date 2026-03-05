# Output Items

## List

`evals.runs.output_items.list(strrun_id, OutputItemListParams**kwargs)  -> SyncCursorPage[OutputItemListResponse]`

**get** `/evals/{eval_id}/runs/{run_id}/output_items`

Get a list of output items for an evaluation run.

### Parameters

- `eval_id: str`

- `run_id: str`

- `after: Optional[str]`

  Identifier for the last output item from the previous pagination request.

- `limit: Optional[int]`

  Number of output items to retrieve.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

- `status: Optional[Literal["fail", "pass"]]`

  Filter output items by status. Use `failed` to filter by failed output
  items or `pass` to filter by passed output items.

  - `"fail"`

  - `"pass"`

### Returns

- `class OutputItemListResponse: …`

  A schema representing an evaluation run output item.

  - `id: str`

    Unique identifier for the evaluation run output item.

  - `created_at: int`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Dict[str, object]`

    Details of the input data source item.

  - `datasource_item_id: int`

    The identifier for the data source item.

  - `eval_id: str`

    The identifier of the evaluation group.

  - `object: Literal["eval.run.output_item"]`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: List[Result]`

    A list of grader results for this output item.

    - `name: str`

      The name of the grader.

    - `passed: bool`

      Whether the grader considered the output a pass.

    - `score: float`

      The numeric score produced by the grader.

    - `sample: Optional[Dict[str, object]]`

      Optional sample or intermediate data produced by the grader.

    - `type: Optional[str]`

      The grader type (for example, "string-check-grader").

  - `run_id: str`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: str`

        The error code.

      - `message: str`

        The error message.

    - `finish_reason: str`

      The reason why the sample generation was finished.

    - `input: List[SampleInput]`

      An array of input messages.

      - `content: str`

        The content of the message.

      - `role: str`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: int`

      The maximum number of tokens allowed for completion.

    - `model: str`

      The model used for generating the sample.

    - `output: List[SampleOutput]`

      An array of output messages.

      - `content: Optional[str]`

        The content of the message.

      - `role: Optional[str]`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: int`

      The seed used for generating the sample.

    - `temperature: float`

      The sampling temperature used.

    - `top_p: float`

      The top_p value used for sampling.

    - `usage: SampleUsage`

      Token usage details for the sample.

      - `cached_tokens: int`

        The number of tokens retrieved from cache.

      - `completion_tokens: int`

        The number of completion tokens generated.

      - `prompt_tokens: int`

        The number of prompt tokens used.

      - `total_tokens: int`

        The total number of tokens used.

  - `status: str`

    The status of the evaluation run.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.evals.runs.output_items.list(
    run_id="run_id",
    eval_id="eval_id",
)
page = page.data[0]
print(page.id)
```

## Retrieve

`evals.runs.output_items.retrieve(stroutput_item_id, OutputItemRetrieveParams**kwargs)  -> OutputItemRetrieveResponse`

**get** `/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}`

Get an evaluation run output item by ID.

### Parameters

- `eval_id: str`

- `run_id: str`

- `output_item_id: str`

### Returns

- `class OutputItemRetrieveResponse: …`

  A schema representing an evaluation run output item.

  - `id: str`

    Unique identifier for the evaluation run output item.

  - `created_at: int`

    Unix timestamp (in seconds) when the evaluation run was created.

  - `datasource_item: Dict[str, object]`

    Details of the input data source item.

  - `datasource_item_id: int`

    The identifier for the data source item.

  - `eval_id: str`

    The identifier of the evaluation group.

  - `object: Literal["eval.run.output_item"]`

    The type of the object. Always "eval.run.output_item".

    - `"eval.run.output_item"`

  - `results: List[Result]`

    A list of grader results for this output item.

    - `name: str`

      The name of the grader.

    - `passed: bool`

      Whether the grader considered the output a pass.

    - `score: float`

      The numeric score produced by the grader.

    - `sample: Optional[Dict[str, object]]`

      Optional sample or intermediate data produced by the grader.

    - `type: Optional[str]`

      The grader type (for example, "string-check-grader").

  - `run_id: str`

    The identifier of the evaluation run associated with this output item.

  - `sample: Sample`

    A sample containing the input and output of the evaluation run.

    - `error: EvalAPIError`

      An object representing an error response from the Eval API.

      - `code: str`

        The error code.

      - `message: str`

        The error message.

    - `finish_reason: str`

      The reason why the sample generation was finished.

    - `input: List[SampleInput]`

      An array of input messages.

      - `content: str`

        The content of the message.

      - `role: str`

        The role of the message sender (e.g., system, user, developer).

    - `max_completion_tokens: int`

      The maximum number of tokens allowed for completion.

    - `model: str`

      The model used for generating the sample.

    - `output: List[SampleOutput]`

      An array of output messages.

      - `content: Optional[str]`

        The content of the message.

      - `role: Optional[str]`

        The role of the message (e.g. "system", "assistant", "user").

    - `seed: int`

      The seed used for generating the sample.

    - `temperature: float`

      The sampling temperature used.

    - `top_p: float`

      The top_p value used for sampling.

    - `usage: SampleUsage`

      Token usage details for the sample.

      - `cached_tokens: int`

        The number of tokens retrieved from cache.

      - `completion_tokens: int`

        The number of completion tokens generated.

      - `prompt_tokens: int`

        The number of prompt tokens used.

      - `total_tokens: int`

        The total number of tokens used.

  - `status: str`

    The status of the evaluation run.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
output_item = client.evals.runs.output_items.retrieve(
    output_item_id="output_item_id",
    eval_id="eval_id",
    run_id="run_id",
)
print(output_item.id)
```
