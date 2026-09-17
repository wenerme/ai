## Update Webhook Endpoint

**post** `/webhook_endpoints/{webhook_endpoint_id}`

Updates a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Body Parameters

- `event_types: optional array of "batch.completed" or "batch.failed" or "batch.expired" or 15 more`

  The complete set of event types that should trigger deliveries.

  - `"batch.completed"`

  - `"batch.failed"`

  - `"batch.expired"`

  - `"batch.cancelled"`

  - `"response.completed"`

  - `"response.failed"`

  - `"response.cancelled"`

  - `"response.incomplete"`

  - `"eval.run.succeeded"`

  - `"eval.run.failed"`

  - `"eval.run.canceled"`

  - `"fine_tuning.job.succeeded"`

  - `"fine_tuning.job.failed"`

  - `"fine_tuning.job.cancelled"`

  - `"realtime.call.incoming"`

  - `"video.completed"`

  - `"video.failed"`

  - `"safety.alert.created"`

- `name: optional string`

  A new human-readable name for the webhook endpoint.

- `url: optional string`

  A new HTTPS URL that receives webhook deliveries.

### Returns

- `WebhookEndpoint object { id, created_at, event_types, 5 more }`

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

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints/$WEBHOOK_ENDPOINT_ID \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
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
```
