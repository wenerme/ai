## Create group

`admin.organization.groups.create(GroupCreateParams**kwargs)  -> Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `name: str`

  Human readable name for the group.

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: bool`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: str`

    Display name of the group.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
group = client.admin.organization.groups.create(
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
