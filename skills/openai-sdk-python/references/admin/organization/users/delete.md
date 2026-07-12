## Delete user

`admin.organization.users.delete(struser_id)  -> UserDeleteResponse`

**delete** `/organization/users/{user_id}`

Deletes a user from the organization.

### Parameters

- `user_id: str`

### Returns

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.user.deleted"]`

    - `"organization.user.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.users.delete(
    "user_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.user.deleted"
}
```
