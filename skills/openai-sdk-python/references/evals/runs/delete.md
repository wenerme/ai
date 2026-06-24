## Delete eval run

`evals.runs.delete(strrun_id, RunDeleteParams**kwargs)  -> RunDeleteResponse`

**delete** `/evals/{eval_id}/runs/{run_id}`

Delete an eval run.

### Parameters

- `eval_id: str`

- `run_id: str`

### Returns

- `class RunDeleteResponse: …`

  - `deleted: Optional[bool]`

  - `object: Optional[str]`

  - `run_id: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
run = client.evals.runs.delete(
    run_id="run_id",
    eval_id="eval_id",
)
print(run.run_id)
```

#### Response

```json
{
  "deleted": true,
  "object": "eval.run.deleted",
  "run_id": "evalrun_677469f564d48190807532a852da3afb"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

deleted = client.evals.runs.delete(
  "eval_123abc",
  "evalrun_abc456"
)
print(deleted)
```

#### Response

```json
{
  "object": "eval.run.deleted",
  "deleted": true,
  "run_id": "evalrun_abc456"
}
```
