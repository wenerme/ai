## Retrieve

`beta.chatkit.threads.retrieve(strthread_id)  -> ChatKitThread`

**get** `/chatkit/threads/{thread_id}`

Retrieve a ChatKit thread by its identifier.

### Parameters

- `thread_id: str`

### Returns

- `class ChatKitThread: …`

  Represents a ChatKit thread and its current status.

  - `id: str`

    Identifier of the thread.

  - `created_at: int`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: Literal["chatkit.thread"]`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Status`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `class StatusActive: …`

      Indicates that a thread is active.

      - `type: Literal["active"]`

        Status discriminator that is always `active`.

        - `"active"`

    - `class StatusLocked: …`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: Optional[str]`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: Literal["locked"]`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `class StatusClosed: …`

      Indicates that a thread has been closed.

      - `reason: Optional[str]`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: Literal["closed"]`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: Optional[str]`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: str`

    Free-form string that identifies your end user who owns the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
chatkit_thread = client.beta.chatkit.threads.retrieve(
    "cthr_123",
)
print(chatkit_thread.id)
```
