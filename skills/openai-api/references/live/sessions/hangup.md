## Hang up session

**post** `/live/sessions/{session_id}/hangup`

End a SIP call identified by session_id.

### Path Parameters

- `session_id: string`

### Example

```http
curl https://api.openai.com/v1/live/sessions/$SESSION_ID/hangup \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
