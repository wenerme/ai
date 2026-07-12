## Unassign organization role from user

`client.admin.organization.users.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/users/{user_id}/roles/{role_id}`

Unassigns an organization role from a user within the organization.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `user_id: string`

    The ID of the user to modify.

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

const role = await client.admin.organization.users.roles.delete('role_id', { user_id: 'user_id' });

console.log(role.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```
