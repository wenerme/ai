## Create admin API key

**post** `/organization/admin_api_keys`

Create an organization admin API key

### Body Parameters

Content type: `application/json`

- `name: string`

- `expires_in_seconds: optional integer`

  The number of seconds until the API key expires. Omit this field for a key that does not expire.

  `minimum: 1`, `maximum: 31536000`

### Returns

- `value: string`

  The value of the API key. Only shown on create.

### Example

```http
curl -X POST https://api.openai.com/v1/organization/admin_api_keys \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
      "name": "New Admin Key",
      "expires_in_seconds": 2592000
  }'
```

#### Response example

```json
{
  "object": "organization.admin_api_key",
  "id": "key_xyz",
  "name": "New Admin Key",
  "redacted_value": "sk-admin...xyz",
  "created_at": 1711471533,
  "expires_at": 1714063533,
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
