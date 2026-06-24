## List groups

`admin.organization.groups.list(GroupListParams**kwargs)  -> SyncNextCursorPage[Group]`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: Optional[Literal["asc", "desc"]]`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `class Group: …`

  Details about an organization group.

  - `id: str`

    Identifier for the group.

  - `created_at: int`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: Literal["group", "tenant_group"]`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

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
page = client.admin.organization.groups.list()
page = page.data[0]
print(page.id)
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "group_type": "group",
      "is_scim_managed": true,
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
