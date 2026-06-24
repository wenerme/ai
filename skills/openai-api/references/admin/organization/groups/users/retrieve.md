## Retrieve group user

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieves a user in a group.

### Path Parameters

- `group_id: string`

- `user_id: string`

### Returns

- `id: string`

  Identifier for the user.

- `email: string`

  Email address of the user, or `null` for users without an email.

- `is_service_account: boolean`

  Whether the user is a service account.

- `name: string`

  Display name of the user.

- `picture: string`

  URL of the user's profile picture, if available.

- `user_type: "user" or "tenant_user"`

  The type of user.

  - `"user"`

  - `"tenant_user"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "is_service_account": true,
  "name": "name",
  "picture": "picture",
  "user_type": "user"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users/user_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "user_abc123",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "picture": null,
    "is_service_account": false,
    "user_type": "user"
}
```
