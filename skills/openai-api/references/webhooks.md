# Webhooks

## Unwrap

**** ``

Validates that the given payload was sent by OpenAI and parses the payload.

## Domain Types

### Batch Cancelled Webhook Event

- `BatchCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

- `BatchCompletedWebhookEvent = object { id, created_at, data, 2 more }`

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

- `BatchExpiredWebhookEvent = object { id, created_at, data, 2 more }`

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

- `BatchFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

### Eval Run Canceled Webhook Event

- `EvalRunCanceledWebhookEvent = object { id, created_at, data, 2 more }`

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

- `EvalRunFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

- `EvalRunSucceededWebhookEvent = object { id, created_at, data, 2 more }`

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

- `FineTuningJobCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

- `FineTuningJobFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

- `FineTuningJobSucceededWebhookEvent = object { id, created_at, data, 2 more }`

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

### Realtime Call Incoming Webhook Event

- `RealtimeCallIncomingWebhookEvent = object { id, created_at, data, 2 more }`

  Sent when Realtime API Receives a incoming SIP call.

  - `id: string`

    The unique ID of the event.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the model response was completed.

  - `data: object { call_id, sip_headers }`

    Event data payload.

    - `call_id: string`

      The unique ID of this call.

    - `sip_headers: array of object { name, value }`

      Headers from the SIP Invite.

      - `name: string`

        Name of the SIP Header.

      - `value: string`

        Value of the SIP Header.

  - `type: "realtime.call.incoming"`

    The type of the event. Always `realtime.call.incoming`.

    - `"realtime.call.incoming"`

  - `object: optional "event"`

    The object of the event. Always `event`.

    - `"event"`

### Response Cancelled Webhook Event

- `ResponseCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

- `ResponseCompletedWebhookEvent = object { id, created_at, data, 2 more }`

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

- `ResponseFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

- `ResponseIncompleteWebhookEvent = object { id, created_at, data, 2 more }`

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

### Unwrap Webhook Event

- `UnwrapWebhookEvent = BatchCancelledWebhookEvent or BatchCompletedWebhookEvent or BatchExpiredWebhookEvent or 12 more`

  Sent when a batch API request has been cancelled.

  - `BatchCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `BatchCompletedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `BatchExpiredWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `BatchFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `EvalRunCanceledWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `EvalRunFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `EvalRunSucceededWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `FineTuningJobCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `FineTuningJobFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `FineTuningJobSucceededWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `RealtimeCallIncomingWebhookEvent = object { id, created_at, data, 2 more }`

    Sent when Realtime API Receives a incoming SIP call.

    - `id: string`

      The unique ID of the event.

    - `created_at: number`

      The Unix timestamp (in seconds) of when the model response was completed.

    - `data: object { call_id, sip_headers }`

      Event data payload.

      - `call_id: string`

        The unique ID of this call.

      - `sip_headers: array of object { name, value }`

        Headers from the SIP Invite.

        - `name: string`

          Name of the SIP Header.

        - `value: string`

          Value of the SIP Header.

    - `type: "realtime.call.incoming"`

      The type of the event. Always `realtime.call.incoming`.

      - `"realtime.call.incoming"`

    - `object: optional "event"`

      The object of the event. Always `event`.

      - `"event"`

  - `ResponseCancelledWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `ResponseCompletedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `ResponseFailedWebhookEvent = object { id, created_at, data, 2 more }`

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

  - `ResponseIncompleteWebhookEvent = object { id, created_at, data, 2 more }`

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
