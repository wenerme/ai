## Delete vector store

`client.vectorStores.delete(stringvectorStoreID, RequestOptionsoptions?): VectorStoreDeleted`

**delete** `/vector_stores/{vector_store_id}`

Delete a vector store.

### Parameters

- `vectorStoreID: string`

### Returns

- `VectorStoreDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.deleted"`

    - `"vector_store.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const vectorStoreDeleted = await client.vectorStores.delete('vector_store_id');

console.log(vectorStoreDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vector_store.deleted"
}
```

### Example

```typescript
import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
  const deletedVectorStore = await openai.vectorStores.delete(
    "vs_abc123"
  );
  console.log(deletedVectorStore);
}

main();
```

#### Response

```json
{
  id: "vs_abc123",
  object: "vector_store.deleted",
  deleted: true
}
```
