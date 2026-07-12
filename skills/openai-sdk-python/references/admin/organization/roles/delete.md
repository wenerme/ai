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
