## Create project user

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `role: string`

  `owner` or `member`

- `email: optional string`

  Email of the user to add.

- `user_id: optional string`

  The ID of the user.

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

  Represents an individual user in a project.

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

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role": "role"
        }'
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/users \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "user_id": "user_abc",
      "role": "member"
  }'
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```
