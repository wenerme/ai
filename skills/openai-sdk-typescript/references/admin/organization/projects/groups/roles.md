# Roles

## List project group role assignments

`client.admin.organization.projects.groups.roles.list(stringgroupID, RoleListParamsparams, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Parameters

- `groupID: string`

- `params: RoleListParams`

  - `project_id: string`

    Path param: The ID of the project to inspect.

  - `after?: string`

    Query param: Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

  - `limit?: number`

    Query param: A limit on the number of project role assignments to return.

  - `order?: "asc" | "desc"`

    Query param: Sort order for the returned project roles.

    - `"asc"`

    - `"desc"`

### Returns

- `RoleListResponse`

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

// Automatically fetches more pages as needed.
for await (const roleListResponse of client.admin.organization.projects.groups.roles.list(
  'group_id',
  { project_id: 'project_id' },
)) {
  console.log(roleListResponse.id);
}
```

#### Response

```json
{
  "data": [
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
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Assign project role to group

`client.admin.organization.projects.groups.roles.create(stringgroupID, RoleCreateParamsparams, RequestOptionsoptions?): RoleCreateResponse`

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Parameters

- `groupID: string`

- `params: RoleCreateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `role_id: string`

    Body param: Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: string`

      Identifier for the group.

    - `created_at: number`

      Unix timestamp (in seconds) when the group was created.

    - `name: string`

      Display name of the group.

    - `object: "group"`

      Always `group`.

      - `"group"`

    - `scim_managed: boolean`

      Whether the group is managed through SCIM.

  - `object: "group.role"`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

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

const role = await client.admin.organization.projects.groups.roles.create('group_id', {
  project_id: 'project_id',
  role_id: 'role_id',
});

console.log(role.group);
```

#### Response

```json
{
  "group": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "group",
    "scim_managed": true
  },
  "object": "group.role",
  "role": {
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
}
```

## Retrieve project group role

`client.admin.organization.projects.groups.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Retrieves a project role assigned to a group.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `project_id: string`

    The ID of the project to inspect.

  - `group_id: string`

    The ID of the group to inspect.

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

const role = await client.admin.organization.projects.groups.roles.retrieve('role_id', {
  project_id: 'project_id',
  group_id: 'group_id',
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

## Unassign project role from group

`client.admin.organization.projects.groups.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to modify.

  - `group_id: string`

    The ID of the group whose project role assignment should be removed.

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

const role = await client.admin.organization.projects.groups.roles.delete('role_id', {
  project_id: 'project_id',
  group_id: 'group_id',
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

## Domain Types

### Role List Response

- `RoleListResponse`

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

### Role Create Response

- `RoleCreateResponse`

  Role assignment linking a group to a role.

  - `group: Group`

    Summary information about a group returned in role assignment responses.

    - `id: string`

      Identifier for the group.

    - `created_at: number`

      Unix timestamp (in seconds) when the group was created.

    - `name: string`

      Display name of the group.

    - `object: "group"`

      Always `group`.

      - `"group"`

    - `scim_managed: boolean`

      Whether the group is managed through SCIM.

  - `object: "group.role"`

    Always `group.role`.

    - `"group.role"`

  - `role: Role`

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

### Role Retrieve Response

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

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.
