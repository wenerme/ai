## Delete

**delete** `/threads/{thread_id}`

Delete a thread.

### Path Parameters

- `thread_id: string`

### Returns

- `ThreadDeleted = object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.deleted"`

    - `"thread.deleted"`

### Example

```http
curl https://api.openai.com/v1/threads/$THREAD_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
