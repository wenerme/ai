## Download Content

`client.videos.downloadContent(stringvideoID, VideoDownloadContentParamsquery?, RequestOptionsoptions?): Response`

**get** `/videos/{video_id}/content`

Download the generated video bytes or a derived preview asset.

Streams the rendered video content for the specified video job.

### Parameters

- `videoID: string`

- `query: VideoDownloadContentParams`

  - `variant?: "video" | "thumbnail" | "spritesheet"`

    Which downloadable asset to return. Defaults to the MP4 video.

    - `"video"`

    - `"thumbnail"`

    - `"spritesheet"`

### Returns

- `unnamed_schema_5 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.videos.downloadContent('video_123');

console.log(response);

const content = await response.blob();
console.log(content);
```
