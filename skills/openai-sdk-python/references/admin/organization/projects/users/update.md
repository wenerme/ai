## Modify project user

`admin.organization.projects.users.update(struser_id, UserUpdateParams**kwargs)  -> ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `project_id: str`

- `user_id: str`

- `role: Literal["owner", "member"]`

  `owner` or `member`

  - `"owner"`

  - `"member"`

### Returns

- `class ProjectUser: …`

  Represents an individual user in a project.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the project was added.

  - `email: str`

    The email address of the user

  - `name: str`

    The name of the user

  - `object: Literal["organization.project.user"]`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: Literal["owner", "member"]`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
project_user = client.admin.organization.projects.users.update(
    user_id="user_id",
    project_id="project_id",
    role="owner",
)
print(project_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.project.user",
  "role": "owner"
}
```
