## Content

`client.files.content(stringfileID, RequestOptionsoptions?): Response`

**get** `/files/{file_id}/content`

Returns the contents of the specified file.

### Parameters

- `fileID: string`

### Returns

- `unnamed_schema_0 = Response`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const response = await client.files.content('file_id');

console.log(response);

const content = await response.blob();
console.log(content);
```
