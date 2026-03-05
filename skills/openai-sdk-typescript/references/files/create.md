## Create

`client.files.create(FileCreateParamsbody, RequestOptionsoptions?): FileObject`

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

- `body: FileCreateParams`

  - `file: Uploadable`

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

  - `expires_after?: ExpiresAfter`

    The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.

    - `anchor: "created_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.

      - `"created_at"`

    - `seconds: number`

      The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).

### Returns

- `FileObject`

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

const fileObject = await client.files.create({
  file: fs.createReadStream('fine-tune.jsonl'),
  purpose: 'assistants',
});

console.log(fileObject.id);
```
