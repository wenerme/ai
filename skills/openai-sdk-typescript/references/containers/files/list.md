## List

`client.containers.files.list(stringcontainerID, FileListParamsquery?, RequestOptionsoptions?): CursorPage<FileListResponse>`

**get** `/containers/{container_id}/files`

List Container files

### Parameters

- `containerID: string`

- `query: FileListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `FileListResponse`

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

// Automatically fetches more pages as needed.
for await (const fileListResponse of client.containers.files.list('container_id')) {
  console.log(fileListResponse.id);
}
```
