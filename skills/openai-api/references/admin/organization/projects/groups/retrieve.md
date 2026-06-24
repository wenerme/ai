## Retrieve project group

**get** `/organization/projects/{project_id}/groups/{group_id}`

Retrieves a project's group.

### Path Parameters

- `project_id: string`

- `group_id: string`

### Query Parameters

- `group_type: optional "group" or "tenant_group"`

  The type of group to retrieve.

  - `"group"`

  - `"tenant_group"`

### Returns

- `ProjectGroup object { created_at, group_id, group_name, 3 more }`

  Details about a group's membership in a project.

  - `created_at: number`

    Unix timestamp (in seconds) when the group was granted project access.

  - `group_id: string`

    Identifier of the group that has access to the project.

  - `group_name: string`

    Display name of the group.

  - `group_type: "group" or "tenant_group"`

    The type of the group.

    - `"group"`

    - `"tenant_group"`

  - `object: "project.group"`

    Always `project.group`.

    - `"project.group"`

  - `project_id: string`

    Identifier of the project.

### Example

```http
curl https://api.openai.com/v1/organization/projects/$PROJECT_ID/groups/$GROUP_ID \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "created_at": 0,
  "group_id": "group_id",
  "group_name": "group_name",
  "group_type": "group",
  "object": "project.group",
  "project_id": "project_id"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/projects/proj_abc123/groups/group_01J1F8ABCDXYZ \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
    "object": "project.group",
    "project_id": "proj_abc123",
    "group_id": "group_01J1F8ABCDXYZ",
    "group_name": "Support Team",
    "group_type": "group",
    "created_at": 1711471533
}
```
