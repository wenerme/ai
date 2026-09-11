## Download recording

**get** `/live/sessions/{session_id}/content`

Get Live session content

### Path Parameters

- `session_id: string`

  The ID of the stored Live session to download. Use the session ID returned when the session started with storage enabled.

### Example

```http
curl https://api.openai.com/v1/live/sessions/$SESSION_ID/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
