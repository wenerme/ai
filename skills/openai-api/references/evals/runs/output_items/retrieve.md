## Get an output item of an eval run

**get** `/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}`

Get an evaluation run output item by ID.

### Path Parameters

- `eval_id: string`

- `run_id: string`

- `output_item_id: string`

### Returns

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

### Example

```http
curl https://api.openai.com/v1/evals/$EVAL_ID/runs/$RUN_ID/output_items/$OUTPUT_ITEM_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

```http
curl https://api.openai.com/v1/evals/eval_67abd54d9b0081909a86353f6fb9317a/runs/evalrun_67abd54d60ec8190832b46859da808f7/output_items/outputitem_67abd55eb6548190bb580745d5644a33 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
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
