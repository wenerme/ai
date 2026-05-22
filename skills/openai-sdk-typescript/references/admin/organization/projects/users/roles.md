# Roles

## List project user role assignments

`client.admin.organization.projects.users.roles.list(stringuserID, RoleListParamsparams, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Parameters

- `userID: string`

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
for await (const roleListResponse of client.admin.organization.projects.users.roles.list(
  'user_id',
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

## Assign project role to user

`client.admin.organization.projects.users.roles.create(stringuserID, RoleCreateParamsparams, RequestOptionsoptions?): RoleCreateResponse`

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Parameters

- `userID: string`

- `params: RoleCreateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `role_id: string`

    Body param: Identifier of the role to assign.

### Returns

- `RoleCreateResponse`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

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

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: string`

      The identifier, which can be referenced in API endpoints

    - `added_at: number`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: "organization.user"`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const role = await client.admin.organization.projects.users.roles.create('user_id', {
  project_id: 'project_id',
  role_id: 'role_id',
});

console.log(role.object);
```

#### Response

```json
{
  "object": "user.role",
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
  },
  "user": {
    "id": "id",
    "added_at": 0,
    "object": "organization.user",
    "api_key_last_used_at": 0,
    "created": 0,
    "developer_persona": "developer_persona",
    "email": "email",
    "is_default": true,
    "is_scale_tier_authorized_purchaser": true,
    "is_scim_managed": true,
    "is_service_account": true,
    "name": "name",
    "projects": {
      "data": [
        {
          "id": "id",
          "name": "name",
          "role": "role"
        }
      ],
      "object": "list"
    },
    "role": "role",
    "technical_level": "technical_level",
    "user": {
      "id": "id",
      "object": "user",
      "banned": true,
      "banned_at": 0,
      "email": "email",
      "enabled": true,
      "name": "name",
      "picture": "picture"
    }
  }
}
```

## Retrieve project user role

`client.admin.organization.projects.users.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Retrieves a project role assigned to a user.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

  - `project_id: string`

    The ID of the project to inspect.

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

const role = await client.admin.organization.projects.users.roles.retrieve('role_id', {
  project_id: 'project_id',
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

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

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

  - `user: OrganizationUser`

    Represents an individual `user` within an organization.

    - `id: string`

      The identifier, which can be referenced in API endpoints

    - `added_at: number`

      The Unix timestamp (in seconds) of when the user was added.

    - `object: "organization.user"`

      The object type, which is always `organization.user`

      - `"organization.user"`

    - `api_key_last_used_at?: number | null`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created?: number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona?: string | null`

      The developer persona metadata for the user.

    - `email?: string | null`

      The email address of the user

    - `is_default?: boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser?: boolean | null`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed?: boolean`

      Whether the user is managed through SCIM.

    - `is_service_account?: boolean`

      Whether the user is a service account.

    - `name?: string | null`

      The name of the user

    - `projects?: Projects | null`

      Projects associated with the user, if included.

      - `data: Array<Data>`

        - `id?: string | null`

        - `name?: string | null`

        - `role?: string | null`

      - `object: "list"`

        - `"list"`

    - `role?: string | null`

      `owner` or `reader`

    - `technical_level?: string | null`

      The technical level metadata for the user.

    - `user?: User`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned?: boolean | null`

      - `banned_at?: number | null`

      - `email?: string | null`

      - `enabled?: boolean | null`

      - `name?: string | null`

      - `picture?: string | null`

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
