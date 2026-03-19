## Delete user

**delete** `/organization/users/{user_id}`

Deletes a user from the organization.

### Path Parameters

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.user.deleted"`

  - `"organization.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.user.deleted",
    "id": "user_abc",
    "deleted": true
}
```
