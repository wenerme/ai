## Delete

`client.conversations.delete(stringconversationID, RequestOptionsoptions?): ConversationDeletedResource`

**delete** `/conversations/{conversation_id}`

Delete a conversation. Items in the conversation will not be deleted.

### Parameters

- `conversationID: string`

### Returns

- `ConversationDeletedResource`

  - `id: string`

  - `deleted: boolean`

  - `object: "conversation.deleted"`

    - `"conversation.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const conversationDeletedResource = await client.conversations.delete('conv_123');

console.log(conversationDeletedResource.id);
```
