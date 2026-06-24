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
