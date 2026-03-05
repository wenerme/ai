## Complete

`uploads.complete(strupload_id, UploadCompleteParams**kwargs)  -> Upload`

**post** `/uploads/{upload_id}/complete`

Completes the [Upload](https://platform.openai.com/docs/api-reference/uploads/object).

Within the returned Upload object, there is a nested [File](https://platform.openai.com/docs/api-reference/files/object) object that is ready to use in the rest of the platform.

You can specify the order of the Parts by passing in an ordered list of the Part IDs.

The number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.
Returns the Upload object with status `completed`, including an additional `file` property containing the created usable File object.

### Parameters

- `upload_id: str`

- `part_ids: SequenceNotStr[str]`

  The ordered list of Part IDs.

- `md5: Optional[str]`

  The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.

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
upload = client.uploads.complete(
    upload_id="upload_abc123",
    part_ids=["string"],
)
print(upload.id)
```
