## Delete file

`client.files.delete(stringfileID, RequestOptionsoptions?): FileDeleted`

**delete** `/files/{file_id}`

Delete a file and remove it from all vector stores.

### Parameters

- `fileID: string`

### Returns

- `FileDeleted`

  - `id: string`

  - `deleted: boolean`

  - `object: "file"`

    - `"file"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const fileDeleted = await client.files.delete('file_id');

console.log(fileDeleted.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "file"
}
```

### Example

```typescript
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const file = await openai.files.delete("file-abc123");

  console.log(file);
}

main();
```

#### Response

```json
{
  "id": "file-abc123",
  "object": "file",
  "deleted": true
}
```
