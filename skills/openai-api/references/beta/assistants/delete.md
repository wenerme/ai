## Delete

**delete** `/assistants/{assistant_id}`

Delete an assistant.

### Path Parameters

- `assistant_id: string`

### Returns

- `AssistantDeleted = object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "assistant.deleted"`

    - `"assistant.deleted"`

### Example

```http
curl https://api.openai.com/v1/assistants/$ASSISTANT_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
