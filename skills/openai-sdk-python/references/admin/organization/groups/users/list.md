## List group users

`admin.organization.groups.users.list(strgroup_id, UserListParams**kwargs)  -> SyncNextCursorPage[OrganizationGroupUser]`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `group_id: str`

- `after: Optional[str]`

  A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

- `limit: Optional[int]`

  A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: Optional[Literal["asc", "desc"]]`

  Specifies the sort order of users in the list.

  - `"asc"`

  - `"desc"`

### Returns

- `class OrganizationGroupUser: …`

  Represents an individual user returned when inspecting group membership.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: Optional[str]`

    The email address of the user.

  - `name: str`

    The name of the user.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.users.list(
    group_id="group_id",
)
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
