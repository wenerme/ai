## Retrieve project model permissions

`admin.organization.projects.model_permissions.retrieve(strproject_id)  -> ProjectModelPermissions`

**get** `/organization/projects/{project_id}/model_permissions`

Returns model permissions for a project.

### Parameters

- `project_id: str`

### Returns

- `class ProjectModelPermissions: …`

  Represents the model allowlist or denylist policy for a project.

  - `mode: Literal["allow_list", "deny_list"]`

    Whether the project uses an allowlist or a denylist.

    - `"allow_list"`

    - `"deny_list"`

  - `model_ids: List[str]`

    The model IDs included in the model permissions policy.

  - `object: Literal["project.model_permissions"]`

    The object type, which is always `project.model_permissions`.

    - `"project.model_permissions"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_model_permissions = client.admin.organization.projects.model_permissions.retrieve(
    "project_id",
)
print(project_model_permissions.model_ids)
```

#### Response

```json
{
  "mode": "allow_list",
  "model_ids": [
    "string"
  ],
  "object": "project.model_permissions"
}
```
