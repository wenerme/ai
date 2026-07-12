# Output Items

## Get eval run output items

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

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "datasource_item": {
        "foo": "bar"
      },
      "datasource_item_id": 0,
      "eval_id": "eval_id",
      "object": "eval.run.output_item",
      "results": [
        {
          "name": "name",
          "passed": true,
          "score": 0,
          "sample": {
            "foo": "bar"
          },
          "type": "type"
        }
      ],
      "run_id": "run_id",
      "sample": {
        "error": {
          "code": "code",
          "message": "message"
        },
        "finish_reason": "finish_reason",
        "input": [
          {
            "content": "content",
            "role": "role"
          }
        ],
        "max_completion_tokens": 0,
        "model": "model",
        "output": [
          {
            "content": "content",
            "role": "role"
          }
        ],
        "seed": 0,
        "temperature": 0,
        "top_p": 0,
        "usage": {
          "cached_tokens": 0,
          "completion_tokens": 0,
          "prompt_tokens": 0,
          "total_tokens": 0
        }
      },
      "status": "status"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

output_items = client.evals.runs.output_items.list(
  "egroup_67abd54d9b0081909a86353f6fb9317a",
  "erun_67abd54d60ec8190832b46859da808f7"
)
print(output_items)
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "eval.run.output_item",
      "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
      "created_at": 1743092076,
      "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
      "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
      "status": "pass",
      "datasource_item_id": 5,
      "datasource_item": {
        "input": "Stock Markets Rally After Positive Economic Data Released",
        "ground_truth": "Markets"
      },
      "results": [
        {
          "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
          "sample": null,
          "passed": true,
          "score": 1.0
        }
      ],
      "sample": {
        "input": [
          {
            "role": "developer",
            "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          },
          {
            "role": "user",
            "content": "Stock Markets Rally After Positive Economic Data Released",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "output": [
          {
            "role": "assistant",
            "content": "Markets",
            "tool_call_id": null,
            "tool_calls": null,
            "function_call": null
          }
        ],
        "finish_reason": "stop",
        "model": "gpt-4o-mini-2024-07-18",
        "usage": {
          "total_tokens": 325,
          "completion_tokens": 2,
          "prompt_tokens": 323,
          "cached_tokens": 0
        },
        "error": null,
        "temperature": 1.0,
        "max_completion_tokens": 2048,
        "top_p": 1.0,
        "seed": 42
      }
    }
  ],
  "first_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "last_id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "has_more": true
}
```

## Get an output item of an eval run

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

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "datasource_item": {
    "foo": "bar"
  },
  "datasource_item_id": 0,
  "eval_id": "eval_id",
  "object": "eval.run.output_item",
  "results": [
    {
      "name": "name",
      "passed": true,
      "score": 0,
      "sample": {
        "foo": "bar"
      },
      "type": "type"
    }
  ],
  "run_id": "run_id",
  "sample": {
    "error": {
      "code": "code",
      "message": "message"
    },
    "finish_reason": "finish_reason",
    "input": [
      {
        "content": "content",
        "role": "role"
      }
    ],
    "max_completion_tokens": 0,
    "model": "model",
    "output": [
      {
        "content": "content",
        "role": "role"
      }
    ],
    "seed": 0,
    "temperature": 0,
    "top_p": 0,
    "usage": {
      "cached_tokens": 0,
      "completion_tokens": 0,
      "prompt_tokens": 0,
      "total_tokens": 0
    }
  },
  "status": "status"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

output_item = client.evals.runs.output_items.retrieve(
  "eval_67abd54d9b0081909a86353f6fb9317a",
  "evalrun_67abd54d60ec8190832b46859da808f7",
  "outputitem_67abd55eb6548190bb580745d5644a33"
)
print(output_item)
```

#### Response

```json
{
  "object": "eval.run.output_item",
  "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "created_at": 1743092076,
  "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "status": "pass",
  "datasource_item_id": 5,
  "datasource_item": {
    "input": "Stock Markets Rally After Positive Economic Data Released",
    "ground_truth": "Markets"
  },
  "results": [
    {
      "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
      "sample": null,
      "passed": true,
      "score": 1.0
    }
  ],
  "sample": {
    "input": [
      {
        "role": "developer",
        "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      },
      {
        "role": "user",
        "content": "Stock Markets Rally After Positive Economic Data Released",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "output": [
      {
        "role": "assistant",
        "content": "Markets",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "finish_reason": "stop",
    "model": "gpt-4o-mini-2024-07-18",
    "usage": {
      "total_tokens": 325,
      "completion_tokens": 2,
      "prompt_tokens": 323,
      "cached_tokens": 0
    },
    "error": null,
    "temperature": 1.0,
    "max_completion_tokens": 2048,
    "top_p": 1.0,
    "seed": 42
  }
}
```

## Domain Types

### Output Item List Response

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

### Output Item Retrieve Response

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
