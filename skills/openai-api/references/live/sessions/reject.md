## Reject call

**post** `/live/sessions/{session_id}/reject`

Reject an incoming SIP call. Send a required SIP rejection status_code between 300 and 699.

### Path Parameters

- `session_id: string`

  Opaque Live session identifier from the creation response or incoming-call webhook. Preserve the returned value unchanged, including its prefix.

### Body Parameters

Content type: `application/json`

- `status_code: integer`

  SIP rejection status sent to the caller. This field is required.

  `minimum: 300`, `maximum: 699`

### Example

```http
curl https://api.openai.com/v1/live/sessions/$SESSION_ID/reject \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "status_code": 486
        }'
```
