## List invites

`admin.organization.invites.list(InviteListParams**kwargs)  -> SyncConversationCursorPage[Invite]`

**get** `/organization/invites`

Returns a list of invites in the organization.

### Parameters

- `after: Optional[str]`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: Optional[int]`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `class Invite: …`

  Represents an individual `invite` to the organization.

  - `id: str`

    The identifier, which can be referenced in API endpoints

  - `created_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: List[Project]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: str`

      Project's public ID

    - `role: Literal["member", "owner"]`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: Literal["owner", "reader"]`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: Literal["accepted", "expired", "pending"]`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: Optional[int]`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```python
import os
from openai import OpenAI

client = OpenAI(
    admin_api_key=os.environ.get("OPENAI_ADMIN_KEY"),  # This is the default and can be omitted
)
page = client.admin.organization.invites.list()
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
      "email": "email",
      "object": "organization.invite",
      "projects": [
        {
          "id": "id",
          "role": "member"
        }
      ],
      "role": "owner",
      "status": "accepted",
      "accepted_at": 0,
      "expires_at": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```
