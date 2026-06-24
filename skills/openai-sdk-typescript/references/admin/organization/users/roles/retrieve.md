## Retrieve user organization role

`client.admin.organization.users.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/organization/users/{user_id}/roles/{role_id}`

Retrieves an organization role assigned to a user.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `user_id: string`

    The ID of the user to inspect.

### Returns

- `RoleRetrieveResponse`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: Array<AssignmentSource> | null`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

  - `created_at: number | null`

    When the role was created.

  - `created_by: string | null`

    Identifier of the actor who created the role.

  - `created_by_user_obj: Record<string, unknown> | null`

    User details for the actor that created the role, when available.

  - `description: string | null`

    Description of the role.

  - `metadata: Record<string, unknown> | null`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: Array<string>`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number | null`

    When the role was last updated.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.users.roles.retrieve('role_id', {
  user_id: 'user_id',
});

console.log(role.id);
```

#### Response

```json
{
  "id": "id",
  "assignment_sources": [
    {
      "principal_id": "principal_id",
      "principal_type": "principal_type"
    }
  ],
  "created_at": 0,
  "created_by": "created_by",
  "created_by_user_obj": {
    "foo": "bar"
  },
  "description": "description",
  "metadata": {
    "foo": "bar"
  },
  "name": "name",
  "permissions": [
    "string"
  ],
  "predefined_role": true,
  "resource_type": "resource_type",
  "updated_at": 0
}
```
