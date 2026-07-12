## Unassign project role from user

`client.admin.organization.projects.users.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to modify.

  - `user_id: string`

    The ID of the user whose project role assignment should be removed.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.users.roles.delete('role_id', {
  project_id: 'project_id',
  user_id: 'user_id',
});

console.log(role.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```
