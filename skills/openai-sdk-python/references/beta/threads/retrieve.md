## Retrieve

`beta.threads.retrieve(strthread_id)  -> Thread`

**get** `/threads/{thread_id}`

Retrieves a thread.

### Parameters

- `thread_id: str`

### Returns

- `class Thread: …`

  Represents a thread that contains [messages](https://platform.openai.com/docs/api-reference/messages).

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the thread was created.

  - `metadata: Optional[Metadata]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `object: Literal["thread"]`

    The object type, which is always `thread`.

    - `"thread"`

  - `tool_resources: Optional[ToolResources]`

    A set of resources that are made available to the assistant's tools in this thread. The resources are specific to the type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.

    - `code_interpreter: Optional[ToolResourcesCodeInterpreter]`

      - `file_ids: Optional[List[str]]`

        A list of [file](https://platform.openai.com/docs/api-reference/files) IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files associated with the tool.

    - `file_search: Optional[ToolResourcesFileSearch]`

      - `vector_store_ids: Optional[List[str]]`

        The [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) attached to this thread. There can be a maximum of 1 vector store attached to the thread.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
thread = client.beta.threads.retrieve(
    "thread_id",
)
print(thread.id)
```
