## Reject call

**post** `/live/sessions/{session_id}/reject`

Reject an incoming SIP call. Send a required SIP rejection status_code between 300 and 699.

### Path Parameters

- `session_id: string`

### Body Parameters

- `status_code: number`

  SIP rejection status sent to the caller. This field is required.

### Example

```http
curl https://api.openai.com/v1/live/sessions/$SESSION_ID/reject \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "status_code": 486
        }'
```
