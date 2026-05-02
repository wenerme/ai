# Groups

## List project groups

`client.admin.organization.projects.groups.list(stringprojectID, GroupListParamsquery?, RequestOptionsoptions?): NextCursorPage<ProjectGroup>`

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Parameters

- `projectID: string`

- `query: GroupListParams`

  - `after?: string`

    Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

  - `limit?: number`

    A limit on the number of project groups to return. Defaults to 20.

  - `order?: "asc" | "desc"`

    Sort order for the returned groups.

    - `"asc"`

    - `"desc"`

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectGroup of client.admin.organization.projects.groups.list('project_id')) {
  console.log(projectGroup.group_id);
}
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
      "group_type": "group_type",
      "object": "project.group",
      "project_id": "project_id"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Add project group

`client.admin.organization.projects.groups.create(stringprojectID, GroupCreateParamsbody, RequestOptionsoptions?): ProjectGroup`

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Parameters

- `projectID: string`

- `body: GroupCreateParams`

  - `group_id: string`

    Identifier of the group to add to the project.

  - `role: string`

    Identifier of the project role to grant to the group.

### Returns

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectGroup = await client.admin.organization.projects.groups.create('project_id', {
  group_id: 'group_id',
  role: 'role',
});

console.log(projectGroup.group_id);
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group_type",
  "object": "project.group",
  "project_id": "project_id"
}
```

## Remove project group

`client.admin.organization.projects.groups.delete(stringgroupID, GroupDeleteParamsparams, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Parameters

- `groupID: string`

- `params: GroupDeleteParams`

  - `project_id: string`

    The ID of the project to update.

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.projects.groups.delete('group_id', {
  project_id: 'project_id',
});

console.log(group.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```

## Domain Types

### Project Group

- `ProjectGroup`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: string`

    The type of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Group Delete Response

- `GroupDeleteResponse`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

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

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.
