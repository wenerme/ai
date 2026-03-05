## Retrieve

`client.containers.files.retrieve(stringfileID, FileRetrieveParamsparams, RequestOptionsoptions?): FileRetrieveResponse`

**get** `/containers/{container_id}/files/{file_id}`

Retrieve Container File

### Parameters

- `fileID: string`

- `params: FileRetrieveParams`

  - `container_id: string`

### Returns

- `FileRetrieveResponse`

  - `id: string`

    Unique identifier for the file.

  - `bytes: number`

    Size of the file in bytes.

  - `container_id: string`

    The container this file belongs to.

  - `created_at: number`

    Unix timestamp (in seconds) when the file was created.

  - `object: "container.file"`

    The type of this object (`container.file`).

    - `"container.file"`

  - `path: string`

    Path of the file in the container.

  - `source: string`

    Source of the file (e.g., `user`, `assistant`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const file = await client.containers.files.retrieve('file_id', { container_id: 'container_id' });

console.log(file.id);
```
