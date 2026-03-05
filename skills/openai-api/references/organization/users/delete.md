## Delete

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
