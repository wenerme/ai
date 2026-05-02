# Projects

## List projects

`client.admin.organization.projects.list(ProjectListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Project>`

**get** `/organization/projects`

Returns a list of projects.

### Parameters

- `query: ProjectListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `include_archived?: boolean`

    If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const project of client.admin.organization.projects.list()) {
  console.log(project.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "object": "organization.project",
      "archived_at": 0,
      "external_key_id": "external_key_id",
      "name": "name",
      "status": "status"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Create project

`client.admin.organization.projects.create(ProjectCreateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Parameters

- `body: ProjectCreateParams`

  - `name: string`

    The friendly name of the project, this name appears in reports.

  - `external_key_id?: string | null`

    External key ID to associate with the project.

  - `geography?: string | null`

    Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](https://platform.openai.com/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.create({ name: 'name' });

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

## Retrieve project

`client.admin.organization.projects.retrieve(stringprojectID, RequestOptionsoptions?): Project`

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Parameters

- `projectID: string`

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.retrieve('project_id');

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

## Modify project

`client.admin.organization.projects.update(stringprojectID, ProjectUpdateParamsbody, RequestOptionsoptions?): Project`

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Parameters

- `projectID: string`

- `body: ProjectUpdateParams`

  - `external_key_id?: string | null`

    External key ID to associate with the project.

  - `geography?: string | null`

    Geography for the project.

  - `name?: string | null`

    The updated name of the project, this name appears in reports.

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.update('project_id');

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

## Archive project

`client.admin.organization.projects.archive(stringprojectID, RequestOptionsoptions?): Project`

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Parameters

- `projectID: string`

### Returns

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const project = await client.admin.organization.projects.archive('project_id');

console.log(project.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "object": "organization.project",
  "archived_at": 0,
  "external_key_id": "external_key_id",
  "name": "name",
  "status": "status"
}
```

## Domain Types

### Project

- `Project`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at?: number | null`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id?: string | null`

    The external key associated with the project.

  - `name?: string | null`

    The name of the project. This appears in reporting.

  - `status?: string | null`

    `active` or `archived`

# Users

## List project users

`client.admin.organization.projects.users.list(stringprojectID, UserListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectUser>`

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Parameters

- `projectID: string`

- `query: UserListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectUser`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectUser of client.admin.organization.projects.users.list('project_id')) {
  console.log(projectUser.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "added_at": 0,
      "object": "organization.project.user",
      "role": "role",
      "email": "email",
      "name": "name"
    }
  ],
  "has_more": true,
  "object": "object",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Create project user

`client.admin.organization.projects.users.create(stringprojectID, UserCreateParamsbody, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Parameters

- `projectID: string`

- `body: UserCreateParams`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    Email of the user to add.

  - `user_id?: string | null`

    The ID of the user.

### Returns

- `ProjectUser`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.create('project_id', {
  role: 'role',
});

console.log(projectUser.id);
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

## Retrieve project user

`client.admin.organization.projects.users.retrieve(stringuserID, UserRetrieveParamsparams, RequestOptionsoptions?): ProjectUser`

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Parameters

- `userID: string`

- `params: UserRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectUser`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.retrieve('user_id', {
  project_id: 'project_id',
});

console.log(projectUser.id);
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

## Modify project user

`client.admin.organization.projects.users.update(stringuserID, UserUpdateParamsparams, RequestOptionsoptions?): ProjectUser`

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Parameters

- `userID: string`

- `params: UserUpdateParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `role?: string | null`

    Body param: `owner` or `member`

### Returns

- `ProjectUser`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectUser = await client.admin.organization.projects.users.update('user_id', {
  project_id: 'project_id',
});

console.log(projectUser.id);
```

#### Response

```json
{
  "id": "id",
  "added_at": 0,
  "object": "organization.project.user",
  "role": "role",
  "email": "email",
  "name": "name"
}
```

## Delete project user

`client.admin.organization.projects.users.delete(stringuserID, UserDeleteParamsparams, RequestOptionsoptions?): UserDeleteResponse`

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Parameters

- `userID: string`

- `params: UserDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const user = await client.admin.organization.projects.users.delete('user_id', {
  project_id: 'project_id',
});

console.log(user.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```

## Domain Types

### Project User

- `ProjectUser`

  Represents an individual user in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email?: string | null`

    The email address of the user

  - `name?: string | null`

    The name of the user

### User Delete Response

- `UserDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

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

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Service Accounts

## List project service accounts

`client.admin.organization.projects.serviceAccounts.list(stringprojectID, ServiceAccountListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectServiceAccount>`

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Parameters

- `projectID: string`

- `query: ServiceAccountListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectServiceAccount`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectServiceAccount of client.admin.organization.projects.serviceAccounts.list(
  'project_id',
)) {
  console.log(projectServiceAccount.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "object": "organization.project.service_account",
      "role": "owner"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Create project service account

`client.admin.organization.projects.serviceAccounts.create(stringprojectID, ServiceAccountCreateParamsbody, RequestOptionsoptions?): ServiceAccountCreateResponse`

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Parameters

- `projectID: string`

- `body: ServiceAccountCreateParams`

  - `name: string`

    The name of the service account being created.

### Returns

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

    - `id: string`

    - `created_at: number`

    - `name: string`

    - `object: "organization.project.service_account.api_key"`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account"`

    - `"organization.project.service_account"`

  - `role: "member"`

    Service accounts can only have one role of type `member`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.create(
  'project_id',
  { name: 'name' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "api_key": {
    "id": "id",
    "created_at": 0,
    "name": "name",
    "object": "organization.project.service_account.api_key",
    "value": "value"
  },
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "member"
}
```

## Retrieve project service account

`client.admin.organization.projects.serviceAccounts.retrieve(stringserviceAccountID, ServiceAccountRetrieveParamsparams, RequestOptionsoptions?): ProjectServiceAccount`

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectServiceAccount`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectServiceAccount = await client.admin.organization.projects.serviceAccounts.retrieve(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(projectServiceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "name": "name",
  "object": "organization.project.service_account",
  "role": "owner"
}
```

## Delete project service account

`client.admin.organization.projects.serviceAccounts.delete(stringserviceAccountID, ServiceAccountDeleteParamsparams, RequestOptionsoptions?): ServiceAccountDeleteResponse`

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Parameters

- `serviceAccountID: string`

- `params: ServiceAccountDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const serviceAccount = await client.admin.organization.projects.serviceAccounts.delete(
  'service_account_id',
  { project_id: 'project_id' },
);

console.log(serviceAccount.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

## Domain Types

### Project Service Account

- `ProjectServiceAccount`

  Represents an individual service account in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" | "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `ServiceAccountCreateResponse`

  - `id: string`

  - `api_key: APIKey | null`

    - `id: string`

    - `created_at: number`

    - `name: string`

    - `object: "organization.project.service_account.api_key"`

      The object type, which is always `organization.project.service_account.api_key`

      - `"organization.project.service_account.api_key"`

    - `value: string`

  - `created_at: number`

  - `name: string`

  - `object: "organization.project.service_account"`

    - `"organization.project.service_account"`

  - `role: "member"`

    Service accounts can only have one role of type `member`

    - `"member"`

### Service Account Delete Response

- `ServiceAccountDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

# API Keys

## List project API keys

`client.admin.organization.projects.apiKeys.list(stringprojectID, APIKeyListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectAPIKey>`

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Parameters

- `projectID: string`

- `query: APIKeyListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectAPIKey of client.admin.organization.projects.apiKeys.list('project_id')) {
  console.log(projectAPIKey.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "last_used_at": 0,
      "name": "name",
      "object": "organization.project.api_key",
      "owner": {
        "service_account": {
          "id": "id",
          "created_at": 0,
          "name": "name",
          "role": "role"
        },
        "type": "user",
        "user": {
          "id": "id",
          "created_at": 0,
          "email": "email",
          "name": "name",
          "role": "role"
        }
      },
      "redacted_value": "redacted_value"
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Retrieve project API key

`client.admin.organization.projects.apiKeys.retrieve(stringapiKeyID, APIKeyRetrieveParamsparams, RequestOptionsoptions?): ProjectAPIKey`

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Parameters

- `apiKeyID: string`

- `params: APIKeyRetrieveParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectAPIKey = await client.admin.organization.projects.apiKeys.retrieve('api_key_id', {
  project_id: 'project_id',
});

console.log(projectAPIKey.id);
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "last_used_at": 0,
  "name": "name",
  "object": "organization.project.api_key",
  "owner": {
    "service_account": {
      "id": "id",
      "created_at": 0,
      "name": "name",
      "role": "role"
    },
    "type": "user",
    "user": {
      "id": "id",
      "created_at": 0,
      "email": "email",
      "name": "name",
      "role": "role"
    }
  },
  "redacted_value": "redacted_value"
}
```

## Delete project API key

`client.admin.organization.projects.apiKeys.delete(stringapiKeyID, APIKeyDeleteParamsparams, RequestOptionsoptions?): APIKeyDeleteResponse`

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Parameters

- `apiKeyID: string`

- `params: APIKeyDeleteParams`

  - `project_id: string`

    The ID of the project.

### Returns

- `APIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const apiKey = await client.admin.organization.projects.apiKeys.delete('api_key_id', {
  project_id: 'project_id',
});

console.log(apiKey.id);
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

## Domain Types

### Project API Key

- `ProjectAPIKey`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number | null`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: Owner`

    - `service_account?: ServiceAccount`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type?: "user" | "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user?: User`

      The user that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the user was created.

      - `email: string`

        The email address of the user.

      - `name: string`

        The name of the user.

      - `role: string`

        The user's project role.

  - `redacted_value: string`

    The redacted value of the API key

### API Key Delete Response

- `APIKeyDeleteResponse`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

# Rate Limits

## List project rate limits

`client.admin.organization.projects.rateLimits.listRateLimits(stringprojectID, RateLimitListRateLimitsParamsquery?, RequestOptionsoptions?): ConversationCursorPage<ProjectRateLimit>`

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Parameters

- `projectID: string`

- `query: RateLimitListRateLimitsParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `before?: string`

    A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. The default is 100.

### Returns

- `ProjectRateLimit`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const projectRateLimit of client.admin.organization.projects.rateLimits.listRateLimits(
  'project_id',
)) {
  console.log(projectRateLimit.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "max_requests_per_1_minute": 0,
      "max_tokens_per_1_minute": 0,
      "model": "model",
      "object": "project.rate_limit",
      "batch_1_day_max_input_tokens": 0,
      "max_audio_megabytes_per_1_minute": 0,
      "max_images_per_1_minute": 0,
      "max_requests_per_1_day": 0
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "first_id",
  "last_id": "last_id"
}
```

## Modify project rate limit

`client.admin.organization.projects.rateLimits.updateRateLimit(stringrateLimitID, RateLimitUpdateRateLimitParamsparams, RequestOptionsoptions?): ProjectRateLimit`

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Parameters

- `rateLimitID: string`

- `params: RateLimitUpdateRateLimitParams`

  - `project_id: string`

    Path param: The ID of the project.

  - `batch_1_day_max_input_tokens?: number`

    Body param: The maximum batch input tokens per day. Only relevant for certain models.

  - `max_audio_megabytes_per_1_minute?: number`

    Body param: The maximum audio megabytes per minute. Only relevant for certain models.

  - `max_images_per_1_minute?: number`

    Body param: The maximum images per minute. Only relevant for certain models.

  - `max_requests_per_1_day?: number`

    Body param: The maximum requests per day. Only relevant for certain models.

  - `max_requests_per_1_minute?: number`

    Body param: The maximum requests per minute.

  - `max_tokens_per_1_minute?: number`

    Body param: The maximum tokens per minute.

### Returns

- `ProjectRateLimit`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const projectRateLimit = await client.admin.organization.projects.rateLimits.updateRateLimit(
  'rate_limit_id',
  { project_id: 'project_id' },
);

console.log(projectRateLimit.id);
```

#### Response

```json
{
  "id": "id",
  "max_requests_per_1_minute": 0,
  "max_tokens_per_1_minute": 0,
  "model": "model",
  "object": "project.rate_limit",
  "batch_1_day_max_input_tokens": 0,
  "max_audio_megabytes_per_1_minute": 0,
  "max_images_per_1_minute": 0,
  "max_requests_per_1_day": 0
}
```

## Domain Types

### Project Rate Limit

- `ProjectRateLimit`

  Represents a project rate limit config.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `max_requests_per_1_minute: number`

    The maximum requests per minute.

  - `max_tokens_per_1_minute: number`

    The maximum tokens per minute.

  - `model: string`

    The model this rate limit applies to.

  - `object: "project.rate_limit"`

    The object type, which is always `project.rate_limit`

    - `"project.rate_limit"`

  - `batch_1_day_max_input_tokens?: number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute?: number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute?: number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day?: number`

    The maximum requests per day. Only present for relevant models.

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

# Roles

## List project roles

`client.admin.organization.projects.roles.list(stringprojectID, RoleListParamsquery?, RequestOptionsoptions?): NextCursorPage<Role>`

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

## Create project role

`client.admin.organization.projects.roles.create(stringprojectID, RoleCreateParamsbody, RequestOptionsoptions?): Role`

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Parameters

- `projectID: string`

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

const role = await client.admin.organization.projects.roles.create('project_id', {
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

## Update project role

`client.admin.organization.projects.roles.update(stringroleID, RoleUpdateParamsparams, RequestOptionsoptions?): Role`

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Parameters

- `roleID: string`

- `params: RoleUpdateParams`

  - `project_id: string`

    Path param: The ID of the project to update.

  - `description?: string | null`

    Body param: New description for the role.

  - `permissions?: Array<string> | null`

    Body param: Updated set of permissions for the role.

  - `role_name?: string | null`

    Body param: New name for the role.

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

const role = await client.admin.organization.projects.roles.update('role_id', {
  project_id: 'project_id',
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

## Delete project role

`client.admin.organization.projects.roles.delete(stringroleID, RoleDeleteParamsparams, RequestOptionsoptions?): RoleDeleteResponse`

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Parameters

- `roleID: string`

- `params: RoleDeleteParams`

  - `project_id: string`

    The ID of the project to update.

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

const role = await client.admin.organization.projects.roles.delete('role_id', {
  project_id: 'project_id',
});

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

## Domain Types

### Role Delete Response

- `RoleDeleteResponse`

  Confirmation payload returned after deleting a role.

  - `id: string`

    Identifier of the deleted role.

  - `deleted: boolean`

    Whether the role was deleted.

  - `object: "role.deleted"`

    Always `role.deleted`.

    - `"role.deleted"`

# Certificates

## List project certificates

`client.admin.organization.projects.certificates.list(stringprojectID, CertificateListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<CertificateListResponse>`

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Parameters

- `projectID: string`

- `query: CertificateListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `CertificateListResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateListResponse of client.admin.organization.projects.certificates.list(
  'project_id',
)) {
  console.log(certificateListResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "first_id": "cert_abc",
  "has_more": true,
  "last_id": "cert_abc",
  "object": "list"
}
```

## Activate certificates for project

`client.admin.organization.projects.certificates.activate(stringprojectID, CertificateActivateParamsbody, RequestOptionsoptions?): Page<CertificateActivateResponse>`

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `projectID: string`

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateActivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateActivateResponse of client.admin.organization.projects.certificates.activate(
  'project_id',
  { certificate_ids: ['cert_abc'] },
)) {
  console.log(certificateActivateResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "object": "organization.project.certificate.activation"
}
```

## Deactivate certificates for project

`client.admin.organization.projects.certificates.deactivate(stringprojectID, CertificateDeactivateParamsbody, RequestOptionsoptions?): Page<CertificateDeactivateResponse>`

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Parameters

- `projectID: string`

- `body: CertificateDeactivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificateDeactivateResponse of client.admin.organization.projects.certificates.deactivate(
  'project_id',
  { certificate_ids: ['cert_abc'] },
)) {
  console.log(certificateDeactivateResponse.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "active": true,
      "certificate_details": {
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "organization.project.certificate"
    }
  ],
  "object": "organization.project.certificate.deactivation"
}
```

## Domain Types

### Certificate List Response

- `CertificateListResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Activate Response

- `CertificateActivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: CertificateDetails`

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string | null`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`
