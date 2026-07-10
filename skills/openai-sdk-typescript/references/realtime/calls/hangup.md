## Hang up call

`client.realtime.calls.hangup(stringcallID, RequestOptionsoptions?): void`

**post** `/realtime/calls/{call_id}/hangup`

Hang up call

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
