## Retrieve

`client.containers.files.content.retrieve(stringfileID, ContentRetrieveParamsparams, RequestOptionsoptions?): Response`

**get** `/containers/{container_id}/files/{file_id}/content`

Retrieve Container File Content

### Parameters

- `fileID: string`

- `params: ContentRetrieveParams`

  - `container_id: string`

### Returns

- `unnamed_schema_2 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const content = await client.containers.files.content.retrieve('file_id', {
  container_id: 'container_id',
});

console.log(content);

const data = await content.blob();
console.log(data);
```
