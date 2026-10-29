## Create group

**post** `/organization/groups`

Creates a new group in the organization.

### Body Parameters

- `name: string`

  Human readable name for the group.

  `minLength: 1`, `maxLength: 255`

### Returns

- `Group object { id, created_at, group_type, 2 more }`

  Details about an organization group.

  - `id: string`

    Identifier for the group.

  - `created_at: integer`

    Unix timestamp (in seconds) when the group was created.

    `format: unixtime`

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

#### 200 — Example

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

#### Response example

```json
{
    "object": "group",
    "id": "group_01J1F8ABCDXYZ",
    "name": "Support Team",
    "created_at": 1711471533,
    "group_type": "group",
    "is_scim_managed": false
}
```
