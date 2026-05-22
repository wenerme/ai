## Retrieve project role

`admin.organization.projects.roles.retrieve(strrole_id, RoleRetrieveParams**kwargs)  -> Role`

**get** `/projects/{project_id}/roles/{role_id}`

Retrieves a project role.

### Parameters

- `project_id: str`

- `role_id: str`

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
role = client.admin.organization.projects.roles.retrieve(
    role_id="role_id",
    project_id="project_id",
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
