## Delete

`beta.chatkit.threads.delete(strthread_id)  -> ThreadDeleteResponse`

**delete** `/chatkit/threads/{thread_id}`

Delete a ChatKit thread along with its items and stored attachments.

### Parameters

- `thread_id: str`

### Returns

- `class ThreadDeleteResponse: …`

  Confirmation payload returned after deleting a thread.

  - `id: str`

    Identifier of the deleted thread.

  - `deleted: bool`

    Indicates that the thread has been deleted.

  - `object: Literal["chatkit.thread.deleted"]`

    Type discriminator that is always `chatkit.thread.deleted`.

    - `"chatkit.thread.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.chatkit.threads.delete(
    "cthr_123",
)
print(thread.id)
```
