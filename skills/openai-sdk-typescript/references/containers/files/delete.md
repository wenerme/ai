## Delete

`client.containers.files.delete(stringfileID, FileDeleteParamsparams, RequestOptionsoptions?): void`

**delete** `/containers/{container_id}/files/{file_id}`

Delete Container File

### Parameters

- `fileID: string`

- `params: FileDeleteParams`

  - `container_id: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.containers.files.delete('file_id', { container_id: 'container_id' });
```
