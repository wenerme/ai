## List users

`admin.organization.users.list(UserListParams**kwargs)  -> SyncConversationCursorPage[OrganizationUser]`

**get** `/organization/users`

Lists all of the users in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `emails: Optional[Sequence[str]]`

  Filter by the email address of users.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `email: str`

    The email address of the user

  - `name: str`

    The name of the user

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.users.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "email": "email",
      "name": "name",
      "object": "organization.user",
      "role": "owner"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```
