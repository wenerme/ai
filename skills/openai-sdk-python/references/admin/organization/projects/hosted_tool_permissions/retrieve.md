## Retrieve project hosted tool permissions

`admin.organization.projects.hosted_tool_permissions.retrieve(strproject_id)  -> ProjectHostedToolPermissions`

**get** `/organization/projects/{project_id}/hosted_tool_permissions`

Returns hosted tool permissions for a project.

### Parameters

- `project_id: str`

### Returns

- `class ProjectHostedToolPermissions: …`

  Represents hosted tool permissions for a project.

  - `code_interpreter: CodeInterpreter`

    Permission state for a single hosted tool on a project.

    - `enabled: bool`

      Whether the hosted tool is enabled for the project.

  - `file_search: FileSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: bool`

      Whether the hosted tool is enabled for the project.

  - `image_generation: ImageGeneration`

    Permission state for a single hosted tool on a project.

    - `enabled: bool`

      Whether the hosted tool is enabled for the project.

  - `mcp: Mcp`

    Permission state for a single hosted tool on a project.

    - `enabled: bool`

      Whether the hosted tool is enabled for the project.

  - `web_search: WebSearch`

    Permission state for a single hosted tool on a project.

    - `enabled: bool`

      Whether the hosted tool is enabled for the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_hosted_tool_permissions = client.admin.organization.projects.hosted_tool_permissions.retrieve(
    "project_id",
)
print(project_hosted_tool_permissions.code_interpreter)
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
