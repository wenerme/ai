## Retrieve invite

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Path Parameters

- `invite_id: string`

### Returns

- `Invite object { id, created_at, email, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

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

  - `accepted_at: optional number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at: optional number`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```http
curl https://api.openai.com/v1/organization/invites/$INVITE_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/invites/invite-abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.invite",
    "id": "invite-abc",
    "email": "user@example.com",
    "role": "owner",
    "status": "accepted",
    "created_at": 1711471533,
    "expires_at": 1711471533,
    "accepted_at": 1711471533
}
```
