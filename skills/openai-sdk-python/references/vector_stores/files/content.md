## Content

`vector_stores.files.content(strfile_id, FileContentParams**kwargs)  -> SyncPage[FileContentResponse]`

**get** `/vector_stores/{vector_store_id}/files/{file_id}/content`

Retrieve the parsed contents of a vector store file.

### Parameters

- `vector_store_id: str`

- `file_id: str`

### Returns

- `class FileContentResponse: …`

  - `text: Optional[str]`

    The text content

  - `type: Optional[str]`

    The content type (currently only `"text"`)

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.files.content(
    file_id="file-abc123",
    vector_store_id="vs_abc123",
)
page = page.data[0]
print(page.text)
```
