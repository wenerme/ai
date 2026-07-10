## Upload file

`files.create(FileCreateParams**kwargs)  -> FileObject`

**post** `/files`

Upload file

### Parameters

- `file: FileTypes`

  The File object (not file name) to be uploaded.

- `purpose: object`

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
    file=b"Example data",
    purpose={},
)
print(file_object.id)
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "created_at": 0,
  "filename": "filename",
  "object": "file",
  "purpose": "assistants",
  "status": "uploaded",
  "expires_at": 0,
  "status_details": "status_details"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

client.files.create(
  file=open("mydata.jsonl", "rb"),
  purpose="fine-tune",
  expires_after={
    "anchor": "created_at",
    "seconds": 2592000
  }
)
```

#### Response

```json
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 120000,
  "created_at": 1677610602,
  "expires_at": 1677614202,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune",
}
```
