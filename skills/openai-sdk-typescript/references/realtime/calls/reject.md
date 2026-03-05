## Reject

`client.realtime.calls.reject(stringcallID, CallRejectParamsbody?, RequestOptionsoptions?): void`

**post** `/realtime/calls/{call_id}/reject`

Decline an incoming SIP call by returning a SIP status code to the caller.

### Parameters

- `callID: string`

- `body: CallRejectParams`

  - `status_code?: number`

    SIP response code to send back to the caller. Defaults to `603` (Decline)
    when omitted.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.realtime.calls.reject('call_id');
```
