## Retrieve

`client.videos.retrieve(stringvideoID, RequestOptionsoptions?): Video`

**get** `/videos/{video_id}`

Fetch the latest metadata for a generated video.

### Parameters

- `videoID: string`

### Returns

- `Video`

  Structured information describing a generated video job.

  - `id: string`

    Unique identifier for the video job.

  - `completed_at: number | null`

    Unix timestamp (seconds) for when the job completed, if finished.

  - `created_at: number`

    Unix timestamp (seconds) for when the job was created.

  - `error: VideoCreateError | null`

    Error payload that explains why generation failed, if applicable.

    - `code: string`

      A machine-readable error code that was returned.

    - `message: string`

      A human-readable description of the error that was returned.

  - `expires_at: number | null`

    Unix timestamp (seconds) for when the downloadable assets expire, if set.

  - `model: VideoModel`

    The video generation model that produced the job.

    - `(string & {})`

    - `"sora-2" | "sora-2-pro" | "sora-2-2025-10-06" | 2 more`

      - `"sora-2"`

      - `"sora-2-pro"`

      - `"sora-2-2025-10-06"`

      - `"sora-2-pro-2025-10-06"`

      - `"sora-2-2025-12-08"`

  - `object: "video"`

    The object type, which is always `video`.

    - `"video"`

  - `progress: number`

    Approximate completion percentage for the generation task.

  - `prompt: string | null`

    The prompt that was used to generate the video.

  - `remixed_from_video_id: string | null`

    Identifier of the source video if this video is a remix.

  - `seconds: (string & {}) | VideoSeconds`

    Duration of the generated clip in seconds. For extensions, this is the stitched total duration.

    - `(string & {})`

    - `VideoSeconds = "4" | "8" | "12"`

      - `"4"`

      - `"8"`

      - `"12"`

  - `size: VideoSize`

    The resolution of the generated video.

    - `"720x1280"`

    - `"1280x720"`

    - `"1024x1792"`

    - `"1792x1024"`

  - `status: "queued" | "in_progress" | "completed" | "failed"`

    Current lifecycle status of the video job.

    - `"queued"`

    - `"in_progress"`

    - `"completed"`

    - `"failed"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const video = await client.videos.retrieve('video_123');

console.log(video.id);
```
