# Uploads

## Create

`client.uploads.create(UploadCreateParamsbody, RequestOptionsoptions?): Upload`

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

- `body: UploadCreateParams`

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

  - `expires_after?: ExpiresAfter`

    The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.

    - `anchor: "created_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.

      - `"created_at"`

    - `seconds: number`

      The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).

### Returns

- `Upload`

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

  - `status: "pending" | "completed" | "cancelled" | "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file?: FileObject | null`

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

    - `purpose: "assistants" | "assistants_output" | "batch" | 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" | "processed" | "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at?: number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details?: string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const upload = await client.uploads.create({
  bytes: 0,
  filename: 'filename',
  mime_type: 'mime_type',
  purpose: 'assistants',
});

console.log(upload.id);
```

## Complete

`client.uploads.complete(stringuploadID, UploadCompleteParamsbody, RequestOptionsoptions?): Upload`

**post** `/uploads/{upload_id}/complete`

Completes the [Upload](https://platform.openai.com/docs/api-reference/uploads/object).

Within the returned Upload object, there is a nested [File](https://platform.openai.com/docs/api-reference/files/object) object that is ready to use in the rest of the platform.

You can specify the order of the Parts by passing in an ordered list of the Part IDs.

The number of bytes uploaded upon completion must match the number of bytes initially specified when creating the Upload object. No Parts may be added after an Upload is completed.
Returns the Upload object with status `completed`, including an additional `file` property containing the created usable File object.

### Parameters

- `uploadID: string`

- `body: UploadCompleteParams`

  - `part_ids: Array<string>`

    The ordered list of Part IDs.

  - `md5?: string`

    The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.

### Returns

- `Upload`

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

  - `status: "pending" | "completed" | "cancelled" | "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file?: FileObject | null`

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

    - `purpose: "assistants" | "assistants_output" | "batch" | 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" | "processed" | "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at?: number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details?: string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const upload = await client.uploads.complete('upload_abc123', { part_ids: ['string'] });

console.log(upload.id);
```

## Cancel

`client.uploads.cancel(stringuploadID, RequestOptionsoptions?): Upload`

**post** `/uploads/{upload_id}/cancel`

Cancels the Upload. No Parts may be added after an Upload is cancelled.

Returns the Upload object with status `cancelled`.

### Parameters

- `uploadID: string`

### Returns

- `Upload`

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

  - `status: "pending" | "completed" | "cancelled" | "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file?: FileObject | null`

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

    - `purpose: "assistants" | "assistants_output" | "batch" | 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" | "processed" | "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at?: number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details?: string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const upload = await client.uploads.cancel('upload_abc123');

console.log(upload.id);
```

## Domain Types

### Upload

- `Upload`

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

  - `status: "pending" | "completed" | "cancelled" | "expired"`

    The status of the Upload.

    - `"pending"`

    - `"completed"`

    - `"cancelled"`

    - `"expired"`

  - `file?: FileObject | null`

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

    - `purpose: "assistants" | "assistants_output" | "batch" | 5 more`

      The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

      - `"assistants"`

      - `"assistants_output"`

      - `"batch"`

      - `"batch_output"`

      - `"fine-tune"`

      - `"fine-tune-results"`

      - `"vision"`

      - `"user_data"`

    - `status: "uploaded" | "processed" | "error"`

      Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

      - `"uploaded"`

      - `"processed"`

      - `"error"`

    - `expires_at?: number`

      The Unix timestamp (in seconds) for when the file will expire.

    - `status_details?: string`

      Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

# Parts

## Create

`client.uploads.parts.create(stringuploadID, PartCreateParamsbody, RequestOptionsoptions?): UploadPart`

**post** `/uploads/{upload_id}/parts`

Adds a [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object. A Part represents a chunk of bytes from the file you are trying to upload.

Each Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.

It is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).

### Parameters

- `uploadID: string`

- `body: PartCreateParams`

  - `data: Uploadable`

    The chunk of bytes for this Part.

### Returns

- `UploadPart`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: string`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: "upload.part"`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: string`

    The ID of the Upload object that this Part was added to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const uploadPart = await client.uploads.parts.create('upload_abc123', {
  data: fs.createReadStream('path/to/file'),
});

console.log(uploadPart.id);
```

## Domain Types

### Upload Part

- `UploadPart`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: string`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: "upload.part"`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: string`

    The ID of the Upload object that this Part was added to.
