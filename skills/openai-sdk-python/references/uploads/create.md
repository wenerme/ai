## Create

`uploads.create(UploadCreateParams**kwargs)  -> Upload`

**post** `/uploads`

Creates an intermediate [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object
that you can add [Parts](https://platform.openai.com/docs/api-reference/uploads/part-object) to.
Currently, an Upload can accept at most 8 GB in total and expires after an
hour after you create it.

Once you complete the Upload, we will create a
[File](https://platform.openai.com/docs/api-reference/files/object) object that contains all the parts
you uploaded. This File is usable in the rest of our platform as a regular
File object.

For certain `purpose` values, the correct `mime_type` must be specified.
Please refer to documentation for the
[supported MIME types for your use case](https://platform.openai.com/docs/assistants/tools/file-search#supported-files).

For guidance on the proper filename extensions for each purpose, please
follow the documentation on [creating a
File](https://platform.openai.com/docs/api-reference/files/create).

Returns the Upload object with status `pending`.

### Parameters

- `bytes: int`

  The number of bytes in the file you are uploading.

- `filename: str`

  The name of the file to upload.

- `mime_type: str`

  The MIME type of the file.

  This must fall within the supported MIME types for your file purpose. See
  the supported MIME types for assistants and vision.

- `purpose: FilePurpose`

  The intended purpose of the uploaded file.

  See the [documentation on File
  purposes](https://platform.openai.com/docs/api-reference/files/create#files-create-purpose).

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

- `class Upload: …`

  The Upload object can accept byte chunks in the form of Parts.

  - `id: str`

    The Upload unique identifier, which can be referenced in API endpoints.

  - `bytes: int`

    The intended number of bytes to be uploaded.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the Upload was created.

  - `expires_at: int`

    The Unix timestamp (in seconds) for when the Upload will expire.

  - `filename: str`

    The name of the file to be uploaded.

  - `object: Literal["upload"]`

    The object type, which is always "upload".

    - `"upload"`

  - `purpose: str`

    The intended purpose of the file. [Please refer here](https://platform.openai.com/docs/api-reference/files/object#files/object-purpose) for acceptable values.

  - `status: Literal["pending", "completed", "cancelled", "expired"]`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file: Optional[FileObject]`

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
upload = client.uploads.create(
    bytes=0,
    filename="filename",
    mime_type="mime_type",
    purpose="assistants",
)
print(upload.id)
```
