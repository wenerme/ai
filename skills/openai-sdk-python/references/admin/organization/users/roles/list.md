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
