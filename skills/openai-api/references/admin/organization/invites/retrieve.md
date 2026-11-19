## Retrieve invite

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Path Parameters

- `invite_id: string`

  The ID of the invite to retrieve.

### Returns

- `Invite object { id, created_at, email, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: integer`

    The Unix timestamp (in seconds) of when the invite was sent.

    `format: unixtime`

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

  - `projects: array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" or "expired" or "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at: optional integer or null`

    The Unix timestamp (in seconds) of when the invite was accepted.

    `format: unixtime`

  - `expires_at: optional integer or null`

    The Unix timestamp (in seconds) of when the invite expires.

    `format: unixtime`

### Example

```http
curl https://api.openai.com/v1/organization/invites/invite-abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

```json
{
    "object": "organization.invite",
    "id": "invite-abc",
    "email": "user@example.com",
    "role": "owner",
    "status": "accepted",
    "created_at": 1711471533,
    "expires_at": 1711471533,
    "accepted_at": 1711471533,
    "projects": []
}
```
