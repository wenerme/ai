## Remove group user

`admin.organization.groups.users.delete(struser_id, UserDeleteParams**kwargs)  -> UserDeleteResponse`

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Parameters

- `group_id: str`

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  Confirmation payload returned after removing a user from a group.

  - `deleted: bool`

    Whether the group membership was removed.

  - `object: Literal["group.user.deleted"]`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.groups.users.delete(
    user_id="user_id",
    group_id="group_id",
)
print(user.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```
