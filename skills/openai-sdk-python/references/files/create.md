## Create

`files.create(FileCreateParams**kwargs)  -> FileObject`

**post** `/files`

Upload a file that can be used across various endpoints. Individual files
can be up to 512 MB, and each project can store up to 2.5 TB of files in
total. There is no organization-wide storage limit.

- The Assistants API supports files up to 2 million tokens and of specific
  file types. See the [Assistants Tools guide](https://platform.openai.com/docs/assistants/tools) for
  details.
- The Fine-tuning API only supports `.jsonl` files. The input also has
  certain required formats for fine-tuning
  [chat](https://platform.openai.com/docs/api-reference/fine-tuning/chat-input) or
  [completions](https://platform.openai.com/docs/api-reference/fine-tuning/completions-input) models.
- The Batch API only supports `.jsonl` files up to 200 MB in size. The input
  also has a specific required
  [format](https://platform.openai.com/docs/api-reference/batch/request-input).

Please [contact us](https://help.openai.com/) if you need to increase these
storage limits.

### Parameters

- `file: FileTypes`

  The File object (not file name) to be uploaded.

- `purpose: FilePurpose`

  The intended purpose of the uploaded file. One of:

  - `assistants`: Used in the Assistants API
  - `batch`: Used in the Batch API
  - `fine-tune`: Used for fine-tuning
  - `vision`: Images used for vision fine-tuning
  - `user_data`: Flexible file type for any purpose
  - `evals`: Used for eval data sets

  - `"assistants"`

  - `"batch"`

  - `"fine-tune"`

  - `"vision"`

  - `"user_data"`

  - `"evals"`

- `expires_after: Optional[ExpiresAfter]`

  The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.

  - `anchor: Literal["created_at"]`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.

    - `"created_at"`

  - `seconds: int`

    The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).

### Returns

- `class FileObject: …`

  The `File` object represents a document that has been uploaded to OpenAI.

  - `id: str`

    The file identifier, which can be referenced in the API endpoints.

  - `bytes: int`

    The size of the file, in bytes.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the file was created.

  - `filename: str`

    The name of the file.

  - `object: Literal["file"]`

    The object type, which is always `file`.

    - `"file"`

  - `purpose: Literal["assistants", "assistants_output", "batch", 5 more]`

    The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

    - `"assistants"`

    - `"assistants_output"`

    - `"batch"`

    - `"batch_output"`

    - `"fine-tune"`

    - `"fine-tune-results"`

    - `"vision"`

    - `"user_data"`

  - `status: Literal["uploaded", "processed", "error"]`

    Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

    - `"uploaded"`

    - `"processed"`

    - `"error"`

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the file will expire.

  - `status_details: Optional[str]`

    Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file_object = client.files.create(
    file=b"raw file contents",
    purpose="assistants",
)
print(file_object.id)
```
