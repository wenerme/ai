## Delete

`client.responses.delete(stringresponseID, RequestOptionsoptions?): void`

**delete** `/responses/{response_id}`

Deletes a model response with the given ID.

### Parameters

- `responseID: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.responses.delete('resp_677efb5139a88190b512bc3fef8e535d');
```
