## Modify project hosted tool permissions

`client.admin.organization.projects.hostedToolPermissions.update(stringprojectID, HostedToolPermissionUpdateParamsbody, RequestOptionsoptions?): ProjectHostedToolPermissions`

**post** `/organization/projects/{project_id}/hosted_tool_permissions`

Updates hosted tool permissions for a project.

### Parameters

- `projectID: string`

- `body: HostedToolPermissionUpdateParams`

  - `code_interpreter?: CodeInterpreter | null`

    The code interpreter permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `file_search?: FileSearch | null`

    The file search permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `image_generation?: ImageGeneration | null`

    The image generation permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `mcp?: Mcp | null`

    The MCP permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

  - `web_search?: WebSearch | null`

    The web search permission update.

    - `enabled: boolean`

      Whether to enable the hosted tool for the project.

### Returns

- `ProjectHostedToolPermissions`

  Represents hosted tool permissions for a project.

  - `code_interpreter: CodeInterpreter`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `file_search: FileSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `image_generation: ImageGeneration`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `mcp: Mcp`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

  - `web_search: WebSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: boolean`

      Whether the hosted tool is enabled for the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectHostedToolPermissions =
  await client.admin.organization.projects.hostedToolPermissions.update('project_id');

console.log(projectHostedToolPermissions.code_interpreter);
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
