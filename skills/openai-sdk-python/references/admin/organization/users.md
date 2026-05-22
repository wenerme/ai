# Users

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

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

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
      "object": "organization.user",
      "api_key_last_used_at": 0,
      "created": 0,
      "developer_persona": "developer_persona",
      "email": "email",
      "is_default": true,
      "is_scale_tier_authorized_purchaser": true,
      "is_scim_managed": true,
      "is_service_account": true,
      "name": "name",
      "projects": {
        "data": [
          {
            "id": "id",
            "name": "name",
            "role": "role"
          }
        ],
        "object": "list"
      },
      "role": "role",
      "technical_level": "technical_level",
      "user": {
        "id": "id",
        "object": "user",
        "banned": true,
        "banned_at": 0,
        "email": "email",
        "enabled": true,
        "name": "name",
        "picture": "picture"
      }
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Retrieve user

`admin.organization.users.retrieve(struser_id)  -> OrganizationUser`

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Parameters

- `user_id: str`

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_user = client.admin.organization.users.retrieve(
    "user_id",
)
print(organization_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.user",
  "api_key_last_used_at": 0,
  "created": 0,
  "developer_persona": "developer_persona",
  "email": "email",
  "is_default": true,
  "is_scale_tier_authorized_purchaser": true,
  "is_scim_managed": true,
  "is_service_account": true,
  "name": "name",
  "projects": {
    "data": [
      {
        "id": "id",
        "name": "name",
        "role": "role"
      }
    ],
    "object": "list"
  },
  "role": "role",
  "technical_level": "technical_level",
  "user": {
    "id": "id",
    "object": "user",
    "banned": true,
    "banned_at": 0,
    "email": "email",
    "enabled": true,
    "name": "name",
    "picture": "picture"
  }
}
```

## Modify user

`admin.organization.users.update(struser_id, UserUpdateParams**kwargs)  -> OrganizationUser`

**post** `/organization/users/{user_id}`

Modifies a user's role in the organization.

### Parameters

- `user_id: str`

- `developer_persona: Optional[str]`

  Developer persona metadata.

- `role: Optional[str]`

  `owner` or `reader`

- `role_id: Optional[str]`

  Role ID to assign to the user.

- `technical_level: Optional[str]`

  Technical level metadata.

### Returns

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
organization_user = client.admin.organization.users.update(
    user_id="user_id",
)
print(organization_user.id)
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.user",
  "api_key_last_used_at": 0,
  "created": 0,
  "developer_persona": "developer_persona",
  "email": "email",
  "is_default": true,
  "is_scale_tier_authorized_purchaser": true,
  "is_scim_managed": true,
  "is_service_account": true,
  "name": "name",
  "projects": {
    "data": [
      {
        "id": "id",
        "name": "name",
        "role": "role"
      }
    ],
    "object": "list"
  },
  "role": "role",
  "technical_level": "technical_level",
  "user": {
    "id": "id",
    "object": "user",
    "banned": true,
    "banned_at": 0,
    "email": "email",
    "enabled": true,
    "name": "name",
    "picture": "picture"
  }
}
```

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

## Domain Types

### Organization User

- `class OrganizationUser: …`

  Represents an individual `user` within an organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `added_at: int`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: Literal["organization.user"]`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: Optional[int]`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: Optional[int]`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: Optional[str]`

    The developer persona metadata for the user.

  - `email: Optional[str]`

    The email address of the user

  - `is_default: Optional[bool]`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: Optional[bool]`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: Optional[bool]`

    Whether the user is managed through SCIM.

  - `is_service_account: Optional[bool]`

    Whether the user is a service account.

  - `name: Optional[str]`

    The name of the user

  - `projects: Optional[Projects]`

    Projects associated with the user, if included.

    - `data: List[ProjectsData]`

      - `id: Optional[str]`

      - `name: Optional[str]`

      - `role: Optional[str]`

    - `object: Literal["list"]`

      - `"list"`

  - `role: Optional[str]`

    `owner` or `reader`

  - `technical_level: Optional[str]`

    The technical level metadata for the user.

  - `user: Optional[User]`

    Nested user details.

    - `id: str`

    - `object: Literal["user"]`

      - `"user"`

    - `banned: Optional[bool]`

    - `banned_at: Optional[int]`

    - `email: Optional[str]`

    - `enabled: Optional[bool]`

    - `name: Optional[str]`

    - `picture: Optional[str]`

### User Delete Response

- `class UserDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.user.deleted"]`

    - `"organization.user.deleted"`

# Roles

## List user organization role assignments

`admin.organization.users.roles.list(struser_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/organization/users/{user_id}/roles`

Lists the organization roles assigned to a user within the organization.

### Parameters

- `user_id: str`

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

  - `assignment_sources: Optional[List[AssignmentSource]]`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: str`

    - `principal_type: str`

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
page = client.admin.organization.users.roles.list(
    user_id="user_id",
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
      "assignment_sources": [
        {
          "principal_id": "principal_id",
          "principal_type": "principal_type"
        }
      ],
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

## Assign organization role to user

`admin.organization.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/organization/users/{user_id}/roles`

Assigns an organization role to a user within the organization.

### Parameters

- `user_id: str`

- `role_id: str`

  Identifier of the role to assign.

### Returns

- `class RoleCreateResponse: …`

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

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

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.users.roles.create(
    user_id="user_id",
    role_id="role_id",
)
print(role.object)
```

#### Response

```json
{
  "object": "user.role",
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
  },
  "user": {
    "id": "id",
    "added_at": 0,
    "object": "organization.user",
    "api_key_last_used_at": 0,
    "created": 0,
    "developer_persona": "developer_persona",
    "email": "email",
    "is_default": true,
    "is_scale_tier_authorized_purchaser": true,
    "is_scim_managed": true,
    "is_service_account": true,
    "name": "name",
    "projects": {
      "data": [
        {
          "id": "id",
          "name": "name",
          "role": "role"
        }
      ],
      "object": "list"
    },
    "role": "role",
    "technical_level": "technical_level",
    "user": {
      "id": "id",
      "object": "user",
      "banned": true,
      "banned_at": 0,
      "email": "email",
      "enabled": true,
      "name": "name",
      "picture": "picture"
    }
  }
}
```

## Retrieve user organization role

`admin.organization.users.roles.retrieve(strrole_id, RoleRetrieveParams**kwargs)  -> RoleRetrieveResponse`

**get** `/organization/users/{user_id}/roles/{role_id}`

Retrieves an organization role assigned to a user.

### Parameters

- `user_id: str`

- `role_id: str`

### Returns

- `class RoleRetrieveResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `assignment_sources: Optional[List[AssignmentSource]]`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: str`

    - `principal_type: str`

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
role = client.admin.organization.users.roles.retrieve(
    role_id="role_id",
    user_id="user_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
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
```

## Unassign organization role from user

`admin.organization.users.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Parameters

- `user_id: str`

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
role = client.admin.organization.users.roles.delete(
    role_id="role_id",
    user_id="user_id",
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

  - `assignment_sources: Optional[List[AssignmentSource]]`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: str`

    - `principal_type: str`

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

  Role assignment linking a user to a role.

  - `object: Literal["user.role"]`

    Always `user.role`.

    - `"user.role"`

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

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: str`

      The identifier, which can be referenced in API endpoints

    - `added_at: int`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: Literal["organization.user"]`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at: Optional[int]`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: Optional[int]`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: Optional[str]`

      The developer persona metadata for the user.

    - `email: Optional[str]`

      The email address of the user

    - `is_default: Optional[bool]`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: Optional[bool]`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: Optional[bool]`

      Whether the user is managed through SCIM.

    - `is_service_account: Optional[bool]`

      Whether the user is a service account.

    - `name: Optional[str]`

      The name of the user

    - `projects: Optional[Projects]`

      Projects associated with the user, if included.

      - `data: List[ProjectsData]`

        - `id: Optional[str]`

        - `name: Optional[str]`

        - `role: Optional[str]`

      - `object: Literal["list"]`

        - `"list"`

    - `role: Optional[str]`

      `owner` or `reader`

    - `technical_level: Optional[str]`

      The technical level metadata for the user.

    - `user: Optional[User]`

      Nested user details.

      - `id: str`

      - `object: Literal["user"]`

        - `"user"`

      - `banned: Optional[bool]`

      - `banned_at: Optional[int]`

      - `email: Optional[str]`

      - `enabled: Optional[bool]`

      - `name: Optional[str]`

      - `picture: Optional[str]`

### Role Retrieve Response

- `class RoleRetrieveResponse: …`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: str`

    Identifier for the role.

  - `assignment_sources: Optional[List[AssignmentSource]]`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: str`

    - `principal_type: str`

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

### Role Delete Response

- `class RoleDeleteResponse: …`

  Confirmation payload returned after unassigning a role.

  - `deleted: bool`

    Whether the assignment was removed.

  - `object: str`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.
