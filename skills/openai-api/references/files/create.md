## Upload file

**post** `/files`

Upload a file that can be used across various endpoints. Individual files
can be up to 512 MB, and each project can store up to 2.5 TB of files in
total. There is no organization-wide storage limit. Uploads to this
endpoint are rate-limited to 1,000 requests per minute per authenticated
user.

- The Assistants API supports files up to 2 million tokens and of specific
  file types. See the [Assistants Tools guide](/api/docs/guides/tools) for
  details.
- The Fine-tuning API only supports `.jsonl` files. The input also has
  certain required formats for fine-tuning
  [chat](/api/docs/guides/supervised-fine-tuning#formatting-your-data) or
  [completions](/api/docs/guides/supervised-fine-tuning#formatting-your-data) models.
- The Batch API only supports `.jsonl` files up to 200 MB in size. The input
  also has a specific required
  [format](/api/docs/guides/batch#1-prepare-your-batch-file).
- For Retrieval or `file_search` ingestion, upload files here first. If
  you need to attach multiple uploaded files to the same vector store, use
  [`/vector_stores/{vector_store_id}/file_batches`](/api/reference/resources/vector_stores/subresources/file_batches/methods/create)
  instead of attaching them one by one. Vector store attachment has separate
  limits from file upload, including 2,000 attached files per minute per
  organization.

Please [contact us](https://help.openai.com/) if you need to increase these
storage limits.

### Body Parameters

Content type: `multipart/form-data`

- `file: string`

  The File object (not file name) to be uploaded.

- `purpose: "assistants" or "batch" or "fine-tune" or 3 more`

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

- `expires_after: optional object { anchor, seconds }`

  The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.

  - `anchor: "created_at"`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.

    - `"created_at"`

  - `seconds: integer`

    The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).

    `format: int64`, `minimum: 3600`, `maximum: 2592000`

### Returns

- `FileObject object { id, bytes, created_at, 6 more }`

  The `File` object represents a document that has been uploaded to OpenAI.

  - `id: string`

    The file identifier, which can be referenced in the API endpoints.

  - `bytes: integer or null`

    The size of the file, in bytes. In a completed file upload response, this can
    be null when the file size is not yet available.

  - `created_at: integer`

    The Unix timestamp (in seconds) for when the file was created.

    `format: unixtime`

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

  - `expires_at: optional integer`

    The Unix timestamp (in seconds) for when the file will expire. In a
    completed file upload response, this can be null when no expiry is set.

    `format: unixtime`

  - `status_details: optional string`

    Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`. Completed file upload responses can return null when these details are unset.

### Example

```http
curl https://api.openai.com/v1/files \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F purpose=assistants
```

#### 200 — Example

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

```http
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl" \
  -F 'expires_after[anchor]=created_at' \
  -F 'expires_after[seconds]=2592000'
```

#### Response example

```json
{
  "id": "file-abc123",
  "object": "file",
  "bytes": 120000,
  "created_at": 1677610602,
  "expires_at": 1680202602,
  "filename": "mydata.jsonl",
  "purpose": "fine-tune",
  "status": "processed"
}
```
