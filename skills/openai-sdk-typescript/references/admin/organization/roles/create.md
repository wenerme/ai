## Create organization role

`client.admin.organization.roles.create(RoleCreateParamsbody, RequestOptionsoptions?): Role`

**post** `/organization/roles`

Creates a custom role for the organization.

### Parameters

- `body: RoleCreateParams`

  - `permissions: Array<string>`

    Permissions to grant to the role.

  - `role_name: string`

    Unique name for the role.

  - `description?: string | null`

    Optional description of the role.

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

const role = await client.admin.organization.roles.create({
  permissions: ['string'],
  role_name: 'role_name',
});

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
