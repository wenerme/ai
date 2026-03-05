## Delete

`client.conversations.items.delete(stringitemID, ItemDeleteParamsparams, RequestOptionsoptions?): Conversation`

**delete** `/conversations/{conversation_id}/items/{item_id}`

Delete an item from a conversation with the given IDs.

### Parameters

- `itemID: string`

- `params: ItemDeleteParams`

  - `conversation_id: string`

    The ID of the conversation that contains the item.

### Returns

- `Conversation`

  - `id: string`

    The unique ID of the conversation.

  - `created_at: number`

    The time at which the conversation was created, measured in seconds since the Unix epoch.

  - `metadata: unknown`

    Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.
    Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.

  - `object: "conversation"`

    The object type, which is always `conversation`.

    - `"conversation"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const conversation = await client.conversations.items.delete('msg_abc', {
  conversation_id: 'conv_123',
});

console.log(conversation.id);
```
