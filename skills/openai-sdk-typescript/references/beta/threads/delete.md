## Delete thread

`client.beta.threads.delete(stringthreadID, RequestOptionsoptions?): ThreadDeleted`

**delete** `/threads/{thread_id}`

Delete a thread.

### Parameters

- `threadID: string`

### Returns

- `ThreadDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "thread.deleted"`

    - `"thread.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const threadDeleted = await client.beta.threads.delete('thread_id');

console.log(threadDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "thread.deleted"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.beta.threads.delete("thread_abc123");

  console.log(response);
}
main();
```

#### Response

```json
{
  "id": "thread_abc123",
  "object": "thread.deleted",
  "deleted": true
}
```
