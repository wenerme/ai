## Modify project

`admin.organization.projects.update(strproject_id, ProjectUpdateParams**kwargs)  -> Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `project_id: str`

- `name: str`

  The updated name of the project, this name appears in reports.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `name: str`

    The name of the project. This appears in reporting.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `status: Literal["active", "archived"]`

    `active` or `archived`

    - `"active"`

    - `"archived"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.update(
    project_id="project_id",
    name="name",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```
