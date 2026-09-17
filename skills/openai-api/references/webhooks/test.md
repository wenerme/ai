## Test Webhook Endpoint

**post** `/webhook_endpoints/{webhook_endpoint_id}/test`

Sends a sample event to a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Body Parameters

- `event_type: "batch.completed" or "batch.failed" or "batch.expired" or 15 more`

  The event type to send as a sample delivery.

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

### Returns

- `WebhookEndpointTestResult object { event_type, object, status_code, 2 more }`

  - `event_type: string`

    The event type sent in the test.

  - `object: "webhook_endpoint.test"`

    The object type, which is always webhook_endpoint.test.

    - `"webhook_endpoint.test"`

  - `status_code: number`

    The HTTP status code returned by the endpoint.

  - `success: true`

    Whether the test request completed. Always true for returned results; use status_code to determine the endpoint response.

    - `true`

  - `webhook_endpoint_id: string`

    The ID of the webhook endpoint that received the test.

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints/$WEBHOOK_ENDPOINT_ID/test \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "event_type": "batch.completed"
        }'
```

#### Response

```json
{
  "event_type": "event_type",
  "object": "webhook_endpoint.test",
  "status_code": 0,
  "success": true,
  "webhook_endpoint_id": "webhook_endpoint_id"
}
```
