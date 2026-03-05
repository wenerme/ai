## Delete

`conversations.items.delete(stritem_id, ItemDeleteParams**kwargs)  -> Conversation`

**delete** `/conversations/{conversation_id}/items/{item_id}`

Delete an item from a conversation with the given IDs.

### Parameters

- `conversation_id: str`

- `item_id: str`

### Returns

- `class Conversation: …`

  - `id: str`

    The unique ID of the conversation.

  - `created_at: int`

    The time at which the conversation was created, measured in seconds since the Unix epoch.

  - `metadata: object`

    Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.
    Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.

  - `object: Literal["conversation"]`

    The object type, which is always `conversation`.

    - `"conversation"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
conversation = client.conversations.items.delete(
    item_id="msg_abc",
    conversation_id="conv_123",
)
print(conversation.id)
```
