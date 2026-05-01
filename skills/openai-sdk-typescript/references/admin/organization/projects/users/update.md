## Modify project user

`client.admin.organization.projects.users.update(stringuserID, UserUpdateParamsparams, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `userID: string`

- `params: UserUpdateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `role: "owner" | "member"`

    Body param: `owner` or `member`

    - `"owner"`

    - `"member"`

### Returns

- `ProjectUser`

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

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.update('user_id', {
  project_id: 'project_id',
  role: 'owner',
});

console.log(projectUser.id);
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "email": "email",
  "name": "name",
  "object": "organization.project.user",
  "role": "owner"
}
```
