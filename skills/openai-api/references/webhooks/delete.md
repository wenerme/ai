## Delete Webhook Endpoint

**delete** `/webhook_endpoints/{webhook_endpoint_id}`

Deletes a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

  The ID of the webhook endpoint to delete.

### Returns

- `DeletedWebhookEndpoint object { id, deleted, object }`

  - `id: string`

    The ID of the deleted webhook endpoint.

  - `deleted: boolean`

    Whether the endpoint was deleted.

  - `object: "webhook_endpoint.deleted" (default: "webhook_endpoint.deleted")`

    The object type, which is always webhook_endpoint.deleted.

    - `"webhook_endpoint.deleted"`

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints/$WEBHOOK_ENDPOINT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### 200 — Example

```json
{
  "id": "id",
  "deleted": true,
  "object": "webhook_endpoint.deleted"
}
```
