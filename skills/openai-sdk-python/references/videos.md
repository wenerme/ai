# Videos

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

## Edit

`videos.edit(VideoEditParams**kwargs)  -> Video`

**post** `/videos/edits`

Create a new video generation job by editing a source video or existing generated video.

### Parameters

- `prompt: str`

  Text prompt that describes how to edit the source video.

- `video: Video`

  Reference to the completed video to edit.

  - `FileTypes`

    Reference to the completed video to edit.

  - `class VideoVideoReferenceInputParam: …`

    Reference to the completed video.

    - `id: str`

      The identifier of the completed video.

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
video = client.videos.edit(
    prompt="x",
    video=b"raw file contents",
)
print(video.id)
```

## Extend

`videos.extend(VideoExtendParams**kwargs)  -> Video`

**post** `/videos/extensions`

Create an extension of a completed video.

### Parameters

- `prompt: str`

  Updated text prompt that directs the extension generation.

- `seconds: VideoSeconds`

  Length of the newly generated extension segment in seconds (allowed values: 4, 8, 12, 16, 20).

  - `"4"`

  - `"8"`

  - `"12"`

- `video: Video`

  Reference to the completed video.

  - `class VideoVideoReferenceInputParam: …`

    Reference to the completed video.

    - `id: str`

      The identifier of the completed video.

  - `FileTypes`

    Reference to the completed video to extend.

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
video = client.videos.extend(
    prompt="x",
    seconds="4",
    video={
        "id": "video_123"
    },
)
print(video.id)
```

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
page = client.videos.list()
page = page.data[0]
print(page.id)
```

## Retrieve

`videos.retrieve(strvideo_id)  -> Video`

**get** `/videos/{video_id}`

Fetch the latest metadata for a generated video.

### Parameters

- `video_id: str`

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
video = client.videos.retrieve(
    "video_123",
)
print(video.id)
```

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

## Remix

`videos.remix(strvideo_id, VideoRemixParams**kwargs)  -> Video`

**post** `/videos/{video_id}/remix`

Create a remix of a completed video using a refreshed prompt.

### Parameters

- `video_id: str`

- `prompt: str`

  Updated text prompt that directs the remix generation.

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
video = client.videos.remix(
    video_id="video_123",
    prompt="x",
)
print(video.id)
```

## Download Content

`videos.download_content(strvideo_id, VideoDownloadContentParams**kwargs)  -> BinaryResponseContent`

**get** `/videos/{video_id}/content`

Download the generated video bytes or a derived preview asset.

Streams the rendered video content for the specified video job.

### Parameters

- `video_id: str`

- `variant: Optional[Literal["video", "thumbnail", "spritesheet"]]`

  Which downloadable asset to return. Defaults to the MP4 video.

  - `"video"`

  - `"thumbnail"`

  - `"spritesheet"`

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
response = client.videos.download_content(
    video_id="video_123",
)
print(response)
content = response.read()
print(content)
```

## Domain Types

### Video

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

### Video Create Error

- `class VideoCreateError: …`

  An error that occurred while generating the response.

  - `code: str`

    A machine-readable error code that was returned.

  - `message: str`

    A human-readable description of the error that was returned.

### Video Model

- `Union[str, Literal["sora-2", "sora-2-pro", "sora-2-2025-10-06", 2 more]]`

  - `str`

  - `Literal["sora-2", "sora-2-pro", "sora-2-2025-10-06", 2 more]`

    - `"sora-2"`

    - `"sora-2-pro"`

    - `"sora-2-2025-10-06"`

    - `"sora-2-pro-2025-10-06"`

    - `"sora-2-2025-12-08"`

### Video Seconds

- `Literal["4", "8", "12"]`

  - `"4"`

  - `"8"`

  - `"12"`

### Video Size

- `Literal["720x1280", "1280x720", "1024x1792", "1792x1024"]`

  - `"720x1280"`

  - `"1280x720"`

  - `"1024x1792"`

  - `"1792x1024"`

# Character

## Create

`videos.character.create(CharacterCreateParams**kwargs)  -> CharacterCreateResponse`

**post** `/videos/characters`

Create a character from an uploaded video.

### Parameters

- `name: str`

  Display name for this API character.

- `video: FileTypes`

  Video file used to create a character.

### Returns

- `class CharacterCreateResponse: …`

  - `id: Optional[str]`

    Identifier for the character creation cameo.

  - `created_at: int`

    Unix timestamp (in seconds) when the character was created.

  - `name: Optional[str]`

    Display name for the character.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
character = client.videos.character.create(
    name="x",
    video=b"raw file contents",
)
print(character.id)
```

## Get

`videos.character.get(strcharacter_id)  -> CharacterGetResponse`

**get** `/videos/characters/{character_id}`

Fetch a character.

### Parameters

- `character_id: str`

### Returns

- `class CharacterGetResponse: …`

  - `id: Optional[str]`

    Identifier for the character creation cameo.

  - `created_at: int`

    Unix timestamp (in seconds) when the character was created.

  - `name: Optional[str]`

    Display name for the character.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
character = client.videos.character.get(
    "char_123",
)
print(character.id)
```
