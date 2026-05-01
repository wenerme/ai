## Delete project user

`admin.organization.projects.users.delete(struser_id, UserDeleteParams**kwargs)  -> UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `project_id: str`

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.project.user.deleted"]`

    - `"organization.project.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.projects.users.delete(
    user_id="user_id",
    project_id="project_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```
