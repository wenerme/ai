## Delete

`client.chat.completions.delete(stringcompletionID, RequestOptionsoptions?): ChatCompletionDeleted`

**delete** `/chat/completions/{completion_id}`

Delete a stored chat completion. Only Chat Completions that have been
created with the `store` parameter set to `true` can be deleted.

### Parameters

- `completionID: string`

### Returns

- `ChatCompletionDeleted`

  - `id: string`

    The ID of the chat completion that was deleted.

  - `deleted: boolean`

    Whether the chat completion was deleted.

  - `object: "chat.completion.deleted"`

    The type of object being deleted.

    - `"chat.completion.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatCompletionDeleted = await client.chat.completions.delete('completion_id');

console.log(chatCompletionDeleted.id);
```
