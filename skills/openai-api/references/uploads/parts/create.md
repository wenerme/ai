## Add upload part

**post** `/uploads/{upload_id}/parts`

Add upload part

### Path Parameters

- `upload_id: string`

### Returns

- `UploadPart object { id, created_at, object, upload_id }`

  The upload Part represents a chunk of bytes we can add to an Upload object.

  - `id: string`

    The upload Part unique identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the Part was created.

  - `object: "upload.part"`

    The object type, which is always `upload.part`.

    - `"upload.part"`

  - `upload_id: string`

    The ID of the Upload object that this Part was added to.

### Example

```http
curl https://api.openai.com/v1/uploads/$UPLOAD_ID/parts \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'data=@/path/to/data'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "upload.part",
  "upload_id": "upload_id"
}
```

### Example

```http
curl https://api.openai.com/v1/uploads/upload_abc123/parts
  -F data="aHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS91cGxvYWRz..."
```

#### Response

```json
{
  "id": "part_def456",
  "object": "upload.part",
  "created_at": 1719185911,
  "upload_id": "upload_abc123"
}
```
