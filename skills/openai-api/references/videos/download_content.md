## Retrieve video content

**get** `/videos/{video_id}/content`

Retrieve video content

### Path Parameters

- `video_id: string`

### Query Parameters

- `variant: optional "video" or "thumbnail" or "spritesheet"`

  Which downloadable asset to return. Defaults to the MP4 video.

  - `"video"`

  - `"thumbnail"`

  - `"spritesheet"`

### Example

```http
curl https://api.openai.com/v1/videos/$VIDEO_ID/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
