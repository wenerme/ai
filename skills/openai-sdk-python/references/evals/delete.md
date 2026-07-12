## Delete an eval

`evals.delete(streval_id)  -> EvalDeleteResponse`

**delete** `/evals/{eval_id}`

Delete an evaluation.

### Parameters

- `eval_id: str`

### Returns

- `class EvalDeleteResponse: …`

  - `deleted: bool`

  - `eval_id: str`

  - `object: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
eval = client.evals.delete(
    "eval_id",
)
print(eval.eval_id)
```

#### Response

```json
{
  "deleted": true,
  "eval_id": "eval_abc123",
  "object": "eval.deleted"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

deleted = client.evals.delete("eval_abc123")
print(deleted)
```

#### Response

```json
{
  "object": "eval.deleted",
  "deleted": true,
  "eval_id": "eval_abc123"
}
```
