## Retrieve user

**get** `/organization/users/{user_id}`

Retrieves a user by their identifier.

### Path Parameters

- `user_id: string`

### Returns

- `User object { id, added_at, email, 3 more }`

  Represents an individual `user` within an organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the user was added.

  - `email: string`

    The email address of the user

  - `name: string`

    The name of the user

  - `object: "organization.user"`

    The object type, which is always `organization.user`

    - `"organization.user"`

  - `role: "owner" or "reader"`

    `owner` or `reader`

    - `"owner"`

    - `"reader"`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.user",
  "role": "owner"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```
