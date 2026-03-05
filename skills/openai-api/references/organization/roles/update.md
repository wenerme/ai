## Update

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
