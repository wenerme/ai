# Checkpoints

## List fine-tuning checkpoints

`fine_tuning.jobs.checkpoints.list(strfine_tuning_job_id, CheckpointListParams**kwargs)  -> SyncCursorPage[FineTuningJobCheckpoint]`

**get** `/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints`

List checkpoints for a fine-tuning job.

### Parameters

- `fine_tuning_job_id: str`

- `after: Optional[str]`

  Identifier for the last checkpoint ID from the previous pagination request.

- `limit: Optional[int]`

  Number of checkpoints to retrieve.

### Returns

- `class FineTuningJobCheckpoint: …`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: str`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: str`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: str`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss: Optional[float]`

    - `full_valid_mean_token_accuracy: Optional[float]`

    - `step: Optional[float]`

    - `train_loss: Optional[float]`

    - `train_mean_token_accuracy: Optional[float]`

    - `valid_loss: Optional[float]`

    - `valid_mean_token_accuracy: Optional[float]`

  - `object: Literal["fine_tuning.job.checkpoint"]`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: int`

    The step number that the checkpoint was created at.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.fine_tuning.jobs.checkpoints.list(
    fine_tuning_job_id="ft-AF1WoRqd3aJAHsqc9NY7iL8F",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "fine_tuned_model_checkpoint": "fine_tuned_model_checkpoint",
      "fine_tuning_job_id": "fine_tuning_job_id",
      "metrics": {
        "full_valid_loss": 0,
        "full_valid_mean_token_accuracy": 0,
        "step": 0,
        "train_loss": 0,
        "train_mean_token_accuracy": 0,
        "valid_loss": 0,
        "valid_mean_token_accuracy": 0
      },
      "object": "fine_tuning.job.checkpoint",
      "step_number": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Domain Types

### Fine Tuning Job Checkpoint

- `class FineTuningJobCheckpoint: …`

  The `fine_tuning.job.checkpoint` object represents a model checkpoint for a fine-tuning job that is ready to use.

  - `id: str`

    The checkpoint identifier, which can be referenced in the API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the checkpoint was created.

  - `fine_tuned_model_checkpoint: str`

    The name of the fine-tuned checkpoint model that is created.

  - `fine_tuning_job_id: str`

    The name of the fine-tuning job that this checkpoint was created from.

  - `metrics: Metrics`

    Metrics at the step number during the fine-tuning job.

    - `full_valid_loss: Optional[float]`

    - `full_valid_mean_token_accuracy: Optional[float]`

    - `step: Optional[float]`

    - `train_loss: Optional[float]`

    - `train_mean_token_accuracy: Optional[float]`

    - `valid_loss: Optional[float]`

    - `valid_mean_token_accuracy: Optional[float]`

  - `object: Literal["fine_tuning.job.checkpoint"]`

    The object type, which is always "fine_tuning.job.checkpoint".

    - `"fine_tuning.job.checkpoint"`

  - `step_number: int`

    The step number that the checkpoint was created at.
