## Delete

`beta.assistants.delete(strassistant_id)  -> AssistantDeleted`

**delete** `/assistants/{assistant_id}`

Delete an assistant.

### Parameters

- `assistant_id: str`

### Returns

- `class AssistantDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["assistant.deleted"]`

    - `"assistant.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
assistant_deleted = client.beta.assistants.delete(
    "assistant_id",
)
print(assistant_deleted.id)
```
