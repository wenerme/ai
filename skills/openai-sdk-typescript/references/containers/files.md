# Files

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

# Content

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
