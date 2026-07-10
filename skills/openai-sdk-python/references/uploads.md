# Uploads

## Create upload

`uploads.create(UploadCreateParams**kwargs)  -> Upload`

**post** `/uploads`

Create upload

### Parameters

- `bytes: int`

  The number of bytes in the file you are uploading.

- `filename: str`

  The name of the file to upload.

- `mime_type: str`

  The MIME type of the file.

  This must fall within the supported MIME types for your file purpose. See
  the supported MIME types for assistants and vision.

- `purpose: FilePurposeParam`

  The intended purpose of the uploaded file.

  See the [documentation on File
  purposes](https://platform.openai.com/docs/api-reference/files/create#files-create-purpose).

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
    purpose={},
)
print(upload.id)
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "created_at": 0,
  "expires_at": 0,
  "filename": "filename",
  "object": "upload",
  "purpose": "purpose",
  "status": "pending",
  "file": {
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
}
```

## Complete upload

`uploads.complete(strupload_id, UploadCompleteParams**kwargs)  -> Upload`

**post** `/uploads/{upload_id}/complete`

Complete upload

### Parameters

- `upload_id: str`

- `part_ids: Sequence[str]`

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

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "created_at": 0,
  "expires_at": 0,
  "filename": "filename",
  "object": "upload",
  "purpose": "purpose",
  "status": "pending",
  "file": {
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
}
```

## Cancel upload

`uploads.cancel(strupload_id)  -> Upload`

**post** `/uploads/{upload_id}/cancel`

Cancel upload

### Parameters

- `upload_id: str`

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
upload = client.uploads.cancel(
    "upload_abc123",
)
print(upload.id)
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "created_at": 0,
  "expires_at": 0,
  "filename": "filename",
  "object": "upload",
  "purpose": "purpose",
  "status": "pending",
  "file": {
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
}
```

## Domain Types

### Upload

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

# Parts

## Add upload part

`uploads.parts.create(strupload_id, PartCreateParams**kwargs)  -> UploadPart`

**post** `/uploads/{upload_id}/parts`

Add upload part

### Parameters

- `upload_id: str`

- `data: FileTypes`

  The chunk of bytes for this Part.

### Returns

- `class UploadPart: …`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: str`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: Literal["upload.part"]`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: str`

    The ID of the Upload object that this Part was added to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
upload_part = client.uploads.parts.create(
    upload_id="upload_abc123",
    data=b"Example data",
)
print(upload_part.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "upload.part",
  "upload_id": "upload_id"
}
```

## Domain Types

### Upload Part

- `class UploadPart: …`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: str`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: Literal["upload.part"]`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: str`

    The ID of the Upload object that this Part was added to.
