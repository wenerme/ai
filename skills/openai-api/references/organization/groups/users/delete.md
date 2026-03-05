## Delete

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Path Parameters

- `group_id: string`

- `user_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership was removed.

- `object: "group.user.deleted"`

  Always `group.user.deleted`.

  - `"group.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```
