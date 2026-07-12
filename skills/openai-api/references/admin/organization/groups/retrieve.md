## Retrieve group

**get** `/organization/groups/{group_id}`

Retrieves a group.

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
