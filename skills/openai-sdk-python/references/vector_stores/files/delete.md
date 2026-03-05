## Delete

`vector_stores.files.delete(strfile_id, FileDeleteParams**kwargs)  -> VectorStoreFileDeleted`

**delete** `/vector_stores/{vector_store_id}/files/{file_id}`

Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://platform.openai.com/docs/api-reference/files/delete) endpoint.

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
