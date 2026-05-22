# Groups

## List groups

`client.admin.organization.groups.list(GroupListParamsquery?, RequestOptionsoptions?): NextCursorPage<Group>`

**get** `/organization/groups`

Lists all groups in the organization.

### Parameters

- `query: GroupListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of the returned groups.

    - `"asc"`

    - `"desc"`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const group of client.admin.organization.groups.list()) {
  console.log(group.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "group_type": "group",
      "is_scim_managed": true,
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Create group

`client.admin.organization.groups.create(GroupCreateParamsbody, RequestOptionsoptions?): Group`

**post** `/organization/groups`

Creates a new group in the organization.

### Parameters

- `body: GroupCreateParams`

  - `name: string`

    Human readable name for the group.

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.create({ name: 'x' });

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group",
  "is_scim_managed": true,
  "name": "name"
}
```

## Retrieve group

`client.admin.organization.groups.retrieve(stringgroupID, RequestOptionsoptions?): Group`

**get** `/organization/groups/{group_id}`

Retrieves a group.

### Parameters

- `groupID: string`

### Returns

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.retrieve('group_id');

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "group_type": "group",
  "is_scim_managed": true,
  "name": "name"
}
```

## Update group

`client.admin.organization.groups.update(stringgroupID, GroupUpdateParamsbody, RequestOptionsoptions?): GroupUpdateResponse`

**post** `/organization/groups/{group_id}`

Updates a group's information.

### Parameters

- `groupID: string`

- `body: GroupUpdateParams`

  - `name: string`

    New display name for the group.

### Returns

- `GroupUpdateResponse`

  Response returned after updating a group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Updated display name for the group.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.update('group_id', { name: 'x' });

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "is_scim_managed": true,
  "name": "name"
}
```

## Delete group

`client.admin.organization.groups.delete(stringgroupID, RequestOptionsoptions?): GroupDeleteResponse`

**delete** `/organization/groups/{group_id}`

Deletes a group from the organization.

### Parameters

- `groupID: string`

### Returns

- `GroupDeleteResponse`

  Confirmation payload returned after deleting a group.

  - `id: string`

    Identifier of the deleted group.

  - `deleted: boolean`

    Whether the group was deleted.

  - `object: "group.deleted"`

    Always `group.deleted`.

    - `"group.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const group = await client.admin.organization.groups.delete('group_id');

console.log(group.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```

## Domain Types

### Group

- `Group`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" | "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Group Update Response

- `GroupUpdateResponse`

  Response returned after updating a group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Updated display name for the group.

### Group Delete Response

- `GroupDeleteResponse`

  Confirmation payload returned after deleting a group.

  - `id: string`

    Identifier of the deleted group.

  - `deleted: boolean`

    Whether the group was deleted.

  - `object: "group.deleted"`

    Always `group.deleted`.

    - `"group.deleted"`

# Users

## List group users

`client.admin.organization.groups.users.list(stringgroupID, UserListParamsquery?, RequestOptionsoptions?): NextCursorPage<OrganizationGroupUser>`

**get** `/organization/groups/{group_id}/users`

Lists the users assigned to a group.

### Parameters

- `groupID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

  - `limit?: number`

    A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

  - `order?: "asc" | "desc"`

    Specifies the sort order of users in the list.

    - `"asc"`

    - `"desc"`

### Returns

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const organizationGroupUser of client.admin.organization.groups.users.list('group_id')) {
  console.log(organizationGroupUser.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "next": "next",
  "object": "list"
}
```

## Add group user

`client.admin.organization.groups.users.create(stringgroupID, UserCreateParamsbody, RequestOptionsoptions?): UserCreateResponse`

**post** `/organization/groups/{group_id}/users`

Adds a user to a group.

### Parameters

- `groupID: string`

- `body: UserCreateParams`

  - `user_id: string`

    Identifier of the user to add to the group.

### Returns

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.create('group_id', {
  user_id: 'user_id',
});

console.log(user.group_id);
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```

## Retrieve group user

`client.admin.organization.groups.users.retrieve(stringuserID, UserRetrieveParamsparams, RequestOptionsoptions?): UserRetrieveResponse`

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieves a user in a group.

### Parameters

- `userID: string`

- `params: UserRetrieveParams`

  - `group_id: string`

    The ID of the group to inspect.

### Returns

- `UserRetrieveResponse`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string | null`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean | null`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string | null`

    URL of the user's profile picture, if available.

  - `user_type: "user" | "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.retrieve('user_id', {
  group_id: 'group_id',
});

console.log(user.id);
```

#### Response

```json
{
  "id": "id",
  "email": "email",
  "is_service_account": true,
  "name": "name",
  "picture": "picture",
  "user_type": "user"
}
```

## Remove group user

`client.admin.organization.groups.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/groups/{group_id}/users/{user_id}`

Removes a user from a group.

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `group_id: string`

    The ID of the group to update.

### Returns

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.groups.users.delete('user_id', {
  group_id: 'group_id',
});

console.log(user.deleted);
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```

## Domain Types

### Organization Group User

- `OrganizationGroupUser`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string | null`

    The email address of the user.

  - `name: string`

    The name of the user.

### User Create Response

- `UserCreateResponse`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### User Retrieve Response

- `UserRetrieveResponse`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string | null`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean | null`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string | null`

    URL of the user's profile picture, if available.

  - `user_type: "user" | "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### User Delete Response

- `UserDeleteResponse`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

# Roles

## List group organization role assignments

`client.admin.organization.groups.roles.list(stringgroupID, RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<RoleListResponse>`

**get** `/organization/groups/{group_id}/roles`

Lists the organization roles assigned to a group within the organization.

### Parameters

- `groupID: string`

- `query: RoleListParams`

  - `after?: string`

    Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

  - `limit?: number`

    A limit on the number of organization role assignments to return.

  - `order?: "asc" | "desc"`

    Sort order for the returned organization roles.

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
for await (const roleListResponse of client.admin.organization.groups.roles.list('group_id')) {
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

## Assign organization role to group

`client.admin.organization.groups.roles.create(stringgroupID, RoleCreateParamsbody, RequestOptionsoptions?): RoleCreateResponse`

**post** `/organization/groups/{group_id}/roles`

Assigns an organization role to a group within the organization.

### Parameters

- `groupID: string`

- `body: RoleCreateParams`

  - `role_id: string`

    Identifier of the role to assign.

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

const role = await client.admin.organization.groups.roles.create('group_id', {
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

## Retrieve group organization role

`client.admin.organization.groups.roles.retrieve(stringroleID, RoleRetrieveParamsparams, RequestOptionsoptions?): RoleRetrieveResponse`

**get** `/organization/groups/{group_id}/roles/{role_id}`

Retrieves an organization role assigned to a group.

### Parameters

- `roleID: string`

- `params: RoleRetrieveParams`

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

const role = await client.admin.organization.groups.roles.retrieve('role_id', {
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

## Unassign organization role from group

`client.admin.organization.groups.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassigns an organization role from a group within the organization.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `group_id: string`

    The ID of the group to modify.

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

const role = await client.admin.organization.groups.roles.delete('role_id', {
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
