## Content

`files.content(strfile_id)  -> BinaryResponseContent`

**get** `/files/{file_id}/content`

Returns the contents of the specified file.

### Parameters

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
response = client.files.content(
    "file_id",
)
print(response)
content = response.read()
print(content)
```
