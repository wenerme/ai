## Update group

**post** `/organization/groups/{group_id}`

Updates a group's information.

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
    -H "Authorization: Bearer $OPENAI_API_KEY" \
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
