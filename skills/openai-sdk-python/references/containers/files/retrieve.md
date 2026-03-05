## Retrieve

`containers.files.retrieve(strfile_id, FileRetrieveParams**kwargs)  -> FileRetrieveResponse`

**get** `/containers/{container_id}/files/{file_id}`

Retrieve Container File

### Parameters

- `container_id: str`

- `file_id: str`

### Returns

- `class FileRetrieveResponse: …`

  - `id: str`

    Unique identifier for the file.

  - `bytes: int`

    Size of the file in bytes.

  - `container_id: str`

    The container this file belongs to.

  - `created_at: int`

    Unix timestamp (in seconds) when the file was created.

  - `object: Literal["container.file"]`

    The type of this object (`container.file`).

    - `"container.file"`

  - `path: str`

    Path of the file in the container.

  - `source: str`

    Source of the file (e.g., `user`, `assistant`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file = client.containers.files.retrieve(
    file_id="file_id",
    container_id="container_id",
)
print(file.id)
```
