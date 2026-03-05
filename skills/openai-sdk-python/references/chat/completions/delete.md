## Delete

`chat.completions.delete(strcompletion_id)  -> ChatCompletionDeleted`

**delete** `/chat/completions/{completion_id}`

Delete a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be deleted.

### Parameters

- `completion_id: str`

### Returns

- `class ChatCompletionDeleted: …`

  - `id: str`

    The ID of the chat completion that was deleted.

  - `deleted: bool`

    Whether the chat completion was deleted.

  - `object: Literal["chat.completion.deleted"]`

    The type of object being deleted.

    - `"chat.completion.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
chat_completion_deleted = client.chat.completions.delete(
    "completion_id",
)
print(chat_completion_deleted.id)
```
