## Delete video

**delete** `/videos/{video_id}`

Delete video

### Path Parameters

- `video_id: string`

### Returns

- `id: string`

  Identifier of the deleted video.

- `deleted: boolean`

  Indicates that the video resource was deleted.

- `object: "video.deleted"`

  The object type that signals the deletion response.

  - `"video.deleted"`

### Example

```http
curl https://api.openai.com/v1/videos/$VIDEO_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "video.deleted"
}
```
