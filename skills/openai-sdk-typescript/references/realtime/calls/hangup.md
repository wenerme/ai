## Hangup

`client.realtime.calls.hangup(stringcallID, RequestOptionsoptions?): void`

**post** `/realtime/calls/{call_id}/hangup`

End an active Realtime API call, whether it was initiated over SIP or
WebRTC.

### Parameters

- `callID: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.realtime.calls.hangup('call_id');
```
