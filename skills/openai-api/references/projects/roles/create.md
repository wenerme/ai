## Create

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Path Parameters

- `project_id: string`

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
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "permissions": [
            "string"
          ],
          "role_name": "role_name"
        }'
```
