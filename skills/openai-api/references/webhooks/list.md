## List Webhook Endpoints

**get** `/webhook_endpoints`

Returns webhook endpoints for the authenticated project in newest-first order.

### Query Parameters

- `after: optional string or null`

  ID of the last webhook endpoint from the previous page.

- `limit: optional number`

  Maximum number of webhook endpoints to return. Defaults to 20.

### Returns

- `WebhookEndpointList object { data, first_id, has_more, 2 more }`

  - `data: array of WebhookEndpoint`

    The webhook endpoints in this page.

    - `id: string`

      The unique ID of the webhook endpoint.

    - `created_at: number`

      The Unix timestamp when the endpoint was created.

    - `event_types: array of string`

      The event types that trigger deliveries to this endpoint.

    - `name: string`

      The human-readable name of the endpoint.

    - `object: "webhook_endpoint"`

      The object type, which is always webhook_endpoint.

      - `"webhook_endpoint"`

    - `signing_secret_hint: string or null`

      A masked hint for the endpoint's signing secret.

    - `url: string`

      The HTTPS URL that receives webhook deliveries.

    - `updated_at: optional number`

      The Unix timestamp of the last endpoint configuration or signing-secret change. Initialized at creation; tests and unchanged updates do not advance it.

  - `first_id: string or null`

    The ID of the first endpoint in this page.

  - `has_more: boolean`

    Whether more webhook endpoints are available.

  - `last_id: string or null`

    The ID of the last endpoint in this page.

  - `object: "list"`

    The object type, which is always list.

    - `"list"`

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "event_types": [
        "string"
      ],
      "name": "name",
      "object": "webhook_endpoint",
      "signing_secret_hint": "signing_secret_hint",
      "url": "url",
      "updated_at": 0
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
