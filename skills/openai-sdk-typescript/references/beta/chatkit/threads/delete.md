## Delete

`client.beta.chatkit.threads.delete(stringthreadID, RequestOptionsoptions?): ThreadDeleteResponse`

**delete** `/chatkit/threads/{thread_id}`

Delete a ChatKit thread along with its items and stored attachments.

### Parameters

- `threadID: string`

### Returns

- `ThreadDeleteResponse`

  Confirmation payload returned after deleting a thread.

  - `id: string`

    Identifier of the deleted thread.

  - `deleted: boolean`

    Indicates that the thread has been deleted.

  - `object: "chatkit.thread.deleted"`

    Type discriminator that is always `chatkit.thread.deleted`.

    - `"chatkit.thread.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const thread = await client.beta.chatkit.threads.delete('cthr_123');

console.log(thread.id);
```
