## Delete

`client.beta.threads.messages.delete(stringmessageID, MessageDeleteParamsparams, RequestOptionsoptions?): MessageDeleted`

**delete** `/threads/{thread_id}/messages/{message_id}`

Deletes a message.

### Parameters

- `messageID: string`

- `params: MessageDeleteParams`

  - `thread_id: string`

    The ID of the thread to which this message belongs.

### Returns

- `MessageDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.message.deleted"`

    - `"thread.message.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const messageDeleted = await client.beta.threads.messages.delete('message_id', {
  thread_id: 'thread_id',
});

console.log(messageDeleted.id);
```
