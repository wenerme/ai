# Containers

## List

**get** `/containers`

List Containers

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `name: optional string`

  Filter results by container name.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, name, 6 more }`

  A list of containers.

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

  - `expires_after: optional object { anchor, minutes }`

    The container will expire after this time period.
    The anchor is the reference point for the expiration.
    The minutes is the number of minutes after the anchor before the container expires.

    - `anchor: optional "last_active_at"`

      The reference point for the expiration.

      - `"last_active_at"`

    - `minutes: optional number`

      The number of minutes after the anchor before the container expires.

  - `last_active_at: optional number`

    Unix timestamp (in seconds) when the container was last active.

  - `memory_limit: optional "1g" or "4g" or "16g" or "64g"`

    The memory limit configured for the container.

    - `"1g"`

    - `"4g"`

    - `"16g"`

    - `"64g"`

  - `network_policy: optional object { type, allowed_domains }`

    Network access policy for the container.

    - `type: "allowlist" or "disabled"`

      The network policy mode.

      - `"allowlist"`

      - `"disabled"`

    - `allowed_domains: optional array of string`

      Allowed outbound domains when `type` is `allowlist`.

- `first_id: string`

  The ID of the first container in the list.

- `has_more: boolean`

  Whether there are more containers available.

- `last_id: string`

  The ID of the last container in the list.

- `object: "list"`

  The type of object returned, must be 'list'.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/containers \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/containers`

Create Container

### Body Parameters

- `name: string`

  Name of the container to create.

- `expires_after: optional object { anchor, minutes }`

  Container expiration time in seconds relative to the 'anchor' time.

  - `anchor: "last_active_at"`

    Time anchor for the expiration time. Currently only 'last_active_at' is supported.

    - `"last_active_at"`

  - `minutes: number`

- `file_ids: optional array of string`

  IDs of files to copy to the container.

- `memory_limit: optional "1g" or "4g" or "16g" or "64g"`

  Optional memory limit for the container. Defaults to "1g".

  - `"1g"`

  - `"4g"`

  - `"16g"`

  - `"64g"`

- `network_policy: optional ContainerNetworkPolicyDisabled or ContainerNetworkPolicyAllowlist`

  Network access policy for the container.

  - `ContainerNetworkPolicyDisabled = object { type }`

    - `type: "disabled"`

      Disable outbound network access. Always `disabled`.

      - `"disabled"`

  - `ContainerNetworkPolicyAllowlist = object { allowed_domains, type, domain_secrets }`

    - `allowed_domains: array of string`

      A list of allowed domains when type is `allowlist`.

    - `type: "allowlist"`

      Allow outbound network access only to specified domains. Always `allowlist`.

      - `"allowlist"`

    - `domain_secrets: optional array of ContainerNetworkPolicyDomainSecret`

      Optional domain-scoped secrets for allowlisted domains.

      - `domain: string`

        The domain associated with the secret.

      - `name: string`

        The name of the secret to inject for the domain.

      - `value: string`

        The secret value to inject for the domain.

- `skills: optional array of SkillReference or InlineSkill`

  An optional list of skills referenced by id or inline data.

  - `SkillReference = object { skill_id, type, version }`

    - `skill_id: string`

      The ID of the referenced skill.

    - `type: "skill_reference"`

      References a skill created with the /v1/skills endpoint.

      - `"skill_reference"`

    - `version: optional string`

      Optional skill version. Use a positive integer or 'latest'. Omit for default.

  - `InlineSkill = object { description, name, source, type }`

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

- `expires_after: optional object { anchor, minutes }`

  The container will expire after this time period.
  The anchor is the reference point for the expiration.
  The minutes is the number of minutes after the anchor before the container expires.

  - `anchor: optional "last_active_at"`

    The reference point for the expiration.

    - `"last_active_at"`

  - `minutes: optional number`

    The number of minutes after the anchor before the container expires.

- `last_active_at: optional number`

  Unix timestamp (in seconds) when the container was last active.

- `memory_limit: optional "1g" or "4g" or "16g" or "64g"`

  The memory limit configured for the container.

  - `"1g"`

  - `"4g"`

  - `"16g"`

  - `"64g"`

- `network_policy: optional object { type, allowed_domains }`

  Network access policy for the container.

  - `type: "allowlist" or "disabled"`

    The network policy mode.

    - `"allowlist"`

    - `"disabled"`

  - `allowed_domains: optional array of string`

    Allowed outbound domains when `type` is `allowlist`.

### Example

```http
curl https://api.openai.com/v1/containers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "name"
        }'
```

## Retrieve

**get** `/containers/{container_id}`

Retrieve Container

### Path Parameters

- `container_id: string`

### Returns

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

- `expires_after: optional object { anchor, minutes }`

  The container will expire after this time period.
  The anchor is the reference point for the expiration.
  The minutes is the number of minutes after the anchor before the container expires.

  - `anchor: optional "last_active_at"`

    The reference point for the expiration.

    - `"last_active_at"`

  - `minutes: optional number`

    The number of minutes after the anchor before the container expires.

- `last_active_at: optional number`

  Unix timestamp (in seconds) when the container was last active.

- `memory_limit: optional "1g" or "4g" or "16g" or "64g"`

  The memory limit configured for the container.

  - `"1g"`

  - `"4g"`

  - `"16g"`

  - `"64g"`

- `network_policy: optional object { type, allowed_domains }`

  Network access policy for the container.

  - `type: "allowlist" or "disabled"`

    The network policy mode.

    - `"allowlist"`

    - `"disabled"`

  - `allowed_domains: optional array of string`

    Allowed outbound domains when `type` is `allowlist`.

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/containers/{container_id}`

Delete Container

### Path Parameters

- `container_id: string`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

# Files

## List

**get** `/containers/{container_id}/files`

List Container files

### Path Parameters

- `container_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, bytes, container_id, 4 more }`

  A list of container files.

  - `id: string`

    Unique identifier for the file.

  - `bytes: number`

    Size of the file in bytes.

  - `container_id: string`

    The container this file belongs to.

  - `created_at: number`

    Unix timestamp (in seconds) when the file was created.

  - `object: string`

    The type of this object (`container.file`).

  - `path: string`

    Path of the file in the container.

  - `source: string`

    Source of the file (e.g., `user`, `assistant`).

- `first_id: string`

  The ID of the first file in the list.

- `has_more: boolean`

  Whether there are more files available.

- `last_id: string`

  The ID of the last file in the list.

- `object: "list"`

  The type of object returned, must be 'list'.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Create

**post** `/containers/{container_id}/files`

Create a Container File

You can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.

### Path Parameters

- `container_id: string`

### Body Parameters

- `file: optional string`

  The File object (not file name) to be uploaded.

- `file_id: optional string`

  Name of the file to create.

### Returns

- `id: string`

  Unique identifier for the file.

- `bytes: number`

  Size of the file in bytes.

- `container_id: string`

  The container this file belongs to.

- `created_at: number`

  Unix timestamp (in seconds) when the file was created.

- `object: string`

  The type of this object (`container.file`).

- `path: string`

  Path of the file in the container.

- `source: string`

  Source of the file (e.g., `user`, `assistant`).

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve

**get** `/containers/{container_id}/files/{file_id}`

Retrieve Container File

### Path Parameters

- `container_id: string`

- `file_id: string`

### Returns

- `id: string`

  Unique identifier for the file.

- `bytes: number`

  Size of the file in bytes.

- `container_id: string`

  The container this file belongs to.

- `created_at: number`

  Unix timestamp (in seconds) when the file was created.

- `object: string`

  The type of this object (`container.file`).

- `path: string`

  Path of the file in the container.

- `source: string`

  Source of the file (e.g., `user`, `assistant`).

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files/$FILE_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Delete

**delete** `/containers/{container_id}/files/{file_id}`

Delete Container File

### Path Parameters

- `container_id: string`

- `file_id: string`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files/$FILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

# Content

## Retrieve

**get** `/containers/{container_id}/files/{file_id}/content`

Retrieve Container File Content

### Path Parameters

- `container_id: string`

- `file_id: string`

### Example

```http
curl https://api.openai.com/v1/containers/$CONTAINER_ID/files/$FILE_ID/content \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
