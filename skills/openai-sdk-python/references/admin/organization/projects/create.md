## Create project

`admin.organization.projects.create(ProjectCreateParams**kwargs)  -> Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `name: str`

  The friendly name of the project, this name appears in reports.

- `geography: Optional[Literal["US", "EU", "JP", 5 more]]`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

  - `"US"`

  - `"EU"`

  - `"JP"`

  - `"IN"`

  - `"KR"`

  - `"CA"`

  - `"AU"`

  - `"SG"`

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
  "name": "name",
  "object": "organization.project",
  "status": "active",
  "archived_at": 0
}
```
