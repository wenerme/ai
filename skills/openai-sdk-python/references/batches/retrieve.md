## Retrieve

`batches.retrieve(strbatch_id)  -> Batch`

**get** `/batches/{batch_id}`

Retrieves a batch.

### Parameters

- `batch_id: str`

### Returns

- `class Batch: …`

  - `id: str`

  - `completion_window: str`

    The time frame within which the batch should be processed.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the batch was created.

  - `endpoint: str`

    The OpenAI API endpoint used by the batch.

  - `input_file_id: str`

    The ID of the input file for the batch.

  - `object: Literal["batch"]`

    The object type, which is always `batch`.

    - `"batch"`

  - `status: Literal["validating", "failed", "in_progress", 5 more]`

    The current status of the batch.

    - `"validating"`

    - `"failed"`

    - `"in_progress"`

    - `"finalizing"`

    - `"completed"`

    - `"expired"`

    - `"cancelling"`

    - `"cancelled"`

  - `cancelled_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch was cancelled.

  - `cancelling_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch started cancelling.

  - `completed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch was completed.

  - `error_file_id: Optional[str]`

    The ID of the file containing the outputs of requests with errors.

  - `errors: Optional[Errors]`

    - `data: Optional[List[BatchError]]`

      - `code: Optional[str]`

        An error code identifying the error type.

      - `line: Optional[int]`

        The line number of the input file where the error occurred, if applicable.

      - `message: Optional[str]`

        A human-readable message providing more details about the error.

      - `param: Optional[str]`

        The name of the parameter that caused the error, if applicable.

    - `object: Optional[str]`

      The object type, which is always `list`.

  - `expired_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch expired.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch will expire.

  - `failed_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch failed.

  - `finalizing_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch started finalizing.

  - `in_progress_at: Optional[int]`

    The Unix timestamp (in seconds) for when the batch started processing.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `model: Optional[str]`

    Model ID used to process the batch, like `gpt-5-2025-08-07`. OpenAI
    offers a wide range of models with different capabilities, performance
    characteristics, and price points. Refer to the [model
    guide](https://platform.openai.com/docs/models) to browse and compare available models.

  - `output_file_id: Optional[str]`

    The ID of the file containing the outputs of successfully executed requests.

  - `request_counts: Optional[BatchRequestCounts]`

    The request counts for different statuses within the batch.

    - `completed: int`

      Number of requests that have been completed successfully.

    - `failed: int`

      Number of requests that have failed.

    - `total: int`

      Total number of requests in the batch.

  - `usage: Optional[BatchUsage]`

    Represents token usage details including input tokens, output tokens, a
    breakdown of output tokens, and the total tokens used. Only populated on
    batches created after September 7, 2025.

    - `input_tokens: int`

      The number of input tokens.

    - `input_tokens_details: InputTokensDetails`

      A detailed breakdown of the input tokens.

      - `cached_tokens: int`

        The number of tokens that were retrieved from the cache. [More on
        prompt caching](https://platform.openai.com/docs/guides/prompt-caching).

    - `output_tokens: int`

      The number of output tokens.

    - `output_tokens_details: OutputTokensDetails`

      A detailed breakdown of the output tokens.

      - `reasoning_tokens: int`

        The number of reasoning tokens.

    - `total_tokens: int`

      The total number of tokens used.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
batch = client.batches.retrieve(
    "batch_id",
)
print(batch.id)
```
