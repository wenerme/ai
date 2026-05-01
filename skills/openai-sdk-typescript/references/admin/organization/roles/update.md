## Update organization role

`client.admin.organization.roles.update(stringroleID, RoleUpdateParamsbody, RequestOptionsoptions?): Role`

**post** `/organization/roles/{role_id}`

Updates an existing organization role.

### Parameters

- `roleID: string`

- `body: RoleUpdateParams`

  - `description?: string | null`

    New description for the role.

  - `permissions?: Array<string> | null`

    Updated set of permissions for the role.

  - `role_name?: string | null`

    New name for the role.

### Returns

- `Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string | null`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: Array<string>`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.roles.update('role_id');

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "description": "description",
  "name": "name",
  "object": "role",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type"
}
```
