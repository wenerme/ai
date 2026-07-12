## Delete organization role

`client.admin.organization.roles.delete(stringroleID, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/roles/{role_id}`

Deletes a custom role from the organization.

### Parameters

- `roleID: string`

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

const role = await client.admin.organization.roles.delete('role_id');

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
