# Groups

## List groups

**get** `/organization/groups`

List groups

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is a group ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with group_abc, your subsequent call can include `after=group_abc` in order to fetch the next page of the list.

- `limit: optional number`

  A limit on the number of groups to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of the returned groups.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of Group`

  Groups returned in the current page.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" or "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

- `has_more: boolean`

  Whether additional groups are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` if there are no more results.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups?limit=20&order=asc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "object": "group",
            "id": "group_01J1F8ABCDXYZ",
            "name": "Support Team",
            "created_at": 1711471533,
            "is_scim_managed": false
        }
    ],
    "has_more": false,
    "next": null
}
```

## Create group

**post** `/organization/groups`

Create group

### Body Parameters

- `name: string`

  Human readable name for the group.

### Returns

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" or "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "x"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Support Team"
  }'
```

#### Response

```json
{
    "object": "group",
    "id": "group_01J1F8ABCDXYZ",
    "name": "Support Team",
    "created_at": 1711471533,
    "is_scim_managed": false
}
```

## Retrieve group

**get** `/organization/groups/{group_id}`

Retrieve group

### Path Parameters

- `group_id: string`

### Returns

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" or "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "group_01J1F8ABCDXYZ",
    "name": "Support Team",
    "created_at": 1711471533,
    "is_scim_managed": false,
    "group_type": "group"
}
```

## Update group

**post** `/organization/groups/{group_id}`

Update group

### Path Parameters

- `group_id: string`

### Body Parameters

- `name: string`

  New display name for the group.

### Returns

- `id: string`

  Identifier for the group.

- `created_at: number`

  Unix timestamp (in seconds) when the group was created.

- `is_scim_managed: boolean`

  Whether the group is managed through SCIM and controlled by your identity provider.

- `name: string`

  Updated display name for the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "x"
        }'
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

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "Escalations"
  }'
```

#### Response

```json
{
    "id": "group_01J1F8ABCDXYZ",
    "name": "Escalations",
    "created_at": 1711471533,
    "is_scim_managed": false
}
```

## Delete group

**delete** `/organization/groups/{group_id}`

Delete group

### Path Parameters

- `group_id: string`

### Returns

- `id: string`

  Identifier of the deleted group.

- `deleted: boolean`

  Whether the group was deleted.

- `object: "group.deleted"`

  Always `group.deleted`.

  - `"group.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "group.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.deleted",
    "id": "group_01J1F8ABCDXYZ",
    "deleted": true
}
```

## Domain Types

### Group

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was created.

  - `group_type: "group" or "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `is_scim_managed: boolean`

    Whether the group is managed through SCIM and controlled by your identity provider.

  - `name: string`

    Display name of the group.

### Group Update Response

- `GroupUpdateResponse object { id, created_at, is_scim_managed, name }`

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

- `GroupDeleteResponse object { id, deleted, object }`

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

**get** `/organization/groups/{group_id}/users`

List group users

### Path Parameters

- `group_id: string`

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. Provide the ID of the last user from the previous list response to retrieve the next page.

- `limit: optional number`

  A limit on the number of users to be returned. Limit can range between 0 and 1000, and the default is 100.

- `order: optional "asc" or "desc"`

  Specifies the sort order of users in the list.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of OrganizationGroupUser`

  Users in the current page.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string`

    The email address of the user.

  - `name: string`

    The name of the user.

- `has_more: boolean`

  Whether more users are available when paginating.

- `next: string`

  Cursor to fetch the next page of results, or `null` when no further users are available.

- `object: "list"`

  Always `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users?limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "user_abc123",
            "name": "Ada Lovelace",
            "email": "ada@example.com"
        }
    ],
    "has_more": false,
    "next": null
}
```

## Add group user

**post** `/organization/groups/{group_id}/users`

Add group user

### Path Parameters

- `group_id: string`

### Body Parameters

- `user_id: string`

  Identifier of the user to add to the group.

### Returns

- `group_id: string`

  Identifier of the group the user was added to.

- `object: "group.user"`

  Always `group.user`.

  - `"group.user"`

- `user_id: string`

  Identifier of the user that was added.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "user_id": "user_id"
        }'
```

#### Response

```json
{
  "group_id": "group_id",
  "object": "group.user",
  "user_id": "user_id"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "user_id": "user_abc123"
  }'
```

#### Response

```json
{
    "object": "group.user",
    "user_id": "user_abc123",
    "group_id": "group_01J1F8ABCDXYZ"
}
```

## Retrieve group user

**get** `/organization/groups/{group_id}/users/{user_id}`

Retrieve group user

### Path Parameters

- `group_id: string`

- `user_id: string`

### Returns

- `id: string`

  Identifier for the user.

- `email: string`

  Email address of the user, or `null` for users without an email.

- `is_service_account: boolean`

  Whether the user is a service account.

- `name: string`

  Display name of the user.

- `picture: string`

  URL of the user's profile picture, if available.

- `user_type: "user" or "tenant_user"`

  The type of user.

  - `"user"`

  - `"tenant_user"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users/$USER_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users/user_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "user_abc123",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "picture": null,
    "is_service_account": false,
    "user_type": "user"
}
```

## Remove group user

**delete** `/organization/groups/{group_id}/users/{user_id}`

Remove group user

### Path Parameters

- `group_id: string`

- `user_id: string`

### Returns

- `deleted: boolean`

  Whether the group membership was removed.

- `object: "group.user.deleted"`

  Always `group.user.deleted`.

  - `"group.user.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/users/$USER_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "deleted": true,
  "object": "group.user.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/users/user_abc123 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "group.user.deleted",
    "deleted": true
}
```

## Domain Types

### Organization Group User

- `OrganizationGroupUser object { id, email, name }`

  Represents an individual user returned when inspecting group membership.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `email: string`

    The email address of the user.

  - `name: string`

    The name of the user.

### User Create Response

- `UserCreateResponse object { group_id, object, user_id }`

  Confirmation payload returned after adding a user to a group.

  - `group_id: string`

    Identifier of the group the user was added to.

  - `object: "group.user"`

    Always `group.user`.

    - `"group.user"`

  - `user_id: string`

    Identifier of the user that was added.

### User Retrieve Response

- `UserRetrieveResponse object { id, email, is_service_account, 3 more }`

  Details about a user returned from an organization group membership lookup.

  - `id: string`

    Identifier for the user.

  - `email: string`

    Email address of the user, or `null` for users without an email.

  - `is_service_account: boolean`

    Whether the user is a service account.

  - `name: string`

    Display name of the user.

  - `picture: string`

    URL of the user's profile picture, if available.

  - `user_type: "user" or "tenant_user"`

    The type of user.

    - `"user"`

    - `"tenant_user"`

### User Delete Response

- `UserDeleteResponse object { deleted, object }`

  Confirmation payload returned after removing a user from a group.

  - `deleted: boolean`

    Whether the group membership was removed.

  - `object: "group.user.deleted"`

    Always `group.user.deleted`.

    - `"group.user.deleted"`

# Roles

## List group organization role assignments

**get** `/organization/groups/{group_id}/roles`

List group organization role assignments

### Path Parameters

- `group_id: string`

### Query Parameters

- `after: optional string`

  Cursor for pagination. Provide the value from the previous response's `next` field to continue listing organization roles.

- `limit: optional number`

  A limit on the number of organization role assignments to return.

- `order: optional "asc" or "desc"`

  Sort order for the returned organization roles.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of object { id, assignment_sources, created_at, 9 more }`

  Role assignments returned in the current page.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: array of object { principal_id, principal_type }`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

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
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "list",
    "data": [
        {
            "id": "role_01J1F8ROLE01",
            "name": "API Group Manager",
            "permissions": [
                "api.groups.read",
                "api.groups.write"
            ],
            "resource_type": "api.organization",
            "predefined_role": false,
            "description": "Allows managing organization groups",
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

## Assign organization role to group

**post** `/organization/groups/{group_id}/roles`

Assign organization role to group

### Path Parameters

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
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles \
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
curl -X POST https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "role_id": "role_01J1F8ROLE01"
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
        "id": "role_01J1F8ROLE01",
        "name": "API Group Manager",
        "description": "Allows managing organization groups",
        "permissions": [
            "api.groups.read",
            "api.groups.write"
        ],
        "resource_type": "api.organization",
        "predefined_role": false
    }
}
```

## Retrieve group organization role

**get** `/organization/groups/{group_id}/roles/{role_id}`

Retrieve group organization role

### Path Parameters

- `group_id: string`

- `role_id: string`

### Returns

- `id: string`

  Identifier for the role.

- `assignment_sources: array of object { principal_id, principal_type }`

  Principals from which the role assignment is inherited, when available.

  - `principal_id: string`

  - `principal_type: string`

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

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles/$ROLE_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
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

### Example

```http
curl https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles/role_01J1F8ROLE01 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "id": "role_01J1F8ROLE01",
    "name": "API Group Manager",
    "permissions": [
        "api.groups.read",
        "api.groups.write"
    ],
    "resource_type": "api.organization",
    "predefined_role": false,
    "description": "Allows managing organization groups",
    "created_at": 1711471533,
    "updated_at": 1711472599,
    "created_by": "user_abc123",
    "created_by_user_obj": null,
    "metadata": {},
    "assignment_sources": null
}
```

## Unassign organization role from group

**delete** `/organization/groups/{group_id}/roles/{role_id}`

Unassign organization role from group

### Path Parameters

- `group_id: string`

- `role_id: string`

### Returns

- `deleted: boolean`

  Whether the assignment was removed.

- `object: string`

  Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.

### Example

```http
curl https://api.openai.com/v1/organization/groups/$GROUP_ID/roles/$ROLE_ID \
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
curl -X DELETE https://api.openai.com/v1/organization/groups/group_01J1F8ABCDXYZ/roles/role_01J1F8ROLE01 \
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

- `RoleListResponse object { id, assignment_sources, created_at, 9 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: array of object { principal_id, principal_type }`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

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

### Role Retrieve Response

- `RoleRetrieveResponse object { id, assignment_sources, created_at, 9 more }`

  Detailed information about a role assignment entry returned when listing assignments.

  - `id: string`

    Identifier for the role.

  - `assignment_sources: array of object { principal_id, principal_type }`

    Principals from which the role assignment is inherited, when available.

    - `principal_id: string`

    - `principal_type: string`

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

### Role Delete Response

- `RoleDeleteResponse object { deleted, object }`

  Confirmation payload returned after unassigning a role.

  - `deleted: boolean`

    Whether the assignment was removed.

  - `object: string`

    Identifier for the deleted assignment, such as `group.role.deleted` or `user.role.deleted`.
