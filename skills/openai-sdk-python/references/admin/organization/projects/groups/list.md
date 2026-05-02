## List project groups

`admin.organization.projects.groups.list(strproject_id, GroupListParams**kwargs)  -> SyncNextCursorPage[ProjectGroup]`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `project_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: Optional[int]`

  A limit on the number of project groups to return. Defaults to 20.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class ProjectGroup: …`

  Details about a group's membership in a project.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: str`

    Identifier of the group that has access to the project.

  - `group_name: str`

    Display name of the group.

  - `group_type: str`

    The type of the group.

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
page = client.admin.organization.projects.groups.list(
    project_id="project_id",
)
page = page.data[0]
print(page.group_id)
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "group_type": "group_type",
      "object": "project.group",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
