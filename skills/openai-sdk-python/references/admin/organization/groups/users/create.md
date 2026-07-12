## Add group user

`admin.organization.groups.users.create(strgroup_id, UserCreateParams**kwargs)  -> UserCreateResponse`

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Parameters

- `group_id: str`

- `user_id: str`

  Identifier of the user to add to the group.

### Returns

- `class UserCreateResponse: …`

  Confirmation payload returned after adding a user to a group.

  - `group_id: str`

    Identifier of the group the user was added to.

  - `object: Literal["group.user"]`

    Always `group.user`.

    - `"group.user"`

  - `user_id: str`

    Identifier of the user that was added.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.groups.users.create(
    group_id="group_id",
    user_id="user_id",
)
print(user.group_id)
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```
