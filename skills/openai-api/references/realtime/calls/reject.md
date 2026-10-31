## Reject call

**post** `/realtime/calls/{call_id}/reject`

Decline an incoming SIP call by returning a SIP status code to the caller.

### Path Parameters

- `call_id: string`

  The identifier for the call provided in the
  [`realtime.call.incoming`](/api/reference/resources/webhooks#realtime.call.incoming)
  webhook.

### Body Parameters

Content type: `application/json`

- `status_code: optional integer`

  SIP response code to send back to the caller. Defaults to `603` (Decline)
  when omitted.

### Example

```http
curl https://api.openai.com/v1/realtime/calls/$CALL_ID/reject \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X POST https://api.openai.com/v1/realtime/calls/$CALL_ID/reject \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status_code": 486}'
```
