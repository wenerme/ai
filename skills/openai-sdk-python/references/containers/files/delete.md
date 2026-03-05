## Delete

`containers.files.delete(strfile_id, FileDeleteParams**kwargs)`

**delete** `/containers/{container_id}/files/{file_id}`

Delete Container File

### Parameters

- `container_id: str`

- `file_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.containers.files.delete(
    file_id="file_id",
    container_id="container_id",
)
```
