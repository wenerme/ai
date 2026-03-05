## Content

`client.vectorStores.files.content(stringfileID, FileContentParamsparams, RequestOptionsoptions?): Page<FileContentResponse>`

**get** `/vector_stores/{vector_store_id}/files/{file_id}/content`

Retrieve the parsed contents of a vector store file.

### Parameters

- `fileID: string`

- `params: FileContentParams`

  - `vector_store_id: string`

    The ID of the vector store.

### Returns

- `FileContentResponse`

  - `text?: string`

    The text content

  - `type?: string`

    The content type (currently only `"text"`)

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const fileContentResponse of client.vectorStores.files.content('file-abc123', {
  vector_store_id: 'vs_abc123',
})) {
  console.log(fileContentResponse.text);
}
```
