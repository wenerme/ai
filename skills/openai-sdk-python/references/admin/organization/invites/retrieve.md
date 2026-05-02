## Retrieve invite

`admin.organization.invites.retrieve(strinvite_id)  -> Invite`

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Parameters

- `invite_id: str`

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
invite = client.admin.organization.invites.retrieve(
    "invite_id",
)
print(invite.id)
```

#### Response

```json
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
```
