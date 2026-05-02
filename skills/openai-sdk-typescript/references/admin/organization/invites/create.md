## Create invite

`client.admin.organization.invites.create(InviteCreateParamsbody, RequestOptionsoptions?): Invite`

**post** `/organization/invites`

Create an invite for a user to the organization. The invite must be accepted by the user before they have access to the organization.

### Parameters

- `body: InviteCreateParams`

  - `email: string`

    Send an email to this address

  - `role: "reader" | "owner"`

    `owner` or `reader`

    - `"reader"`

    - `"owner"`

  - `projects?: Array<Project>`

    An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

### Returns

- `Invite`

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

  - `projects: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id: string`

      Project's public ID

    - `role: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number | null`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `expires_at?: number | null`

    The Unix timestamp (in seconds) of when the invite expires.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.create({ email: 'email', role: 'reader' });

console.log(invite.id);
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
