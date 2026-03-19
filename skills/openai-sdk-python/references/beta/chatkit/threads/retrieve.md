## Retrieve ChatKit thread

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

#### Response

```json
{
  "id": "cthr_def456",
  "created_at": 1712345600,
  "object": "chatkit.thread",
  "status": {
    "type": "active"
  },
  "title": "Demo feedback",
  "user": "user_456"
}
```

### Example

```python
from openai import OpenAI

client = OpenAI()
chatkit_thread = client.beta.chatkit.threads.retrieve(
    "cthr_123",
)
print(chatkit_thread.id)
```

#### Response

```json
{
  "id": "cthr_abc123",
  "object": "chatkit.thread",
  "title": "Customer escalation",
  "items": {
    "data": [
      {
        "id": "cthi_user_001",
        "object": "chatkit.thread_item",
        "type": "user_message",
        "content": [
          {
            "type": "input_text",
            "text": "I need help debugging an onboarding issue."
          }
        ],
        "attachments": []
      },
      {
        "id": "cthi_assistant_002",
        "object": "chatkit.thread_item",
        "type": "assistant_message",
        "content": [
          {
            "type": "output_text",
            "text": "Let's start by confirming the workflow version you deployed."
          }
        ]
      }
    ],
    "has_more": false
  }
}
```
