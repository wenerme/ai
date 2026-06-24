## List fine-tuning events

`client.fineTuning.jobs.listEvents(stringfineTuningJobID, JobListEventsParamsquery?, RequestOptionsoptions?): CursorPage<FineTuningJobEvent>`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/events`

Get status updates for a fine-tuning job.

### Parameters

- `fineTuningJobID: string`

- `query: JobListEventsParams`

  - `after?: string`

    Identifier for the last event from the previous pagination request.

  - `limit?: number`

    Number of events to retrieve.

### Returns

- `FineTuningJobEvent`

  Fine-tuning job event object

  - `id: string`

    The object identifier.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: "info" | "warn" | "error"`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: string`

    The message of the event.

  - `object: "fine_tuning.job.event"`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data?: unknown`

    The data associated with the event.

  - `type?: "message" | "metrics"`

    The type of event.

    - `"message"`

    - `"metrics"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const fineTuningJobEvent of client.fineTuning.jobs.listEvents(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(fineTuningJobEvent.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "level": "info",
      "message": "message",
      "object": "fine_tuning.job.event",
      "data": {},
      "type": "message"
    }
  ],
  "has_more": true,
  "object": "list"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const list = await openai.fineTuning.list_events(id="ftjob-abc123", limit=2);

  for await (const fineTune of list) {
    console.log(fineTune);
  }
}

main();
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-ddTJfwuMVpfLXseO0Am0Gqjm",
      "created_at": 1721764800,
      "level": "info",
      "message": "Fine tuning job successfully completed",
      "data": null,
      "type": "message"
    },
    {
      "object": "fine_tuning.job.event",
      "id": "ft-event-tyiGuB72evQncpH87xe505Sv",
      "created_at": 1721764800,
      "level": "info",
      "message": "New fine-tuned model created: ft:gpt-4o-mini:openai::7p4lURel",
      "data": null,
      "type": "message"
    }
  ],
  "has_more": true
}
```
