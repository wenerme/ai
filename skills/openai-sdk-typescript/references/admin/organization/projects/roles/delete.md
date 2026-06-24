## Delete project role

`client.admin.organization.projects.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.roles.delete('role_id', {
  project_id: 'project_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```
