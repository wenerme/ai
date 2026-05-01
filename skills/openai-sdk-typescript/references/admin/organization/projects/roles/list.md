## List project roles

`client.admin.organization.projects.roles.list(stringprojectID, RoleListParamsquery?, RequestOptionsoptions?): CursorPage<Role>`

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Parameters

- `projectID: string`

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

  - `limit?: number`

    A limit on the number of roles to return. Defaults to 1000.

  - `order?: "asc" | "desc"`

    Sort order for the returned roles.

    - `"asc"`

    - `"desc"`

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

// Automatically fetches more pages as needed.
for await (const role of client.admin.organization.projects.roles.list('project_id')) {
  console.log(role.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```
