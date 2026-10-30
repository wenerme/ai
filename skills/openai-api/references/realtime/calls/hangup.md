## Hang up call

**post** `/realtime/calls/{call_id}/hangup`

End an active Realtime API call, whether it was initiated over SIP or
WebRTC.

### Path Parameters

- `call_id: string`

  The identifier for the call. For SIP calls, use the value provided in the
  [`realtime.call.incoming`](/api/reference/resources/webhooks#realtime.call.incoming)
  webhook. For WebRTC sessions, reuse the call ID returned in the `Location`
  header when creating the call with
  [`POST /v1/realtime/calls`](/api/reference/resources/realtime/subresources/calls/methods/create).

### Example

```http
curl https://api.openai.com/v1/realtime/calls/$CALL_ID/hangup \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X POST https://api.openai.com/v1/realtime/calls/$CALL_ID/hangup \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```
