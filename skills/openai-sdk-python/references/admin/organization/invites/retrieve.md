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

  - `email: str`

    The email address of the individual to whom the invite was sent

  - `expires_at: int`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: int`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: Literal["organization.invite"]`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

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

  - `projects: Optional[List[Project]]`

    The projects that were granted membership upon acceptance of the invite.

    - `id: Optional[str]`

      Project's public ID

    - `role: Optional[Literal["member", "owner"]]`

      Project membership role

      - `"member"`

      - `"owner"`

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
  "email": "email",
  "expires_at": 0,
  "invited_at": 0,
  "object": "organization.invite",
  "role": "owner",
  "status": "accepted",
  "accepted_at": 0,
  "projects": [
    {
      "id": "id",
      "role": "member"
    }
  ]
}
```
