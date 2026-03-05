# Containers

## List

`client.containers.list(ContainerListParamsquery?, RequestOptionsoptions?): CursorPage<ContainerListResponse>`

**get** `/containers`

List Containers

### Parameters

- `query: ContainerListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `name?: string`

    Filter results by container name.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `ContainerListResponse`

  - `id: string`

    Unique identifier for the container.

  - `created_at: number`

    Unix timestamp (in seconds) when the container was created.

  - `name: string`

    Name of the container.

  - `object: string`

    The type of this object.

  - `status: string`

    Status of the container (e.g., active, deleted).

  - `expires_after?: ExpiresAfter`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor?: "last_active_at"`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes?: number`

      The number of minutes after the anchor before the container expires.

  - `last_active_at?: number`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: NetworkPolicy`

    Network access policy for the container.

    - `type: "allowlist" | "disabled"`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains?: Array<string>`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const containerListResponse of client.containers.list()) {
  console.log(containerListResponse.id);
}
```

## Create

`client.containers.create(ContainerCreateParamsbody, RequestOptionsoptions?): ContainerCreateResponse`

**post** `/containers`

Create Container

### Parameters

- `body: ContainerCreateParams`

  - `name: string`

    Name of the container to create.

  - `expires_after?: ExpiresAfter`

    Container expiration time in seconds relative to the 'anchor' time.

    - `anchor: "last_active_at"`

      Time anchor for the expiration time. Currently only 'last_active_at' is supported.

      - `"last_active_at"`

    - `minutes: number`

  - `file_ids?: Array<string>`

    IDs of files to copy to the container.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    Optional memory limit for the container. Defaults to "1g".

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

    Network access policy for the container.

    - `ContainerNetworkPolicyDisabled`

      - `type: "disabled"`

        Disable outbound network access. Always `disabled`.

        - `"disabled"`

    - `ContainerNetworkPolicyAllowlist`

      - `allowed_domains: Array<string>`

        A list of allowed domains when type is `allowlist`.

      - `type: "allowlist"`

        Allow outbound network access only to specified domains. Always `allowlist`.

        - `"allowlist"`

      - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

        Optional domain-scoped secrets for allowlisted domains.

        - `domain: string`

          The domain associated with the secret.

        - `name: string`

          The name of the secret to inject for the domain.

        - `value: string`

          The secret value to inject for the domain.

  - `skills?: Array<SkillReference | InlineSkill>`

    An optional list of skills referenced by id or inline data.

    - `SkillReference`

      - `skill_id: string`

        The ID of the referenced skill.

      - `type: "skill_reference"`

        References a skill created with the /v1/skills endpoint.

        - `"skill_reference"`

      - `version?: string`

        Optional skill version. Use a positive integer or 'latest'. Omit for default.

    - `InlineSkill`

      - `description: string`

        The description of the skill.

      - `name: string`

        The name of the skill.

      - `source: InlineSkillSource`

        Inline skill payload

        - `data: string`

          Base64-encoded skill zip bundle.

        - `media_type: "application/zip"`

          The media type of the inline skill payload. Must be `application/zip`.

          - `"application/zip"`

        - `type: "base64"`

          The type of the inline skill source. Must be `base64`.

          - `"base64"`

      - `type: "inline"`

        Defines an inline skill for this request.

        - `"inline"`

### Returns

- `ContainerCreateResponse`

  - `id: string`

    Unique identifier for the container.

  - `created_at: number`

    Unix timestamp (in seconds) when the container was created.

  - `name: string`

    Name of the container.

  - `object: string`

    The type of this object.

  - `status: string`

    Status of the container (e.g., active, deleted).

  - `expires_after?: ExpiresAfter`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor?: "last_active_at"`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes?: number`

      The number of minutes after the anchor before the container expires.

  - `last_active_at?: number`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: NetworkPolicy`

    Network access policy for the container.

    - `type: "allowlist" | "disabled"`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains?: Array<string>`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const container = await client.containers.create({ name: 'name' });

console.log(container.id);
```

## Retrieve

`client.containers.retrieve(stringcontainerID, RequestOptionsoptions?): ContainerRetrieveResponse`

**get** `/containers/{container_id}`

Retrieve Container

### Parameters

- `containerID: string`

### Returns

- `ContainerRetrieveResponse`

  - `id: string`

    Unique identifier for the container.

  - `created_at: number`

    Unix timestamp (in seconds) when the container was created.

  - `name: string`

    Name of the container.

  - `object: string`

    The type of this object.

  - `status: string`

    Status of the container (e.g., active, deleted).

  - `expires_after?: ExpiresAfter`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor?: "last_active_at"`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes?: number`

      The number of minutes after the anchor before the container expires.

  - `last_active_at?: number`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit?: "1g" | "4g" | "16g" | "64g"`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy?: NetworkPolicy`

    Network access policy for the container.

    - `type: "allowlist" | "disabled"`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains?: Array<string>`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const container = await client.containers.retrieve('container_id');

console.log(container.id);
```

## Delete

`client.containers.delete(stringcontainerID, RequestOptionsoptions?): void`

**delete** `/containers/{container_id}`

Delete Container

### Parameters

- `containerID: string`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

await client.containers.delete('container_id');
```

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
