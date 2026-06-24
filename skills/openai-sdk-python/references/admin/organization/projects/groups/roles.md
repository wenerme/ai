# Roles

## List project group role assignments

`admin.organization.projects.groups.roles.list(strgroup_id, RoleListParams**kwargs)  -> SyncNextCursorPage[RoleListResponse]`

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Parameters

- `project_id: str`

- `group_id: str`

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
page = client.admin.organization.projects.groups.roles.list(
    group_id="group_id",
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

## Assign project role to group

`admin.organization.projects.groups.roles.create(strgroup_id, RoleCreateParams**kwargs)  -> RoleCreateResponse`

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Parameters

- `project_id: str`

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
role = client.admin.organization.projects.groups.roles.create(
    group_id="group_id",
    project_id="project_id",
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

## Retrieve project group role

`admin.organization.projects.groups.roles.retrieve(strrole_id, RoleRetrieveParams**kwargs)  -> RoleRetrieveResponse`

**get** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Retrieves a project role assigned to a group.

### Parameters

- `project_id: str`

- `group_id: str`

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
role = client.admin.organization.projects.groups.roles.retrieve(
    role_id="role_id",
    project_id="project_id",
    group_id="group_id",
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

## Unassign project role from group

`admin.organization.projects.groups.roles.delete(strrole_id, RoleDeleteParams**kwargs)  -> RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `project_id: str`

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
role = client.admin.organization.projects.groups.roles.delete(
    role_id="role_id",
    project_id="project_id",
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
