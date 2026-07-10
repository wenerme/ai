## Create upload

**post** `/uploads`

Create upload

### Body Parameters

- `bytes: number`

  The number of bytes in the file you are uploading.

- `filename: string`

  The name of the file to upload.

- `mime_type: string`

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

- `expires_after: optional object { anchor, seconds }`

  The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.

  - `anchor: "created_at"`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.

    - `"created_at"`

  - `seconds: number`

    The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).

### Returns

- `Upload object { id, bytes, created_at, 6 more }`

  The Upload object can accept byte chunks in the form of Parts.

  - `id: string`

    The Upload unique identifier, which can be referenced in API endpoints.

  - `bytes: number`

    The intended number of bytes to be uploaded.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Upload was created.

  - `expires_at: number`

    The Unix timestamp (in seconds) for when the Upload will expire.

  - `filename: string`

    The name of the file to be uploaded.

  - `object: "upload"`

    The object type, which is always "upload".

    - `"upload"`

  - `purpose: string`

    The intended purpose of the file. [Please refer here](https://platform.openai.com/docs/api-reference/files/object#files/object-purpose) for acceptable values.

  - `status: "pending" or "completed" or "cancelled" or "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file: optional FileObject`

    The `File` object represents a document that has been uploaded to OpenAI.

    - `id: string`

      The file identifier, which can be referenced in the API endpoints.

    - `bytes: number`

      The size of the file, in bytes.

    - `created_at: number`

      The Unix timestamp (in seconds) for when the file was created.

    - `filename: string`

      The name of the file.

    - `object: "file"`

      The object type, which is always `file`.

      - `"file"`

    - `purpose: "assistants" or "assistants_output" or "batch" or 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" or "processed" or "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details: optional string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```http
curl https://api.openai.com/v1/uploads \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "bytes": 0,
          "filename": "filename",
          "mime_type": "mime_type",
          "purpose": "assistants"
        }'
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

### Example

```http
curl https://api.openai.com/v1/uploads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "purpose": "fine-tune",
    "filename": "training_examples.jsonl",
    "bytes": 2147483648,
    "mime_type": "text/jsonl",
    "expires_after": {
      "anchor": "created_at",
      "seconds": 3600
    }
  }'
```

#### Response

```json
{
  "id": "upload_abc123",
  "object": "upload",
  "bytes": 2147483648,
  "created_at": 1719184911,
  "filename": "training_examples.jsonl",
  "purpose": "fine-tune",
  "status": "pending",
  "expires_at": 1719127296
}
```
