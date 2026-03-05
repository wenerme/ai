## Retrieve

`client.beta.chatkit.threads.retrieve(stringthreadID, RequestOptionsoptions?): ChatKitThread`

**get** `/chatkit/threads/{thread_id}`

Retrieve a ChatKit thread by its identifier.

### Parameters

- `threadID: string`

### Returns

- `ChatKitThread`

  Represents a ChatKit thread and its current status.

  - `id: string`

    Identifier of the thread.

  - `created_at: number`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: "chatkit.thread"`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: Active | Locked | Closed`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `Active`

      Indicates that a thread is active.

      - `type: "active"`

        Status discriminator that is always `active`.

        - `"active"`

    - `Locked`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: string | null`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: "locked"`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `Closed`

      Indicates that a thread has been closed.

      - `reason: string | null`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: "closed"`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: string | null`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: string`

    Free-form string that identifies your end user who owns the thread.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const chatkitThread = await client.beta.chatkit.threads.retrieve('cthr_123');

console.log(chatkitThread.id);
```
