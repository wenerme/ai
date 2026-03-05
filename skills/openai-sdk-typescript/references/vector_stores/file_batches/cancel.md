## Cancel

`client.vectorStores.fileBatches.cancel(stringbatchID, FileBatchCancelParamsparams, RequestOptionsoptions?): VectorStoreFileBatch`

**post** `/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel`

Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible.

### Parameters

- `batchID: string`

- `params: FileBatchCancelParams`

  - `vector_store_id: string`

    The ID of the vector store that the file batch belongs to.

### Returns

- `VectorStoreFileBatch`

  A batch of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: number`

      The number of files that where cancelled.

    - `completed: number`

      The number of files that have been processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `object: "vector_store.files_batch"`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: "in_progress" | "completed" | "cancelled" | "failed"`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: string`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const vectorStoreFileBatch = await client.vectorStores.fileBatches.cancel('batch_id', {
  vector_store_id: 'vector_store_id',
});

console.log(vectorStoreFileBatch.id);
```
