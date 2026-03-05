## Delete

`client.vectorStores.files.delete(stringfileID, FileDeleteParamsparams, RequestOptionsoptions?): VectorStoreFileDeleted`

**delete** `/vector_stores/{vector_store_id}/files/{file_id}`

Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted. To delete the file, use the [delete file](https://platform.openai.com/docs/api-reference/files/delete) endpoint.

### Parameters

- `fileID: string`

- `params: FileDeleteParams`

  - `vector_store_id: string`

    The ID of the vector store that the file belongs to.

### Returns

- `VectorStoreFileDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.file.deleted"`

    - `"vector_store.file.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const vectorStoreFileDeleted = await client.vectorStores.files.delete('file_id', {
  vector_store_id: 'vector_store_id',
});

console.log(vectorStoreFileDeleted.id);
```
