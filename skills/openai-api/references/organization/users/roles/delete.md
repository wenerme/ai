## Delete

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Path Parameters

- `user_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/organization/users/$USER_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
