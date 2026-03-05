## Retrieve Content

`files.retrieve_content(strfile_id)  -> FileContent`

**get** `/files/{file_id}/content`

Returns the contents of the specified file.

### Parameters

- `file_id: str`

### Returns

- `str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file_content = client.files.retrieve_content(
    "file_id",
)
print(file_content)
```
