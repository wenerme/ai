## Delete project user

`client.admin.organization.projects.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.projects.users.delete('user_id', {
  project_id: 'project_id',
});

console.log(user.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```
