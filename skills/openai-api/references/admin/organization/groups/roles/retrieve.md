## Retrieve group organization role

**get** `/organization/groups/{group_id}/roles/{role_id}`

Retrieves an organization role assigned to a group.

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
