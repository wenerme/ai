## Create

`client.containers.files.create(stringcontainerID, FileCreateParamsbody, RequestOptionsoptions?): FileCreateResponse`

**post** `/containers/{container_id}/files`

Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.

### Parameters

- `containerID: string`

- `body: FileCreateParams`

  - `file?: Uploadable`

    The File object (not file name) to be uploaded.

  - `file_id?: string`

    Name of the file to create.

### Returns

- `FileCreateResponse`

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

const file = await client.containers.files.create('container_id');

console.log(file.id);
```
