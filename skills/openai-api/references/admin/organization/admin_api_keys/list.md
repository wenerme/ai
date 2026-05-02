## List all organization and project API keys.

**get** `/organization/admin_api_keys`

List organization API keys

### Query Parameters

- `after: optional string`

  Return keys with IDs that come after this ID in the pagination order.

- `limit: optional number`

  Maximum number of keys to return.

- `order: optional "asc" or "desc"`

  Order results by creation time, ascending or descending.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of AdminAPIKey`

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `created_at: number`

    The Unix timestamp (in seconds) of when the API key was created

  - `object: "organization.admin_api_key"`

    The object type, which is always `organization.admin_api_key`

    - `"organization.admin_api_key"`

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

  - `last_used_at: optional number`

    The Unix timestamp (in seconds) of when the API key was last used

  - `name: optional string`

    The name of the API key

- `has_more: boolean`

- `object: "list"`

  - `"list"`

- `first_id: optional string`

- `last_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "key_abc",
      "created_at": 1711471533,
      "object": "organization.admin_api_key",
      "owner": {
        "id": "sa_456",
        "created_at": 1711471533,
        "name": "My Service Account",
        "object": "organization.user",
        "role": "owner",
        "type": "user"
      },
      "redacted_value": "sk-admin...def",
      "last_used_at": 1711471534,
      "name": "Administration Key"
    }
  ],
  "has_more": false,
  "object": "list",
  "first_id": "key_abc",
  "last_id": "key_xyz"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys?after=key_abc&limit=20 \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "object": "organization.admin_api_key",
      "id": "key_abc",
      "name": "Main Admin Key",
      "redacted_value": "sk-admin...def",
      "created_at": 1711471533,
      "last_used_at": 1711471534,
      "owner": {
        "type": "service_account",
        "object": "organization.service_account",
        "id": "sa_456",
        "name": "My Service Account",
        "created_at": 1711471533,
        "role": "member"
      }
    }
  ],
  "first_id": "key_abc",
  "last_id": "key_abc",
  "has_more": false
}
```
