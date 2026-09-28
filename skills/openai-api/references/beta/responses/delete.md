## Delete a model response

**delete** `/responses/{response_id}?beta=true`

Deletes a model response with the given ID.

### Header Parameters

- `"openai-beta": optional array of "responses_multi_agent=v1"`

  - `"responses_multi_agent=v1"`

### Path Parameters

- `response_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "response.deleted"`

  - `"response.deleted"`

### Example

```http
curl https://api.openai.com/v1/responses/$RESPONSE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "response.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/responses/resp_123 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "resp_123",
  "object": "response.deleted",
  "deleted": true
}
```
