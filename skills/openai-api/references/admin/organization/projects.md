# Projects

## List projects

**get** `/organization/projects`

Returns a list of projects.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `include_archived: optional boolean`

  If `true` returns all projects including those that have been `archived`. Archived projects are not included by default.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of Project`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects?after=proj_abc&limit=20&include_archived=false \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "proj_abc",
            "object": "organization.project",
            "name": "Project example",
            "created_at": 1711471533,
            "archived_at": null,
            "status": "active"
        }
    ],
    "first_id": "proj-abc",
    "last_id": "proj-xyz",
    "has_more": false
}
```

## Create project

**post** `/organization/projects`

Create a new project in the organization. Projects can be created and archived, but cannot be deleted.

### Body Parameters

- `name: string`

  The friendly name of the project, this name appears in reports.

- `external_key_id: optional string`

  External key ID to associate with the project.

- `geography: optional string`

  Create the project with the specified data residency region. Your organization must have access to Data residency functionality in order to use. See [data residency controls](/docs/guides/your-data#data-residency-controls) to review the functionality and limitations of setting this field.

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "name"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project ABC"
  }'
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project ABC",
    "created_at": 1711471533,
    "archived_at": null,
    "status": "active"
}
```

## Retrieve project

**get** `/organization/projects/{project_id}`

Retrieves a project.

### Path Parameters

- `project_id: string`

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project example",
    "created_at": 1711471533,
    "archived_at": null,
    "status": "active"
}
```

## Modify project

**post** `/organization/projects/{project_id}`

Modifies a project in the organization.

### Path Parameters

- `project_id: string`

### Body Parameters

- `external_key_id: optional string`

  External key ID to associate with the project.

- `geography: optional string`

  Geography for the project.

- `name: optional string`

  The updated name of the project, this name appears in reports.

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Project DEF"
  }'
```

## Archive project

**post** `/organization/projects/{project_id}/archive`

Archives a project in the organization. Archived projects cannot be used or updated.

### Path Parameters

- `project_id: string`

### Returns

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/archive \
    -X POST \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/archive \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "proj_abc",
    "object": "organization.project",
    "name": "Project DEF",
    "created_at": 1711471533,
    "archived_at": 1711471533,
    "status": "archived"
}
```

## Domain Types

### Project

- `Project object { id, created_at, object, 4 more }`

  Represents an individual project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the project was created.

  - `object: "organization.project"`

    The object type, which is always `organization.project`

    - `"organization.project"`

  - `archived_at: optional number`

    The Unix timestamp (in seconds) of when the project was archived or `null`.

  - `external_key_id: optional string`

    The external key associated with the project.

  - `name: optional string`

    The name of the project. This appears in reporting.

  - `status: optional string`

    `active` or `archived`

# Users

## List project users

**get** `/organization/projects/{project_id}/users`

Returns a list of users in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectUser`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `added_at: number`

    The Unix timestamp (in seconds) of when the project was added.

  - `object: "organization.project.user"`

    The object type, which is always `organization.project.user`

    - `"organization.project.user"`

  - `role: string`

    `owner` or `member`

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

- `has_more: boolean`

- `object: string`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/users?after=user_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.user",
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "added_at": 1711471533
        }
    ],
    "first_id": "user-abc",
    "last_id": "user-xyz",
    "has_more": false
}
```

## Create project user

**post** `/organization/projects/{project_id}/users`

Adds a user to the project. Users must already be members of the organization to be added to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `role: string`

  `owner` or `member`

- `email: optional string`

  Email of the user to add.

- `user_id: optional string`

  The ID of the user.

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

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

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role": "role"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/users \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "user_id": "user_abc",
      "role": "member"
  }'
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Retrieve project user

**get** `/organization/projects/{project_id}/users/{user_id}`

Retrieves a user in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

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

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Modify project user

**post** `/organization/projects/{project_id}/users/{user_id}`

Modifies a user's role in the project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role: optional string`

  `owner` or `member`

### Returns

- `ProjectUser object { id, added_at, object, 3 more }`

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

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role": "owner"
  }'
```

#### Response

```json
{
    "object": "organization.project.user",
    "id": "user_abc",
    "name": "First Last",
    "email": "user@example.com",
    "role": "owner",
    "added_at": 1711471533
}
```

## Delete project user

**delete** `/organization/projects/{project_id}/users/{user_id}`

Deletes a user from the project.

Returns confirmation of project user deletion, or an error if the project is
archived (archived projects have no users).

### Path Parameters

- `project_id: string`

- `user_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.user.deleted"`

  - `"organization.project.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/users/user_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.user.deleted",
    "id": "user_abc",
    "deleted": true
}
```

## Domain Types

### Project User

- `ProjectUser object { id, added_at, object, 3 more }`

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

  - `email: optional string`

    The email address of the user

  - `name: optional string`

    The name of the user

### User Delete Response

- `UserDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.user.deleted"`

    - `"organization.project.user.deleted"`

# Roles

## List project user role assignments

**get** `/projects/{project_id}/users/{user_id}/roles`

Lists the project roles assigned to a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: optional number`

  A limit on the number of project role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false,
            "description": "Allows managing API keys for the project",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign project role to user

**post** `/projects/{project_id}/users/{user_id}/roles`

Assigns a project role to a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `object: "user.role"`

  Always `user.role`.

  - `"user.role"`

- `role: Role`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

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

  - `api_key_last_used_at: optional number`

    The Unix timestamp (in seconds) of the user's last API key usage.

  - `created: optional number`

    The Unix timestamp (in seconds) of when the user was created.

  - `developer_persona: optional string`

    The developer persona metadata for the user.

  - `email: optional string`

    The email address of the user

  - `is_default: optional boolean`

    Whether this is the organization's default user.

  - `is_scale_tier_authorized_purchaser: optional boolean`

    Whether the user is an authorized purchaser for Scale Tier.

  - `is_scim_managed: optional boolean`

    Whether the user is managed through SCIM.

  - `is_service_account: optional boolean`

    Whether the user is a service account.

  - `name: optional string`

    The name of the user

  - `projects: optional object { data, object }`

    Projects associated with the user, if included.

    - `data: array of object { id, name, role }`

      - `id: optional string`

      - `name: optional string`

      - `role: optional string`

    - `object: "list"`

      - `"list"`

  - `role: optional string`

    `owner` or `reader`

  - `technical_level: optional string`

    The technical level metadata for the user.

  - `user: optional object { id, object, banned, 5 more }`

    Nested user details.

    - `id: string`

    - `object: "user"`

      - `"user"`

    - `banned: optional boolean`

    - `banned_at: optional number`

    - `email: optional string`

    - `enabled: optional boolean`

    - `name: optional string`

    - `picture: optional string`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "user.role",
    "user": {
        "object": "organization.user",
        "id": "user_abc123",
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "role": "owner",
        "added_at": 1711470000
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8PROJ",
        "name": "API Project Key Manager",
        "description": "Allows managing API keys for the project",
        "permissions": [
            "api.organization.projects.api_keys.read",
            "api.organization.projects.api_keys.write"
        ],
        "resource_type": "api.project",
        "predefined_role": false
    }
}
```

## Unassign project role from user

**delete** `/projects/{project_id}/users/{user_id}/roles/{role_id}`

Unassigns a project role from a user within a project.

### Path Parameters

- `project_id: string`

- `user_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/users/$USER_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/users/user_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "user.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { object, role, user }`

  Role assignment linking a user to a role.

  - `object: "user.role"`

    Always `user.role`.

    - `"user.role"`

  - `role: Role`

    Details about a role that can be assigned through the public Roles API.

    - `id: string`

      Identifier for the role.

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

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

    - `api_key_last_used_at: optional number`

      The Unix timestamp (in seconds) of the user's last API key usage.

    - `created: optional number`

      The Unix timestamp (in seconds) of when the user was created.

    - `developer_persona: optional string`

      The developer persona metadata for the user.

    - `email: optional string`

      The email address of the user

    - `is_default: optional boolean`

      Whether this is the organization's default user.

    - `is_scale_tier_authorized_purchaser: optional boolean`

      Whether the user is an authorized purchaser for Scale Tier.

    - `is_scim_managed: optional boolean`

      Whether the user is managed through SCIM.

    - `is_service_account: optional boolean`

      Whether the user is a service account.

    - `name: optional string`

      The name of the user

    - `projects: optional object { data, object }`

      Projects associated with the user, if included.

      - `data: array of object { id, name, role }`

        - `id: optional string`

        - `name: optional string`

        - `role: optional string`

      - `object: "list"`

        - `"list"`

    - `role: optional string`

      `owner` or `reader`

    - `technical_level: optional string`

      The technical level metadata for the user.

    - `user: optional object { id, object, banned, 5 more }`

      Nested user details.

      - `id: string`

      - `object: "user"`

        - `"user"`

      - `banned: optional boolean`

      - `banned_at: optional number`

      - `email: optional string`

      - `enabled: optional boolean`

      - `name: optional string`

      - `picture: optional string`

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Service Accounts

## List project service accounts

**get** `/organization/projects/{project_id}/service_accounts`

Returns a list of service accounts in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectServiceAccount`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the service account was created

  - `name: string`

    The name of the service account

  - `object: "organization.project.service_account"`

    The object type, which is always `organization.project.service_account`

    - `"organization.project.service_account"`

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/service_accounts?after=custom_id&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.service_account",
            "id": "svc_acct_abc",
            "name": "Service Account",
            "role": "owner",
            "created_at": 1711471533
        }
    ],
    "first_id": "svc_acct_abc",
    "last_id": "svc_acct_xyz",
    "has_more": false
}
```

## Create project service account

**post** `/organization/projects/{project_id}/service_accounts`

Creates a new service account in the project. This also returns an unredacted API key for the service account.

### Path Parameters

- `project_id: string`

### Body Parameters

- `name: string`

  The name of the service account being created.

### Returns

- `id: string`

- `api_key: object { id, created_at, name, 2 more }`

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

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "name"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/service_accounts \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Production App"
  }'
```

#### Response

```json
{
    "object": "organization.project.service_account",
    "id": "svc_acct_abc",
    "name": "Production App",
    "role": "member",
    "created_at": 1711471533,
    "api_key": {
        "object": "organization.project.service_account.api_key",
        "value": "sk-abcdefghijklmnop123",
        "name": "Secret Key",
        "created_at": 1711471533,
        "id": "key_abc"
    }
}
```

## Retrieve project service account

**get** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Retrieves a service account in the project.

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `ProjectServiceAccount object { id, created_at, name, 2 more }`

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

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.service_account",
    "id": "svc_acct_abc",
    "name": "Service Account",
    "role": "owner",
    "created_at": 1711471533
}
```

## Delete project service account

**delete** `/organization/projects/{project_id}/service_accounts/{service_account_id}`

Deletes a service account from the project.

Returns confirmation of service account deletion, or an error if the project
is archived (archived projects have no service accounts).

### Path Parameters

- `project_id: string`

- `service_account_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.service_account.deleted"`

  - `"organization.project.service_account.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.service_account.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/service_accounts/svc_acct_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.service_account.deleted",
    "id": "svc_acct_abc",
    "deleted": true
}
```

## Domain Types

### Project Service Account

- `ProjectServiceAccount object { id, created_at, name, 2 more }`

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

  - `role: "owner" or "member"`

    `owner` or `member`

    - `"owner"`

    - `"member"`

### Service Account Create Response

- `ServiceAccountCreateResponse object { id, api_key, created_at, 3 more }`

  - `id: string`

  - `api_key: object { id, created_at, name, 2 more }`

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

- `ServiceAccountDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.service_account.deleted"`

    - `"organization.project.service_account.deleted"`

# API Keys

## List project API keys

**get** `/organization/projects/{project_id}/api_keys`

Returns a list of API keys in the project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

### Returns

- `data: array of ProjectAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

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

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys?after=key_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "organization.project.api_key",
            "redacted_value": "sk-abc...def",
            "name": "My API Key",
            "created_at": 1711471533,
            "last_used_at": 1711471534,
            "id": "key_abc",
            "owner": {
                "type": "user",
                "user": {
                    "id": "user_abc",
                    "name": "First Last",
                    "email": "user@example.com",
                    "role": "owner",
                    "created_at": 1711471533
                }
            }
        }
    ],
    "first_id": "key_abc",
    "last_id": "key_xyz",
    "has_more": false
}
```

## Retrieve project API key

**get** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Retrieves an API key in the project.

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Returns

- `ProjectAPIKey object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

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

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.api_key",
    "redacted_value": "sk-abc...def",
    "name": "My API Key",
    "created_at": 1711471533,
    "last_used_at": 1711471534,
    "id": "key_abc",
    "owner": {
        "type": "user",
        "user": {
            "id": "user_abc",
            "name": "First Last",
            "email": "user@example.com",
            "role": "owner",
            "created_at": 1711471533
        }
    }
}
```

## Delete project API key

**delete** `/organization/projects/{project_id}/api_keys/{api_key_id}`

Deletes an API key from the project.

Returns confirmation of the key deletion, or an error if the key belonged to
a service account.

### Path Parameters

- `project_id: string`

- `api_key_id: string`

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.project.api_key.deleted"`

  - `"organization.project.api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/api_keys/$API_KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "organization.project.api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc/api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "organization.project.api_key.deleted",
    "id": "key_abc",
    "deleted": true
}
```

## Domain Types

### Project API Key

- `ProjectAPIKey object { id, created_at, last_used_at, 4 more }`

  Represents an individual API key in a project.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `last_used_at: number`

    The Unix timestamp (in seconds) of when the API key was last used.

  - `name: string`

    The name of the API key

  - `object: "organization.project.api_key"`

    The object type, which is always `organization.project.api_key`

    - `"organization.project.api_key"`

  - `owner: object { service_account, type, user }`

    - `service_account: optional object { id, created_at, name, role }`

      The service account that owns a project API key.

      - `id: string`

        The identifier, which can be referenced in API endpoints

      - `created_at: number`

        The Unix timestamp (in seconds) of when the service account was created.

      - `name: string`

        The name of the service account.

      - `role: string`

        The service account's project role.

    - `type: optional "user" or "service_account"`

      `user` or `service_account`

      - `"user"`

      - `"service_account"`

    - `user: optional object { id, created_at, email, 2 more }`

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

- `APIKeyDeleteResponse object { id, deleted, object }`

  - `id: string`

  - `deleted: boolean`

  - `object: "organization.project.api_key.deleted"`

    - `"organization.project.api_key.deleted"`

# Rate Limits

## List project rate limits

**get** `/organization/projects/{project_id}/rate_limits`

Returns the rate limits per model for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, beginning with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. The default is 100.

### Returns

- `data: array of ProjectRateLimit`

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

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/rate_limits?after=rl_xxx&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
          "object": "project.rate_limit",
          "id": "rl-ada",
          "model": "ada",
          "max_requests_per_1_minute": 600,
          "max_tokens_per_1_minute": 150000,
          "max_images_per_1_minute": 10
        }
    ],
    "first_id": "rl-ada",
    "last_id": "rl-ada",
    "has_more": false
}
```

## Modify project rate limit

**post** `/organization/projects/{project_id}/rate_limits/{rate_limit_id}`

Updates a project rate limit.

### Path Parameters

- `project_id: string`

- `rate_limit_id: string`

### Body Parameters

- `batch_1_day_max_input_tokens: optional number`

  The maximum batch input tokens per day. Only relevant for certain models.

- `max_audio_megabytes_per_1_minute: optional number`

  The maximum audio megabytes per minute. Only relevant for certain models.

- `max_images_per_1_minute: optional number`

  The maximum images per minute. Only relevant for certain models.

- `max_requests_per_1_day: optional number`

  The maximum requests per day. Only relevant for certain models.

- `max_requests_per_1_minute: optional number`

  The maximum requests per minute.

- `max_tokens_per_1_minute: optional number`

  The maximum tokens per minute.

### Returns

- `ProjectRateLimit object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

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

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/rate_limits/$RATE_LIMIT_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc/rate_limits/rl_xxx \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "max_requests_per_1_minute": 500
  }'
```

#### Response

```json
{
    "object": "project.rate_limit",
    "id": "rl-ada",
    "model": "ada",
    "max_requests_per_1_minute": 600,
    "max_tokens_per_1_minute": 150000,
    "max_images_per_1_minute": 10
  }
```

## Domain Types

### Project Rate Limit

- `ProjectRateLimit object { id, max_requests_per_1_minute, max_tokens_per_1_minute, 6 more }`

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

  - `batch_1_day_max_input_tokens: optional number`

    The maximum batch input tokens per day. Only present for relevant models.

  - `max_audio_megabytes_per_1_minute: optional number`

    The maximum audio megabytes per minute. Only present for relevant models.

  - `max_images_per_1_minute: optional number`

    The maximum images per minute. Only present for relevant models.

  - `max_requests_per_1_day: optional number`

    The maximum requests per day. Only present for relevant models.

# Groups

## List project groups

**get** `/organization/projects/{project_id}/groups`

Lists the groups that have access to a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the ID of the last group from the previous response to fetch the next page.

- `limit: optional number`

  A limit on the number of project groups to return. Defaults to 20.

- `order: optional "asc" or "desc"`

  Sort order for the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of ProjectGroup`

  Project group memberships returned in the current page.

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

- `has_more: boolean`

  Whether additional project group memberships are available.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc123/groups?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "project.group",
            "project_id": "proj_abc123",
            "group_id": "group_01J1F8ABCDXYZ",
            "group_name": "Support Team",
            "created_at": 1711471533
        }
    ],
    "has_more": false,
    "next": null
}
```

## Add project group

**post** `/organization/projects/{project_id}/groups`

Grants a group access to a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `group_id: string`

  Identifier of the group to add to the project.

- `role: string`

  Identifier of the project role to grant to the group.

### Returns

- `ProjectGroup object { created_at, group_id, group_name, 3 more }`

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

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "group_id": "group_id",
          "role": "role"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/projects/proj_abc123/groups \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "group_id": "group_01J1F8ABCDXYZ",
      "role": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "project.group",
    "project_id": "proj_abc123",
    "group_id": "group_01J1F8ABCDXYZ",
    "group_name": "Support Team",
    "created_at": 1711471533
}
```

## Remove project group

**delete** `/organization/projects/{project_id}/groups/{group_id}`

Revokes a group's access to a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership in the project was removed.

- `object: "project.group.deleted"`

  Always `project.group.deleted`.

  - `"project.group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "project.group.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/projects/proj_abc123/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.group.deleted",
    "deleted": true
}
```

## Domain Types

### Project Group

- `ProjectGroup object { created_at, group_id, group_name, 3 more }`

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

- `GroupDeleteResponse object { deleted, object }`

  Confirmation payload returned after removing a group from a project.

  - `deleted: boolean`

    Whether the group membership in the project was removed.

  - `object: "project.group.deleted"`

    Always `project.group.deleted`.

    - `"project.group.deleted"`

# Roles

## List project group role assignments

**get** `/projects/{project_id}/groups/{group_id}/roles`

Lists the project roles assigned to a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing project roles.

- `limit: optional number`

  A limit on the number of project role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned project roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, created_at, created_by, 8 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

- `has_more: boolean`

  Whether additional assignments are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no more assignments.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false,
            "description": "Allows managing API keys for the project",
            "created_at": 1711471533,
            "updated_at": 1711472599,
            "created_by": "user_abc123",
            "created_by_user_obj": {
                "id": "user_abc123",
                "name": "Ada Lovelace",
                "email": "ada@example.com"
            },
            "metadata": {}
        }
    ],
    "has_more": false,
    "next": null
}
```

## Assign project role to group

**post** `/projects/{project_id}/groups/{group_id}/roles`

Assigns a project role to a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Body Parameters

- `role_id: string`

  Identifier of the role to assign.

### Returns

- `group: object { id, created_at, name, 2 more }`

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

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "role_id": "role_id"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8PROJ"
  }'
```

#### Response

```json
{
    "object": "group.role",
    "group": {
        "object": "group",
        "id": "group_01J1F8ABCDXYZ",
        "name": "Support Team",
        "created_at": 1711471533,
        "scim_managed": false
    },
    "role": {
        "object": "role",
        "id": "role_01J1F8PROJ",
        "name": "API Project Key Manager",
        "description": "Allows managing API keys for the project",
        "permissions": [
            "api.organization.projects.api_keys.read",
            "api.organization.projects.api_keys.write"
        ],
        "resource_type": "api.project",
        "predefined_role": false
    }
}
```

## Unassign project role from group

**delete** `/projects/{project_id}/groups/{group_id}/roles/{role_id}`

Unassigns a project role from a group within a project.

### Path Parameters

- `project_id: string`

- `group_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/groups/$GROUP_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "object"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/groups/group_01J1F8ABCDXYZ/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.role.deleted",
    "deleted": true
}
```

## Domain Types

### Role List Response

- `RoleListResponse object { id, created_at, created_by, 8 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `created_at: number`

    When the role was created.

  - `created_by: string`

    Identifier of the actor who created the role.

  - `created_by_user_obj: map[unknown]`

    User details for the actor that created the role, when available.

  - `description: string`

    Description of the role.

  - `metadata: map[unknown]`

    Arbitrary metadata stored on the role.

  - `name: string`

    Name of the role.

  - `permissions: array of string`

    Permissions associated with the role.

  - `predefined_role: boolean`

    Whether the role is predefined by OpenAI.

  - `resource_type: string`

    Resource type the role applies to.

  - `updated_at: number`

    When the role was last updated.

### Role Create Response

- `RoleCreateResponse object { group, object, role }`

  Role assignment linking a group to a role.

  - `group: object { id, created_at, name, 2 more }`

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

    - `description: string`

      Optional description of the role.

    - `name: string`

      Unique name for the role.

    - `object: "role"`

      Always `role`.

      - `"role"`

    - `permissions: array of string`

      Permissions granted by the role.

    - `predefined_role: boolean`

      Whether the role is predefined and managed by OpenAI.

    - `resource_type: string`

      Resource type the role is bound to (for example `api.organization` or `api.project`).

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

# Roles

## List project roles

**get** `/projects/{project_id}/roles`

Lists the roles configured for a project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing roles.

- `limit: optional number`

  A limit on the number of roles to return. Defaults to 1000.

- `order: optional "asc" or "desc"`

  Sort order for the returned roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Role`

  Roles returned in the current page.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

- `has_more: boolean`

  Whether more roles are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when there are no additional roles.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/projects/proj_abc123/roles?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "role",
            "id": "role_01J1F8PROJ",
            "name": "API Project Key Manager",
            "description": "Allows managing API keys for the project",
            "permissions": [
                "api.organization.projects.api_keys.read",
                "api.organization.projects.api_keys.write"
            ],
            "resource_type": "api.project",
            "predefined_role": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create project role

**post** `/projects/{project_id}/roles`

Creates a custom role for a project.

### Path Parameters

- `project_id: string`

### Body Parameters

- `permissions: array of string`

  Permissions to grant to the role.

- `role_name: string`

  Unique name for the role.

- `description: optional string`

  Optional description of the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "permissions": [
            "string"
          ],
          "role_name": "role_name"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Project Key Manager",
      "permissions": [
          "api.organization.projects.api_keys.read",
          "api.organization.projects.api_keys.write"
      ],
      "description": "Allows managing API keys for the project"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8PROJ",
    "name": "API Project Key Manager",
    "description": "Allows managing API keys for the project",
    "permissions": [
        "api.organization.projects.api_keys.read",
        "api.organization.projects.api_keys.write"
    ],
    "resource_type": "api.project",
    "predefined_role": false
}
```

## Update project role

**post** `/projects/{project_id}/roles/{role_id}`

Updates an existing project role.

### Path Parameters

- `project_id: string`

- `role_id: string`

### Body Parameters

- `description: optional string`

  New description for the role.

- `permissions: optional array of string`

  Updated set of permissions for the role.

- `role_name: optional string`

  New name for the role.

### Returns

- `Role object { id, description, name, 4 more }`

  Details about a role that can be assigned through the public Roles API.

  - `id: string`

    Identifier for the role.

  - `description: string`

    Optional description of the role.

  - `name: string`

    Unique name for the role.

  - `object: "role"`

    Always `role`.

    - `"role"`

  - `permissions: array of string`

    Permissions granted by the role.

  - `predefined_role: boolean`

    Whether the role is predefined and managed by OpenAI.

  - `resource_type: string`

    Resource type the role is bound to (for example `api.organization` or `api.project`).

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{}'
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

### Example

```http
curl -X POST https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_name": "API Project Key Manager",
      "permissions": [
          "api.organization.projects.api_keys.read",
          "api.organization.projects.api_keys.write"
      ],
      "description": "Allows managing API keys for the project"
  }'
```

#### Response

```json
{
    "object": "role",
    "id": "role_01J1F8PROJ",
    "name": "API Project Key Manager",
    "description": "Allows managing API keys for the project",
    "permissions": [
        "api.organization.projects.api_keys.read",
        "api.organization.projects.api_keys.write"
    ],
    "resource_type": "api.project",
    "predefined_role": false
}
```

## Delete project role

**delete** `/projects/{project_id}/roles/{role_id}`

Deletes a custom role from a project.

### Path Parameters

- `project_id: string`

- `role_id: string`

### Returns

- `id: string`

  Identifier of the deleted role.

- `deleted: boolean`

  Whether the role was deleted.

- `object: "role.deleted"`

  Always `role.deleted`.

  - `"role.deleted"`

### Example

```http
curl https://api.openai.com/v1/projects/$PROJECT_ID/roles/$ROLE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "role.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/projects/proj_abc123/roles/role_01J1F8PROJ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "role.deleted",
    "id": "role_01J1F8PROJ",
    "deleted": true
}
```

## Domain Types

### Role Delete Response

- `RoleDeleteResponse object { id, deleted, object }`

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

**get** `/organization/projects/{project_id}/certificates`

List certificates for this project.

### Path Parameters

- `project_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: "list"`

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
  "first_id": "cert_abc",
  "last_id": "cert_abc",
  "has_more": false
}
```

## Activate certificates for project

**post** `/organization/projects/{project_id}/certificates/activate`

Activate certificates at the project level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `object: "organization.project.certificate.activation"`

  The project certificate activation result type.

  - `"organization.project.certificate.activation"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/activate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates/activate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.project.certificate.activation",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.project.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": true,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Deactivate certificates for project

**post** `/organization/projects/{project_id}/certificates/deactivate`

Deactivate certificates at the project level. You can atomically and
idempotently deactivate up to 10 certificates at a time.

### Path Parameters

- `project_id: string`

### Body Parameters

- `certificate_ids: array of string`

### Returns

- `data: array of object { id, active, certificate_details, 3 more }`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

- `object: "organization.project.certificate.deactivation"`

  The project certificate deactivation result type.

  - `"organization.project.certificate.deactivation"`

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/certificates/deactivate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "certificate_ids": [
            "cert_abc"
          ]
        }'
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

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc/certificates/deactivate \
-H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
-H "Content-Type: application/json" \
-d '{
  "certificate_ids": ["cert_abc", "cert_def"]
}'
```

#### Response

```json
{
  "object": "organization.project.certificate.deactivation",
  "data": [
    {
      "object": "organization.project.certificate",
      "id": "cert_abc",
      "name": "My Example Certificate",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
    {
      "object": "organization.project.certificate",
      "id": "cert_def",
      "name": "My Example Certificate 2",
      "active": false,
      "created_at": 1234567,
      "certificate_details": {
        "valid_at": 12345667,
        "expires_at": 12345678
      }
    },
  ],
}
```

## Domain Types

### Certificate List Response

- `CertificateListResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Activate Response

- `CertificateActivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`

### Certificate Deactivate Response

- `CertificateDeactivateResponse object { id, active, certificate_details, 3 more }`

  Represents an individual certificate configured at the project level.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `active: boolean`

    Whether the certificate is currently active at the project level.

  - `certificate_details: object { expires_at, valid_at }`

    - `expires_at: optional number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at: optional number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "organization.project.certificate"`

    The object type, which is always `organization.project.certificate`.

    - `"organization.project.certificate"`
