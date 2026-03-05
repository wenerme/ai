## Create

`client.vectorStores.files.create(stringvectorStoreID, FileCreateParamsbody, RequestOptionsoptions?): VectorStoreFile`

**post** `/vector_stores/{vector_store_id}/files`

Create a vector store file by attaching a [File](https://platform.openai.com/docs/api-reference/files) to a [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object).

### Parameters

- `vectorStoreID: string`

- `body: FileCreateParams`

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

- `VectorStoreFile`

  A list of files attached to a vector store.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: LastError | null`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: "server_error" | "unsupported_file" | "invalid_file"`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: string`

      A human-readable description of the error.

  - `object: "vector_store.file"`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: "in_progress" | "completed" | "cancelled" | "failed"`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: number`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: string`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes?: Record<string, string | number | boolean> | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `string`

    - `number`

    - `boolean`

  - `chunking_strategy?: FileChunkingStrategy`

    The strategy used to chunk the file.

    - `StaticFileChunkingStrategyObject`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: number`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: number`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: "static"`

        Always `static`.

        - `"static"`

    - `OtherFileChunkingStrategyObject`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: "other"`

        Always `other`.

        - `"other"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const vectorStoreFile = await client.vectorStores.files.create('vs_abc123', { file_id: 'file_id' });

console.log(vectorStoreFile.id);
```
