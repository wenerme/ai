## Retrieve project group

`admin.organization.projects.groups.retrieve(strgroup_id, GroupRetrieveParams**kwargs)  -> ProjectGroup`

**get** `/organization/projects/{project_id}/groups/{group_id}`

Retrieves a project's group.

### Parameters

- `project_id: str`

- `group_id: str`

- `group_type: Optional[Literal["group", "tenant_group"]]`

  The type of group to retrieve.

  - `"group"`

  - `"tenant_group"`

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `group_type: Literal["group", "tenant_group"]`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

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
project_group = client.admin.organization.projects.groups.retrieve(
    group_id="group_id",
    project_id="project_id",
)
print(project_group.group_id)
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group",
  "object": "project.group",
  "project_id": "project_id"
}
```
