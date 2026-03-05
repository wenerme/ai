## Retrieve

`vector_stores.file_batches.retrieve(strbatch_id, FileBatchRetrieveParams**kwargs)  -> VectorStoreFileBatch`

**get** `/vector_stores/{vector_store_id}/file_batches/{batch_id}`

Retrieves a vector store file batch.

### Parameters

- `vector_store_id: str`

- `batch_id: str`

### Returns

- `class VectorStoreFileBatch: …`

  A batch of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store files batch was created.

  - `file_counts: FileCounts`

    - `cancelled: int`

      The number of files that where cancelled.

    - `completed: int`

      The number of files that have been processed.

    - `failed: int`

      The number of files that have failed to process.

    - `in_progress: int`

      The number of files that are currently being processed.

    - `total: int`

      The total number of files.

  - `object: Literal["vector_store.files_batch"]`

    The object type, which is always `vector_store.file_batch`.

    - `"vector_store.files_batch"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_batch = client.vector_stores.file_batches.retrieve(
    batch_id="vsfb_abc123",
    vector_store_id="vs_abc123",
)
print(vector_store_file_batch.id)
```
