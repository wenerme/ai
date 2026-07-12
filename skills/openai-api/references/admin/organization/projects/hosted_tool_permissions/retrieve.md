## Retrieve project hosted tool permissions

**get** `/organization/projects/{project_id}/hosted_tool_permissions`

Returns hosted tool permissions for a project.

### Path Parameters

- `project_id: string`

### Returns

- `ProjectHostedToolPermissions object { code_interpreter, file_search, image_generation, 2 more }`

  Represents hosted tool permissions for a project.

  - `code_interpreter: object { enabled }`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `file_search: object { enabled }`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `image_generation: object { enabled }`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `mcp: object { enabled }`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `web_search: object { enabled }`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/hosted_tool_permissions \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "code_interpreter": {
    "enabled": true
  },
  "file_search": {
    "enabled": true
  },
  "image_generation": {
    "enabled": true
  },
  "mcp": {
    "enabled": true
  },
  "web_search": {
    "enabled": true
  }
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/hosted_tool_permissions \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "file_search": {
        "enabled": true
    },
    "web_search": {
        "enabled": true
    },
    "image_generation": {
        "enabled": true
    },
    "mcp": {
        "enabled": true
    },
    "code_interpreter": {
        "enabled": true
    }
}
```
