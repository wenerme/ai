## Transfer call

**post** `/live/sessions/{session_id}/refer`

Transfer a SIP call to another destination. Supply a nonblank target_uri for the SIP Refer-To header.

### Path Parameters

- `session_id: string`

  Opaque Live session identifier from the creation response or incoming-call webhook. Preserve the returned value unchanged, including its prefix.

### Body Parameters

- `target_uri: string`

  Nonblank URI for the SIP Refer-To header, such as tel:+14155550123 or sip:agent@example.com.

  `pattern: \S`, `minLength: 1`

### Example

```http
curl https://api.openai.com/v1/live/sessions/$SESSION_ID/refer \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "target_uri": "tel:+14155550123"
        }'
```
