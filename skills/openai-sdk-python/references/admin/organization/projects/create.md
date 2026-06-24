## Create project

`admin.organization.projects.create(ProjectCreateParams**kwargs)  -> Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `name: str`

  The friendly name of the project, this name appears in reports.

- `external_key_id: Optional[str]`

  External key ID to associate with the project.

- `geography: Optional[str]`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

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
project = client.admin.organization.projects.create(
    name="name",
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
