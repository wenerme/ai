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
