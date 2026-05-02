# Groups

## List groups

`admin.organization.groups.list(GroupListParams**kwargs)  -> SyncNextCursorPage[Group]`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: Optional[Literal["asc", "desc"]]`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "group_type": "group_type",
      "is_scim_managed": true,
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Create group

`admin.organization.groups.create(GroupCreateParams**kwargs)  -> Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `name: str`

  Human readable name for the group.

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.create(
    name="x",
)
print(group.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group_type",
  "is_scim_managed": true,
  "name": "name"
}
```

## Update group

`admin.organization.groups.update(strgroup_id, GroupUpdateParams**kwargs)  -> GroupUpdateResponse`

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Parameters

- `group_id: str`

- `name: str`

  New display name for the group.

### Returns

- `class GroupUpdateResponse: …`

  Response returned after updating a group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Updated display name for the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.update(
    group_id="group_id",
    name="x",
)
print(group.id)
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "is_scim_managed": true,
  "name": "name"
}
```

## Delete group

`admin.organization.groups.delete(strgroup_id)  -> GroupDeleteResponse`

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Parameters

- `group_id: str`

### Returns

- `class GroupDeleteResponse: …`

  Confirmation payload returned after deleting a group.

  - `id: str`

    Identifier of the deleted group.

  - `deleted: bool`

    Whether the group was deleted.

  - `object: Literal["group.deleted"]`

    Always `group.deleted`.

    - `"group.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.delete(
    "group_id",
)
print(group.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```

## Domain Types

### Group

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: str`

    The type of the group.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Group Update Response

- `class GroupUpdateResponse: …`

  Response returned after updating a group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Updated display name for the group.

### Group Delete Response

- `class GroupDeleteResponse: …`

  Confirmation payload returned after deleting a group.

  - `id: str`

    Identifier of the deleted group.

  - `deleted: bool`

    Whether the group was deleted.

  - `object: Literal["group.deleted"]`

    Always `group.deleted`.

    - `"group.deleted"`

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

# Roles

## List group organization role assignments

`admin.organization.groups.roles.list(strgroup_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/organization/groups/{group_id}/roles`

Lists the organization roles assigned to a group within the organization.

### Parameters

- `group_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: Optional[int]`

  A limit on the number of organization role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.groups.roles.list(
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
      "created_at": 0,
      "created_by": "created_by",
      "created_by_user_obj": {
        "foo": "bar"
      },
      "description": "description",
      "metadata": {
        "foo": "bar"
      },
      "name": "name",
      "permissions": [
        "string"
      ],
      "predefined_role": true,
      "resource_type": "resource_type",
      "updated_at": 0
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Assign organization role to group

`admin.organization.groups.roles.create(strgroup_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/organization/groups/{group_id}/roles`

Assigns an organization role to a group within the organization.

### Parameters

- `group_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.groups.roles.create(
    group_id="group_id",
    role_id="role_id",
)
print(role.group)
```

#### Response

```json
{
  "group": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "group",
    "scim_managed": true
  },
  "object": "group.role",
  "role": {
    "id": "id",
    "description": "description",
    "name": "name",
    "object": "role",
    "permissions": [
      "string"
    ],
    "predefined_role": true,
    "resource_type": "resource_type"
  }
}
```

## Unassign organization role from group

`admin.organization.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassigns an organization role from a group within the organization.

### Parameters

- `group_id: str`

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.groups.roles.delete(
    role_id="role_id",
    group_id="group_id",
)
print(role.deleted)
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

## Domain Types

### Role List Response

- `class RoleListResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `created_at: Optional[int]`

    When the role was created.

  - `created_by: Optional[str]`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Optional[Dict[str, object]]`

    User details for the actor that created the role, when available.

  - `description: Optional[str]`

    Description of the role.

  - `metadata: Optional[Dict[str, object]]`

    Arbitrary metadata stored on the role.

  - `name: str`

    Name of the role.

  - `permissions: List[str]`

    Permissions associated with the role.

  - `predefined_role: bool`

    Whether the role is predefined by OpenAI.

  - `resource_type: str`

    Resource type the role applies to.

  - `updated_at: Optional[int]`

    When the role was last updated.

### Role Create Response

- `class RoleCreateResponse: …`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: str`

      Identifier for the group.

    - `created_at: int`

      Unix timestamp (in seconds) when the group was created.

    - `name: str`

      Display name of the group.

    - `object: Literal["group"]`

      Always `group`.

      - `"group"`

    - `scim_managed: bool`

      Whether the group is managed through SCIM.

  - `object: Literal["group.role"]`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: str`

      Identifier for the role.

    - `description: Optional[str]`

      Optional description of the role.

    - `name: str`

      Unique name for the role.

    - `object: Literal["role"]`

      Always `role`.

      - `"role"`

    - `permissions: List[str]`

      Permissions granted by the role.

    - `predefined_role: bool`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: str`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.
