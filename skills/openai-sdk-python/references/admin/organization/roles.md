# Roles

## List organization roles

`admin.organization.roles.list(RoleListParams**kwargs)  -> SyncNextCursorPage[Role]`

**get** `/organization/roles`

Lists the roles configured for the organization.

### Parameters

- `after: Optional[str]`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: Optional[int]`

  A limit on the number of roles to return. Defaults to 1000.

- `order: Optional[Literal["asc", "desc"]]`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `class Role: …`

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
page = client.admin.organization.roles.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
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
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Create organization role

`admin.organization.roles.create(RoleCreateParams**kwargs)  -> Role`

**post** `/organization/roles`

Creates a custom role for the organization.

### Parameters

- `permissions: Sequence[str]`

  Permissions to grant to the role.

- `role_name: str`

  Unique name for the role.

- `description: Optional[str]`

  Optional description of the role.

### Returns

- `class Role: …`

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
role = client.admin.organization.roles.create(
    permissions=["string"],
    role_name="role_name",
)
print(role.id)
```

#### Response

```json
{
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
```

## Update organization role

`admin.organization.roles.update(strrole_id, RoleUpdateParams**kwargs)  -> Role`

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Parameters

- `role_id: str`

- `description: Optional[str]`

  New description for the role.

- `permissions: Optional[Sequence[str]]`

  Updated set of permissions for the role.

- `role_name: Optional[str]`

  New name for the role.

### Returns

- `class Role: …`

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
role = client.admin.organization.roles.update(
    role_id="role_id",
)
print(role.id)
```

#### Response

```json
{
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
```

## Delete organization role

`admin.organization.roles.delete(strrole_id)  -> RoleDeleteResponse`

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Parameters

- `role_id: str`

### Returns

- `class RoleDeleteResponse: …`

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
role = client.admin.organization.roles.delete(
    "role_id",
)
print(role.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

## Domain Types

### Role

- `class Role: …`

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

  Confirmation payload returned after deleting a role.

  - `id: str`

    Identifier of the deleted role.

  - `deleted: bool`

    Whether the role was deleted.

  - `object: Literal["role.deleted"]`

    Always `role.deleted`.

    - `"role.deleted"`
