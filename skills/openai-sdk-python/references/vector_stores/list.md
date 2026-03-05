## List

`vector_stores.list(VectorStoreListParams**kwargs)  -> SyncCursorPage[VectorStore]`

**get** `/vector_stores`

Returns a list of vector stores.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

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
page = client.vector_stores.list()
page = page.data[0]
print(page.id)
```
