## Delete

`beta.threads.messages.delete(strmessage_id, MessageDeleteParams**kwargs)  -> MessageDeleted`

**delete** `/threads/{thread_id}/messages/{message_id}`

Deletes a message.

### Parameters

- `thread_id: str`

- `message_id: str`

### Returns

- `class MessageDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.message.deleted"]`

    - `"thread.message.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
message_deleted = client.beta.threads.messages.delete(
    message_id="message_id",
    thread_id="thread_id",
)
print(message_deleted.id)
```
