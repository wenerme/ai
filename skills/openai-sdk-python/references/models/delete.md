## Delete

`models.delete(strmodel)  -> ModelDeleted`

**delete** `/models/{model}`

Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.

### Parameters

- `model: str`

### Returns

- `class ModelDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
model_deleted = client.models.delete(
    "ft:gpt-4o-mini:acemeco:suffix:abc123",
)
print(model_deleted.id)
```
