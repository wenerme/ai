# Users

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

## Domain Types

### Organization Group User

- `class OrganizationGroupUser: …`

  Represents an individual user returned when inspecting group membership.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `email: Optional[str]`

    The email address of the user.

  - `name: str`

    The name of the user.

### User Create Response

- `class UserCreateResponse: …`

  Confirmation payload returned after adding a user to a group.

  - `group_id: str`

    Identifier of the group the user was added to.

  - `object: Literal["group.user"]`

    Always `group.user`.

    - `"group.user"`

  - `user_id: str`

    Identifier of the user that was added.

### User Delete Response

- `class UserDeleteResponse: …`

  Confirmation payload returned after removing a user from a group.

  - `deleted: bool`

    Whether the group membership was removed.

  - `object: Literal["group.user.deleted"]`

    Always `group.user.deleted`.

    - `"group.user.deleted"`
