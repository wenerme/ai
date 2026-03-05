# Users

## List

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Path Parameters

- `group_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

- `limit: optional number`

  A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of users in the list.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of User`

  Users in the current page.

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

- `has_more: boolean`

  Whether more users are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when no further users are available.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

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
