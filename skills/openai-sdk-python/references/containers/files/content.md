# Content

## Retrieve

`containers.files.content.retrieve(strfile_id, ContentRetrieveParams**kwargs)  -> BinaryResponseContent`

**get** `/containers/{container_id}/files/{file_id}/content`

Retrieve Container File Content

### Parameters

- `container_id: str`

- `file_id: str`

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
content = client.containers.files.content.retrieve(
    file_id="file_id",
    container_id="container_id",
)
print(content)
data = content.read()
print(data)
```
