## Update project role

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Path Parameters

- `project_id: string`

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
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
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
curl -X POST https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Project Key Manager",
      "permissions": [
          "api.organization.projects.api_keys.read",
          "api.organization.projects.api_keys.write"
      ],
      "description": "Allows managing API keys for the project"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8PROJ",
    "name": "API Project Key Manager",
    "description": "Allows managing API keys for the project",
    "permissions": [
        "api.organization.projects.api_keys.read",
        "api.organization.projects.api_keys.write"
    ],
    "resource_type": "api.project",
    "predefined_role": false
}
```
