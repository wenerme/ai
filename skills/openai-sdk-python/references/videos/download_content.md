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
