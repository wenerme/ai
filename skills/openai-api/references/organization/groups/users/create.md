## Create

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Path Parameters

- `group_id: string`

### Body Parameters

- `user_id: string`

  Identifier of the user to add to the group.

### Returns

- `group_id: string`

  Identifier of the group the user was added to.

- `object: "group.user"`

  Always `group.user`.

  - `"group.user"`

- `user_id: string`

  Identifier of the user that was added.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "user_id": "user_id"
        }'
```
