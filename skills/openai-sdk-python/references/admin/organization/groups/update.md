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
