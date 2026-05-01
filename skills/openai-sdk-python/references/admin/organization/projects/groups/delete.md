## Remove project group

`admin.organization.projects.groups.delete(strgroup_id, GroupDeleteParams**kwargs)  -> GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

### Returns

- `class GroupDeleteResponse: …`

  Confirmation payload returned after removing a group from a project.

  - `deleted: bool`

    Whether the group membership in the project was removed.

  - `object: Literal["project.group.deleted"]`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.projects.groups.delete(
    group_id="group_id",
    project_id="project_id",
)
print(group.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```
