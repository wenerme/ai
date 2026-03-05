## Refer

`client.realtime.calls.refer(stringcallID, CallReferParamsbody, RequestOptionsoptions?): void`

**post** `/realtime/calls/{call_id}/refer`

Transfer an active SIP call to a new destination using the SIP REFER verb.

### Parameters

- `callID: string`

- `body: CallReferParams`

  - `target_uri: string`

    URI that should appear in the SIP Refer-To header. Supports values like
    `tel:+14155550123` or `sip:agent@example.com`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.realtime.calls.refer('call_id', { target_uri: 'tel:+14155550123' });
```
