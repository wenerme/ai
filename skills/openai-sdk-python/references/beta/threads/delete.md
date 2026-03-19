## Delete thread

`beta.threads.delete(strthread_id)  -> ThreadDeleted`

**delete** `/threads/{thread_id}`

Delete a thread.

### Parameters

- `thread_id: str`

### Returns

- `class ThreadDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["thread.deleted"]`

    - `"thread.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread_deleted = client.beta.threads.delete(
    "thread_id",
)
print(thread_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "thread.deleted"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

response = client.beta.threads.delete("thread_abc123")
print(response)
```

#### Response

```json
{
  "id": "thread_abc123",
  "object": "thread.deleted",
  "deleted": true
}
```
