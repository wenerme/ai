# Roles

## List project user role assignments

`admin.organization.projects.users.roles.list(struser_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Parameters

- `project_id: str`

- `user_id: str`

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: Optional[int]`

  A limit on the number of project role assignments to return.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned project roles.

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
page = client.admin.organization.projects.users.roles.list(
    user_id="user_id",
    project_id="project_id",
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

## Assign project role to user

`admin.organization.projects.users.roles.create(struser_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `project_id: str`

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
role = client.admin.organization.projects.users.roles.create(
    user_id="user_id",
    project_id="project_id",
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

## Retrieve project user role

`admin.organization.projects.users.roles.retrieve(strrole_id, RoleRetrieveParams**kwargs)  -> RoleRetrieveResponse`

**get** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Retrieves a project role assigned to a user.

### Parameters

- `project_id: str`

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
role = client.admin.organization.projects.users.roles.retrieve(
    role_id="role_id",
    project_id="project_id",
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

## Unassign project role from user

`admin.organization.projects.users.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Parameters

- `project_id: str`

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
role = client.admin.organization.projects.users.roles.delete(
    role_id="role_id",
    project_id="project_id",
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
