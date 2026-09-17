## List Webhook Event Types

**get** `/webhook_event_types`

Returns webhook event types visible to the authenticated project.

### Returns

- `WebhookEventTypeList object { data, object }`

  - `data: array of string`

    The webhook event types available to the authenticated project.

  - `object: "list"`

    The object type, which is always list.

    - `"list"`

### Example

```http
curl https://api.openai.com/v1/webhook_event_types \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    "string"
  ],
  "object": "list"
}
```
