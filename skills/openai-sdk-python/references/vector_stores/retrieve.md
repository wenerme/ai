## Retrieve vector store

`vector_stores.retrieve(strvector_store_id)  -> VectorStore`

**get** `/vector_stores/{vector_store_id}`

Retrieves a vector store.

### Parameters

- `vector_store_id: str`

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
vector_store = client.vector_stores.retrieve(
    "vector_store_id",
)
print(vector_store.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "file_counts": {
    "cancelled": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0,
    "total": 0
  },
  "last_active_at": 0,
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vector_store",
  "status": "expired",
  "usage_bytes": 0,
  "expires_after": {
    "anchor": "last_active_at",
    "days": 1
  },
  "expires_at": 0
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

vector_store = client.vector_stores.retrieve(
  vector_store_id="vs_abc123"
)
print(vector_store)
```

#### Response

```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1699061776
}
```
