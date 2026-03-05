## Create

`client.vectorStores.fileBatches.create(stringvectorStoreID, FileBatchCreateParamsbody, RequestOptionsoptions?): VectorStoreFileBatch`

**post** `/vector_stores/{vector_store_id}/file_batches`

Create a vector store file batch.

### Parameters

- `vectorStoreID: string`

- `body: FileBatchCreateParams`

  - `attributes?: Record<string, string | number | boolean> | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `string`

    - `number`

    - `boolean`

  - `chunking_strategy?: FileChunkingStrategyParam`

    The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

    - `AutoFileChunkingStrategyParam`

      The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

      - `type: "auto"`

        Always `auto`.

        - `"auto"`

    - `StaticFileChunkingStrategyObjectParam`

      Customize your own chunking strategy by setting chunk size and chunk overlap.

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

  - `file_ids?: Array<string>`

    A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.  If `attributes` or `chunking_strategy` are provided, they will be  applied to all files in the batch. The maximum batch size is 2000 files. Mutually exclusive with `files`.

  - `files?: Array<File>`

    A list of objects that each include a `file_id` plus optional `attributes` or `chunking_strategy`. Use this when you need to override metadata for specific files. The global `attributes` or `chunking_strategy` will be ignored and must be specified for each file. The maximum batch size is 2000 files. Mutually exclusive with `file_ids`.

    - `file_id: string`

      A [File](https://platform.openai.com/docs/api-reference/files) ID that the vector store should use. Useful for tools like `file_search` that can access files.

    - `attributes?: Record<string, string | number | boolean> | null`

      Set of 16 key-value pairs that can be attached to an object. This can be
      useful for storing additional information about the object in a structured
      format, and querying for objects via API or the dashboard. Keys are strings
      with a maximum length of 64 characters. Values are strings with a maximum
      length of 512 characters, booleans, or numbers.

      - `string`

      - `number`

      - `boolean`

    - `chunking_strategy?: FileChunkingStrategyParam`

      The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

      - `AutoFileChunkingStrategyParam`

        The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

        - `type: "auto"`

          Always `auto`.

          - `"auto"`

      - `StaticFileChunkingStrategyObjectParam`

        Customize your own chunking strategy by setting chunk size and chunk overlap.

        - `static: StaticFileChunkingStrategy`

          - `chunk_overlap_tokens: number`

            The number of tokens that overlap between chunks. The default value is `400`.

            Note that the overlap must not exceed half of `max_chunk_size_tokens`.

          - `max_chunk_size_tokens: number`

            The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

        - `type: "static"`

          Always `static`.

          - `"static"`

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

const vectorStoreFileBatch = await client.vectorStores.fileBatches.create('vs_abc123');

console.log(vectorStoreFileBatch.id);
```
