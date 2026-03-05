## Create

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `role: "owner" or "member"`

  `owner` or `member`

  - `"owner"`

  - `"member"`

- `user_id: string`

  The ID of the user.

### Returns

- `ProjectUser = object { id, added_at, email, 3 more }`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `email: string`

    The email address of the user

  - `name: string`

    The name of the user

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "role": "owner",
          "user_id": "user_id"
        }'
```
