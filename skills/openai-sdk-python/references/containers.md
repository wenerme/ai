# Containers

## List

`containers.list(ContainerListParams**kwargs)  -> SyncCursorPage[ContainerListResponse]`

**get** `/containers`

List Containers

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `name: Optional[str]`

  Filter results by container name.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class ContainerListResponse: …`

  - `id: str`

    Unique identifier for the container.

  - `created_at: int`

    Unix timestamp (in seconds) when the container was created.

  - `name: str`

    Name of the container.

  - `object: str`

    The type of this object.

  - `status: str`

    Status of the container (e.g., active, deleted).

  - `expires_after: Optional[ExpiresAfter]`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor: Optional[Literal["last_active_at"]]`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes: Optional[int]`

      The number of minutes after the anchor before the container expires.

  - `last_active_at: Optional[int]`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy: Optional[NetworkPolicy]`

    Network access policy for the container.

    - `type: Literal["allowlist", "disabled"]`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains: Optional[List[str]]`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.containers.list()
page = page.data[0]
print(page.id)
```

## Create

`containers.create(ContainerCreateParams**kwargs)  -> ContainerCreateResponse`

**post** `/containers`

Create Container

### Parameters

- `name: str`

  Name of the container to create.

- `expires_after: Optional[ExpiresAfter]`

  Container expiration time in seconds relative to the 'anchor' time.

  - `anchor: Literal["last_active_at"]`

    Time anchor for the expiration time. Currently only 'last_active_at' is supported.

    - `"last_active_at"`

  - `minutes: int`

- `file_ids: Optional[SequenceNotStr[str]]`

  IDs of files to copy to the container.

- `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

  Optional memory limit for the container. Defaults to "1g".

  - `"1g"`

  - `"4g"`

  - `"16g"`

  - `"64g"`

- `network_policy: Optional[NetworkPolicy]`

  Network access policy for the container.

  - `class ContainerNetworkPolicyDisabled: …`

    - `type: Literal["disabled"]`

      Disable outbound network access. Always `disabled`.

      - `"disabled"`

  - `class ContainerNetworkPolicyAllowlist: …`

    - `allowed_domains: List[str]`

      A list of allowed domains when type is `allowlist`.

    - `type: Literal["allowlist"]`

      Allow outbound network access only to specified domains. Always `allowlist`.

      - `"allowlist"`

    - `domain_secrets: Optional[List[ContainerNetworkPolicyDomainSecret]]`

      Optional domain-scoped secrets for allowlisted domains.

      - `domain: str`

        The domain associated with the secret.

      - `name: str`

        The name of the secret to inject for the domain.

      - `value: str`

        The secret value to inject for the domain.

- `skills: Optional[Iterable[Skill]]`

  An optional list of skills referenced by id or inline data.

  - `class SkillReference: …`

    - `skill_id: str`

      The ID of the referenced skill.

    - `type: Literal["skill_reference"]`

      References a skill created with the /v1/skills endpoint.

      - `"skill_reference"`

    - `version: Optional[str]`

      Optional skill version. Use a positive integer or 'latest'. Omit for default.

  - `class InlineSkill: …`

    - `description: str`

      The description of the skill.

    - `name: str`

      The name of the skill.

    - `source: InlineSkillSource`

      Inline skill payload

      - `data: str`

        Base64-encoded skill zip bundle.

      - `media_type: Literal["application/zip"]`

        The media type of the inline skill payload. Must be `application/zip`.

        - `"application/zip"`

      - `type: Literal["base64"]`

        The type of the inline skill source. Must be `base64`.

        - `"base64"`

    - `type: Literal["inline"]`

      Defines an inline skill for this request.

      - `"inline"`

### Returns

- `class ContainerCreateResponse: …`

  - `id: str`

    Unique identifier for the container.

  - `created_at: int`

    Unix timestamp (in seconds) when the container was created.

  - `name: str`

    Name of the container.

  - `object: str`

    The type of this object.

  - `status: str`

    Status of the container (e.g., active, deleted).

  - `expires_after: Optional[ExpiresAfter]`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor: Optional[Literal["last_active_at"]]`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes: Optional[int]`

      The number of minutes after the anchor before the container expires.

  - `last_active_at: Optional[int]`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy: Optional[NetworkPolicy]`

    Network access policy for the container.

    - `type: Literal["allowlist", "disabled"]`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains: Optional[List[str]]`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
container = client.containers.create(
    name="name",
)
print(container.id)
```

## Retrieve

`containers.retrieve(strcontainer_id)  -> ContainerRetrieveResponse`

**get** `/containers/{container_id}`

Retrieve Container

### Parameters

- `container_id: str`

### Returns

- `class ContainerRetrieveResponse: …`

  - `id: str`

    Unique identifier for the container.

  - `created_at: int`

    Unix timestamp (in seconds) when the container was created.

  - `name: str`

    Name of the container.

  - `object: str`

    The type of this object.

  - `status: str`

    Status of the container (e.g., active, deleted).

  - `expires_after: Optional[ExpiresAfter]`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor: Optional[Literal["last_active_at"]]`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes: Optional[int]`

      The number of minutes after the anchor before the container expires.

  - `last_active_at: Optional[int]`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit: Optional[Literal["1g", "4g", "16g", "64g"]]`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy: Optional[NetworkPolicy]`

    Network access policy for the container.

    - `type: Literal["allowlist", "disabled"]`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains: Optional[List[str]]`

      Allowed outbound domains when `type` is `allowlist`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
container = client.containers.retrieve(
    "container_id",
)
print(container.id)
```

## Delete

`containers.delete(strcontainer_id)`

**delete** `/containers/{container_id}`

Delete Container

### Parameters

- `container_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.containers.delete(
    "container_id",
)
```

# Files

## List

`containers.files.list(strcontainer_id, FileListParams**kwargs)  -> SyncCursorPage[FileListResponse]`

**get** `/containers/{container_id}/files`

List Container files

### Parameters

- `container_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `class FileListResponse: …`

  - `id: str`

    Unique identifier for the file.

  - `bytes: int`

    Size of the file in bytes.

  - `container_id: str`

    The container this file belongs to.

  - `created_at: int`

    Unix timestamp (in seconds) when the file was created.

  - `object: Literal["container.file"]`

    The type of this object (`container.file`).

    - `"container.file"`

  - `path: str`

    Path of the file in the container.

  - `source: str`

    Source of the file (e.g., `user`, `assistant`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
page = client.containers.files.list(
    container_id="container_id",
)
page = page.data[0]
print(page.id)
```

## Create

`containers.files.create(strcontainer_id, FileCreateParams**kwargs)  -> FileCreateResponse`

**post** `/containers/{container_id}/files`

Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.

### Parameters

- `container_id: str`

- `file: Optional[FileTypes]`

  The File object (not file name) to be uploaded.

- `file_id: Optional[str]`

  Name of the file to create.

### Returns

- `class FileCreateResponse: …`

  - `id: str`

    Unique identifier for the file.

  - `bytes: int`

    Size of the file in bytes.

  - `container_id: str`

    The container this file belongs to.

  - `created_at: int`

    Unix timestamp (in seconds) when the file was created.

  - `object: Literal["container.file"]`

    The type of this object (`container.file`).

    - `"container.file"`

  - `path: str`

    Path of the file in the container.

  - `source: str`

    Source of the file (e.g., `user`, `assistant`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file = client.containers.files.create(
    container_id="container_id",
)
print(file.id)
```

## Retrieve

`containers.files.retrieve(strfile_id, FileRetrieveParams**kwargs)  -> FileRetrieveResponse`

**get** `/containers/{container_id}/files/{file_id}`

Retrieve Container File

### Parameters

- `container_id: str`

- `file_id: str`

### Returns

- `class FileRetrieveResponse: …`

  - `id: str`

    Unique identifier for the file.

  - `bytes: int`

    Size of the file in bytes.

  - `container_id: str`

    The container this file belongs to.

  - `created_at: int`

    Unix timestamp (in seconds) when the file was created.

  - `object: Literal["container.file"]`

    The type of this object (`container.file`).

    - `"container.file"`

  - `path: str`

    Path of the file in the container.

  - `source: str`

    Source of the file (e.g., `user`, `assistant`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
file = client.containers.files.retrieve(
    file_id="file_id",
    container_id="container_id",
)
print(file.id)
```

## Delete

`containers.files.delete(strfile_id, FileDeleteParams**kwargs)`

**delete** `/containers/{container_id}/files/{file_id}`

Delete Container File

### Parameters

- `container_id: str`

- `file_id: str`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
client.containers.files.delete(
    file_id="file_id",
    container_id="container_id",
)
```

# Content

## Retrieve

`containers.files.content.retrieve(strfile_id, ContentRetrieveParams**kwargs)  -> BinaryResponseContent`

**get** `/containers/{container_id}/files/{file_id}/content`

Retrieve Container File Content

### Parameters

- `container_id: str`

- `file_id: str`

### Returns

- `BinaryResponseContent`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)
content = client.containers.files.content.retrieve(
    file_id="file_id",
    container_id="container_id",
)
print(content)
data = content.read()
print(data)
```
