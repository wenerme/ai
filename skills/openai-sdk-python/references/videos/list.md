## List

`videos.list(VideoListParams**kwargs)  -> SyncConversationCursorPage[Video]`

**get** `/videos`

List recently generated videos for the current project.

### Parameters

- `after: Optional[str]`

  Identifier for the last item from the previous pagination request

- `limit: Optional[int]`

  Number of items to retrieve

- `order: Optional[Literal["asc", "desc"]]`

  Sort order of results by timestamp. Use `asc` for ascending order or `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class Video: …`

  Structured information describing a generated video job.

  - `id: str`

    Unique identifier for the video job.

  - `completed_at: Optional[int]`

    Unix timestamp (seconds) for when the job completed, if finished.

  - `created_at: int`

    Unix timestamp (seconds) for when the job was created.

  - `error: Optional[VideoCreateError]`

    Error payload that explains why generation failed, if applicable.

    - `code: str`

      A machine-readable error code that was returned.

    - `message: str`

      A human-readable description of the error that was returned.

  - `expires_at: Optional[int]`

    Unix timestamp (seconds) for when the downloadable assets expire, if set.

  - `model: VideoModel`

    The video generation model that produced the job.

    - `str`

    - `Literal["sora-2", "sora-2-pro", "sora-2-2025-10-06", 2 more]`

      - `"sora-2"`

      - `"sora-2-pro"`

      - `"sora-2-2025-10-06"`

      - `"sora-2-pro-2025-10-06"`

      - `"sora-2-2025-12-08"`

  - `object: Literal["video"]`

    The object type, which is always `video`.

    - `"video"`

  - `progress: int`

    Approximate completion percentage for the generation task.

  - `prompt: Optional[str]`

    The prompt that was used to generate the video.

  - `remixed_from_video_id: Optional[str]`

    Identifier of the source video if this video is a remix.

  - `seconds: VideoSeconds`

    Duration of the generated clip in seconds.

    - `"4"`

    - `"8"`

    - `"12"`

  - `size: VideoSize`

    The resolution of the generated video.

    - `"720x1280"`

    - `"1280x720"`

    - `"1024x1792"`

    - `"1792x1024"`

  - `status: Literal["queued", "in_progress", "completed", "failed"]`

    Current lifecycle status of the video job.

    - `"queued"`

    - `"in_progress"`

    - `"completed"`

    - `"failed"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.videos.list()
page = page.data[0]
print(page.id)
```
