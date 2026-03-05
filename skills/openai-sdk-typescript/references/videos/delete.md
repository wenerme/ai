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
