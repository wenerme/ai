## Delete

`client.beta.assistants.delete(stringassistantID, RequestOptionsoptions?): AssistantDeleted`

**delete** `/assistants/{assistant_id}`

Delete an assistant.

### Parameters

- `assistantID: string`

### Returns

- `AssistantDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "assistant.deleted"`

    - `"assistant.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const assistantDeleted = await client.beta.assistants.delete('assistant_id');

console.log(assistantDeleted.id);
```
