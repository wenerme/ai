## Delete

**delete** `/threads/{thread_id}/messages/{message_id}`

Deletes a message.

### Path Parameters

- `thread_id: string`

- `message_id: string`

### Returns

- `MessageDeleted = object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.message.deleted"`

    - `"thread.message.deleted"`

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID/messages/$MESSAGE_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
