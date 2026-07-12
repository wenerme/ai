## List project users

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

- `has_more: boolean`

- `object: string`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "object": "organization.project.user",
      "role": "role",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "object": "object",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.user",
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
