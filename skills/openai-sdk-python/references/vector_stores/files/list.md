## List

`vector_stores.files.list(strvector_store_id, FileListParams**kwargs)  -> SyncCursorPage[VectorStoreFile]`

**get** `/vector_stores/{vector_store_id}/files`

Returns a list of vector store files.

### Parameters

- `vector_store_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: Optional[str]`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `filter: Optional[Literal["in_progress", "completed", "failed", "cancelled"]]`

  Filter by file status. One of `in_progress`, `completed`, `failed`, `cancelled`.

  - `"in_progress"`

  - `"completed"`

  - `"failed"`

  - `"cancelled"`

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class VectorStoreFile: …`

  A list of files attached to a vector store.

  - `id: str`

    The identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the vector store file was created.

  - `last_error: Optional[LastError]`

    The last error associated with this vector store file. Will be `null` if there are no errors.

    - `code: Literal["server_error", "unsupported_file", "invalid_file"]`

      One of `server_error`, `unsupported_file`, or `invalid_file`.

      - `"server_error"`

      - `"unsupported_file"`

      - `"invalid_file"`

    - `message: str`

      A human-readable description of the error.

  - `object: Literal["vector_store.file"]`

    The object type, which is always `vector_store.file`.

    - `"vector_store.file"`

  - `status: Literal["in_progress", "completed", "cancelled", "failed"]`

    The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use.

    - `"in_progress"`

    - `"completed"`

    - `"cancelled"`

    - `"failed"`

  - `usage_bytes: int`

    The total vector store usage in bytes. Note that this may be different from the original file size.

  - `vector_store_id: str`

    The ID of the [vector store](https://platform.openai.com/docs/api-reference/vector-stores/object) that the [File](https://platform.openai.com/docs/api-reference/files) is attached to.

  - `attributes: Optional[Dict[str, Union[str, float, bool]]]`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `str`

    - `float`

    - `bool`

  - `chunking_strategy: Optional[FileChunkingStrategy]`

    The strategy used to chunk the file.

    - `class StaticFileChunkingStrategyObject: …`

      - `static: StaticFileChunkingStrategy`

        - `chunk_overlap_tokens: int`

          The number of tokens that overlap between chunks. The default value is `400`.

          Note that the overlap must not exceed half of `max_chunk_size_tokens`.

        - `max_chunk_size_tokens: int`

          The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

      - `type: Literal["static"]`

        Always `static`.

        - `"static"`

    - `class OtherFileChunkingStrategyObject: …`

      This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

      - `type: Literal["other"]`

        Always `other`.

        - `"other"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.vector_stores.files.list(
    vector_store_id="vector_store_id",
)
page = page.data[0]
print(page.id)
```
