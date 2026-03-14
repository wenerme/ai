## Create Character

**post** `/videos/characters`

Create a character from an uploaded video.

### Returns

- `id: string`

  Identifier for the character creation cameo.

- `created_at: number`

  Unix timestamp (in seconds) when the character was created.

- `name: string`

  Display name for the character.

### Example

```http
curl https://api.openai.com/v1/videos/characters \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F name=x \
    -F 'video=@/path/to/video'
```
