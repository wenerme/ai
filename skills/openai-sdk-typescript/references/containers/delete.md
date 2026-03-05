## Delete

`client.containers.delete(stringcontainerID, RequestOptionsoptions?): void`

**delete** `/containers/{container_id}`

Delete Container

### Parameters

- `containerID: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.containers.delete('container_id');
```
