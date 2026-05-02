## Create invite

`admin.organization.invites.create(InviteCreateParams**kwargs)  -> Invite`

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Parameters

- `email: str`

  Send an email to this address

- `role: Literal["reader", "owner"]`

  `owner` or `reader`

  - `"reader"`

  - `"owner"`

- `projects: Optional[Iterable[Project]]`

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

  - `id: str`

    Project's public ID

  - `role: Literal["member", "owner"]`

    Project membership role

    - `"member"`

    - `"owner"`

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
invite = client.admin.organization.invites.create(
    email="email",
    role="reader",
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
