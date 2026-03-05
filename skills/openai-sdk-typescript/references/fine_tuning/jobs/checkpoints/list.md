## List

`client.fineTuning.jobs.checkpoints.list(stringfineTuningJobID, CheckpointListParamsquery?, RequestOptionsoptions?): CursorPage<FineTuningJobCheckpoint>`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints`

List checkpoints for a fine-tuning job.

### Parameters

- `fineTuningJobID: string`

- `query: CheckpointListParams`

  - `after?: string`

    Identifier for the last checkpoint ID from the previous pagination request.

  - `limit?: number`

    Number of checkpoints to retrieve.

### Returns

- `FineTuningJobCheckpoint`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: string`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: string`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: string`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss?: number`

    - `full_valid_mean_token_accuracy?: number`

    - `step?: number`

    - `train_loss?: number`

    - `train_mean_token_accuracy?: number`

    - `valid_loss?: number`

    - `valid_mean_token_accuracy?: number`

  - `object: "fine_tuning.job.checkpoint"`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: number`

    The step number that the checkpoint was created at.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const fineTuningJobCheckpoint of client.fineTuning.jobs.checkpoints.list(
  'ft-AF1WoRqd3aJAHsqc9NY7iL8F',
)) {
  console.log(fineTuningJobCheckpoint.id);
}
```
