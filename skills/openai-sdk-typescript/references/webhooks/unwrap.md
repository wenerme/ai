## Unwrap

`client.webhooks.unwrap(RequestOptionsoptions?): void`

**** ``

Validates that the given payload was sent by OpenAI and parses the payload.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.webhooks.unwrap();
```
