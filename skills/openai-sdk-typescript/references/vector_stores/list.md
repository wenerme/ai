## List

`client.vectorStores.list(VectorStoreListParamsquery?, RequestOptionsoptions?): CursorPage<VectorStore>`

**get** `/vector_stores`

Returns a list of vector stores.

### Parameters

- `query: VectorStoreListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `VectorStore`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number | null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata | null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" | "in_progress" | "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after?: ExpiresAfter`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const vectorStore of client.vectorStores.list()) {
  console.log(vectorStore.id);
}
```
