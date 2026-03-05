## Connect

`client.responses.connect(RequestOptionsoptions?): void`

**** ``

Connect to a persistent Responses API WebSocket. Send `response.create` events and receive response stream events over the socket.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.responses.connect();
```
