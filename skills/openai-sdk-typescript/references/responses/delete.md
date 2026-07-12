## Delete a model response

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

### Example

```typescript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.delete("resp_123");
console.log(response);
```

#### Response

```json
{
  "id": "resp_6786a1bec27481909a17d673315b29f6",
  "object": "response",
  "deleted": true
}
```
