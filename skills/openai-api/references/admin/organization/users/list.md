## List users

**get** `/organization/users`

Lists all of the users in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `emails: optional array of string`

  Filter by the email address of users.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of OrganizationUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "object": "organization.user",
      "api_key_last_used_at": 0,
      "created": 0,
      "developer_persona": "developer_persona",
      "email": "email",
      "is_default": true,
      "is_scale_tier_authorized_purchaser": true,
      "is_scim_managed": true,
      "is_service_account": true,
      "name": "name",
      "projects": {
        "data": [
          {
            "id": "id",
            "name": "name",
            "role": "role"
          }
        ],
        "object": "list"
      },
      "role": "role",
      "technical_level": "technical_level",
      "user": {
        "id": "id",
        "object": "user",
        "banned": true,
        "banned_at": 0,
        "email": "email",
        "enabled": true,
        "name": "name",
        "picture": "picture"
      }
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
curl https://api.openai.com/v1/organization/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.user",
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "added_at": 1711471533
        }
    ],
    "first_id": "user-abc",
    "last_id": "user-xyz",
    "has_more": false
}
```
