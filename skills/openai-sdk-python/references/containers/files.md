# Files

## List container files

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

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "bytes": 0,
      "container_id": "container_id",
      "created_at": 0,
      "object": "container.file",
      "path": "path",
      "source": "source"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

## Create container file

`containers.files.create(strcontainer_id, FileCreateParams**kwargs)  -> FileCreateResponse`

**post** `/containers/{container_id}/files`

Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.

### Parameters

- `container_id: str`

- `file: Optional[FileTypes]`

  The File object (not file name) to be uploaded.

- `file_id: Optional[str]`

  Name of the file to create.

### Returns

- `class FileCreateResponse: …`

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
file = client.containers.files.create(
    container_id="container_id",
)
print(file.id)
```

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "container_id": "container_id",
  "created_at": 0,
  "object": "container.file",
  "path": "path",
  "source": "source"
}
```

## Retrieve container file

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

#### Response

```json
{
  "id": "id",
  "bytes": 0,
  "container_id": "container_id",
  "created_at": 0,
  "object": "container.file",
  "path": "path",
  "source": "source"
}
```

## Delete a container file

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

## Domain Types

### File List Response

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

### File Create Response

- `class FileCreateResponse: …`

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

### File Retrieve Response

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

# Content

## Retrieve container file content

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
