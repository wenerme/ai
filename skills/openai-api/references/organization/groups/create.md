## Create

**post** `/organization/groups`

Creates a new group in the organization.

### Body Parameters

- `name: string`

  Human readable name for the group.

### Returns

- `id: string`

  Identifier for the group.

- `created_at: number`

  Unix timestamp (in seconds) when the group was created.

- `is_scim_managed: boolean`

  Whether the group is managed through SCIM and controlled by your identity provider.

- `name: string`

  Display name of the group.

### Example

```http
curl https://api.openai.com/v1/organization/groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "x"
        }'
```
