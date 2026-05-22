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

### User Retrieve Response

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

### User Delete Response

- `class UserDeleteResponse: …`

  Confirmation payload returned after removing a user from a group.

  - `deleted: bool`

    Whether the group membership was removed.

  - `object: Literal["group.user.deleted"]`

    Always `group.user.deleted`.

    - `"group.user.deleted"`
