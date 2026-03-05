# Users

## List

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

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

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

## Retrieve

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

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
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Update

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role: "owner" or "member"`

  `owner` or `member`

  - `"owner"`

  - `"member"`

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
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "role": "owner"
        }'
```

## Delete

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.user.deleted"`

  - `"organization.project.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Domain Types

### Project User

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
