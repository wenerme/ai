## Unassign project role from group

`admin.organization.projects.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.projects.groups.roles.delete(
    role_id="role_id",
    project_id="project_id",
    group_id="group_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```
