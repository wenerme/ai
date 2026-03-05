## Delete

`conversations.delete(strconversation_id)  -> ConversationDeletedResource`

**delete** `/conversations/{conversation_id}`

Delete a conversation. Items in the conversation will not be deleted.

### Parameters

- `conversation_id: str`

### Returns

- `class ConversationDeletedResource: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["conversation.deleted"]`

    - `"conversation.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
conversation_deleted_resource = client.conversations.delete(
    "conv_123",
)
print(conversation_deleted_resource.id)
```
