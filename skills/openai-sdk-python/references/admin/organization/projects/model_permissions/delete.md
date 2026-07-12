## Delete project model permissions

`admin.organization.projects.model_permissions.delete(strproject_id)  -> ProjectModelPermissionsDeleted`

**delete** `/organization/projects/{project_id}/model_permissions`

Deletes model permissions for a project.

### Parameters

- `project_id: str`

### Returns

- `class ProjectModelPermissionsDeleted: …`

  Confirmation payload returned after deleting project model permissions.

  - `deleted: bool`

    Whether the project model permissions were deleted.

  - `object: Literal["project.model_permissions.deleted"]`

    The object type, which is always `project.model_permissions.deleted`.

    - `"project.model_permissions.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_model_permissions_deleted = client.admin.organization.projects.model_permissions.delete(
    "project_id",
)
print(project_model_permissions_deleted.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "project.model_permissions.deleted"
}
```
