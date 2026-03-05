## Delete

`files.delete(strfile_id)  -> FileDeleted`

**delete** `/files/{file_id}`

Delete a file and remove it from all vector stores.

### Parameters

- `file_id: str`

### Returns

- `class FileDeleted: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["file"]`

    - `"file"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file_deleted = client.files.delete(
    "file_id",
)
print(file_deleted.id)
```
