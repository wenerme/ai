## Modify message

`client.beta.threads.messages.update(stringmessageID, MessageUpdateParamsparams, RequestOptionsoptions?): Message`

**post** `/threads/{thread_id}/messages/{message_id}`

Modify message

### Parameters

- `messageID: string`

- `params: MessageUpdateParams`

  - `thread_id: string`

    Path param: The ID of the thread to which this message belongs.

  - `metadata?: Metadata | null`

    Body param: Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

### Returns

- `Message`

  Represents a message within a [thread](https://platform.openai.com/docs/api-reference/threads).

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `assistant_id: string | null`

    If applicable, the ID of the [assistant](https://platform.openai.com/docs/api-reference/assistants) that authored this message.

  - `attachments: Array<Attachment> | null`

    A list of files attached to the message, and the tools they were added to.

    - `file_id?: string`

      The ID of the file to attach to the message.

    - `tools?: Array<CodeInterpreterTool | AssistantToolsFileSearchTypeOnly>`

      The tools to add this file to.

      - `CodeInterpreterTool`

        - `type: "code_interpreter"`

          The type of tool being defined: `code_interpreter`

          - `"code_interpreter"`

      - `AssistantToolsFileSearchTypeOnly`

        - `type: "file_search"`

          The type of tool being defined: `file_search`

          - `"file_search"`

  - `completed_at: number | null`

    The Unix timestamp (in seconds) for when the message was completed.

  - `content: Array<unknown>`

    The content of the message in array of text and/or images.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the message was created.

  - `incomplete_at: number | null`

    The Unix timestamp (in seconds) for when the message was marked as incomplete.

  - `incomplete_details: IncompleteDetails | null`

    On an incomplete message, details about why the message is incomplete.

    - `reason: "content_filter" | "max_tokens" | "run_cancelled" | 2 more`

      The reason the message is incomplete.

      - `"content_filter"`

      - `"max_tokens"`

      - `"run_cancelled"`

      - `"run_expired"`

      - `"run_failed"`

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: "thread.message"`

    The object type, which is always `thread.message`.

    - `"thread.message"`

  - `role: "user" | "assistant"`

    The entity that produced the message. One of `user` or `assistant`.

    - `"user"`

    - `"assistant"`

  - `run_id: string | null`

    The ID of the [run](https://platform.openai.com/docs/api-reference/runs) associated with the creation of this message. Value is `null` when messages are created manually using the create message or create thread endpoints.

  - `status: "in_progress" | "incomplete" | "completed"`

    The status of the message, which can be either `in_progress`, `incomplete`, or `completed`.

    - `"in_progress"`

    - `"incomplete"`

    - `"completed"`

  - `thread_id: string`

    The [thread](https://platform.openai.com/docs/api-reference/threads) ID that this message belongs to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const message = await client.beta.threads.messages.update('message_id', { thread_id: 'thread_id' });

console.log(message.id);
```

#### Response

```json
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
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const message = await openai.beta.threads.messages.update(
    "thread_abc123",
    "msg_abc123",
    {
      metadata: {
        modified: "true",
        user: "abc123",
      },
    }
  }'
```

#### Response

```json
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1699017614,
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
  "file_ids": [],
  "metadata": {
    "modified": "true",
    "user": "abc123"
  }
}
```
