## List

`containers.files.list(strcontainer_id, FileListParams**kwargs)  -> SyncCursorPage[FileListResponse]`

**get** `/containers/{container_id}/files`

List Container files

### Parameters

- `container_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class FileListResponse: …`

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
page = client.containers.files.list(
    container_id="container_id",
)
page = page.data[0]
print(page.id)
```
