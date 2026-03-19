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
