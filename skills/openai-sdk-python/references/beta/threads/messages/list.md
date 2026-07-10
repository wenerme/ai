## List messages

`beta.threads.messages.list(strthread_id, MessageListParams**kwargs)  -> SyncCursorPage[Message]`

**get** `/threads/{thread_id}/messages`

List messages

### Parameters

- `thread_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

- `run_id: Optional[str]`

  Filter messages by the run ID that generated them.

### Returns

- `class Message: …`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: Optional[str]`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Optional[List[Attachment]]`

    A list of files attached to the message, and the tools they were added to.

    - `file_id: Optional[str]`

      The ID of the file to attach to the message.

    - `tools: Optional[List[AttachmentTool]]`

      The tools to add this file to.

      - `class CodeInterpreterTool: …`

        - `type: Literal["code_interpreter"]`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `class AttachmentToolAssistantToolsFileSearchTypeOnly: …`

        - `type: Literal["file_search"]`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: List[object]`

    The content of the message in array of text and/or images.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: Optional[int]`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: Optional[IncompleteDetails]`

    On an incomplete message, details about why the message is incomplete.

    - `reason: Literal["content_filter", "max_tokens", "run_cancelled", 2 more]`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread.message"]`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: Literal["user", "assistant"]`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: Optional[str]`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: Literal["in_progress", "incomplete", "completed"]`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: str`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.beta.threads.messages.list(
    thread_id="thread_id",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "assistant_id": "assistant_id",
      "attachments": [
        {
          "file_id": "file_id",
          "tools": [
            {
              "type": "code_interpreter"
            }
          ]
        }
      ],
      "completed_at": 0,
      "content": [
        {}
      ],
      "created_at": 0,
      "incomplete_at": 0,
      "incomplete_details": {
        "reason": "content_filter"
      },
      "metadata": {
        "foo": "string"
      },
      "object": "thread.message",
      "role": "user",
      "run_id": "run_id",
      "status": "in_progress",
      "thread_id": "thread_id"
    }
  ],
  "first_id": "msg_abc123",
  "has_more": false,
  "last_id": "msg_abc123",
  "object": "list"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

thread_messages = client.beta.threads.messages.list("thread_abc123")
print(thread_messages.data)
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "msg_abc123",
      "object": "thread.message",
      "created_at": 1699016383,
      "assistant_id": null,
      "thread_id": "thread_abc123",
      "run_id": null,
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "How does AI work? Explain it in simple terms.",
            "annotations": []
          }
        }
      ],
      "attachments": [],
      "metadata": {}
    },
    {
      "id": "msg_abc456",
      "object": "thread.message",
      "created_at": 1699016383,
      "assistant_id": null,
      "thread_id": "thread_abc123",
      "run_id": null,
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": {
            "value": "Hello, what is AI?",
            "annotations": []
          }
        }
      ],
      "attachments": [],
      "metadata": {}
    }
  ],
  "first_id": "msg_abc123",
  "last_id": "msg_abc456",
  "has_more": false
}
```
