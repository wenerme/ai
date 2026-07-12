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
