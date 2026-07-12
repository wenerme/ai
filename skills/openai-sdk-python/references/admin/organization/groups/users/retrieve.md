## Retrieve group user

`admin.organization.groups.users.retrieve(struser_id, UserRetrieveParams**kwargs)  -> UserRetrieveResponse`

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieves a user in a group.

### Parameters

- `group_id: str`

- `user_id: str`

### Returns

- `class UserRetrieveResponse: …`

  Details about a user returned from an organization group membership lookup.

  - `id: str`

    Identifier for the user.

  - `email: Optional[str]`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: str`

    Display name of the user.

  - `picture: Optional[str]`

    URL of the user's profile picture, if available.

  - `user_type: Literal["user", "tenant_user"]`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
user = client.admin.organization.groups.users.retrieve(
    user_id="user_id",
    group_id="group_id",
)
print(user.id)
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "is_service_account": true,
  "name": "name",
  "picture": "picture",
  "user_type": "user"
}
```
