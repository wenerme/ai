# Webhooks

## Create Webhook Endpoint

**post** `/webhook_endpoints`

Creates a webhook endpoint for the authenticated project.

### Body Parameters

- `event_types: array of "batch.completed" or "batch.failed" or "batch.expired" or 24 more`

  The event types that trigger deliveries to this endpoint.

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

  - `"agent.environment.ready"`

  - `"agent.environment.failed"`

  - `"agent.environment.suspended"`

  - `"agent.environment.expired"`

  - `"agent.session.created"`

  - `"agent.session.action_required"`

  - `"agent.session.in_progress"`

  - `"agent.session.idle"`

  - `"agent.session.failed"`

  - `"safety.alert.created"`

- `name: string`

  A human-readable name for the webhook endpoint.

- `url: string`

  The HTTPS URL that receives webhook deliveries.

### Returns

- `WebhookEndpointWithSecret object { id, created_at, event_types, 6 more }`

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

  - `signing_secret: string`

    The endpoint's signing secret. This is returned only when the endpoint is created or the secret is rotated.

  - `signing_secret_hint: string or null`

    A masked hint for the endpoint's signing secret.

  - `url: string`

    The HTTPS URL that receives webhook deliveries.

  - `updated_at: optional number`

    The Unix timestamp of the last endpoint configuration or signing-secret change. Initialized at creation; tests and unchanged updates do not advance it.

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "event_types": [
            "batch.completed"
          ],
          "name": "x",
          "url": "https://"
        }'
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
  "signing_secret": "signing_secret",
  "signing_secret_hint": "signing_secret_hint",
  "url": "url",
  "updated_at": 0
}
```

## Delete Webhook Endpoint

**delete** `/webhook_endpoints/{webhook_endpoint_id}`

Deletes a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Returns

- `DeletedWebhookEndpoint object { id, deleted, object }`

  - `id: string`

    The ID of the deleted webhook endpoint.

  - `deleted: boolean`

    Whether the endpoint was deleted.

  - `object: "webhook_endpoint.deleted"`

    The object type, which is always webhook_endpoint.deleted.

    - `"webhook_endpoint.deleted"`

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints/$WEBHOOK_ENDPOINT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "webhook_endpoint.deleted"
}
```

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

## Retrieve Webhook Endpoint

**get** `/webhook_endpoints/{webhook_endpoint_id}`

Retrieves a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

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

## Rotate Webhook Endpoint Signing Secret

**post** `/webhook_endpoints/{webhook_endpoint_id}/rotate_secret`

Rotates the signing secret for a webhook endpoint in the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Body Parameters

- `keep_old_secret_active_for_24_hours: optional boolean`

  Whether to keep the previous signing secret valid for 24 hours after rotation. Defaults to false, which invalidates the previous secret immediately.

### Returns

- `WebhookEndpointWithSecret object { id, created_at, event_types, 6 more }`

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

  - `signing_secret: string`

    The endpoint's signing secret. This is returned only when the endpoint is created or the secret is rotated.

  - `signing_secret_hint: string or null`

    A masked hint for the endpoint's signing secret.

  - `url: string`

    The HTTPS URL that receives webhook deliveries.

  - `updated_at: optional number`

    The Unix timestamp of the last endpoint configuration or signing-secret change. Initialized at creation; tests and unchanged updates do not advance it.

### Example

```http
curl https://api.openai.com/v1/webhook_endpoints/$WEBHOOK_ENDPOINT_ID/rotate_secret \
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
  "signing_secret": "signing_secret",
  "signing_secret_hint": "signing_secret_hint",
  "url": "url",
  "updated_at": 0
}
```

## Test Webhook Endpoint

**post** `/webhook_endpoints/{webhook_endpoint_id}/test`

Sends a sample event to a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Body Parameters

- `event_type: "batch.completed" or "batch.failed" or "batch.expired" or 24 more`

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

  - `"agent.environment.ready"`

  - `"agent.environment.failed"`

  - `"agent.environment.suspended"`

  - `"agent.environment.expired"`

  - `"agent.session.created"`

  - `"agent.session.action_required"`

  - `"agent.session.in_progress"`

  - `"agent.session.idle"`

  - `"agent.session.failed"`

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

## 

**** ``

Validates that the given payload was sent by OpenAI and parses the payload.

## Update Webhook Endpoint

**post** `/webhook_endpoints/{webhook_endpoint_id}`

Updates a webhook endpoint for the authenticated project.

### Path Parameters

- `webhook_endpoint_id: string`

### Body Parameters

- `event_types: optional array of "batch.completed" or "batch.failed" or "batch.expired" or 24 more`

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

  - `"agent.environment.ready"`

  - `"agent.environment.failed"`

  - `"agent.environment.suspended"`

  - `"agent.environment.expired"`

  - `"agent.session.created"`

  - `"agent.session.action_required"`

  - `"agent.session.in_progress"`

  - `"agent.session.idle"`

  - `"agent.session.failed"`

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

## Domain Types

### Agent Environment Expired Webhook Event

- `AgentEnvironmentExpiredWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent environment expires and can no longer resume from a snapshot.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id }`

    Identifies the environment whose lifecycle changed.

    - `id: string`

      The ID of the environment.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.environment.expired"`

    The event type. Always `agent.environment.expired`.

    - `"agent.environment.expired"`

### Agent Environment Failed Webhook Event

- `AgentEnvironmentFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id }`

    Identifies the environment whose lifecycle changed.

    - `id: string`

      The ID of the environment.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.environment.failed"`

    The event type. Always `agent.environment.failed`.

    - `"agent.environment.failed"`

### Agent Environment Ready Webhook Event

- `AgentEnvironmentReadyWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id }`

    Identifies the environment whose lifecycle changed.

    - `id: string`

      The ID of the environment.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.environment.ready"`

    The event type. Always `agent.environment.ready`.

    - `"agent.environment.ready"`

### Agent Environment Suspended Webhook Event

- `AgentEnvironmentSuspendedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent environment is suspended and can resume from a snapshot.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id }`

    Identifies the environment whose lifecycle changed.

    - `id: string`

      The ID of the environment.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.environment.suspended"`

    The event type. Always `agent.environment.suspended`.

    - `"agent.environment.suspended"`

### Agent Session Action Required Webhook Event

- `AgentSessionActionRequiredWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent session requires an action. Retrieve the session for action details.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id, required_action }`

    - `id: string`

      The ID of the session.

    - `required_action: object { type }`

      The action type. Retrieve the session for action details.

      - `type: "computer_use_approval_request" or "function_call" or "environment_connection"`

        - `"computer_use_approval_request"`

        - `"function_call"`

        - `"environment_connection"`

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.session.action_required"`

    The event type. Always `agent.session.action_required`.

    - `"agent.session.action_required"`

### Agent Session Created Webhook Event

- `AgentSessionCreatedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent session is created.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id, environment_type, connect, environment_id }`

    - `id: string`

      The ID of the session.

    - `environment_type: string`

      The environment type: `none`, `openai_hosted`, or `self_hosted`.

    - `connect: optional object { remote_url }`

      - `remote_url: string`

        The URL used to connect the self-hosted environment.

    - `environment_id: optional string`

      The ID of the environment, when one exists.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.session.created"`

    The event type. Always `agent.session.created`.

    - `"agent.session.created"`

### Agent Session Failed Webhook Event

- `AgentSessionFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent session fails.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id, environment_type, environment_id }`

    - `id: string`

      The ID of the session.

    - `environment_type: string`

      The environment type: `none`, `openai_hosted`, or `self_hosted`.

    - `environment_id: optional string`

      The ID of the environment, when one exists.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.session.failed"`

    The event type. Always `agent.session.failed`.

    - `"agent.session.failed"`

### Agent Session Idle Webhook Event

- `AgentSessionIdleWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent session becomes idle.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id, environment_type, environment_id }`

    - `id: string`

      The ID of the session.

    - `environment_type: string`

      The environment type: `none`, `openai_hosted`, or `self_hosted`.

    - `environment_id: optional string`

      The ID of the environment, when one exists.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.session.idle"`

    The event type. Always `agent.session.idle`.

    - `"agent.session.idle"`

### Agent Session In Progress Webhook Event

- `AgentSessionInProgressWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an agent session enters the in-progress state.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp, in seconds, when the event was created.

  - `data: object { id, environment_type, environment_id }`

    - `id: string`

      The ID of the session.

    - `environment_type: string`

      The environment type: `none`, `openai_hosted`, or `self_hosted`.

    - `environment_id: optional string`

      The ID of the environment, when one exists.

  - `object: "event"`

    The object type. Always `event`.

    - `"event"`

  - `type: "agent.session.in_progress"`

    The event type. Always `agent.session.in_progress`.

    - `"agent.session.in_progress"`

### Batch Cancelled Webhook Event

- `BatchCancelledWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a batch API request has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request was cancelled.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.cancelled"`

    The type of the event. Always `batch.cancelled`.

    - `"batch.cancelled"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Completed Webhook Event

- `BatchCompletedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a batch API request has been completed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request was completed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.completed"`

    The type of the event. Always `batch.completed`.

    - `"batch.completed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Expired Webhook Event

- `BatchExpiredWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a batch API request has expired.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request expired.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.expired"`

    The type of the event. Always `batch.expired`.

    - `"batch.expired"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Failed Webhook Event

- `BatchFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a batch API request has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request failed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.failed"`

    The type of the event. Always `batch.failed`.

    - `"batch.failed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Deleted Webhook Endpoint

- `DeletedWebhookEndpoint object { id, deleted, object }`

  - `id: string`

    The ID of the deleted webhook endpoint.

  - `deleted: boolean`

    Whether the endpoint was deleted.

  - `object: "webhook_endpoint.deleted"`

    The object type, which is always webhook_endpoint.deleted.

    - `"webhook_endpoint.deleted"`

### Eval Run Canceled Webhook Event

- `EvalRunCanceledWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an eval run has been canceled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run was canceled.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.canceled"`

    The type of the event. Always `eval.run.canceled`.

    - `"eval.run.canceled"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Eval Run Failed Webhook Event

- `EvalRunFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an eval run has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run failed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.failed"`

    The type of the event. Always `eval.run.failed`.

    - `"eval.run.failed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Eval Run Succeeded Webhook Event

- `EvalRunSucceededWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an eval run has succeeded.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run succeeded.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.succeeded"`

    The type of the event. Always `eval.run.succeeded`.

    - `"eval.run.succeeded"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Cancelled Webhook Event

- `FineTuningJobCancelledWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a fine-tuning job has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job was cancelled.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.cancelled"`

    The type of the event. Always `fine_tuning.job.cancelled`.

    - `"fine_tuning.job.cancelled"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Failed Webhook Event

- `FineTuningJobFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a fine-tuning job has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job failed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.failed"`

    The type of the event. Always `fine_tuning.job.failed`.

    - `"fine_tuning.job.failed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Succeeded Webhook Event

- `FineTuningJobSucceededWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a fine-tuning job has succeeded.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job succeeded.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.succeeded"`

    The type of the event. Always `fine_tuning.job.succeeded`.

    - `"fine_tuning.job.succeeded"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Live Call Incoming Webhook Event

- `LiveCallIncomingWebhookEvent object { id, created_at, data, 2 more }`

  Deprecated: use `live.transport.incoming`. Retained for existing subscriptions
  during migration; new subscriptions to this event are not allowed.
  Sent when an incoming API SIP session is available for Live acceptance. The
  same pending session can also emit `realtime.call.incoming`; the first
  successful Realtime or Live accept endpoint selects the runtime surface.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the event was created.

  - `data: object { session_id, sip_headers, sip_media_security }`

    Event data payload.

    - `session_id: string`

      The `live_...` ID of the pending SIP session. Pass this value unchanged
      to Live call controls and sideband connections. The corresponding
      `realtime.call.incoming` event uses a separate `rtc_...` call ID.

    - `sip_headers: array of object { name, value }`

      Headers from the SIP INVITE, excluding SIP authorization headers.
      Retained names, values, repeated entries, and order are preserved.
      Treat these values as untrusted call metadata.

      - `name: string`

        Name of the SIP Header.

      - `value: string`

        Value of the SIP Header.

    - `sip_media_security: optional "rtp" or "srtp" or string`

      Media protection selected on the SIP leg during SDP negotiation. `srtp`
      indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
      This does not describe SIP signaling security or confirm that media has
      flowed. Clients should handle unrecognized values as unknown.

      - `"rtp" or "srtp"`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp"`

        - `"srtp"`

      - `string`

  - `type: "live.call.incoming"`

    The type of the event. Always `live.call.incoming`.

    - `"live.call.incoming"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Live Transport Incoming Webhook Event

- `LiveTransportIncomingWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an incoming API SIP session is available for Live acceptance. The
  same pending session can also emit `realtime.call.incoming`; the first
  successful Realtime or Live accept endpoint selects the runtime surface.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the event was created.

  - `data: object { session_id, sip_headers, type, sip_media_security }`

    Event data payload.

    - `session_id: string`

      The `live_...` ID of the pending SIP session. Forward this value
      unchanged when accepting or rejecting the call through the Live API.

    - `sip_headers: array of object { name, value }`

      Headers from the SIP INVITE, excluding SIP authorization headers.
      Retained names, values, repeated entries, and order are preserved.
      Treat these values as untrusted call metadata.

      - `name: string`

        Name of the SIP Header.

      - `value: string`

        Value of the SIP Header.

    - `type: "sip"`

      The incoming transport type. Always `sip`.

      - `"sip"`

    - `sip_media_security: optional "rtp" or "srtp" or string`

      Media protection selected on the SIP leg during SDP negotiation. `srtp`
      indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
      This does not describe SIP signaling security or confirm that media has
      flowed. Clients should handle unrecognized values as unknown.

      - `"rtp" or "srtp"`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp"`

        - `"srtp"`

      - `string`

  - `type: "live.transport.incoming"`

    The type of the event. Always `live.transport.incoming`.

    - `"live.transport.incoming"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Realtime Call Incoming Webhook Event

- `RealtimeCallIncomingWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an incoming API SIP session is available for Realtime acceptance.
  The same pending session can also emit `live.transport.incoming`; the first
  successful Realtime or Live accept endpoint selects the runtime surface.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was completed.

  - `data: object { call_id, sip_headers, sip_media_security }`

    Event data payload.

    - `call_id: string`

      The ID of the pending SIP call. Pass this value unchanged when
      accepting or rejecting the call through the Realtime API. For the
      Live API, use the `session_id` from `live.transport.incoming` instead.

    - `sip_headers: array of object { name, value }`

      Headers from the SIP INVITE, excluding SIP authorization headers.
      Retained names, values, repeated entries, and order are preserved.
      Treat these values as untrusted call metadata.

      - `name: string`

        Name of the SIP Header.

      - `value: string`

        Value of the SIP Header.

    - `sip_media_security: optional "rtp" or "srtp" or string`

      Media protection selected on the SIP leg during SDP negotiation. `srtp`
      indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
      This does not describe SIP signaling security or confirm that media has
      flowed. Clients should handle unrecognized values as unknown.

      - `"rtp" or "srtp"`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp"`

        - `"srtp"`

      - `string`

  - `type: "realtime.call.incoming"`

    The type of the event. Always `realtime.call.incoming`.

    - `"realtime.call.incoming"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Cancelled Webhook Event

- `ResponseCancelledWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a background response has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was cancelled.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.cancelled"`

    The type of the event. Always `response.cancelled`.

    - `"response.cancelled"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Completed Webhook Event

- `ResponseCompletedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a background response has been completed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was completed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.completed"`

    The type of the event. Always `response.completed`.

    - `"response.completed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Failed Webhook Event

- `ResponseFailedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a background response has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response failed.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.failed"`

    The type of the event. Always `response.failed`.

    - `"response.failed"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Incomplete Webhook Event

- `ResponseIncompleteWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a background response has been interrupted.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was interrupted.

  - `data: object { id }`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.incomplete"`

    The type of the event. Always `response.incomplete`.

    - `"response.incomplete"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Safety Alert Created Webhook Event

- `SafetyAlertCreatedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an approved safety alert is available for an API project.

  - `id: string`

    The unique ID of the webhook event.

  - `created_at: number`

    The Unix timestamp in seconds when the event was created.

  - `data: object { id }`

    - `id: string`

      The safety alert ID to pass to `GET /v1/safety/alerts/{id}`.

  - `object: "event"`

    Always `event`.

    - `"event"`

  - `type: "safety.alert.created"`

    Always `safety.alert.created`.

    - `"safety.alert.created"`

### Safety Deactivation Issued Webhook Event

- `SafetyDeactivationIssuedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a deactivation is issued for a safety identifier in your organization.

  - `id: string`

    The unique ID of the webhook event.

  - `created_at: number`

    The Unix timestamp in seconds when the event was created.

  - `data: object { id }`

    - `id: string`

      The safety case ID to pass to `GET /v1/safety/cases/{id}`.

  - `object: "event"`

    Always `event`.

    - `"event"`

  - `type: "safety.deactivation_issued"`

    Always `safety.deactivation_issued`.

    - `"safety.deactivation_issued"`

### Safety Org Alert Created Webhook Event

- `SafetyOrgAlertCreatedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when an approved safety alert is available for an enterprise workspace.

  - `id: string`

    The unique ID of the webhook event.

  - `created_at: number`

    The Unix timestamp in seconds when the event was created.

  - `data: object { id }`

    - `id: string`

      The safety alert ID to pass to `GET /v1/safety/alerts/{id}`.

  - `object: "event"`

    Always `event`.

    - `"event"`

  - `type: "safety.org_alert.created"`

    Always `safety.org_alert.created`.

    - `"safety.org_alert.created"`

### Safety Warning Issued Webhook Event

- `SafetyWarningIssuedWebhookEvent object { id, created_at, data, 2 more }`

  Sent when a warning is issued for a safety identifier in your organization.

  - `id: string`

    The unique ID of the webhook event.

  - `created_at: number`

    The Unix timestamp in seconds when the event was created.

  - `data: object { id }`

    - `id: string`

      The safety case ID to pass to `GET /v1/safety/cases/{id}`.

  - `object: "event"`

    Always `event`.

    - `"event"`

  - `type: "safety.warning_issued"`

    Always `safety.warning_issued`.

    - `"safety.warning_issued"`

### Unwrap Webhook Event

- `UnwrapWebhookEvent = AgentEnvironmentExpiredWebhookEvent or AgentEnvironmentFailedWebhookEvent or AgentEnvironmentReadyWebhookEvent or 27 more`

  Sent when an agent environment expires and can no longer resume from a snapshot.

  - `AgentEnvironmentExpiredWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent environment expires and can no longer resume from a snapshot.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id }`

      Identifies the environment whose lifecycle changed.

      - `id: string`

        The ID of the environment.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.environment.expired"`

      The event type. Always `agent.environment.expired`.

      - `"agent.environment.expired"`

  - `AgentEnvironmentFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id }`

      Identifies the environment whose lifecycle changed.

      - `id: string`

        The ID of the environment.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.environment.failed"`

      The event type. Always `agent.environment.failed`.

      - `"agent.environment.failed"`

  - `AgentEnvironmentReadyWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id }`

      Identifies the environment whose lifecycle changed.

      - `id: string`

        The ID of the environment.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.environment.ready"`

      The event type. Always `agent.environment.ready`.

      - `"agent.environment.ready"`

  - `AgentEnvironmentSuspendedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent environment is suspended and can resume from a snapshot.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id }`

      Identifies the environment whose lifecycle changed.

      - `id: string`

        The ID of the environment.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.environment.suspended"`

      The event type. Always `agent.environment.suspended`.

      - `"agent.environment.suspended"`

  - `AgentSessionActionRequiredWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent session requires an action. Retrieve the session for action details.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id, required_action }`

      - `id: string`

        The ID of the session.

      - `required_action: object { type }`

        The action type. Retrieve the session for action details.

        - `type: "computer_use_approval_request" or "function_call" or "environment_connection"`

          - `"computer_use_approval_request"`

          - `"function_call"`

          - `"environment_connection"`

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.session.action_required"`

      The event type. Always `agent.session.action_required`.

      - `"agent.session.action_required"`

  - `AgentSessionCreatedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent session is created.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id, environment_type, connect, environment_id }`

      - `id: string`

        The ID of the session.

      - `environment_type: string`

        The environment type: `none`, `openai_hosted`, or `self_hosted`.

      - `connect: optional object { remote_url }`

        - `remote_url: string`

          The URL used to connect the self-hosted environment.

      - `environment_id: optional string`

        The ID of the environment, when one exists.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.session.created"`

      The event type. Always `agent.session.created`.

      - `"agent.session.created"`

  - `AgentSessionFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent session fails.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id, environment_type, environment_id }`

      - `id: string`

        The ID of the session.

      - `environment_type: string`

        The environment type: `none`, `openai_hosted`, or `self_hosted`.

      - `environment_id: optional string`

        The ID of the environment, when one exists.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.session.failed"`

      The event type. Always `agent.session.failed`.

      - `"agent.session.failed"`

  - `AgentSessionIdleWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent session becomes idle.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id, environment_type, environment_id }`

      - `id: string`

        The ID of the session.

      - `environment_type: string`

        The environment type: `none`, `openai_hosted`, or `self_hosted`.

      - `environment_id: optional string`

        The ID of the environment, when one exists.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.session.idle"`

      The event type. Always `agent.session.idle`.

      - `"agent.session.idle"`

  - `AgentSessionInProgressWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an agent session enters the in-progress state.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp, in seconds, when the event was created.

    - `data: object { id, environment_type, environment_id }`

      - `id: string`

        The ID of the session.

      - `environment_type: string`

        The environment type: `none`, `openai_hosted`, or `self_hosted`.

      - `environment_id: optional string`

        The ID of the environment, when one exists.

    - `object: "event"`

      The object type. Always `event`.

      - `"event"`

    - `type: "agent.session.in_progress"`

      The event type. Always `agent.session.in_progress`.

      - `"agent.session.in_progress"`

  - `BatchCancelledWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a batch API request has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request was cancelled.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.cancelled"`

      The type of the event. Always `batch.cancelled`.

      - `"batch.cancelled"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchCompletedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a batch API request has been completed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request was completed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.completed"`

      The type of the event. Always `batch.completed`.

      - `"batch.completed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchExpiredWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a batch API request has expired.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request expired.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.expired"`

      The type of the event. Always `batch.expired`.

      - `"batch.expired"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a batch API request has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request failed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.failed"`

      The type of the event. Always `batch.failed`.

      - `"batch.failed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunCanceledWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an eval run has been canceled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run was canceled.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.canceled"`

      The type of the event. Always `eval.run.canceled`.

      - `"eval.run.canceled"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an eval run has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run failed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.failed"`

      The type of the event. Always `eval.run.failed`.

      - `"eval.run.failed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunSucceededWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an eval run has succeeded.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run succeeded.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.succeeded"`

      The type of the event. Always `eval.run.succeeded`.

      - `"eval.run.succeeded"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobCancelledWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a fine-tuning job has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job was cancelled.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.cancelled"`

      The type of the event. Always `fine_tuning.job.cancelled`.

      - `"fine_tuning.job.cancelled"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a fine-tuning job has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job failed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.failed"`

      The type of the event. Always `fine_tuning.job.failed`.

      - `"fine_tuning.job.failed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobSucceededWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a fine-tuning job has succeeded.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job succeeded.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.succeeded"`

      The type of the event. Always `fine_tuning.job.succeeded`.

      - `"fine_tuning.job.succeeded"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `LiveCallIncomingWebhookEvent object { id, created_at, data, 2 more }`

    Deprecated: use `live.transport.incoming`. Retained for existing subscriptions
    during migration; new subscriptions to this event are not allowed.
    Sent when an incoming API SIP session is available for Live acceptance. The
    same pending session can also emit `realtime.call.incoming`; the first
    successful Realtime or Live accept endpoint selects the runtime surface.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the event was created.

    - `data: object { session_id, sip_headers, sip_media_security }`

      Event data payload.

      - `session_id: string`

        The `live_...` ID of the pending SIP session. Pass this value unchanged
        to Live call controls and sideband connections. The corresponding
        `realtime.call.incoming` event uses a separate `rtc_...` call ID.

      - `sip_headers: array of object { name, value }`

        Headers from the SIP INVITE, excluding SIP authorization headers.
        Retained names, values, repeated entries, and order are preserved.
        Treat these values as untrusted call metadata.

        - `name: string`

          Name of the SIP Header.

        - `value: string`

          Value of the SIP Header.

      - `sip_media_security: optional "rtp" or "srtp" or string`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp" or "srtp"`

          Media protection selected on the SIP leg during SDP negotiation. `srtp`
          indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
          This does not describe SIP signaling security or confirm that media has
          flowed. Clients should handle unrecognized values as unknown.

          - `"rtp"`

          - `"srtp"`

        - `string`

    - `type: "live.call.incoming"`

      The type of the event. Always `live.call.incoming`.

      - `"live.call.incoming"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `LiveTransportIncomingWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an incoming API SIP session is available for Live acceptance. The
    same pending session can also emit `realtime.call.incoming`; the first
    successful Realtime or Live accept endpoint selects the runtime surface.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the event was created.

    - `data: object { session_id, sip_headers, type, sip_media_security }`

      Event data payload.

      - `session_id: string`

        The `live_...` ID of the pending SIP session. Forward this value
        unchanged when accepting or rejecting the call through the Live API.

      - `sip_headers: array of object { name, value }`

        Headers from the SIP INVITE, excluding SIP authorization headers.
        Retained names, values, repeated entries, and order are preserved.
        Treat these values as untrusted call metadata.

        - `name: string`

          Name of the SIP Header.

        - `value: string`

          Value of the SIP Header.

      - `type: "sip"`

        The incoming transport type. Always `sip`.

        - `"sip"`

      - `sip_media_security: optional "rtp" or "srtp" or string`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp" or "srtp"`

          Media protection selected on the SIP leg during SDP negotiation. `srtp`
          indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
          This does not describe SIP signaling security or confirm that media has
          flowed. Clients should handle unrecognized values as unknown.

          - `"rtp"`

          - `"srtp"`

        - `string`

    - `type: "live.transport.incoming"`

      The type of the event. Always `live.transport.incoming`.

      - `"live.transport.incoming"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `RealtimeCallIncomingWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an incoming API SIP session is available for Realtime acceptance.
    The same pending session can also emit `live.transport.incoming`; the first
    successful Realtime or Live accept endpoint selects the runtime surface.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was completed.

    - `data: object { call_id, sip_headers, sip_media_security }`

      Event data payload.

      - `call_id: string`

        The ID of the pending SIP call. Pass this value unchanged when
        accepting or rejecting the call through the Realtime API. For the
        Live API, use the `session_id` from `live.transport.incoming` instead.

      - `sip_headers: array of object { name, value }`

        Headers from the SIP INVITE, excluding SIP authorization headers.
        Retained names, values, repeated entries, and order are preserved.
        Treat these values as untrusted call metadata.

        - `name: string`

          Name of the SIP Header.

        - `value: string`

          Value of the SIP Header.

      - `sip_media_security: optional "rtp" or "srtp" or string`

        Media protection selected on the SIP leg during SDP negotiation. `srtp`
        indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
        This does not describe SIP signaling security or confirm that media has
        flowed. Clients should handle unrecognized values as unknown.

        - `"rtp" or "srtp"`

          Media protection selected on the SIP leg during SDP negotiation. `srtp`
          indicates SRTP; `rtp` indicates unencrypted RTP. Omitted when unknown.
          This does not describe SIP signaling security or confirm that media has
          flowed. Clients should handle unrecognized values as unknown.

          - `"rtp"`

          - `"srtp"`

        - `string`

    - `type: "realtime.call.incoming"`

      The type of the event. Always `realtime.call.incoming`.

      - `"realtime.call.incoming"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseCancelledWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a background response has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was cancelled.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.cancelled"`

      The type of the event. Always `response.cancelled`.

      - `"response.cancelled"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseCompletedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a background response has been completed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was completed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.completed"`

      The type of the event. Always `response.completed`.

      - `"response.completed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseFailedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a background response has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response failed.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.failed"`

      The type of the event. Always `response.failed`.

      - `"response.failed"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseIncompleteWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a background response has been interrupted.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was interrupted.

    - `data: object { id }`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.incomplete"`

      The type of the event. Always `response.incomplete`.

      - `"response.incomplete"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `SafetyAlertCreatedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an approved safety alert is available for an API project.

    - `id: string`

      The unique ID of the webhook event.

    - `created_at: number`

      The Unix timestamp in seconds when the event was created.

    - `data: object { id }`

      - `id: string`

        The safety alert ID to pass to `GET /v1/safety/alerts/{id}`.

    - `object: "event"`

      Always `event`.

      - `"event"`

    - `type: "safety.alert.created"`

      Always `safety.alert.created`.

      - `"safety.alert.created"`

  - `SafetyDeactivationIssuedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a deactivation is issued for a safety identifier in your organization.

    - `id: string`

      The unique ID of the webhook event.

    - `created_at: number`

      The Unix timestamp in seconds when the event was created.

    - `data: object { id }`

      - `id: string`

        The safety case ID to pass to `GET /v1/safety/cases/{id}`.

    - `object: "event"`

      Always `event`.

      - `"event"`

    - `type: "safety.deactivation_issued"`

      Always `safety.deactivation_issued`.

      - `"safety.deactivation_issued"`

  - `SafetyOrgAlertCreatedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when an approved safety alert is available for an enterprise workspace.

    - `id: string`

      The unique ID of the webhook event.

    - `created_at: number`

      The Unix timestamp in seconds when the event was created.

    - `data: object { id }`

      - `id: string`

        The safety alert ID to pass to `GET /v1/safety/alerts/{id}`.

    - `object: "event"`

      Always `event`.

      - `"event"`

    - `type: "safety.org_alert.created"`

      Always `safety.org_alert.created`.

      - `"safety.org_alert.created"`

  - `SafetyWarningIssuedWebhookEvent object { id, created_at, data, 2 more }`

    Sent when a warning is issued for a safety identifier in your organization.

    - `id: string`

      The unique ID of the webhook event.

    - `created_at: number`

      The Unix timestamp in seconds when the event was created.

    - `data: object { id }`

      - `id: string`

        The safety case ID to pass to `GET /v1/safety/cases/{id}`.

    - `object: "event"`

      Always `event`.

      - `"event"`

    - `type: "safety.warning_issued"`

      Always `safety.warning_issued`.

      - `"safety.warning_issued"`

### Webhook Endpoint

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

### Webhook Endpoint List

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

### Webhook Endpoint Test Result

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

### Webhook Endpoint With Secret

- `WebhookEndpointWithSecret object { id, created_at, event_types, 6 more }`

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

  - `signing_secret: string`

    The endpoint's signing secret. This is returned only when the endpoint is created or the secret is rotated.

  - `signing_secret_hint: string or null`

    A masked hint for the endpoint's signing secret.

  - `url: string`

    The HTTPS URL that receives webhook deliveries.

  - `updated_at: optional number`

    The Unix timestamp of the last endpoint configuration or signing-secret change. Initialized at creation; tests and unchanged updates do not advance it.

### Webhook Event Type List

- `WebhookEventTypeList object { data, object }`

  - `data: array of string`

    The webhook event types available to the authenticated project.

  - `object: "list"`

    The object type, which is always list.

    - `"list"`

# Event Types

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
