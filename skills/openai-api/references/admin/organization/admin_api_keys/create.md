## Create admin API key

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Body Parameters

- `name: string`

### Returns

- `value: string`

  The value of the API key. Only shown on create.

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "name": "New Admin Key"
        }'
```

#### Response

```json
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
  "name": "Administration Key",
  "value": "sk-admin-1234abcd"
}
```

### Example

```http
curl -X POST https://api.openai.com/v1/organization/admin_api_keys \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "New Admin Key"
  }'
```

#### Response

```json
{
  "object": "organization.admin_api_key",
  "id": "key_xyz",
  "name": "New Admin Key",
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
  },
  "value": "sk-admin-1234abcd"
}
```
