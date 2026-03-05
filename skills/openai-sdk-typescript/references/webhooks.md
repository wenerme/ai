# Webhooks

## Unwrap

`client.webhooks.unwrap(RequestOptionsoptions?): void`

**** ``

Validates that the given payload was sent by OpenAI and parses the payload.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.webhooks.unwrap();
```

## Domain Types

### Batch Cancelled Webhook Event

- `BatchCancelledWebhookEvent`

  Sent when a batch API request has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request was cancelled.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.cancelled"`

    The type of the event. Always `batch.cancelled`.

    - `"batch.cancelled"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Completed Webhook Event

- `BatchCompletedWebhookEvent`

  Sent when a batch API request has been completed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request was completed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.completed"`

    The type of the event. Always `batch.completed`.

    - `"batch.completed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Expired Webhook Event

- `BatchExpiredWebhookEvent`

  Sent when a batch API request has expired.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request expired.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.expired"`

    The type of the event. Always `batch.expired`.

    - `"batch.expired"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Batch Failed Webhook Event

- `BatchFailedWebhookEvent`

  Sent when a batch API request has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the batch API request failed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the batch API request.

  - `type: "batch.failed"`

    The type of the event. Always `batch.failed`.

    - `"batch.failed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Eval Run Canceled Webhook Event

- `EvalRunCanceledWebhookEvent`

  Sent when an eval run has been canceled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run was canceled.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.canceled"`

    The type of the event. Always `eval.run.canceled`.

    - `"eval.run.canceled"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Eval Run Failed Webhook Event

- `EvalRunFailedWebhookEvent`

  Sent when an eval run has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run failed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.failed"`

    The type of the event. Always `eval.run.failed`.

    - `"eval.run.failed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Eval Run Succeeded Webhook Event

- `EvalRunSucceededWebhookEvent`

  Sent when an eval run has succeeded.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the eval run succeeded.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the eval run.

  - `type: "eval.run.succeeded"`

    The type of the event. Always `eval.run.succeeded`.

    - `"eval.run.succeeded"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Cancelled Webhook Event

- `FineTuningJobCancelledWebhookEvent`

  Sent when a fine-tuning job has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job was cancelled.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.cancelled"`

    The type of the event. Always `fine_tuning.job.cancelled`.

    - `"fine_tuning.job.cancelled"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Failed Webhook Event

- `FineTuningJobFailedWebhookEvent`

  Sent when a fine-tuning job has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job failed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.failed"`

    The type of the event. Always `fine_tuning.job.failed`.

    - `"fine_tuning.job.failed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Fine Tuning Job Succeeded Webhook Event

- `FineTuningJobSucceededWebhookEvent`

  Sent when a fine-tuning job has succeeded.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the fine-tuning job succeeded.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the fine-tuning job.

  - `type: "fine_tuning.job.succeeded"`

    The type of the event. Always `fine_tuning.job.succeeded`.

    - `"fine_tuning.job.succeeded"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Realtime Call Incoming Webhook Event

- `RealtimeCallIncomingWebhookEvent`

  Sent when Realtime API Receives a incoming SIP call.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was completed.

  - `data: Data`

    Event data payload.

    - `call_id: string`

      The unique ID of this call.

    - `sip_headers: Array<SipHeader>`

      Headers from the SIP Invite.

      - `name: string`

        Name of the SIP Header.

      - `value: string`

        Value of the SIP Header.

  - `type: "realtime.call.incoming"`

    The type of the event. Always `realtime.call.incoming`.

    - `"realtime.call.incoming"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Cancelled Webhook Event

- `ResponseCancelledWebhookEvent`

  Sent when a background response has been cancelled.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was cancelled.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.cancelled"`

    The type of the event. Always `response.cancelled`.

    - `"response.cancelled"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Completed Webhook Event

- `ResponseCompletedWebhookEvent`

  Sent when a background response has been completed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was completed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.completed"`

    The type of the event. Always `response.completed`.

    - `"response.completed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Failed Webhook Event

- `ResponseFailedWebhookEvent`

  Sent when a background response has failed.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response failed.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.failed"`

    The type of the event. Always `response.failed`.

    - `"response.failed"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Incomplete Webhook Event

- `ResponseIncompleteWebhookEvent`

  Sent when a background response has been interrupted.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was interrupted.

  - `data: Data`

    Event data payload.

    - `id: string`

      The unique ID of the model response.

  - `type: "response.incomplete"`

    The type of the event. Always `response.incomplete`.

    - `"response.incomplete"`

  - `object?: "event"`

    The object of the event. Always `event`.

    - `"event"`

### Unwrap Webhook Event

- `UnwrapWebhookEvent = BatchCancelledWebhookEvent | BatchCompletedWebhookEvent | BatchExpiredWebhookEvent | 12 more`

  Sent when a batch API request has been cancelled.

  - `BatchCancelledWebhookEvent`

    Sent when a batch API request has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request was cancelled.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.cancelled"`

      The type of the event. Always `batch.cancelled`.

      - `"batch.cancelled"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchCompletedWebhookEvent`

    Sent when a batch API request has been completed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request was completed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.completed"`

      The type of the event. Always `batch.completed`.

      - `"batch.completed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchExpiredWebhookEvent`

    Sent when a batch API request has expired.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request expired.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.expired"`

      The type of the event. Always `batch.expired`.

      - `"batch.expired"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `BatchFailedWebhookEvent`

    Sent when a batch API request has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the batch API request failed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the batch API request.

    - `type: "batch.failed"`

      The type of the event. Always `batch.failed`.

      - `"batch.failed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunCanceledWebhookEvent`

    Sent when an eval run has been canceled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run was canceled.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.canceled"`

      The type of the event. Always `eval.run.canceled`.

      - `"eval.run.canceled"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunFailedWebhookEvent`

    Sent when an eval run has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run failed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.failed"`

      The type of the event. Always `eval.run.failed`.

      - `"eval.run.failed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `EvalRunSucceededWebhookEvent`

    Sent when an eval run has succeeded.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the eval run succeeded.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the eval run.

    - `type: "eval.run.succeeded"`

      The type of the event. Always `eval.run.succeeded`.

      - `"eval.run.succeeded"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobCancelledWebhookEvent`

    Sent when a fine-tuning job has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job was cancelled.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.cancelled"`

      The type of the event. Always `fine_tuning.job.cancelled`.

      - `"fine_tuning.job.cancelled"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobFailedWebhookEvent`

    Sent when a fine-tuning job has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job failed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.failed"`

      The type of the event. Always `fine_tuning.job.failed`.

      - `"fine_tuning.job.failed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `FineTuningJobSucceededWebhookEvent`

    Sent when a fine-tuning job has succeeded.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the fine-tuning job succeeded.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the fine-tuning job.

    - `type: "fine_tuning.job.succeeded"`

      The type of the event. Always `fine_tuning.job.succeeded`.

      - `"fine_tuning.job.succeeded"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `RealtimeCallIncomingWebhookEvent`

    Sent when Realtime API Receives a incoming SIP call.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was completed.

    - `data: Data`

      Event data payload.

      - `call_id: string`

        The unique ID of this call.

      - `sip_headers: Array<SipHeader>`

        Headers from the SIP Invite.

        - `name: string`

          Name of the SIP Header.

        - `value: string`

          Value of the SIP Header.

    - `type: "realtime.call.incoming"`

      The type of the event. Always `realtime.call.incoming`.

      - `"realtime.call.incoming"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseCancelledWebhookEvent`

    Sent when a background response has been cancelled.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was cancelled.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.cancelled"`

      The type of the event. Always `response.cancelled`.

      - `"response.cancelled"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseCompletedWebhookEvent`

    Sent when a background response has been completed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was completed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.completed"`

      The type of the event. Always `response.completed`.

      - `"response.completed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseFailedWebhookEvent`

    Sent when a background response has failed.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response failed.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.failed"`

      The type of the event. Always `response.failed`.

      - `"response.failed"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseIncompleteWebhookEvent`

    Sent when a background response has been interrupted.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was interrupted.

    - `data: Data`

      Event data payload.

      - `id: string`

        The unique ID of the model response.

    - `type: "response.incomplete"`

      The type of the event. Always `response.incomplete`.

      - `"response.incomplete"`

    - `object?: "event"`

      The object of the event. Always `event`.

      - `"event"`
