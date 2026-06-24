## Create project user

`client.admin.organization.projects.users.create(stringprojectID, UserCreateParamsbody, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `projectID: string`

- `body: UserCreateParams`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    Email of the user to add.

  - `user_id?: string | null`

    The ID of the user.

### Returns

- `ProjectUser`

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

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.create('project_id', {
  role: 'role',
});

console.log(projectUser.id);
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
