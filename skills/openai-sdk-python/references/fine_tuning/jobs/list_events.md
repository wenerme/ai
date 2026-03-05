## List Events

`fine_tuning.jobs.list_events(strfine_tuning_job_id, JobListEventsParams**kwargs)  -> SyncCursorPage[FineTuningJobEvent]`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/events`

Get status updates for a fine-tuning job.

### Parameters

- `fine_tuning_job_id: str`

- `after: Optional[str]`

  Identifier for the last event from the previous pagination request.

- `limit: Optional[int]`

  Number of events to retrieve.

### Returns

- `class FineTuningJobEvent: …`

  Fine-tuning job event object

  - `id: str`

    The object identifier.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the fine-tuning job was created.

  - `level: Literal["info", "warn", "error"]`

    The log level of the event.

    - `"info"`

    - `"warn"`

    - `"error"`

  - `message: str`

    The message of the event.

  - `object: Literal["fine_tuning.job.event"]`

    The object type, which is always "fine_tuning.job.event".

    - `"fine_tuning.job.event"`

  - `data: Optional[object]`

    The data associated with the event.

  - `type: Optional[Literal["message", "metrics"]]`

    The type of event.

    - `"message"`

    - `"metrics"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.jobs.list_events(
    fine_tuning_job_id="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```
