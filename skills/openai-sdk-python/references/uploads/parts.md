# Parts

## Create

`uploads.parts.create(strupload_id, PartCreateParams**kwargs)  -> UploadPart`

**post** `/uploads/{upload_id}/parts`

Adds a [Part](https://platform.openai.com/docs/api-reference/uploads/part-object) to an [Upload](https://platform.openai.com/docs/api-reference/uploads/object) object. A Part represents a chunk of bytes from the file you are trying to upload.

Each Part can be at most 64 MB, and you can add Parts until you hit the Upload maximum of 8 GB.

It is possible to add multiple Parts in parallel. You can decide the intended order of the Parts when you [complete the Upload](https://platform.openai.com/docs/api-reference/uploads/complete).

### Parameters

- `upload_id: str`

- `data: FileTypes`

  The chunk of bytes for this Part.

### Returns

- `class UploadPart: …`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: str`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: Literal["upload.part"]`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: str`

    The ID of the Upload object that this Part was added to.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
upload_part = client.uploads.parts.create(
    upload_id="upload_abc123",
    data=b"raw file contents",
)
print(upload_part.id)
```

## Domain Types

### Upload Part

- `class UploadPart: …`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: str`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: int`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: Literal["upload.part"]`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: str`

    The ID of the Upload object that this Part was added to.
