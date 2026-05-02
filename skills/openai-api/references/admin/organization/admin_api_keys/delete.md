## Delete admin API key

**delete** `/organization/admin_api_keys/{key_id}`

Delete an organization admin API key

### Path Parameters

- `key_id: string`

  The ID of the API key to be deleted.

### Returns

- `id: string`

- `deleted: boolean`

- `object: "organization.admin_api_key.deleted"`

  - `"organization.admin_api_key.deleted"`

### Example

```http
curl https://api.openai.com/v1/organization/admin_api_keys/$KEY_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY"
```

#### Response

```json
{
  "id": "key_abc",
  "deleted": true,
  "object": "organization.admin_api_key.deleted"
}
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/organization/admin_api_keys/key_abc \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "key_abc",
  "object": "organization.admin_api_key.deleted",
  "deleted": true
}
```
