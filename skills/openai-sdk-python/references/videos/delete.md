## Delete

`videos.delete(strvideo_id)  -> VideoDeleteResponse`

**delete** `/videos/{video_id}`

Permanently delete a completed or failed video and its stored assets.

### Parameters

- `video_id: str`

### Returns

- `class VideoDeleteResponse: …`

  Confirmation payload returned after deleting a video.

  - `id: str`

    Identifier of the deleted video.

  - `deleted: bool`

    Indicates that the video resource was deleted.

  - `object: Literal["video.deleted"]`

    The object type that signals the deletion response.

    - `"video.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
video = client.videos.delete(
    "video_123",
)
print(video.id)
```
