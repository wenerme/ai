## Add project group

`admin.organization.projects.groups.create(strproject_id, GroupCreateParams**kwargs)  -> ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `project_id: str`

- `group_id: str`

  Identifier of the group to add to the project.

- `role: str`

  Identifier of the project role to grant to the group.

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `object: Literal["project.group"]`

    Always `project.group`.

    - `"project.group"`

  - `project_id: str`

    Identifier of the project.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_group = client.admin.organization.projects.groups.create(
    project_id="project_id",
    group_id="group_id",
    role="role",
)
print(project_group.group_id)
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "object": "project.group",
  "project_id": "project_id"
}
```
