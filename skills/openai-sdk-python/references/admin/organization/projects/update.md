## Modify project

`admin.organization.projects.update(strproject_id, ProjectUpdateParams**kwargs)  -> Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `project_id: str`

- `external_key_id: Optional[str]`

  External key ID to associate with the project.

- `geography: Optional[str]`

  Geography for the project.

- `name: Optional[str]`

  The updated name of the project, this name appears in reports.

### Returns

- `class Project: …`

  Represents an individual project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: Literal["organization.project"]`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: Optional[int]`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: Optional[str]`

    The external key associated with the project.

  - `name: Optional[str]`

    The name of the project. This appears in reporting.

  - `status: Optional[str]`

    `active` or `archived`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project = client.admin.organization.projects.update(
    project_id="project_id",
)
print(project.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```
