## Retrieve

`client.conversations.retrieve(stringconversationID, RequestOptionsoptions?): Conversation`

**get** `/conversations/{conversation_id}`

Get a conversation

### Parameters

- `conversationID: string`

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

const conversation = await client.conversations.retrieve('conv_123');

console.log(conversation.id);
```
