## Delete

`vector_stores.delete(strvector_store_id)  -> VectorStoreDeleted`

**delete** `/vector_stores/{vector_store_id}`

Delete a vector store.

### Parameters

- `vector_store_id: str`

### Returns

- `class VectorStoreDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["vector_store.deleted"]`

    - `"vector_store.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
vector_store_deleted = client.vector_stores.delete(
    "vector_store_id",
)
print(vector_store_deleted.id)
```
