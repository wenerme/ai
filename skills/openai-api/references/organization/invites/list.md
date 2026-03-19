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

- `object: "list"`

  The object type, which is always `list`

  - `"list"`

- `first_id: optional string`

  The first `invite_id` in the retrieved `list`

- `has_more: optional boolean`

  The `has_more` property is used for pagination to indicate there are additional results.

- `last_id: optional string`

  The last `invite_id` in the retrieved `list`

### Example

```http
curl https://api.openai.com/v1/organization/invites \
    -H "Authorization: Bearer $OPENAI_API_KEY"
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
      "invited_at": 1711471533,
      "expires_at": 1711471533,
      "accepted_at": 1711471533
    }
  ],
  "first_id": "invite-abc",
  "last_id": "invite-abc",
  "has_more": false
}
```
