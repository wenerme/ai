## Delete vector store file

`vector_stores.files.delete(strfile_id, FileDeleteParams**kwargs)  -> VectorStoreFileDeleted`

**delete** `/vector_stores/{vector_store_id}/files/{file_id}`

Delete vector store file

### Parameters

- `vector_store_id: str`

- `file_id: str`

### Returns

- `class VectorStoreFileDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.file.deleted"]`

    - `"vector_store.file.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_file_deleted = client.vector_stores.files.delete(
    file_id="file_id",
    vector_store_id="vector_store_id",
)
print(vector_store_file_deleted.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vector_store.file.deleted"
}
```

### Example

```python
from openai import OpenAI
client = OpenAI()

deleted_vector_store_file = client.vector_stores.files.delete(
    vector_store_id="vs_abc123",
    file_id="file-abc123"
)
print(deleted_vector_store_file)
```

#### Response

```json
{
  id: "file-abc123",
  object: "vector_store.file.deleted",
  deleted: true
}
```
