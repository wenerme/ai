## Delete invite

`admin.organization.invites.delete(strinvite_id)  -> InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `invite_id: str`

### Returns

- `class InviteDeleteResponse: …`

  - `id: str`

  - `deleted: bool`

  - `object: Literal["organization.invite.deleted"]`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
invite = client.admin.organization.invites.delete(
    "invite_id",
)
print(invite.id)
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```
