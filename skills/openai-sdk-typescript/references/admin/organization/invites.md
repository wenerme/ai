# Invites

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

    An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior. If empty list is passed, the user will not be invited to any projects, including the default one.

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

## Retrieve invite

`client.admin.organization.invites.retrieve(stringinviteID, RequestOptionsoptions?): Invite`

**get** `/organization/invites/{invite_id}`

Retrieves an invite.

### Parameters

- `inviteID: string`

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

const invite = await client.admin.organization.invites.retrieve('invite_id');

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

## Delete invite

`client.admin.organization.invites.delete(stringinviteID, RequestOptionsoptions?): InviteDeleteResponse`

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Parameters

- `inviteID: string`

### Returns

- `InviteDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const invite = await client.admin.organization.invites.delete('invite_id');

console.log(invite.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```

## Domain Types

### Invite

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

### Invite Delete Response

- `InviteDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`
