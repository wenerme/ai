## List invites

`client.admin.organization.invites.list(InviteListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Invite>`

**get** `/organization/invites`

Returns a list of invites in the organization.

### Parameters

- `query: InviteListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `Invite`

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

  - `role: "owner" | "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

  - `status: "accepted" | "expired" | "pending"`

    `accepted`,`expired`, or `pending`

    - `"accepted"`

    - `"expired"`

    - `"pending"`

  - `accepted_at?: number`

    The Unix timestamp (in seconds) of when the invite was accepted.

  - `projects?: Array<Project>`

    The projects that were granted membership upon acceptance of the invite.

    - `id?: string`

      Project's public ID

    - `role?: "member" | "owner"`

      Project membership role

      - `"member"`

      - `"owner"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const invite of client.admin.organization.invites.list()) {
  console.log(invite.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "object": "list",
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id"
}
```
