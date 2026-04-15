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

- `data: array of object { created_at, group_id, group_name, 2 more }`

  Project group memberships returned in the current page.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

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
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "created_at": 0,
      "group_id": "group_id",
      "group_name": "group_name",
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

- `created_at: number`

  Unix timestamp (in seconds) when the group was granted project access.

- `group_id: string`

  Identifier of the group that has access to the project.

- `group_name: string`

  Display name of the group.

- `object: "project.group"`

  Always `project.group`.

  - `"project.group"`

- `project_id: string`

  Identifier of the project.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
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
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

### Group List Response

- `GroupListResponse object { created_at, group_id, group_name, 2 more }`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Group Create Response

- `GroupCreateResponse object { created_at, group_id, group_name, 2 more }`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

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
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

- `role: object { id, description, name, 4 more }`

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
    -H "Authorization: Bearer $OPENAI_API_KEY" \
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
    -H "Authorization: Bearer $OPENAI_API_KEY"
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

  - `role: object { id, description, name, 4 more }`

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
