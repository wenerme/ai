# Invites

## List invites

**get** `/organization/invites`

Returns a list of invites in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of Invite`

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

- `has_more: boolean`

  The `has_more` property is used for pagination to indicate there are additional results.

- `object: "list"`

  The object type, which is always `list`

  - `"list"`

- `first_id: optional string`

  The first `invite_id` in the retrieved `list`

- `last_id: optional string`

  The last `invite_id` in the retrieved `list`

### Example

```http
curl https://api.openai.com/v1/organization/invites \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/invites?after=invite-abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
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
  ],
  "first_id": "invite-abc",
  "last_id": "invite-abc",
  "has_more": false
}
```

## Create invite

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

  An array of projects to which membership is granted at the same time the org invite is accepted. If omitted, the user will be invited to the default project for compatibility with legacy behavior. If empty list is passed, the user will not be invited to any projects, including the default one.

  - `id: string`

    Project's public ID

  - `role: "member" or "owner"`

    Project membership role

    - `"member"`

    - `"owner"`

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
curl https://api.openai.com/v1/organization/invites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "email": "email",
          "role": "reader"
        }'
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
curl -X POST https://api.openai.com/v1/organization/invites \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "email": "anotheruser@example.com",
      "role": "reader",
      "projects": [
        {
          "id": "project-xyz",
          "role": "member"
        },
        {
          "id": "project-abc",
          "role": "owner"
        }
      ]
  }'
```

#### Response

```json
{
  "object": "organization.invite",
  "id": "invite-def",
  "email": "anotheruser@example.com",
  "role": "reader",
  "status": "pending",
  "created_at": 1711471533,
  "expires_at": 1711471533,
  "accepted_at": null,
  "projects": [
    {
      "id": "project-xyz",
      "role": "member"
    },
    {
      "id": "project-abc",
      "role": "owner"
    }
  ]
}
```

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

## Delete invite

**delete** `/organization/invites/{invite_id}`

Delete an invite. If the invite has already been accepted, it cannot be deleted.

### Path Parameters

- `invite_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.invite.deleted"`

  The object type, which is always `organization.invite.deleted`

  - `"organization.invite.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/invites/$INVITE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.invite.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/invites/invite-abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.invite.deleted",
    "id": "invite-abc",
    "deleted": true
}
```

## Domain Types

### Invite

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

### Invite Delete Response

- `InviteDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.invite.deleted"`

    The object type, which is always `organization.invite.deleted`

    - `"organization.invite.deleted"`
