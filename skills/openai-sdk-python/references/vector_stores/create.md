## Create

`vector_stores.create(VectorStoreCreateParams**kwargs)  -> VectorStore`

**post** `/vector_stores`

Create a vector store.

### Parameters

- `chunking_strategy: Optional[FileChunkingStrategyParam]`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `class AutoFileChunkingStrategyParam: …`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: Literal["auto"]`

      Always `auto`.

      - `"auto"`

  - `class StaticFileChunkingStrategyObjectParam: …`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: int`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: int`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: Literal["static"]`

      Always `static`.

      - `"static"`

- `description: Optional[str]`

  A description for the vector store. Can be used to describe the vector store's purpose.

- `expires_after: Optional[ExpiresAfter]`

  The expiration policy for a vector store.

  - `anchor: Literal["last_active_at"]`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

    - `"last_active_at"`

  - `days: int`

    The number of days after the anchor time that the vector store will expire.

- `file_ids: Optional[SequenceNotStr[str]]`

  A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.

- `metadata: Optional[Metadata]`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: Optional[str]`

  The name of the vector store.

### Returns

- `class VectorStore: …`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that were cancelled.

    - `completed: int`

      The number of files that have been successfully processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `last_active_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: str`

    The name of the vector store.

  - `object: Literal["vector_store"]`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: Literal["expired", "in_progress", "completed"]`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: int`

    The total number of bytes used by the files in the vector store.

  - `expires_after: Optional[ExpiresAfter]`

    The expiration policy for a vector store.

    - `anchor: Literal["last_active_at"]`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: int`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store = client.vector_stores.create()
print(vector_store.id)
```
