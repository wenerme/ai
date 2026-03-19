# Roles

## List organization roles

**get** `/organization/roles`

Lists the roles configured for the organization.

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: optional number`

  A limit on the number of roles to return. Defaults to 1000.

- `order: optional "asc" or "desc"`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, description, name, 4 more }`

  Roles returned in the current page.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `has_more: boolean`

  Whether more roles are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no additional roles.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/roles \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "description": "description",
      "name": "name",
      "object": "role",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/roles?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "role",
            "id": "role_01J1F8ROLE01",
            "name": "API Group Manager",
            "description": "Allows managing organization groups",
            "permissions": [
                "api.groups.read",
                "api.groups.write"
            ],
            "resource_type": "api.organization",
            "predefined_role": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create organization role

**post** `/organization/roles`

Creates a custom role for the organization.

### Body Parameters

- `permissions: array of string`

  Permissions to grant to the role.

- `role_name: string`

  Unique name for the role.

- `description: optional string`

  Optional description of the role.

### Returns

- `id: string`

  Identifier for the role.

- `description: string`

  Optional description of the role.

- `name: string`

  Unique name for the role.

- `object: "role"`

  Always `role`.

  - `"role"`

- `permissions: array of string`

  Permissions granted by the role.

- `predefined_role: boolean`

  Whether the role is predefined and managed by OpenAI.

- `resource_type: string`

  Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/organization/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "permissions": [
            "string"
          ],
          "role_name": "role_name"
        }'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Group Manager",
      "permissions": [
          "api.groups.read",
          "api.groups.write"
      ],
      "description": "Allows managing organization groups"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8ROLE01",
    "name": "API Group Manager",
    "description": "Allows managing organization groups",
    "permissions": [
        "api.groups.read",
        "api.groups.write"
    ],
    "resource_type": "api.organization",
    "predefined_role": false
}
```

## Update organization role

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Path Parameters

- `role_id: string`

### Body Parameters

- `description: optional string`

  New description for the role.

- `permissions: optional array of string`

  Updated set of permissions for the role.

- `role_name: optional string`

  New name for the role.

### Returns

- `id: string`

  Identifier for the role.

- `description: string`

  Optional description of the role.

- `name: string`

  Unique name for the role.

- `object: "role"`

  Always `role`.

  - `"role"`

- `permissions: array of string`

  Permissions granted by the role.

- `predefined_role: boolean`

  Whether the role is predefined and managed by OpenAI.

- `resource_type: string`

  Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/organization/roles/$ROLE_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Group Manager",
      "permissions": [
          "api.groups.read",
          "api.groups.write"
      ],
      "description": "Allows managing organization groups"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8ROLE01",
    "name": "API Group Manager",
    "description": "Allows managing organization groups",
    "permissions": [
        "api.groups.read",
        "api.groups.write"
    ],
    "resource_type": "api.organization",
    "predefined_role": false
}
```

## Delete organization role

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Path Parameters

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "role.deleted",
    "id": "role_01J1F8ROLE01",
    "deleted": true
}
```
