# Videos

## Create

`client.videos.create(VideoCreateParamsbody, RequestOptionsoptions?): Video`

**post** `/videos`

Create a new video generation job from a prompt and optional reference assets.

### Parameters

- `body: VideoCreateParams`

  - `prompt: string`

    Text prompt that describes the video to generate.

  - `input_reference?: Uploadable`

    Optional multipart reference asset that guides generation.

  - `model?: VideoModel`

    The video generation model to use (allowed values: sora-2, sora-2-pro). Defaults to `sora-2`.

    - `(string & {})`

    - `"sora-2" | "sora-2-pro" | "sora-2-2025-10-06" | 2 more`

      - `"sora-2"`

      - `"sora-2-pro"`

      - `"sora-2-2025-10-06"`

      - `"sora-2-pro-2025-10-06"`

      - `"sora-2-2025-12-08"`

  - `seconds?: VideoSeconds`

    Clip duration in seconds (allowed values: 4, 8, 12). Defaults to 4 seconds.

    - `"4"`

    - `"8"`

    - `"12"`

  - `size?: VideoSize`

    Output resolution formatted as width x height (allowed values: 720x1280, 1280x720, 1024x1792, 1792x1024). Defaults to 720x1280.

    - `"720x1280"`

    - `"1280x720"`

    - `"1024x1792"`

    - `"1792x1024"`

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

const video = await client.videos.create({ prompt: 'x' });

console.log(video.id);
```

## List

`client.videos.list(VideoListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Video>`

**get** `/videos`

List recently generated videos for the current project.

### Parameters

- `query: VideoListParams`

  - `after?: string`

    Identifier for the last item from the previous pagination request

  - `limit?: number`

    Number of items to retrieve

  - `order?: "asc" | "desc"`

    Sort order of results by timestamp. Use `asc` for ascending order or `desc` for descending order.

    - `"asc"`

    - `"desc"`

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

// Automatically fetches more pages as needed.
for await (const video of client.videos.list()) {
  console.log(video.id);
}
```

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

## Delete

`client.videos.delete(stringvideoID, RequestOptionsoptions?): VideoDeleteResponse`

**delete** `/videos/{video_id}`

Permanently delete a completed or failed video and its stored assets.

### Parameters

- `videoID: string`

### Returns

- `VideoDeleteResponse`

  Confirmation payload returned after deleting a video.

  - `id: string`

    Identifier of the deleted video.

  - `deleted: boolean`

    Indicates that the video resource was deleted.

  - `object: "video.deleted"`

    The object type that signals the deletion response.

    - `"video.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const video = await client.videos.delete('video_123');

console.log(video.id);
```

## Remix

`client.videos.remix(stringvideoID, VideoRemixParamsbody, RequestOptionsoptions?): Video`

**post** `/videos/{video_id}/remix`

Create a remix of a completed video using a refreshed prompt.

### Parameters

- `videoID: string`

- `body: VideoRemixParams`

  - `prompt: string`

    Updated text prompt that directs the remix generation.

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

const video = await client.videos.remix('video_123', { prompt: 'x' });

console.log(video.id);
```

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

## Domain Types

### Video

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

### Video Create Error

- `VideoCreateError`

  An error that occurred while generating the response.

  - `code: string`

    A machine-readable error code that was returned.

  - `message: string`

    A human-readable description of the error that was returned.

### Video Model

- `VideoModel = (string & {}) | "sora-2" | "sora-2-pro" | "sora-2-2025-10-06" | 2 more`

  - `(string & {})`

  - `"sora-2" | "sora-2-pro" | "sora-2-2025-10-06" | 2 more`

    - `"sora-2"`

    - `"sora-2-pro"`

    - `"sora-2-2025-10-06"`

    - `"sora-2-pro-2025-10-06"`

    - `"sora-2-2025-12-08"`

### Video Seconds

- `VideoSeconds = "4" | "8" | "12"`

  - `"4"`

  - `"8"`

  - `"12"`

### Video Size

- `VideoSize = "720x1280" | "1280x720" | "1024x1792" | "1792x1024"`

  - `"720x1280"`

  - `"1280x720"`

  - `"1024x1792"`

  - `"1792x1024"`
