## Retrieve admin API key

**get** `/organization/admin_api_keys/{key_id}`

Retrieve a single organization API key

### Path Parameters

- `key_id: string`

  The ID of the API key.

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
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "key_abc",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "name": "Administration Key",
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
  "value": "sk-admin-1234abcd"
}
```

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "organization.admin_api_key",
  "id": "key_abc",
  "name": "Main Admin Key",
  "redacted_value": "sk-admin...xyz",
  "created_at": 1711471533,
  "last_used_at": 1711471534,
  "owner": {
    "type": "user",
    "object": "organization.user",
    "id": "user_123",
    "name": "John Doe",
    "created_at": 1711471533,
    "role": "owner"
  }
}
```
