## Retrieve project hosted tool permissions

`client.admin.organization.projects.hostedToolPermissions.retrieve(stringprojectID, RequestOptionsoptions?): ProjectHostedToolPermissions`

**get** `/organization/projects/{project_id}/hosted_tool_permissions`

Returns hosted tool permissions for a project.

### Parameters

- `projectID: string`

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
  await client.admin.organization.projects.hostedToolPermissions.retrieve('project_id');

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
