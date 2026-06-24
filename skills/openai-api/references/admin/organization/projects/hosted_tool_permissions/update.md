## Modify project hosted tool permissions

**post** `/organization/projects/{project_id}/hosted_tool_permissions`

Updates hosted tool permissions for a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `code_interpreter: optional object { enabled }`

  The code interpreter permission update.

  - `enabled: boolean`

    Whether to enable the hosted tool for the project.

- `file_search: optional object { enabled }`

  The file search permission update.

  - `enabled: boolean`

    Whether to enable the hosted tool for the project.

- `image_generation: optional object { enabled }`

  The image generation permission update.

  - `enabled: boolean`

    Whether to enable the hosted tool for the project.

- `mcp: optional object { enabled }`

  The MCP permission update.

  - `enabled: boolean`

    Whether to enable the hosted tool for the project.

- `web_search: optional object { enabled }`

  The web search permission update.

  - `enabled: boolean`

    Whether to enable the hosted tool for the project.

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/hosted_tool_permissions \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "file_search": {
          "enabled": true
      },
      "image_generation": {
          "enabled": false
      }
  }'
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
        "enabled": false
    },
    "mcp": {
        "enabled": true
    },
    "code_interpreter": {
        "enabled": true
    }
}
```
