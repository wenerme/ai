## List

`files.list(FileListParams**kwargs)  -> SyncCursorPage[FileObject]`

**get** `/files`

Returns a list of files.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 10,000, and the default is 10,000.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

- `purpose: Optional[str]`

  Only return files with the given purpose.

### Returns

- `class FileObject: …`

  The `File` object represents a document that has been uploaded to OpenAI.

  - `id: str`

    The file identifier, which can be referenced in the API endpoints.

  - `bytes: int`

    The size of the file, in bytes.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the file was created.

  - `filename: str`

    The name of the file.

  - `object: Literal["file"]`

    The object type, which is always `file`.

    - `"file"`

  - `purpose: Literal["assistants", "assistants_output", "batch", 5 more]`

    The intended purpose of the file. Supported values are `assistants`, `assistants_output`, `batch`, `batch_output`, `fine-tune`, `fine-tune-results`, `vision`, and `user_data`.

    - `"assistants"`

    - `"assistants_output"`

    - `"batch"`

    - `"batch_output"`

    - `"fine-tune"`

    - `"fine-tune-results"`

    - `"vision"`

    - `"user_data"`

  - `status: Literal["uploaded", "processed", "error"]`

    Deprecated. The current status of the file, which can be either `uploaded`, `processed`, or `error`.

    - `"uploaded"`

    - `"processed"`

    - `"error"`

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) for when the file will expire.

  - `status_details: Optional[str]`

    Deprecated. For details on why a fine-tuning training file failed validation, see the `error` field on `fine_tuning.job`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.files.list()
page = page.data[0]
print(page)
```
