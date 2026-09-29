# Messages

## Get chat messages

**get** `/chat/completions/{completion_id}/messages`

Get the messages in a stored chat completion. Only Chat Completions that
have been created with the `store` parameter set to `true` will be
returned.

### Path Parameters

- `completion_id: string`

### Query Parameters

- `after: optional string`

  Identifier for the last message from the previous pagination request.

- `limit: optional number`

  Number of messages to retrieve.

- `order: optional "asc" or "desc"`

  Sort order for messages by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of ChatCompletionStoreMessage`

  An array of chat completion message objects.

  - `id: string`

  - `content: string or null`

  - `content_parts: array of object { type, file, image_url, 2 more }  or null`

    - `type: "text" or "image_url" or "input_audio" or "file"`

      - `"text"`

      - `"image_url"`

      - `"input_audio"`

      - `"file"`

    - `file: optional object { file_data, file_id, filename }  or null`

      - `file_data: optional string or null`

      - `file_id: optional string or null`

      - `filename: optional string or null`

    - `image_url: optional object { url, detail }  or null`

      - `url: string`

      - `detail: optional string or null`

    - `input_audio: optional object { data, format }  or null`

      - `data: string`

      - `format: string`

    - `text: optional string or null`

  - `role: "user" or "assistant" or "tool" or 3 more`

    - `"user"`

    - `"assistant"`

    - `"tool"`

    - `"system"`

    - `"function"`

    - `"developer"`

  - `name: optional string or null`

- `first_id: string or null`

  The identifier of the first chat message in the data array.

- `has_more: boolean`

  Indicates whether there are more chat messages available.

- `last_id: string or null`

  The identifier of the last chat message in the data array.

- `object: "list"`

  The type of this object. It is always set to "list".

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/chat/completions/$COMPLETION_ID/messages \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "content": "content",
      "content_parts": [
        {
          "type": "text",
          "file": {
            "file_data": "file_data",
            "file_id": "file_id",
            "filename": "filename"
          },
          "image_url": {
            "url": "url",
            "detail": "detail"
          },
          "input_audio": {
            "data": "data",
            "format": "format"
          },
          "text": "text"
        }
      ],
      "role": "user",
      "name": "name"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/chat/completions/chat_abc123/messages \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "chatcmpl-AyPNinnUqUDYo9SAdA52NobMflmj2-0",
      "role": "user",
      "content": "write a haiku about ai",
      "name": null,
      "content_parts": null
    }
  ],
  "first_id": "chatcmpl-AyPNinnUqUDYo9SAdA52NobMflmj2-0",
  "last_id": "chatcmpl-AyPNinnUqUDYo9SAdA52NobMflmj2-0",
  "has_more": false
}
```
