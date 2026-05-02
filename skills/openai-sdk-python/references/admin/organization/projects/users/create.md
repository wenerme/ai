## Create project user

`admin.organization.projects.users.create(strproject_id, UserCreateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `project_id: str`

- `role: str`

  `owner` or `member`

- `email: Optional[str]`

  Email of the user to add.

- `user_id: Optional[str]`

  The ID of the user.

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: str`

    `owner` or `member`

  - `email: Optional[str]`

    The email address of the user

  - `name: Optional[str]`

    The name of the user

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.create(
    project_id="project_id",
    role="role",
)
print(project_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```
