## Create

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Body Parameters

- `name: string`

### Returns

- `id: string`

  The identifier, which can be referenced in API endpoints

- `created_at: number`

  The Unix timestamp (in seconds) of when the API key was created

- `last_used_at: number`

  The Unix timestamp (in seconds) of when the API key was last used

- `name: string`

  The name of the API key

- `object: string`

  The object type, which is always `organization.admin_api_key`

- `owner: object { id, created_at, name, 3 more }`

  - `id: optional string`

    The identifier, which can be referenced in API endpoints

  - `created_at: optional number`

    The Unix timestamp (in seconds) of when the user was created

  - `name: optional string`

    The name of the user

  - `object: optional string`

    The object type, which is always organization.user

  - `role: optional string`

    Always `owner`

  - `type: optional string`

    Always `user`

- `redacted_value: string`

  The redacted value of the API key

- `value: optional string`

  The value of the API key. Only shown on create.

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "name": "New Admin Key"
        }'
```
