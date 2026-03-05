## Create

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Body Parameters

- `email: string`

  Send an email to this address

- `role: "reader" or "owner"`

  `owner` or `reader`

  - `"reader"`

  - `"owner"`

- `projects: optional array of object { id, role }`

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

  - `id: string`

    Project's public ID

  - `role: "member" or "owner"`

    Project membership role

    - `"member"`

    - `"owner"`

### Returns

- `Invite = object { id, email, expires_at, 6 more }`

  Represents an individual `invite` to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string`

    The email address of the individual to whom the invite was sent

  - `expires_at: number`

    The Unix timestamp (in seconds) of when the invite expires.

  - `invited_at: number`

    The Unix timestamp (in seconds) of when the invite was sent.

  - `object: "organization.invite"`

    The object type, which is always `organization.invite`

    - `"organization.invite"`

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

  - `projects: optional array of object { id, role }`

    The projects that were granted membership upon acceptance of the invite.

    - `id: optional string`

      Project's public ID

    - `role: optional "member" or "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

### Example

```http
curl https://api.openai.com/v1/organization/invites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "email": "email",
          "role": "reader"
        }'
```
