## List users

**get** `/organization/users`

Lists all of the users in the organization.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `emails: optional array of string`

  Filter by the email address of users.

- `limit: optional integer (default: 20)`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of OrganizationUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: integer`

    The Unix timestamp (in seconds) of when the user was added.

    `format: unixtime`

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `api_key_last_used_at: optional integer or null`

    The Unix timestamp (in seconds) of the user's last API key usage.

    `format: unixtime`

  - `created: optional integer`

    The Unix timestamp (in seconds) of when the user was created.

    `format: unixtime`

  - `developer_persona: optional string or null`

    The developer persona metadata for the user.

  - `email: optional string or null`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean or null`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string or null`

    The name of the user

  - `projects: optional object { data, object }  or null`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string or null`

      - `name: optional string or null`

      - `role: optional string or null`

    - `object: "list"`

      - `"list"`

  - `role: optional string or null`

    `owner` or `reader`

  - `technical_level: optional string or null`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean or null`

    - `banned_at: optional integer or null`

      `format: unixtime`

    - `email: optional string or null`

    - `enabled: optional boolean or null`

    - `name: optional string or null`

    - `picture: optional string or null`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string or null`

- `last_id: optional string or null`

### Example

```http
curl https://api.openai.com/v1/organization/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response example

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
