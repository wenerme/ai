## Create

`videos.create(VideoCreateParams**kwargs)  -> Video`

**post** `/videos`

Create a new video generation job from a prompt and optional reference assets.

### Parameters

- `prompt: str`

  Text prompt that describes the video to generate.

- `input_reference: Optional[InputReference]`

  Optional reference asset upload or reference object that guides generation.

  - `FileTypes`

    Optional reference asset upload or reference object that guides generation.

  - `class InputReferenceImageRefParam2: …`

    - `file_id: Optional[str]`

    - `image_url: Optional[str]`

      A fully qualified URL or base64-encoded data URL.

- `model: Optional[VideoModelParam]`

  The video generation model to use (allowed values: sora-2, sora-2-pro). Defaults to `sora-2`.

  - `str`

  - `Literal["sora-2", "sora-2-pro", "sora-2-2025-10-06", 2 more]`

    - `"sora-2"`

    - `"sora-2-pro"`

    - `"sora-2-2025-10-06"`

    - `"sora-2-pro-2025-10-06"`

    - `"sora-2-2025-12-08"`

- `seconds: Optional[VideoSeconds]`

  Clip duration in seconds (allowed values: 4, 8, 12). Defaults to 4 seconds.

  - `"4"`

  - `"8"`

  - `"12"`

- `size: Optional[VideoSize]`

  Output resolution formatted as width x height (allowed values: 720x1280, 1280x720, 1024x1792, 1792x1024). Defaults to 720x1280.

  - `"720x1280"`

  - `"1280x720"`

  - `"1024x1792"`

  - `"1792x1024"`

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

  - `seconds: Union[str, VideoSeconds]`

    Duration of the generated clip in seconds. For extensions, this is the stitched total duration.

    - `str`

    - `Literal["4", "8", "12"]`

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
video = client.videos.create(
    prompt="x",
)
print(video.id)
```
